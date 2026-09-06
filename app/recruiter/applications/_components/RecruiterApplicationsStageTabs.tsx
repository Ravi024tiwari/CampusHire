'use client';

import React, { useRef } from 'react';
import { 
  Users, 
  Clock, 
  Bookmark, 
  Calendar, 
  Award, 
  XCircle, 
  CheckCircle2,
  FileCheck2
} from 'lucide-react';
import { 
  useRecruiterApplicationsStore, 
  RecruiterApplicationsStats 
} from '@/store/useRecruiterApplicationsStore';

interface RecruiterApplicationsStageTabsProps {
  stats: RecruiterApplicationsStats;
}

export function RecruiterApplicationsStageTabs({ stats }: RecruiterApplicationsStageTabsProps) {
  const { filters, setFilter } = useRecruiterApplicationsStore();
  const tabsRef = useRef<HTMLDivElement>(null);

  const stages = [
    {
      id: 'ALL',
      label: 'All Applications',
      count: stats.total,
      icon: Users,
      badgeColor: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'APPLIED',
      label: 'Needs Review',
      count: stats.applied + stats.underReview,
      icon: Clock,
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'SHORTLISTED',
      label: 'Shortlisted',
      count: stats.shortlisted,
      icon: Bookmark,
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      id: 'INTERVIEW_SCHEDULED',
      label: 'Interviewing',
      count: stats.interviewScheduled,
      icon: Calendar,
      badgeColor: 'bg-indigo-100 text-indigo-800',
    },
    {
      id: 'OFFERED',
      label: 'Offered',
      count: stats.offered,
      icon: Award,
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'ACCEPTED',
      label: 'Accepted / Hired',
      count: stats.accepted,
      icon: CheckCircle2,
      badgeColor: 'bg-teal-100 text-teal-800',
    },
    {
      id: 'REJECTED',
      label: 'Archived / Rejected',
      count: stats.rejected,
      icon: XCircle,
      badgeColor: 'bg-rose-100 text-rose-800',
    },
  ];

  return (
    <div className="w-full relative">
      <div 
        ref={tabsRef}
        className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 px-1 -mx-1"
      >
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = filters.status === stage.id;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setFilter('status', stage.id)}
              className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-600/20'
                  : 'bg-white hover:bg-slate-100/80 text-slate-600 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span>{stage.label}</span>
              <span
                className={`text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : stage.badgeColor
                }`}
              >
                {stage.count.toLocaleString()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
