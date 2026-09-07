'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HeroCarousel } from '@/components/HeroCarousel';

interface HeroParallaxContainerProps {
  children: React.ReactNode;
}

export function HeroParallaxContainer({ children }: HeroParallaxContainerProps) {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Only track scroll within the hero interaction zone (0 to 800px) to prevent unnecessary re-renders
          const currentScroll = window.scrollY;
          if (currentScroll < 850 || scrollY < 850) {
            setScrollY(currentScroll);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  // Calculate parallax transformations over 0 to 650px scroll range
  const maxScroll = 650;
  const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

  // Scale: 1 -> 0.94
  const scale = 1 - progress * 0.06;
  // Opacity: 1 -> 0.65
  const opacity = 1 - progress * 0.35;
  // Subtle vertical parallax drift: 0 -> 40px
  const translateY = progress * 40;
  // Subtle brightness shift: 1 -> 0.90
  const brightness = 1 - progress * 0.10;

  return (
    <div ref={containerRef} className="relative w-full bg-[#050B14]">

      {/* 1. Pinned / Sticky Parallax Hero Layer (Layer z-10) */}
      <div 
        className="sticky top-16 sm:top-20 z-10 w-full overflow-hidden will-change-transform"
        style={{
          visibility: scrollY > 800 ? 'hidden' : 'visible',
          pointerEvents: scrollY > 600 ? 'none' : 'auto',
        }}
      >
        <div
          style={{
            transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
            opacity: opacity,
            filter: `brightness(${brightness})`,
            transformOrigin: 'top center',
            backfaceVisibility: 'hidden',
          }}
          className="w-full"
        >
          <HeroCarousel />
        </div>
      </div>

      {/* 2. Overlapping Curtain Sheet (Layer z-20 with isolated compositor layer) */}
      <div className="relative z-20 -mt-10 sm:-mt-16 bg-[#F8FAFC] rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.4),0_-10px_20px_-5px_rgba(0,0,0,0.2)] border-t border-white/60 overflow-hidden isolate transform-gpu">

        {/* Subtle physical grab / sheet highlight indicator at the very top */}
        <div className="w-full pt-3 pb-1 flex justify-center items-center pointer-events-none">
          <div className="w-12 h-1 rounded-full bg-slate-300/80 shadow-xs" />
        </div>

        {/* Subsequent sections nested cleanly inside the overlapping card sheet */}
        {children}
      </div>

    </div>
  );
}
