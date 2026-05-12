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
    <section ref={containerRef} className="w-full h-screen bg-[#050505] text-white flex flex-col justify-center px-6 lg:px-16 overflow-hidden">

      <div className="space-y-5 content-fade mt-10 mb-2">
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-[#c9a84c]" />

              <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]">
                A Universe of Entertainment
              </span>
            </div>
        </div>

      <div className="ent-header flex justify-between items-end mb-10 border-b border-white/5 pb-8 ">
        <h2 className="text-4xl md:text-4xl font-serif">Epic Entertainment, <span className="italic text-[#c9a84c] font-light">Limitless Thrills</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-[60vh]">
        <div 
          onClick={() => openModal({ cat: "Marine Life", title: "Dubai Aquarium", video: assets.Aquarium, longDesc: "Home to thousands of aquatic animals, representing hundreds of species." })}
          className="ent-card lg:col-span-1 lg:row-span-2 relative overflow-hidden group cursor-pointer"
        >
          <video autoPlay muted loop playsInline src={assets.Aquarium} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700"/>
          <div className="absolute inset-0 p-10 flex flex-col justify-end bg-linear-to-t from-black">
            <p className="text-[#c9a84c] text-[10px] uppercase">Marine Life</p>
            <h3 className="text-3xl font-serif">Dubai Aquarium</h3>
             <div className="mt-3 h-px w-0 bg-[#c9a84c] transition-all duration-500 group-hover:w-full"></div>
          </div>
        </div>

        {entertainmentCards.map((item, index) => (
          <div key={index} onClick={() => openModal(item)} className="ent-card relative overflow-hidden group cursor-pointer">
            <video autoPlay muted loop playsInline src={item.video} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"/>
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-linear-to-t from-black">
              <p className="text-[#c9a84c] text-[9px] uppercase">{item.cat}</p>
              <h3 className="text-xl font-serif">{item.title}</h3>
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