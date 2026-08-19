'use client';

import React, {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Cinzel } from "next/font/google";
import { ArrowRight, ArrowUpRight, Loader2, Play, Pause } from "lucide-react";
import { CloudinaryResource } from "@/lib/cloudinary"; // Path Adjust karlein

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700", "900"],
});

type HeroCardItem = {
  id: string;
  video: string;
  poster: string;
};

const VISIBLE_SIDES = 2;

function getCardStyle(offset: number): React.CSSProperties {
  const abs = Math.abs(offset);
  const dir = Math.sign(offset);

  if (abs > VISIBLE_SIDES) {
    return {
      transform: `translate3d(${dir * 320}%, 140px, 0) scale(0.65)`,
      opacity: 0,
      pointerEvents: "none",
      zIndex: 0,
    };
  }

  const x = offset * 112;
  const y = abs === 0 ? 0 : 35 + abs * 24;
  const scale = abs === 0 ? 1.05 : 1 - abs * 0.06;
  const rotate = abs === 0 ? 0 : dir * -8;

  return {
    transform: `
      translate3d(${x}%, ${y}px, 0)
      rotate(${rotate}deg)
      scale(${scale})
    `,
    opacity: 1 - abs * 0.1,
    zIndex: 100 - abs,
  };
}

export default function HeroSection() {
  const mainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);

  const [heroCards, setHeroCards] = useState<HeroCardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Track which card is playing by its unique ID
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Fetch Testimonial Videos from Cloudinary API
  useEffect(() => {
    async function fetchTestimonialVideos() {
      try {
        const res = await fetch("/api/videos?folder=Digitalixstudio/testimonials");
        const data: CloudinaryResource[] = await res.json();

        if (Array.isArray(data)) {
          // Hero section ke liye shuru ki 5 videos
          const formattedCards: HeroCardItem[] = data.slice(0, 5).map((item) => ({
            id: item.public_id,
            video: item.secure_url,
            poster: item.secure_url.replace(/\.[^/.]+$/, ".jpg"),
          }));
          setHeroCards(formattedCards);
        }
      } catch (err) {
        console.error("Failed to load testimonials videos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonialVideos();
  }, []);

  // Middle card fixed index (index 2 for 5 items)
  const centerIndex = useMemo(() => Math.floor(heroCards.length / 2), [heroCards.length]);

  const scrollToCenterCard = () => {
    const container = mobileScrollRef.current;
    const centerCard = centerCardRef.current;

    if (container && centerCard) {
      const scrollPos =
        centerCard.offsetLeft - container.clientWidth / 2 + centerCard.clientWidth / 2;
      container.scrollTo({ left: scrollPos, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (heroCards.length === 0) return;

    const timer = setTimeout(() => {
      scrollToCenterCard();
    }, 150);

    const handleResize = () => {
      scrollToCenterCard();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [heroCards]);

  // Viewport Scroll Observer: Screen se bahar scroll hone par video automatically pause ho jayegi
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setPlayingVideoId(null);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (mainRef.current) {
      observer.observe(mainRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (loading || heroCards.length === 0) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const textTargets = [
        titleRef.current,
        descRef.current,
        btnRef.current,
      ].filter(Boolean);

      if (reduce) {
        if (textTargets.length > 0) gsap.set(textTargets, { opacity: 1, y: 0, scale: 1 });
        if (deckRef.current) gsap.set(deckRef.current, { opacity: 1, y: 0, scale: 1 });
        scrollToCenterCard();
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          scrollToCenterCard();
        },
      });

      if (textTargets.length > 0) {
        gsap.set(textTargets, { opacity: 0, y: 30 });
      }

      if (deckRef.current) {
        gsap.set(deckRef.current, { opacity: 0, y: 60, scale: 0.98 });
      }

      if (textTargets.length > 0) {
        tl.to(textTargets, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
        });
      }

      if (deckRef.current) {
        tl.to(
          deckRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }
    },
    { scope: mainRef, dependencies: [loading, heroCards] }
  );

  const handleTogglePlay = (id: string) => {
    setPlayingVideoId((prevId) => (prevId === id ? null : id));
  };

  const cards = useMemo(
    () =>
      heroCards.map((item, index) => ({
        item,
        index,
        offset: index - centerIndex,
      })),
    [heroCards, centerIndex]
  );

  return (
    <main
      ref={mainRef}
      className="relative w-full min-h-screen pt-32 sm:pt-36 md:pt-44 lg:pt-48 2xl:pt-52 bg-[#06030a] text-white flex flex-col items-center justify-start overflow-hidden font-sans pb-12 sm:pb-16 2xl:pb-24 selection:bg-purple-500/30"
    >
      {/* Background Ambient Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-5%] h-[350px] sm:h-[500px] 2xl:h-[700px] w-[90vw] max-w-[1400px] -translate-x-1/2 rounded-full opacity-20 blur-[100px] sm:blur-[160px]"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(6,3,10,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[35%] h-[250px] sm:h-[400px] 2xl:h-[600px] w-[80vw] max-w-[1100px] -translate-x-1/2 rounded-full opacity-15 blur-[90px] sm:blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(192,38,211,0.6) 0%, rgba(6,3,10,0) 70%)",
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-20 flex w-full max-w-7xl 2xl:max-w-[1600px] flex-col items-center justify-center text-center px-4 sm:px-6 mb-6 sm:mb-10 lg:mb-16">
        <div className="w-full flex justify-center items-center px-2">
          <h1
            ref={titleRef}
            className={`font-black uppercase text-center 
              text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-300
              text-2xl sm:text-4xl md:text-5xl whitespace-normal tracking-tight sm:tracking-normal
              lg:whitespace-nowrap lg:text-[2.2vw] xl:text-[2.5vw] 2xl:text-5xl lg:tracking-tight
              ${cinzel.className}`}
            style={{ lineHeight: 1.25 }}
          >
            Premium Video Production For Modern Brands.
          </h1>
        </div>

        <p
          ref={descRef}
          className="mt-3 sm:mt-5 lg:mt-6 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-gray-300/85 font-light px-2"
        >
          High-impact video editing, motion graphics, and sound design. We turn your raw footage into captivating visual stories that drive real engagement.
        </p>

        <div
          ref={btnRef}
          className="mt-5 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-5 w-full sm:w-auto px-4 sm:px-0"
        >
          <Link
            href="#book-call"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 px-6 sm:px-7 lg:px-9 py-3 sm:py-3.5 lg:py-4 text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25"
          >
            <span>Book a Call</span>
            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
          </Link>

          <div className="relative group/btn w-full sm:w-auto">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-40 blur-md group-hover/btn:opacity-80 transition-opacity duration-300" />
            <Link
              href="https://wa.me/message/FGRAWQHXJE5IP1"
              target="_blank"
              className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 lg:px-9 py-3 sm:py-3.5 lg:py-4 rounded-full text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-400/30 bg-[#120824]/90"
            >
              <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" />
              <span className="relative z-10">WhatsApp Us</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 text-purple-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Video Carousel Deck */}
      <section
        ref={deckRef}
        role="group"
        aria-label="Cards Showcase"
        className="relative z-10 w-full outline-none"
      >
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : (
          <>
            {/* DESKTOP VIEW */}
            <div className="hidden lg:flex relative h-[480px] xl:h-[520px] 2xl:h-[620px] w-full items-end justify-center">
              {cards.map(({ item, index, offset }) => (
                <HeroCard
                  key={item.id}
                  item={item}
                  index={index}
                  offset={offset}
                  isCenter={offset === 0}
                  isPlaying={playingVideoId === item.id}
                  onTogglePlay={() => handleTogglePlay(item.id)}
                  isMobile={false}
                />
              ))}
            </div>

            {/* MOBILE & TABLET VIEW */}
            <div
              ref={mobileScrollRef}
              className="flex lg:hidden w-full overflow-x-auto gap-3 sm:gap-5 py-6 scrollbar-none snap-x snap-mandatory items-center justify-start touch-pan-x px-[calc(50vw-110px)] sm:px-[calc(50vw-150px)] md:px-[calc(50vw-180px)]"
            >
              {cards.map(({ item, index, offset }) => (
                <div
                  key={item.id}
                  ref={offset === 0 ? centerCardRef : null}
                  className="snap-center shrink-0 flex items-center justify-center"
                >
                  <HeroCard
                    item={item}
                    index={index}
                    offset={offset}
                    isCenter={offset === 0}
                    isPlaying={playingVideoId === item.id}
                    onTogglePlay={() => handleTogglePlay(item.id)}
                    isMobile={true}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

/* ================= HeroCard Component ================= */

type HeroCardProps = {
  item: HeroCardItem;
  index: number;
  offset: number;
  isCenter: boolean;
  isPlaying: boolean;
  isMobile: boolean;
  onTogglePlay: () => void;
};

const HeroCard = memo(function HeroCard({
  item,
  offset,
  isCenter,
  isPlaying,
  isMobile,
  onTogglePlay,
}: HeroCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = Math.abs(offset) <= VISIBLE_SIDES;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    } else {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }
  }, [isPlaying]);

  const style = useMemo(() => {
    if (isMobile) return {};
    return getCardStyle(offset);
  }, [offset, isMobile]);

  return (
    <div
      onClick={onTogglePlay}
      aria-current={isCenter}
      tabIndex={isMobile || isVisible ? 0 : -1}
      className={`${
        isMobile
          ? "relative aspect-[9/14] w-[210px] sm:w-[280px] md:w-[330px]"
          : "absolute aspect-[9/14] w-[240px] xl:w-[300px] 2xl:w-[360px]"
      } transform-gpu cursor-pointer transition-all duration-500 ease-out focus:outline-none select-none group`}
      style={style}
    >
      <div
        className={`absolute inset-0 rounded-[24px] sm:rounded-[32px] 2xl:rounded-[40px] transition-all duration-500 ${
          isCenter
            ? "bg-gradient-to-b from-purple-400 via-fuchsia-500 to-purple-700 p-[1.5px] 2xl:p-[2px] shadow-[0_0_30px_rgba(168,85,247,0.5)] 2xl:shadow-[0_0_55px_rgba(168,85,247,0.55)] scale-100"
            : "bg-gradient-to-b from-white/20 via-purple-500/10 to-transparent p-[1px] opacity-85 hover:opacity-100 hover:border-purple-400/40"
        }`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[23px] sm:rounded-[31px] 2xl:rounded-[39px] bg-[#0c0617]">
          <video
            ref={videoRef}
            src={item.video}
            poster={item.poster}
            loop
            playsInline
            disablePictureInPicture
            preload="metadata"
            className="h-full w-full object-cover pointer-events-none"
          />

          {/* Dimmer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

          {/* Play/Pause Overlay: Desktop par sirf hover per show hoga, Mobile par play status ke mutabiq */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
              isMobile
                ? isPlaying
                  ? "opacity-0 bg-transparent"
                  : "opacity-100 bg-black/30"
                : "opacity-0 group-hover:opacity-100 bg-black/35 backdrop-blur-[2px]"
            }`}
          >
            <div className="p-3.5 sm:p-4 bg-purple-600/90 hover:bg-purple-500 rounded-full text-white backdrop-blur-md shadow-xl border border-purple-300/40 transform transition-transform duration-300 group-hover:scale-110 active:scale-95">
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

HeroCard.displayName = "HeroCard";