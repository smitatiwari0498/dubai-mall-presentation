import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const retailCards = [
  {
    cat: "Jewellery",
    title: "Gold Souk",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80",
  },
  {
    cat: "Timepieces",
    title: "Watch Gallery",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80",
  },
  {
    cat: "Beauty",
    title: "Spa Quarter",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80",
  },
  {
    cat: "Fine Dining",
    title: "Gourmet District",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80",
  },
];

const RetailSlide = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".parallax-wrapper").forEach((section) => {
        const image = section.querySelector(".parallax-img");

        gsap.fromTo(
          image,
          {
            yPercent: -15,
            scale: 1.25,
          },
          {
            yPercent: 15,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      gsap.from(".retail-content", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".retail-card", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".retail-grid",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full h-screen bg-[#0a0a0a] text-white overflow-hidden"
    >
      <div className="h-full flex flex-col md:flex-row px-8 lg:px-12 pt-[70px] pb-8 gap-10">
        {/* LEFT CONTENT */}
        <div className="retail-content w-full md:w-[34%] flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a84c]" />

            <span className="text-[9px] tracking-[0.38em] text-[#c9a84c] uppercase">
              Luxury Retail
            </span>
          </div>

          <h2 className="text-[2.2rem] lg:text-[3.2rem] font-serif leading-[1.05] mb-6">
            The Finest Brands,
            <br />

            <span className="italic text-[#c9a84c]">
              All Under One Roof
            </span>
          </h2>

          <p className="text-white/50 text-[13px] max-w-sm mb-8 leading-relaxed">
            Experience the pinnacle of shopping with over 1,200 stores
            featuring the world's most prestigious fashion houses and
            lifestyle brands.
          </p>

          <div>
            <button className="border border-white/20 px-7 py-3 text-[9px] tracking-[0.3em] uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-500">
              View All Stores
            </button>
          </div>
        </div>

        {/* RIGHT GRID */}
        <div className="retail-grid w-full md:w-[66%] h-full">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
            {/* LARGE CARD */}
            <div className="retail-card md:row-span-2 relative overflow-hidden bg-[#111] group cursor-pointer">
              <div className="parallax-wrapper w-full h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
                  alt="Fashion"
                  className="parallax-img w-full h-[120%] object-cover opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                />
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-transparent">
                <p className="text-[8px] tracking-[0.2em] text-[#c9a84c] mb-1 uppercase font-semibold">
                  Fashion & Couture
                </p>

                <h3 className="text-lg font-serif">
                  Haute Couture District
                </h3>
              </div>
            </div>

            {/* SMALL CARDS */}
            {retailCards.map((item, index) => (
              <div
                key={index}
                className="retail-card relative overflow-hidden bg-[#111] group cursor-pointer"
              >
                <div className="parallax-wrapper w-full h-full overflow-hidden hover:border hoverborder-amber-700">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="parallax-img w-full h-[120%] object-cover opacity-40 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                  />
                </div>

                <div className="absolute inset-0 p-5 flex flex-col justify-end bg-gradient-to-t from-black/90 via-transparent">
                  <p className="text-[8px] tracking-[0.2em] text-[#c9a84c] mb-1 uppercase font-semibold">
                    {item.cat}
                  </p>

                  <h3 className="text-sm lg:text-base font-serif">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetailSlide;