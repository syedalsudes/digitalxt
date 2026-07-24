'use client';

import React, { useRef, useState, useEffect } from "react";
import { Play, Volume2, VolumeX, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

interface Testimonial {
  id: string;
  videoSrc: string;
  clientName: string;
  role: string;
}

const testimonials: Testimonial[] = [
  { id: "1", videoSrc: "/videos/testimonial-1.mp4", clientName: "Alex Rivera", role: "Content Creator" },
  { id: "2", videoSrc: "/videos/testimonial-2.mp4", clientName: "Sarah Khan", role: "E-Commerce Founder" },
  { id: "3", videoSrc: "/videos/testimonial-3.mp4", clientName: "Michael Blake", role: "Real Estate Agent" },
  { id: "4", videoSrc: "/videos/testimonial-4.mp4", clientName: "David Louis", role: "SaaS Founder" },
  { id: "5", videoSrc: "/videos/testimonial-5.mp4", clientName: "Elena Perez", role: "Marketing Director" },
  { id: "6", videoSrc: "/videos/testimonial-6.mp4", clientName: "John Miller", role: "Agency Owner" },
];

function VideoCard({ item, isActive }: { item: Testimonial; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnmuted, setIsUnmuted] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsUnmuted(true);
        })
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
            setIsPlaying(true);
            setIsUnmuted(false);
          }
        });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      setIsPlaying(false);
      setIsUnmuted(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative w-[200px] sm:w-[240px] aspect-[9/16] rounded-3xl overflow-hidden bg-[#0c0617] border transition-all duration-700 ease-out cursor-pointer ${
        isActive
          ? "border-purple-500/80 shadow-[0_0_40px_rgba(168,85,247,0.4)] scale-105 z-30"
          : "border-white/10 opacity-60 hover:opacity-100 hover:border-purple-400/50 hover:scale-100 z-10"
      }`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
      >
        <source src={item.videoSrc} type="video/mp4" />
      </video>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/30 opacity-90 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />

      {/* Top Controls Bar */}
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] font-bold text-white tracking-wider">5.0</span>
        </div>

        <div className="w-8 h-8 rounded-full bg-black/60 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:scale-110 group-hover:border-purple-400 transition-all duration-300">
          {isPlaying ? (
            isUnmuted ? (
              <Volume2 className="w-3.5 h-3.5 text-purple-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-white/60" />
            )
          ) : (
            <Play className="w-3.5 h-3.5 fill-white text-white translate-x-[1px]" />
          )}
        </div>
      </div>

      {/* Bottom Info Area */}
      <div className="absolute bottom-5 inset-x-5 z-20 flex flex-col gap-0.5 pointer-events-none">
        <span className="text-[11px] uppercase tracking-widest text-purple-400 font-semibold">
          {item.role}
        </span>
        <h3 className={`text-base sm:text-lg font-bold text-white drop-shadow-md ${cinzel.className}`}>
          {item.clientName}
        </h3>
      </div>

      {/* Hover Bottom Glow Line */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export default function VideoTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto Rotation Cycle (har 3.5 seconds mein rotate hoga)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative w-full py-28 bg-[#08050c] text-white border-t border-purple-950/40 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-purple-600/20 blur-[180px] rounded-full pointer-events-none" />

      {/* Heading */}
      <div className={`z-10 text-center max-w-5xl mx-auto flex flex-col items-center shrink-0 mb-16 px-4 ${cinzel.className}`}>
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-purple-300/60 mb-2">
          Real Stories, Real Results
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
          Client Reviews
        </h2>
      </div>

      {/* Single Line Rotating Carousel Container */}
      <div 
        className="relative w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[460px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-10 z-40 w-12 h-12 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl flex items-center justify-center text-white hover:border-purple-400 hover:bg-purple-950/40 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-10 z-40 w-12 h-12 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl flex items-center justify-center text-white hover:border-purple-400 hover:bg-purple-950/40 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Rotator Ring Track */}
        <div className="relative w-full flex items-center justify-center h-[460px] [perspective:1200px]">
          {testimonials.map((item, index) => {
            // Circular Offset Position relative to active index
            const total = testimonials.length;
            const offset = (index - activeIndex + total) % total;

            // Compute circular positions & transforms across 1 single line
            let xPos = 0;
            let rotateY = 0;
            let scale = 0.7;
            let opacity = 0.2;
            let zIndex = 10;

            if (offset === 0) {
              // Active Center Card
              xPos = 0;
              scale = 1.08;
              opacity = 1;
              zIndex = 30;
              rotateY = 0;
            } else if (offset === 1) {
              // Right Card 1
              xPos = 240;
              scale = 0.88;
              opacity = 0.75;
              rotateY = -25;
              zIndex = 20;
            } else if (offset === 2) {
              // Far Right Card 2
              xPos = 440;
              scale = 0.72;
              opacity = 0.4;
              rotateY = -40;
              zIndex = 10;
            } else if (offset === total - 1) {
              // Left Card 1
              xPos = -240;
              scale = 0.88;
              opacity = 0.75;
              rotateY = 25;
              zIndex = 20;
            } else if (offset === total - 2) {
              // Far Left Card 2
              xPos = -440;
              scale = 0.72;
              opacity = 0.4;
              rotateY = 40;
              zIndex = 10;
            } else {
              // Hidden Back Slot
              xPos = 0;
              scale = 0.5;
              opacity = 0;
              zIndex = 0;
            }

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  transform: `translateX(${xPos}px) scale(${scale}) rotateY(${rotateY}deg)`,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              >
                <VideoCard item={item} isActive={offset === 0} />
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}