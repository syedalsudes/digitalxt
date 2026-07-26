'use client';

/**
 * BookMeeting
 * -----------
 * Obsidian & Cinematic Purple High-End Booking Deck.
 * Fixed: Custom Minimal Scrollbar + Lenis Prevention + Micro Animations
 */

import { useMemo, useRef, useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Cinzel } from 'next/font/google';
import { ArrowRight, CheckCircle2, Calendar as CalendarIcon, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['700'],
});

type TimePeriod = { period: string; slots: string[] };

const TIME_PERIODS: TimePeriod[] = [
  { period: 'Morning', slots: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'] },
  {
    period: 'Afternoon',
    slots: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
  },
  { period: 'Evening', slots: ['17:00', '17:30', '18:00'] },
];

const WEEKDAY_FMT = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
const MONTH_FMT = new Intl.DateTimeFormat('en-US', { month: 'short' });
const FULL_DATE_FMT = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function buildDates(count: number) {
  const out: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
}

function to12Hour(time: string) {
  const [hStr, m] = time.split(':');
  let h = parseInt(hStr, 10);
  const period = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${period}`;
}

// Deterministic pseudo-availability
function isAvailable(key: string, time: string) {
  const str = key + time;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 5 !== 0;
}

export interface BookMeetingSubmission {
  date: Date;
  time: string;
  name: string;
  email: string;
  note: string;
}

export interface BookMeetingProps {
  title?: string;
  eyebrow?: string;
  description?: string;
  daysAhead?: number;
  onSubmit?: (data: BookMeetingSubmission) => void | Promise<void>;
}

export default function BookMeeting({
  title = 'BOOK A MEETING',
  eyebrow = 'AVAILABILITY & SLOTS',
  description = 'Pick a time slot that fits your schedule — we will confirm your video strategy session instantly.',
  daysAhead = 21,
  onSubmit,
}: BookMeetingProps) {
  const dates = useMemo(() => buildDates(daysAhead), [daysAhead]);
  
  // GSAP Refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardDeckRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const selectedDate = dates[selectedIndex];
  const selectedKey = dateKey(selectedDate);

  // Lenis & GSAP Animation Setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'restart reverse restart reverse',
        },
      });

      tl.fromTo(
        cardDeckRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  function scrollRail(dir: number) {
    railRef.current?.scrollBy({ left: dir * 180, behavior: 'smooth' });
  }

  function pickDate(i: number) {
    setSelectedIndex(i);
    setSelectedTime(null);
    setError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selectedTime) {
      setError('Please select a time slot.');
      return;
    }
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError(null);
    setStatus('submitting');
    try {
      if (onSubmit) {
        await onSubmit({ date: selectedDate, time: selectedTime, name, email, note });
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus('success');
    } catch {
      setError('Something went wrong. Please try again.');
      setStatus('idle');
    }
  }

  function reset() {
    setStatus('idle');
    setSelectedTime(null);
    setName('');
    setEmail('');
    setNote('');
    setError(null);
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 px-4 bg-[#08050c] text-white flex flex-col items-center justify-center overflow-hidden selection:bg-purple-500/30"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/15 blur-[170px] rounded-full pointer-events-none" />

      {/* Main Glass Deck */}
      <div
        ref={cardDeckRef}
        className="relative z-10 w-full max-w-5xl mx-auto rounded-3xl bg-[#0e0918]/90 border border-purple-500/20 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
      >
        {status === 'success' && selectedTime ? (
          /* SUCCESS SCREEN */
          <div className="py-12 px-4 text-center flex flex-col items-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-400 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <CheckCircle2 className="w-8 h-8 text-purple-300" />
            </div>

            <span className="text-xs uppercase tracking-[0.3em] font-mono text-purple-400 mb-2">
              CONFIRMED & SCHEDULED
            </span>
            <h3 className={`text-3xl sm:text-4xl font-black uppercase text-white mb-4 ${cinzel.className}`}>
              You&rsquo;re All Set!
            </h3>

            <div className="w-full bg-[#130b24] border border-purple-500/30 rounded-2xl p-5 mb-6 text-left space-y-3">
              <div className="flex items-center gap-3 text-sm text-purple-200">
                <CalendarIcon className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{FULL_DATE_FMT.format(selectedDate)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-purple-200">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{to12Hour(selectedTime)} (GMT+5)</span>
              </div>
              <div className="pt-2 border-t border-white/10 text-xs text-gray-400">
                A Google Meet link has been dispatched to <strong className="text-white">{email}</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={reset}
              className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-purple-400/40 bg-purple-950/60 hover:bg-purple-900/80 transition-all duration-300 cursor-pointer"
            >
              Book Another Meeting
            </button>
          </div>
        ) : (
          /* BOOKING FORM DECK */
          <>
            {/* Header */}
            <header className="mb-10 text-center sm:text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-300/70 font-semibold mb-2">
                {eyebrow}
              </p>
              <h2 className={`text-3xl sm:text-5xl font-black uppercase tracking-wider bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-md ${cinzel.className}`}>
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mt-2 font-normal leading-relaxed">
                {description}
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Date & Time Selectors */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* 1. Date Rail Selector */}
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs uppercase tracking-widest text-purple-300/80 font-bold">
                      1. Select Date
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        aria-label="Scroll dates back"
                        onClick={() => scrollRail(-1)}
                        className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400 hover:bg-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        aria-label="Scroll dates forward"
                        onClick={() => scrollRail(1)}
                        className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400 hover:bg-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
                      >
                        ›
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scroll Rail */}
                  <div
                    ref={railRef}
                    data-lenis-prevent
                    className="flex gap-3 overflow-x-auto pb-3 pt-1 px-1 custom-purple-scroll scroll-smooth"
                  >
                    {dates.map((d, i) => {
                      const isSelected = i === selectedIndex;
                      const isToday = i === 0;

                      return (
                        <button
                          key={dateKey(d)}
                          type="button"
                          onClick={() => pickDate(i)}
                          className={`relative flex min-w-[65px] flex-col items-center gap-1 rounded-2xl border py-3 px-2 transition-all duration-300 cursor-pointer shrink-0 ${
                            isSelected
                              ? 'border-purple-400 bg-purple-600 text-white shadow-lg shadow-purple-600/40 scale-105'
                              : 'border-white/10 bg-white/5 text-gray-400 hover:border-purple-500/40 hover:text-white'
                          }`}
                        >
                          <span className="text-[10px] uppercase font-mono tracking-wider opacity-80">
                            {WEEKDAY_FMT.format(d)}
                          </span>
                          <span className="text-base font-bold">{d.getDate()}</span>
                          <span className="text-[9px] uppercase font-mono text-purple-300/60">
                            {MONTH_FMT.format(d)}
                          </span>
                          {isToday && (
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-purple-300 animate-pulse" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              {/* 2. Time Slot Groups */}
<div>
  <span className="text-xs uppercase tracking-widest text-purple-300/80 font-bold block mb-3 px-1">
    2. Select Time
  </span>
  
  {/* Height reduced to max-h-[220px] for perfect layout balance */}
  <div 
    data-lenis-prevent 
    className="space-y-4 max-h-[220px] overflow-y-auto pr-2 custom-purple-scroll overscroll-contain"
  >
    {TIME_PERIODS.map((group) => (
      <div key={group.period} className="bg-[#07030d] p-3.5 rounded-2xl border border-white/5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block mb-2">
          {group.period}
        </span>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {group.slots.map((slot) => {
            const available = isAvailable(selectedKey, slot);
            const active = selectedTime === slot;
            return (
              <button
                key={slot}
                type="button"
                disabled={!available}
                onClick={() => {
                  setSelectedTime(slot);
                  setError(null);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold font-mono border transition-all duration-200 cursor-pointer ${
                  active
                    ? 'border-purple-400 bg-purple-600/30 text-white shadow-md shadow-purple-600/30 scale-105'
                    : available
                    ? 'border-white/10 bg-white/5 text-gray-300 hover:border-purple-400/50 hover:text-white'
                    : 'border-white/5 bg-transparent text-gray-600 line-through cursor-not-allowed opacity-30'
                }`}
              >
                {to12Hour(slot)}
              </button>
            );
          })}
        </div>
      </div>
    ))}
  </div>
</div>
              </div>

              {/* RIGHT COLUMN: Confirmation Form */}
              <div className="lg:col-span-5 bg-[#07030d] p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-purple-300/80 font-bold block mb-4">
                    3. Your Information
                  </span>

                  <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div>
                      <label className="text-[11px] font-mono uppercase text-gray-400 block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alice Johnson"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:border-purple-400 focus:outline-none transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-gray-400 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alice@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:border-purple-400 focus:outline-none transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-gray-400 block mb-1">
                        Project Details (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Tell us briefly about your goals..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:border-purple-400 focus:outline-none transition-all duration-300 resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-xs text-rose-400 font-medium" role="alert">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full mt-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 hover:scale-[1.02] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Confirm Booking</span>
                          <ArrowRight className="w-4 h-4 text-purple-200" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </>
        )}
      </div>

      {/* ULTRA-SLIM CUSTOM PURPLE SCROLLBAR CSS */}
      <style jsx global>{`
        /* Sleek 4px Purple Line Scrollbar */
        .custom-purple-scroll::-webkit-scrollbar {
          width: 4px !important;
          height: 4px !important;
        }
        .custom-purple-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03) !important;
          border-radius: 9999px !important;
        }
        .custom-purple-scroll::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4) !important;
          border-radius: 9999px !important;
        }
        .custom-purple-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.8) !important;
        }
        /* Firefox */
        .custom-purple-scroll {
          scrollbar-width: thin !important;
          scrollbar-color: rgba(168, 85, 247, 0.4) rgba(255, 255, 255, 0.03) !important;
        }
      `}</style>
    </section>
  );
}