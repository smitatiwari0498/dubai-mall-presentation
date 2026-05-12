import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { assets } from "../../assets/assets.js";

const HeroSlide = () => {
  const containerRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  // Initial Text Animation
  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Fade out content then show video
          gsap.to(".hero-content", {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => setShowVideo(true),
          });
        },
      });

      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.8 })
        .from(".gold-line", { scaleX: 0, transformOrigin: "left", duration: 0.6 }, "-=0.4")
        .from(".title-word", {
          y: 100,
          opacity: 0,
          rotateX: -80,
          stagger: 0.15,
          duration: 1,
          ease: "power4.out",
        }, "-=0.3")
        .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5");
    },
    { scope: containerRef }
  );

  // Video Transition Animation
  useGSAP(
    () => {
      if (showVideo) {
        gsap.fromTo(".hero-video-container", 
          { opacity: 0, scale: 1.1 }, 
          { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
        );
      }
    },
    { dependencies: [showVideo], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {!showVideo ? (
        <div className="hero-content h-full w-full flex flex-col items-center justify-center relative px-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#c9a84c]/10 blur-[120px] rounded-full" />
          
          <div className="relative z-10 text-center">
            <p className="hero-eyebrow text-[11px] tracking-[0.7em] uppercase text-[#c9a84c] mb-6 font-medium">
              Downtown Dubai · The Landmark of Ambition
            </p>
            <div className="gold-line w-20 h-px bg-[#c9a84c] mx-auto mb-10" />
            
            <h1 className="font-serif text-[clamp(3rem,9vw,8rem)] leading-[0.85] font-light mb-10 uppercase text-[#f5f0e8] perspective-1000">
              <span className="block overflow-hidden pb-2">
                <span className="title-word inline-block mr-5">Where</span>
                <span className="title-word inline-block">the</span>
              </span>
              <span className="block overflow-hidden italic text-[#c9a84c] pb-2">
                <span className="title-word inline-block">World</span>
              </span>
              <span className="block overflow-hidden">
                <span className="title-word inline-block">Meets</span>
              </span>
            </h1>
            
            <p className="hero-subtitle text-[11px] tracking-[0.6em] uppercase text-white/40">
              The Global Epicenter of Retail & Lifestyle
            </p>
          </div>
        </div>
      ) : (
        <div className="hero-video-container h-full w-full relative">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover">
            <source src={assets.HomePageVedio1} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-20">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#c9a84c] animate-bounce">
              Explore the Grandeur
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSlide;