'use client';

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Video,
  TabletSmartphone,
  ChartNoAxesCombined
} from "lucide-react";

export default function Navbar() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const servicesNav = [
    {
      name: "SaaS Videos",
      href: "/",
      icon: Video,
      desc: "Cinematic Product Demos",
    },
    {
      name: "Short Videos",
      href: "/",
      icon: TabletSmartphone,
      desc: "Reels & TikTok Edits",
    },
    {
      name: "Real Estate",
      href: "/",
      icon: ChartNoAxesCombined,
      desc: "Property Tour Edits",
    },
  ];

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveTooltip(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent pt-4 sm:pt-6 px-3 sm:px-8">
      <div
        ref={navRef}
        className="max-w-7xl mx-auto h-16 sm:h-20 flex items-center justify-between"
      >
        {/* LOGO */}
        <a href="/" className="ml-1 sm:ml-4 inline-block flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Retnavia Logo"
            width={50}
            height={50}
            priority
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          />
        </a>

        {/* MOBILE NAVIGATION: ICON ONLY WITH CENTER SPEECH BUBBLE / TOOLTIP */}
        <div className="flex md:hidden items-center gap-1 sm:gap-2 bg-white/5 border border-indigo-500/20 backdrop-blur-md py-1.5 px-3 rounded-full relative">
          {servicesNav.map((service, idx) => {
            const IconComponent = service.icon;
            const isOpen = activeTooltip === idx;

            return (
              <div key={idx} className="relative">
                {/* ICON BUTTON */}
                <button
                  onClick={() => setActiveTooltip(isOpen ? null : idx)}
                  className={`p-2 rounded-full transition-all duration-300 relative ${isOpen
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)]"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  aria-label={service.name}
                >
                  <IconComponent className="w-5 h-5" />
                </button>

                {/* SPEECH BUBBLE DROPDOWN / POPUP WITH CENTER ARROW (NOK) */}
                {isOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 w-44 bg-[#08071a]/95 border border-indigo-500/40 rounded-2xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">

                    {/* CENTER POINTING ARROW (NOK) */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[8px] border-b-indigo-500/50" />
                    <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[7px] border-b-[#08071a]" />

                    {/* CONTENT */}
                    <div className="text-center flex flex-col items-center">
                      <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-0.5">
                        {service.name}
                      </span>
                      <span className="text-[9px] text-blue-200/80 mb-2 leading-tight">
                        {service.desc}
                      </span>

                      <a
                        href={service.href}
                        onClick={() => setActiveTooltip(null)}
                        className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-md hover:brightness-110 active:scale-95 transition-all"
                      >
                        <span>Open</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DESKTOP NAVIGATION (BLUISH PURPLE ACCENTS) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {servicesNav.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <a
                key={idx}
                href={service.href}
                className="group relative flex items-center gap-2 py-2 text-xs lg:text-sm font-semibold tracking-wider text-gray-300 hover:text-white transition-colors uppercase"
              >
                {/* ICON: Hover par slide-in & fade-in */}
                <span className="max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out flex items-center text-indigo-400">
                  <IconComponent className="w-4 h-4 shrink-0" />
                </span>

                {/* TEXT */}
                <span>{service.name}</span>

                {/* Bluish-Purple Hover Underline Glow */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out rounded-full" />
              </a>
            );
          })}
        </nav>

        {/* BOOK A CALL BUTTON (RESPONSIVE WITH ORIGINAL PURPLE-FUCHSIA GRADIENT) */}
        <div className="flex items-center">
          <a
            href="#booking"
            className="group relative inline-flex items-center gap-1.5 sm:gap-3 pl-3.5 sm:pl-6 pr-1 sm:pr-2 py-1 sm:py-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 text-white font-bold text-[9px] min-[380px]:text-[10px] sm:text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 shrink-0"
          >
            <span className="whitespace-nowrap">Book A Call</span>
            <div className="w-5 h-5 min-[380px]:w-6 min-[380px]:h-6 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shrink-0 text-purple-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-3 h-3 min-[380px]:w-3.5 min-[380px]:h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </div>
          </a>
        </div>

      </div>
    </header>
  );
}