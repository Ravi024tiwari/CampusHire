'use client';

import React from 'react';
import { Send, CheckCircle2, Percent, Building2, TrendingUp } from 'lucide-react';
import { AnalyticsKpiData } from '@/store/useRecruiterAnalyticsStore';

interface RecruiterAnalyticsKpiCardsProps {
  kpis: AnalyticsKpiData;
}

export function RecruiterAnalyticsKpiCards({ kpis }: RecruiterAnalyticsKpiCardsProps) {
  const cards = [
    {
      id: 'totalOffers',
      label: 'Total Offers',
      value: kpis.totalOffers.toLocaleString(),
      change: `+${kpis.totalOffersYoY}% from last year`,
      icon: Send,
      iconBg: 'bg-blue-50 text-blue-600',
      borderColor: 'border-slate-200/90 hover:border-blue-300 hover:shadow-md',
      changeColor: 'text-emerald-600',
    },
    {
      id: 'studentsPlaced',
      label: 'Students Placed',
      value: kpis.studentsPlaced.toLocaleString(),
      change: `+${kpis.studentsPlacedYoY}% from last year`,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600',
      borderColor: 'border-slate-200/90 hover:border-emerald-300 hover:shadow-md',
      changeColor: 'text-emerald-700 font-bold',
    },
    {
      id: 'placementRate',
      label: 'Placement Rate',
      value: `${kpis.placementRate}%`,
      change: `+${kpis.placementRateYoY}% from last year`,
      icon: Percent,
      iconBg: 'bg-purple-50 text-purple-600',
      borderColor: 'border-slate-200/90 hover:border-purple-300 hover:shadow-md',
      changeColor: 'text-purple-700 font-semibold',
    },
    {
      id: 'partnerColleges',
      label: 'Partner Colleges',
      value: kpis.partnerColleges.toLocaleString(),
      change: `+${kpis.partnerCollegesYoY}% from last year`,
      icon: Building2,
      iconBg: 'bg-teal-50 text-teal-600',
      borderColor: 'border-slate-200/90 hover:border-teal-300 hover:shadow-md',
      changeColor: 'text-teal-700 font-semibold',
    },
  ];

  return (
    <div className="space-y-2">
      {/* 4-Column Grid on Desktop, Fluid Horizontal Swipeable Carousel on Mobile & Tablet */}
      <div className="flex xl:grid xl:grid-cols-4 gap-3.5 sm:gap-4.5 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 xl:px-0">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              className={`min-w-[210px] xs:min-w-[240px] sm:min-w-[260px] xl:min-w-0 flex-1 shrink-0 snap-start p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border shadow-2xs transition-all duration-300 flex items-center gap-3.5 sm:gap-4 cursor-pointer group ${card.borderColor}`}
            >
              <div
                className={`h-11 w-11 sm:h-12 sm:w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${card.iconBg}`}
              >
                <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1.5 sm:gap-2">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
                    {card.value}
                  </span>
                </div>
                <p className="text-xs sm:text-xs font-bold text-slate-700 truncate mt-0.5">
                  {card.label}
                </p>
                <div className="flex items-center gap-1 mt-0.5 text-[10.5px] sm:text-[11px] font-semibold text-emerald-600 truncate">
                  <TrendingUp className="w-3 h-3 shrink-0" />
                  <span className="truncate">{card.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex xl:hidden items-center justify-center gap-1 text-[10px] text-slate-400 font-medium pt-0.5">
        <span>← Swipe horizontally for all metrics →</span>
      </div>
    </div>
  );
}
