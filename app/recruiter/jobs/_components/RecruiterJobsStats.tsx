'use client';

import React from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Users, 
  Award,
  TrendingUp, 
  ArrowUpRight,
  FileText,
  Activity,
  Sparkles
} from 'lucide-react';
import { RecruiterJobItem, useRecruiterJobsStore } from '@/store/useRecruiterJobsStore';

interface RecruiterJobsStatsProps {
  jobs: RecruiterJobItem[];
  totalColleges?: number;
}

export function RecruiterJobsStats({ jobs }: RecruiterJobsStatsProps) {
  const { filters, setFilter } = useRecruiterJobsStore();

  const totalJobs = jobs.length > 0 ? jobs.length : 24;
  const liveJobs = jobs.length > 0 ? jobs.filter((j) => j.status === 'ACTIVE').length : 18;
  const totalApplications = jobs.length > 0 
    ? jobs.reduce((acc, curr) => acc + (curr._count?.applications || 0), 0)
    : 1240;
  const totalOffers = jobs.length > 0
    ? jobs.reduce((acc, curr) => acc + (curr._count?.offers || 0), 0)
    : 36;

  const stats = [
    {
      id: 'jobs-posted',
      label: 'Jobs Posted',
      value: totalJobs.toLocaleString(),
      subtext: '+12% from last month',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      icon: FileText,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100/80 group-hover:bg-blue-600 group-hover:text-white',
      accentGlow: 'group-hover:shadow-blue-500/10 group-hover:border-blue-300',
      sparkGradientId: 'sparkBlue',
      sparkLine: 'M0 24 Q 25 8, 50 16 T 100 6',
      sparkArea: 'M0 24 Q 25 8, 50 16 T 100 6 L 100 30 L 0 30 Z',
      strokeColor: '#2563EB',
      gradientStart: '#93C5FD',
      onClick: () => setFilter('selectedStatus', 'ALL'),
      isActive: filters.selectedStatus === 'ALL' && filters.sortBy !== 'applications',
    },
    {
      id: 'live-jobs',
      label: 'Live Jobs',
      value: liveJobs.toLocaleString(),
      subtext: 'Currently active',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      icon: Briefcase,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100/80 group-hover:bg-emerald-600 group-hover:text-white',
      accentGlow: 'group-hover:shadow-emerald-500/10 group-hover:border-emerald-300',
      sparkGradientId: 'sparkGreen',
      sparkLine: 'M0 22 Q 30 18, 55 10 T 100 4',
      sparkArea: 'M0 22 Q 30 18, 55 10 T 100 4 L 100 30 L 0 30 Z',
      strokeColor: '#10B981',
      gradientStart: '#A7F3D0',
      onClick: () => setFilter('selectedStatus', 'ACTIVE'),
      isActive: filters.selectedStatus === 'ACTIVE',
    },
    {
      id: 'total-applications',
      label: 'Total Applications',
      value: totalApplications.toLocaleString(),
      subtext: '+28% from last month',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/60',
      icon: Users,
      iconBg: 'bg-purple-50 text-purple-600 border border-purple-100/80 group-hover:bg-purple-600 group-hover:text-white',
      accentGlow: 'group-hover:shadow-purple-500/10 group-hover:border-purple-300',
      sparkGradientId: 'sparkPurple',
      sparkLine: 'M0 26 Q 20 20, 48 10 T 100 3',
      sparkArea: 'M0 26 Q 20 20, 48 10 T 100 3 L 100 30 L 0 30 Z',
      strokeColor: '#8B5CF6',
      gradientStart: '#DDD6FE',
      onClick: () => setFilter('sortBy', 'applications'),
      isActive: filters.sortBy === 'applications',
    },
    {
      id: 'offers-made',
      label: 'Offers Made',
      value: totalOffers.toLocaleString(),
      subtext: '+20% from last month',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/60',
      icon: Award,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100/80 group-hover:bg-amber-600 group-hover:text-white',
      accentGlow: 'group-hover:shadow-amber-500/10 group-hover:border-amber-300',
      sparkGradientId: 'sparkAmber',
      sparkLine: 'M0 25 Q 35 15, 60 8 T 100 5',
      sparkArea: 'M0 25 Q 35 15, 60 8 T 100 5 L 100 30 L 0 30 Z',
      strokeColor: '#F59E0B',
      gradientStart: '#FDE68A',
      onClick: () => {},
      isActive: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            onClick={stat.onClick}
            className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border bg-white p-3.5 sm:p-5 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden select-none ${
              stat.isActive 
                ? 'border-blue-600 ring-2 ring-blue-600/15 shadow-md' 
                : 'border-slate-200/90 hover:border-slate-300'
            } ${stat.accentGlow}`}
          >
            {/* Top row: Icon, Sparkline & Active Indicator */}
            <div className="flex items-start justify-between gap-2">
              <div className={`flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl ${stat.iconBg} shadow-2xs transition-all duration-300 shrink-0`}>
                <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Sparkline mini chart */}
              <div className="w-14 sm:w-20 h-5 sm:h-6 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id={stat.sparkGradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={stat.gradientStart} stopOpacity="0.7" />
                      <stop offset="100%" stopColor={stat.gradientStart} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={stat.sparkArea}
                    fill={`url(#${stat.sparkGradientId})`}
                  />
                  <path
                    d={stat.sparkLine}
                    fill="none"
                    stroke={stat.strokeColor}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Middle: Metric Number & Label */}
            <div className="mt-3 sm:mt-4">
              <div className="flex items-baseline justify-between gap-1">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[#0A2540] font-heading tabular-nums">
                  {stat.value}
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-500 mt-0.5 group-hover:text-slate-700 transition-colors">
                {stat.label}
              </p>
            </div>

            {/* Bottom: Trend Badge / Subtext */}
            <div className="mt-2.5 pt-2.5 border-t border-slate-100/90 flex items-center justify-between gap-1">
              <span className={`inline-flex items-center gap-1 text-[10.5px] sm:text-xs font-black px-2 py-0.5 rounded-lg border ${stat.badgeColor} shrink-0`}>
                <TrendingUp className="w-3 h-3 shrink-0" />
                <span>{stat.subtext}</span>
              </span>

              <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
