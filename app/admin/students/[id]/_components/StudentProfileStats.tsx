'use client';

import React from 'react';
import { FileText, Users, Briefcase, Trophy } from 'lucide-react';

interface StudentProfileStatsProps {
  stats?: {
    totalApplications?: number;
    totalInterviews?: number;
    interviewCount?: number;
    totalOffers?: number;
    offersReceived?: number;
    totalPlaced?: number;
    offersAccepted?: number;
    isPlaced?: boolean;
  };
}

export function StudentProfileStats({ stats }: StudentProfileStatsProps) {
  const totalApps = stats?.totalApplications ?? 0;
  const totalInterviews = stats?.interviewCount ?? stats?.totalInterviews ?? 0;
  const totalOffers = stats?.offersReceived ?? stats?.totalOffers ?? 0;
  const totalPlaced = stats?.offersAccepted ?? stats?.totalPlaced ?? (stats?.isPlaced ? 1 : 0);

  const cards = [
    {
      id: 'applications',
      title: 'Applications',
      value: totalApps,
      icon: FileText,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      id: 'interviews',
      title: 'Interviews',
      value: totalInterviews,
      icon: Users,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      id: 'offers',
      title: 'Offers',
      value: totalOffers,
      icon: Briefcase,
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
    },
    {
      id: 'placed',
      title: 'Placed',
      value: totalPlaced > 0 ? `${totalPlaced} Placed` : 'Not Placed',
      icon: Trophy,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex items-center gap-3.5 hover:shadow-sm transition-all"
          >
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border ${card.iconBg}`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black text-[#0A2540] font-heading block leading-tight">
                {card.value}
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 block">
                {card.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
