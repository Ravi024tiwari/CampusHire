'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Briefcase, 
  Users, 
  Award,
  TrendingUp, 
  ArrowUpRight,
  FileText,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { RecruiterJobItem, useRecruiterJobsStore } from '@/store/useRecruiterJobsStore';

interface RecruiterJobsStatsProps {
  jobs: RecruiterJobItem[];
  totalColleges?: number;
}

export function RecruiterJobsStats({ jobs }: RecruiterJobsStatsProps) {
  const { filters, setFilter } = useRecruiterJobsStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartLeft, setScrollStartLeft] = useState(0);

  const totalJobs = jobs.length > 0 ? jobs.length : 24;
  const liveJobs = jobs.length > 0 ? jobs.filter((j) => j.status === 'ACTIVE').length : 18;
  const totalApplications = jobs.length > 0 
    ? jobs.reduce((acc, curr) => acc + (curr._count?.applications || 0), 0)
    : 1240;
  const totalOffers = jobs.length > 0
    ? jobs.reduce((acc, curr) => acc + (curr._count?.offers || 0), 0)
    : 36;

  const stats = [
    {
      id: 'jobs-posted',
      label: 'Jobs Posted',
      value: totalJobs.toLocaleString(),
      subtext: '+12% from last month',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
      icon: FileText,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100/80 group-hover:bg-blue-600 group-hover:text-white',
      accentGlow: 'hover:shadow-blue-500/10 hover:border-blue-300',
      activeRing: 'border-blue-600 ring-2 ring-blue-600/15 shadow-md bg-blue-50/20',
      sparkGradientId: 'sparkBlue',
      sparkLine: 'M0 24 Q 25 8, 50 16 T 100 6',
      sparkArea: 'M0 24 Q 25 8, 50 16 T 100 6 L 100 30 L 0 30 Z',
      strokeColor: '#2563EB',
      gradientStart: '#93C5FD',
      onClick: () => {
        setFilter('selectedStatus', 'ALL');
        setFilter('sortBy', 'latest');
      },
      isActive: filters.selectedStatus === 'ALL' && filters.sortBy !== 'applications',
      filterHint: 'View all jobs',
    },
    {
      id: 'live-jobs',
      label: 'Live Jobs',
      value: liveJobs.toLocaleString(),
      subtext: 'Currently active',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
      icon: Briefcase,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100/80 group-hover:bg-emerald-600 group-hover:text-white',
      accentGlow: 'hover:shadow-emerald-500/10 hover:border-emerald-300',
      activeRing: 'border-emerald-600 ring-2 ring-emerald-600/15 shadow-md bg-emerald-50/20',
      sparkGradientId: 'sparkGreen',
      sparkLine: 'M0 22 Q 30 18, 55 10 T 100 4',
      sparkArea: 'M0 22 Q 30 18, 55 10 T 100 4 L 100 30 L 0 30 Z',
      strokeColor: '#10B981',
      gradientStart: '#A7F3D0',
      onClick: () => setFilter('selectedStatus', 'ACTIVE'),
      isActive: filters.selectedStatus === 'ACTIVE',
      filterHint: 'Filter active only',
    },
    {
      id: 'total-applications',
      label: 'Total Applications',
      value: totalApplications.toLocaleString(),
      subtext: '+28% from last month',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/70',
      icon: Users,
      iconBg: 'bg-purple-50 text-purple-600 border border-purple-100/80 group-hover:bg-purple-600 group-hover:text-white',
      accentGlow: 'hover:shadow-purple-500/10 hover:border-purple-300',
      activeRing: 'border-purple-600 ring-2 ring-purple-600/15 shadow-md bg-purple-50/20',
      sparkGradientId: 'sparkPurple',
      sparkLine: 'M0 26 Q 20 20, 48 10 T 100 3',
      sparkArea: 'M0 26 Q 20 20, 48 10 T 100 3 L 100 30 L 0 30 Z',
      strokeColor: '#8B5CF6',
      gradientStart: '#DDD6FE',
      onClick: () => setFilter('sortBy', 'applications'),
      isActive: filters.sortBy === 'applications',
      filterHint: 'Sort by applications',
    },
    {
      id: 'offers-made',
      label: 'Offers Made',
      value: totalOffers.toLocaleString(),
      subtext: '+20% this session',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/70',
      icon: Award,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100/80 group-hover:bg-amber-600 group-hover:text-white',
      accentGlow: 'hover:shadow-amber-500/10 hover:border-amber-300',
      activeRing: 'border-amber-600 ring-2 ring-amber-600/15 shadow-md bg-amber-50/20',
      sparkGradientId: 'sparkAmber',
      sparkLine: 'M0 25 Q 35 15, 60 8 T 100 5',
      sparkArea: 'M0 25 Q 35 15, 60 8 T 100 5 L 100 30 L 0 30 Z',
      strokeColor: '#F59E0B',
      gradientStart: '#FDE68A',
      onClick: () => {
        // Can toggle status or highlight offers
        setFilter('selectedStatus', 'ALL');
      },
      isActive: false,
      filterHint: 'Offer conversion rate',
    },
  ];

  // Check scroll position and update navigation buttons + active index indicator
  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < maxScroll - 6);

    // Calculate approximate active card index based on scroll width per item
    if (clientWidth < scrollWidth) {
      const cardWidth = el.querySelector('div[data-kpi-card]')?.clientWidth || 240;
      const index = Math.min(
        stats.length - 1,
        Math.max(0, Math.round(scrollLeft / (cardWidth + 12)))
      );
      setActiveIndex(index);
    }
  }, [stats.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    window.addEventListener('resize', updateScrollState);

    return () => {
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Smooth scroll handler for buttons
  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const cardWidth = el.querySelector('div[data-kpi-card]')?.clientWidth || 260;
    const scrollAmount = (cardWidth + 16) * (direction === 'left' ? -1 : 1);

    el.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  // Drag to scroll for desktop/mouse users
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollStartLeft(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();

    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.3;
    scrollContainerRef.current.scrollLeft = scrollStartLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section 
      aria-label="Jobs Analytics KPIs" 
      className="relative w-full group/kpis select-none"
    >
      {/* Left Scroll Navigation Button (Visible on medium/small screens when scrollable) */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => handleScroll('left')}
          aria-label="Scroll KPIs left"
          className="lg:hidden absolute -left-2.5 sm:-left-3 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg border border-slate-200/90 backdrop-blur-xs hover:bg-white hover:text-blue-600 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Right Scroll Navigation Button (Visible on medium/small screens when scrollable) */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => handleScroll('right')}
          aria-label="Scroll KPIs right"
          className="lg:hidden absolute -right-2.5 sm:-right-3 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg border border-slate-200/90 backdrop-blur-xs hover:bg-white hover:text-blue-600 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Left Edge Fade Mask */}
      <div 
        className={`lg:hidden pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-slate-50 to-transparent z-10 transition-opacity duration-300 ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Right Edge Fade Mask */}
      <div 
        className={`lg:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-slate-50 to-transparent z-10 transition-opacity duration-300 ${
          canScrollRight ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 
        Scrollable Container:
        - Mobile/Tablet: Horizontal smooth scrolling carousel with snap-x alignment
        - Large screens: 4-column dynamic grid
      */}
      <div
        ref={scrollContainerRef}
        onScroll={updateScrollState}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`
          flex lg:grid lg:grid-cols-4 
          gap-3 sm:gap-4 lg:gap-5 
          overflow-x-auto lg:overflow-visible 
          scroll-smooth 
          snap-x snap-mandatory lg:snap-none 
          py-1.5 lg:py-0 
          -mx-3 px-3 sm:-mx-4 sm:px-4 lg:mx-0 lg:px-0 
          [scrollbar-width:none] 
          [-ms-overflow-style:none] 
          [&::-webkit-scrollbar]:hidden 
          ${isDragging ? 'cursor-grabbing' : 'cursor-default'}
        `}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              data-kpi-card
              onClick={stat.onClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  stat.onClick();
                }
              }}
              className={`
                group relative flex flex-col justify-between 
                shrink-0 snap-start lg:shrink
                w-[220px] xs:w-[245px] sm:w-[270px] md:w-[290px] lg:w-auto 
                min-w-[215px] sm:min-w-[260px] lg:min-w-0
                rounded-2xl sm:rounded-3xl border bg-white 
                p-3.5 sm:p-4.5 lg:p-5 
                shadow-2xs hover:shadow-xl 
                hover:-translate-y-1
                transition-all duration-300 
                cursor-pointer overflow-hidden
                ${stat.isActive ? stat.activeRing : 'border-slate-200/90 hover:border-slate-300'}
                ${stat.accentGlow}
              `}
            >
              {/* Subtle top background highlight */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-slate-100/40 via-transparent to-transparent rounded-bl-full pointer-events-none -z-0 group-hover:scale-110 transition-transform duration-500" />

              {/* Top row: Icon, Sparkline & Active Indicator */}
              <div className="relative z-10 flex items-start justify-between gap-2">
                <div className={`flex h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 items-center justify-center rounded-xl sm:rounded-2xl ${stat.iconBg} shadow-2xs transition-all duration-300 shrink-0`}>
                  <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Sparkline mini chart */}
                <div className="w-16 sm:w-20 lg:w-22 h-5 sm:h-6 shrink-0 opacity-75 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id={stat.sparkGradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={stat.gradientStart} stopOpacity="0.75" />
                        <stop offset="100%" stopColor={stat.gradientStart} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={stat.sparkArea}
                      fill={`url(#${stat.sparkGradientId})`}
                    />
                    <path
                      d={stat.sparkLine}
                      fill="none"
                      stroke={stat.strokeColor}
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Middle: Metric Number & Label */}
              <div className="relative z-10 mt-3 sm:mt-4">
                <div className="flex items-baseline justify-between gap-1">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[#0A2540] font-heading tabular-nums leading-tight">
                    {stat.value}
                  </h3>
                  {stat.isActive && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-200/60 animate-in fade-in duration-200">
                      Active Filter
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1 group-hover:text-slate-700 transition-colors leading-snug">
                  {stat.label}
                </p>
              </div>

              {/* Bottom: Trend Badge / Subtext */}
              <div className="relative z-10 mt-3 pt-2.5 border-t border-slate-100/90 flex items-center justify-between gap-1.5">
                <span className={`inline-flex items-center gap-1 text-[10.5px] sm:text-xs font-black px-2 py-0.5 rounded-lg border ${stat.badgeColor} shrink-0 leading-tight`}>
                  <TrendingUp className="w-3 h-3 shrink-0" />
                  <span className="truncate max-w-[140px] sm:max-w-none">{stat.subtext}</span>
                </span>

                <span 
                  title={stat.filterHint}
                  className="flex items-center justify-center text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile / Tablet Pagination Dots */}
      <div 
        aria-hidden="true" 
        className="lg:hidden flex items-center justify-center gap-1.5 pt-3"
      >
        {stats.map((stat, idx) => (
          <button
            key={stat.id}
            type="button"
            onClick={() => {
              const el = scrollContainerRef.current;
              if (!el) return;
              const cardWidth = el.querySelector('div[data-kpi-card]')?.clientWidth || 240;
              el.scrollTo({
                left: idx * (cardWidth + 16),
                behavior: 'smooth',
              });
            }}
            aria-label={`Go to ${stat.label}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === idx
                ? 'w-5 bg-blue-600'
                : 'w-1.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
