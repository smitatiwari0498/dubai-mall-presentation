import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Data Arrays
const statsData = [
  { number: 80, suffix: "M+", label: "ANNUAL VISITORS" },
  { number: 1200, suffix: "+", label: "RETAIL STORES" },
  { number: 200, suffix: "+", label: "RESTAURANTS" },
  { number: 13, suffix: "M sqft", label: "TOTAL AREA" },
];

const featureCards = [
  { icon: "🏛️", title: "Architecture" }, // Shortened for mobile
  { icon: "🐠", title: "Aquarium" },
  { icon: "🏙️", title: "Burj Views" },
];

const luxuryBrands = [
  "BURBERRY", "FENDI", "CARTIER", "CHANEL", "LOUIS VUITTON", 
  "GUCCI", "DIOR", "HERMÈS", "PRADA", "VERSACE",
];

const StatsSlide = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".count-number").forEach((counter) => {
        const targetValue = Number(counter.getAttribute("data-value"));
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            onUpdate() {
              counter.innerText = Math.floor(this.targets()[0].innerText).toLocaleString();
            },
          }
        );
      });

      gsap.from(".content-fade", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
      });

      gsap.from(".stat-box", {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-center py-20 lg:py-0 overflow-hidden"
    >
      <style>
        {`
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-custom {
            display: flex;
            animation: marquee-scroll 40s linear infinite;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <div className="space-y-6 md:space-y-10 w-full">
          <div className="space-y-4 content-fade">
            <div className="flex items-center gap-3">
              <div className="w-6 md:w-8 h-px bg-[#c9a84c]" />
              <span className="text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-[#c9a84c]">
                The World's Largest Mall
              </span>
            </div>
            
            
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif leading-tight">
              Beyond Shopping, &nbsp;
              <span className="italic text-[#c9a84c] font-light">
                A Universe Unto Itself
              </span>
            </h2>
            
            <p className="text-[10px] md:text-sm leading-relaxed text-white/60 max-w-xl">
              With over 13 million square feet, Dubai Mall is a world where
              luxury, culture, and architecture converge.
            </p>
          </div>

          {/* STATS GRID -*/}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 w-full">
            {statsData.map((item, index) => (
              <div
                key={index}
                className="stat-box bg-white/5 border border-white/10 p-4 md:p-5 rounded-sm text-center"
              >
                <h3 className="flex items-end justify-center gap-0.5 text-[#c9a84c] font-serif">
                  <span className="count-number text-xl md:text-3xl" data-value={item.number}>
                    0
                  </span>
                  <span className="text-[10px] opacity-70 mb-1">{item.suffix}</span>
                </h3>
                <p className="mt-1 md:mt-2 text-[7px] md:text-[8px] tracking-widest uppercase text-white/40">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* FEATURES - Wrap properly on mobile */}
          <div className="content-fade flex flex-wrap gap-4 md:gap-6 border-t border-white/10 pt-6">
            {featureCards.map((card, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-sm md:text-lg">{card.icon}</span>
                <h4 className="text-[8px] md:text-[9px] tracking-widest uppercase text-white/70">
                  {card.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative hidden lg:block">
          <div className="relative w-[85%] ml-auto aspect-4/3 overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600"
              className="w-full h-full object-cover grayscale-20"
              alt="Dubai"
            />
          </div>
          <div className="absolute -bottom-10 left-10 w-[40%] aspect-square border-[6px] border-[#050505] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200"
              className="w-full h-full object-cover"
              alt="Luxury"
            />
          </div>
        </div>
      </div>

      {/* MARQUEE FOOTER */}
      <div className="absolute bottom-0 w-full h-10 md:h-14 border-t border-white/5 flex items-center overflow-hidden bg-black">
        <div className="animate-marquee-custom whitespace-nowrap">
          {[...luxuryBrands, ...luxuryBrands, ...luxuryBrands].map((brand, i) => (
            <span
              key={i}
              className="mx-4 md:mx-8 text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-white/20 uppercase"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSlide;