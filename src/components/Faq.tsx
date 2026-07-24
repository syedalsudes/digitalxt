'use client';

import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

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

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full py-24 bg-[#08050c] text-white overflow-hidden border-t border-purple-900/20 font-sans">
      
      {/* Background Stars / Ambient Purple Glow */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-purple-400/40 rounded-full blur-[1px] animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-fuchsia-400/30 rounded-full blur-[1px]" />
      <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-purple-600/10 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[450px] h-[450px] bg-fuchsia-600/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT SIDE: Styled exactly like the provided image */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full lg:sticky lg:top-28">
          <div>
            {/* Top Badge Container */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#120b1c] border border-white/10 text-xs tracking-widest uppercase text-purple-300 mb-8">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-purple-950/80 border border-purple-500/30">
                <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <span className="font-semibold tracking-[0.2em]">SUPPORT CENTER</span>
            </div>

            {/* Main Title - Image Typography Style */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white mb-6">
              Got questions? <br />
              <span className="text-gray-100 italic font-medium">We have answers.</span>
            </h2>

            {/* Paragraph Text */}
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10 max-w-md font-normal">
              Everything you need to know about our process, technology, and how we help your brand grow in the digital space.
            </p>
          </div>

          {/* Bottom Chat Card - Image Style */}
          <div className="p-5 rounded-2xl bg-[#0e0817] border border-white/10 max-w-xs hover:border-purple-500/30 transition-all duration-300">
            <p className="text-sm font-semibold text-white mb-1.5">Still confused?</p>
            <a
              href="#contact"
              className="inline-flex items-center text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors gap-1"
            >
              Chat with our team <span className="text-purple-400">+</span>
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: Accordion List matching the Dark Futuristic Theme */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#130b1e] border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.12)]"
                    : "bg-[#0c0714] border-white/10 hover:border-purple-500/30 hover:bg-[#10081a]"
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-base sm:text-lg text-white/90 tracking-wide pr-2">
                    {faq.question}
                  </span>
                  
                  {/* Plus / Minus Icon */}
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "bg-purple-600 border-purple-400 text-white rotate-180"
                        : "bg-purple-950/40 border-purple-500/20 text-purple-300"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Expanded Answer Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-6 px-6"
                      : "grid-rows-[0fr] opacity-0 pb-0 px-6"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed border-t border-purple-900/30 pt-4 font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}