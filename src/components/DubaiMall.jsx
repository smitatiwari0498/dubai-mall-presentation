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
  const touchStart = useRef(null);

  const changeSlide = (index) => {
    if (animationRunning || index === activeSlide || index < 0 || index >= slidesCount) return;

    setAnimationRunning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveSlide(index);
        setAnimationRunning(false);
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
      .set('.transition-overlay', { opacity: 0, delay: 0.1 });
  };

  useEffect(() => {
    // Desktop Wheel Event
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 40 || animationRunning) return;
      e.deltaY > 0 ? changeSlide(activeSlide + 1) : changeSlide(activeSlide - 1);
    };

    // Mobile Touch Events
    const handleTouchStart = (e) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!touchStart.current || animationRunning) return;
      const touchEnd = e.touches[0].clientY;
      const diff = touchStart.current - touchEnd;

      if (Math.abs(diff) > 50) { // Threshold for swipe
        diff > 0 ? changeSlide(activeSlide + 1) : changeSlide(activeSlide - 1);
        touchStart.current = null;
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeSlide, animationRunning]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden bg-[#050505] text-[#f5f0e8] selection:bg-[#c9a84c] selection:text-black">

      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/60 via-transparent to-black" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-100 px-6 py-2 md:px-10 md:py-4 flex justify-between items-center backdrop-blur-md bg-black/10 border-b border-white/5">

        <div className="font-serif text-base md:text-xl uppercase tracking-[0.2em] md:tracking-[0.4em] cursor-pointer">
          Dubai <span className="text-[#c9a84c] font-light">Mall</span>
        </div>

        {/* Button Section - Padding and text size reduced */}
        <button className="hidden sm:block border border-[#c9a84c]/40 px-3 py-1 md:px-5 md:py-1.5 text-[8px] md:text-[9px] tracking-widest uppercase hover:bg-[#c9a84c] hover:text-black transition-all duration-500">
          Leasing Inquiry
        </button>
      </nav>

      {/* Pagination */}
      <div className="fixed right-4 md:right-10 top-1/2 -translate-y-1/2 z-100 flex flex-col items-center gap-4 md:gap-8">
        <span className="hidden md:block text-[10px] tracking-tighter text-white/30 rotate-90 mb-4">SCROLL</span>
        {[...Array(slidesCount)].map((_, i) => (
          <div key={i} className="group relative flex items-center justify-center">
            <button
              onClick={() => changeSlide(i)}
              className={`transition-all duration-700 ${activeSlide === i
                  ? 'h-8 md:h-12 w-1 md:w-0.5 bg-[#c9a84c]'
                  : 'h-3 md:h-4 w-px bg-white/20 hover:bg-white/50'
                }`}
            />

            <span className="hidden lg:block absolute right-6 text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Section 0{i + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-0.75 bg-[#c9a84c] z-101 transition-all duration-500"
        style={{ width: `${((activeSlide + 1) / slidesCount) * 100}%` }} />

      {/* Main Content Container - Added Responsive Padding */}
      <main className="relative h-full w-full slide-content px-6 md:px-0">
        <div className="h-full w-full flex items-center justify-center">
          {activeSlide === 0 && <HeroSlide />}
          {activeSlide === 1 && <StatsSlide />}
          {activeSlide === 2 && <RetailSlide />}
          {activeSlide === 3 && <EntertainmentSlide />}
          {activeSlide === 4 && <EventsSlide />}
          {activeSlide === 5 && <CTASlide />}
        </div>
      </main>

      {/* Transition Overlay */}
      <div className="transition-overlay pointer-events-none fixed inset-0 z-50 bg-black opacity-0" />
    </div>
  );
};

export default DubaiMall;