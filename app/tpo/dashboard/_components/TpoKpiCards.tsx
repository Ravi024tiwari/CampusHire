'use client';

import React from 'react';
import { Users, Briefcase, Building2, Award, TrendingUp } from 'lucide-react';
import type { TpoDashboardData } from '@/store/useTpoStore';

interface TpoKpiCardsProps {
  metrics: TpoDashboardData['metrics'];
}

export function TpoKpiCards({ metrics }: TpoKpiCardsProps) {
  const cards = [
    {
      title: 'Total Students',
      value: metrics?.totalStudents?.value?.toLocaleString() || '2,482',
      growth: metrics?.totalStudents?.growth || '↑ 12% from last year',
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      title: 'Job Opportunities',
      value: metrics?.jobOpportunities?.value?.toLocaleString() || '186',
      growth: metrics?.jobOpportunities?.growth || '↑ 28% from last year',
      icon: Briefcase,
      iconBg: 'bg-sky-50 text-sky-600 border-sky-100',
    },
    {
      title: 'Recruiter Companies',
      value: metrics?.recruiterCompanies?.value?.toLocaleString() || '64',
      growth: metrics?.recruiterCompanies?.growth || '↑ 18% from last year',
      icon: Building2,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      title: 'Students Placed',
      value: metrics?.studentsPlaced?.value?.toLocaleString() || '142',
      growth: metrics?.studentsPlaced?.growth || '↑ 16% from last year',
      icon: Award,
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
    },
  ];

  return (
    <div className="space-y-1.5">
      {/* 
        Responsive Container:
        - Small/Medium screens (<lg): Smooth horizontal swipeable row with scroll snap and hidden scrollbars
        - Large screens (lg+): Crisp 4-column grid
      */}
      <div className="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 lg:px-0">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="min-w-[190px] xs:min-w-[215px] sm:min-w-[240px] md:min-w-[270px] lg:min-w-0 flex-1 shrink-0 snap-start rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border flex items-center justify-center shadow-2xs shrink-0 ${card.iconBg}`}>
                  <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
                    {card.value}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 truncate">
                    {card.title}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 font-mono">
                <TrendingUp className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                <span>{card.growth}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Swipe prompt hint on small devices (<lg) */}
      <div className="flex lg:hidden items-center justify-center gap-1 text-[10px] text-slate-400 font-medium pt-0.5 select-none">
        <span>← Swipe cards to explore →</span>
      </div>
    </div>
  );
}
