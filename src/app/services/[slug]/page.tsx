'use client';

import React, { useState, useEffect, useRef, memo } from "react";
import { Check, Sparkles, Zap } from "lucide-react";
import { Cinzel } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

// --- Interfaces ---
interface WorkItem {
  id: number;
  video: string;
}

interface PricingPlan {
  id: string;
  badge: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

interface Testimonial {
  id: string;
  videoSrc: string;
  rotate?: string;
}

// --- Data ---
const worksList: WorkItem[] = [
  { id: 1, video: "/videos/ourwork/workvid1.mp4" },
  { id: 2, video: "/videos/ourwork/workvid2.mp4" },
  { id: 3, video: "/videos/ourwork/workvid3.mp4" },
  { id: 4, video: "/videos/ourwork/workvid4.mp4" },
  { id: 5, video: "/videos/ourwork/workvid1.mp4" },
  { id: 6, video: "/videos/ourwork/workvid2.mp4" },
];

const pricingPlans: PricingPlan[] = [
  {
    id: "basic-plan",
    badge: "CLASSIC",
    title: "Basic Plan",
    price: "$500",
    description: "Good for personal portfolios and simple modern web applications.",
    features: [
      "Responsive Architecture",
      "Basic Performance Tuning",
      "4K Quality Assets",
      "1 Month Technical Support",
    ],
    isPopular: false,
  },
  {
    id: "premium-plan",
    badge: "MOST POPULAR",
    title: "Premium Plan",
    price: "$1000",
    description: "Best for growing businesses needing scalable custom software.",
    features: [
      "Custom Next.js & Mobile App",
      "Advanced Security Suite",
      "3 Months Support & Maintenance",
      "Full API & Database Integration",
    ],
    isPopular: true,
  },
  {
    id: "corporate-plan",
    badge: "ENTERPRISE",
    title: "Corporate Plan",
    price: "$1500",
    description: "Complete digital ecosystem & custom automated workflows.",
    features: [
      "Full Scale Architecture",
      "24/7 Priority Support",
      "AI & Automation Tool Integrations",
      "Database & Speed Optimizations",
    ],
    isPopular: false,
  },
];

// Testimonials Data with Rotation Styles
const testimonials: Testimonial[] = [
  { id: "1", videoSrc: "/videos/review1.mp4", rotate: "-rotate-6 translate-y-2" },
  { id: "2", videoSrc: "/videos/review2.mp4", rotate: "rotate-3 -translate-y-2" },
  { id: "3", videoSrc: "/videos/review3.mp4", rotate: "-rotate-2 z-20" },
  { id: "4", videoSrc: "/videos/review4.mp4", rotate: "-rotate-4 -translate-y-1" },
  { id: "5", videoSrc: "/videos/review5.mp4", rotate: "rotate-6 translate-y-3" },
  { id: "6", videoSrc: "/videos/review6.mp4", rotate: "-rotate-3 translate-y-1" },
];

// --- Sub Component: Geometric 3D Pricing Card ---
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
      className={`pricing-card-inner group relative p-[1.5px] transition-transform duration-300 ease-out cursor-pointer h-full w-[290px] sm:w-[320px] lg:w-full lg:max-w-[340px] shrink-0 lg:hover:scale-105 lg:hover:z-50 ${plan.isPopular ? "z-20" : "z-10"
        }`}
    >
      <div
        className={`absolute inset-0 transition-all duration-500 ${plan.isPopular
            ? "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-purple-800 shadow-[0_0_35px_rgba(168,85,247,0.4)]"
            : "bg-gradient-to-br from-white/20 via-purple-500/20 to-white/5 group-hover:from-purple-500 group-hover:to-fuchsia-500"
          }`}
        style={{ clipPath: currentClipPath }}
      />

      <div
        className={`relative flex flex-col justify-between p-6 sm:p-7 h-full w-full backdrop-blur-xl ${plan.isPopular ? "bg-[#120723]/95" : "bg-[#0a0512]/95"
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

        <div className="flex items-center justify-between mb-4 z-10">
          <span
            className={`text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 border ${plan.isPopular
                ? "bg-purple-600/30 border-purple-400 text-purple-200"
                : "bg-white/5 border-white/10 text-gray-400"
              }`}
            style={{
              clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
            }}
          >
            {plan.badge}
          </span>
          {plan.isPopular && (
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          )}
        </div>

        <div className="mb-4 z-10">
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

        <div className="flex-1 mb-5 z-10">
          <div className="w-full h-[1px] bg-gradient-to-r from-purple-500/50 via-white/10 to-transparent mb-4" />
          <ul className="space-y-2.5">
            {plan.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-xs text-gray-300 font-light lg:group-hover:translate-x-1 transition-transform duration-300"
              >
                <div className="w-4 h-4 rounded-full bg-purple-950/80 border border-purple-500/50 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:border-purple-400 transition-colors">
                  <Check className="w-2.5 h-2.5 text-purple-300 group-hover:text-white stroke-[3]" />
                </div>
                <span>{feature}</span>
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
            className={`w-full py-2.5 px-4 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${plan.isPopular
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

// --- Sub Component: Work Video Card (Hover Only Play & Unmute) ---
const WorkCard = memo(({ item }: { item: WorkItem }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => { });
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
      className="group relative rounded-2xl overflow-hidden bg-[#0c0718] border border-white/10 hover:border-purple-500/60 transition-all duration-500 shadow-2xl cursor-pointer aspect-[16/9]"
    >
      <video
        ref={videoRef}
        src={item.video}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
    </div>
  );
});
WorkCard.displayName = "WorkCard";

// --- Sub Component: Review Video Card (Hover Only Play & Unmute, No Crop) ---
const ReviewCard = memo(({ item }: { item: Testimonial }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => { });
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
      className={`relative shrink-0 w-[150px] sm:w-[190px] md:w-[210px] aspect-[9/16] rounded-2xl overflow-hidden border border-purple-500/30 bg-[#0c0718] shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-0 hover:z-30 hover:border-purple-400 cursor-pointer ${item.rotate || ""}`}
    >
      <video
        ref={videoRef}
        src={item.videoSrc}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
});
ReviewCard.displayName = "ReviewCard";

// --- Main Page Component ---
export default function ServicesPage() {
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
        y: 20,
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.set(cards, { y: 60, opacity: 0 });

        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsWrapperRef.current,
            start: "top 75%",
            once: true,
          },
        });

        mainTl.to([subtitleRef.current, titleRef.current], {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out",
        });

        mainTl.to(
          cards,
          {
            y: (i) => (i === 1 ? -15 : 10),
            rotate: (i) => (i === 0 ? -3 : i === 2 ? 3 : 0),
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.3"
        );
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.to([subtitleRef.current, titleRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsWrapperRef.current,
            start: "top 85%",
            once: true,
          },
        });

        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, rotate: 0 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsWrapperRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={sectionRef} className="relative w-full min-h-screen bg-[#06030a] text-white overflow-hidden selection:bg-purple-500/30">
      {/* Background Ambient Glow */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[500px] rounded-full pointer-events-none opacity-20 z-0"
        style={{
          background: "radial-gradient(circle, rgba(147,51,234,0.35) 0%, rgba(6,3,10,0) 70%)",
        }}
      />

      {/* 1. HERO SECTION (FULL SCREEN) */}
      <section className="relative w-full h-screen flex items-center justify-center border-b border-purple-950/30 z-10">
        <Image
          src="/serviceshero.png"
          alt="Services Hero"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06030a] via-black/30 to-[#06030a]" />

        <div className={`relative z-10 text-center px-4 ${cinzel.className}`}>
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-purple-300/70 mb-3 font-semibold">
            Home &gt; Services
          </p>
          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-wider bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-xl">
            Our Services
          </h1>
        </div>
      </section>

      {/* 2. OUR WORK SHOWREEL */}
      <section className="relative w-full py-24 px-4 sm:px-8 border-t border-purple-950/30 z-10">
        <div className={`text-center max-w-4xl mx-auto mb-16 ${cinzel.className}`}>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-purple-300/70 mb-2 font-semibold">
            Featured Showreel
          </p>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-wider bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
            OUR WORK
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {worksList.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 3. GEOMETRIC PRICING SECTION */}
      <section className="relative w-full py-24 px-4 sm:px-8 bg-[#080413]/70 border-y border-purple-950/30 z-10">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${cinzel.className}`}>
            <p
              ref={subtitleRef}
              className="text-xs uppercase tracking-[0.25em] md:tracking-[0.4em] text-purple-300/60 mb-3 font-semibold"
            >
              Flexible Pricing For Every Project
            </p>
            <h2
              ref={titleRef}
              className="text-3xl sm:text-5xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent"
            >
              CHOOSE YOUR PACKAGE
            </h2>
          </div>

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
        </div>
      </section>

      {/* 4. REVIEWS SECTION */}
      <section className="relative w-full py-24 px-4 z-10">
        <div className={`text-center max-w-4xl mx-auto mb-16 ${cinzel.className}`}>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-purple-300/70 mb-2 font-semibold">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-wider bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
            CLIENT REVIEWS
          </h2>
        </div>

        {/* Scrollbar hidden with CSS & Responsive Flex Wrap for Small Screens */}
        <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap items-center justify-center gap-3 sm:gap-6 py-12 scrollbar-none px-4">
          {testimonials.map((item) => (
            <ReviewCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}