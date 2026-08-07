'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cinzel } from "next/font/google";
import Image from "next/image";

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["700", "900"],
});

export default function Loader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fast loading: Sirf 1 second tak screen par rahega
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    key="shutter-loader"
                    initial={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{
                        duration: 0.6,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    className="fixed inset-0 z-[9999] bg-[#08050c] text-white flex flex-col items-center justify-center overflow-hidden select-none pointer-events-auto px-4"
                >
                    {/* Responsive Ambient Purple Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] h-[300px] sm:h-[400px] bg-purple-600/25 blur-[100px] sm:blur-[160px] rounded-full pointer-events-none" />

                    {/* Center Content Box */}
                    <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto">

                        {/* LOGO + COMPANY NAME (DIGITALIX STUDIOS) */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 md:gap-6 w-full">
                            <a href="/" className="inline-block flex-shrink-0 transition-transform duration-300 hover:scale-105">
                                <Image
                                    src="/logo.png"
                                    alt="Digitalix Studios Logo"
                                    width={80}
                                    height={80}
                                    priority
                                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]"
                                />
                            </a>

                            <span 
                              className={`${cinzel.className} 
                                text-xl sm:text-3xl md:text-5xl lg:text-6xl 
                                font-bold tracking-[0.1em] sm:tracking-[0.15em] 
                                uppercase text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] 
                                text-center sm:whitespace-nowrap break-words`}
                            >
                                DIGITALIX STUDIOS
                            </span>
                        </div>

                    </div>

                    {/* Bottom Accent Glow Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}