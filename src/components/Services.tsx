"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

// Premium High-End Custom Geometric Icons
const RealEstateIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" className="stroke-white/40" />
    <path d="M5 21V7l7-4 7 4v14" className="stroke-purple-400" />
    <path d="M9 10h2M13 10h2M9 14h2M13 14h2" className="stroke-white" />
    <path d="M10 21v-4h4v4" className="stroke-purple-400" />
  </svg>
);

const SaasAnimationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" className="stroke-purple-400" />
    <path d="M2 17l10 5 10-5" className="stroke-purple-400" />
    <path d="M2 12l10 5 10-5" className="stroke-white/50" />
    <circle cx="12" cy="12" r="2" fill="currentColor" className="text-purple-300 stroke-none" />
  </svg>
);

const CustomVideoEditingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3" className="stroke-purple-400" />
    <path d="M7 4v16M17 4v16" className="stroke-white/40" />
    <path d="M2 8h5M2 12h5M2 16h5M17 8h5M17 12h5M17 16h5" className="stroke-white/40" />
    <polygon points="10 9 15 12 10 15 10 9" fill="currentColor" className="text-purple-400 stroke-none" />
  </svg>
);

const services = [
  {
    id: 1,
    title: "Real Estate Media",
    description: "Cinematic architectural walkthroughs, speed ramps, drone footage color grading, and luxury property showcases.",
    icon: RealEstateIcon,
  },
  {
    id: 2,
    title: "Launch Videos SaaS Animation",
    description: "High-converting product demos, sleek 2D/3D motion graphics, UI animations, and explainer videos for SaaS launches.",
    icon: SaasAnimationIcon,
  },
  {
    id: 3,
    title: "Custom Video Editing",
    description: "Tailored high-retention cuts, custom sound design, visual effects, and narrative pacing built specifically for your brand.",
    icon: CustomVideoEditingIcon,
  },
];


export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section id="services" className="relative w-full min-h-screen bg-[#08050c] text-white flex flex-col items-center justify-center py-20 px-4 md:px-12 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/15 blur-[160px] rounded-full pointer-events-none" />

      {/* Heading */}
      <div className={`text-center z-10 mb-20 ${cinzel.className}`}>
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-purple-400/80 mb-3 font-semibold">
          What We Do
        </p>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-white drop-shadow-2xl">
          Our Services
        </h2>
      </div>

      {/* Circulation Orbit Area */}
      <div 
        className="relative w-full max-w-6xl h-[450px] flex items-center justify-center [perspective:1200px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {services.map((service, index) => {
          const offset = (index - activeIndex + services.length) % services.length;

          let xTransform = "0%";
          let zTransform = 0;
          let scale = 1;
          let opacity = 1;
          let rotateY = 0;
          let zIndex = 30;

          if (offset === 0) {
            // CENTER FRONT CARD
            xTransform = "0%";
            zTransform = 80;
            scale = 1;
            opacity = 1;
            rotateY = 0;
            zIndex = 30;
          } else if (offset === 1) {
            // FAR RIGHT CARD
            xTransform = "110%";
            zTransform = -100;
            scale = 0.9;
            opacity = 0.7;
            rotateY = -15;
            zIndex = 10;
          } else if (offset === 2) {
            // FAR LEFT CARD
            xTransform = "-110%";
            zTransform = -100;
            scale = 0.9;
            opacity = 0.7;
            rotateY = 15;
            zIndex = 10;
          }

          const IconComponent = service.icon;

          return (
            <motion.div
              key={service.id}
              initial={false}
              animate={{
                x: xTransform,
                z: zTransform,
                scale: scale,
                opacity: opacity,
                rotateY: rotateY,
                zIndex: zIndex,
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 1, 0.5, 1], // Smooth snappy transition
              }}
              style={{
                WebkitFontSmoothing: "antialiased",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
              }}
              className="absolute w-[300px] sm:w-[350px] h-[400px] bg-[#0e0818]/95 border border-purple-500/20 rounded-3xl p-8 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.9)] cursor-pointer select-none hover:border-purple-500/60 transition-colors"
              onClick={() => setActiveIndex(index)}
            >
              {/* Card Header (Clean Sharp Icon Container) */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center shadow-lg">
                  <IconComponent />
                </div>
              </div>

              {/* Card Content */}
              <div className="space-y-3">
                <h3 className={`text-2xl font-bold uppercase text-white tracking-wider ${cinzel.className}`}>
                  {service.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              {/* Card Footer Divider */}
              <div className="w-full h-[1px] bg-gradient-to-r from-purple-500/50 via-white/10 to-transparent" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}