'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Calendar, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  ChevronRight,
  Sparkles,
  PieChart
} from 'lucide-react';
import { useStudentDashboardStore } from '@/store/useStudentDashboardStore';

export function StudentKpiStats() {
  const { data } = useStudentDashboardStore();

  const appliedCount = data?.stats?.appliedJobs?.count ?? 12;
  const appliedTrend = data?.stats?.appliedJobs?.trend ?? '+3 this week';

  const interviewsCount = data?.stats?.interviews?.count ?? 5;
  const interviewsTrend = data?.stats?.interviews?.trend ?? '2 upcoming';

  const offersCount = data?.stats?.offers?.count ?? 2;
  const profilePercentage = data?.stats?.profileCompletion?.percentage ?? 78;

  const kpis = [
    {
      id: 'applied-jobs',
      label: 'Applied Jobs',
      value: appliedCount,
      trend: `↑ ${appliedTrend}`,
      href: '/student/applications',
      icon: Briefcase,
      cardBg: 'bg-emerald-50/50 hover:bg-emerald-50/80 border-emerald-200/80 hover:border-emerald-300',
      iconBg: 'bg-emerald-100/80 text-emerald-700',
      numColor: 'text-emerald-700',
      trendColor: 'text-emerald-700',
      actionText: null,
    },
    {
      id: 'interviews',
      label: 'Interviews',
      value: interviewsCount,
      trend: `↑ ${interviewsTrend}`,
      href: '/student/interviews',
      icon: Calendar,
      cardBg: 'bg-amber-50/50 hover:bg-amber-50/80 border-amber-200/80 hover:border-amber-300',
      iconBg: 'bg-amber-100/80 text-amber-700',
      numColor: 'text-amber-700',
      trendColor: 'text-amber-700',
      actionText: null,
    },
    {
      id: 'offers',
      label: 'Offers',
      value: offersCount,
      trend: null,
      href: '/student/offers',
      icon: Award,
      cardBg: 'bg-purple-50/50 hover:bg-purple-50/80 border-purple-200/80 hover:border-purple-300',
      iconBg: 'bg-purple-100/80 text-purple-700',
      numColor: 'text-purple-700',
      trendColor: 'text-purple-700',
      actionText: 'View details →',
    },
    {
      id: 'profile-completion',
      label: 'Profile Completion',
      value: `${profilePercentage}%`,
      trend: null,
      href: '/student/profile',
      icon: PieChart,
      cardBg: 'bg-blue-50/50 hover:bg-blue-50/80 border-blue-200/80 hover:border-blue-300',
      iconBg: 'bg-blue-100/80 text-blue-700',
      numColor: 'text-blue-700',
      trendColor: 'text-blue-700',
      actionText: 'Complete now →',
    },
  ];

  return (
    <div className="space-y-2">
      
      {/* Scrollable Container on Mobile/Tablet (<xl), 4-column Grid on Desktop (xl+) */}
      <div className="flex xl:grid xl:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 xl:px-0">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <Link
              key={kpi.id}
              href={kpi.href}
              className={`min-w-[170px] xs:min-w-[200px] sm:min-w-[230px] md:min-w-[260px] xl:min-w-0 flex-1 shrink-0 snap-start p-4 sm:p-5 rounded-3xl border shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer ${kpi.cardBg}`}
            >
              {/* Top Row: Icon + Value */}
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 sm:h-11 sm:w-11 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${kpi.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <p className={`text-2xl sm:text-3xl font-black font-heading tracking-tight ${kpi.numColor}`}>
                    {kpi.value}
                  </p>
                  <span className="text-xs font-bold text-slate-700 block truncate">
                    {kpi.label}
                  </span>
                </div>
              </div>

              {/* Bottom Row: Trend or Action text */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold">
                {kpi.trend ? (
                  <span className={`inline-flex items-center gap-1 ${kpi.trendColor}`}>
                    {kpi.trend}
                  </span>
                ) : (
                  <span className={`inline-flex items-center gap-1 group-hover:underline ${kpi.trendColor}`}>
                    {kpi.actionText}
                  </span>
                )}

                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Touch Swipe Hint for smaller screens */}
      <div className="flex xl:hidden items-center justify-center gap-1 text-[10.5px] text-slate-400 font-medium pt-0.5">
        <span>← Swipe horizontally to explore key statistics →</span>
      </div>

    </div>
  );
}
