import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CTASlide = () => {
  const container = useRef();
  const buttonRef = useRef();

  useGSAP(() => {
    // Initial entrance animation
    gsap.from(".cta-content > *", { 
      y: 40, 
      opacity: 0, 
      stagger: 0.2, 
      duration: 1.5, 
      ease: "power4.out" 
    });
  }, { scope: container });

  const handleMouseMove = (e) => {
    const r = buttonRef.current.getBoundingClientRect();
    // Magnetic intensity ko control karne ke liye
    const x = (e.clientX - r.left - r.width / 2) * 0.4;
    const y = (e.clientY - r.top - r.height / 2) * 0.4;
    gsap.to(buttonRef.current, { x, y, duration: 0.4 });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <div ref={container} className="h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#c9a84c12_0%,transparent_70%)]" />
      
      <div className="cta-content relative z-10 text-center">
        <p className="text-[10px] tracking-[0.8em] uppercase text-[#c9a84c] mb-6 opacity-80">Plan Your Visit</p>
        
        <h2 className="text-5xl lg:text-8xl font-serif font-light mb-12 tracking-tighter text-white leading-tight">
          EXPERIENCE <br />
          <span className="italic text-[#c9a84c] opacity-90">GREATNESS.</span>
        </h2>

        {/* Updated Premium Button */}
        <button 
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative group px-12 py-5 overflow-hidden"
        >
          {/* Glassmorphism Background Layer */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-[#c9a84c]/40 group-hover:border-[#c9a84c] transition-all duration-500 rounded-sm" />
          
          {/* Text Layer */}
          <span className="relative z-10 text-[#c9a84c] text-[10px] tracking-[0.6em] uppercase group-hover:text-white transition-colors duration-500">
            Explore Mall Map
          </span>
        </button>
      </div>

      {/* Footer refined */}
      <footer className="absolute bottom-10 w-full flex flex-col md:flex-row justify-between px-10 lg:px-20 text-[7px] tracking-[0.4em] text-white uppercase gap-4">
        <span className="hover:text-white/50 transition-colors cursor-default">© 2026 Dubai Mall. Excellence Redefined.</span>
        <div className="flex justify-center gap-8">
          {['Instagram', 'Twitter', 'YouTube'].map(link => (
            <span key={link} className="hover:text-[#c9a84c] cursor-pointer transition-colors duration-300">{link}</span>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default CTASlide;