'use client';

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Cinzel } from "next/font/google";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

export default function OurWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const work = {
    title: "OUR WORK",
    subtitle: "Featured Showreel & Cinematic Edits",
    thumbnail: "/thumb.png",
    link: "/work",
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      // Sequential Entrance
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      )
        .fromTo(
          screenRef.current,
          { opacity: 0, y: 60, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.5"
        );
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#06030a] text-white flex flex-col items-center justify-center py-16 md:py-24 px-4 overflow-hidden selection:bg-purple-500/30"
    >
      {/* Curved Screen SVG Definition */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <clipPath id="curvedScreenClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.015 0.08 Q 0.5 0.18 0.985 0.08 C 0.995 0.08 1 0.10 1 0.13 L 1 0.87 C 1 0.90 0.995 0.92 0.985 0.92 Q 0.5 0.82 0.015 0.92 C 0.005 0.92 0 0.90 0 0.87 L 0 0.13 C 0 0.10 0.005 0.08 0.015 0.08 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-purple-600/15 blur-[160px] rounded-full pointer-events-none" />

      {/* Header */}
      <div ref={headerRef} className={`z-10 text-center max-w-4xl mx-auto mb-8 md:mb-10 ${cinzel.className}`}>
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-purple-300/70 mb-2">
          {work.subtitle}
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
          {work.title}
        </h2>
      </div>

      {/* CURVED CINEMA SCREEN DECK */}
      <div
        ref={screenRef}
        className="relative z-10 w-full max-w-5xl h-[340px] sm:h-[440px] md:h-[500px] flex items-center justify-center shrink-0 group my-2 cursor-pointer"
      >
        {/* Ambient Glow behind screen */}
        <div className="absolute inset-x-10 inset-y-6 bg-purple-600/25 blur-3xl rounded-full group-hover:bg-purple-500/45 group-hover:scale-105 transition-all duration-700 pointer-events-none" />

        {/* Scalable Curved Frame Wrapper (IMAGE + BORDER BOTH SCALE TOGETHER) */}
        <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
          
          {/* Video Box with Curved Clip-Path */}
          <div
            className="relative w-full h-full bg-[#0a0514] overflow-hidden"
            style={{ clipPath: "url(#curvedScreenClip)" }}
          >
            <Image
              src={work.thumbnail}
              alt={work.title}
              fill
              className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Glass Gloss Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* Curved Border Overlay SVG (Locks 1:1 with Image scale) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            viewBox="0 0 1000 562.5"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c026d3" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#c026d3" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M 15 45 Q 500 101 985 45 C 995 45 1000 56 1000 73 L 1000 489 C 1000 506 995 517 985 517 Q 500 461 15 517 C 5 517 0 506 0 489 L 0 73 C 0 56 5 45 15 45 Z"
              fill="none"
              stroke="url(#borderGrad)"
              strokeWidth="3.5"
            />
          </svg>

        </div>
      </div>

      {/* Action Button */}
      <div ref={buttonRef} className="z-10 mt-8 shrink-0 relative group/btn">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-40 blur-md group-hover/btn:opacity-80 transition-opacity duration-300" />
        <Link
          href={work.link}
          className="relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-400/30 bg-[#120824]/90"
        >
          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" />
          <span className="relative z-10">View Full Portfolio</span>
          <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 text-purple-300" />
        </Link>
      </div>
    </section>
  );
}