import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "../../assets/assets"; // Ensure assets has a valid video/image

gsap.registerPlugin(ScrollTrigger);

const eventList = [
  {
    date: "15 JUNE 2025",
    title: "Dubai Summer Surprises",
    desc: "A season of incredible deals, entertainment and joy for the whole family.",
  },
  {
    date: "8 JULY 2025",
    title: "Luxury Fashion Night",
    desc: "An exclusive evening celebrating the world's most prestigious fashion houses.",
  },
  {
    date: "22 AUGUST 2025",
    title: "Aquarium Night Dive",
    desc: "Experience night diving with the sharks in the main aquarium tank.",
  },
  {
    date: "5 SEPTEMBER 2025",
    title: "Global Food Festival",
    desc: "200 restaurants unite in a spectacular celebration of world cuisines.",
  },
];

const EventsSlide = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Reveal left content
    gsap.from(".event-header", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    // Right Side items reveal
    gsap.from(".event-detail-item", {
      x: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".event-detail-item",
        start: "top 85%",
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full min-h-screen bg-[#0a0a0a] text-white px-8 lg:px-24 py-16 flex flex-col justify-center overflow-hidden">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT SIDE - Content + Media Block */}
        <div className="lg:col-span-5 event-header space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4 mt-8">
              <div className="w-8 h-[1px] bg-[#c9a84c]" />
              <span className="text-[9px] tracking-[0.4em] text-[#c9a84c] uppercase font-bold">
                Upcoming Events
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-4">
              Moments That <br />
              <span className="italic text-[#c9a84c]">Define the Season</span>
            </h2>
            <p className="text-gray-500 text-xs max-w-xs leading-relaxed">
              Dubai Mall transforms every occasion into an unforgettable experience with exclusive showcases and celebrations.
            </p>
          </div>

          {/* NEW VIDEO/IMAGE SPACE - Left bottom empty space fill karne ke liye */}
          <div className="relative w-full h-[286px] overflow-hidden rounded-sm border border-white/10 group">
            <video 
              autoPlay muted loop playsInline 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
            >
              <source src={assets.EventShow} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-[8px] tracking-[0.3em] text-[#c9a84c] uppercase font-bold">Experience Excellence</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Timeline List */}
        <div className="lg:col-span-7 relative pl-10 pt-2">
          
          {/* Vertical Timeline Line - Fixed Solid Color */}
          <div className="absolute left-0 top-0 w-[1px] h-full bg-[#c9a84c]/30">
            <div className="w-full h-full bg-[#c9a84c] opacity-100" /> 
          </div>

          <div className="space-y-10">
            {eventList.map((event, index) => (
              <div key={index} className="event-detail-item relative group pb-2">
                
                {/* Timeline Dot */}
                <div className="absolute -left-[45px] top-1.5 w-2 h-2 rounded-full border border-[#c9a84c] bg-[#c9a84c] shadow-[0_0_10px_rgba(201,168,76,0.5)] z-10" />
                
                <div className="space-y-1">
                  <span className="text-[9px] tracking-widest text-[#c9a84c] font-bold uppercase">
                    {event.date}
                  </span>
                  <h3 className="text-xl font-serif group-hover:text-[#c9a84c] transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-gray-500 text-[13px] max-w-lg leading-relaxed">
                    {event.desc}
                  </p>
                </div>
                
                {/* Horizontal separator */}
                <div className="w-full h-[1px] bg-white/5 mt-6" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPACT FOOTER */}
      <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
        <span className="text-[10px] tracking-[0.5em] uppercase text-white/30 font-serif">Dubai Mall — Events 2026</span>
        <button className="text-[#c9a84c] text-[9px] tracking-widest uppercase font-bold border-b border-[#c9a84c]/0 hover:border-[#c9a84c] transition-all">
          Explore All Events
        </button>
      </div>
    </section>
  );
};

export default EventsSlide;