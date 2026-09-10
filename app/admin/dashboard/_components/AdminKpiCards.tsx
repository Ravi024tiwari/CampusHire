'use client';

import React from 'react';
import { 
  Users, 
  Building2, 
  Landmark, 
  Briefcase, 
  FileText, 
  Award, 
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import type { AdminDashboardKpis } from '@/store/useAdminStore';

interface AdminKpiCardsProps {
  kpis: AdminDashboardKpis;
}

export function AdminKpiCards({ kpis }: AdminKpiCardsProps) {
  const formatGrowth = (growth?: number) => {
    const val = growth ?? 0;
    if (val > 0) return { text: `+${val}% MoM`, icon: TrendingUp, color: 'text-emerald-600' };
    if (val < 0) return { text: `${val}% MoM`, icon: TrendingDown, color: 'text-rose-600' };
    return { text: `0% MoM`, icon: Minus, color: 'text-slate-400' };
  };

  const cards = [
    {
      id: 'students',
      label: 'Total Students',
      value: (kpis.totalStudents ?? 0).toLocaleString(),
      growthInfo: formatGrowth(kpis.studentsMoMGrowth),
      icon: Users,
      iconBg: 'bg-emerald-50 text-emerald-700',
      borderHover: 'hover:border-emerald-300 hover:shadow-emerald-500/10',
    },
    {
      id: 'recruiters',
      label: 'Active Recruiters',
      value: (kpis.totalRecruiters ?? 0).toLocaleString(),
      growthInfo: formatGrowth(kpis.recruitersMoMGrowth),
      icon: Building2,
      iconBg: 'bg-amber-50 text-amber-700',
      borderHover: 'hover:border-amber-300 hover:shadow-amber-500/10',
    },
    {
      id: 'colleges',
      label: 'Verified Colleges',
      value: (kpis.verifiedColleges ?? 0).toLocaleString(),
      growthInfo: formatGrowth(kpis.collegesMoMGrowth),
      icon: Landmark,
      iconBg: 'bg-rose-50 text-rose-700',
      borderHover: 'hover:border-rose-300 hover:shadow-rose-500/10',
    },
    {
      id: 'jobs',
      label: 'Active Jobs',
      value: (kpis.activeJobs ?? 0).toLocaleString(),
      growthInfo: formatGrowth(kpis.jobsMoMGrowth),
      icon: Briefcase,
      iconBg: 'bg-teal-50 text-teal-700',
      borderHover: 'hover:border-teal-300 hover:shadow-teal-500/10',
    },
    {
      id: 'applications',
      label: 'Applications',
      value: (kpis.totalApplications ?? 0).toLocaleString(),
      growthInfo: formatGrowth(kpis.applicationsMoMGrowth),
      icon: FileText,
      iconBg: 'bg-purple-50 text-purple-700',
      borderHover: 'hover:border-purple-300 hover:shadow-purple-500/10',
    },
    {
      id: 'offers',
      label: 'Offers Made',
      value: (kpis.offersMade ?? 0).toLocaleString(),
      growthInfo: formatGrowth(kpis.offersMoMGrowth),
      icon: Award,
      iconBg: 'bg-teal-50 text-teal-800',
      borderHover: 'hover:border-teal-300 hover:shadow-teal-500/10',
    },
  ];

  return (
    <div className="space-y-2">
      {/* 6-Column Grid on Large Screens, 3-Column on Tablet, Horizontal Swipe Carousel on Mobile */}
      <div className="flex md:grid md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 md:px-0">
        {cards.map((card) => {
          const Icon = card.icon;
          const GrowthIcon = card.growthInfo.icon;

          return (
            <div
              key={card.id}
              className={`min-w-[190px] xs:min-w-[210px] sm:min-w-[230px] md:min-w-0 flex-1 shrink-0 snap-start p-4 sm:p-4.5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-2xs transition-all duration-300 flex items-center gap-3.5 group cursor-pointer ${card.borderHover}`}
            >
              <div
                className={`h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${card.iconBg}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight block truncate">
                  {card.value}
                </span>
                <p className="text-xs font-bold text-slate-700 truncate mt-0.5">
                  {card.label}
                </p>
                <div className={`flex items-center gap-1 mt-0.5 text-[10.5px] font-semibold truncate ${card.growthInfo.color}`}>
                  <GrowthIcon className="w-3 h-3 shrink-0" />
                  <span className="truncate">{card.growthInfo.text}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex md:hidden items-center justify-center gap-1 text-[10px] text-slate-400 font-medium pt-0.5">
        <span>← Swipe horizontally for all 6 metrics →</span>
      </div>
    </div>
  );
}

