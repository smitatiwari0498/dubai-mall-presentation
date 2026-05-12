import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const statsData = [
  { number: 80, suffix: "M+", label: "ANNUAL VISITORS" },
  { number: 1200, suffix: "+", label: "RETAIL STORES" },
  { number: 200, suffix: "+", label: "RESTAURANTS" },
  { number: 13, suffix: "M sqft", label: "TOTAL AREA" },
];

const featureCards = [
  {
    icon: "🏛️",
    title: "Iconic Architecture",
  },
  {
    icon: "🐠",
    title: "World-Class Aquarium",
  },
  {
    icon: "🏙️",
    title: "Burj Khalifa Views",
  },
];

const luxuryBrands = [
  "BURBERRY",
  "FENDI",
  "CARTIER",
  "CHANEL",
  "LOUIS VUITTON",
  "GUCCI",
  "DIOR",
  "HERMÈS",
  "PRADA",
  "VERSACE",
];

const StatsSlide = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Counter Animation
      gsap.utils.toArray(".count-number").forEach((counter) => {
        const targetValue = Number(
          counter.getAttribute("data-value")
        );

        gsap.fromTo(
          counter,
          {
            innerText: 0,
          },
          {
            innerText: targetValue,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },

            onUpdate() {
              counter.innerText = Math.floor(
                this.targets()[0].innerText
              ).toLocaleString();
            },
          }
        );
      });

      // Content Animation
      gsap.from(".content-fade", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
      });

      // Stats Card Animation
      gsap.fromTo(
        ".stat-box",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.4,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black text-white overflow-x-hidden"
    >
      {/* MAIN CONTENT */}
      <div className="max-w-325 mx-auto mt-10 px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-10">
          {/* HEADING */}
          <div className="space-y-5 content-fade">
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-[#c9a84c]" />

              <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]">
                The World's Largest Mall
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-serif leading-tight">
              Beyond Shopping,
              <br />

              <span className="italic text-[#c9a84c] font-light">
                A Universe Unto Itself
              </span>
            </h2>

            <p className="text-sm leading-7 text-white/60 max-w-xl">
              With over 13 million square feet, Dubai Mall is more
              than a shopping destination — it is a world where
              luxury, culture, entertainment and architecture
              converge in spectacular fashion.
            </p>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
            {statsData.map((item, index) => (
              <div
                key={index}
                className="stat-box bg-white/3 border border-white/10 backdrop-blur-sm px-4 py-5 rounded-sm flex flex-col items-center justify-center text-center hover:border-[#c9a84c]/40 transition-all duration-500"
              >
                <h3 className="flex items-end gap-1 text-[#c9a84c] font-serif leading-none">
                  <span
                    className="count-number text-2xl lg:text-3xl"
                    data-value={item.number}
                  >
                    0
                  </span>

                  <span className="text-[11px] opacity-70 mb-0.5">
                    {item.suffix}
                  </span>
                </h3>

                <p className="mt-2 text-[8px] tracking-[0.25em] uppercase text-white/40 leading-relaxed">
                  {item.label}
                </p>
                
              </div>
            ))}
          </div>

          {/* FEATURES */}
          <div className="content-fade flex items-center justify-between gap-4 border-t border-[#c9a84c]/60 pt-5 max-w-4xl">
            {featureCards.map((card, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <span className="text-sm">
                  {card.icon}
                </span>

                <h4 className="text-[8px] lg:text-[9px] tracking-[0.2em] uppercase text-white/70 whitespace-nowrap">
                  {card.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative">
          {/* MAIN IMAGE */}
          <div className="relative w-[85%] ml-auto aspect-4/3 overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600"
              alt="Dubai Skyline"
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-4 left-4 text-[8px] tracking-[0.3em] uppercase text-white">
              Downtown Dubai, UAE
            </div>
          </div>

          {/* SMALL FLOATING IMAGE */}
          <div className="absolute -bottom-10 right-0 w-[38%] aspect-square border-4 border-black overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200"
              alt="Luxury Resort"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="h-16 border-t border-b  border-[#c9a84c]/40 flex items-center overflow-hidden">
        <div className="animate-marquee flex items-center gap-20 whitespace-nowrap px-10">
          {[...luxuryBrands, ...luxuryBrands].map(
            (brand, index) => (
              <span
                key={index}
                className="text-[11px] tracking-[0.5em] text-white/40 hover:text-[#c9a84c] transition-colors duration-300"
              >
                {brand}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default StatsSlide;