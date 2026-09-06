'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Briefcase, 
  Users, 
  Award,
  GraduationCap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useRecruiterCompanyStore } from '@/store/useRecruiterCompanyStore';

interface CompanyKpisRowProps {
  stats: {
    activeJobs: number;
    totalApplications: number;
    totalOffers: number;
    totalDrives: number;
  };
}

export function CompanyKpisRow({ stats }: CompanyKpisRowProps) {
  const { setActiveTab } = useRecruiterCompanyStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    {
      id: 'active-jobs',
      title: 'Active Jobs',
      value: stats.activeJobs.toLocaleString(),
      subtext: 'Currently live',
      subtextColor: 'text-blue-700 bg-blue-50/90 border-blue-200/80',
      icon: Briefcase,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      border: 'border-slate-200/90',
      hoverBorder: 'hover:border-blue-300',
      onClick: () => setActiveTab('jobs'),
    },
    {
      id: 'total-applications',
      title: 'Total Applications',
      value: stats.totalApplications.toLocaleString(),
      subtext: '+28% vs last month',
      subtextColor: 'text-emerald-700 bg-emerald-50/90 border-emerald-200/80',
      icon: Users,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      border: 'border-slate-200/90',
      hoverBorder: 'hover:border-emerald-300',
      onClick: () => setActiveTab('analytics'),
    },
    {
      id: 'offers-made',
      title: 'Offers Made',
      value: stats.totalOffers.toLocaleString(),
      subtext: 'Campus placements',
      subtextColor: 'text-purple-700 bg-purple-50/90 border-purple-200/80',
      icon: Award,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      border: 'border-slate-200/90',
      hoverBorder: 'hover:border-purple-300',
      onClick: () => setActiveTab('analytics'),
    },
    {
      id: 'campus-drives',
      title: 'Campus Drives',
      value: stats.totalDrives.toLocaleString(),
      subtext: 'Target institutions',
      subtextColor: 'text-amber-700 bg-amber-50/90 border-amber-200/80',
      icon: GraduationCap,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      border: 'border-slate-200/90',
      hoverBorder: 'hover:border-amber-300',
      onClick: () => setActiveTab('jobs'),
    },
  ];

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);

      const cardWidth = 165;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(cards.length - 1, Math.max(0, index)));
    }
  }, [cards.length]);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -180 : 180,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full relative group/kpis select-none">
      
      {/* Mobile Scroll Arrows */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollTo('left')}
          className="lg:hidden absolute -left-1 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-white/95 border border-slate-200 text-slate-700 shadow-md flex items-center justify-center active:scale-95 transition-all cursor-pointer"
          title="Scroll Left"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollTo('right')}
          className="lg:hidden absolute -right-1 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-white/95 border border-slate-200 text-slate-700 shadow-md flex items-center justify-center active:scale-95 transition-all cursor-pointer"
          title="Scroll Right"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Unified KPI Grid / Carousel matching dashboard & job pages */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-3.5 lg:gap-4 overflow-x-auto lg:overflow-visible scroll-smooth py-1 lg:py-0 -mx-3 px-3 sm:mx-0 sm:px-0 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] snap-x snap-mandatory"
      >
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={card.onClick}
              className={`group/card shrink-0 w-[155px] xs:w-[165px] sm:w-[180px] lg:w-auto min-w-[150px] lg:min-w-0 snap-start flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-white border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer select-none ${card.border} ${card.hoverBorder} shadow-2xs hover:shadow-md`}
            >
              {/* Top Row: Title + Chevron */}
              <div className="flex items-center justify-between gap-1.5 pb-1">
                <span className="text-[11.5px] sm:text-xs font-bold text-slate-500 truncate leading-tight">
                  {card.title}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/card:text-slate-600 transition-colors shrink-0" />
              </div>

              {/* Middle Row: Icon + Metric Value */}
              <div className="flex items-center gap-2.5 my-1.5">
                <div className={`p-2 rounded-xl ${card.iconBg} ${card.iconColor} shrink-0 shadow-2xs group-hover/card:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <span className="text-xl sm:text-2xl font-black text-[#0A2540] font-heading leading-tight tracking-tight">
                  {card.value}
                </span>
              </div>

              {/* Bottom Row: Growth Badge */}
              <div className="pt-1.5 border-t border-slate-100/80">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-bold border ${card.subtextColor} whitespace-nowrap leading-tight`}>
                  {card.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Indicator Dots */}
      <div className="lg:hidden flex items-center justify-center gap-1.5 pt-2">
        {cards.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === idx ? 'w-4 bg-blue-600' : 'w-1.5 bg-slate-300'
            }`}
          />
        ))}
      </div>

    </div>
  );
}
