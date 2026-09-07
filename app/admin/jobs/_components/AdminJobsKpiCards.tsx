'use client';

import React from 'react';
import { Briefcase, PlayCircle, Clock, PauseCircle, TrendingUp, TrendingDown } from 'lucide-react';
import type { AdminJobKpis } from '@/store/useAdminStore';

interface AdminJobsKpiCardsProps {
  kpis: AdminJobKpis | null;
  isLoading?: boolean;
}

export function AdminJobsKpiCards({ kpis, isLoading = false }: AdminJobsKpiCardsProps) {
  const cards = [
    {
      id: 'totalJobs',
      title: 'Total Jobs',
      value: kpis?.totalJobs?.value ?? 642,
      growth: kpis?.totalJobs?.growth ?? '12%',
      trend: kpis?.totalJobs?.trend ?? 'up',
      period: kpis?.totalJobs?.period ?? 'from last month',
      icon: Briefcase,
      iconBg: 'bg-[#0070F3]/10 text-[#0070F3]',
      iconBorder: 'border-blue-100',
    },
    {
      id: 'activeJobs',
      title: 'Active Jobs',
      value: kpis?.activeJobs?.value ?? 412,
      growth: kpis?.activeJobs?.growth ?? '8%',
      trend: kpis?.activeJobs?.trend ?? 'up',
      period: kpis?.activeJobs?.period ?? 'from last month',
      icon: PlayCircle,
      iconBg: 'bg-emerald-500/10 text-emerald-600',
      iconBorder: 'border-emerald-100',
    },
    {
      id: 'closedJobs',
      title: 'Closed Jobs',
      value: kpis?.closedJobs?.value ?? 128,
      growth: kpis?.closedJobs?.growth ?? '14%',
      trend: kpis?.closedJobs?.trend ?? 'up',
      period: kpis?.closedJobs?.period ?? 'from last month',
      icon: Clock,
      iconBg: 'bg-amber-500/10 text-amber-600',
      iconBorder: 'border-amber-100',
    },
    {
      id: 'draftJobs',
      title: 'Draft Jobs',
      value: kpis?.draftJobs?.value ?? 72,
      growth: kpis?.draftJobs?.growth ?? '6%',
      trend: kpis?.draftJobs?.trend ?? 'down',
      period: kpis?.draftJobs?.period ?? 'from last month',
      icon: PauseCircle,
      iconBg: 'bg-rose-500/10 text-rose-600',
      iconBorder: 'border-rose-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isUp = card.trend === 'up';

        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
          >
            {/* Top row: Icon + Value & Label */}
            <div className="flex items-center gap-3.5">
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 border ${card.iconBg} ${card.iconBorder} transition-transform duration-200 group-hover:scale-105`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div>
                {isLoading ? (
                  <div className="h-7 w-16 bg-slate-200 animate-pulse rounded-md" />
                ) : (
                  <div className="text-xl sm:text-2xl font-black text-[#0A2540] tracking-tight font-heading">
                    {card.value.toLocaleString()}
                  </div>
                )}
                <p className="text-[11px] sm:text-xs font-semibold text-slate-500">
                  {card.title}
                </p>
              </div>
            </div>

            {/* Bottom row: Trend pill */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold">
              {isUp ? (
                <span className="inline-flex items-center gap-0.5 text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{card.growth}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 text-rose-500">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{card.growth}</span>
                </span>
              )}
              <span className="text-slate-400 font-medium text-[10.5px]">
                {card.period}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
