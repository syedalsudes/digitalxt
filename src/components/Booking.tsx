'use client';

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Video, Globe } from "lucide-react";

export default function BookingSection() {
  const today = new Date();
  
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 6, 27)); // Defaulting to July 27, 2026
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [activeSlotForSelection, setActiveSlotForSelection] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  // Generate 1-HOUR interval time slots from 7:00 AM to 8:00 PM
  const timeSlots: string[] = [];
  for (let hour = 7; hour <= 20; hour++) {
    const formattedHour12 = hour % 12 === 0 ? 12 : hour % 12;
    const period = hour < 12 ? "AM" : "PM";
    const pad = (num: number) => (num < 10 ? `0${num}` : num);

    timeSlots.push(`${pad(formattedHour12)}:00 ${period}`);
  }

  // Calendar Helpers
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday start

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // Past dates click disable
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
      year: "numeric",
    });
  };

  return (
    <section className="relative w-full py-20 bg-[#08050c] text-white flex items-center justify-center font-sans border-t border-purple-900/20">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl mx-4 bg-[#141218] border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        
        {/* LEFT PANEL */}
        <div className="md:col-span-5 p-8 bg-[#18161e] border-r border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-purple-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                </div>
              </div>
            </div>

            <span className="text-xs text-gray-400 font-medium block mb-1">
              Inquiry @ Digitalix-Studios.com
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Digitalix Studios (Home)
            </h2>

            {/* Event Details */}
            <div className="space-y-4 text-sm text-gray-300 mb-8 font-medium">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>1 Hour Meeting</span>
              </div>
              <div className="flex items-center gap-3">
                <Video className="w-4 h-4 text-gray-400" />
                <span>
                  {selectedTime ? selectedTime : "Select Time"} - {formatDateHeader(selectedDate)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-400" />
                <span>Asia/Karachi (GMT+5)</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Welcome to Digitalix Studios, your premier destination for professional video editing services. We are a dedicated team of creative experts who specialize in delivering high-quality video edits for a wide range of purposes.
            </p>
          </div>

          <div className="text-[11px] text-gray-500 mt-8">
            © 2026 Digitalix Studios. All rights reserved.
          </div>
        </div>

        {/* RIGHT PANEL: Calendar & Time */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-[#141218]">
          
          <h3 className="text-xl font-bold text-white mb-6">Select Date & Time</h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* CALENDAR */}
            <div className={`${selectedDate ? "lg:col-span-7" : "lg:col-span-12"} transition-all duration-300`}>
              
              {/* Month Selector */}
              <div className="flex items-center justify-between mb-6 px-2">
                <button
                  onClick={prevMonth}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-bold text-base text-white">
                  {monthNames[month]} {year}
                </span>
                <button
                  onClick={nextMonth}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 gap-1 text-center mb-3">
                {daysOfWeek.map((day, i) => (
                  <span key={i} className="text-[10px] font-bold text-gray-400 tracking-wider">
                    {day}
                  </span>
                ))}
              </div>

              {/* Grid of Days */}
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
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full mx-auto flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                        isPast
                          ? "text-gray-500 bg-white/5 cursor-not-allowed opacity-50" // Visible but non-selectable
                          : isSelected
                          ? "bg-purple-600 text-white font-bold ring-4 ring-purple-500/30 scale-105 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                          : "text-purple-200 bg-purple-950/20 hover:bg-purple-900/40 border border-purple-500/10 hover:border-purple-500/40"
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* TIME SLOTS (1-Hour Slots) */}
            {selectedDate && (
              <div className="lg:col-span-5 flex flex-col h-full border-l border-white/5 lg:pl-6 pt-4 lg:pt-0">
                <div className="text-xs font-semibold text-gray-400 mb-4">
                  {formatDateHeader(selectedDate)}
                </div>

                {/* 1-Hour Interval Scrollable List */}
                <div className="max-h-[320px] overflow-y-auto pr-2 space-y-2.5 custom-scrollbar">
                  {timeSlots.map((slot, index) => {
                    const isSelectedSlot = activeSlotForSelection === slot;

                    return (
                      <div key={index} className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveSlotForSelection(slot)}
                          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 border text-center ${
                            isSelectedSlot
                              ? "bg-[#251f33] border-purple-400 text-white shadow-md"
                              : "bg-[#181422] border-white/5 text-gray-300 hover:border-purple-500/40 hover:bg-[#1f1a2e]"
                          }`}
                        >
                          {slot}
                        </button>

                        {/* SELECT BUTTON - Appears ONLY when slot is clicked */}
                        {isSelectedSlot && (
                          <button
                            onClick={() => {
                              setSelectedTime(slot);
                              setIsBooked(true);
                            }}
                            className="py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all duration-200 animate-in fade-in zoom-in-95 shadow-[0_0_15px_rgba(168,85,247,0.4)] shrink-0"
                          >
                            Select
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Success Toast */}
          {isBooked && (
            <div className="mt-6 p-4 rounded-xl bg-purple-950/80 border border-purple-500/40 text-center animate-in fade-in">
              <p className="text-xs text-purple-200 font-medium">
                🎉 Meeting scheduled for <span className="font-bold text-white">{formatDateHeader(selectedDate)}</span> at <span className="font-bold text-white">{selectedTime}</span>!
              </p>
            </div>
          )}

        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </section>
  );
}