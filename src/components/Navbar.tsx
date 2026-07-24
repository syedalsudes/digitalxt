'use client';

import React from "react";
import { Search, User, Settings, Calendar } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-transparent transition-all">
      <div className="w-full px-6 sm:px-12 lg:px-16 py-5 flex items-center justify-between">
        
        {/* BRAND LOGO (Stylish, Italic & Gradient) */}
        <a href="#" className="flex items-center group select-none">
          <span className="font-black italic text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-white via-purple-300 to-purple-500 bg-clip-text text-transparent transition-all duration-300 group-hover:opacity-90">
            digitalix<span className="text-purple-500 not-italic font-black">.</span>
          </span>
        </a>

        {/* RIGHT SIDE ACTIONS & CTA BUTTON */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              aria-label="Search" 
              className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <Search className="w-4 h-4" />
            </button>

            <button 
              aria-label="Profile" 
              className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <User className="w-4 h-4" />
            </button>

            <button 
              aria-label="Settings" 
              className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* CTA BUTTON - BOOK A MEETING */}
          <a
            href="#contact"
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm rounded-full transition-all duration-300 shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Meeting</span>
          </a>

        </div>
      </div>
    </header>
  );
}