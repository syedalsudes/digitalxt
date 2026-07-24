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
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 2. GSAP Animations Context
    const ctx = gsap.context(() => {
      // Entrance Timeline (Loader sync timing)
      const entranceTl = gsap.timeline({
        delay: 1.1,
      });

      gsap.set([line1Ref.current, line2Ref.current], {
        opacity: 0,
        y: 50,
      });

      entranceTl
        .to(line1Ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        })
        .to(
          line2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // Scroll Parallax Timeline (Jab user scroll karke agle section par jaye)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true, // Smooth progress linked to scroll
        },
      });

      // Background Video Depth & Text Fade Parallax
      scrollTl
        .to(contentRef.current, {
          y: -120,
          opacity: 0,
          ease: "none",
        })
        .to(
          videoRef.current,
          {
            scale: 1.15,
            ease: "none",
          },
          0
        )
        .to(
          overlayRef.current,
          {
            backgroundColor: "rgba(0,0,0,0.8)",
            ease: "none",
          },
          0
        );
    }, mainRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-start px-6 md:px-16"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 origin-center"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dynamic Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 z-10 transition-colors"
      />

      {/* Animated Main Content */}
      <div
        ref={contentRef}
        className={`relative z-20 text-white text-left ${cinzel.className}`}
      >
        <div className="flex flex-col items-start leading-none uppercase font-bold tracking-tight">
          
          {/* Top Line: Every Frame */}
          <span
            ref={line1Ref}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-xl mb-2 block"
          >
            Every Frame
          </span>

          {/* Bottom Line: Tells A Story */}
          <span
            ref={line2Ref}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl text-white/90 drop-shadow-2xl block"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)",
            }}
          >
            Tells A Story
          </span>

        </div>
      </div>
    </main>
  );
}