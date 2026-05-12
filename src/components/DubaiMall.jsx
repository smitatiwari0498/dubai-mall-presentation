import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Slides
import HeroSlide from './slides/HeroSlide';
import StatsSlide from './slides/StatsSlide';
import RetailSlide from './slides/RetailSlide';
import EntertainmentSlide from './slides/EntertainmentSlide';
import EventsSlide from './slides/EventsSlide';
import CTASlide from './slides/CTASlide';

gsap.registerPlugin(useGSAP);

const DubaiMall = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animationRunning, setAnimationRunning] = useState(false);
  const slidesCount = 6;
  const containerRef = useRef(null);

  const changeSlide = (index) => {
    if (animationRunning || index === activeSlide || index < 0 || index >= slidesCount) return;

    setAnimationRunning(true);
    
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveSlide(index);
        setAnimationRunning(false);
        // Reset visibility for the next slide
        gsap.set('.slide-content', { opacity: 1, y: 0 });
      }
    });

    tl.to('.slide-content', { 
      y: -20, 
      opacity: 0, 
      duration: 0.4, 
      ease: "power2.in" 
    })
    .to('.transition-overlay', { 
      opacity: 1, 
      duration: 0.5,
      ease: "expo.inOut"
    })
    .set('.transition-overlay', { opacity: 0, delay: 0.2 });
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 40 || animationRunning) return;
      e.deltaY > 0 ? changeSlide(activeSlide + 1) : changeSlide(activeSlide - 1);
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSlide, animationRunning]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden bg-[#050505] text-[#f5f0e8] selection:bg-[#c9a84c] selection:text-black">
      
      <div className="absolute inset-0 z-0 transition-all duration-1000 bg-linear-to-b from-black/40 to-black" />

      <nav className="fixed top-0 w-full z-1000 px-10 py-8 flex justify-between items-center backdrop-blur-sm bg-black/5">
        <div className="font-serif text-2xl uppercase tracking-[0.5em] cursor-pointer">
          Dubai <span className="text-[#c9a84c] font-light">Mall</span>
        </div>
        <button className="border border-[#c9a84c]/40 px-6 py-2 text-[10px] tracking-widest uppercase hover:bg-[#c9a84c] hover:text-black transition-all duration-500">
          Leasing Inquiry
        </button>
      </nav>

      <div className="fixed right-10 top-1/2 -translate-y-1/2 z-1000 flex flex-col items-center gap-8">
        <span className="text-[10px] tracking-tighter text-white/30 rotate-90 mb-4">SCROLL</span>
        {[...Array(slidesCount)].map((_, i) => (
          <div key={i} className="group relative flex items-center justify-center">
            <button
              onClick={() => changeSlide(i)}
              className={`transition-all duration-700 ${
                activeSlide === i ? 'h-12 w-0.5 bg-[#c9a84c]' : 'h-4 w-px bg-white/20 hover:bg-white/50'
              }`}
            />
            {activeSlide === i && (
              <span className="absolute right-6 text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Section 0{i + 1}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="fixed top-0 left-0 h-0.5 bg-[#c9a84c] z-1001 transition-all duration-500" 
           style={{ width: `${((activeSlide + 1) / slidesCount) * 100}%` }} />

      <main className="relative h-full w-full slide-content">
        <div className="h-full w-full transition-opacity duration-1000">
          {activeSlide === 0 && <HeroSlide />}
          {activeSlide === 1 && <StatsSlide />}
          {activeSlide === 2 && <RetailSlide />}
          {activeSlide === 3 && <EntertainmentSlide />}
          {activeSlide === 4 && <EventsSlide />}
          {activeSlide === 5 && <CTASlide />}
        </div>
      </main>

      <div className="transition-overlay pointer-events-none fixed inset-0 z-500 bg-black opacity-0" />
    </div>
  );
};

export default DubaiMall;