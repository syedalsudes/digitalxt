'use client';

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Cinzel } from "next/font/google";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700", "900"],
});

type HeroCardItem = {
  id: number;
  video: string;
};

const heroCards: HeroCardItem[] = [
  { id: 1, video: "/videos/herovideos/herovideo1.mp4" },
  { id: 2, video: "/videos/herovideos/herovideo2.mp4" },
  { id: 3, video: "/videos/herovideos/herovideo3.mp4" },
  { id: 4, video: "/videos/herovideos/herovideo4.mp4" },
  { id: 5, video: "/videos/herovideos/herovideo5.mp4" },
];

const VISIBLE_SIDES = 2;

function getCardStyle(offset: number): React.CSSProperties {
  const abs = Math.abs(offset);
  const dir = Math.sign(offset);

  if (abs > VISIBLE_SIDES) {
    return {
      transform: `translate3d(${dir * 300}%, 120px, 0) scale(0.65)`,
      opacity: 0,
      pointerEvents: "none",
      zIndex: 0,
    };
  }

  // Increased gap between cards (105px offset factor)
  const x = offset * 105;
  const y = abs === 0 ? 0 : 35 + abs * 20;
  const scale = abs === 0 ? 1.05 : 1 - abs * 0.06;
  
  // Angle facing towards center card
  const rotate = abs === 0 ? 0 : dir * -8;

  return {
    transform: `
      translate3d(${x}%, ${y}px, 0)
      rotate(${rotate}deg)
      scale(${scale})
    `,
    opacity: 1 - abs * 0.1,
    zIndex: 100 - abs,
  };
}

export default function HeroSection() {
  const mainRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const centerIndex = Math.floor(heroCards.length / 2);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const textTargets = [
        subtitleRef.current,
        titleRef.current,
        descRef.current,
        btnRef.current,
      ].filter(Boolean);

      if (reduce) {
        if (textTargets.length > 0) gsap.set(textTargets, { opacity: 1, y: 0, scale: 1 });
        if (deckRef.current) gsap.set(deckRef.current, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (textTargets.length > 0) {
        gsap.set(textTargets, { opacity: 0, y: 30 });
      }

      if (deckRef.current) {
        gsap.set(deckRef.current, { opacity: 0, y: 100, scale: 0.95 });
      }

      if (textTargets.length > 0) {
        tl.to(textTargets, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
        });
      }

      if (deckRef.current) {
        tl.to(
          deckRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.1)",
          },
          "-=0.4"
        );
      }
    },
    { scope: mainRef }
  );

  const cards = useMemo(
    () =>
      heroCards.map((item, index) => ({
        item,
        index,
        offset: index - centerIndex,
      })),
    [centerIndex]
  );

  return (
    <main
      ref={mainRef}
      className="relative w-full min-h-screen pt-36 sm:pt-44 md:pt-48 bg-[#06030a] text-white flex flex-col items-center justify-start overflow-hidden font-sans pb-16 selection:bg-purple-500/30"
    >
      {/* Background Ambient Cyber Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-5%] h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-[150px]"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(6,3,10,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[35%] h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-15 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(192,38,211,0.6) 0%, rgba(6,3,10,0) 70%)",
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-20 flex w-full max-w-5xl flex-col items-center justify-center text-center px-4 mb-12 sm:mb-16">
        <h1
          ref={titleRef}
          className={`text-2xl sm:text-4xl lg:text-6xl font-black tracking-wide leading-tight uppercase whitespace-nowrap ${cinzel.className}`}
        >
          WE CREATE VIRAL VISUALS
        </h1>

        <p
          ref={descRef}
          className="mt-5 sm:mt-6 max-w-2xl text-xs sm:text-sm leading-relaxed text-gray-300/80 font-light"
        >
          High-impact video editing, seamless motion graphics, and sound design crafted for creators and brands. We turn your raw ideas into captivating visual stories that drive real audience engagement.
        </p>

        <div ref={btnRef} className="mt-8 relative group/btn">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-50 blur-md group-hover/btn:opacity-90 transition-opacity duration-300" />
          <Link
            href="/work"
            className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-400/30 bg-[#120824]/90"
          >
            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" />
            <span className="relative z-10">Explore Our Work</span>
            <ArrowRight className="relative z-10 w-4 h-4 text-purple-300 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Video Carousel Deck */}
      <section
        ref={deckRef}
        role="group"
        aria-label="Cards Showcase"
        className="relative z-10 w-full outline-none"
      >
        {/* DESKTOP VIEW: Fixed 3D Deck */}
        <div className="hidden md:flex relative h-[460px] w-full items-end justify-center">
          {cards.map(({ item, index, offset }) => (
            <HeroCard
              key={item.id}
              item={item}
              index={index}
              offset={offset}
              isPlaying={hoveredIndex === index}
              isCenter={offset === 0}
              onHover={setHoveredIndex}
              isMobile={false}
            />
          ))}
        </div>

        {/* MOBILE VIEW: Horizontal Scroll List */}
        <div className="flex md:hidden w-full overflow-x-auto gap-4 px-6 pb-6 scrollbar-none snap-x snap-mandatory">
          {cards.map(({ item, index }) => (
            <div key={item.id} className="snap-center shrink-0">
              <HeroCard
                item={item}
                index={index}
                offset={0}
                isPlaying={hoveredIndex === index}
                isCenter={index === centerIndex}
                onHover={setHoveredIndex}
                isMobile={true}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ================= HeroCard Component ================= */

type HeroCardProps = {
  item: HeroCardItem;
  index: number;
  offset: number;
  isPlaying: boolean;
  isCenter: boolean;
  isMobile: boolean;
  onHover: (index: number | null) => void;
};

const HeroCard = memo(function HeroCard({
  item,
  index,
  offset,
  isPlaying,
  isCenter,
  isMobile,
  onHover,
}: HeroCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = Math.abs(offset) <= VISIBLE_SIDES;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    } else {
      video.pause();
      video.currentTime = 0; // Reset video frame when unhovered
      video.muted = true;
    }
  }, [isPlaying]);

  const style = useMemo(() => {
    if (isMobile) return {};
    return getCardStyle(offset);
  }, [offset, isMobile]);

  return (
    <button
      type="button"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      aria-current={isCenter}
      tabIndex={isMobile || isVisible ? 0 : -1}
      className={`${
        isMobile ? "relative aspect-[9/14] w-[220px]" : "absolute aspect-[9/14] w-[190px] sm:w-[240px] md:w-[280px]"
      } transform-gpu cursor-pointer transition-all duration-500 ease-out focus:outline-none`}
      style={style}
    >
      <div
        className={`absolute inset-0 rounded-[24px] sm:rounded-[32px] transition-all duration-500 ${
          isCenter
            ? "bg-gradient-to-b from-purple-400 via-fuchsia-500 to-purple-700 p-[1.5px] shadow-[0_0_35px_rgba(168,85,247,0.45)]"
            : "bg-gradient-to-b from-white/20 via-purple-500/10 to-transparent p-[1px]"
        }`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[23px] sm:rounded-[31px]">
          <video
            ref={videoRef}
            src={item.video}
            loop
            playsInline
            disablePictureInPicture
            preload="auto"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
        </div>
      </div>
    </button>
  );
});

HeroCard.displayName = "HeroCard";