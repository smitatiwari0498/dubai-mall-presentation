import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { assets } from "../../assets/assets";
import DetailModal from "../DetailModal";

const eventList = [
  {
    date: "15 JUNE 2026",
    title: "Dubai Summer Surprises",
    cat: "Summer Festival",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80",
    desc: "A season of incredible deals, entertainment and joy for the whole family.",
    longDesc: "Dubai Summer Surprises (DSS) Dubai Mall ka sabse bada extravaganza hai."
  },
  {
    date: "8 JULY 2026",
    title: "Luxury Fashion Night",
    cat: "Haute Couture",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80",
    desc: "An exclusive evening celebrating the world's most prestigious fashion houses.",
    longDesc: "Fashion Avenue mein hone wali ye ek elite night hai."
  },
  {
    date: "22 AUGUST 2026",
    title: "Aquarium Night Dive",
    cat: "Elite Adventure",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80", 
    desc: "Experience night diving with the sharks in the main aquarium tank.",
    longDesc: "Suraj dhalne ke baad, Dubai Aquarium ek alag hi duniya ban jata hai."
  },
  {
    date: "5 SEPTEMBER 2026",
    title: "Global Food Festival",
    cat: "Gourmet Experience",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80",
    desc: "200 restaurants unite in a spectacular celebration of world cuisines.",
    longDesc: "Duniya bhar ke pakwan ab ek hi chhat ke niche."
  },
];

const EventsSlide = () => {
  const sectionRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetails = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  useGSAP(() => {
    gsap.from(".event-content-left", { x: -40, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(".event-detail-item", { x: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", delay: 0.3 });
    gsap.from(".timeline-line", { scaleY: 0, transformOrigin: "top", duration: 1.5, ease: "power4.inOut", delay: 0.5 });
  }, { scope: sectionRef });

 return (
    <section 
      ref={sectionRef} 
      className="w-full min-h-screen bg-[#050505] text-white px-5 md:px-12 lg:px-24 flex flex-col justify-start lg:justify-center pt-24 pb-10 lg:py-0 overflow-x-hidden"
    >

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16 items-start lg:items-center mt-10 lg:mt-20">
        
        {/* LEFT SIDE - Header Content */}
        <div className="lg:col-span-5 event-content-left space-y-3 md:space-y-8">
          <div className="space-y-2 md:space-y-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-5 md:w-8 h-px bg-[#c9a84c]" />
              <span className="text-[7px] md:text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase font-bold">Upcoming Events</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-tight">
              Moments That <br />
              <span className="italic text-[#c9a84c] font-light">Define the Season</span>
            </h2>
            
            <p className="text-white/40 text-[10px] md:text-[13px] max-w-70 md:max-w-sm leading-relaxed">
              Dubai Mall transforms every occasion into an unforgettable experience.
            </p>
          </div>

          <div className="relative w-full aspect-video overflow-hidden rounded-sm border border-white/5 group shadow-2xl cursor-pointer hidden sm:block">
            <video autoPlay muted loop playsInline
             preload="none" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105">
              <source src={assets.EventShow} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* RIGHT SIDE  */}

        <div className="lg:col-span-7 relative pl-6 md:pl-12 mt-0 lg:mt-0">
          <div className="timeline-line absolute left-0 top-0 w-px h-full bg-[#c9a84c]/20">
            <div className="w-full h-1/2 bg-linear-to-b from-[#c9a84c] to-transparent" />
          </div>

          
          <div className="space-y-2 md:space-y-8 mt-6 lg:mt-0">
            {eventList.map((event, index) => (
              <div key={index} onClick={() => openDetails(event)} className="event-detail-item relative group cursor-pointer">
                <div className="absolute -left-6.75 md:-left-13 top-1.5 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-[#c9a84c] bg-black group-hover:bg-[#c9a84c] transition-colors duration-300 z-10" />
                
                <div className="space-y-1 py-2">
                  <span className="text-[7px] md:text-[9px] tracking-widest text-[#c9a84c] font-bold uppercase opacity-80">{event.date}</span>
                  <h3 className="text-[15px] md:text-xl font-serif group-hover:text-[#c9a84c]">
                    {event.title}
                  </h3>
                  <p className="text-white/30 text-[9px] md:text-[12px] max-w-xs md:max-w-md leading-tight">
                    {event.desc}
                  </p>
                </div>
                <div className="w-full h-px bg-white/5 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 lg:mt-12 py-4 border-t border-white/5 flex flex-row justify-between items-center opacity-50">
        <span className="text-[6px] md:text-[8px] tracking-[0.2em] md:tracking-[0.5em] uppercase font-light">Emaar — 2026</span>
        <button className="group flex items-center gap-1.5 text-[#c9a84c] text-[7px] md:text-[8px] tracking-widest uppercase font-bold">
          <span>Explore All</span>
        </button>
      </div>

      <DetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedItem} />
    </section>
  );
};

export default EventsSlide;
