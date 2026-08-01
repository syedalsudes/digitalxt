// data/servicesData.ts

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface Review {
  name: string;
  role: string;
  comment: string;
  avatar: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  videoUrl?: string;
  thumbnail: string;
}

export interface ServiceDetail {
  title: string;
  tagline: string;
  heroDescription: string;
  portfolio: PortfolioItem[];
  pricing: PricingPlan[];
  reviews: Review[];
}

export const servicesData: Record<string, ServiceDetail> = {
  "saas-videos": {
    title: "SaaS Launch Videos",
    tagline: "High-converting motion graphics & UI animations",
    heroDescription: "Transform your complex SaaS platform into sleek, visual narratives that double your landing page conversion rate.",
    portfolio: [
      { id: 1, title: "Fintech Dashboard Walkthrough", thumbnail: "/portfolio/saas-1.jpg" },
      { id: 2, title: "AI Tool Explainer", thumbnail: "/portfolio/saas-2.jpg" },
    ],
    pricing: [
      { name: "Starter", price: "$999", features: ["30s Explainer Video", "2D UI Animations", "Voiceover & SFX"] },
      { name: "Pro Launch", price: "$2,499", features: ["60s Product Launch", "3D Motion Design", "Custom Sound Design", "Unlimited Revisions"], popular: true },
    ],
    reviews: [
      { name: "Alex R.", role: "Founder @ CloudScale", comment: "The video literally doubled our launch conversions!", avatar: "/avatars/alex.jpg" },
    ]
  },
  "short-form": {
    title: "Short Form Videos",
    tagline: "Viral TikTok, Reels & Shorts Editing",
    heroDescription: "Hook-first high-retention video editing designed specifically for Instagram Reels, TikTok, and YouTube Shorts.",
    portfolio: [
      { id: 1, title: "Podcast Clips Pack", thumbnail: "/portfolio/short-1.jpg" },
      { id: 2, title: "Viral Fitness Reel", thumbnail: "/portfolio/short-2.jpg" },
    ],
    pricing: [
      { name: "Batch 10 Clips", price: "$499", features: ["10 Edited Shorts", "Dynamic Subtitles", "Sound Effects & B-Roll"] },
      { name: "Monthly Scale", price: "$1,299", features: ["30 Edited Shorts", "Content Strategy", "Fast 24-48h Delivery"], popular: true },
    ],
    reviews: [
      { name: "Sarah K.", role: "Content Creator", comment: "My engagement skyrocketed within 2 weeks of using their edits.", avatar: "/avatars/sarah.jpg" },
    ]
  },
  "real-estate": {
    title: "Real Estate Media",
    tagline: "Cinematic Property Showcases",
    heroDescription: "Luxury real estate walkthroughs, drone color grading, and architectural speed ramps that sell listings faster.",
    portfolio: [
      { id: 1, title: "Modern Luxury Villa Tour", thumbnail: "/portfolio/re-1.jpg" },
      { id: 2, title: "Penthouse Commercial Reel", thumbnail: "/portfolio/re-2.jpg" },
    ],
    pricing: [
      { name: "Essential Listing", price: "$750", features: ["60s Highlight Reel", "Basic Drone Color Grading", "Licensed Music"] },
      { name: "Luxury Estate", price: "$1,800", features: ["Cinematic 4K Walkthrough", "Advanced Color Grading", "Agent Intro Shots", "Social Media Cutdowns"], popular: true },
    ],
    reviews: [
      { name: "Michael B.", role: "Real Estate Agent", comment: "The quality is unmatched. Sold the luxury penthouse in 5 days!", avatar: "/avatars/michael.jpg" },
    ]
  }
};