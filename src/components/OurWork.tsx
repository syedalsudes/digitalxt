'use client';

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Cinzel } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion, PanInfo } from "framer-motion";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

const worksList = [
  { id: 1, video: "/videos/ourwork/workvid1.mp4" },
  { id: 2, video: "/videos/ourwork/workvid2.mp4" },
  { id: 3, video: "/videos/ourwork/workvid3.mp4" },
  { id: 4, video: "/videos/ourwork/workvid4.mp4" },
  { id: 5, video: "/videos/ourwork/workvid1.mp4" },
  { id: 6, video: "/videos/ourwork/workvid2.mp4" },
  { id: 7, video: "/videos/ourwork/workvid3.mp4" },
];

export default function OurWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(1);

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
      ).fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const nextVideo = () => {
    setActiveIndex((prev) => (prev + 1) % worksList.length);
  };

  const prevVideo = () => {
    setActiveIndex((prev) => (prev - 1 + worksList.length) % worksList.length);
  };

  // Ultra-Smooth Drag End Handler
  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    const velocityThreshold = 300;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      nextVideo();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      prevVideo();
    }
  };

  return (
    <section
      id="our-work"
      ref={sectionRef}
      className="relative w-full bg-[#06030a] text-white flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 overflow-hidden selection:bg-purple-500/30"
    >
      {/* Curved Screen ClipPath Definition */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <clipPath id="curvedScreenClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.02 0.06 Q 0.5 0.14 0.98 0.06 C 0.99 0.06 1 0.08 1 0.11 L 1 0.89 C 1 0.92 0.99 0.94 0.98 0.94 Q 0.5 0.86 0.02 0.94 C 0.01 0.94 0 0.92 0 0.89 L 0 0.11 C 0 0.08 0.01 0.06 0.02 0.06 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] md:w-[1100px] h-[220px] sm:h-[400px] md:h-[600px] bg-purple-600/15 blur-[120px] sm:blur-[170px] rounded-full pointer-events-none" />

      {/* Header */}
      <div
        ref={headerRef}
        className={`z-10 text-center max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4 ${cinzel.className}`}
      >
        <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-purple-300/70 mb-1.5 sm:mb-2">
          Featured Showreel & Cinematic Edits
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
          OUR WORK
        </h2>
      </div>

      {/* PANORAMIC CURVED DECK CAROUSEL */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="relative z-10 w-full h-[220px] sm:h-[340px] md:h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing px-2 select-none"
        style={{ perspective: "1000px" }}
      >
        <div className="relative w-full max-w-[1280px] h-full flex items-center justify-center">
          {worksList.map((item, index) => {
            let offset = index - activeIndex;
            if (offset > worksList.length / 2) offset -= worksList.length;
            if (offset < -worksList.length / 2) offset += worksList.length;

            return (
              <WorkCard
                key={`${item.id}-${index}`}
                item={item}
                offset={offset}
                onClick={() => setActiveIndex(index)}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Action Button */}
      <div ref={buttonRef} className="z-10 mt-10 sm:mt-14 md:mt-20 shrink-0 relative group/btn px-4">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-40 blur-md group-hover/btn:opacity-80 transition-opacity duration-300" />
        <Link
          href="/#book-call"
          className="relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-400/30 bg-[#120824]/90"
        >
          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" />
          <span className="relative z-10">Craft Your Next Story</span>
          <ArrowUpRight className="relative z-10 w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 text-purple-300" />
        </Link>
      </div>
    </section>
  );
}

{/* Individual Video Card Component */ }
function WorkCard({
  item,
  offset,
  onClick,
}: {
  item: { id: number; video: string };
  offset: number;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isCenter = offset === 0;

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => { });
        }
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
    }
  };

  const getCardStyle = (): React.CSSProperties => {
    if (offset === 0) {
      return {
        transform: "translateX(0%) scale(1) translateZ(0px) rotateY(0deg)",
        zIndex: 30,
        opacity: 1,
        filter: "brightness(100%)",
      };
    } else if (offset === 1) {
      return {
        transform: "translateX(62%) scale(0.82) translateZ(-120px) rotateY(-22deg)",
        zIndex: 20,
        opacity: 0.85,
        filter: "brightness(75%)",
      };
    } else if (offset === -1) {
      return {
        transform: "translateX(-62%) scale(0.82) translateZ(-120px) rotateY(22deg)",
        zIndex: 20,
        opacity: 0.85,
        filter: "brightness(75%)",
      };
    } else if (offset === 2) {
      return {
        transform: "translateX(110%) scale(0.68) translateZ(-250px) rotateY(-35deg)",
        zIndex: 10,
        opacity: 0.45,
        filter: "brightness(50%)",
      };
    } else if (offset === -2) {
      return {
        transform: "translateX(-110%) scale(0.68) translateZ(-250px) rotateY(35deg)",
        zIndex: 10,
        opacity: 0.45,
        filter: "brightness(50%)",
      };
    } else {
      return {
        transform:
          offset > 0
            ? "translateX(160%) scale(0.5) rotateY(-45deg)"
            : "translateX(-160%) scale(0.5) rotateY(45deg)",
        zIndex: 0,
        opacity: 0,
        pointerEvents: "none",
      };
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute w-[72vw] sm:w-[50vw] md:w-[44vw] max-w-[580px] aspect-[16/9] transition-all duration-500 ease-out cursor-pointer transform-gpu will-change-transform"
      style={{
        ...getCardStyle(),
        WebkitBoxReflect:
          "below 8px linear-gradient(transparent 65%, rgba(0, 0, 0, 0.45))",
      }}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 ${isCenter
            ? "drop-shadow-[0_15px_30px_rgba(168,85,247,0.45)]"
            : "hover:opacity-100"
          }`}
      >
        <div className="relative w-full h-full">
          <div
            className="relative w-full h-full bg-[#0a0514] overflow-hidden"
            style={{ clipPath: "url(#curvedScreenClip)" }}
          >
            <video
              ref={videoRef}
              src={item.video}
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/60 pointer-events-none" />
          </div>

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            viewBox="0 0 1000 562.5"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id={`borderGrad-${item.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#d8b4fe"
                  stopOpacity={isCenter ? "0.9" : "0.4"}
                />
                <stop
                  offset="50%"
                  stopColor="#a855f7"
                  stopOpacity={isCenter ? "0.6" : "0.3"}
                />
                <stop
                  offset="100%"
                  stopColor="#c026d3"
                  stopOpacity={isCenter ? "0.9" : "0.4"}
                />
              </linearGradient>
            </defs>
            <path
              d="M 20 34 Q 500 78 980 34 C 990 34 1000 45 1000 62 L 1000 500 C 1000 517 990 528 980 528 Q 500 484 20 528 C 10 528 0 517 0 500 L 0 62 C 0 45 10 34 20 34 Z"
              fill="none"
              stroke={`url(#borderGrad-${item.id})`}
              strokeWidth={isCenter ? "4" : "2.5"}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}