'use client';

import React from "react";
import { Check } from "lucide-react";

interface PricingPlan {
  id: string;
  badge: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "short-form",
    badge: "CLASSIC",
    title: "Short-Form Videos",
    price: "$50",
    description: "Video editing for short form videos up to 120 seconds runtime.",
    features: [
      "24/7 customer support",
      "Free unlimited revisions",
      "4K Quality",
      "1 day turn around time",
    ],
    isPopular: false,
  },
  {
    id: "dedicated-editors",
    badge: "BUSINESS",
    title: "Dedicated Editors",
    price: "$1200",
    description: "Personalized video editor with 40 hr/week dedication to your projects.",
    features: [
      "Videos Tracking Sheet",
      "Urgent Requests",
      "4K Quality",
      "Personal Content Manager",
    ],
    isPopular: true, // Middle highlighted plan
  },
  {
    id: "long-form",
    badge: "CLASSIC",
    title: "Long-Form Videos",
    price: "$150",
    description: "Video editing for long form videos up to 60 minutes runtime.",
    features: [
      "24/7 Support",
      "Horizontal size",
      "4K Quality",
      "1 day turn around",
    ],
    isPopular: false,
  },
];

export default function PricingSection() {
  return (
    <section className="relative w-full py-24 bg-[#08050c] text-white overflow-hidden border-t border-purple-900/20 font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-purple-400 mb-3 block">
            PRICING PLANS
          </span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
            Choose Your Package
          </h2>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between p-8 sm:p-9 transition-all duration-300 ${
                plan.isPopular
                  ? "bg-[#11091c] border-2 border-purple-500 shadow-[0_0_35px_rgba(168,85,247,0.25)] z-20 scale-102"
                  : "bg-[#0d0716] border border-white/10 hover:border-purple-500/40 hover:bg-[#10081a]"
              }`}
              style={{
                // Custom Top-Left Curved Corner (Folder Tab Effect)
                borderTopLeftRadius: "2.5rem",
                borderTopRightRadius: "1.25rem",
                borderBottomLeftRadius: "1.75rem",
                borderBottomRightRadius: "1.75rem",
              }}
            >
              {/* Badge (Top-Right) */}
              <div className="absolute top-6 right-8">
                <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                  {plan.badge}
                </span>
              </div>

              {/* Header Info */}
              <div className="mb-8 mt-2">
                <h3 className="text-xl sm:text-2xl font-black text-purple-200 mb-3 tracking-wide">
                  {plan.title}
                </h3>
                
                {/* Price */}
                <div className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
                  {plan.price}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal min-h-[40px]">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className="flex-1 mb-10">
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-gray-300 font-medium">
                      {/* Check Icon with Circle Background */}
                      <div className="w-5 h-5 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-purple-300 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-auto">
                {/* Button 1: Customize */}
                <button className="w-full py-3.5 px-6 rounded-full bg-white text-purple-950 hover:bg-gray-100 font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md">
                  Customize Your Package
                </button>

                {/* Button 2: Subscribe */}
                <button
                  className={`w-full py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                    plan.isPopular
                      ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                      : "bg-white text-purple-950 hover:bg-gray-100 shadow-md"
                  }`}
                >
                  Subscribe
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}