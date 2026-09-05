'use client';

import React from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Users, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight,
  Radio,
  GraduationCap
} from 'lucide-react';
import { RecruiterJobItem } from '@/store/useRecruiterJobsStore';

interface RecruiterJobsStatsProps {
  jobs: RecruiterJobItem[];
  totalColleges: number;
}

export function RecruiterJobsStats({ jobs, totalColleges }: RecruiterJobsStatsProps) {
  const totalDrives = jobs.length;
  const activeDrives = jobs.filter((j) => j.status === 'ACTIVE').length;
  const totalApplications = jobs.reduce((acc, curr) => acc + (curr._count?.applications || 0), 0);
  const totalOffers = jobs.reduce((acc, curr) => acc + (curr._count?.offers || 0), 0);

  const stats = [
    {
      id: 'total-drives',
      label: 'Campus Drives Posted',
      value: totalDrives.toLocaleString(),
      sublabel: `${activeDrives} Currently Active`,
      icon: Briefcase,
      iconBg: 'bg-blue-50 text-[#2563EB] border border-blue-100',
      trend: totalDrives > 0 ? `${totalDrives} Published` : 'Drive Catalog',
      sparklineArea: 'M0 25 Q 25 5, 50 18 T 100 8 L 100 30 L 0 30 Z',
      sparklineLine: 'M0 25 Q 25 5, 50 18 T 100 8',
      strokeColor: '#3B82F6',
      fillColor: '#DBEAFE',
    },
    {
      id: 'active-placements',
      label: 'Live Placements',
      value: activeDrives.toLocaleString(),
      sublabel: 'Accepting candidate applications',
      icon: Radio,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      trend: 'Live Hiring',
      sparklineArea: 'M0 24 Q 30 15, 60 20 T 100 6 L 100 30 L 0 30 Z',
      sparklineLine: 'M0 24 Q 30 15, 60 20 T 100 6',
      strokeColor: '#10B981',
      fillColor: '#D1FAE5',
    },
    {
      id: 'candidates',
      label: 'Candidates Applied',
      value: totalApplications.toLocaleString(),
      sublabel: totalOffers > 0 ? `${totalOffers} offers generated` : 'Across all campus drives',
      icon: Users,
      iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
      trend: `${totalApplications} Pipeline`,
      sparklineArea: 'M0 28 Q 20 22, 45 10 T 100 4 L 100 30 L 0 30 Z',
      sparklineLine: 'M0 28 Q 20 22, 45 10 T 100 4',
      strokeColor: '#6366F1',
      fillColor: '#E0E7FF',
    },
    {
      id: 'campuses',
      label: 'Campuses Engaged',
      value: totalColleges.toLocaleString(),
      sublabel: 'Super Admin accredited partners',
      icon: Building2,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
      trend: 'Institutional',
      sparklineArea: 'M0 26 Q 25 18, 55 8 T 100 12 L 100 30 L 0 30 Z',
      sparklineLine: 'M0 26 Q 25 18, 55 8 T 100 12',
      strokeColor: '#F59E0B',
      fillColor: '#FEF3C7',
    },
  ];

  return (
    <div className="relative">
      {/* Horizontally scrollable on mobile/tablet screens (<xl), 4-column grid on desktop (xl+) */}
      <div className="flex xl:grid xl:grid-cols-4 gap-2.5 sm:gap-3.5 xl:gap-4 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 xl:px-0">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="min-w-[170px] xs:min-w-[200px] sm:min-w-[230px] md:min-w-[260px] xl:min-w-0 flex-1 shrink-0 snap-start rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Top Header: Title & Icon */}
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
                  {card.label}
                </span>

                <div className={`flex h-7.5 w-7.5 sm:h-8.5 sm:w-8.5 xl:h-9 xl:w-9 items-center justify-center rounded-2xl ${card.iconBg} shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                  <Icon className="h-4 w-4 xl:h-4.5 xl:w-4.5" />
                </div>
              </div>

              {/* Center: Metric Value & Trend Badge */}
              <div className="mt-2.5 sm:mt-3.5 flex items-baseline justify-between gap-1">
                <h3 className="text-xl sm:text-2xl xl:text-3xl font-black tracking-tight text-[#0A2540] font-heading">
                  {card.value}
                </h3>
                
                <span className="inline-flex items-center gap-0.5 rounded-lg bg-slate-50 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-slate-700 border border-slate-200/80 shrink-0">
                  <ArrowUpRight className="h-3 w-3 text-slate-400" />
                  {card.trend}
                </span>
              </div>

              {/* Bottom: Subtext & Clean Sparkline Chart */}
              <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-slate-100 pt-2.5 sm:pt-3">
                <p className="text-[10px] sm:text-[11.5px] text-slate-500 font-medium truncate max-w-[110px] sm:max-w-[150px]">
                  {card.sublabel}
                </p>
                
                <div className="w-14 sm:w-18 xl:w-20 h-4.5 sm:h-5 shrink-0">
                  <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                    <path
                      d={card.sparklineArea}
                      fill={card.fillColor}
                      opacity="0.5"
                    />
                    <path
                      d={card.sparklineLine}
                      fill="none"
                      stroke={card.strokeColor}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

            </div>
          );
        })}
      </div>
      
      {/* Swipe Indicator for mobile/medium devices */}
      <div className="flex xl:hidden items-center justify-center gap-1 pt-1.5 text-[10px] sm:text-[11px] text-slate-400 font-medium">
        <span>← Swipe horizontally to view full metrics overview →</span>
      </div>
    </div>
  );
}
