import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { assets } from "../../assets/assets.js"

const HeroSlide = () => {
  const containerRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        onComplete: () => {
          gsap.to(".hero-content", {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
              setShowVideo(true);
            },
          });
        },
      });

      timeline
        .from(".hero-eyebrow", {
          y: 20,
          opacity: 0,
          duration: 0.5,
        })
        .from(
          ".gold-line",
          {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.4,
          },
          "-=0.2"
        )
        .from(
          ".title-word",
          {
            y: 80,
            opacity: 0,
            rotateX: -60,
            stagger: 0.08,
            duration: 0.7,
            ease: "power4.out",
          },
          "-=0.1"
        )
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3"
        );

      // Total animation duration ≈ 3 sec
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
    >
      {!showVideo ? (
        <div className="hero-content h-full w-full flex flex-col items-center justify-center relative overflow-hidden px-6 bg-black">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#c9a84c]/20 blur-[120px] rounded-full animate-pulse" />

          <div className="relative z-10 text-center">
            <p className="hero-eyebrow text-[10px] tracking-[0.6em] uppercase text-[#c9a84c] mb-8">
              Downtown Dubai · Since 2008
            </p>

            <div className="gold-line w-16 h-[1px] bg-[#c9a84c] mx-auto mb-8" />

            <h1 className="font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-light mb-8 uppercase">
              <span className="block overflow-hidden">
                <span className="title-word inline-block mr-4">
                  Where
                </span>

                <span className="title-word inline-block">
                  the
                </span>
              </span>

              <span className="block overflow-hidden italic text-[#c9a84c]">
                <span className="title-word inline-block">
                  World
                </span>
              </span>

              <span className="block overflow-hidden">
                <span className="title-word inline-block">
                  Shops
                </span>
              </span>
            </h1>

            <p className="hero-subtitle text-[10px] tracking-[0.5em] uppercase text-white/60">
              The World's Most Visited Destination
            </p>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <span className="text-[8px] uppercase tracking-widest text-white/40">
              Scroll to explore
            </span>

            <div className="w-[1px] h-12 bg-gradient-to-b from-[#c9a84c] to-transparent" />
          </div>
        </div>
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={assets.HomePageVedio1} />
        </video>
      )}
    </div>
  );
};

export default HeroSlide;