import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Professional SEO & Branding Metadata for Digitalix Studios
export const metadata: Metadata = {
  title: {
    default: "Digitalix Studios | Professional Video Editing Agency",
    template: "%s | Digitalix Studios",
  },
  description:
    "Digitalix Studios is a premier video editing agency specializing in high-converting short-form reels, cinematic edits, commercial video production, and YouTube content creation.",
  keywords: [
    "Digitalix Studios",
    "Video Editing Agency",
    "Professional Video Editor",
    "Short Form Video Editing",
    "Cinematic Video Editing",
    "YouTube Video Editor",
    "Reels and TikTok Editor",
  ],
  authors: [{ name: "Digitalix Studios" }],
  creator: "Digitalix Studios",

  // Favicon & Logo Integration
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  // Open Graph (For Facebook, LinkedIn, WhatsApp link previews)
  openGraph: {
    title: "Digitalix Studios | Professional Video Editing Agency",
    description:
      "Transforming raw footage into cinematic, high-converting video stories. Expert short-form and long-form video editing services.",
    url: "https://digitalixstudios.com", // Apni actual domain URL yahan likhein
    siteName: "Digitalix Studios",
    images: [
      {
        url: "/logo.png", // Social shares par dikhne wala logo ya thumbnail
        width: 1200,
        height: 630,
        alt: "Digitalix Studios Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Digitalix Studios | Professional Video Editing Agency",
    description:
      "Transforming raw footage into cinematic, high-converting video stories.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#08050c] text-white`}
      >
        <Loader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}