'use client';

import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import { Cinzel } from "next/font/google";
import {
  Zap,
  Check,
  Wand2,
  Volume2,
  Layers,
  ArrowUpRight,
  PhoneCall,
  CreditCard,
  Infinity,
  Repeat,
  FileText,
  Mic,
  Monitor
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700", "900"],
});

// Hero Features
const heroFeatures = [
  { icon: FileText, title: "Scripting", desc: "Engaging Hook & Messaging" },
  { icon: Monitor, title: "Storyboarding & UI/UX", desc: "Visual Hierarchy" },
  { icon: Wand2, title: "Custom Animation", desc: "Sleek Motion Graphics" },
  { icon: Volume2, title: "Sound Effects (SFX)", desc: "Immersive Audio Polish" },
  { icon: Mic, title: "Professional Voice Over", desc: "Studio Quality Accent" },
  { icon: Layers, title: "2-3 Revisions", desc: "Guaranteed Satisfaction" },
];

// Clean Work Videos List
const worksList = [
  { id: 1, video: "/videos/ourwork/workvid1.mp4" },
  { id: 2, video: "/videos/ourwork/workvid2.mp4" },
  { id: 3, video: "/videos/ourwork/workvid3.mp4" },
  { id: 4, video: "/videos/ourwork/workvid4.mp4" },
  { id: 5, video: "/videos/ourwork/workvid1.mp4" },
  { id: 6, video: "/videos/ourwork/workvid2.mp4" },
];

// Pricing Plans Interface
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
    id: "30-sec",
    badge: "STARTER",
    originalPrice: "$600",
    price: "$450",
    videosCount: "30 Seconds",
    perVideoPrice: "30 Sec Video",
    description: "Perfect for quick social media teasers and high-impact product hooks.",
    features: [
      { text: "Full Scripting & Storyboard", included: true },
      { text: "2D / UI Motion Graphics", included: true },
      { text: "Pro Voice Over & SFX", included: true },
      { text: "2 Revisions Included", included: true },
    ],
    isPopular: false,
  },
  {
    id: "1-min",
    badge: "MOST POPULAR",
    originalPrice: "$1000",
    price: "$800",
    videosCount: "1 Minute",
    perVideoPrice: "60 Sec Video",
    description: "The sweet spot for complete product landing pages and SaaS launches.",
    features: [
      { text: "Full Scripting & Storyboard", included: true },
      { text: "Custom UI/UX Re-creation", included: true },
      { text: "Pro Voice Over & Sound Design", included: true },
      { text: "3 Revisions Included", included: true },
    ],
    isPopular: true,
  },
  {
    id: "2-min",
    badge: "ENTERPRISE",
    originalPrice: "$1600",
    price: "$1300",
    videosCount: "2 Minutes",
    perVideoPrice: "120 Sec Video",
    description: "In-depth explainer video covering complex workflows and feature suites.",
    features: [
      { text: "Comprehensive Scripting", included: true },
      { text: "Advanced Animation & FX", included: true },
      { text: "Pro Voiceover & Music Track", included: true },
      { text: "Unlimited Revisions", included: true },
    ],
    isPopular: false,
  },
];

export default function SaasLaunchVideoPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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
      
      {/* Ambient Background Glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[400px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none z-0" />

      {/* ================= HERO SECTION (REVAMPED) ================= */}
      <section className="relative z-10 min-h-[85vh] lg:min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`z-10 text-center max-w-5xl mx-auto mb-12 sm:mb-16 px-4 ${cinzel.className}`}
        >
          <div className="flex items-center justify-center gap-3 mb-3 font-sans">
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-purple-400/60" />
            <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.35em] sm:tracking-[0.45em] text-purple-300/80 font-bold">
              SAAS & PRODUCT MOTION
            </p>
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-purple-400/60" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl leading-[1.05]">
            SAAS LAUNCH VIDEOS
          </h1>

          <p className="font-sans text-slate-400 text-xs sm:text-sm md:text-base mt-5 font-normal tracking-wide max-w-2xl mx-auto leading-relaxed">
            Transforming complex software workflows into high-converting, cinematic motion graphics engineered to captivate users and boost conversions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="fade-up max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 w-full">
          {heroFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative p-5 sm:p-6 rounded-2xl bg-[#0d061c]/60 border border-purple-500/20 hover:border-purple-400/60 transition-all duration-300 backdrop-blur-xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)]"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-600/15 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all duration-500" />
                <div className="absolute top-0 right-8 w-10 h-[2px] bg-purple-500/30 group-hover:bg-purple-400 group-hover:shadow-[0_0_10px_#a855f7] transition-all" />

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

      {/* ================= OUR WORK GRID SECTION (WIDE & SHORT) ================= */}
      <WorkGridSection />

      {/* ================= PACKAGES SECTION ================= */}
      <PricingPackagesSection />

    </div>
  );
}

/* ================= OUR WORK GRID SECTION ================= */

function WorkGridSection() {
  return (
    <section className="relative w-full bg-[#06030a] text-white flex flex-col items-center justify-center py-16 sm:py-20 md:py-28 border-t border-purple-950/40 overflow-hidden">
      
      {/* Background Image with Opacity Added Here */}
      <Image
        src="/servicesvid.png"
        alt="Our Work Background"
        fill
        priority
        className="object-cover object-center z-0 pointer-events-none opacity-30 blur-sm"
      />

      <div className={`z-10 text-center max-w-5xl mx-auto mb-12 sm:mb-16 px-4 ${cinzel.className}`}>
        <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-purple-300/70 mb-3">
          FEATURED SHOWREEL
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
          OUR WORK
        </h2>
      </div>

      {/* Extra Wide Container with Custom Aspect Ratio for Wider & Sleeker Video Boxes */}
      <div className="max-w-[1500px] mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {worksList.map((item) => (
            <WorkGridCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkGridCard({ item }: { item: { id: number; video: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Audio plays on hover
      const promise = videoRef.current.play();
      if (promise !== undefined) {
        promise.catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
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
      // Aspect ratio changed to [21/9] for extra width and reduced height
      className="group relative w-full aspect-[16/9] sm:aspect-[16/8.5] rounded-2xl bg-[#0a0514] border border-purple-500/20 hover:border-purple-400 transition-all duration-500 overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_15px_35px_rgba(168,85,247,0.3)] hover:-translate-y-1.5"
    >
      <video
        ref={videoRef}
        src={item.video}
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
      />
    </div>
  );
}

/* ================= PRICING PACKAGES SECTION ================= */

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
            Customize Plan
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
            <span>Order Video</span>
          </button>
        </div>

        <div className="absolute bottom-0 left-10 w-12 h-[2px] bg-purple-500/50 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_#a855f7] transition-all" />
      </div>
    </div>
  );
}

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

        <div className="max-w-4xl mx-auto mt-16 sm:mt-20 px-4 flex flex-col items-center">

          <div ref={buttonRef} className="z-10 mt-12 sm:mt-16 shrink-0 relative group/btn px-4">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-40 blur-md group-hover/btn:opacity-80 transition-opacity duration-300" />
            <Link
              href="/#book-a-call"
              className="relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-400/40 bg-[#120824]/90 shadow-[0_0_25px_rgba(168,85,247,0.25)]"
            >
              <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" />
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