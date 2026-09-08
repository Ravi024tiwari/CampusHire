'use client';

import React from 'react';
import { TpoCompanyInsights } from '../_types/tpo-companies.types';

interface TpoCompaniesStatusTabsProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  insights: TpoCompanyInsights;
}

export function TpoCompaniesStatusTabs({
  currentStatus,
  onStatusChange,
  insights,
}: TpoCompaniesStatusTabsProps) {
  const tabs = [
    {
      id: 'ALL',
      label: 'All',
      count: insights?.total ?? 64,
    },
    {
      id: 'VISITED',
      label: 'Visited This Year',
      count: insights?.visitedThisYear ?? 48,
    },
    {
      id: 'UPCOMING',
      label: 'Upcoming',
      count: insights?.upcoming ?? 6,
    },
    {
      id: 'PAST',
      label: 'Past',
      count: insights?.past ?? 10,
    },
  ];

  return (
    <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto scrollbar-none pb-px -mx-4 px-4 sm:mx-0 sm:px-0">
      {tabs.map((tab) => {
        const isActive = currentStatus === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onStatusChange(tab.id)}
            className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              isActive
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
