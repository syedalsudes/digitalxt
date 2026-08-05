"use client";

import { InlineWidget } from "react-calendly";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

export default function CalendlyBooking() {
  return (
    <section id="book-call" className="relative w-full py-16 bg-[#08050c] text-white flex flex-col items-center justify-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Compact Title Bar (Side-by-side) */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-purple-500/20">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold mb-1">
              AVAILABILITY & SLOTS
            </p>
            <h2 className={`text-3xl sm:text-4xl font-black uppercase text-white ${cinzel.className}`}>
              Book A Meeting
            </h2>
          </div>
          <p className="text-sm text-gray-400 max-w-md mt-2 md:mt-0 text-left md:text-right">
            Select an available time slot below to schedule your consultation.
          </p>
        </div>

        {/* Deck Frame */}
        <div className="w-full rounded-2xl overflow-hidden border border-purple-500/20 bg-[#0e0918] shadow-2xl">
          <InlineWidget
            url="https://calendly.com/syedalsudes32/30min"
            styles={{
              height: "680px",
              width: "100%",
            }}
            pageSettings={{
              backgroundColor: "0e0918",
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: "a855f7",
              textColor: "a855f7"
            }}
          />
        </div>
      </div>
    </section>
  );
}