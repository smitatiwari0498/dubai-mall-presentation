import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { assets } from "../../assets/assets";
import DetailModal from "../DetailModal";

const entertainmentCards = [
  { cat: "Adventure", title: "Dubai Ice Rink", video: assets.iceRink, longDesc: "Experience the thrill of ice skating in the desert at our Olympic-sized rink." },
  { cat: "Cinema", title: "Reel Cinemas", video: assets.ReelCinemas, longDesc: "Watch the latest blockbusters in luxury with state-of-the-art projection technology." },
  { cat: "Virtual Reality", title: "Play DXB", video: assets.playDxb, longDesc: "The ultimate VR destination with adrenaline-pumping experiences." },
  { cat: "Observation", title: "Sky Views", video: assets.Sky, longDesc: "Witness Dubai's skyline from breathtaking heights." },
];

const mainEntertainment = { 
  cat: "Marine Life", 
  title: "Dubai Aquarium", 
  video: assets.Aquarium, 
  longDesc: "Home to thousands of aquatic animals, representing hundreds of species." 
};

const EntertainmentSlide = () => {
  const containerRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  useGSAP(() => {
    gsap.from(".ent-header", { y: -30, opacity: 0, duration: 1 });
    gsap.from(".ent-card", { y: 60, opacity: 0, duration: 1.2, stagger: 0.15 });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full min-h-screen bg-[#050505] text-white flex flex-col justify-center px-6 lg:px-16 overflow-hidden py-12 lg:py-0">
      <div className="space-y-4 content-fade mt-16 md:mt-10 mb-2">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-6 md:w-8 h-px bg-[#c9a84c]" />
          <span className="text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-[#c9a84c]">
            A Universe of Entertainment
          </span>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="ent-header flex justify-between items-end mb-6 md:mb-10 border-b border-white/5 pb-6 md:pb-8">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-serif leading-tight">
          Epic Entertainment, <br className="md:hidden" />
          <span className="italic text-[#c9a84c] font-light"> Limitless Thrills</span>
        </h2>
      </div>

      {/* MOBILE LIST VIEW */}
      <div className="md:hidden space-y-2 mb-10 mt-4">
        {[mainEntertainment, ...entertainmentCards].map((item, index) => (
          <div 
            key={index} 
            onClick={() => openModal(item)}
            className="border-b border-white/10 py-4 flex justify-between items-center active:bg-white/5"
          >
            <div>
              <p className="text-[7px] text-[#c9a84c] uppercase tracking-widest">{item.cat}</p>
              <span className="font-serif text-lg">{item.title}</span>
            </div>
            <span className="text-[#c9a84c] text-xl">→</span>
          </div>
        ))}
      </div>

      

      {/* DESKTOP GRID VIEW (Hidden on Mobile) */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 h-[55vh] lg:h-[60vh]">
        {/* Main Big Card */}
        <div 
          onClick={() => openModal(mainEntertainment)}
          className="ent-card lg:col-span-1 lg:row-span-2 relative overflow-hidden group cursor-pointer bg-white/5"
        >
          <video autoPlay muted loop playsInline src={mainEntertainment.video} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700"/>
          <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end bg-linear-to-t from-black via-black/40 to-transparent">
            <p className="text-[#c9a84c] text-[9px] lg:text-[10px] uppercase tracking-widest">{mainEntertainment.cat}</p>
            <h3 className="text-2xl lg:text-3xl font-serif">{mainEntertainment.title}</h3>
             <div className="mt-3 h-px w-0 bg-[#c9a84c] transition-all duration-500 group-hover:w-full"></div>
          </div>
        </div>

        {/* Small Cards */}
        {entertainmentCards.map((item, index) => (
          <div key={index} onClick={() => openModal(item)} className="ent-card relative overflow-hidden group cursor-pointer bg-white/5">
            <video autoPlay muted loop playsInline src={item.video} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700"/>
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/20 to-transparent">
              <p className="text-[#c9a84c] text-[8px] lg:text-[9px] uppercase tracking-widest">{item.cat}</p>
              <h3 className="text-base lg:text-xl font-serif">{item.title}</h3>
               <div className="mt-3 h-px w-0 bg-[#c9a84c] transition-all duration-500 group-hover:w-full"></div>
            </div>
          </div>
        ))}
      </div>

      <DetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedItem} />
    </section>
  );
};

export default EntertainmentSlide;