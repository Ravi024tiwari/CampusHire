'use client';

import React from 'react';
import { Send, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { RecruiterOffersStats } from '@/store/useRecruiterOffersStore';

interface RecruiterOffersKpiStatsProps {
  stats: RecruiterOffersStats;
}

export function RecruiterOffersKpiStats({ stats }: RecruiterOffersKpiStatsProps) {
  const kpiItems = [
    {
      id: 'total',
      label: 'Total Offers',
      value: stats.total,
      subText: stats.total > 0 ? '+20% from last month' : 'No offers released yet',
      subTextColor: 'text-emerald-600',
      icon: Send,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50/90 text-blue-600',
      borderColor: 'border-slate-200/90 hover:border-blue-300 hover:shadow-md',
    },
    {
      id: 'accepted',
      label: 'Accepted',
      value: stats.accepted,
      subText: `${stats.acceptanceRate}% acceptance rate`,
      subTextColor: 'text-emerald-700 font-bold',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50/90 text-emerald-600',
      borderColor: 'border-slate-200/90 hover:border-emerald-300 hover:shadow-md',
    },
    {
      id: 'pending',
      label: 'Pending Response',
      value: stats.pending,
      subText: `${stats.pendingRate}% of total`,
      subTextColor: 'text-amber-700 font-semibold',
      icon: Clock,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50/90 text-amber-600',
      borderColor: 'border-slate-200/90 hover:border-amber-300 hover:shadow-md',
    },
    {
      id: 'declined',
      label: 'Declined',
      value: stats.declined,
      subText: `${stats.declinedRate}% of total`,
      subTextColor: 'text-rose-600 font-semibold',
      icon: XCircle,
      iconColor: 'text-slate-500',
      iconBg: 'bg-slate-100/90 text-slate-600',
      borderColor: 'border-slate-200/90 hover:border-rose-200 hover:shadow-md',
    },
  ];

  return (
    <div className="space-y-2">
      {/* Responsive Horizontal Scroll on Mobile/Tablet, 4-column Grid on Desktop */}
      <div className="flex xl:grid xl:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 xl:px-0">
        {kpiItems.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div
              key={kpi.id}
              className={`min-w-[210px] xs:min-w-[240px] sm:min-w-[270px] xl:min-w-0 flex-1 shrink-0 snap-start p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border shadow-2xs transition-all duration-300 flex items-center gap-3.5 sm:gap-4 cursor-pointer group ${kpi.borderColor}`}
            >
              <div className={`h-11 w-11 sm:h-12 sm:w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${kpi.iconBg}`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
                    {kpi.value}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-700 truncate">
                    {kpi.label}
                  </span>
                </div>
                <p className={`text-[11px] sm:text-xs font-medium truncate mt-0.5 ${kpi.subTextColor}`}>
                  {kpi.subText}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Swipe Hint on Mobile */}
      <div className="flex xl:hidden items-center justify-center gap-1 text-[10.5px] text-slate-400 font-medium pt-0.5">
        <span>← Swipe horizontally to view all KPI metrics →</span>
      </div>
    </div>
  );
}
