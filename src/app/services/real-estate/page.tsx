'use client';

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
// Removed Image import as background image is removed
import { Cinzel } from "next/font/google";
import {
  Zap,
  Check,
  Video,
  Wand2,
  Volume2,
  Gauge,
  Layers,
  Clock,
  ArrowUpRight,
  PhoneCall,
  CreditCard,
  Infinity as InfinityIcon,
  Repeat
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700", "900"] });

// --- DATA CONFIGURATIONS ---
const heroFeatures = [
  { icon: Video, title: "Premium Texting", desc: "4 - 5 Variations" },
  { icon: Wand2, title: "AI Staging", desc: "1 - 2 Concepts" },
  { icon: Volume2, title: "Sound Effects & Color Grading", desc: "Cinematic Polish" },
  { icon: Gauge, title: "Speed Ramp & Licensed Music", desc: "High Engagement" },
  { icon: Layers, title: "Transitions", desc: "Seamless Flow" },
  { icon: Clock, title: "24-48hr Delivery", desc: "Per Video" },
];

// Bro, updated videos list added here
const ourWorkList = [
  { id: 5, video: "/videos/ourwork/workvid1.mp4" },
  { id: 2, video: "/videos/ourwork/workvid2.mp4" },
  { id: 4, video: "/videos/ourwork/workvid4.mp4" },
  { id: 7, video: "/videos/ourwork/workvid3.mp4" },
  { id: 6, video: "/videos/ourwork/workvid2.mp4" },
  { id: 5, video: "/videos/ourwork/workvid1.mp4" },
  { id: 4, video: "/videos/ourwork/workvid4.mp4" },
  { id: 7, video: "/videos/ourwork/workvid3.mp4" },
];

const beforeAfterCards = [
  { id: "1", video: "/videos/review1.mp4" },
  { id: "2", video: "/videos/review2.mp4" },
  { id: "3", video: "/videos/review3.mp4" },
  { id: "4", video: "/videos/review4.mp4" },
  { id: "5", video: "/videos/review5.mp4" },
  { id: "6", video: "/videos/review6.mp4" },
];

interface FeatureItem {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  badge: string;
  originalPrice: string;
  price: string;
  videosCount: string;
  perVideoPrice: string;
  description: string;
  features: FeatureItem[];
  isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "10-vid",
    badge: "STARTER",
    originalPrice: "$400",
    price: "$300",
    videosCount: "10 Videos",
    perVideoPrice: "$30/Video",
    description: "Ideal for individual property tours & quick listings.",
    features: [
      { text: "Free Strategy", included: true },
      { text: "Unlimited Revision", included: true },
      { text: "Free Sales & Growth Consultation", included: true },
      { text: "Custom Content Calendar", included: false },
    ],
    isPopular: false,
  },
  {
    id: "20-vid",
    badge: "MOST POPULAR",
    originalPrice: "$600",
    price: "$500",
    videosCount: "20 Videos",
    perVideoPrice: "$25/Video",
    description: "Perfect for active agents & luxury property showcases.",
    features: [
      { text: "Free Strategy", included: true },
      { text: "Unlimited Revision", included: true },
      { text: "Custom Content Calendar", included: true },
      { text: "Free Sales & Growth Consultation", included: true },
    ],
    isPopular: true,
  },
  {
    id: "30-vid",
    badge: "PLATINUM",
    originalPrice: "$800",
    price: "$700",
    videosCount: "30 Videos",
    perVideoPrice: "$23.3/Video",
    description: "Complete video content solution for real estate teams.",
    features: [
      { text: "Free Strategy", included: true },
      { text: "Unlimited Revision", included: true },
      { text: "Custom Content Calendar", included: true },
      { text: "Free Sales & Growth Consultation", included: true },
    ],
    isPopular: false,
  },
];

export default function RealEstateServicePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeDeckIndex, setActiveDeckIndex] = useState(1);
  const [baHoveredIndex, setBaHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top 80%",
        },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="w-full bg-[#06030a] text-white min-h-screen selection:bg-purple-600 selection:text-white overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[400px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none z-0" />

      {/* SVG ClipPath for Curved Screen Frames */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <clipPath id="curvedScreenClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.02 0.06 Q 0.5 0.14 0.98 0.06 C 0.99 0.06 1 0.08 1 0.11 L 1 0.89 C 1 0.92 0.99 0.94 0.98 0.94 Q 0.5 0.86 0.02 0.94 C 0.01 0.94 0 0.92 0 0.89 L 0 0.11 C 0 0.08 0.01 0.06 0.02 0.06 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 min-h-[90vh] lg:min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className={`z-10 text-center max-w-4xl mx-auto mb-10 sm:mb-14 px-4 ${cinzel.className}`}>
          <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3 font-sans">
            <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-purple-400/60" />
            <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-purple-300/70 font-semibold">
              REAL ESTATE SUITE
            </p>
            <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-purple-400/60" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl leading-[1.1]">
            REAL ESTATE
          </h1>

          <p className="font-sans text-slate-400 text-xs sm:text-sm md:text-base mt-4 sm:mt-5 font-normal tracking-wide max-w-2xl mx-auto leading-relaxed">
            Transforming luxury properties and agent listings into high-converting, cinematic visual experiences engineered for maximum engagement.
          </p>
        </div>

        <div className="fade-up max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 w-full">
          {heroFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative p-5 sm:p-6 rounded-2xl bg-[#0d061c]/60 border border-purple-500/20 hover:border-purple-400/60 transition-all duration-300 backdrop-blur-xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)]"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-600/15 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all duration-500" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#150a2b] border border-purple-400/40 flex items-center justify-center shrink-0 text-purple-300 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-white font-bold text-sm sm:text-base tracking-wide group-hover:text-purple-200 transition-colors">
                      {item.title}
                    </h3>
                    <span className="inline-block mt-1 text-[10px] font-mono font-semibold tracking-wider text-purple-300/80 uppercase">
                      {item.desc}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= OUR WORK (CURVED 3D DECK - BACKGROUND IMAGE REMOVED) ================= */}
      <section className="relative w-full bg-[#06030a] text-white flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 overflow-hidden select-none border-t border-purple-950/40">
        
        {/* Bro, Image component removed from here as requested */}

        <div className={`z-10 text-center max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4 ${cinzel.className}`}>
          <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-purple-300/70 mb-1.5 sm:mb-2">
            Featured Showreel & Cinematic Edits
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
            OUR WORK
          </h2>
        </div>

        <div className="relative z-10 w-full h-[220px] sm:h-[340px] md:h-[440px] flex items-center justify-center px-2" style={{ perspective: "1000px" }}>
          <div className="relative w-full max-w-[1280px] h-full flex items-center justify-center">
            {ourWorkList.map((item, index) => {
              let offset = index - activeDeckIndex;
              if (offset > ourWorkList.length / 2) offset -= ourWorkList.length;
              if (offset < -ourWorkList.length / 2) offset += ourWorkList.length;

              const isCenter = offset === 0;

              const transforms: Record<number, string> = {
                0: "translateX(0%) scale(1) translateZ(0px) rotateY(0deg)",
                1: "translateX(62%) scale(0.82) translateZ(-120px) rotateY(-22deg)",
                [-1]: "translateX(-62%) scale(0.82) translateZ(-120px) rotateY(22deg)",
                2: "translateX(110%) scale(0.68) translateZ(-250px) rotateY(-35deg)",
                [-2]: "translateX(-110%) scale(0.68) translateZ(-250px) rotateY(35deg)",
              };

              const style: React.CSSProperties = {
                transform: transforms[offset] || (offset > 0 ? "translateX(160%) scale(0.5)" : "translateX(-160%) scale(0.5)"),
                zIndex: isCenter ? 30 : 30 - Math.abs(offset) * 10,
                opacity: Math.abs(offset) > 2 ? 0 : isCenter ? 1 : 0.85 - (Math.abs(offset) - 1) * 0.4,
                pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
              };

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveDeckIndex(index)}
                  onMouseEnter={(e) => {
                    const vid = e.currentTarget.querySelector("video");
                    if (vid) { vid.muted = false; vid.play().catch(() => {}); }
                  }}
                  onMouseLeave={(e) => {
                    const vid = e.currentTarget.querySelector("video");
                    if (vid) { vid.pause(); vid.currentTime = 0; }
                  }}
                  className="absolute w-[72vw] sm:w-[50vw] md:w-[44vw] max-w-[580px] aspect-[16/9] transition-transform duration-500 ease-out cursor-pointer transform-gpu will-change-transform"
                  style={style}
                >
                  <div className={`relative w-full h-full ${isCenter ? "drop-shadow-[0_10px_25px_rgba(168,85,247,0.4)]" : ""}`}>
                    <div className="relative w-full h-full bg-[#0a0514] overflow-hidden" style={{ clipPath: "url(#curvedScreenClip)" }}>
                      <video
                        src={item.video}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover scale-105 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/60 pointer-events-none" />
                    </div>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 1000 562.5" preserveAspectRatio="none">
                      <path
                        d="M 20 34 Q 500 78 980 34 C 990 34 1000 45 1000 62 L 1000 500 C 1000 517 990 528 980 528 Q 500 484 20 528 C 10 528 0 517 0 500 L 0 62 C 0 45 10 34 20 34 Z"
                        fill="none"
                        stroke={isCenter ? "#a855f7" : "rgba(168, 85, 247, 0.3)"}
                        strokeWidth={isCenter ? "3.5" : "2"}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= BEFORE / AFTER DECK (WITH TESTIMONIAL VIDEOS) ================= */}
      <section className="relative z-10 w-full py-16 sm:py-20 md:py-24 border-t border-purple-950/40 bg-[#06030a]">
        <div className={`z-10 text-center max-w-4xl mx-auto mb-10 sm:mb-14 px-4 ${cinzel.className}`}>
          <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-purple-300/70 mb-2">
            Transformation Showcase
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
            BEFORE / AFTER
          </h2>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex relative h-[480px] xl:h-[520px] 2xl:h-[620px] w-full items-end justify-center">
          {beforeAfterCards.map((item, index) => {
            const centerIndex = Math.floor(beforeAfterCards.length / 2);
            const offset = index - centerIndex;
            const abs = Math.abs(offset);
            const dir = Math.sign(offset);
            const isCenter = offset === 0;

            const cardStyle: React.CSSProperties = abs > 2
              ? { transform: `translate3d(${dir * 320}%, 140px, 0) scale(0.65)`, opacity: 0, pointerEvents: "none", zIndex: 0 }
              : {
                  transform: `translate3d(${offset * 112}%, ${abs === 0 ? 0 : 35 + abs * 24}px, 0) rotate(${abs === 0 ? 0 : dir * -8}deg) scale(${abs === 0 ? 1.05 : 1 - abs * 0.06})`,
                  opacity: 1 - abs * 0.1,
                  zIndex: 100 - abs,
                };

            return (
              <button
                key={item.id}
                onMouseEnter={() => setBaHoveredIndex(index)}
                onMouseLeave={() => setBaHoveredIndex(null)}
                className="absolute aspect-[9/14] w-[240px] xl:w-[300px] 2xl:w-[360px] transform-gpu cursor-pointer transition-all duration-500 ease-out focus:outline-none"
                style={cardStyle}
              >
                <div className={`absolute inset-0 rounded-[24px] sm:rounded-[32px] 2xl:rounded-[40px] transition-all duration-500 ${isCenter ? "bg-gradient-to-b from-purple-400 via-fuchsia-500 to-purple-700 p-[1.5px] 2xl:p-[2px] shadow-[0_0_35px_rgba(168,85,247,0.45)]" : "bg-gradient-to-b from-white/20 via-purple-500/10 to-transparent p-[1px]"}`}>
                  <div className="relative h-full w-full overflow-hidden rounded-[23px] sm:rounded-[31px] 2xl:rounded-[39px]">
                    <video
                      ref={(el) => {
                        if (!el) return;
                        if (baHoveredIndex === index) { el.muted = false; el.play().catch(() => {}); }
                        else { el.pause(); el.currentTime = 0; }
                      }}
                      src={item.video}
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile View */}
        <div className="flex lg:hidden w-full overflow-x-auto gap-4 sm:gap-6 py-4 scrollbar-none snap-x snap-mandatory items-center justify-start px-6">
          {beforeAfterCards.map((item) => (
            <div key={item.id} className="snap-center shrink-0">
              <div className="relative aspect-[9/14] w-[210px] sm:w-[260px] rounded-[24px] overflow-hidden border border-purple-500/30">
                <video src={item.video} loop playsInline controls className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PACKAGES SECTION ================= */}
      <PricingPackagesSection />
    </div>
  );
}

/* ================= PRICING CARD COMPONENT (WITH 3D TILT & SPOTLIGHT EFFECT) ================= */

function PricingCard({ plan }: { plan: PricingPlan }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;

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

  const standardClipPath =
    "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))";
  const popularClipPath =
    "polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)";

  const currentClipPath = plan.isPopular ? popularClipPath : standardClipPath;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={`pricing-card-inner group relative p-[1.5px] transition-transform duration-300 ease-out cursor-pointer h-full w-[290px] sm:w-[320px] lg:w-full lg:max-w-[340px] shrink-0 lg:hover:scale-105 lg:hover:z-50 ${
        plan.isPopular ? "z-20" : "z-10"
      }`}
    >
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          plan.isPopular
            ? "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-purple-800 shadow-[0_0_35px_rgba(168,85,247,0.4)]"
            : "bg-gradient-to-br from-white/20 via-purple-500/20 to-white/5 group-hover:from-purple-500 group-hover:to-fuchsia-500"
        }`}
        style={{ clipPath: currentClipPath }}
      />

      <div
        className={`relative flex flex-col justify-between p-6 sm:p-7 h-full w-full backdrop-blur-xl ${
          plan.isPopular ? "bg-[#120723]/95" : "bg-[#0a0512]/95"
        }`}
        style={{ clipPath: currentClipPath }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden lg:block"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(168, 85, 247, 0.25), transparent 70%)`,
          }}
        />

        <div className="absolute top-0 right-10 w-12 h-[2px] bg-purple-500/50 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_#a855f7] transition-all" />

        <div className="flex items-center justify-between mb-3 z-10">
          <span
            className={`text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 border ${
              plan.isPopular
                ? "bg-purple-600/30 border-purple-400 text-purple-200"
                : "bg-white/5 border-white/10 text-gray-400"
            }`}
            style={{
              clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
            }}
          >
            {plan.badge}
          </span>
        </div>

        <div className="mb-4 z-10">
          <h3 className={`text-lg sm:text-xl font-bold text-white mb-1 ${cinzel.className}`}>
            {plan.videosCount}
          </h3>

          <div className="flex items-baseline gap-2 my-1">
            <span className="text-xs text-purple-300/60 line-through font-mono">
              {plan.originalPrice}
            </span>
            <span className={`text-3xl sm:text-4xl font-black text-white ${cinzel.className}`}>
              {plan.price}
            </span>
            <span className="text-xs text-purple-300/80 font-mono font-medium">
              ({plan.perVideoPrice})
            </span>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed font-light min-h-[36px]">
            {plan.description}
          </p>
        </div>

        <div className="flex-1 mb-5 z-10">
          <div className="w-full h-[1px] bg-gradient-to-r from-purple-500/50 via-white/10 to-transparent mb-4" />
          <ul className="space-y-2.5">
            {plan.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-xs font-light lg:group-hover:translate-x-1 transition-transform duration-300"
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    feature.included
                      ? "bg-purple-950/80 border-purple-500/50 group-hover:bg-purple-600 group-hover:border-purple-400"
                      : "bg-white/5 border-white/10 opacity-40"
                  }`}
                >
                  <Check
                    className={`w-2.5 h-2.5 stroke-[3] ${
                      feature.included ? "text-purple-300 group-hover:text-white" : "text-gray-500"
                    }`}
                  />
                </div>
                <span className={feature.included ? "text-gray-300" : "text-gray-500"}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 mt-auto z-10">
          <button
            className="w-full py-2.5 px-4 bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-white/10 text-white font-bold text-[11px] uppercase tracking-wider transition-all duration-300 active:scale-95"
            style={{
              clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            }}
          >
            Customize Package
          </button>

          <button
            className={`w-full py-2.5 px-4 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
              plan.isPopular
                ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50"
                : "bg-white text-purple-950 hover:bg-gray-100"
            }`}
            style={{
              clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
            }}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Subscribe Now</span>
          </button>
        </div>

        <div className="absolute bottom-0 left-10 w-12 h-[2px] bg-purple-500/50 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_#a855f7] transition-all" />
      </div>
    </div>
  );
}

/* ================= PRICING PACKAGES SECTION ================= */

function PricingPackagesSection() {
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full bg-[#06030a] text-white border-t border-purple-950/40 overflow-hidden flex flex-col justify-start pt-16 pb-20 md:pt-24 md:pb-32">
      <div className={`z-10 text-center max-w-5xl mx-auto flex flex-col items-center shrink-0 px-4 mb-10 lg:mb-16 ${cinzel.className}`}>
        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] md:tracking-[0.4em] text-purple-300/60 mb-3">
          Flexible Options
        </p>
        <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
          Packages
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div
          ref={cardsWrapperRef}
          className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-6 w-full items-stretch justify-start lg:justify-items-center overflow-x-auto lg:overflow-visible pb-8 lg:pb-0 scrollbar-none snap-x snap-mandatory px-2 lg:px-0"
        >
          {pricingPlans.map((plan) => (
            <div key={plan.id} className="snap-center shrink-0 flex justify-center">
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>

        {/* Features Bar */}
        <div className="max-w-4xl mx-auto mt-16 sm:mt-20 px-4 flex flex-col items-center">
          <div className="w-full relative p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-[#0a0514]/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-950/80 border border-purple-400/40 flex items-center justify-center shrink-0 text-purple-300">
                  <CreditCard className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Credit-Based Count</h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-light">
                    Our package videos will <strong className="text-purple-300 font-semibold">count as on credit</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-950/80 border border-purple-400/40 flex items-center justify-center shrink-0 text-purple-300">
                  <InfinityIcon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">No Time Expiry</h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-light">
                    It's <strong className="text-purple-300 font-semibold">not monthly</strong> or limited to any time.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-950/80 border border-purple-400/40 flex items-center justify-center shrink-0 text-purple-300">
                  <Repeat className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Easy Renewal</h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-light">
                    Once you got all your package videos, you can <strong className="text-purple-300 font-semibold">re-subscribe the package</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Book A Call Button */}
          <div ref={buttonRef} className="z-10 mt-12 sm:mt-16 shrink-0 relative group/btn px-4">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-40 blur-md group-hover/btn:opacity-80 transition-opacity duration-300" />
            <Link
              href="/#book-a-call"
              className="relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-400/40 bg-[#120824]/90 shadow-[0_0_25px_rgba(168,85,247,0.25)]"
            >
              <PhoneCall className="relative z-10 w-4 h-4 text-purple-400" />
              <span className="relative z-10">Book A Call</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 text-purple-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}