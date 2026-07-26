"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Cinzel } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

// Sleek Professional Vector Icons
const RealEstateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M5 21V7l7-4 7 4v14" />
    <path d="M9 10h2M13 10h2M9 14h2M13 14h2" />
    <path d="M10 21v-4h4v4" />
  </svg>
);

const SaasAnimationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" strokeOpacity="0.4" />
  </svg>
);

const CustomVideoEditingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M7 4v16M17 4v16" strokeOpacity="0.4" />
    <polygon points="10 9 15 12 10 15 10 9" fill="currentColor" />
  </svg>
);

const services = [
  {
    id: 1,
    number: "01",
    tag: "ARCHITECTURAL",
    title: "Real Estate Media",
    description: "Cinematic architectural walkthroughs, speed ramps, drone footage color grading, and luxury property showcases.",
    icon: RealEstateIcon,
  },
  {
    id: 2,
    number: "02",
    tag: "MOTION GRAPHICS",
    title: "SaaS Launch Videos",
    description: "High-converting product demos, sleek 2D/3D motion graphics, UI animations, and explainer videos for SaaS launches.",
    icon: SaasAnimationIcon,
  },
  {
    id: 3,
    number: "03",
    tag: "POST PRODUCTION",
    title: "Custom Video Editing",
    description: "Tailored high-retention cuts, custom sound design, visual effects, and narrative pacing built specifically for your brand.",
    icon: CustomVideoEditingIcon,
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  // 1. GSAP Scroll Trigger Entrance (Repeat On Scroll Up/Down)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          // "restart none none reset" -> har baar screen par aane par naye siray se animate karega
          toggleActions: "restart reverse restart reverse",
          onEnter: () => setHasEntered(true),
          onLeave: () => setHasEntered(false),
          onEnterBack: () => setHasEntered(true),
          onLeaveBack: () => setHasEntered(false),
        },
      });

      // Header Animation
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      // Deck Entrance (Bounce Pop-up)
      tl.fromTo(
        deckRef.current,
        { opacity: 0, y: 130, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "back.out(1.5)",
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Auto Swap Carousel
  useEffect(() => {
    if (isHovered || !hasEntered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, hasEntered]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full min-h-screen bg-[#060608] text-white flex flex-col items-center justify-center py-24 px-4 md:px-12 overflow-hidden selection:bg-white/10"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-white/[0.02] blur-[160px] rounded-full pointer-events-none" />

      {/* Header */}
      <div ref={headerRef} className={`text-center z-10 mb-20 ${cinzel.className}`}>
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-400 mb-3 font-semibold">
          Services Portfolio
        </p>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wider bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent drop-shadow-xl">
          What We Do
        </h2>
      </div>

      {/* Orbit/Carousel Deck Container */}
      <div
        ref={deckRef}
        className="relative w-full max-w-5xl h-[460px] flex items-center justify-center [perspective:1400px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {services.map((service, index) => {
          const offset = (index - activeIndex + services.length) % services.length;

          let xTransform = "0%";
          let yOffset = 0;
          let scale = 1;
          let opacity = 1;
          let rotateY = 0;
          let rotateZ = 0;
          let zIndex = 30;

          if (offset === 0) {
            // CENTER CARD
            xTransform = "0%";
            yOffset = -15;
            scale = 1.05;
            opacity = 1;
            rotateY = 0;
            rotateZ = 0;
            zIndex = 30;
          } else if (offset === 1) {
            // RIGHT CARD
            xTransform = "118%";
            yOffset = 20;
            scale = 0.88;
            opacity = 0.45;
            rotateY = -18;
            rotateZ = 4;
            zIndex = 10;
          } else if (offset === 2) {
            // LEFT CARD
            xTransform = "-118%";
            yOffset = 20;
            scale = 0.88;
            opacity = 0.45;
            rotateY = 18;
            rotateZ = -4;
            zIndex = 10;
          }

          const IconComponent = service.icon;
          const isCurrentActive = offset === 0;

          return (
            <motion.div
              key={service.id}
              initial={false}
              animate={{
                x: xTransform,
                y: yOffset,
                scale: scale,
                opacity: opacity,
                rotateY: rotateY,
                rotateZ: rotateZ,
                zIndex: zIndex,
              }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                willChange: "transform, opacity",
                WebkitFontSmoothing: "antialiased",
                transformStyle: "preserve-3d",
              }}
              className={`absolute w-[320px] sm:w-[360px] h-[410px] rounded-3xl p-8 flex flex-col justify-between cursor-pointer select-none transition-colors duration-500 backdrop-blur-2xl ${
                isCurrentActive
                  ? "bg-[#111115]/95 border border-white/25 shadow-[0_25px_60px_-15px_rgba(255,255,255,0.06)]"
                  : "bg-[#0a0a0c]/90 border border-white/5 hover:border-white/15 shadow-2xl"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {/* Card Top */}
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                  isCurrentActive 
                    ? "bg-white/10 border-white/30 text-white shadow-inner" 
                    : "bg-white/5 border-white/10 text-neutral-400"
                }`}>
                  <IconComponent />
                </div>
                
                <span className="text-[11px] font-mono tracking-widest text-neutral-500">
                  {service.number}
                </span>
              </div>

              {/* Card Body */}
              <div className="space-y-3 my-auto">
                <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                  {service.tag}
                </span>
                <h3 className={`text-2xl font-bold uppercase tracking-wide text-white ${cinzel.className}`}>
                  {service.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>

              {/* Card Bottom */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className={`text-[11px] uppercase tracking-wider font-medium transition-colors ${
                  isCurrentActive ? "text-white" : "text-neutral-400"
                }`}>
                  View Detail
                </span>
                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  isCurrentActive ? "bg-white" : "bg-white/30"
                }`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Indicators */}
      <div className="flex items-center gap-2 mt-12 z-10">
        {services.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-700 ${
              activeIndex === idx 
                ? "w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]" 
                : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}