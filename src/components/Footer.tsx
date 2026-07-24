'use client';

import React from "react";
import Image from "next/image";
import { Cinzel } from "next/font/google";
import { Mail } from "lucide-react";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

// Clean Minimal SVG Social Icons (No Box/Background)
const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#050308] text-white border-t border-white/10 overflow-hidden pt-16 pb-10">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-900/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Info (Col 1-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <a href="#" className="inline-flex items-center gap-3 mb-4">
                <Image
                  src="/logo.png"
                  alt="DigitalXT Logo"
                  width={44}
                  height={44}
                  className="w-10 h-10 object-contain"
                />
                <span className={`text-2xl font-bold uppercase tracking-widest text-white ${cinzel.className}`}>
                  DigitalXT
                </span>
              </a>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-6 font-light">
                Crafting high-retention video edits, luxury architectural showcases, and high-converting SaaS motion graphics for elite brands.
              </p>
            </div>

            {/* Direct Contact Mail */}
            <div className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-purple-400" />
              <a href="mailto:contact@digitalxt.com">contact@digitalxt.com</a>
            </div>
          </div>

          {/* Navigation Links (Col 6-8) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-widest text-purple-400 mb-5 ${cinzel.className}`}>
                Navigation
              </h4>
              <ul className="space-y-3 text-xs font-medium text-gray-400">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#work" className="hover:text-white transition-colors">Our Work</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`text-xs font-bold uppercase tracking-widest text-purple-400 mb-5 ${cinzel.className}`}>
                Resources
              </h4>
              <ul className="space-y-3 text-xs font-medium text-gray-400">
                <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#booking" className="hover:text-white transition-colors">Book a Call</a></li>
              </ul>
            </div>
          </div>

          {/* Clean Borderless Social Icons (Col 9-12) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-widest text-purple-400 mb-5 ${cinzel.className}`}>
                Connect With Us
              </h4>
              
              {/* Direct Icons Grid (No Gray Box Backgrounds) */}
              <div className="flex items-center gap-6 text-gray-400">
                <a
                  href="https://www.linkedin.com/company/digitalix-studios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 hover:scale-110 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>

                <a
                  href="https://www.instagram.com/digitalix_studios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 hover:scale-110 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://www.facebook.com/digitalixwebstudios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 hover:scale-110 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Retnavia Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© {currentYear} DigitalXT. All rights reserved.</p>
          
          <p className="text-gray-400">
            Crafted with precision by{" "}
            <a
              href="https://retnavia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 font-semibold hover:underline hover:text-purple-300 transition-colors"
            >
              Retnavia
            </a>
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}