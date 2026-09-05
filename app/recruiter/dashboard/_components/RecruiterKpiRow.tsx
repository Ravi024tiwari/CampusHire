'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  Bookmark, 
  Calendar, 
  Award, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { RecruiterKpis } from '../_types/recruiter-dashboard.types';

interface RecruiterKpiRowProps {
  kpis: RecruiterKpis;
}

export function RecruiterKpiRow({ kpis }: RecruiterKpiRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalJobs = kpis.totalJobs ?? kpis.activeDrives ?? 12;
  const totalApps = kpis.totalApplications ?? kpis.totalApplicants ?? 1240;
  const shortlisted = kpis.shortlisted ?? kpis.shortlistedCandidates ?? 320;
  const interviews = kpis.interviews ?? 64;
  const offers = kpis.offers ?? kpis.confirmedHires ?? 18;

  const cards = [
    {
      title: 'Total Jobs',
      value: totalJobs,
      subtext: kpis.jobsGrowth || '+2 this month',
      subtextColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
      icon: FileText,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50/90',
      border: 'border-blue-100/90',
      hoverBorder: 'hover:border-blue-300',
      shadow: 'hover:shadow-blue-500/10',
    },
    {
      title: 'Total Applications',
      value: totalApps.toLocaleString(),
      subtext: kpis.applicationsGrowth || '+18% vs last month',
      subtextColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
      icon: Users,
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-50/90',
      border: 'border-teal-100/90',
      hoverBorder: 'hover:border-teal-300',
      shadow: 'hover:shadow-teal-500/10',
    },
    {
      title: 'Shortlisted',
      value: shortlisted,
      subtext: kpis.shortlistedPercent || '26% of total',
      subtextColor: 'text-purple-700 bg-purple-50 border-purple-100',
      icon: Bookmark,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50/90',
      border: 'border-purple-100/90',
      hoverBorder: 'hover:border-purple-300',
      shadow: 'hover:shadow-purple-500/10',
    },
    {
      title: 'Interviews',
      value: interviews,
      subtext: kpis.interviewsPercent || '5% of total',
      subtextColor: 'text-amber-700 bg-amber-50 border-amber-100',
      icon: Calendar,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50/90',
      border: 'border-amber-100/90',
      hoverBorder: 'hover:border-amber-300',
      shadow: 'hover:shadow-amber-500/10',
    },
    {
      title: 'Offers',
      value: offers,
      subtext: kpis.offersPercent || '1.5% of total',
      subtextColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
      icon: Award,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50/90',
      border: 'border-emerald-100/90',
      hoverBorder: 'hover:border-emerald-300',
      shadow: 'hover:shadow-emerald-500/10',
    },
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);

      const cardWidth = 160;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(cards.length - 1, Math.max(0, index)));
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -180 : 180,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full relative group/kpis">
      
      {/* Mobile Scroll Hint Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scrollTo('left')}
          className="lg:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-white/95 border border-slate-200 text-slate-700 shadow-md flex items-center justify-center active:scale-95 transition-all"
          title="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scrollTo('right')}
          className="lg:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-white/95 border border-slate-200 text-slate-700 shadow-md flex items-center justify-center active:scale-95 transition-all"
          title="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* 
        Responsive Row:
        - Mobile & Tablet: Smooth horizontal touch scroll with snap points
        - Desktop: 5-column balanced grid
      */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex lg:grid lg:grid-cols-5 gap-3.5 overflow-x-auto lg:overflow-visible scroll-smooth py-1 lg:py-0 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] snap-x snap-mandatory"
      >
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`group/card shrink-0 min-w-[170px] lg:min-w-0 snap-start flex flex-col justify-between p-4 rounded-2xl bg-white border ${card.border} ${card.hoverBorder} ${card.shadow} shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-default`}
            >
              {/* Top Row: Icon + Arrow */}
              <div className="flex items-center justify-between gap-2 pb-2">
                <div className={`p-2 rounded-xl ${card.iconBg} ${card.iconColor} shrink-0 shadow-2xs group-hover/card:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/card:text-slate-500 transition-colors" />
              </div>

              {/* Middle: Title & Value */}
              <div className="space-y-0.5 my-1">
                <p className="text-[11.5px] font-semibold text-slate-500 truncate">
                  {card.title}
                </p>
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-tight font-heading">
                  {card.value}
                </p>
              </div>

              {/* Bottom: Growth Badge */}
              <div className="pt-2 border-t border-slate-100">
                <span className={`inline-block px-2 py-0.5 rounded-md text-[10.5px] font-bold border ${card.subtextColor}`}>
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
