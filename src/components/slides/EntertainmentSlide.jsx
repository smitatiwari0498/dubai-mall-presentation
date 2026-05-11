import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "../../assets/assets";

gsap.registerPlugin(ScrollTrigger);

const entertainmentCards = [
  { cat: "Adventure", title: "Dubai Ice Rink", video: assets.iceRink },
  { cat: "Cinema", title: "Reel Cinemas", video: assets.ReelCinemas },
  { cat: "Virtual Reality", title: "Play DXB", video: assets.playDxb },
  { cat: "Observation", title: "Sky Views", video: assets.Sky },
];

const EntertainmentSlide = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".ent-card", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    gsap.utils.toArray(".parallax-video").forEach((video) => {
      gsap.fromTo(video, { scale: 1.2 }, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: video,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-[#0a0a0a] text-white py-12 px-6 lg:px-12">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 mt-5">
            <div className="w-6 h-[1px] bg-[#c9a84c]" />
            <span className="text-[9px] tracking-[0.3em] text-[#c9a84c] uppercase font-bold">
              Endless Wonders
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif">
            Epic Entertainment, <span className="italic text-[#c9a84c]">Limitless Thrills</span>
          </h2>
        </div>
        <button className="border border-white/20 px-6 py-2 text-[9px] tracking-widest uppercase hover:bg-[#c9a84c] hover:text-black transition-all duration-500 shrink-0">
          View All
        </button>
      </div>

      {/* COMPACT GRID SYSTEM */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* BIG FEATURED CARD (01) */}
        <div className="ent-card lg:col-span-1 lg:row-span-2 relative overflow-hidden group border border-white/5 h-[350px] lg:h-auto">
          {/* Number Label */}
          <div className="absolute top-6 right-6 z-20 text-white/50 font-serif text-5xl group-hover:text-[#c9a84c] transition-colors duration-500">
            01
          </div>
          
          <video autoPlay muted loop playsInline className="parallax-video w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700">
            <source src={assets.Aquarium} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-6 flex flex-col justify-end">
            <p className="text-[#c9a84c] text-[9px] font-bold tracking-widest uppercase">Marine Life</p>
            <h3 className="text-2xl font-serif mt-1">Dubai Aquarium</h3>
          </div>
        </div>

        {/* SMALL MAPPED CARDS (02 to 05) */}
        {entertainmentCards.map((item, index) => (
          <div key={index} className="ent-card relative overflow-hidden group border border-white/5 h-[220px]">
            
            {/* Number Label - Index starts from 0, so 0 + 2 = 02 */}
            <div className="absolute top-5 right-5 z-20 text-white/30 font-serif text-5xl group-hover:text-[#c9a84c] transition-colors duration-500">
              0{index + 2}
            </div>

            <video autoPlay muted loop playsInline className="parallax-video w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700">
              <source src={item.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-5 flex flex-col justify-end">
              <p className="text-[#c9a84c] text-[10px] font-bold tracking-widest uppercase">{item.cat}</p>
              <h3 className="text-xl md:text-2xl font-serif mt-1">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EntertainmentSlide;