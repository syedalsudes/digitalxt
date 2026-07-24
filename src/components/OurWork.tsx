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
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const work = {
    title: "OUR WORK",
    subtitle: "Featured Showreel & Cinematic Edits",
    thumbnail: "/thumb.png",
    link: "/work",
  };

  useEffect(() => {
    // 1. GSAP Plugin Register karein
    gsap.registerPlugin(ScrollTrigger);

    // 2. Lenis Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // 3. Sync Lenis with GSAP ScrollTrigger (Ahem Step)
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 4. GSAP Scroll Animations Context
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Jab section viewport ke 80% per aaye tab shuru ho
          toggleActions: "play none none reverse",
        },
      });

      // Elements ka initial hidden state set karein (GSAP se handle karna cleaner hota hai)
      gsap.set([subtitleRef.current, titleRef.current, screenRef.current, buttonRef.current], {
        opacity: 0,
        y: 50,
      });

      // Sequential Reveal Animations (One after another)
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4") // Pehle wale se thoda jaldi start hoga
      .to(screenRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      }, "-=0.5")
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.6");

    }, sectionRef);

    // Cleanup logic (Next.js routing / unmount ke liye zaruri hai)
    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-[#08050c] text-white flex flex-col items-center justify-center gap-6 md:gap-8 px-4 py-6 overflow-hidden"
    >
      {/* SVG ClipPath Definition */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <clipPath id="curvedScreenClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.02 0.10 Q 0.5 0.25 0.98 0.10 C 0.995 0.10 1 0.12 1 0.15 L 1 0.85 C 1 0.88 0.995 0.90 0.98 0.90 Q 0.5 0.75 0.02 0.90 C 0.005 0.90 0 0.88 0 0.85 L 0 0.15 C 0 0.12 0.005 0.10 0.02 0.10 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Ambient Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-purple-600/20 blur-[170px] rounded-full pointer-events-none" />

      {/* Heading */}
      <div className={`z-10 text-center max-w-5xl mx-auto flex flex-col items-center shrink-0 ${cinzel.className}`}>
        <p ref={subtitleRef} className="text-xs sm:text-sm uppercase tracking-[0.4em] text-purple-300/60 mb-2">
          {work.subtitle}
        </p>
        <h2 ref={titleRef} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
          {work.title}
        </h2>
      </div>

      {/* CURVED CINEMA SCREEN CONTAINER */}
      <div ref={screenRef} className="relative z-10 w-[85vw] max-w-[1250px] aspect-[16/9] max-h-[90vh] flex items-center justify-center shrink-0 group my-1">
        
        {/* Outer Glow behind screen */}
        <div className="absolute inset-0 bg-purple-600/30 blur-2xl rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Video Box with Curved Clip-Path */}
        <div
          className="relative w-full h-full bg-black overflow-hidden"
          style={{ clipPath: "url(#curvedScreenClip)" }}
        >
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            style={{ objectFit: "cover" }}
          />

          {/* Glass Reflection Highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent mix-blend-screen pointer-events-none" />

          {/* Cinematic Dark Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
        </div>

        {/* Curved Border Overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          viewBox="0 0 1000 562.5"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c026d3" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c026d3" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            d="M 20 56.25 Q 500 140.625 980 56.25 C 995 56.25 1000 67.5 1000 84.375 L 1000 478.125 C 1000 495 995 506.25 980 506.25 Q 500 421.875 20 506.25 C 5 506.25 0 495 0 478.125 L 0 84.375 C 0 67.5 5 56.25 20 56.25 Z"
            fill="none"
            stroke="url(#borderGrad)"
            strokeWidth="5"
          />
        </svg>
      </div>

      {/* Button */}
      <div ref={buttonRef} className="z-10 shrink-0 relative group/btn">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-50 blur-lg group-hover/btn:opacity-90 transition-opacity duration-300" />
        <Link
          href={work.link}
          className="relative inline-flex items-center gap-2.5 px-9 py-3.5 md:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white overflow-hidden transition-transform duration-300 hover:scale-105"
          style={{ background: "linear-gradient(135deg, #9333ea, #c026d3)" }}
        >
          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12" />
          <span className="relative z-10">View Full Portfolio</span>
          <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
        </Link>
      </div>
    </section>
  );
}