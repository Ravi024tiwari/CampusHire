'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface SlideData {
  id: number;
  image: string;
  badge: string;
  badgeIcon: React.ElementType;
  title: string;
  highlightText: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  metricsBadge: string;
  featuredCompanies: string[];
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    image: '/images/hero/hero_placed_students.jpg',
    badge: '15,000+ Students Placed in 2024-25',
    badgeIcon: GraduationCap,
    title: 'Connecting Campus Ambition with',
    highlightText: 'Tier-1 Dream Offers.',
    subtitle: 'Streamline on-campus drives, multi-resume management, candidate pipelines, and automated offer letter dispatch. Built for modern universities, high-growth recruiters, and ambitious students.',
    primaryCta: { text: 'Explore Campus Drives', href: '/register?role=STUDENT' },
    secondaryCta: { text: 'Recruiter Drive Hub', href: '/register?role=RECRUITER' },
    metricsBadge: '₹45 LPA Top CTC • 96.4% Placement Rate',
    featuredCompanies: ['Google', 'Microsoft', 'Amazon', 'Deloitte', 'Accenture']
  },
  {
    id: 2,
    image: '/images/hero/hero_student_interview.jpg',
    badge: 'Live Technical & HR Evaluation Hub',
    badgeIcon: Briefcase,
    title: 'Ace Campus Interviews with',
    highlightText: 'Live Evaluation Portals.',
    subtitle: 'Run structured panel rounds, live coding evaluations, and bulk candidate progressions with instant feedback and zero spreadsheet chaos.',
    primaryCta: { text: 'Build Student Profile', href: '/register?role=STUDENT' },
    secondaryCta: { text: 'Schedule Interviews', href: '/register?role=RECRUITER' },
    metricsBadge: 'Sub-15ms Shortlist Speed • 4,500+ Panel Rounds',
    featuredCompanies: ['Stripe', 'Cisco', 'TCS Digital', 'Infosys']
  },
  {
    id: 3,
    image: '/images/hero/hero_big_tech_placements.jpg',
    badge: 'Tier-1 Tech & MNC Day-1 Drives',
    badgeIcon: Building2,
    title: 'The Trusted Hiring Hub for',
    highlightText: 'Top Global Tech Giants.',
    subtitle: 'Join thousands of top companies conducting seamless on-campus and virtual hiring drives across engineering, management, and technology universities.',
    primaryCta: { text: 'Register College Drive', href: '/register?role=TPO_ADMIN' },
    secondaryCta: { text: 'View Recruiter Network', href: '#trusted-companies' },
    metricsBadge: '500+ Active Drives • 100+ Partner Campuses',
    featuredCompanies: ['Google', 'Microsoft', 'TCS', 'Wipro', 'Infosys', 'Amazon']
  },
  {
    id: 4,
    image: '/images/hero/hero_offer_celebration.jpg',
    badge: 'Single-Offer Placement Protection',
    badgeIcon: ShieldCheck,
    title: 'Celebrate Career Milestones with',
    highlightText: 'Fair & Verified Offers.',
    subtitle: 'Automated offer letter dispatch via Resend, custom compensation breakdowns, and single-offer locking that guarantees equal opportunity for every candidate.',
    primaryCta: { text: 'Join CampusHire Free', href: '/register' },
    secondaryCta: { text: 'Access Portal Sign In', href: '/login' },
    metricsBadge: '18,500+ Verified Offers • Single-Offer Guard',
    featuredCompanies: ['Global Tech', 'EY', 'IBM', 'Oracle', 'Wipro']
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Stable 4.2-second autonomous transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const activeSlide = SLIDES[currentSlide];
  const BadgeIcon = activeSlide.badgeIcon;

  return (
    <section 
      className="relative w-full h-[calc(100svh-4rem)] md:h-[calc(100svh-5rem)] min-h-[520px] sm:min-h-[580px] md:min-h-[640px] max-h-[960px] flex items-center justify-center overflow-hidden bg-slate-950 text-white select-none isolate [contain:paint_layout]"
      aria-label="Campus Placement Hero Showcase"
    >
      {/* 1. Background Images: Fully Visible, Sharp, Natural, Vivid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 will-change-transform will-change-opacity transition-all duration-[1200ms] ease-out ${
                isActive
                  ? 'opacity-100 scale-100 blur-0 z-10'
                  : 'opacity-0 scale-[0.94] blur-sm z-0 pointer-events-none'
              }`}
              style={{
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <Image
                src={slide.image}
                alt={`${slide.title} ${slide.highlightText}`}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                quality={92}
                className="object-cover object-center w-full h-full brightness-[0.84] contrast-[1.04]"
              />
            </div>
          );
        })}

        {/* Natural Subtle Scrim: Clean, Open, Responsive */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-transparent" />
      </div>

      {/* 2. Main Open Foreground Content (Fluid, Responsive Typography) */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-14 w-full h-full flex flex-col justify-between">
        
        {/* Top Spacer */}
        <div className="hidden sm:block h-1 sm:h-2" />

        {/* Center Content: Fluid Typography Scaled to Viewport */}
        <div className="max-w-3xl xl:max-w-4xl flex flex-col items-start text-left space-y-3.5 sm:space-y-4 md:space-y-5 my-auto">
          
          {/* Dynamic Top Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full border border-white/30 bg-black/40 text-[11px] sm:text-xs md:text-sm font-semibold backdrop-blur-md shadow-lg transition-all duration-500 hover:bg-black/60">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <BadgeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FBAB23]" />
            <span className="text-white font-medium tracking-wide truncate max-w-[260px] sm:max-w-none">{activeSlide.badge}</span>
          </div>

          {/* Main Headline & Subtitle with Responsive Breakpoints */}
          <div className="min-h-[160px] sm:min-h-[190px] md:min-h-[230px] lg:min-h-[250px] flex flex-col justify-center space-y-2.5 sm:space-y-3 md:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-black tracking-tight text-white leading-[1.18] sm:leading-[1.14] lg:leading-[1.08] font-heading drop-shadow-2xl">
              {activeSlide.title}{' '}
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-[#FBAB23] bg-clip-text text-transparent">
                {activeSlide.highlightText}
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-100/90 leading-relaxed font-normal max-w-xl md:max-w-2xl drop-shadow-lg">
              {activeSlide.subtitle}
            </p>
          </div>

          {/* Metrics Pill */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/35 border border-white/20 text-blue-200 text-[11px] sm:text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#FBAB23] flex-shrink-0" />
            <span className="text-white truncate">{activeSlide.metricsBadge}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 md:gap-4 w-full sm:w-auto pt-1">
            <Link
              href={activeSlide.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl font-bold text-xs sm:text-sm md:text-base text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              <span>{activeSlide.primaryCta.text}</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </Link>

            <Link
              href={activeSlide.secondaryCta.href}
              className="inline-flex items-center justify-center px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 md:py-4 rounded-xl font-semibold text-xs sm:text-sm md:text-base text-white bg-black/40 hover:bg-black/60 border border-white/25 backdrop-blur-md transition-all duration-200 text-center"
            >
              {activeSlide.secondaryCta.text}
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-3 sm:pt-3.5 border-t border-white/20 w-full flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-[11px] sm:text-xs text-slate-200">
            <div className="flex items-center gap-1.5 font-medium drop-shadow">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
              <span>Single-Offer Protection</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium drop-shadow">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
              <span>Multi-Resume Cloud Vault</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium drop-shadow">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
              <span>NIRF Accreditation Ready</span>
            </div>
          </div>

        </div>

        {/* 3. Bottom Minimalist Segmented Indicator Bar */}
        <div className="w-full pt-4 sm:pt-6 pb-1 sm:pb-2 border-t border-white/20">
          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-lg md:max-w-xl">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              const isPast = index < currentSlide;

              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className="group flex flex-col gap-1 sm:gap-1.5 text-left cursor-pointer focus:outline-none"
                  aria-label={`Slide ${index + 1}`}
                >
                  <div className="w-full h-1 sm:h-1.5 rounded-full bg-white/25 overflow-hidden backdrop-blur-sm">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        isActive
                          ? 'w-full bg-gradient-to-r from-blue-400 via-sky-300 to-[#FBAB23]'
                          : isPast
                          ? 'w-full bg-white/70'
                          : 'w-0 bg-transparent'
                      }`}
                    />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-wider font-mono transition-colors ${
                    isActive ? 'text-[#FBAB23]' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    0{index + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
