'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck,
  Award,
  Users
} from 'lucide-react';

interface SlideData {
  id: number;
  image: string;
  title: string;
  highlightText: string;
  subtitle: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    image: '/images/hero/hero_placed_students.jpg',
    title: 'Connecting Campus Ambition with',
    highlightText: 'Dream Career Offers.',
    subtitle: 'Streamline on-campus drives, multi-resume management, candidate pipelines, and automated offer letter dispatch for modern universities and ambitious students.',
  },
  {
    id: 2,
    image: '/images/hero/hero_student_interview.jpg',
    title: 'Ace Campus Interviews with',
    highlightText: 'Live Evaluation Portals.',
    subtitle: 'Run structured panel rounds, live coding evaluations, and bulk candidate progressions with instant feedback and zero spreadsheet chaos.',
  },
  {
    id: 3,
    image: '/images/hero/hero_big_tech_placements.jpg',
    title: 'The Trusted Hiring Hub for',
    highlightText: 'Top Global Tech Giants.',
    subtitle: 'Join leading companies conducting seamless on-campus and virtual hiring drives across engineering, management, and technology universities.',
  },
  {
    id: 4,
    image: '/images/hero/hero_offer_celebration.jpg',
    title: 'Celebrate Career Milestones with',
    highlightText: 'Fair & Verified Offers.',
    subtitle: 'Automated offer letter dispatch via Resend, custom compensation breakdowns, and single-offer locking that guarantees equal opportunity for every candidate.',
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // 4.5-second smooth automatic slide transition (pauses on hover/touch)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const activeSlide = SLIDES[currentSlide];

  return (
    <section 
      className="relative w-full h-[calc(100svh-4rem)] md:h-[calc(100svh-5rem)] min-h-[460px] sm:min-h-[500px] md:min-h-[560px] max-h-[820px] flex items-stretch justify-center overflow-hidden bg-[#0A1120] text-white select-none isolate group"
      aria-label="Campus Placement Hero Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* 1. Background Cinematic Images with Eager Preload & Seamless Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#070D18]">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 will-change-transform transition-opacity duration-700 ease-in-out ${
                isActive
                  ? 'opacity-100 z-10 scale-100'
                  : 'opacity-0 z-0 scale-[1.01] pointer-events-none'
              }`}
              style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: '700ms',
                transformOrigin: 'center center',
              }}
            >
              <Image
                src={slide.image}
                alt={`${slide.title} ${slide.highlightText}`}
                fill
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                quality={84}
                className="object-cover object-center w-full h-full brightness-[0.96] contrast-[1.02]"
              />
            </div>
          );
        })}

        {/* Soft, Clean Natural Vignette (Bright & Clean, ensures text readability without turning screen black) */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050B14]/85 via-[#050B14]/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#050B14]/80 via-[#050B14]/30 to-transparent sm:from-[#050B14]/70 sm:via-[#050B14]/20 sm:to-transparent pointer-events-none" />
      </div>

      {/* 2. Interactive Navigation Arrows (Hidden on very small mobile to avoid text clutter, visible on tablet+) */}
      <div className="hidden sm:flex absolute inset-y-0 left-3 sm:left-6 z-30 items-center">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white/80 hover:text-white backdrop-blur-md transition-all duration-200 transform hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-2xl cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="hidden sm:flex absolute inset-y-0 right-3 sm:right-6 z-30 items-center">
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white/80 hover:text-white backdrop-blur-md transition-all duration-200 transform hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-2xl cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* 3. Main Foreground Typography: Top Bold Headline + Bottom Content (Fully Responsive on Mobile) */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6 md:pt-8 pb-4 sm:pb-7 w-full h-full flex flex-col justify-between">
        
        {/* TOP: Bold Main Headline */}
        <div className="max-w-3xl xl:max-w-4xl pt-1 sm:pt-3 transition-all duration-500">
          <h1 
            key={`title-${currentSlide}`}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] sm:leading-[1.12] font-heading drop-shadow-2xl animate-in fade-in slide-in-from-top-1 duration-500"
          >
            {activeSlide.title}{' '}
            <span className="text-[#FBAB23] block sm:inline">
              {activeSlide.highlightText}
            </span>
          </h1>
        </div>

        {/* BOTTOM: Subtitle, Badges & Slide Indicators */}
        <div className="max-w-3xl flex flex-col items-start space-y-2.5 sm:space-y-4 pb-1 sm:pb-2">
          
          <p 
            key={`sub-${currentSlide}`}
            className="text-xs sm:text-sm md:text-base text-slate-100/90 leading-relaxed font-normal max-w-xl md:max-w-2xl drop-shadow-md line-clamp-2 sm:line-clamp-none animate-in fade-in duration-500"
          >
            {activeSlide.subtitle}
          </p>

          {/* Clean Neutral Glass Badges */}
          <div className="w-full flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-xs md:text-sm text-slate-200">
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
              <span>Single-Offer Protection</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-md">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FBAB23] flex-shrink-0" />
              <span>NIRF Accreditation</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-md">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
              <span>Multi-Role Access</span>
            </div>
          </div>

          {/* Interactive Slide Dots / Indicators */}
          <div className="pt-1.5 sm:pt-2 flex items-center gap-2 sm:gap-2.5">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;

              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 cursor-pointer focus:outline-none ${
                    isActive
                      ? 'w-7 sm:w-9 bg-[#FBAB23]'
                      : 'w-2 sm:w-2.5 bg-white/35 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
