'use client';

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
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

function VideoCard({
  item,
  isActive,
  onMakeActive,
}: {
  item: Testimonial;
  isActive: boolean;
  onMakeActive: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Jab active status change ho to inactive videos ko pause aur reset kar do
  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback agar browser sound ke sath play allow na kare
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
            setIsPlaying(true);
          }
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseEnter = () => {
    // Desktop hover effect (optional preview)
    if (window.innerWidth >= 768 && videoRef.current && !isPlaying) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768 && videoRef.current && !isPlaying) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // 1. Clear center mein nahi hai toh pehle ise active/center banao
    if (!isActive) {
      onMakeActive();
      return;
    }

    // 2. Agar active hai to wahi cards par hi play/pause toggle karo
    togglePlay();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative w-[130px] xs:w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] 2xl:w-[250px] h-[230px] sm:h-[310px] md:h-[340px] 2xl:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0c0617] border transition-all duration-300 ease-out cursor-pointer select-none group shadow-2xl ${
        isActive
          ? "border-purple-400 shadow-[0_10px_35px_rgba(168,85,247,0.45)] z-30"
          : "border-white/15 hover:border-purple-400/60 z-20"
      }`}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
      >
        <source src={item.videoSrc} type="video/mp4" />
      </video>

      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

      {/* Play/Pause Button Overlay */}
     
    </div>
  );
}

export default function VideoTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [screenType, setScreenType] = useState<"mobile" | "desktop" | "large">("desktop");

  // Smooth Drag logic
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number>(0);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  // GSAP References
  const sectionRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Screen Resize Detector
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

  // 1. Setup Lenis and ScrollTrigger Entrance Animation
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
      ).fromTo(
        carouselRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.2)",
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
    if (isHovered || isDragging) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, isDragging]);

  // 3. Stop videos on section leave
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            const videos = sectionRef.current?.querySelectorAll("video");
            videos?.forEach((vid) => {
              vid.pause();
              vid.muted = true;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Drag & Swipe Handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = dragStartX.current - clientX;

    if (Math.abs(diff) > 25) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    }
  };

  // Horizontal Trackpad/Mouse Wheel Scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 15) {
      if (!wheelTimeout.current) {
        if (e.deltaX > 0) {
          setActiveIndex((prev) => (prev + 1) % testimonials.length);
        } else {
          setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        }

        wheelTimeout.current = setTimeout(() => {
          wheelTimeout.current = null;
        }, 350);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 sm:py-20 2xl:py-28 bg-[#08050c] text-white border-t border-purple-950/40 overflow-hidden select-none"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[750px] 2xl:w-[1000px] h-[300px] sm:h-[450px] 2xl:h-[600px] bg-purple-600/15 blur-[100px] sm:blur-[160px] 2xl:blur-[200px] rounded-full pointer-events-none" />

      {/* Heading */}
      <div
        className={`z-10 text-center max-w-5xl 2xl:max-w-7xl mx-auto flex flex-col items-center shrink-0 mb-16 sm:mb-24 2xl:mb-32 px-4 ${cinzel.className}`}
      >
        <p
          ref={subtitleRef}
          className="text-[10px] sm:text-xs 2xl:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-purple-300/60 mb-1.5 font-semibold"
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

      {/* Interactive Drag & Swipe Track */}
      <div
        ref={carouselRef}
        className="relative w-full max-w-6xl 2xl:max-w-[1500px] mx-auto px-2 sm:px-4 flex flex-col items-center justify-center min-h-[280px] sm:min-h-[360px] 2xl:min-h-[440px] cursor-grab active:cursor-grabbing touch-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsDragging(false);
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
        onWheel={handleWheel}
      >
        {/* Curved Fan Rotator Ring */}
        <div className="relative w-full flex items-center justify-center h-[280px] sm:h-[360px] 2xl:h-[440px] [perspective:1200px]">
          {testimonials.map((item, index) => {
            const total = testimonials.length;
            const offset = (index - activeIndex + total) % total;

            let xPos = 0;
            let yPos = 0;
            let rotateZ = 0;
            let rotateY = 0;
            let scale = 0.8;
            let opacity = 0;
            let zIndex = 10;

            if (offset === 0) {
              // CENTER ACTIVE VIDEO
              xPos = 0;
              yPos = screenType === "mobile" ? -5 : -12;
              scale = screenType === "mobile" ? 1.05 : screenType === "large" ? 1.15 : 1.1;
              opacity = 1;
              zIndex = 30;
              rotateZ = 0;
              rotateY = 0;
            } else if (offset === 1) {
              // RIGHT 1
              xPos = screenType === "mobile" ? 100 : screenType === "large" ? 240 : 180;
              yPos = screenType === "mobile" ? 15 : 25;
              scale = screenType === "mobile" ? 0.84 : 0.92;
              opacity = screenType === "mobile" ? 0.65 : 0.9;
              rotateZ = 6;
              rotateY = -12;
              zIndex = 20;
            } else if (offset === 2) {
              // RIGHT 2
              xPos = screenType === "mobile" ? 165 : screenType === "large" ? 430 : 330;
              yPos = screenType === "mobile" ? 35 : 55;
              scale = screenType === "mobile" ? 0.68 : 0.76;
              opacity = screenType === "mobile" ? 0.25 : 0.55;
              rotateZ = 12;
              rotateY = -24;
              zIndex = 10;
            } else if (offset === total - 1) {
              // LEFT 1
              xPos = screenType === "mobile" ? -100 : screenType === "large" ? -240 : -180;
              yPos = screenType === "mobile" ? 15 : 25;
              scale = screenType === "mobile" ? 0.84 : 0.92;
              opacity = screenType === "mobile" ? 0.65 : 0.9;
              rotateZ = -6;
              rotateY = 12;
              zIndex = 20;
            } else if (offset === total - 2) {
              // LEFT 2
              xPos = screenType === "mobile" ? -165 : screenType === "large" ? -430 : -330;
              yPos = screenType === "mobile" ? 35 : 55;
              scale = screenType === "mobile" ? 0.68 : 0.76;
              opacity = screenType === "mobile" ? 0.25 : 0.55;
              rotateZ = -12;
              rotateY = 24;
              zIndex = 10;
            } else {
              xPos = 0;
              yPos = 80;
              scale = 0.5;
              opacity = 0;
              zIndex = 0;
            }

            return (
              <div
                key={item.id}
                style={{
                  transform: `translate3d(${xPos}px, ${yPos}px, 0px) scale(${scale}) rotateZ(${rotateZ}deg) rotateY(${rotateY}deg)`,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                className="absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom transform-gpu"
              >
                <VideoCard
                  item={item}
                  isActive={offset === 0}
                  onMakeActive={() => setActiveIndex(index)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}