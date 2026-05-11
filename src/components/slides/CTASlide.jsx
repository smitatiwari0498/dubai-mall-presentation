import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CTASlide = () => {
  const container = useRef();
  const buttonRef = useRef();

  useGSAP(() => {
    gsap.from(".cta-content", { opacity: 0, scale: 0.95, duration: 1.2 });
  }, { scope: container });

  const handleMouseMove = (e) => {
    const r = buttonRef.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    gsap.to(buttonRef.current, { x: dx * 0.3, y: dy * 0.4, duration: 0.4 });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <div ref={container} className="h-full w-full flex items-center justify-center bg-[#080808] relative overflow-hidden px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#c9a84c1a_0%,_transparent_60%)]" />
      <div className="cta-content relative z-10 text-center">
        <p className="text-[10px] tracking-[0.8em] uppercase text-[#c9a84c] mb-8">Plan Your Visit</p>
        <h2 className="text-6xl lg:text-9xl font-serif font-light mb-16 tracking-tight uppercase">Experience <br /><em className="italic">Greatness.</em></h2>
        <button 
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="px-10 lg:px-16 py-5 lg:py-6 border border-[#c9a84c] text-[#c9a84c] text-[10px] lg:text-[12px] tracking-[0.5em] uppercase hover:bg-[#c9a84c] hover:text-black transition-colors duration-500"
        >
          Explore Mall Map
        </button>
      </div>
      <footer className="absolute bottom-10 w-full flex flex-col sm:flex-row justify-between px-10 lg:px-20 text-[8px] tracking-[0.4em] text-white/30 uppercase gap-4 text-center sm:text-left">
        <span>© 2026 Dubai Mall. All Rights Reserved.</span>
        <div className="flex justify-center gap-8">
          <span>Instagram</span><span>Twitter</span><span>YouTube</span>
        </div>
      </footer>
    </div>
  );
};

export default CTASlide;