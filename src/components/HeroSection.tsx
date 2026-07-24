import { Cinzel } from "next/font/google";

// Cinzel font optimization
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden flex items-center justify-start px-6 md:px-16">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Main Content */}
      <div className={`relative z-20 text-white text-left ${cinzel.className}`}>
        <div className="flex flex-col items-start leading-none uppercase font-bold tracking-tight">
          
          {/* Top Line: Every Frame */}
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-xl mb-2">
            Every Frame
          </span>

          {/* Bottom Line: Tells A Story (Sinking & Fading Shadow Effect) */}
          <span 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl text-white/90 drop-shadow-2xl"
            style={{
              // Gradient Masking jo text ko niche se dhere-dhere gayab/fade karti hai
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)",
            }}
          >
            Tells A Story
          </span>

        </div>
      </div>
    </main>
  );
}