'use client';

import React from 'react';
import { Briefcase, Building2, Users2, Clock, TrendingUp } from 'lucide-react';

interface KpiData {
  totalJobs: number;
  recruitingCompanies: number;
  newThisWeek: number;
  closingSoon: number;
}

interface TpoJobsKpiCardsProps {
  kpis: KpiData;
  isLoading?: boolean;
  onCardClick?: (tab: 'all' | 'open' | 'closing_soon' | 'internships' | 'full_time') => void;
}

export function TpoJobsKpiCards({
  kpis,
  isLoading = false,
  onCardClick,
}: TpoJobsKpiCardsProps) {
  const cards = [
    {
      id: 'total-jobs',
      title: 'Total Jobs',
      value: kpis?.totalJobs ?? 0,
      trendText: '+ 28% from last year',
      icon: Briefcase,
      iconBg: 'bg-blue-50 text-[#2563EB] border-blue-100/90',
      targetTab: 'all' as const,
    },
    {
      id: 'recruiting-companies',
      title: 'Recruiting Companies',
      value: kpis?.recruitingCompanies ?? 0,
      trendText: '+ 18% from last year',
      icon: Building2,
      iconBg: 'bg-sky-50 text-sky-600 border-sky-100/90',
      targetTab: 'all' as const,
    },
    {
      id: 'new-this-week',
      title: 'New This Week',
      value: kpis?.newThisWeek ?? 0,
      trendText: '+ 33% from last week',
      icon: Users2,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100/90',
      targetTab: 'open' as const,
    },
    {
      id: 'closing-soon',
      title: 'Closing Soon',
      value: kpis?.closingSoon ?? 0,
      trendText: `${kpis?.closingSoon > 0 ? kpis.closingSoon : 0} closing in 7 days`,
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100/90',
      targetTab: 'closing_soon' as const,
    },
  ];

  return (
    <div className="space-y-1.5">
      {/* 
        Responsive Container:
        - Mobile & Tablet (<lg): Smooth horizontal swipeable row with scroll snap, hidden scrollbars and standard matching card dimensions
        - Desktop (lg+): Balanced 4-column grid
      */}
      <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 lg:px-0">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              onClick={() => onCardClick?.(card.targetTab)}
              className="min-w-[165px] xs:min-w-[190px] sm:min-w-[220px] md:min-w-[240px] lg:min-w-0 flex-1 shrink-0 snap-start rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-3.5 sm:p-5 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2.5">
                <div className="min-w-0 flex-1">
                  {isLoading ? (
                    <div className="h-6 sm:h-8 w-16 sm:w-20 bg-slate-100 animate-pulse rounded-md" />
                  ) : (
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-[#0A2540] tracking-tight font-heading">
                      {card.value.toLocaleString()}
                    </h3>
                  )}
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate mt-0.5">
                    {card.title}
                  </p>
                </div>

                {/* Icon Container */}
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border flex items-center justify-center shadow-2xs shrink-0 transition-transform group-hover:scale-105 duration-200 ${card.iconBg}`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              {/* Growth / Trend percentage tag */}
              <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-600 truncate">
                <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-emerald-500" />
                <span className="truncate">{card.trendText}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex lg:hidden items-center justify-center gap-1 text-[10px] text-slate-400 font-medium pt-0.5 select-none">
        <span>← Swipe cards to explore →</span>
      </div>
    </div>
  );
}
