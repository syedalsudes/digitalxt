'use client';

import React from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Video,
  TabletSmartphone,
  House,
} from "lucide-react";

export default function Navbar() {
  const servicesNav = [
    {
      name: "SaaS Videos",
      href: "/",
      icon: Video,
    },
    {
      name: "Short Videos",
      href: "/",
      icon: TabletSmartphone,
    },
    {
      name: "Real Estate",
      href: "/",
      icon: House,
    },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent pt-3 sm:pt-6 px-2 sm:px-8">
      <div className="max-w-7xl mx-auto h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* MAIN LOGO: PEHLE SE BARA */}
        <a href="/" className="ml-0 inline-block shrink-0">
          <Image
            src="/logo.png"
            alt="Retnavia Logo"
            width={60}
            height={60}
            priority
            className="w-14 h-14 min-[380px]:w-16 min-[380px]:h-16 sm:w-20 sm:h-20 object-contain"
          />
        </a>

        {/* MOBILE NAVIGATION: DIRECT LINK ON CLICK, REDUCED BG HEIGHT, EASY TOUCH GAP */}
        <div className="flex md:hidden items-center justify-center gap-2 min-[380px]:gap-3 bg-white/5 border border-purple-500/30 backdrop-blur-md py-1 px-3 rounded-full mx-auto">
          {servicesNav.map((service, idx) => {
            const IconComponent = service.icon;

            return (
              <a
                key={idx}
                href={service.href}
                className="p-2 rounded-full text-white hover:text-white hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center"
                aria-label={service.name}
              >
                <IconComponent className="w-5 h-5 min-[380px]:w-6 min-[380px]:h-6 text-white shrink-0" />
              </a>
            );
          })}
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {servicesNav.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <a
                key={idx}
                href={service.href}
                className="group relative flex items-center gap-2 py-2 text-xs lg:text-sm font-semibold tracking-wider text-gray-300 hover:text-white transition-colors uppercase"
              >
                <span className="max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out flex items-center text-white">
                  <IconComponent className="w-4 h-4 shrink-0 text-white" />
                </span>

                <span>{service.name}</span>

                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 group-hover:w-full transition-all duration-300 ease-out rounded-full" />
              </a>
            );
          })}
        </nav>

        {/* BOOK A CALL BUTTON */}
        <div className="flex items-center shrink-0">
          <a
            href="#booking"
            className="group relative inline-flex items-center gap-1.5 sm:gap-3 pl-3 sm:pl-6 pr-1 sm:pr-2 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 text-white font-bold text-[8.5px] min-[380px]:text-[10px] sm:text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 shrink-0"
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