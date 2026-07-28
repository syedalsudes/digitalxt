'use client';

import React, { useEffect, useRef } from "react";
import { Cinzel } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Lenis Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // 2. GSAP Animations Context
    const ctx = gsap.context(() => {
      // Set initial hidden state immediately
      gsap.set([line1Ref.current, line2Ref.current], {
        opacity: 0,
        y: 40,
      });

      // Entrance Timeline - Snappier & Slightly Faster
      const entranceTl = gsap.timeline({
        delay: 1.5, // Reduced from 2.2s -> 1.5s (Slightly faster trigger)
      });

      entranceTl
        .to(line1Ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.45, // Faster text reveal
          ease: "power3.out",
        })
        .to(
          line2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.25" // Tight overlap for quick flow
        );

      // Scroll Parallax Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .to(contentRef.current, {
          y: -80,
          opacity: 0,
          ease: "none",
        })
        .to(
          videoRef.current,
          {
            scale: 1.12,
            ease: "none",
          },
          0
        )
        .to(
          overlayRef.current,
          {
            backgroundColor: "rgba(0,0,0,0.85)",
            ease: "none",
          },
          0
        );
    }, mainRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-start px-4 sm:px-8 md:px-16"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 origin-center pointer-events-none"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dynamic Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 z-10 transition-colors pointer-events-none"
      />

      {/* Animated Main Content */}
      <div
        ref={contentRef}
        className={`relative z-20 text-white text-left w-full max-w-7xl ${cinzel.className}`}
      >
        <div className="flex flex-col items-start leading-[0.9] uppercase font-bold tracking-tight">
          
          {/* Top Line: Every Frame */}
          <span
            ref={line1Ref}
            className="text-[clamp(1.8rem,7vw,6.5rem)] whitespace-nowrap drop-shadow-xl mb-1 sm:mb-2 block w-full"
          >
            Every Frame
          </span>

          {/* Bottom Line: Tells A Story */}
          <span
            ref={line2Ref}
            className="text-[clamp(2.1rem,8.2vw,7.5rem)] whitespace-nowrap text-white/90 drop-shadow-2xl block w-full"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
            }}
          >
            Tells A Story
          </span>

        </div>
      </div>
    </main>
  );
}