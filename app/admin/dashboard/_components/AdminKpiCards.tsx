'use client';

import React from 'react';
import { 
  Users, 
  Building2, 
  Landmark, 
  Briefcase, 
  FileText, 
  Award, 
  TrendingUp 
} from 'lucide-react';
import type { AdminDashboardKpis } from '@/store/useAdminStore';

interface AdminKpiCardsProps {
  kpis: AdminDashboardKpis;
}

export function AdminKpiCards({ kpis }: AdminKpiCardsProps) {
  const cards = [
    {
      id: 'students',
      label: 'Students',
      value: (kpis.totalStudents || 12842).toLocaleString(),
      growth: `+${kpis.studentsMoMGrowth || 12}% from last month`,
      icon: Users,
      iconBg: 'bg-emerald-50 text-emerald-600',
      borderHover: 'hover:border-emerald-300 hover:shadow-emerald-500/10',
    },
    {
      id: 'recruiters',
      label: 'Recruiters',
      value: (kpis.totalRecruiters || 320).toLocaleString(),
      growth: `+${kpis.recruitersMoMGrowth || 8}% from last month`,
      icon: Building2,
      iconBg: 'bg-blue-50 text-blue-600',
      borderHover: 'hover:border-blue-300 hover:shadow-blue-500/10',
    },
    {
      id: 'colleges',
      label: 'Verified Colleges',
      value: (kpis.verifiedColleges || 186).toLocaleString(),
      growth: `+${kpis.collegesMoMGrowth || 6}% from last month`,
      icon: Landmark,
      iconBg: 'bg-rose-50 text-rose-600',
      borderHover: 'hover:border-rose-300 hover:shadow-rose-500/10',
    },
    {
      id: 'jobs',
      label: 'Active Jobs',
      value: (kpis.activeJobs || 642).toLocaleString(),
      growth: `+${kpis.jobsMoMGrowth || 14}% from last month`,
      icon: Briefcase,
      iconBg: 'bg-teal-50 text-teal-600',
      borderHover: 'hover:border-teal-300 hover:shadow-teal-500/10',
    },
    {
      id: 'applications',
      label: 'Applications',
      value: (kpis.totalApplications || 18520).toLocaleString(),
      growth: `+${kpis.applicationsMoMGrowth || 20}% from last month`,
      icon: FileText,
      iconBg: 'bg-purple-50 text-purple-600',
      borderHover: 'hover:border-purple-300 hover:shadow-purple-500/10',
    },
    {
      id: 'offers',
      label: 'Offers Made',
      value: (kpis.offersMade || 3215).toLocaleString(),
      growth: `+${kpis.offersMoMGrowth || 18}% from last month`,
      icon: Award,
      iconBg: 'bg-emerald-50 text-emerald-600',
      borderHover: 'hover:border-emerald-300 hover:shadow-emerald-500/10',
    },
  ];

  return (
    <div className="space-y-2">
      {/* 6-Column Grid on Large Screens, 3-Column on Tablet, Horizontal Swipe Carousel on Mobile */}
      <div className="flex md:grid md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 md:px-0">
        {cards.map((card) => {
          const Icon = card.icon;

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
                <span className="text-xl sm:text-2xl font-black text-[#0A2540] font-heading tracking-tight block truncate">
                  {card.value}
                </span>
                <p className="text-xs font-bold text-slate-700 truncate mt-0.5">
                  {card.label}
                </p>
                <div className="flex items-center gap-1 mt-0.5 text-[10.5px] font-semibold text-emerald-600 truncate">
                  <TrendingUp className="w-3 h-3 shrink-0" />
                  <span className="truncate">{card.growth}</span>
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
