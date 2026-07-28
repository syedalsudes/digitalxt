'use client';

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { Cinzel } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

const worksList = [
  {
    id: 1,
    title: "Cinematic Reel 01",
    subtitle: "Action & Motion",
    video: "/videos/ourwork/workvid1.mp4",
  },
  {
    id: 2,
    title: "Cinematic Reel 02",
    subtitle: "Color Grading & Vibe",
    video: "/videos/ourwork/workvid2.mp4",
  },
  {
    id: 3,
    title: "Cinematic Reel 03",
    subtitle: "Commercial Showreel",
    video: "/videos/ourwork/workvid3.mp4",
  },
  {
    id: 4,
    title: "Cinematic Reel 04",
    subtitle: "Documentary Edits",
    video: "/videos/ourwork/workvid4.mp4",
  },
];

export default function OurWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mouse Drag Logic
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      )
        .fromTo(
          sliderRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
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

    // Initial Center Alignment (Scrolls smoothly to 2nd card)
    if (sliderRef.current && cardRefs.current[1]) {
      const container = sliderRef.current;
      const targetCard = cardRefs.current[1];
      const scrollPos =
        targetCard.offsetLeft -
        container.clientWidth / 2 +
        targetCard.clientWidth / 2;

      container.scrollTo({ left: scrollPos, behavior: "instant" });
    }

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#06030a] text-white flex flex-col items-center justify-center py-16 md:py-24 overflow-hidden selection:bg-purple-500/30 select-none"
    >
      {/* Curved Screen ClipPath Definition (Clean 16:9 Curve) */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <clipPath id="curvedScreenClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.02 0.06 Q 0.5 0.14 0.98 0.06 C 0.99 0.06 1 0.08 1 0.11 L 1 0.89 C 1 0.92 0.99 0.94 0.98 0.94 Q 0.5 0.86 0.02 0.94 C 0.01 0.94 0 0.92 0 0.89 L 0 0.11 C 0 0.08 0.01 0.06 0.02 0.06 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[350px] md:h-[500px] bg-purple-600/15 blur-[160px] rounded-full pointer-events-none" />

      {/* Header */}
      <div
        ref={headerRef}
        className={`z-10 text-center max-w-4xl mx-auto mb-8 md:mb-12 px-4 ${cinzel.className}`}
      >
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-purple-300/70 mb-2">
          Featured Showreel & Cinematic Edits
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
          OUR WORK
        </h2>
      </div>

      {/* 3-CARD FOCUS HORIZONTAL CAROUSEL */}
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        className="z-10 w-full flex items-center gap-6 sm:gap-8 md:gap-12 overflow-x-auto px-[12vw] sm:px-[22vw] md:px-[26vw] py-8 snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing touch-pan-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {worksList.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="shrink-0 snap-center"
          >
            <WorkCard item={item} />
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div ref={buttonRef} className="z-10 mt-8 shrink-0 relative group/btn px-4">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-40 blur-md group-hover/btn:opacity-80 transition-opacity duration-300" />
        <Link
          href="/work"
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

{/* Individual Curved Video Card Component */}
function WorkCard({
  item,
}: {
  item: { id: number; title: string; subtitle: string; video: string };
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = false; // Audio Unmute on Hover
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.muted = true; // Mute back on leave
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      /* Aspect Ratio 16/9 with Responsive Widths */
      className="relative w-[76vw] sm:w-[54vw] md:w-[48vw] max-w-[620px] aspect-[16/9] flex flex-col items-center justify-center group my-2 cursor-pointer transition-all duration-500"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-x-8 inset-y-8 bg-purple-600/20 blur-3xl rounded-full group-hover:bg-purple-500/40 group-hover:scale-110 transition-all duration-700 pointer-events-none" />

      {/* Scalable Curved Frame Wrapper */}
      <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
        
        {/* Curved Clip-Path Container */}
        <div
          className="relative w-full h-full bg-[#0a0514] overflow-hidden"
          style={{ clipPath: "url(#curvedScreenClip)" }}
        >
          {/* Continuous Muted Autoplay Video */}
          <video
            ref={videoRef}
            src={item.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
          />

          {/* Audio Indicator (Top Right) */}
          <div className="absolute top-4 right-6 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-purple-200 uppercase font-mono tracking-wider transition-opacity duration-300">
            {isHovered ? (
              <>
                <Volume2 className="w-3 h-3 text-purple-400 animate-pulse" />
                <span>Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 text-gray-400" />
                <span>Hover Sound</span>
              </>
            )}
          </div>

          {/* Text Overlay (Bottom Left) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none flex flex-col justify-between p-5 sm:p-7">
            <span className="text-[10px] sm:text-xs tracking-widest text-purple-300/80 uppercase font-mono">
              0{item.id} / 04
            </span>
            <div>
              <p className="text-[10px] sm:text-xs uppercase text-purple-300/90 font-medium tracking-widest mb-1">
                {item.subtitle}
              </p>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-wide">
                {item.title}
              </h3>
            </div>
          </div>

          {/* Screen Glass Reflection Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* Curved Border SVG Overlay (Fits 16:9 perfectly) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          viewBox="0 0 1000 562.5"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`borderGrad-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#c026d3" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            d="M 20 34 Q 500 78 980 34 C 990 34 1000 45 1000 62 L 1000 500 C 1000 517 990 528 980 528 Q 500 484 20 528 C 10 528 0 517 0 500 L 0 62 C 0 45 10 34 20 34 Z"
            fill="none"
            stroke={`url(#borderGrad-${item.id})`}
            strokeWidth="4"
          />
        </svg>
      </div>
    </div>
  );
}