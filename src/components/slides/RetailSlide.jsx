import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DetailModal from "../DetailModal";

const retailCards = [
  { 
    cat: "Jewellery", 
    title: "Gold Souk", 
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80", 
    longDesc: "Explore the legendary Gold Souk, featuring exquisite craftsmanship and rare gems." 
  },
  { 
    cat: "Timepieces", 
    title: "Watch Gallery", 
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80", 
    longDesc: "A curated collection of the world's most prestigious horological masterpieces." 
  },
  { 
    cat: "Beauty", 
    title: "Spa Quarter", 
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80", 
    longDesc: "Indulge in sanctuary-like serenity with world-class wellness and beauty brands." 
  },
  { 
    cat: "Fine Dining", 
    title: "Gourmet District", 
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80", 
    longDesc: "An unparalleled culinary journey featuring flavors from every corner of the globe." 
  },
];

const mainFeature = { 
  cat: "Fashion", 
  title: "Haute Couture District", 
  img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8", 
  longDesc: "The heartbeat of high fashion, featuring flagship luxury boutiques." 
};

const RetailSlide = () => {
  const containerRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  useGSAP(() => {
    gsap.from(".retail-content-inner", { 
      x: -50, 
      opacity: 0, 
      duration: 1.2, 
      ease: "power4.out" 
    });
    gsap.from(".retail-card", { 
      y: 50, 
      opacity: 0, 
      duration: 1, 
      stagger: 0.1, 
      ease: "power3.out", 
      delay: 0.2 
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full h-screen bg-[#050505] text-white flex items-center overflow-hidden">
      <div className="w-full px-6 md:px-10 lg:px-16 flex flex-col md:flex-row gap-8 lg:gap-12 items-center">

        {/* LEFT CONTENT CONTAINER */}
        <div className="retail-content-inner w-full md:w-[35%]">
          {/* Header Line */}
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-8 md:w-10 h-px bg-[#c9a84c]" />
            <span className="text-[8px] md:text-[10px] tracking-[0.4em] text-[#c9a84c] uppercase">
              Luxury Retail
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-serif leading-tight md:leading-[1.1] mb-6 md:mb-8">
            The Finest Brands, <br />
            <span className="italic text-[#c9a84c] font-light text-2xl sm:text-4xl lg:text-6xl">
              Under One Roof
            </span>
          </h2>

          <p className="text-white/40 text-xs md:text-sm max-w-sm mb-6 md:mb-10">
            Experience the world's most prestigious fashion houses and curated boutiques.
          </p>
          
          {/* MOBILE LIST VIEW (Visible only on small screens) */}
          <div className="md:hidden space-y-1">
             {/* Main Feature List Item */}
             <div 
               onClick={() => openModal(mainFeature)}
               className="border-b border-white/5 py-3 flex justify-between items-center active:bg-white/5 transition-colors"
             >
               <div>
                 <p className="text-[7px] text-[#c9a84c] uppercase tracking-widest">{mainFeature.cat}</p>
                 <span className="font-serif text-base">{mainFeature.title}</span>
               </div>
               <span className="text-[#c9a84c] text-lg">→</span>
             </div>

             {/* Dynamic List Items */}
             {retailCards.map((item, index) => (
               <div 
                 key={index} 
                 onClick={() => openModal(item)}
                 className="border-b border-white/5 py-3 flex justify-between items-center active:bg-white/5 transition-colors"
               >
                 <div>
                   <p className="text-[7px] text-[#c9a84c] uppercase tracking-widest">{item.cat}</p>
                   <span className="font-serif text-base">{item.title}</span>
                 </div>
                 <span className="text-[#c9a84c] text-lg">→</span>
               </div>
             ))}
          </div>
        </div>

        {/* RIGHT GRID VIEW (Desktop Only) */}
        <div className="hidden md:block md:w-[65%] h-[75vh]">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            {/* Main Feature Card */}
            <div
              onClick={() => openModal(mainFeature)}
              className="retail-card lg:row-span-2 relative overflow-hidden bg-[#111] group cursor-pointer"
            >
              <img 
                src={mainFeature.img} 
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
                alt={mainFeature.title} 
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-linear-to-t from-black">
                <p className="text-[9px] text-[#c9a84c] uppercase tracking-widest">{mainFeature.cat}</p>
                <h3 className="text-xl font-serif">{mainFeature.title}</h3>
                <div className="mt-3 h-px w-0 bg-[#c9a84c] transition-all duration-500 group-hover:w-full"></div>
              </div>
            </div>

            {/* Other Cards */}
            {retailCards.map((item, index) => (
              <div 
                key={index} 
                onClick={() => openModal(item)} 
                className="retail-card relative overflow-hidden bg-[#111] group cursor-pointer"
              >
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-all duration-700 group-hover:opacity-80" 
                  alt={item.title} 
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-linear-to-t from-black/80">
                  <p className="text-[9px] text-[#c9a84c] uppercase mb-1 tracking-widest">{item.cat}</p>
                  <h3 className="text-sm font-serif">{item.title}</h3>
                  <div className="mt-3 h-px w-0 bg-[#c9a84c] transition-all duration-500 group-hover:w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Modal Component */}
      <DetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedItem} 
      />
    </section>
  );
};

export default RetailSlide;