'use client';

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Cinzel } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is Digitalix and what benefits does it offer?",
    answer:
      "Digitalix is a comprehensive digital platform that provides various tools and services to enhance your online presence. It offers benefits such as streamlined workflows, advanced analytics, customizable templates, and integration capabilities with popular third-party applications.",
  },
  {
    id: 2,
    question: "What types of subscriptions are available on Digitalix?",
    answer:
      "Digitalix offers three subscription tiers: Basic, Professional, and Enterprise. Each tier comes with different features and capabilities, allowing you to choose the plan that best fits your needs and budget.",
  },
  {
    id: 3,
    question: "How can I register and purchase a subscription?",
    answer:
      "To register, simply click on the Sign Up button on our homepage and follow the registration process. Once registered, you can navigate to the Pricing section to select and purchase your preferred subscription plan. We accept various payment methods including credit cards, PayPal, and bank transfers.",
  },
  {
    id: 4,
    question: "Is the subscription automatically renewable?",
    answer:
      "Yes, all Digitalix subscriptions are set to auto-renew by default to ensure uninterrupted service. You will receive a notification before each renewal, and you can disable auto-renewal at any time from your account settings.",
  },
  {
    id: 5,
    question: "Can I cancel or request a refund for my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. For refunds, we offer a 30-day money-back guarantee for new customers. If you're not satisfied with our service within the first 30 days, you can request a full refund. After this period, refunds are evaluated on a case-by-case basis.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  // GSAP References
  const sectionRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Lenis Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // 2. GSAP Scroll Animations Context
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      const faqItems = faqListRef.current ? faqListRef.current.children : [];

      // Initial state reset
      gsap.set([subtitleRef.current, titleRef.current, bannerRef.current], {
        opacity: 0,
        y: 40,
      });

      gsap.set(faqItems, {
        opacity: 0,
        y: 35,
      });

      // Sequential Entrance Animation
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to(
          faqItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          bannerRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 2xl:py-36 bg-[#08050c] text-white overflow-hidden border-t border-purple-950/40 select-none"
    >
      {/* Background Ambient Glows Scaled */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] 2xl:w-[1000px] h-[350px] sm:h-[400px] 2xl:h-[600px] bg-purple-700/10 blur-[120px] sm:blur-[180px] 2xl:blur-[220px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Ambient Purple Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] 2xl:w-[1100px] h-[350px] sm:h-[550px] 2xl:h-[750px] bg-purple-600/20 blur-[120px] sm:blur-[170px] 2xl:blur-[220px] rounded-full pointer-events-none" />

        {/* Heading */}
        <div className={`z-10 text-center max-w-5xl 2xl:max-w-7xl mx-auto flex flex-col items-center shrink-0 mb-12 sm:mb-16 2xl:mb-24 ${cinzel.className}`}>
          <p
            ref={subtitleRef}
            className="text-[10px] sm:text-xs 2xl:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-purple-300/60 mb-2 font-semibold"
          >
            Support & Queries
          </p>
          <h2
            ref={titleRef}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-wider uppercase bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-lg"
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div ref={faqListRef} className="flex flex-col gap-3 sm:gap-4 2xl:gap-6">
          {faqData.map((faq, index) => {
            const isOpen = openId === faq.id;
            const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

            return (
              <div
                key={faq.id}
                className={`group rounded-xl sm:rounded-2xl 2xl:rounded-3xl border transition-all duration-500 overflow-hidden backdrop-blur-xl ${
                  isOpen
                    ? "bg-gradient-to-b from-[#120a1f] to-[#0c0615] border-purple-500/50 shadow-[0_10px_30px_rgba(147,51,234,0.15)]"
                    : "bg-[#0a0612]/70 border-white/10 hover:border-purple-500/30 hover:bg-[#0f081a]"
                }`}
              >
                {/* Question Trigger */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left px-4 sm:px-8 2xl:px-10 py-5 sm:py-6 2xl:py-8 flex items-center justify-between gap-3 sm:gap-6 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3 sm:gap-6">
                    <span className={`text-base sm:text-xl 2xl:text-2xl font-bold tracking-widest ${isOpen ? "text-purple-400" : "text-white/30"} ${cinzel.className}`}>
                      {formattedIndex}
                    </span>
                    <span className="font-semibold text-sm sm:text-lg 2xl:text-xl text-white/90 tracking-wide group-hover:text-purple-200 transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  {/* Chevron Icon */}
                  <div
                    className={`shrink-0 w-7 h-7 sm:w-9 sm:h-9 2xl:w-11 2xl:h-11 rounded-full flex items-center justify-center border transition-transform duration-500 ${
                      isOpen
                        ? "bg-purple-600 border-purple-400 text-white rotate-180 shadow-lg shadow-purple-600/40"
                        : "bg-white/5 border-white/10 text-purple-300 group-hover:border-purple-500/40"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-6 2xl:h-6" />
                  </div>
                </button>

                {/* Answer Box */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-6 sm:pb-8 2xl:pb-10 px-4 sm:px-8 2xl:px-10 pl-10 sm:pl-20 2xl:pl-24"
                      : "grid-rows-[0fr] opacity-0 pb-0 px-4 sm:px-8 2xl:px-10 pl-10 sm:pl-20 2xl:pl-24"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-300 text-xs sm:text-base 2xl:text-lg leading-relaxed font-light border-t border-purple-900/30 pt-3 sm:pt-4 2xl:pt-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Help Banner */}
        <div
          ref={bannerRef}
          className="mt-12 sm:mt-16 2xl:mt-24 p-6 sm:p-8 2xl:p-12 rounded-2xl 2xl:rounded-3xl bg-gradient-to-r from-purple-950/20 via-[#120a1f] to-purple-950/20 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div>
            <h4 className={`text-base sm:text-lg 2xl:text-2xl font-bold text-white mb-1 ${cinzel.className}`}>Still have questions?</h4>
            <p className="text-gray-400 text-xs sm:text-sm 2xl:text-base">Can't find the answer you're looking for? Feel free to reach out to our team.</p>
          </div>
          <a
            href="#contact"
            className="px-5 sm:px-6 2xl:px-8 py-2.5 sm:py-3 2xl:py-4 rounded-full text-[10px] sm:text-xs 2xl:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:scale-105 transition-transform shadow-lg shadow-purple-600/30 shrink-0"
          >
            Get in Touch
          </a>
        </div>

      </div>
    </section>
  );
}