'use client';

import React, { useRef } from "react";

interface Testimonial {
  id: string;
  videoSrc: string;
  clientName?: string;
}

const topRowTestimonials: Testimonial[] = [
  { id: "1", videoSrc: "/videos/testimonial-1.mp4", clientName: "Alex" },
  { id: "2", videoSrc: "/videos/testimonial-2.mp4", clientName: "Sarah" },
  { id: "3", videoSrc: "/videos/testimonial-3.mp4", clientName: "Michael" },
  { id: "4", videoSrc: "/videos/testimonial-4.mp4", clientName: "David" },
  { id: "5", videoSrc: "/videos/testimonial-5.mp4", clientName: "Elena" },
];

const bottomRowTestimonials: Testimonial[] = [
  { id: "6", videoSrc: "/videos/testimonial-6.mp4", clientName: "John" },
  { id: "7", videoSrc: "/videos/testimonial-7.mp4", clientName: "Emma" },
  { id: "8", videoSrc: "/videos/testimonial-8.mp4", clientName: "Chris" },
  { id: "9", videoSrc: "/videos/testimonial-9.mp4", clientName: "Sophia" },
  { id: "10", videoSrc: "/videos/testimonial-10.mp4", clientName: "Daniel" },
];

function VideoCard({ item }: { item: Testimonial }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Unmute on hover
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
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
      className="relative shrink-0 w-[180px] sm:w-[210px] aspect-[9/16] rounded-2xl overflow-hidden bg-purple-950/30 border border-purple-500/20 shadow-lg group hover:scale-110 hover:z-50 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 ease-out cursor-pointer"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      >
        <source src={item.videoSrc} type="video/mp4" />
      </video>

      {/* Glass Effect Overlay & Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

      {/* Purple Gradient Bottom Line / Glow */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default function VideoTestimonials() {
  const topList = [...topRowTestimonials, ...topRowTestimonials, ...topRowTestimonials];
  const bottomList = [...bottomRowTestimonials, ...bottomRowTestimonials, ...bottomRowTestimonials];

  return (
    <section className="relative w-full py-20 bg-[#08050c] text-white border-t border-purple-900/20">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-purple-600/15 blur-[180px] rounded-full pointer-events-none" />

      {/* Heading Section */}
      <div className="relative z-10 text-center mb-12 px-4">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-purple-400 mb-2 block">
          OUR CLIENTS
        </span>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
          REVIEWS
        </h2>
      </div>

      {/* Marquee Rows Container - Added py-8 and overflow-x-hidden to prevent vertical cutting during scale */}
      <div className="relative z-10 flex flex-col gap-6 py-6 overflow-x-hidden">
        
        {/* Left & Right Fade Shadows */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#08050c] to-transparent z-30 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#08050c] to-transparent z-30 pointer-events-none" />

        {/* TOP ROW (Scrolls Right to Left) */}
        <div className="flex w-full py-4 group/marquee">
          <div className="flex gap-5 animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {topList.map((item, index) => (
              <VideoCard key={`top-${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>

        {/* BOTTOM ROW (Scrolls Left to Right) */}
        <div className="flex w-full py-4 group/marquee">
          <div className="flex gap-5 animate-marquee-reverse group-hover/marquee:[animation-play-state:paused]">
            {bottomList.map((item, index) => (
              <VideoCard key={`bottom-${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>

      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-marquee {
          animation: marquee 35s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
        }
      `}</style>
    </section>
  );
}