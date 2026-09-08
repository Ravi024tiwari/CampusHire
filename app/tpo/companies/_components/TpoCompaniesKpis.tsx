'use client';

import React from 'react';
import { Building2, Calendar, Briefcase, Users, TrendingUp } from 'lucide-react';
import { TpoCompaniesKpis as KpiType } from '../_types/tpo-companies.types';

interface TpoCompaniesKpisProps {
  kpis: KpiType;
  isLoading?: boolean;
}

export function TpoCompaniesKpis({ kpis, isLoading }: TpoCompaniesKpisProps) {
  const kpiCards = [
    {
      label: 'Total Companies',
      value: kpis?.totalCompanies?.value ?? 0,
      growth: kpis?.totalCompanies?.growth ?? '+18% from last year',
      icon: Building2,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100/80',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    },
    {
      label: 'Visited This Year',
      value: kpis?.visitedThisYear?.value ?? 0,
      growth: kpis?.visitedThisYear?.growth ?? '+20% from last year',
      icon: Calendar,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100/80',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    },
    {
      label: 'Job Opportunities',
      value: kpis?.jobOpportunities?.value ?? 0,
      growth: kpis?.jobOpportunities?.growth ?? '+32% from last year',
      icon: Briefcase,
      iconBg: 'bg-purple-50 text-purple-600 border border-purple-100/80',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    },
    {
      label: 'Students Placed',
      value: kpis?.studentsPlaced?.value ?? 0,
      growth: kpis?.studentsPlaced?.growth ?? '+26% from last year',
      icon: Users,
      iconBg: 'bg-orange-50 text-orange-600 border border-orange-100/80',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    },
  ];

  return (
    <div className="w-full">
      {/* Mobile: Horizontal Swipe Track with snap points | Desktop: 4 Columns */}
      <div className="flex md:grid md:grid-cols-4 gap-3.5 overflow-x-auto pb-2 md:pb-0 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-200 -mx-4 px-4 sm:mx-0 sm:px-0">
        {kpiCards.map((card, idx) => {
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

              {/* Growth Badge */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                <span className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full border ${card.badgeColor}`}>
                  <TrendingUp className="w-3 h-3" />
                  {card.growth}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
