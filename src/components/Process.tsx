'use client';

import React, { useEffect, useRef } from "react";
import { Cinzel } from "next/font/google";
import {
    PhoneCall,
    LayoutGrid,
    User,
    UserCheck,
    Video,
    CheckCircle2,
    Zap,
    Clock
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["700"],
});

// Client Instructions ke mutabiq exact text & icons
const processSteps = [
    {
        step: "STEP 01",
        title: "Book a Call",
        desc: "Schedule a call with us at your convenience to discuss your needs.",
        icon: PhoneCall,
    },
    {
        step: "STEP 02",
        title: "Select Suitable Package",
        desc: "Choose the package that best fits your requirements.",
        icon: LayoutGrid,
    },
    {
        step: "STEP 03",
        title: "SignUp",
        desc: "Complete a quick signup process to get started.",
        icon: User,
    },
    {
        step: "STEP 04",
        title: "Onboarding",
        desc: "Your dedicated editor, Content manager and Content sheet assignment.",
        icon: UserCheck,
    },
    {
        step: "STEP 05",
        title: "Raw Footage Submission",
        desc: "Record your content and submit at your ease.",
        icon: Video,
    },
    {
        step: "STEP 06",
        title: "Delivery",
        desc: "Your team will start working and deliver regularly.",
        icon: CheckCircle2,
    },
];

export default function ProcessSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Header Fade & Slide Down
            gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: -30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );

            // Stagger Steps Animation
            if (timelineRef.current) {
                gsap.fromTo(
                    timelineRef.current.children,
                    { opacity: 0, y: 35, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: "top 85%",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#06030a] text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden selection:bg-purple-600 selection:text-white"
        >
            {/* Background Ambient Purple Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] md:w-[1100px] h-[220px] sm:h-[400px] md:h-[600px] bg-purple-600/15 blur-[120px] sm:blur-[170px] rounded-full pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* HEADER SECTION */}
                <div ref={headerRef} className={`z-10 text-center max-w-4xl mx-auto mb-16 sm:mb-24 px-4 ${cinzel.className}`}>

                    {/* Subheading Label */}
                    <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3 font-sans">
                        <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-purple-400/60" />
                        <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-purple-300/70 font-semibold">
                            OUR PROCESS
                        </p>
                        <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-purple-400/60" />
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
                        A SIMPLE PROCESS
                    </h2>

                    <p className="font-sans text-slate-400 text-xs sm:text-sm md:text-base mt-4 font-normal tracking-wide max-w-2xl mx-auto">
                        From booking a call to final delivery — we make it easy, fast, and hassle-free.
                    </p>
                </div>

                {/* TIMELINE PROCESS SECTION */}
                <div className="relative w-full">

                    {/* Connected Line passing through circle nodes */}
                    <div className="hidden lg:block absolute top-[36px] left-[7%] right-[7%] h-[1.5px] bg-purple-500/40 z-0" />

                    {/* 6 Step Columns */}
                    <div
                        ref={timelineRef}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-4 relative z-10"
                    >
                        {processSteps.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div key={index} className="flex flex-col items-center group text-center">

                                    {/* Circular Node Icon */}
                                    <div className="relative mb-6 z-10">
                                        <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-md group-hover:bg-purple-400/50 transition-all duration-300" />

                                        <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#080411] border border-purple-400/60 flex items-center justify-center text-purple-300 transition-all duration-300 group-hover:scale-110 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                            <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="w-full flex flex-col items-center px-2">
                                        {/* Step Number */}
                                        <span className="text-[11px] font-mono font-bold tracking-widest text-purple-400/90 uppercase mb-2">
                                            {item.step}
                                        </span>

                                        {/* Title */}
                                        <h3 className="text-sm sm:text-base font-bold text-white mb-2.5 leading-snug group-hover:text-purple-200 transition-colors">
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-slate-400 text-xs leading-relaxed font-sans max-w-[200px]">
                                            {item.desc}
                                        </p>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* BELOW PROCESS BUTTON / DELIVERY BADGES */}
                <div className="mt-14 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                    
                    {/* Short Form Badge */}
                    <div className="relative group/pill w-full sm:w-auto">
                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-40 blur-md group-hover/pill:opacity-75 transition-opacity duration-300" />
                        <div className="relative flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full border border-purple-400/40 bg-[#120824]/95 text-purple-200 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-lg">
                            <Zap className="w-4 h-4 text-purple-400 fill-purple-400/40 animate-pulse shrink-0" />
                            <span>24 Hrs Delivery for Short Form Videos</span>
                        </div>
                    </div>

                    {/* Long Form Badge */}
                    <div className="relative group/pill w-full sm:w-auto">
                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-40 blur-md group-hover/pill:opacity-75 transition-opacity duration-300" />
                        <div className="relative flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full border border-purple-400/40 bg-[#120824]/95 text-purple-200 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-lg">
                            <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                            <span>48 Hrs Delivery for Long Form Videos</span>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}