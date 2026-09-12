'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HeroCarousel } from '@/components/HeroCarousel';

interface HeroParallaxContainerProps {
  children: React.ReactNode;
}

export function HeroParallaxContainer({ children }: HeroParallaxContainerProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          if (currentScroll < 900) {
            setScrollY(currentScroll);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Calculate parallax transformations over 0 to 650px scroll range
  const maxScroll = 650;
  const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

  // Desktop smooth parallax metrics
  const scale = isMobile ? 1 : 1 - progress * 0.05;
  const opacity = isMobile ? 1 : 1 - progress * 0.3;
  const translateY = isMobile ? 0 : progress * 35;
  const brightness = isMobile ? 1 : 1 - progress * 0.08;

  return (
    <div ref={containerRef} className="relative w-full bg-[#050B14]">

      {/* 1. Pinned / Sticky Parallax Hero Layer (Layer z-10) */}
      <div 
        className="sticky top-14 sm:top-16 md:top-20 z-10 w-full overflow-hidden will-change-transform"
        style={{
          visibility: mounted && scrollY > 850 ? 'hidden' : 'visible',
          pointerEvents: scrollY > 600 ? 'none' : 'auto',
        }}
      >
        <div
          style={{
            transform: isMobile ? 'none' : `translate3d(0, ${translateY}px, 0) scale(${scale})`,
            opacity: opacity,
            filter: isMobile ? 'none' : `brightness(${brightness})`,
            transformOrigin: 'top center',
            backfaceVisibility: 'hidden',
          }}
          className="w-full transition-transform duration-75"
        >
          <HeroCarousel />
        </div>
      </div>

      {/* 2. Overlapping Curtain Sheet (Layer z-20 with clean isolation) */}
      <div className="relative z-20 -mt-8 sm:-mt-12 md:-mt-16 bg-[#F8FAFC] rounded-t-[28px] sm:rounded-t-[38px] md:rounded-t-[48px] shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.4),0_-10px_20px_-5px_rgba(0,0,0,0.2)] border-t border-white/60 overflow-hidden isolate transform-gpu">

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
