import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const statsData = [
  {
    number: 80,
    suffix: "M+",
    label: "ANNUAL VISITORS",
  },
  {
    number: 1200,
    suffix: "+",
    label: "RETAIL STORES",
  },
  {
    number: 200,
    suffix: "+",
    label: "RESTAURANTS",
  },
  {
    number: 13,
    suffix: "M sqft",
    label: "TOTAL AREA",
  },
];

const featureCards = [
  {
    icon: "🏛️",
    title: "Iconic Architecture",
    description:
      "Inspired by the wind towers of traditional Arabic design, crafted by DP Architects",
  },
  {
    icon: "🐠",
    title: "World-Class Aquarium",
    description:
      "Home to 33,000+ aquatic animals in the world's largest suspended aquarium tank",
  },
  {
    icon: "🏙️",
    title: "Burj Khalifa Views",
    description:
      "Direct access to Burj Khalifa plaza and Dubai Fountain — the city's most iconic sights",
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
      gsap.from(".stat-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });

      gsap.utils.toArray(".count-number").forEach((counter) => {
        const target = Number(counter.getAttribute("data-value"));

        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power1.out",
            snap: { innerText: 1 },
            onUpdate: function () {
              counter.innerText = Math.floor(
                this.targets()[0].innerText
              ).toLocaleString();
            },
          }
        );
      });

      gsap.to(".parallax-image-main", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-section",
          start: "top bottom",
          scrub: true,
        },
      });

      gsap.to(".parallax-image-small", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-section",
          start: "top bottom",
          scrub: true,
        },
      });

      gsap.from(".feature-card", {
        x: -40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".feature-card",
          start: "top 85%",
        },
      });

      gsap.to(".brand-track", {
        xPercent: -50,
        duration: 22,
        repeat: -1,
        ease: "linear",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full h-screen bg-black text-white overflow-hidden flex flex-col justify-between"
    >
      {/* TOP STATS */}
      <div className="pt-[50px] px-6">
        <div className="max-w-[1100px] mx-auto h-[11vh] border border-[#2a2110]">
          <div className="grid grid-cols-2 md:grid-cols-4 h-full">
            {statsData.map((item, index) => (
              <div
                key={index}
                className="stat-item border-r border-[#2a2110] last:border-r-0 flex flex-col items-center justify-center"
              >
                <h2 className="text-[#c9a84c] text-[clamp(1.8rem,3vw,3rem)] font-serif leading-none flex items-end gap-1">
                  <span
                    className="count-number"
                    data-value={item.number}
                  >
                    0
                  </span>

                  <span className="text-[0.7em]">
                    {item.suffix}
                  </span>
                </h2>

                <p className="mt-2 text-[9px] tracking-[0.28em] text-white/40 text-center">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="parallax-section flex-1 flex items-center">
        <div className="max-w-[1170px] mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-[#c9a84c]" />

              <span className="mt-5 text-[8px] tracking-[0.35em] text-[#c9a84c]">
                THE WORLD'S LARGEST MALL
              </span>
            </div>

            <h2 className="font-serif leading-[1] text-[clamp(2rem,4vw,3.5rem)]">
              Beyond Shopping,
              <br />

              <span className="italic text-[#c9a84c]">
                A Universe Unto Itself
              </span>
            </h2>

            <p className="mt-4 max-w-md text-white/60 text-[14px] leading-relaxed">
              With over 13 million square feet, Dubai Mall is more than a
              shopping destination — it is a world where luxury, culture,
              entertainment and architecture converge in spectacular fashion.
            </p>

            {/* FEATURES */}
            <div className="mt-6 space-y-3">
              {featureCards.map((card, index) => (
                <div
                  key={index}
                  className="feature-card bg-[#0d0d0d] border border-white/5 p-3 flex gap-3 hover:border-[#c9a84c]/30 transition-all duration-500"
                >
                  <div className="text-lg">
                    {card.icon}
                  </div>

                  <div>
                    <h4 className="font-semibold text-[12px]">
                      {card.title}
                    </h4>

                    <p className="mt-1 text-[9px] text-white/45 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative h-[340px]">
            <div className="parallax-image-main absolute top-0 right-0 w-[83%] h-[300px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop"
                alt="Dubai Skyline"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-4 left-4 text-[8px] tracking-[0.25em] uppercase text-white/60">
                Downtown Dubai, UAE
              </div>
            </div>

            <div className="parallax-image-small absolute -bottom-10 -right-10 w-[200px] h-[180px] overflow-hidden border-4 border-black shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop"
                alt="Burj Khalifa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BRANDS */}
      <div className="h-[7vh] border-t  border-[#2a2110] flex items-center overflow-hidden">
        <div className="brand-track flex items-center gap-14 whitespace-nowrap w-max">
          {[...luxuryBrands, ...luxuryBrands].map((brand, index) => (
            <span
              key={index}
              className="text-[1rem] md:text-[1rem] font-serif tracking-[0.18em] text-white/10"
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