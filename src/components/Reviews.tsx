'use client';

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Cinzel } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

interface Testimonial {
  id: string;
  videoSrc: string;
}

const testimonials: Testimonial[] = [
  { id: "1", videoSrc: "/videos/review1.mp4" },
  { id: "2", videoSrc: "/videos/review2.mp4" },
  { id: "3", videoSrc: "/videos/review3.mp4" },
  { id: "4", videoSrc: "/videos/review4.mp4" },
  { id: "5", videoSrc: "/videos/review5.mp4" },
  { id: "6", videoSrc: "/videos/review6.mp4" },
];

function VideoCard({ item, isActive }: { item: Testimonial; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
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

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-[190px] sm:w-[220px] aspect-[9/16] rounded-3xl overflow-hidden bg-[#0c0617] border transition-all duration-500 ease-out cursor-pointer ${
        isActive
          ? "border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.5)] scale-105 z-30"
          : "border-white/20 hover:border-purple-400/80 z-20"
      }`}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-all duration-500 ease-out"
      >
        <source src={item.videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

export default function VideoTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // GSAP References
  const sectionRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // 1. Setup Lenis and ScrollTrigger Entry Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Lenis Setup
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

    // GSAP Context for Scroll Entry
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Initial state hide
      gsap.set([subtitleRef.current, titleRef.current, carouselRef.current], {
        opacity: 0,
        y: 40,
      });

      // Sequential Entrance Animation
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          carouselRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5"
        );
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  // 2. Auto Rotation Timer
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
    <section
      ref={sectionRef}
      className="relative w-full py-28 bg-[#08050c] text-white border-t border-purple-950/40 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-purple-600/20 blur-[180px] rounded-full pointer-events-none" />

      {/* Heading */}
      <div
        className={`z-10 text-center max-w-5xl mx-auto flex flex-col items-center shrink-0 mb-16 px-4 ${cinzel.className}`}
      >
        <p
          ref={subtitleRef}
          className="text-xs sm:text-sm uppercase tracking-[0.4em] text-purple-300/60 mb-2"
        >
          Real Stories, Real Results
        </p>
        <h2
          ref={titleRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-lg"
        >
          Client Reviews
        </h2>
      </div>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center min-h-[460px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-40 w-11 h-11 rounded-full bg-black/80 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:border-purple-400 hover:bg-purple-950/60 transition-all duration-300 cursor-pointer shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-40 w-11 h-11 rounded-full bg-black/80 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:border-purple-400 hover:bg-purple-950/60 transition-all duration-300 cursor-pointer shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Rotator Ring Track */}
        <div className="relative w-full flex items-center justify-center h-[460px] [perspective:1000px]">
          {testimonials.map((item, index) => {
            const total = testimonials.length;
            const offset = (index - activeIndex + total) % total;

            let xPos = 0;
            let rotateY = 0;
            let scale = 0.8;
            let opacity = 0;
            let zIndex = 10;

            if (offset === 0) {
              xPos = 0;
              scale = 1.05;
              opacity = 1;
              zIndex = 30;
              rotateY = 0;
            } else if (offset === 1) {
              xPos = 210;
              scale = 0.92;
              opacity = 1;
              rotateY = -12;
              zIndex = 20;
            } else if (offset === 2) {
              xPos = 390;
              scale = 0.78;
              opacity = 0.5;
              rotateY = -25;
              zIndex = 10;
            } else if (offset === total - 1) {
              xPos = -210;
              scale = 0.92;
              opacity = 1;
              rotateY = 12;
              zIndex = 20;
            } else if (offset === total - 2) {
              xPos = -390;
              scale = 0.78;
              opacity = 0.5;
              rotateY = 25;
              zIndex = 10;
            } else {
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
                className="absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
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