'use client';

import React from 'react';
import { Landmark, CheckCircle2, Clock, XCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { AdminCollegeKpis } from '@/store/useAdminStore';

interface AdminCollegesKpiCardsProps {
  kpis: AdminCollegeKpis | null;
  isLoading?: boolean;
}

export function AdminCollegesKpiCards({ kpis, isLoading = false }: AdminCollegesKpiCardsProps) {
  const cards = [
    {
      id: 'total-colleges',
      title: 'Total Colleges',
      value: kpis?.totalColleges?.value !== undefined ? kpis.totalColleges.value.toLocaleString() : '0',
      growth: kpis?.totalColleges?.growth || '0%',
      trend: kpis?.totalColleges?.trend || 'up',
      period: kpis?.totalColleges?.period || 'from last month',
      icon: Landmark,
      iconBg: 'bg-sky-50 text-sky-600 border border-sky-100',
    },
    {
      id: 'verified-colleges',
      title: 'Verified Colleges',
      value: kpis?.verifiedColleges?.value !== undefined ? kpis.verifiedColleges.value.toLocaleString() : '0',
      growth: kpis?.verifiedColleges?.growth || '0%',
      trend: kpis?.verifiedColleges?.trend || 'up',
      period: kpis?.verifiedColleges?.period || 'from last month',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    },
    {
      id: 'pending-verification',
      title: 'Pending Verification',
      value: kpis?.pendingVerification?.value !== undefined ? kpis.pendingVerification.value.toLocaleString() : '0',
      growth: kpis?.pendingVerification?.growth || '0%',
      trend: kpis?.pendingVerification?.trend || 'down',
      period: kpis?.pendingVerification?.period || 'from last month',
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      id: 'rejected-colleges',
      title: 'Rejected Colleges',
      value: kpis?.rejectedColleges?.value !== undefined ? kpis.rejectedColleges.value.toLocaleString() : '0',
      growth: kpis?.rejectedColleges?.growth || '0%',
      trend: kpis?.rejectedColleges?.trend || 'down',
      period: kpis?.rejectedColleges?.period || 'from last month',
      icon: XCircle,
      iconBg: 'bg-rose-50 text-rose-600 border border-rose-100',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex overflow-x-auto no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-1 sm:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-[260px] xs:w-[270px] sm:w-auto shrink-0 snap-start bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs animate-pulse flex items-start justify-between"
          >
            <div className="space-y-2.5">
              <div className="h-6 w-20 bg-slate-100 rounded-md" />
              <div className="h-4 w-28 bg-slate-100 rounded-md" />
              <div className="h-3.5 w-24 bg-slate-100 rounded-md" />
            </div>
            <div className="w-11 h-11 bg-slate-100 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-1 sm:pb-0 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
      {cards.map((card) => {
        const Icon = card.icon;
        const isUp = card.trend === 'up';
        return (
          <div
            key={card.id}
            className="w-[260px] xs:w-[270px] sm:w-auto shrink-0 snap-start bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between group"
          >
            {/* Left Info */}
            <div className="space-y-1">
              <span className="text-2xl sm:text-[26px] font-black text-[#0A2540] font-heading tracking-tight block">
                {card.value}
              </span>
              <span className="text-xs font-bold text-slate-500 block">
                {card.title}
              </span>
              <div
                className={`flex items-center gap-1 text-[11px] font-bold pt-0.5 ${
                  isUp ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {isUp ? (
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
                <span>
                  {card.growth.startsWith('+') || card.growth.startsWith('-')
                    ? card.growth
                    : `${isUp ? '↑ ' : '↓ '}${card.growth}`}
                </span>
                <span className="text-slate-400 font-normal">{card.period}</span>
              </div>
            </div>

            {/* Right Icon Box */}
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg} group-hover:scale-105 transition-transform duration-300`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
