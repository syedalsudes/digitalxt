'use client';

/**
 * Drop-in replacement for a raw <video> tag that:
 *  - Never sets `src` until the element scrolls into (or near) the viewport,
 *    so nothing downloads/decodes on initial page load.
 *  - Removes `src` again once it scrolls back out, freeing the decoder.
 *  - Caps how many videos can be "loaded" (have a src attached) across the
 *    whole app at once, so a grid of many cards doesn't all decode together.
 *  - Forwards the ref to the real <video> element so existing imperative
 *    play()/pause()/muted logic in callers keeps working unchanged.
 *
 * Playback itself (autoplay vs click-to-play) is intentionally left to the
 * caller — this component only controls *loading*, not *playing*, unless the
 * optional `autoPlay` prop is passed.
 */

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const MAX_CONCURRENT_LOADED = 6;
const loadedVideos = new Set<HTMLVideoElement>();

function unloadVideo(video: HTMLVideoElement) {
  if (!loadedVideos.has(video)) return;
  video.pause();
  video.removeAttribute("src");
  video.load();
  loadedVideos.delete(video);
}

function requestLoadSlot(video: HTMLVideoElement): boolean {
  if (loadedVideos.has(video)) return true;

  if (loadedVideos.size >= MAX_CONCURRENT_LOADED) {
    // Free a slot by evicting a loaded-but-not-currently-playing video.
    let evicted: HTMLVideoElement | null = null;
    loadedVideos.forEach((candidate) => {
      if (!evicted && candidate.paused) evicted = candidate;
    });
    if (evicted) unloadVideo(evicted);
  }

  if (loadedVideos.size >= MAX_CONCURRENT_LOADED) {
    return false; // every loaded video is actively playing; try again later
  }

  loadedVideos.add(video);
  return true;
}

export interface LazyVideoProps
  extends Omit<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    "src" | "poster" | "muted" | "playsInline" | "loop" | "preload" | "autoPlay"
  > {
  src: string;
  poster?: string;
  /** Distance before entering the viewport at which loading should start. */
  rootMargin?: string;
  /** Opt-in: play automatically once loaded and in view (default: off, caller controls playback). */
  autoPlay?: boolean;
}

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(function LazyVideo(
  { src, poster, className, rootMargin = "200px", autoPlay = false, ...rest },
  forwardedRef
) {
  const localRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useImperativeHandle(forwardedRef, () => localRef.current as HTMLVideoElement);

  useEffect(() => {
    const video = localRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (requestLoadSlot(video)) setShouldLoad(true);
          } else {
            setShouldLoad(false);
            unloadVideo(video);
          }
        });
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    const video = localRef.current;
    if (!video || !shouldLoad || !autoPlay) return;
    video.play().catch(() => {});
  }, [shouldLoad, autoPlay]);

  useEffect(() => {
    return () => {
      if (localRef.current) unloadVideo(localRef.current);
    };
  }, []);

  return (
    <video
      ref={localRef}
      src={shouldLoad ? src : undefined}
      poster={poster}
      muted
      playsInline
      loop
      preload="none"
      className={className}
      {...rest}
    />
  );
});

export default LazyVideo;
