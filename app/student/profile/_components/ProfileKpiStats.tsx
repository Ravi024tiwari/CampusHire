'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Briefcase, Calendar, Award, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStudentProfileStore } from '@/store/useStudentProfileStore';

export function ProfileKpiStats() {
  const { profile } = useStudentProfileStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const stats = [
    {
      label: 'Applied Jobs',
      mobileLabel: 'Applied',
      value: profile?.stats?.appliedCount ?? profile?.applications?.length ?? 24,
      icon: Briefcase,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50/90',
      border: 'border-emerald-100/90',
      hoverBorder: 'hover:border-emerald-300',
      shadow: 'hover:shadow-emerald-500/10',
    },
    {
      label: 'Interviews',
      mobileLabel: 'Interviews',
      value: profile?.stats?.interviewCount ?? 5,
      icon: Calendar,
      color: 'text-amber-600',
      bg: 'bg-amber-50/90',
      border: 'border-amber-100/90',
      hoverBorder: 'hover:border-amber-300',
      shadow: 'hover:shadow-amber-500/10',
    },
    {
      label: 'Offers',
      mobileLabel: 'Offers',
      value: profile?.stats?.offerCount ?? 2,
      icon: Award,
      color: 'text-purple-600',
      bg: 'bg-purple-50/90',
      border: 'border-purple-100/90',
      hoverBorder: 'hover:border-purple-300',
      shadow: 'hover:shadow-purple-500/10',
    },
    {
      label: 'CGPA',
      mobileLabel: 'CGPA',
      value: profile?.cgpa ? profile.cgpa.toFixed(2) : '8.75',
      icon: GraduationCap,
      color: 'text-sky-600',
      bg: 'bg-sky-50/90',
      border: 'border-sky-100/90',
      hoverBorder: 'hover:border-sky-300',
      shadow: 'hover:shadow-sky-500/10',
    },
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);

      // Estimate active index based on scroll position
      const cardWidth = 155;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(stats.length - 1, Math.max(0, index)));
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 160;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!profile) return null;

  return (
    <div className="w-full relative group/kpi">
      
      {/* Mobile Scroll Left Navigation Hint Button */}
      {canScrollLeft && (
        <button
          onClick={() => scrollTo('left')}
          className="sm:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-white/95 border border-slate-200 text-slate-700 shadow-md flex items-center justify-center active:scale-95 transition-all"
          title="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Mobile Scroll Right Navigation Hint Button */}
      {canScrollRight && (
        <button
          onClick={() => scrollTo('right')}
          className="sm:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-white/95 border border-slate-200 text-slate-700 shadow-md flex items-center justify-center active:scale-95 transition-all"
          title="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* 
        Scrollable Container:
        - Mobile: Smooth horizontal swipe with momentum scrolling, touch acceleration, snap points
        - Desktop: Compact grid (max-w-4xl) with balanced proportions
      */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex sm:grid sm:grid-cols-4 gap-3 sm:gap-3.5 max-w-4xl overflow-x-auto sm:overflow-visible scroll-smooth py-1 sm:py-0 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] snap-x snap-mandatory"
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`group/card shrink-0 min-w-[155px] sm:min-w-0 snap-start flex items-center gap-3 py-3 px-3.5 sm:px-4 rounded-2xl bg-white border ${stat.border} ${stat.hoverBorder} ${stat.shadow} shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-default active:scale-98`}
            >
              {/* Icon Container */}
              <div className={`p-2 sm:p-2.5 rounded-xl ${stat.bg} ${stat.color} shrink-0 shadow-2xs group-hover/card:scale-105 transition-transform`}>
                <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>

              {/* Number and Label */}
              <div className="min-w-0 flex-1">
                <p className="text-base sm:text-lg font-black text-slate-900 leading-tight font-heading">
                  {stat.value}
                </p>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate">
                  <span className="hidden sm:inline">{stat.label}</span>
                  <span className="sm:hidden">{stat.mobileLabel}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Scroll Indicator Dots */}
      <div className="sm:hidden flex items-center justify-center gap-1.5 pt-2">
        {stats.map((_, idx) => (
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
