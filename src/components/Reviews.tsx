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
      className={`relative w-[150px] xs:w-[170px] sm:w-[210px] 2xl:w-[260px] aspect-[9/16] rounded-2xl sm:rounded-3xl 2xl:rounded-[32px] overflow-hidden bg-[#0c0617] border transition-all duration-500 ease-out cursor-pointer select-none ${
        isActive
          ? "border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.55)] z-30"
          : "border-white/20 hover:border-purple-400/80 z-20"
      }`}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-all duration-500 ease-out pointer-events-none"
      >
        <source src={item.videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

export default function VideoTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [screenType, setScreenType] = useState<"mobile" | "desktop" | "large">("desktop");

  // GSAP References
  const sectionRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Screen resize detector for small mobile, standard desktop & 1440px+ screens
  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenType("mobile");
      } else if (width >= 1440) {
        setScreenType("large");
      } else {
        setScreenType("desktop");
      }
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 1. Setup Lenis and ScrollTrigger Repeat Entrance Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      // Heading Slide Down
      tl.fromTo(
        [subtitleRef.current, titleRef.current],
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
        }
      )
        // Carousel Frame Entrance
        .fromTo(
          carouselRef.current,
          { opacity: 0, y: 120, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "back.out(1.4)",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateLenis);
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

  // Touch Swipe Handlers for Mobile
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 2xl:py-36 bg-[#08050c] text-white border-t border-purple-950/40 overflow-hidden select-none"
    >
      {/* Background Ambient Glow Scaled */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[850px] 2xl:w-[1100px] h-[350px] sm:h-[550px] 2xl:h-[700px] bg-purple-600/20 blur-[120px] sm:blur-[180px] 2xl:blur-[220px] rounded-full pointer-events-none" />

      {/* Heading */}
      <div
        className={`z-10 text-center max-w-5xl 2xl:max-w-7xl mx-auto flex flex-col items-center shrink-0 mb-12 sm:mb-16 2xl:mb-24 px-4 ${cinzel.className}`}
      >
        <p
          ref={subtitleRef}
          className="text-[10px] sm:text-xs 2xl:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-purple-300/60 mb-2 font-semibold"
        >
          Real Stories, Real Results
        </p>
        <h2
          ref={titleRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-lg"
        >
          Client Reviews
        </h2>
      </div>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative w-full max-w-6xl 2xl:max-w-[1400px] mx-auto px-2 sm:px-4 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] 2xl:min-h-[580px] touch-pan-y"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          aria-label="Previous Review"
          className="absolute left-1 sm:left-4 2xl:left-8 z-40 w-9 h-9 sm:w-11 sm:h-11 2xl:w-14 2xl:h-14 rounded-full bg-black/80 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:border-purple-400 hover:bg-purple-950/60 transition-all duration-300 cursor-pointer shadow-xl"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-8 2xl:h-8" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Review"
          className="absolute right-1 sm:right-4 2xl:right-8 z-40 w-9 h-9 sm:w-11 sm:h-11 2xl:w-14 2xl:h-14 rounded-full bg-black/80 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:border-purple-400 hover:bg-purple-950/60 transition-all duration-300 cursor-pointer shadow-xl"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-8 2xl:h-8" />
        </button>

        {/* Rotator Ring Track */}
        <div className="relative w-full flex items-center justify-center h-[380px] sm:h-[460px] 2xl:h-[580px] [perspective:1000px] 2xl:[perspective:1600px]">
          {testimonials.map((item, index) => {
            const total = testimonials.length;
            const offset = (index - activeIndex + total) % total;

            let xPos = 0;
            let rotateY = 0;
            let scale = 0.8;
            let opacity = 0;
            let zIndex = 10;

            if (offset === 0) {
              // CENTER ACTIVE VIDEO
              xPos = 0;
              scale = screenType === "mobile" ? 1 : screenType === "large" ? 1.1 : 1.05;
              opacity = 1;
              zIndex = 30;
              rotateY = 0;
            } else if (offset === 1) {
              // RIGHT 1
              xPos = screenType === "mobile" ? 110 : screenType === "large" ? 280 : 210;
              scale = screenType === "mobile" ? 0.82 : 0.92;
              opacity = screenType === "mobile" ? 0.4 : 0.95;
              rotateY = screenType === "mobile" ? -18 : -12;
              zIndex = 20;
            } else if (offset === 2) {
              // RIGHT 2
              xPos = screenType === "mobile" ? 190 : screenType === "large" ? 500 : 390;
              scale = screenType === "mobile" ? 0.65 : 0.78;
              opacity = screenType === "mobile" ? 0.15 : 0.5;
              rotateY = screenType === "mobile" ? -28 : -25;
              zIndex = 10;
            } else if (offset === total - 1) {
              // LEFT 1
              xPos = screenType === "mobile" ? -110 : screenType === "large" ? -280 : -210;
              scale = screenType === "mobile" ? 0.82 : 0.92;
              opacity = screenType === "mobile" ? 0.4 : 0.95;
              rotateY = screenType === "mobile" ? 18 : 12;
              zIndex = 20;
            } else if (offset === total - 2) {
              // LEFT 2
              xPos = screenType === "mobile" ? -190 : screenType === "large" ? -500 : -390;
              scale = screenType === "mobile" ? 0.65 : 0.78;
              opacity = screenType === "mobile" ? 0.15 : 0.5;
              rotateY = screenType === "mobile" ? 28 : 25;
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