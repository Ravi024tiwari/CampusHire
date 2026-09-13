'use client';

import React, { useEffect, useRef } from 'react';
import { HeroCarousel } from '@/components/HeroCarousel';

interface HeroParallaxContainerProps {
  children: React.ReactNode;
}

export function HeroParallaxContainer({ children }: HeroParallaxContainerProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    let isMobile = window.innerWidth < 768;

    const handleResize = () => {
      isMobile = window.innerWidth < 768;
      if (isMobile && heroRef.current) {
        heroRef.current.style.transform = 'none';
        heroRef.current.style.opacity = '1';
        heroRef.current.style.filter = 'none';
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!isMobile && heroRef.current) {
            const scrollY = window.scrollY;
            if (scrollY <= 750) {
              const progress = Math.min(Math.max(scrollY / 650, 0), 1);
              const scale = 1 - progress * 0.05;
              const opacity = 1 - progress * 0.25;
              const translateY = progress * 30;
              const brightness = 1 - progress * 0.08;

              heroRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
              heroRef.current.style.opacity = `${opacity}`;
              heroRef.current.style.filter = `brightness(${brightness})`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full bg-[#050B14]">

      {/* 1. Pinned / Sticky Parallax Hero Layer (Layer z-10) */}
      <div className="sticky top-14 sm:top-16 md:top-20 z-10 w-full overflow-hidden">
        <div
          ref={heroRef}
          style={{
            transformOrigin: 'top center',
            backfaceVisibility: 'hidden',
          }}
          className="w-full transform-gpu"
        >
          <HeroCarousel />
        </div>
      </div>

      {/* 2. Overlapping Curtain Sheet (Layer z-20 with clean isolation) */}
      <div className="relative z-20 -mt-8 sm:-mt-12 md:-mt-16 bg-[#F8FAFC] rounded-t-[28px] sm:rounded-t-[38px] md:rounded-t-[48px] shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.4),0_-10px_20px_-5px_rgba(0,0,0,0.2)] border-t border-white/60 overflow-hidden isolate">

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
