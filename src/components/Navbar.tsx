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
      name: "Real Estate",
      href: "/services/real-estate",
      icon: House,
    },
    {
      name: "SaaS Videos",
      href: "/services/saas-videos",
      icon: Video,
    },
    {
      name: "Custom Editing",
      href: "/services/short-form",
      icon: TabletSmartphone,
    },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent pt-3 sm:pt-6 px-3 sm:px-8 xl:px-12 2xl:px-16 4xl:px-24">
      {/* Container limit badha kar 4xl screens tak responsive stretching allow ki hai */}
      <div className="w-full max-w-[2560px] mx-auto h-16 sm:h-20 lg:h-24 2xl:h-28 flex items-center justify-between gap-2 sm:gap-6 lg:gap-10">
        
        {/* MAIN LOGO: Fluid width using responsive Tailwind classes */}
        <a href="/" className="inline-block shrink-0">
          <Image
            src="/logo.png"
            alt="Retnavia Logo"
            width={120}
            height={120}
            priority
            className="w-12 h-12 min-[380px]:w-14 min-[380px]:h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24 object-contain"
          />
        </a>

        {/* MOBILE & TABLET NAVIGATION (WITHOUT HAMBURGER) */}
        <div className="flex lg:hidden items-center justify-center gap-1 min-[380px]:gap-2 sm:gap-4 bg-white/5 border border-purple-500/30 backdrop-blur-md py-1.5 px-2 min-[380px]:px-3 sm:px-5 rounded-full mx-auto">
          {servicesNav.map((service, idx) => {
            const IconComponent = service.icon;

            return (
              <a
                key={idx}
                href={service.href}
                className="p-1.5 sm:p-2.5 rounded-full text-white hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-1 sm:gap-2"
                aria-label={service.name}
              >
                <IconComponent className="w-4 h-4 min-[380px]:w-5 min-[380px]:h-5 sm:w-6 sm:h-6 text-white shrink-0" />
                {/* Micro screen label if space permits, hidden on ultra-small screens */}
                <span className="hidden min-[420px]:inline text-[10px] sm:text-xs font-semibold text-gray-200">
                  {service.name}
                </span>
              </a>
            );
          })}
        </div>

        {/* DESKTOP & EXTRA LARGE SCREENS NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10 2xl:gap-14 4xl:gap-20">
          {servicesNav.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <a
                key={idx}
                href={service.href}
                className="group relative flex items-center gap-2 py-2 text-xs xl:text-sm 2xl:text-base 4xl:text-lg font-semibold tracking-wider text-gray-300 hover:text-white transition-colors uppercase whitespace-nowrap"
              >
                <span className="max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[24px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out flex items-center text-white">
                  <IconComponent className="w-4 h-4 2xl:w-5 2xl:h-5 shrink-0 text-white" />
                </span>

                <span>{service.name}</span>

                <span className="absolute bottom-0 left-0 w-0 h-[2px] 2xl:h-[3px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 group-hover:w-full transition-all duration-300 ease-out rounded-full" />
              </a>
            );
          })}
        </nav>

        {/* BOOK A CALL BUTTON */}
        <div className="flex items-center shrink-0">
          <a
            href="/#book-call"
            className="group relative inline-flex items-center gap-1.5 sm:gap-3 2xl:gap-4 pl-3 sm:pl-6 2xl:pl-8 pr-1 sm:pr-2 2xl:pr-3 py-1.5 sm:py-2.5 2xl:py-3 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 text-white font-bold text-[9px] min-[380px]:text-[10px] sm:text-xs 2xl:text-sm 4xl:text-base uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 shrink-0"
          >
            <span className="whitespace-nowrap">Book A Call</span>
            <div className="w-5 h-5 min-[380px]:w-6 min-[380px]:h-6 sm:w-8 sm:h-8 2xl:w-10 2xl:h-10 rounded-full bg-white flex items-center justify-center shrink-0 text-purple-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-3 h-3 min-[380px]:w-3.5 min-[380px]:h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5 stroke-[2.5]" />
            </div>
          </a>
        </div>

      </div>
    </header>
  );
}