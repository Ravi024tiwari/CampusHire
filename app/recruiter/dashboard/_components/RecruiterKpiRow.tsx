'use client';

import React from 'react';
import { RecruiterKpis } from '../_types/recruiter-dashboard.types';
import { 
  Briefcase, 
  Users, 
  UserCheck, 
  Award, 
  ArrowUpRight 
} from 'lucide-react';

interface RecruiterKpiRowProps {
  kpis: RecruiterKpis;
}

export function RecruiterKpiRow({ kpis }: RecruiterKpiRowProps) {
  const cards = [
    {
      id: 'drives',
      title: 'Active Campus Drives',
      value: (kpis.activeDrives || 0).toString(),
      subtext: 'Across verified universities',
      icon: Briefcase,
      iconBg: 'bg-blue-50 text-[#2563EB] border border-blue-100',
      trend: 'Live Hiring',
      sparklineArea: 'M0 25 Q 25 5, 50 18 T 100 8 L 100 30 L 0 30 Z',
      sparklineLine: 'M0 25 Q 25 5, 50 18 T 100 8',
      strokeColor: '#3B82F6',
      fillColor: '#DBEAFE',
    },
    {
      id: 'applicants',
      title: 'Total Applications',
      value: (kpis.totalApplicants || 0).toLocaleString(),
      subtext: 'Candidate pipeline submissions',
      icon: Users,
      iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
      trend: `${kpis.totalApplicants} Received`,
      sparklineArea: 'M0 28 Q 20 22, 45 10 T 100 4 L 100 30 L 0 30 Z',
      sparklineLine: 'M0 28 Q 20 22, 45 10 T 100 4',
      strokeColor: '#6366F1',
      fillColor: '#E0E7FF',
    },
    {
      id: 'shortlisted',
      title: 'Shortlisted Candidates',
      value: (kpis.shortlistedCandidates || 0).toLocaleString(),
      subtext: 'In technical review & interviews',
      icon: UserCheck,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
      trend: `${kpis.shortlistedCandidates} Screened`,
      sparklineArea: 'M0 26 Q 25 18, 55 8 T 100 12 L 100 30 L 0 30 Z',
      sparklineLine: 'M0 26 Q 25 18, 55 8 T 100 12',
      strokeColor: '#F59E0B',
      fillColor: '#FEF3C7',
    },
    {
      id: 'hires',
      title: 'Confirmed Hires',
      value: (kpis.confirmedHires || 0).toLocaleString(),
      subtext: 'Offers accepted by students',
      icon: Award,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      trend: 'Selected',
      sparklineArea: 'M0 24 Q 30 15, 60 20 T 100 6 L 100 30 L 0 30 Z',
      sparklineLine: 'M0 24 Q 30 15, 60 20 T 100 6',
      strokeColor: '#10B981',
      fillColor: '#D1FAE5',
    },
  ];

  return (
    <div className="relative">
      {/* Compact Horizontally Swipeable Row on (<xl), 4-Column Grid on Large Screens (xl+) */}
      <div className="flex xl:grid xl:grid-cols-4 gap-2.5 sm:gap-3.5 xl:gap-4 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 xl:px-0">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="min-w-[145px] xs:min-w-[165px] sm:min-w-[185px] md:min-w-[210px] xl:min-w-0 max-w-[230px] xl:max-w-none flex-1 shrink-0 snap-start rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 xl:p-5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              {/* Top Header: Title & Icon */}
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] xs:text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
                  {card.title}
                </span>

                <div className={`flex h-6.5 w-6.5 sm:h-7.5 sm:w-7.5 xl:h-8.5 xl:w-8.5 items-center justify-center rounded-xl ${card.iconBg} shadow-2xs shrink-0`}>
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 xl:h-4.5 xl:w-4.5" />
                </div>
              </div>

              {/* Center: Metric Value & Trend Badge */}
              <div className="mt-2 sm:mt-3 flex items-baseline justify-between gap-1">
                <h3 className="text-lg xs:text-xl sm:text-2xl xl:text-3xl font-extrabold tracking-tight text-[#0A2540] font-heading">
                  {card.value}
                </h3>
                
                <span className="inline-flex items-center gap-0.5 rounded-md bg-slate-50 px-1.5 py-0.5 text-[9px] xs:text-[10px] sm:text-[11px] font-semibold text-slate-700 border border-slate-200/80 shrink-0">
                  <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-400" />
                  {card.trend}
                </span>
              </div>

              {/* Bottom: Subtext & Clean Sparkline */}
              <div className="mt-2.5 sm:mt-3 flex items-center justify-between border-t border-slate-100 pt-2 sm:pt-2.5">
                <p className="text-[9.5px] xs:text-[10px] sm:text-[11.5px] text-slate-500 font-medium truncate max-w-[85px] xs:max-w-[100px] sm:max-w-[130px]">
                  {card.subtext}
                </p>
                
                <div className="w-11 xs:w-13 sm:w-16 xl:w-18 h-4 sm:h-5 shrink-0">
                  <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                    <path
                      d={card.sparklineArea}
                      fill={card.fillColor}
                      opacity="0.45"
                    />
                    <path
                      d={card.sparklineLine}
                      fill="none"
                      stroke={card.strokeColor}
                      strokeWidth="2"
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
      
      {/* Swipe Hint on all screens below xl */}
      <div className="flex xl:hidden items-center justify-center gap-1 pt-1 text-[9.5px] sm:text-[10.5px] text-slate-400 font-medium">
        <span>← Swipe horizontally to explore all metrics →</span>
      </div>
    </div>
  );
}
