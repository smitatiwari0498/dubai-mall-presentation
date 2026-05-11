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

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

const DubaiMall = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animationRunning, setAnimationRunning] = useState(false);

  const sliderContainerRef = useRef(null);

  const slidesCount = 6;

  const changeSlide = (slideIndex) => {
    if (
      animationRunning ||
      slideIndex === activeSlide ||
      slideIndex < 0 ||
      slideIndex >= slidesCount
    ) {
      return;
    }

    setAnimationRunning(true);

    const timeline = gsap.timeline({
      onComplete: () => {
        setActiveSlide(slideIndex);
        setAnimationRunning(false);
      },
    });

    timeline
      .to('.transition-overlay', {
        opacity: 0.8,
        duration: 0.4,
      })
      .to('.transition-overlay', {
        opacity: 0,
        duration: 0.4,
        delay: 0.2,
      });
  };

  useEffect(() => {
    const handleWheelScroll = (event) => {
      if (Math.abs(event.deltaY) <= 50) return;

      if (event.deltaY > 0) {
        changeSlide(activeSlide + 1);
      } else {
        changeSlide(activeSlide - 1);
      }
    };

    window.addEventListener('wheel', handleWheelScroll);

    return () => {
      window.removeEventListener('wheel', handleWheelScroll);
    };
  }, [activeSlide, animationRunning]);

  return (
    <div
      ref={sliderContainerRef}
      className="fixed inset-0 overflow-hidden bg-[#080808] text-[#f5f0e8] font-sans"
    >
      {/* Logo */}
      <div className="fixed top-8 left-10 z-[1000] font-serif text-lg uppercase tracking-[0.4em]">
        Dubai <span className="text-[#c9a84c]">Mall</span>
      </div>

      {/* Pagination Dots */}
      <div className="fixed top-1/2 right-10 z-[1000] flex -translate-y-1/2 flex-col gap-4">
        {[...Array(slidesCount)].map((_, index) => (
          <button
            key={index}
            onClick={() => changeSlide(index)}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
              activeSlide === index
                ? 'scale-150 bg-[#c9a84c]'
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="fixed bottom-10 left-10 z-[1000] flex items-center gap-4 text-[10px] tracking-widest text-white/60">
        <span className="text-base text-[#c9a84c]">
          0{activeSlide + 1}
        </span>

        <div className="h-[1px] w-10 bg-white/30" />

        <span>0{slidesCount}</span>
      </div>

      {/* Transition Overlay */}
      <div className="transition-overlay pointer-events-none fixed inset-0 z-[500] bg-black opacity-0" />

      {/* Slides */}
      <div className="relative h-full w-full">
        {activeSlide === 0 && <HeroSlide />}
        {activeSlide === 1 && <StatsSlide />}
        {activeSlide === 2 && <RetailSlide />}
        {activeSlide === 3 && <EntertainmentSlide />}
        {activeSlide === 4 && <EventsSlide />}
        {activeSlide === 5 && <CTASlide />}
      </div>
    </div>
  );
};

export default DubaiMall;