'use strict';
'use client';

import React from 'react';
import { 
  Inbox, 
  Clock, 
  Users2, 
  Award, 
  Briefcase, 
  XCircle, 
  TrendingUp 
} from 'lucide-react';
import { TpoApplicationsKpis as KpiType } from '../_types/tpo-applications.types';

interface TpoApplicationsKpisProps {
  kpis: KpiType;
  selectedStatus: string;
  onSelectStatus: (status: any) => void;
  isLoading?: boolean;
}

export function TpoApplicationsKpis({
  kpis,
  selectedStatus,
  onSelectStatus,
  isLoading = false,
}: TpoApplicationsKpisProps) {
  const cards = [
    {
      id: 'ALL',
      title: 'Total Applications',
      value: kpis?.total?.value ?? 1240,
      growth: kpis?.total?.growth || '+ 18% from last month',
      icon: Inbox,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      id: 'UNDER_REVIEW',
      title: 'Under Review',
      value: kpis?.underReview?.value ?? 520,
      growth: kpis?.underReview?.growth || '+ 12% from last month',
      icon: Clock,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      id: 'SHORTLISTED',
      title: 'Shortlisted',
      value: kpis?.shortlisted?.value ?? 380,
      growth: kpis?.shortlisted?.growth || '+ 24% from last month',
      icon: Users2,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      id: 'INTERVIEW_SCHEDULED',
      title: 'Interviewed',
      value: kpis?.interviewed?.value ?? 220,
      growth: kpis?.interviewed?.growth || '+ 16% from last month',
      icon: Award,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      id: 'OFFERED',
      title: 'Offers Received',
      value: kpis?.offersReceived?.value ?? 120,
      growth: kpis?.offersReceived?.growth || '+ 20% from last month',
      icon: Briefcase,
      iconBg: 'bg-teal-50 text-teal-600 border-teal-100',
    },
  ];

  return (
    <div className="space-y-1.5">
      {/* 
        Responsive Container:
        - Mobile & Tablet (<lg): Smooth horizontal swipeable row with scroll snap, hidden scrollbars and matching compact card dimensions
        - Desktop (lg+): Balanced 5-column grid
      */}
      <div className="flex lg:grid lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 lg:px-0">
        {cards.map((card) => {
          const Icon = card.icon;
          const isSelected = selectedStatus === card.id;

          return (
            <div
              key={card.id}
              onClick={() => onSelectStatus(card.id)}
              className={`min-w-[165px] xs:min-w-[190px] sm:min-w-[220px] md:min-w-[240px] lg:min-w-0 flex-1 shrink-0 snap-start rounded-2xl sm:rounded-3xl border bg-white p-3.5 sm:p-5 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50/20 shadow-xs'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2.5">
                <div className="min-w-0 flex-1">
                  {isLoading ? (
                    <div className="h-6 sm:h-8 w-16 sm:w-20 bg-slate-100 animate-pulse rounded-md" />
                  ) : (
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-[#0A2540] tracking-tight">
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
