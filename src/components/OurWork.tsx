'use client';

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Cinzel } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

// Dynamic Video List
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

  const totalCards = worksList.length;
  const angleStep = 360 / totalCards;

  // Responsive States
  const [radius, setRadius] = useState(380);
  const [perspective, setPerspective] = useState(1000);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);

  // Screen Resize Listener for Compact Mobile 3D Bounds
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: Tight Radius & Perspective taake Left/Right videos peek karein
        setRadius(135);
        setPerspective(550);
      } else if (width < 1024) {
        // Tablet
        setRadius(240);
        setPerspective(800);
      } else {
        // Desktop
        setRadius(Math.max(380, Math.round(280 / Math.tan(Math.PI / totalCards))));
        setPerspective(1000);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [totalCards]);

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

  // Lag-Free Drag / Touch Handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragStartAngle(rotationAngle);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setRotationAngle(dragStartAngle + diff * 0.45);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Nearest Video Snap
    setRotationAngle((prev) => Math.round(prev / angleStep) * angleStep);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#06030a] text-white flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 overflow-hidden selection:bg-purple-500/30 select-none"
    >
      {/* Curved Screen ClipPath Definition */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <clipPath id="curvedScreenClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.02 0.06 Q 0.5 0.14 0.98 0.06 C 0.99 0.06 1 0.08 1 0.11 L 1 0.89 C 1 0.92 0.99 0.94 0.98 0.94 Q 0.5 0.86 0.02 0.94 C 0.01 0.94 0 0.92 0 0.89 L 0 0.11 C 0 0.08 0.01 0.06 0.02 0.06 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[700px] md:w-[1100px] h-[220px] sm:h-[400px] md:h-[600px] bg-purple-600/15 blur-[100px] sm:blur-[170px] rounded-full pointer-events-none" />

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

      {/* 3D CAROUSEL CONTAINER */}
      <div
        className="relative z-10 w-full h-[210px] sm:h-[320px] md:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none px-2"
        style={{ perspective: `${perspective}px` }}
        // Mouse Handlers
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        // Touch Handlers for Mobile
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {/* 3D Rotating Ring */}
        <div
          className={`relative w-[145px] sm:w-[270px] md:w-[380px] aspect-[16/9] ${
            isDragging ? "transition-none" : "transition-transform duration-500 ease-out"
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotationAngle}deg)`,
          }}
        >
          {worksList.map((item, index) => {
            const cardAngle = index * angleStep;

            return (
              <WorkCard3D
                key={`${item.id}-${index}`}
                item={item}
                angle={cardAngle}
                parentRotation={rotationAngle}
                radius={radius}
                angleStep={angleStep}
              />
            );
          })}
        </div>
      </div>

      {/* Action Button */}
      <div ref={buttonRef} className="z-10 mt-10 sm:mt-14 md:mt-20 shrink-0 relative group/btn px-4">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-40 blur-md group-hover/btn:opacity-80 transition-opacity duration-300" />
        <Link
          href="/work"
          className="relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-400/30 bg-[#120824]/90"
        >
          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" />
          <span className="relative z-10">View Full Portfolio</span>
          <ArrowUpRight className="relative z-10 w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 text-purple-300" />
        </Link>
      </div>
    </section>
  );
}

{/* Individual 3D Card Component */}
function WorkCard3D({
  item,
  angle,
  parentRotation,
  radius,
  angleStep,
}: {
  item: { id: number; video: string };
  angle: number;
  parentRotation: number;
  radius: number;
  angleStep: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Shortest angle from front
  const currentFacingAngle = (angle + parentRotation) % 360;
  let normalizedAngle = (currentFacingAngle + 360) % 360;
  if (normalizedAngle > 180) normalizedAngle = 360 - normalizedAngle;

  // Visibility & Scale settings for Mobile Viewport Hints
  let opacity = 0.2;
  let scale = 0.7;
  let brightness = "brightness(50%)";
  let isFront = false;

  if (normalizedAngle < angleStep * 0.4) {
    // Front Center
    isFront = true;
    opacity = 1;
    scale = 1;
    brightness = "brightness(100%)";
  } else if (normalizedAngle < angleStep * 1.4) {
    // 1st Adjacent Left & Right (Prominently Visible on Mobile)
    opacity = 0.9;
    scale = 0.85;
    brightness = "brightness(85%)";
  } else if (normalizedAngle < angleStep * 2.4) {
    // 2nd Adjacent Left & Right
    opacity = 0.5;
    scale = 0.72;
    brightness = "brightness(65%)";
  }

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform-gpu will-change-transform pointer-events-auto"
      style={{
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        backfaceVisibility: "visible",
        opacity,
        filter: brightness,
        WebkitBoxReflect:
          "below 6px linear-gradient(transparent 70%, rgba(0, 0, 0, 0.45))",
      }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-300 ${
          isFront ? "drop-shadow-[0_8px_20px_rgba(168,85,247,0.45)]" : ""
        }`}
        style={{ transform: `scale(${scale})` }}
      >
        {/* Curved Frame Container */}
        <div className="relative w-full h-full">
          {/* Curved Clip-Path Container */}
          <div
            className="relative w-full h-full bg-[#0a0514] overflow-hidden"
            style={{ clipPath: "url(#curvedScreenClip)" }}
          >
            <video
              ref={videoRef}
              src={item.video}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover scale-105 pointer-events-none"
            />

            {/* Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* Curved Border SVG Overlay */}
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
                  stopOpacity={isFront ? "0.9" : "0.4"}
                />
                <stop
                  offset="50%"
                  stopColor="#a855f7"
                  stopOpacity={isFront ? "0.6" : "0.3"}
                />
                <stop
                  offset="100%"
                  stopColor="#c026d3"
                  stopOpacity={isFront ? "0.9" : "0.4"}
                />
              </linearGradient>
            </defs>
            <path
              d="M 20 34 Q 500 78 980 34 C 990 34 1000 45 1000 62 L 1000 500 C 1000 517 990 528 980 528 Q 500 484 20 528 C 10 528 0 517 0 500 L 0 62 C 0 45 10 34 20 34 Z"
              fill="none"
              stroke={`url(#borderGrad-${item.id})`}
              strokeWidth={isFront ? "4" : "2.5"}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}