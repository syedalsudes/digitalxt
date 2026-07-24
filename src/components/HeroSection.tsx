import Image from "next/image";

export default function Home() {
  // Video Editing Agency Ke Liye Words:
  const topText = "WE EDIT";
  const bottomText = "VISION";

  return (
    <main className="relative w-full h-screen overflow-hidden flex items-center justify-start px-6 md:px-16">
      {/* Background Image */}
      <Image
        src="/hero.png"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content / Text Layer (Screen width ka ~60% area & Left Aligned) */}
      <div className="relative z-10 w-full md:w-[60%] text-left">
        <div className="flex flex-col items-start">
          
          {/* Top 2 Words */}
          <span className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-none tracking-wider drop-shadow-lg">
            {topText}
          </span>

          {/* Sinking Shadow Text Container (Bottom 1 Word) */}
          <div className="relative w-full flex justify-start">
            
            {/* 1. Main Visible White Text */}
            <span className="relative z-10 text-white text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black uppercase leading-none tracking-tight">
              {bottomText}
            </span>

            {/* 2. Half-Hidden / Sinking Shadow Text Effect */}
            <span
              className="absolute left-0 -bottom-[4px] md:-bottom-[8px] text-white/50 text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black uppercase leading-none tracking-tight scale-y-125 blur-[1px] pointer-events-none select-none"
              style={{
                clipPath: "polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)",
              }}
            >
              {bottomText}
            </span>

          </div>
        </div>
      </div>
    </main>
  );
}