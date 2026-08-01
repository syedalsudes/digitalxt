"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Cinzel } from "next/font/google";
import { Check, Star, ArrowLeft, Play, X } from "lucide-react";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = servicesData[slug];

  // Video Lightbox Modal State
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  if (!data) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-[#050308] text-neutral-100 selection:bg-purple-500/30 overflow-x-hidden relative">
      
      {/* Subtle Dark Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Back Button */}
      <nav className="max-w-6xl mx-auto pt-10 px-6">
        <Link 
          href="/#services" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-purple-300 transition-colors duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
        </Link>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-24 px-6 text-center max-w-4xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-purple-400 bg-purple-950/40 border border-purple-500/20 px-3.5 py-1.5 rounded-full mb-6"
        >
          {data.tagline}
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider bg-gradient-to-b from-white via-neutral-200 to-purple-300 bg-clip-text text-transparent mb-6 leading-tight ${cinzel.className}`}
        >
          {data.title}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light"
        >
          {data.heroDescription}
        </motion.p>
      </section>

      {/* 2. SHOWCASE / PORTFOLIO SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400/80 block mb-2">
              Featured Work
            </span>
            <h2 className={`text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white ${cinzel.className}`}>
              Selected Projects
            </h2>
          </div>
          <p className="text-xs text-neutral-500 max-w-xs">
            Click on any project to watch high-resolution preview.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.portfolio.map((item, idx) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/40 hover:border-purple-500/40 transition-all duration-300 cursor-pointer"
              onClick={() => item.videoUrl && setActiveVideo(item.videoUrl)}
            >
              {/* Thumbnail Container */}
              <div className="aspect-video w-full bg-neutral-950/80 relative overflow-hidden flex items-center justify-center">
                {item.thumbnail ? (
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/30 to-neutral-900/50" />
                )}

                {/* Play Button Overlay */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:border-purple-400 transition-all duration-300">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
              </div>

              {/* Title & Info */}
              <div className="p-5 border-t border-white/5 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-neutral-200 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <span className="text-[10px] font-mono text-neutral-500 group-hover:text-neutral-400">
                  PLAY PREVIEW
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. PRICING SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400/80 block mb-2">
            Investment Options
          </span>
          <h2 className={`text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white ${cinzel.className}`}>
            Transparent Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {data.pricing.map((plan, i) => (
            <div 
              key={i} 
              className={`relative rounded-2xl p-8 border backdrop-blur-md flex flex-col justify-between transition-all duration-300 ${
                plan.popular 
                  ? "bg-purple-950/20 border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.1)]" 
                  : "bg-neutral-900/20 border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-6 bg-purple-500/20 border border-purple-500/40 text-purple-200 text-[9px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                  Most Popular
                </span>
              )}
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <div className="text-3xl font-black text-purple-200 my-4 font-mono">{plan.price}</div>
                <div className="h-px bg-white/5 w-full mb-6" />
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-purple-600 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 border border-white/10 hover:border-purple-500">
                Book This Package
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. REVIEWS SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5 pb-32">
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400/80 block mb-2">
            Testimonials
          </span>
          <h2 className={`text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white ${cinzel.className}`}>
            Client Feedback
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {data.reviews.map((rev, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/5 bg-neutral-900/20 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star key={starIndex} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light mb-6">"{rev.comment}"</p>
              </div>

              <div className="flex items-center gap-3">
                {rev.avatar && (
                  <img src={rev.avatar} alt={rev.name} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                )}
                <div>
                  <p className="text-white font-semibold text-xs">{rev.name}</p>
                  <p className="text-neutral-500 text-[10px]">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveVideo(null)}
          >
            <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}