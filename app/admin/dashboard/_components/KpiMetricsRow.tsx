'use client';

import React from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { 
  GraduationCap, 
  Briefcase, 
  Users, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';

export function KpiMetricsRow() {
  const { kpis, verifiedColleges, pendingColleges } = useAdminStore();

  const cards = [
    {
      id: 'universities',
      title: 'Affiliated Universities',
      value: (verifiedColleges.length || kpis?.verifiedCollegesCount || 0).toString(),
      subtext: `${pendingColleges.length || kpis?.pendingCollegesCount || 0} pending review`,
      icon: GraduationCap,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
      trend: `${kpis?.affiliatedCollegesCount || 0} Total`,
      sparklineArea: 'M0 25 Q 25 5, 50 18 T 100 8 L 100 30 L 0 30 Z',
      sparklineLine: 'M0 25 Q 25 5, 50 18 T 100 8',
      strokeColor: '#3B82F6',
      fillColor: '#DBEAFE',
    },
    {
      id: 'drives',
      title: 'Active Placement Drives',
      value: (kpis?.activePlacementDrives || 0).toString(),
      subtext: `${kpis?.totalPlacementDrives || 0} scheduled drives`,
      icon: Briefcase,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      trend: `${kpis?.totalApplicationsSubmitted || 0} Apps`,
      sparklineArea: 'M0 28 Q 20 22, 45 10 T 100 4 L 100 30 L 0 30 Z',
      sparklineLine: 'M0 28 Q 20 22, 45 10 T 100 4',
      strokeColor: '#10B981',
      fillColor: '#D1FAE5',
    },
    {
      id: 'placed',
      title: 'Placed Candidates',
      value: (kpis?.totalPlacedStudents || 0).toLocaleString(),
      subtext: `${kpis?.placementPercentage || '0%'} selection rate`,
      icon: Users,
      iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
      trend: `${kpis?.totalOffersAccepted || 0} Offers`,
      sparklineArea: 'M0 24 Q 30 15, 60 20 T 100 6 L 100 30 L 0 30 Z',
      sparklineLine: 'M0 24 Q 30 15, 60 20 T 100 6',
      strokeColor: '#6366F1',
      fillColor: '#E0E7FF',
    },
    {
      id: 'ctc',
      title: 'Top CTC Package & Reach',
      value: kpis?.maxSalaryPackage || '₹0.0 LPA',
      subtext: `${kpis?.verifiedCompaniesCount || kpis?.totalCompaniesEnrolled || 0} recruiters`,
      icon: TrendingUp,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
      trend: `${kpis?.totalOffersIssued || 0} Issued`,
      sparklineArea: 'M0 26 Q 25 18, 55 8 T 100 12 L 100 30 L 0 30 Z',
      sparklineLine: 'M0 26 Q 25 18, 55 8 T 100 12',
      strokeColor: '#F59E0B',
      fillColor: '#FEF3C7',
    },
  ];

  return (
    <div className="relative">
      {/* Compact, Agile Horizontally Swipeable Row on (<xl), 4-Column Grid on Large Screens (xl+) */}
      <div className="flex xl:grid xl:grid-cols-4 gap-2 sm:gap-3 xl:gap-4 overflow-x-auto xl:overflow-x-visible pb-1.5 xl:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 xl:px-0">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="min-w-[130px] xs:min-w-[145px] sm:min-w-[175px] md:min-w-[195px] xl:min-w-0 max-w-[200px] xl:max-w-none flex-1 shrink-0 snap-start rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-3.5 xl:p-4 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              {/* Top Header: Title & Icon */}
              <div className="flex items-center justify-between gap-1">
                <span className="text-[9.5px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
                  {card.title}
                </span>

                <div className={`flex h-6 w-6 sm:h-7 sm:w-7 xl:h-8 xl:w-8 items-center justify-center rounded-lg ${card.iconBg} shadow-2xs shrink-0`}>
                  <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 xl:h-4 xl:w-4" />
                </div>
              </div>

              {/* Center: Metric Value & Trend Badge */}
              <div className="mt-1.5 sm:mt-2.5 flex items-baseline justify-between gap-1">
                <h3 className="text-base xs:text-lg sm:text-xl xl:text-2xl font-extrabold tracking-tight text-slate-800 font-heading">
                  {card.value}
                </h3>
                
                <span className="inline-flex items-center gap-0.5 rounded-md bg-slate-50 px-1 xs:px-1.5 py-0.5 text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-semibold text-slate-600 border border-slate-200/70 shrink-0">
                  <ArrowUpRight className="h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-3 sm:w-3 text-slate-400" />
                  {card.trend}
                </span>
              </div>

              {/* Bottom: Subtext & Clean Sparkline */}
              <div className="mt-2 sm:mt-2.5 xl:mt-3 flex items-center justify-between border-t border-slate-100 pt-1.5 sm:pt-2">
                <p className="text-[9px] xs:text-[9.5px] sm:text-[11px] text-slate-500 font-medium truncate max-w-[75px] xs:max-w-[90px] sm:max-w-[120px]">
                  {card.subtext}
                </p>
                
                <div className="w-9 xs:w-11 sm:w-14 xl:w-16 h-3.5 sm:h-4.5 shrink-0">
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
      
      {/* Subtle Swipe Hint on all screens below xl */}
      <div className="flex xl:hidden items-center justify-center gap-1 pt-1 text-[9px] sm:text-[10px] text-slate-400 font-medium">
        <span>← Swipe to explore metrics →</span>
      </div>
    </div>
  );
}
