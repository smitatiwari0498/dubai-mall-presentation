import React from "react";

const DetailModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4 md:p-5">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-6xl bg-[#0d0d0d] border border-white/10 overflow-hidden flex flex-col md:flex-row h-[73vh] shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-50 text-white/50 hover:text-[#c9a84c] transition-colors"
        >
          <span className="text-[10px] tracking-widest uppercase">Close ✕</span>
        </button>

        {/* MEDIA SIDE (Video if exists, else Image) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden border-r border-white/5 bg-black">
          {data.video ? (
            <video 
              src={data.video} 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={data.img} 
              alt={data.title} 
              className="w-full h-full object-cover opacity-80"
            />
          )}
        </div>

        {/* INFO SIDE */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#c9a84c]" />
            <span className="text-[10px] tracking-[0.4em] text-[#c9a84c] uppercase font-bold">
              {data.cat}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
            {data.title}
          </h2>

          <p className="text-white/50 text-sm leading-relaxed font-light mb-8">
            {data.longDesc || "Experience the pinnacle of luxury and entertainment at the heart of Dubai Mall."}
          </p>
          
          <button className="w-fit border border-[#c9a84c]/30 px-8 py-3 text-[9px] tracking-[0.3em] uppercase text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all duration-500">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;