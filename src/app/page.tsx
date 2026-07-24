import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import FullScreenServices from "@/components/Services";
import VideoTestimonials from "@/components/Reviews";
import FAQSection from "@/components/Faq";
import PricingSection from "@/components/Pricing";
import BookingSection from "@/components/Booking";

export default function Home() {

  return (
    <div>
      <HeroSection />
      <FullScreenServices />
      <VideoTestimonials />
      <FAQSection />
      <PricingSection />
      <BookingSection />
    </div>
  );
}