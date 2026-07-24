'use client';

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const subServices = [
  { name: "Real Estate Media", href: "#services" },
  { name: "Launch Videos SaaS Animation", href: "#services" },
  { name: "Custom Video Editing", href: "#services" },
];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent pt-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto h-16 sm:h-20 flex items-center justify-between">
        
        {/* LOGO (Added ml-2 sm:ml-4 to push it slightly to the right) */}
        <a href="/" className="ml-2 sm:ml-4 inline-block flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Retnavia Logo"
            width={50}
            height={50}
            priority
            className="w-16 h-16 object-contain"
          />
        </a>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-8">
          

          {/* SERVICES DROPDOWN */}
          <div className="relative group py-2">
            <a
              href="#services"
              className="flex items-center gap-1 text-xs font-semibold tracking-wider text-gray-200 hover:text-white transition-colors uppercase"
            >
              <span>Services</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
            </a>

            {/* Hover Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
              <div className="w-56 p-2 rounded-2xl bg-[#0c0617]/95 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-1">
                {subServices.map((sub, idx) => (
                  <a
                    key={idx}
                    href={sub.href}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    {sub.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#ourwork"
            className="text-xs font-semibold tracking-wider text-gray-200 hover:text-white transition-colors uppercase"
          >
            Our Work
          </a>

          <a
            href="#faq"
            className="text-xs font-semibold tracking-wider text-gray-200 hover:text-white transition-colors uppercase"
          >
            FAQs
          </a>

          <a
            href="#contact"
            className="text-xs font-semibold tracking-wider text-gray-200 hover:text-white transition-colors uppercase"
          >
            Contact
          </a>
        </nav>

        {/* BOOK A CALL PILL BUTTON */}
        <div className="hidden md:flex items-center">
          <a
            href="#booking"
            className="group relative inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Book A Call</span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 text-purple-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </a>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-gray-300 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-[#0c0617]/98 border border-white/10 rounded-3xl p-6 flex flex-col gap-5 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest px-2">
              Services
            </span>
            {subServices.map((sub, idx) => (
              <a
                key={idx}
                href={sub.href}
                onClick={() => setMobileMenuOpen(false)}
                className="pl-4 text-xs font-semibold text-gray-300 hover:text-white uppercase transition-colors"
              >
                {sub.name}
              </a>
            ))}

            <div className="h-[1px] bg-white/10 my-2" />

            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold tracking-wider text-gray-200 hover:text-white uppercase transition-colors px-2"
            >
              About Us
            </a>

            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold tracking-wider text-gray-200 hover:text-white uppercase transition-colors px-2"
            >
              FAQs
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold tracking-wider text-gray-200 hover:text-white uppercase transition-colors px-2"
            >
              Contact
            </a>
          </div>

          <a
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between w-full pl-6 pr-2 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-bold text-xs uppercase tracking-wider"
          >
            <span>Book A Call</span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-purple-600">
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </a>
        </div>
      )}
    </header>
  );
}