'use client';

import React from 'react';
import { LayoutGrid, Briefcase, Users, UserCheck } from 'lucide-react';

export type CompanyDetailTabType = 'overview' | 'jobs' | 'hires' | 'team';

interface TpoCompanyDetailTabsProps {
  activeTab: CompanyDetailTabType;
  onTabChange: (tab: CompanyDetailTabType) => void;
  counts: {
    jobs: number;
    hires: number;
    team: number;
  };
}

export function TpoCompanyDetailTabs({
  activeTab,
  onTabChange,
  counts,
}: TpoCompanyDetailTabsProps) {
  const tabs = [
    {
      id: 'overview' as CompanyDetailTabType,
      label: 'Overview & Gallery',
      icon: LayoutGrid,
    },
    {
      id: 'jobs' as CompanyDetailTabType,
      label: 'Campus Drives & Jobs',
      icon: Briefcase,
      count: counts.jobs,
    },
    {
      id: 'hires' as CompanyDetailTabType,
      label: 'Placed Students',
      icon: Users,
      count: counts.hires,
    },
    {
      id: 'team' as CompanyDetailTabType,
      label: 'Recruiter Contacts',
      icon: UserCheck,
      count: counts.team,
    },
  ];

  return (
    <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto scrollbar-none pb-px -mx-4 px-4 sm:mx-0 sm:px-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              isActive
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
