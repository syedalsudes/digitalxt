'use client';

import React, { useState, useEffect, useRef } from "react";
import { Check, Sparkles, Zap } from "lucide-react";
import { Cinzel } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

interface PricingPlan {
  id: string;
  badge: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "short-form",
    badge: "CLASSIC",
    title: "Short-Form Videos",
    price: "$50",
    description: "Video editing for short form videos up to 120 seconds runtime.",
    features: [
      "24/7 customer support",
      "Free unlimited revisions",
      "4K Quality",
      "1 day turn around time",
    ],
    isPopular: false,
  },
  {
    id: "dedicated-editors",
    badge: "MOST POPULAR",
    title: "Dedicated Editors",
    price: "$1200",
    description: "Personalized video editor with 40 hr/week dedication to your projects.",
    features: [
      "Videos Tracking Sheet",
      "Urgent Requests",
      "4K Quality",
      "Personal Content Manager",
    ],
    isPopular: true,
  },
  {
    id: "long-form",
    badge: "CLASSIC",
    title: "Long-Form Videos",
    price: "$150",
    description: "Video editing for long form videos up to 60 minutes runtime.",
    features: [
      "24/7 Support",
      "Horizontal size",
      "4K Quality",
      "1 day turn around",
    ],
    isPopular: false,
  },
];

function PricingCard({ plan }: { plan: PricingPlan }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  // 3D Tilt Effect on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10; // Tilt angle X
    const rotY = ((x - centerX) / centerX) * 10;  // Tilt angle Y

    setRotateX(rotX);
    setRotateY(rotY);
    setSpotlightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={`group relative flex flex-col justify-between p-8 sm:p-9 rounded-3xl transition-transform duration-200 ease-out cursor-pointer ${
        plan.isPopular
          ? "bg-[#110722] border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.3)] z-20 md:-translate-y-4"
          : "bg-[#0c0617] border border-white/10 hover:border-purple-500/50"
      }`}
    >
      {/* Dynamic Cursor Spotlight Glow Overlay */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(168, 85, 247, 0.15), transparent 80%)`,
        }}
      />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between mb-6">
        <span
          className={`text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full border ${
            plan.isPopular
              ? "bg-purple-600/30 border-purple-400 text-purple-200"
              : "bg-white/5 border-white/10 text-gray-400"
          }`}
        >
          {plan.badge}
        </span>
        {plan.isPopular && (
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
        )}
      </div>

      {/* Title & Price */}
      <div className="mb-8">
        <h3 className={`text-xl sm:text-2xl font-bold text-white mb-2 ${cinzel.className}`}>
          {plan.title}
        </h3>
        
        <div className="flex items-baseline gap-1 my-4">
          <span className={`text-4xl sm:text-5xl font-black text-white ${cinzel.className}`}>
            {plan.price}
          </span>
          <span className="text-xs text-gray-400 font-light">/ project</span>
        </div>

        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light min-h-[40px]">
          {plan.description}
        </p>
      </div>

      {/* Features Checklist */}
      <div className="flex-1 mb-8">
        <div className="w-full h-[1px] bg-gradient-to-r from-purple-500/30 via-white/10 to-transparent mb-6" />
        <ul className="space-y-4">
          {plan.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 text-xs sm:text-sm text-gray-300 font-light group-hover:translate-x-1 transition-transform duration-300"
            >
              <div className="w-5 h-5 rounded-full bg-purple-950/80 border border-purple-500/50 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:border-purple-400 transition-colors">
                <Check className="w-3 h-3 text-purple-300 group-hover:text-white stroke-[3]" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-auto">
        <button className="w-full py-3.5 px-6 rounded-full bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95">
          Customize Package
        </button>

        <button
          className={`w-full py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
            plan.isPopular
              ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white shadow-lg shadow-purple-600/30 hover:scale-105"
              : "bg-white text-purple-950 hover:bg-gray-100"
          }`}
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Subscribe Now</span>
        </button>
      </div>

      {/* Bottom Glowing Border */}
      <div className="absolute bottom-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export default function PricingSection() {
  // GSAP References
  const sectionRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Lenis Smooth Scroll Engine
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

    // 2. GSAP Scroll Animations Context
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      const cards = cardsGridRef.current ? cardsGridRef.current.children : [];

      // Initial state reset
      gsap.set([subtitleRef.current, titleRef.current], {
        opacity: 0,
        y: 40,
      });

      gsap.set(cards, {
        opacity: 0,
        y: 60,
      });

      // Sequential Entrance Animation
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        )
        // Staggered Cards Reveal Animation
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 bg-[#08050c] text-white border-t border-purple-950/40 overflow-hidden"
    >
      {/* Background Ambient Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-purple-600/20 blur-[180px] rounded-full pointer-events-none" />

      {/* Heading Zone */}
      <div className={`z-10 text-center max-w-5xl mx-auto flex flex-col items-center shrink-0 mb-20 px-4 ${cinzel.className}`}>
        <p
          ref={subtitleRef}
          className="text-xs sm:text-sm uppercase tracking-[0.4em] text-purple-300/60 mb-2"
        >
          Flexible Pricing For Every Creator
        </p>
        <h2
          ref={titleRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-lg"
        >
          Choose Your Package
        </h2>
      </div>

      {/* Pricing Cards Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}