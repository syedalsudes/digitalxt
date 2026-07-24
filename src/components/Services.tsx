"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cinzel } from "next/font/google";
import { Film, Sparkles, Video } from "lucide-react";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

const services = [
  {
    id: 1,
    title: "Video Editing",
    description: "High-paced cuts, seamless transitions, and narrative-driven storytelling for high impact.",
    icon: Film,
  },
  {
    id: 2,
    title: "Color Grading",
    description: "Cinematic color tones and atmospheric mood setting tailored to elevate your visual identity.",
    icon: Sparkles,
  },
  {
    id: 3,
    title: "Motion Graphics",
    description: "Dynamic 2D/3D elements, typography animation, and high-end visual effects (VFX).",
    icon: Video,
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto Circulation Loop (3 seconds)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-center py-20 px-4 md:px-12 overflow-hidden">
      {/* Background Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/15 blur-[160px] rounded-full pointer-events-none" />

      {/* Heading */}
      <div className={`text-center z-10 mb-20 ${cinzel.className}`}>
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-white/50 mb-3">
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
          // Relative Orbit Position Calculation (0: Center, 1: Far Right, 2: Far Left)
          const offset = (index - activeIndex + services.length) % services.length;

          // Wide Spacing & Curved Perspective Setup
          let xTransform = "0%";
          let zTransform = 0;
          let scale = 1;
          let opacity = 1;
          let rotateY = 0;
          let zIndex = 30;

          if (offset === 0) {
            // CENTER FRONT CARD
            xTransform = "0%";
            zTransform = 100;
            scale = 1.05;
            opacity = 1;
            rotateY = 0;
            zIndex = 30;
          } else if (offset === 1) {
            // FAR RIGHT CARD (Distinct & Wide)
            xTransform = "115%"; // Dhoor spaced
            zTransform = -120; // Thoda depth mein
            scale = 0.88;
            opacity = 0.75;
            rotateY = -18; // Inward Curve Direction
            zIndex = 10;
          } else if (offset === 2) {
            // FAR LEFT CARD (Distinct & Wide)
            xTransform = "-115%"; // Dhoor spaced
            zTransform = -120; // Thoda depth mein
            scale = 0.88;
            opacity = 0.75;
            rotateY = 18; // Inward Curve Direction
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
                duration: 0.9,
                ease: [0.34, 1.3, 0.64, 1], // Custom Bouncy Orbit Motion (Circulate effect)
              }}
              className="absolute w-[290px] sm:w-[340px] h-[390px] bg-neutral-950/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer select-none hover:border-white/40 transition-colors"
              onClick={() => setActiveIndex(index)}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-inner">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className={`text-2xl font-bold text-white/30 ${cinzel.className}`}>
                  0{service.id}
                </span>
              </div>

              {/* Card Content */}
              <div className="space-y-3">
                <h3 className={`text-2xl font-bold uppercase text-white tracking-wider ${cinzel.className}`}>
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              {/* Card Footer Divider */}
              <div className="w-full h-[1px] bg-gradient-to-r from-white/40 via-white/10 to-transparent" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}