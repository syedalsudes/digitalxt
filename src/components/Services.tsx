"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { Cinzel } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap", // Font swap optimization
});

// Memoized Vector Icons for performance
const RealEstateIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M5 21V7l7-4 7 4v14" />
    <path d="M9 10h2M13 10h2M9 14h2M13 14h2" />
    <path d="M10 21v-4h4v4" />
  </svg>
));
RealEstateIcon.displayName = "RealEstateIcon";

const SaasAnimationIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" strokeOpacity="0.4" />
  </svg>
));
SaasAnimationIcon.displayName = "SaasAnimationIcon";

const CustomVideoEditingIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M7 4v16M17 4v16" strokeOpacity="0.4" />
    <polygon points="10 9 15 12 10 15 10 9" fill="currentColor" />
  </svg>
));
CustomVideoEditingIcon.displayName = "CustomVideoEditingIcon";

const services = [
  {
    id: 1,
    number: "01",
    tag: "ARCHITECTURAL",
    title: "Real Estate Media",
    description: "Cinematic architectural walkthroughs, speed ramps, drone footage color grading, and luxury property showcases.",
    icon: RealEstateIcon,
    image: "/services2.png",
    link: "/services/real-estate",
  },
  {
    id: 2,
    number: "02",
    tag: "MOTION GRAPHICS",
    title: "SaaS Launch Videos",
    description: "High-converting product demos, sleek 2D/3D motion graphics, UI animations, and explainer videos for SaaS launches.",
    icon: SaasAnimationIcon,
    image: "/services3.png",
    link: "/services/saas-videos",
  },
  {
    id: 3,
    number: "03",
    tag: "POST PRODUCTION",
    title: "Custom Video Editing",
    description: "Tailored high-retention cuts, custom sound design, visual effects, and narrative pacing built specifically for your brand.",
    icon: CustomVideoEditingIcon,
    image: "/services3.png",
    link: "/services/short-form",
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [screenType, setScreenType] = useState<"mobile" | "desktop" | "large">("desktop");

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const deckWrapperRef = useRef<HTMLDivElement>(null);

  // Optimized Debounce Resize Listener
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const checkScreen = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        if (width < 640) setScreenType("mobile");
        else if (width >= 1440) setScreenType("large");
        else setScreenType("desktop");
      }, 150);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  // GSAP Entrance Optimization
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true, // Only trigger once to avoid unnecessary re-calculations
          onEnter: () => setHasEntered(true),
        },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      ).fromTo(
        deckWrapperRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto Carousel Loop
  useEffect(() => {
    if (isHovered || !hasEntered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered, hasEntered]);

  const handleNext = useCallback(() => setActiveIndex((prev) => (prev + 1) % services.length), []);
  const handlePrev = useCallback(() => setActiveIndex((prev) => (prev - 1 + services.length) % services.length), []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full min-h-[100dvh] bg-[#06030a] text-white flex flex-col items-center justify-center py-16 sm:py-24 2xl:py-32 px-4 md:px-12 2xl:px-20 overflow-hidden selection:bg-purple-500/30"
    >
      {/* Optimized Background Glow: Removed heavy blur filters */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] 2xl:w-[800px] h-[300px] sm:h-[400px] 2xl:h-[500px] rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(6,3,10,0) 70%)"
        }}
      />

      {/* Header */}
      <div ref={headerRef} className={`text-center z-10 mb-10 sm:mb-16 2xl:mb-24 ${cinzel.className}`}>
        <p className="text-[10px] sm:text-xs 2xl:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-purple-300/70 mb-2 sm:mb-3 font-semibold">
          Services Portfolio
        </p>
        <h2 className="text-3xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black uppercase tracking-wider bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
          What We Do
        </h2>
      </div>

      {/* Wrapper */}
      <div ref={deckWrapperRef} className="w-full max-w-5xl 2xl:max-w-7xl flex flex-col items-center justify-center z-10">
        <div
          className="relative w-full h-[380px] sm:h-[460px] 2xl:h-[540px] flex items-center justify-center touch-pan-x"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {services.map((service, index) => {
            const offset = (index - activeIndex + services.length) % services.length;

            let xTransform = "0%";
            let yOffset = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (offset === 0) {
              xTransform = "0%";
              yOffset = screenType === "mobile" ? -8 : screenType === "large" ? -20 : -15;
              scale = screenType === "mobile" ? 1 : screenType === "large" ? 1.05 : 1.02;
              opacity = 1;
              zIndex = 30;
            } else if (offset === 1) {
              xTransform = screenType === "mobile" ? "55%" : screenType === "large" ? "100%" : "105%";
              yOffset = screenType === "mobile" ? 10 : 20;
              scale = screenType === "mobile" ? 0.8 : 0.88;
              opacity = screenType === "mobile" ? 0.35 : 0.6;
              zIndex = 10;
            } else if (offset === 2) {
              xTransform = screenType === "mobile" ? "-55%" : screenType === "large" ? "-100%" : "-105%";
              yOffset = screenType === "mobile" ? 10 : 20;
              scale = screenType === "mobile" ? 0.8 : 0.88;
              opacity = screenType === "mobile" ? 0.35 : 0.6;
              zIndex = 10;
            }

            const IconComponent = service.icon;
            const isCurrentActive = offset === 0;

            return (
              <motion.div
                key={service.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -35) handleNext();
                  if (info.offset.x > 35) handlePrev();
                }}
                animate={{
                  x: xTransform,
                  y: yOffset,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
                style={{
                  willChange: "transform, opacity",
                  WebkitFontSmoothing: "antialiased",
                }}
                className={`absolute w-[270px] xs:w-[290px] sm:w-[360px] 2xl:w-[460px] h-[350px] sm:h-[410px] 2xl:h-[500px] rounded-2xl sm:rounded-3xl 2xl:rounded-[32px] p-6 sm:p-8 2xl:p-12 flex flex-col justify-between cursor-grab active:cursor-grabbing select-none overflow-hidden ${
                  isCurrentActive
                    ? "border border-purple-500/50 bg-[#0d0718]/90 shadow-2xl"
                    : "border border-purple-500/20 bg-[#06030a]/80 shadow-lg"
                }`}
                onClick={() => {
                  if (!isCurrentActive) setActiveIndex(index);
                }}
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 290px, (max-width: 1440px) 360px, 460px"
                    quality={75}
                    loading={isCurrentActive ? "eager" : "lazy"}
                    decoding="async"
                    className="object-cover opacity-60"
                  />
                </div>

                {/* Card Top */}
                <div className="relative z-10 flex items-center justify-between">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 rounded-xl sm:rounded-2xl 2xl:rounded-3xl flex items-center justify-center border transition-colors ${
                      isCurrentActive
                        ? "bg-purple-950/80 border-purple-400/50 text-purple-300"
                        : "bg-black/60 border-purple-500/20 text-neutral-300"
                    }`}
                  >
                    <IconComponent />
                  </div>

                  <span className="text-[10px] sm:text-[11px] 2xl:text-sm font-mono tracking-widest text-purple-300/80 font-bold">
                    {service.number}
                  </span>
                </div>

                {/* Card Body */}
                <div className="relative z-10 space-y-2 sm:space-y-3 2xl:space-y-4 my-auto">
                  <span
                    className={`text-[9px] sm:text-[10px] 2xl:text-xs font-bold tracking-[0.2em] uppercase ${
                      isCurrentActive ? "text-purple-300" : "text-purple-400/80"
                    }`}
                  >
                    {service.tag}
                  </span>
                  <h3 className={`text-xl sm:text-2xl 2xl:text-3xl font-bold uppercase tracking-wide text-white ${cinzel.className}`}>
                    {service.title}
                  </h3>
                  <p className="text-neutral-200 text-[11px] sm:text-sm 2xl:text-base leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                    {service.description}
                  </p>
                </div>

                {/* Card Bottom */}
                <div className="relative z-10 pt-3 sm:pt-4 2xl:pt-6 border-t border-purple-500/30 flex items-center justify-between">
                  <a
                    href={service.link}
                    onClick={(e) => {
                      if (!isCurrentActive) {
                        e.preventDefault();
                        setActiveIndex(index);
                      }
                    }}
                    className={`relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] 2xl:text-xs font-bold uppercase tracking-wider text-white transition-transform active:scale-95 border border-purple-400/40 ${
                      isCurrentActive ? "bg-[#120824]" : "bg-black/70"
                    }`}
                  >
                    <span>View Detail</span>
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" />
                  </a>

                  {/* Indicator Dot */}
                  <div
                    className={`w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full ${
                      isCurrentActive ? "bg-purple-400" : "bg-purple-500/40"
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Indicators */}
        <div className="flex items-center gap-2 mt-8 sm:mt-12 2xl:mt-16 z-10">
          {services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 2xl:h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-7 sm:w-8 2xl:w-12 bg-gradient-to-r from-purple-500 to-fuchsia-500"
                  : "w-1.5 2xl:w-2 bg-purple-950/50 border border-purple-500/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}