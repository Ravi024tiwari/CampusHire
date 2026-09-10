'use client';

import React from 'react';
import { Briefcase, PlayCircle, Users, Building2, TrendingUp } from 'lucide-react';

interface DriveItem {
  id: string;
  status: string;
  college?: {
    name: string;
  };
  _count?: {
    applications: number;
    offers: number;
  };
}

interface AdminDrivesKpiCardsProps {
  drives: DriveItem[];
  isLoading?: boolean;
}

export function AdminDrivesKpiCards({ drives, isLoading = false }: AdminDrivesKpiCardsProps) {
  const totalDrives = drives.length;
  const activeDrives = drives.filter((d) => d.status === 'ACTIVE').length;
  const totalApplications = drives.reduce((acc, d) => acc + (d._count?.applications || 0), 0);
  const hostCampuses = new Set(drives.map((d) => d.college?.name).filter(Boolean)).size;

  const cards = [
    {
      id: 'totalDrives',
      title: 'Total Placement Drives',
      value: totalDrives,
      subtitle: 'Across all partner institutes',
      icon: Briefcase,
      iconBg: 'bg-blue-50 text-[#0070F3] border-blue-200/80',
    },
    {
      id: 'activeDrives',
      title: 'Active Live Drives',
      value: activeDrives,
      subtitle: 'Currently accepting applications',
      icon: PlayCircle,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
    },
    {
      id: 'totalApplications',
      title: 'Total Student Applications',
      value: totalApplications,
      subtitle: 'Candidate submissions logged',
      icon: Users,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200/80',
    },
    {
      id: 'hostCampuses',
      title: 'Participating Campuses',
      value: hostCampuses || 1,
      subtitle: 'Affiliated colleges & universities',
      icon: Building2,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/80',
    },
  ];

  return (
    <div className="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-3 px-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="min-w-[170px] sm:min-w-[210px] lg:min-w-0 flex-1 shrink-0 snap-start bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
          >
            {/* Top row: Icon + Value & Label */}
            <div className="flex items-center gap-3.5">
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 border ${card.iconBg} transition-transform duration-200 group-hover:scale-105 shadow-2xs`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div>
                {isLoading ? (
                  <div className="h-7 w-16 bg-slate-200 animate-pulse rounded-md" />
                ) : (
                  <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-heading">
                    {card.value.toLocaleString()}
                  </div>
                )}
                <p className="text-[11px] sm:text-xs font-semibold text-slate-500">
                  {card.title}
                </p>
              </div>
            </div>

            {/* Bottom row: Subtitle descriptor */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <TrendingUp className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="truncate text-[10.5px] sm:text-[11px]">{card.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
