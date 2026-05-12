import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { assets } from "../../assets/assets";
import DetailModal from "../DetailModal"; // Modal Import

const eventList = [
  {
    date: "15 JUNE 2026",
    title: "Dubai Summer Surprises",
    cat: "Summer Festival",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80",
    desc: "A season of incredible deals, entertainment and joy for the whole family.",
    longDesc: "Dubai Summer Surprises (DSS) Dubai Mall ka sabse bada shopping aur entertainment extravaganza hai. Isme aapko 90% tak ke exclusive discounts, live music concerts, aur bachon ke liye special interactive zones milte hain. Ye event pura 10-hafte chalta hai jahan har din naye surprises hote hain."
  },
  {
    date: "8 JULY 2026",
    title: "Luxury Fashion Night",
    cat: "Haute Couture",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80",
    desc: "An exclusive evening celebrating the world's most prestigious fashion houses.",
    longDesc: "Fashion Avenue mein hone wali ye ek elite night hai jahan Chanel, Dior, aur LV jaise flagship stores apne invite-only collections showcase karte hain. Yahan aapko red-carpet experience ke sath-sath private styling sessions aur fashion experts se milne ka mauka milta hai."
  },
  {
    date: "22 AUGUST 2026",
    title: "Aquarium Night Dive",
    cat: "Elite Adventure",
    // Agar video hai to video chalega, warna niche wali image modal me dikhegi
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80", 
    desc: "Experience night diving with the sharks in the main aquarium tank.",
    longDesc: "Suraj dhalne ke baad, Dubai Aquarium ek alag hi duniya ban jata hai. Is Night Dive session mein aap professional instructors ke sath tank ke andar jate hain. Sharks aur rays ke beech swimming ka ye thrill sirf un logo ke liye hai jo adventure ko naye level par le jana chahte hain."
  },
  {
    date: "5 SEPTEMBER 2026",
    title: "Global Food Festival",
    cat: "Gourmet Experience",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80",
    desc: "200 restaurants unite in a spectacular celebration of world cuisines.",
    longDesc: "Duniya bhar ke pakwan ab ek hi chhat ke niche. Is festival mein Michelin-star chefs apni signature dishes banate hain. Waterfront promenade par baith kar fountain show dekhte huye aap global street food se lekar fine-dining tak ka lutf utha sakte hain."
  },
];

const EventsSlide = () => {
  const sectionRef = useRef(null);
  
  // Modal State Logic
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
    <section ref={sectionRef} className="w-full h-screen bg-[#050505] text-white px-8 lg:px-24 flex flex-col justify-center overflow-hidden">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mt-20">
        
        {/* LEFT SIDE - Content + Media Block */}
        <div className="lg:col-span-5 event-content-left space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#c9a84c]" />
              <span className="text-[10px] tracking-[0.4em] text-[#c9a84c] uppercase font-bold">Upcoming Events</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif leading-tight">
              Moments That <br />
              <span className="italic text-[#c9a84c] font-light">Define the Season</span>
            </h2>
            <p className="text-white/40 text-[13px] max-w-sm leading-relaxed">
              Dubai Mall transforms every occasion into an unforgettable experience with exclusive showcases and celebrations.
            </p>
          </div>

          <div 
            onClick={() => openDetails({
              cat: "Grand Show",
              title: "The Fountain Spectacle",
              video: assets.EventShow,
              longDesc: "Experience the world's most impressive choreographed water show, right at the doorstep of Dubai Mall."
            })}
            className="relative w-full aspect-video overflow-hidden rounded-sm border border-white/5 group shadow-2xl cursor-pointer"
          >
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105">
              <source src={assets.EventShow} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-[8px] tracking-[0.3em] text-[#c9a84c] uppercase font-bold opacity-70">Live at Dubai Mall</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Timeline List */}
        <div className="lg:col-span-7 relative pl-12">
          <div className="timeline-line absolute left-0 top-0 w-px h-full bg-[#c9a84c]/20">
            <div className="w-full h-1/2 bg-linear-to-b from-[#c9a84c] to-transparent" />
          </div>

          <div className="space-y-8">
            {eventList.map((event, index) => (
              <div 
                key={index} 
                onClick={() => openDetails(event)}
                className="event-detail-item relative group cursor-pointer"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-13 top-1.5 w-2 h-2 rounded-full border border-[#c9a84c] bg-black group-hover:bg-[#c9a84c] transition-colors duration-300 z-10 shadow-[0_0_8px_rgba(201,168,76,0.3)]" />
                
                <div className="space-y-1">
                  <span className="text-[9px] tracking-widest text-[#c9a84c] font-bold uppercase opacity-80">{event.date}</span>
                  <h3 className="text-xl font-serif group-hover:translate-x-2 transition-transform duration-300 group-hover:text-[#c9a84c]">
                    {event.title}
                  </h3>
                  <p className="text-white/30 text-[12px] max-w-md leading-relaxed group-hover:text-white/60 transition-colors">
                    {event.desc}
                  </p>
                </div>
                <div className="w-full h-px bg-white/5 mt-6" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center opacity-50">
        <span className="text-[9px] tracking-[0.5em] uppercase font-light">Emaar Properties — 2026</span>
        <button className="group flex items-center gap-2 text-[#c9a84c] text-[9px] tracking-widest uppercase font-bold">
          <span>Explore All Events</span>
          <div className="w-4 h-px bg-[#c9a84c] group-hover:w-8 transition-all" />
        </button>
      </div>

      {/* SMART MODAL CALL */}
      <DetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedItem} 
      />
    </section>
  );
};

export default EventsSlide;