import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import FullScreenServices from "@/components/Services";
import VideoTestimonials from "@/components/Reviews";
import FAQSection from "@/components/Faq";
import PricingSection from "@/components/Pricing";
import BookingSection from "@/components/Booking";
import OurWorkSection from "@/components/OurWork";

export default function Home() {

  return (
    <div>
      <HeroSection />
      <FullScreenServices />
      <OurWorkSection />
      <VideoTestimonials />
      <FAQSection />
      <PricingSection />
      <BookingSection />
    </div>
  );
}