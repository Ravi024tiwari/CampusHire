'use client';

import React from 'react';
import { 
  Briefcase, 
  Clock, 
  Calendar, 
  Users, 
  Award,
  FileCheck
} from 'lucide-react';
import { useStudentApplicationsStore } from '@/store/useStudentApplicationsStore';
import { Card } from '@/components/ui/card';

export function AppliedJobsKpiStats() {
  const { summaryStats, filters, setStatusTab } = useStudentApplicationsStore();

  const stats = [
    {
      id: 'ALL',
      label: 'Total Applied',
      count: summaryStats.total,
      icon: Briefcase,
      iconBg: 'bg-blue-600 text-white shadow-blue-500/20',
      activeBorder: 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/20',
      textColor: 'text-[#0A2540]',
    },
    {
      id: 'UNDER_REVIEW',
      label: 'Under Review',
      count: summaryStats.underReview,
      icon: Clock,
      iconBg: 'bg-amber-500 text-white shadow-amber-500/20',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/20',
      textColor: 'text-amber-700',
    },
    {
      id: 'SHORTLISTED',
      label: 'Shortlisted',
      count: summaryStats.shortlisted,
      icon: Calendar,
      iconBg: 'bg-purple-600 text-white shadow-purple-500/20',
      activeBorder: 'border-purple-600 ring-2 ring-purple-600/20 bg-purple-50/20',
      textColor: 'text-purple-700',
    },
    {
      id: 'INTERVIEWING',
      label: 'Interviewing',
      count: summaryStats.interviewing,
      icon: Users,
      iconBg: 'bg-emerald-600 text-white shadow-emerald-500/20',
      activeBorder: 'border-emerald-600 ring-2 ring-emerald-600/20 bg-emerald-50/20',
      textColor: 'text-emerald-700',
    },
    {
      id: 'OFFERS',
      label: 'Offers',
      count: summaryStats.offers,
      icon: Award,
      iconBg: 'bg-teal-600 text-white shadow-teal-500/20',
      activeBorder: 'border-teal-600 ring-2 ring-teal-600/20 bg-teal-50/20',
      textColor: 'text-teal-700',
    },
  ];

  return (
    <div className="w-full overflow-x-auto pb-1.5 pt-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex xl:grid xl:grid-cols-5 gap-3 sm:gap-4 min-w-[700px] xl:min-w-0">
        {stats.map((item) => {
          const Icon = item.icon;
          const isActive = filters.status === item.id;

          return (
            <Card
              key={item.id}
              onClick={() => setStatusTab(item.id)}
              className={`flex-1 min-w-[140px] p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:scale-98 ${
                isActive
                  ? item.activeBorder
                  : 'border-slate-200/90 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Icon Circle */}
                <div className={`h-8 w-8 sm:h-9 sm:w-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${item.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Stat Text */}
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs font-bold text-slate-500 truncate leading-tight">
                    {item.label}
                  </p>
                  <p className="text-lg sm:text-xl font-black text-[#0A2540] font-heading leading-tight mt-0.5">
                    {item.count}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
