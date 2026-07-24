'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock, Video, Globe, CheckCircle2 } from "lucide-react";
import { Cinzel } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

export default function BookingSection() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(2026, 6, 27)
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [activeSlotForSelection, setActiveSlotForSelection] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  // GSAP References
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Lenis Engine Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 2. GSAP Entrance Sequence
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Hide initial elements
      gsap.set([headingRef.current, leftPanelRef.current, rightPanelRef.current], {
        opacity: 0,
        y: 40,
      });

      // Animate In
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          leftPanelRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to(
          rightPanelRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  // Generate 1-HOUR interval time slots from 7:00 AM to 8:00 PM
  const timeSlots: string[] = [];
  for (let hour = 7; hour <= 20; hour++) {
    const formattedHour12 = hour % 12 === 0 ? 12 : hour % 12;
    const period = hour < 12 ? "AM" : "PM";
    const pad = (num: number) => (num < 10 ? `0${num}` : num);
    timeSlots.push(`${pad(formattedHour12)}:00 ${period}`);
  }

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (clickedDate < todayStart) return;

    setSelectedDate(clickedDate);
    setSelectedTime(null);
    setActiveSlotForSelection(null);
    setIsBooked(false);
  };

  const formatDateHeader = (date: Date | null) => {
    if (!date) return "Select a Date";
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="w-full py-28 bg-[#08050c] text-white flex flex-col items-center border-t border-white/5 relative overflow-hidden"
    >
      {/* Background Subtle Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />

      {/* 1-Line Minimal Heading */}
      <div ref={headingRef} className="relative z-10 text-center mb-16 px-4 flex flex-col items-center">
        <h2 className={`text-3xl sm:text-5xl font-bold uppercase tracking-widest text-white ${cinzel.className}`}>
          Book A Meeting
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-3" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        <div className="bg-[#0e0918]/90 border border-white/10 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[520px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          
          {/* Left Info Panel */}
          <div ref={leftPanelRef} className="lg:col-span-4 p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-[#0a0612]">
            <div>
              {/* Agency Logo Integrated */}
              <div className="flex items-center gap-3 mb-8">
                <Image
                  src="/logo.png"
                  alt="Retnavia Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
                <span className={`text-lg font-bold uppercase tracking-wider text-white ${cinzel.className}`}>
                  DIGITALIX STUDIOS
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Discovery Call
              </h3>
              <p className="text-xs text-gray-400 mb-8 leading-relaxed font-light">
                Let's discuss your video project goals, visual editing requirements, and strategy.
              </p>

              <div className="space-y-4 text-xs text-gray-300 font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-purple-400" />
                  </div>
                  <span>1 Hour Session</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4 text-purple-400" />
                  </div>
                  <span>Google Meet / Zoom</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-purple-400" />
                  </div>
                  <span>Asia/Karachi (GMT+5)</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 mt-10 font-medium">
              © 2026 DigitalxStudio.
            </div>
          </div>

          {/* Right Calendar & Time Panel */}
          <div ref={rightPanelRef} className="lg:col-span-8 p-6 sm:p-10 bg-[#0e0918] flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Calendar Grid */}
              <div className={selectedDate ? "md:col-span-7" : "md:col-span-12"}>
                
                {/* Month Selector */}
                <div className="flex items-center justify-between mb-6 px-1">
                  <span className={`font-bold text-base text-white ${cinzel.className}`}>
                    {monthNames[month]} {year}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={prevMonth}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextMonth}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 text-center mb-3">
                  {daysOfWeek.map((day, i) => (
                    <span key={i} className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      {day}
                    </span>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-2 text-center">
                  {Array.from({ length: firstDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const dayNum = i + 1;
                    const dateObj = new Date(year, month, dayNum);
                    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    const isPast = dateObj < todayStart;

                    const isSelected =
                      selectedDate &&
                      selectedDate.getDate() === dayNum &&
                      selectedDate.getMonth() === month &&
                      selectedDate.getFullYear() === year;

                    return (
                      <button
                        key={dayNum}
                        disabled={isPast}
                        onClick={() => handleDateClick(dayNum)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl mx-auto flex items-center justify-center text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          isPast
                            ? "text-gray-600 cursor-not-allowed opacity-30"
                            : isSelected
                            ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30 border border-purple-400 scale-105"
                            : "text-gray-300 bg-white/5 border border-white/5 hover:bg-purple-900/20 hover:border-purple-500/30"
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Area (Lenis Prevent Added & Scrollbar Hidden) */}
              {selectedDate && (
                <div className="md:col-span-5 md:border-l border-white/10 md:pl-6 pt-6 md:pt-0">
                  <div className="text-xs text-gray-400 mb-4 font-semibold uppercase tracking-wider">
                    {formatDateHeader(selectedDate)}
                  </div>

                  {/* NOTE: data-lenis-prevent attribute added here */}
                  <div 
                    data-lenis-prevent
                    className="max-h-[320px] overflow-y-auto space-y-2.5 pr-1 no-scrollbar touch-pan-y"
                  >
                    {timeSlots.map((slot, index) => {
                      const isSelectedSlot = activeSlotForSelection === slot;

                      return (
                        <div key={index} className="flex gap-2">
                          <button
                            onClick={() => setActiveSlotForSelection(slot)}
                            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                              isSelectedSlot
                                ? "border-purple-400 bg-purple-950/80 text-white shadow-md"
                                : "border-white/10 bg-white/5 text-gray-300 hover:border-purple-500/40 hover:bg-white/10"
                            }`}
                          >
                            {slot}
                          </button>

                          {isSelectedSlot && (
                            <button
                              onClick={() => {
                                setSelectedTime(slot);
                                setIsBooked(true);
                              }}
                              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
                            >
                              Confirm
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Booking Success Banner */}
            {isBooked && (
              <div className="mt-8 p-4 rounded-2xl bg-purple-950/70 border border-purple-500/40 text-center text-xs text-purple-200 flex items-center justify-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>
                  Meeting scheduled for <strong className="text-white">{formatDateHeader(selectedDate)}</strong> at <strong className="text-white">{selectedTime}</strong>
                </span>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* CSS For Hiding Scrollbar while keeping functionality intact */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0px !important;
          background: transparent !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

    </section>
  );
}