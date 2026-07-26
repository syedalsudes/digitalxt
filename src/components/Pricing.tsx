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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

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
      className={`pricing-card-inner group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl transition-all duration-300 ease-out cursor-pointer h-full w-full max-w-[340px] shadow-2xl backdrop-blur-md hover:scale-105 hover:z-50 ${
        plan.isPopular
          ? "bg-[#140827]/95 border-2 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.35)] z-20"
          : "bg-[#0d0718]/90 border border-white/10 hover:border-purple-500/60 z-10"
      }`}
    >
      {/* Dynamic Spotlight Glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(168, 85, 247, 0.2), transparent 80%)`,
        }}
      />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between mb-4">
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
      <div className="mb-4">
        <h3 className={`text-lg sm:text-xl font-bold text-white mb-1 ${cinzel.className}`}>
          {plan.title}
        </h3>
        
        <div className="flex items-baseline gap-1 my-2">
          <span className={`text-3xl sm:text-4xl font-black text-white ${cinzel.className}`}>
            {plan.price}
          </span>
          <span className="text-xs text-gray-400 font-light">/ project</span>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed font-light min-h-[36px]">
          {plan.description}
        </p>
      </div>

      {/* Features Checklist */}
      <div className="flex-1 mb-5">
        <div className="w-full h-[1px] bg-gradient-to-r from-purple-500/30 via-white/10 to-transparent mb-4" />
        <ul className="space-y-2.5">
          {plan.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-xs text-gray-300 font-light group-hover:translate-x-1 transition-transform duration-300"
            >
              <div className="w-4 h-4 rounded-full bg-purple-950/80 border border-purple-500/50 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:border-purple-400 transition-colors">
                <Check className="w-2.5 h-2.5 text-purple-300 group-hover:text-white stroke-[3]" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-auto">
        <button className="w-full py-2.5 px-4 rounded-full bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-white/10 text-white font-bold text-[11px] uppercase tracking-wider transition-all duration-300 active:scale-95">
          Customize Package
        </button>

        <button
          className={`w-full py-2.5 px-4 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
            plan.isPopular
              ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50"
              : "bg-white text-purple-950 hover:bg-gray-100"
          }`}
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Subscribe Now</span>
        </button>
      </div>

      <div className="absolute bottom-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

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
      const cards = cardsWrapperRef.current ? Array.from(cardsWrapperRef.current.children) : [];

      gsap.set([subtitleRef.current, titleRef.current], {
        opacity: 0,
        y: 30,
      });

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1.2,
          pin: true,
        },
      });

      // 1. Heading Fade In
      mainTl.to([subtitleRef.current, titleRef.current], {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.5,
      });

      // 2. Custom Elevation: First Card raised (y: -10), Center Card Highest (y: -30), Last Card slightly lower (y: 15)
      gsap.set(cards[0], { rotate: -6, y: -10, transformOrigin: "bottom center" });
      gsap.set(cards[1], { rotate: 0, y: -30, transformOrigin: "bottom center" });
      gsap.set(cards[2], { rotate: 6, y: 15, transformOrigin: "bottom center" });

      // 3. Fall animation to right side
      mainTl.to(cards[0], {
        rotate: 30,
        xPercent: 110,
        yPercent: 40,
        opacity: 0,
        ease: "power2.inOut",
        duration: 1,
      }, "+=0.3");

      mainTl.to(cards[1], {
        rotate: 25,
        xPercent: 90,
        yPercent: 30,
        opacity: 0,
        ease: "power2.inOut",
        duration: 1,
      }, "-=0.7");

      mainTl.to(cards[2], {
        rotate: 20,
        xPercent: 70,
        yPercent: 20,
        opacity: 0,
        ease: "power2.inOut",
        duration: 1,
      }, "-=0.7");

      // 4. Return animation from left side back to elevated positions
      mainTl.fromTo(
        cards,
        {
          xPercent: -110,
          rotate: -30,
          yPercent: 30,
          opacity: 0,
        },
        {
          xPercent: 0,
          rotate: (i) => (i === 0 ? -6 : i === 1 ? 0 : 6),
          y: (i) => (i === 0 ? -10 : i === 1 ? -30 : 15),
          opacity: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "power3.out",
        }
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
      className="relative w-full bg-[#06030a] text-white overflow-hidden flex flex-col justify-start pt-16 pb-32 md:pt-20 md:pb-40"
    >
      {/* Background Ambient Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-purple-600/15 blur-[180px] rounded-full pointer-events-none" />

      {/* Heading Zone */}
      <div className={`z-10 text-center max-w-5xl mx-auto flex flex-col items-center shrink-0 px-4 mb-8 ${cinzel.className}`}>
        <p
          ref={subtitleRef}
          className="text-xs sm:text-sm uppercase tracking-[0.4em] text-purple-300/60 mb-2"
        >
          Flexible Pricing For Every Creator
        </p>
        <h2
          ref={titleRef}
          className="text-3xl sm:text-5xl md:text-6xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-lg"
        >
          Choose Your Package
        </h2>
      </div>

      {/* Side-by-side Grid */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex items-start justify-center px-4 mt-6 pb-12">
        <div
          ref={cardsWrapperRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 w-full items-center justify-items-center"
        >
          {pricingPlans.map((plan) => (
            <div key={plan.id} className="w-full flex justify-center">
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}