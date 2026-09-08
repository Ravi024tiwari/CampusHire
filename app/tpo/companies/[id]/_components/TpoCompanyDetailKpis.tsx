'use client';

import React from 'react';
import { Briefcase, Users, Award, TrendingUp } from 'lucide-react';

interface TpoCompanyDetailKpisProps {
  kpis?: {
    totalDrives: number;
    studentsPlaced: number;
    highestCTC: string;
    avgCTC: string;
  };
  isLoading?: boolean;
}

export function TpoCompanyDetailKpis({ kpis, isLoading }: TpoCompanyDetailKpisProps) {
  const cards = [
    {
      label: 'Campus Drives',
      value: kpis?.totalDrives ?? 0,
      subtext: 'Drives conducted at your campus',
      icon: Briefcase,
      iconBg: 'bg-purple-50 text-purple-600 border border-purple-100/80',
    },
    {
      label: 'Students Placed',
      value: kpis?.studentsPlaced ?? 0,
      subtext: 'Offers accepted by students',
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100/80',
    },
    {
      label: 'Highest CTC Offered',
      value: kpis?.highestCTC || '₹0.0 LPA',
      subtext: 'Top compensation package',
      icon: Award,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100/80',
    },
    {
      label: 'Average CTC',
      value: kpis?.avgCTC || '₹0.0 LPA',
      subtext: 'Institutional mean package',
      icon: TrendingUp,
      iconBg: 'bg-orange-50 text-orange-600 border border-orange-100/80',
    },
  ];

  return (
    <div className="w-full">
      <div className="flex md:grid md:grid-cols-4 gap-3.5 overflow-x-auto pb-2 md:pb-0 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-200 -mx-4 px-4 sm:mx-0 sm:px-0">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="min-w-[240px] sm:min-w-[260px] md:min-w-0 flex-1 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 flex flex-col justify-between snap-start shrink-0"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    {card.label}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-tight">
                    {isLoading ? (
                      <span className="inline-block w-12 h-7 bg-slate-100 rounded animate-pulse" />
                    ) : (
                      card.value
                    )}
                  </h3>
                </div>
                <div className={`p-2.5 sm:p-3 rounded-xl ${card.iconBg}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium">
                  {card.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
