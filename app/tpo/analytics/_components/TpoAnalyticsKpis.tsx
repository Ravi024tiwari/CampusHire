'use client';

import React from 'react';
import { Users2, GraduationCap, Briefcase, PieChart, Building2, TrendingUp } from 'lucide-react';

export interface AnalyticsKpiItem {
  value: number | string;
  growth: string;
}

export interface AnalyticsKpisData {
  totalStudents: AnalyticsKpiItem;
  placementEligible: AnalyticsKpiItem;
  placedStudents: AnalyticsKpiItem;
  placementRate: AnalyticsKpiItem;
  recruitingCompanies: AnalyticsKpiItem;
}

interface TpoAnalyticsKpisProps {
  kpis: AnalyticsKpisData;
  isLoading?: boolean;
}

export function TpoAnalyticsKpis({ kpis, isLoading = false }: TpoAnalyticsKpisProps) {
  const cards = [
    {
      id: 'total-students',
      title: 'Total Students',
      value: kpis?.totalStudents?.value ?? 0,
      growth: kpis?.totalStudents?.growth || '+12% from last year',
      icon: Users2,
      iconBg: 'bg-blue-50 text-[#2563EB] border-blue-100/90',
    },
    {
      id: 'placement-eligible',
      title: 'Placement Eligible',
      value: kpis?.placementEligible?.value ?? 0,
      growth: kpis?.placementEligible?.growth || '+8% from last year',
      icon: GraduationCap,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100/90',
    },
    {
      id: 'placed-students',
      title: 'Placed Students',
      value: kpis?.placedStudents?.value ?? 0,
      growth: kpis?.placedStudents?.growth || '+18% from last year',
      icon: Briefcase,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100/90',
    },
    {
      id: 'placement-rate',
      title: 'Placement Rate',
      value: kpis?.placementRate?.value ?? '0%',
      growth: kpis?.placementRate?.growth || '+10% from last year',
      icon: PieChart,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100/90',
    },
    {
      id: 'recruiting-companies',
      title: 'Recruiting Companies',
      value: kpis?.recruitingCompanies?.value ?? 0,
      growth: kpis?.recruitingCompanies?.growth || '+25% from last year',
      icon: Building2,
      iconBg: 'bg-sky-50 text-sky-600 border-sky-100/90',
    },
  ];

  return (
    <div className="space-y-1.5">
      {/* 
        Responsive Container:
        - Mobile & Tablet (<lg): Smooth horizontal swipeable row with scroll snap and hidden scrollbars
        - Desktop (lg+): 5-column grid
      */}
      <div className="flex lg:grid lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-4 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 lg:px-0">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              className="min-w-[155px] xs:min-w-[175px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-0 flex-1 shrink-0 snap-start rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-3.5 sm:p-4 lg:p-5 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between gap-2.5">
                <div className="min-w-0 flex-1">
                  {isLoading ? (
                    <div className="h-6 sm:h-8 w-16 sm:w-20 bg-slate-100 animate-pulse rounded-md" />
                  ) : (
                    <h3 className="text-lg sm:text-2xl lg:text-[26px] font-black text-[#0A2540] tracking-tight font-heading">
                      {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                    </h3>
                  )}
                  <p className="text-[11px] sm:text-xs font-bold text-slate-500 truncate mt-0.5">
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

              {/* Growth percentage tag */}
              <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-600 truncate">
                <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-emerald-500" />
                <span className="truncate">{card.growth}</span>
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
