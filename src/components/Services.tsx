'use client';

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FullScreenServices() {
  const services = [
    {
      id: "real-estate",
      title: "REAL ESTATE MEDIA",
      subtitle: "Cinematic Property Tours & Aerial Editing",
      videoSrc: "/videos/real-estate.mp4",
      link: "/services/real-estate",
    },
    {
      id: "launch-media",
      title: "LAUNCH MEDIA",
      subtitle: "High-Impact Product & Commercial Ads",
      videoSrc: "/videos/launch-media.mp4",
      link: "/services/launch-media",
    },
    {
      id: "saas-animation",
      title: "SAAS ANIMATION",
      subtitle: "3D Motion Graphics & Product Explainers",
      videoSrc: "/videos/saas-animation.mp4",
      link: "/services/saas-animation",
    },
  ];

  return (
    <div className="w-full bg-[#08050c] text-white">
      {/* SVG ClipPath Definition */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <clipPath id="curvedScreenClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.02 0.10 Q 0.5 0.25 0.98 0.10 C 0.995 0.10 1 0.12 1 0.15 L 1 0.85 C 1 0.88 0.995 0.90 0.98 0.90 Q 0.5 0.75 0.02 0.90 C 0.005 0.90 0 0.88 0 0.85 L 0 0.15 C 0 0.12 0.005 0.10 0.02 0.10 Z" />
          </clipPath>
        </defs>
      </svg>

      {services.map((service) => (
        <section
          key={service.id}
          className="relative w-full h-screen flex flex-col items-center justify-center gap-6 md:gap-8 px-4 py-6 overflow-hidden border-b border-purple-900/20"
        >
          {/* Ambient Purple Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-purple-600/20 blur-[170px] rounded-full pointer-events-none" />

          {/* Heading */}
          <div className="z-10 text-center max-w-5xl mx-auto flex flex-col items-center shrink-0">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tight uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-sm">
              {service.title}
            </h2>
          </div>

          {/* CURVED CINEMA SCREEN CONTAINER - 80% Width */}
          <div className="relative z-10 w-[80vw] max-w-[1250px] aspect-[16/9] max-h-[60vh] flex items-center justify-center shrink-0 group my-1">
            
            {/* Outer Glow behind screen */}
            <div className="absolute inset-0 bg-purple-600/30 blur-2xl rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Video Box with Curved Clip-Path */}
            <div
              className="relative w-full h-full bg-black overflow-hidden"
              style={{ clipPath: "url(#curvedScreenClip)" }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              >
                <source src={service.videoSrc} type="video/mp4" />
              </video>

              {/* Glass Reflection Highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent mix-blend-screen pointer-events-none" />

              {/* Cinematic Dark Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
            </div>

            {/* Curved Border Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 1000 562.5"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c026d3" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#c026d3" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <path
                d="M 20 56.25 Q 500 140.625 980 56.25 C 995 56.25 1000 67.5 1000 84.375 L 1000 478.125 C 1000 495 995 506.25 980 506.25 Q 500 421.875 20 506.25 C 5 506.25 0 495 0 478.125 L 0 84.375 C 0 67.5 5 56.25 20 56.25 Z"
                fill="none"
                stroke="url(#borderGrad)"
                strokeWidth="5"
              />
            </svg>
          </div>

          {/* Button */}
          <div className="z-10 shrink-0 relative group/btn">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-50 blur-lg group-hover/btn:opacity-90 transition-opacity duration-300" />
            <Link
              href={service.link}
              className="relative inline-flex items-center gap-2.5 px-9 py-3.5 md:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #9333ea, #c026d3)" }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12" />
              <span className="relative z-10">Explore {service.title.split(" ")[0]}</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </Link>
          </div>
        </section>
      ))}
    </div>
  );
}