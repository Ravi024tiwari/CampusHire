'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Briefcase, 
  Users, 
  Award,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { RecruiterJobItem, useRecruiterJobsStore } from '@/store/useRecruiterJobsStore';

interface RecruiterJobsStatsProps {
  jobs: RecruiterJobItem[];
  totalColleges?: number;
}

export function RecruiterJobsStats({ jobs }: RecruiterJobsStatsProps) {
  const { filters, setFilter } = useRecruiterJobsStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalJobs = jobs.length > 0 ? jobs.length : 24;
  const liveJobs = jobs.length > 0 ? jobs.filter((j) => j.status === 'ACTIVE').length : 18;
  const totalApplications = jobs.length > 0 
    ? jobs.reduce((acc, curr) => acc + (curr._count?.applications || 0), 0)
    : 1240;
  const totalOffers = jobs.length > 0
    ? jobs.reduce((acc, curr) => acc + (curr._count?.offers || 0), 0)
    : 36;

  const cards = [
    {
      id: 'jobs-posted',
      title: 'Jobs Posted',
      value: totalJobs.toLocaleString(),
      subtext: '+12% this month',
      subtextColor: 'text-blue-700 bg-blue-50/90 border-blue-200/80',
      icon: FileText,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      border: 'border-slate-200/90',
      hoverBorder: 'hover:border-blue-300',
      onClick: () => {
        setFilter('selectedStatus', 'ALL');
        setFilter('sortBy', 'latest');
      },
      isActive: filters.selectedStatus === 'ALL' && filters.sortBy !== 'applications',
    },
    {
      id: 'live-jobs',
      title: 'Live Jobs',
      value: liveJobs.toLocaleString(),
      subtext: 'Currently active',
      subtextColor: 'text-emerald-700 bg-emerald-50/90 border-emerald-200/80',
      icon: Briefcase,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      border: 'border-slate-200/90',
      hoverBorder: 'hover:border-emerald-300',
      onClick: () => setFilter('selectedStatus', 'ACTIVE'),
      isActive: filters.selectedStatus === 'ACTIVE',
    },
    {
      id: 'total-applications',
      title: 'Applications',
      value: totalApplications.toLocaleString(),
      subtext: '+28% vs last month',
      subtextColor: 'text-sky-700 bg-sky-50/90 border-sky-200/80',
      icon: Users,
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-50',
      border: 'border-slate-200/90',
      hoverBorder: 'hover:border-sky-300',
      onClick: () => setFilter('sortBy', 'applications'),
      isActive: filters.sortBy === 'applications',
    },
    {
      id: 'offers-made',
      title: 'Offers Made',
      value: totalOffers.toLocaleString(),
      subtext: '+20% this session',
      subtextColor: 'text-emerald-700 bg-emerald-50/90 border-emerald-200/80',
      icon: Award,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      border: 'border-slate-200/90',
      hoverBorder: 'hover:border-emerald-300',
      onClick: () => setFilter('selectedStatus', 'ALL'),
      isActive: false,
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
      
      {/* Mobile Scroll Hint Buttons */}
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

      {/* 
        Responsive Unified KPI Row:
        - Exact Match to Dashboard KPI dimensions
        - Top: Title + Chevron
        - Middle: Icon + Big Bold Number
        - Bottom: Clean full-width Growth Badge
        - Desktop: 4-column balanced grid
        - Mobile & Tablet: Smooth horizontal snap scroll carousel
      */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-3.5 lg:gap-4 overflow-x-auto lg:overflow-visible scroll-smooth py-1 lg:py-0 -mx-3 px-3 sm:mx-0 sm:px-0 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] snap-x snap-mandatory"
      >
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={card.onClick}
              className={`flex-none w-[170px] sm:w-[200px] lg:w-auto snap-start p-3 sm:p-3.5 lg:p-4 rounded-2xl bg-white border transition-all duration-200 cursor-pointer group/card flex flex-col justify-between ${
                card.isActive
                  ? 'border-blue-600 ring-2 ring-blue-600/15 shadow-sm bg-blue-50/15'
                  : `${card.border} ${card.hoverBorder} shadow-2xs hover:shadow-md`
              }`}
            >
              {/* Top Row: Title + Chevron */}
              <div className="flex items-center justify-between gap-1.5 pb-1">
                <span className={`text-[11.5px] sm:text-xs font-bold truncate leading-tight ${card.isActive ? 'text-blue-700 font-black' : 'text-slate-500'}`}>
                  {card.title}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 transition-colors shrink-0 ${card.isActive ? 'text-blue-600' : 'text-slate-300 group-hover/card:text-slate-600'}`} />
              </div>

              {/* Middle Row: Icon + Metric Value */}
              <div className="flex items-center gap-2.5 my-1.5">
                <div className={`p-2 rounded-xl ${card.iconBg} ${card.iconColor} shrink-0 shadow-2xs group-hover/card:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-heading leading-tight tracking-tight">
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
              activeIndex === idx
                ? 'w-4 bg-blue-600'
                : 'w-1.5 bg-slate-300'
            }`}
          />
        ))}
      </div>

    </div>
  );
}
