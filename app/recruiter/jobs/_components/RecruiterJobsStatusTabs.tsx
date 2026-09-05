'use client';

import React from 'react';
import { useRecruiterJobsStore } from '@/store/useRecruiterJobsStore';

interface TabItem {
  key: string;
  label: string;
  count: number;
  dotColor?: string;
}

interface RecruiterJobsStatusTabsProps {
  totalCount?: number;
  liveCount?: number;
  draftCount?: number;
  closedCount?: number;
  expiredCount?: number;
}

export function RecruiterJobsStatusTabs({
  totalCount = 24,
  liveCount = 18,
  draftCount = 2,
  closedCount = 4,
  expiredCount = 0,
}: RecruiterJobsStatusTabsProps) {
  const { filters, setFilter } = useRecruiterJobsStore();

  const tabs: TabItem[] = [
    { key: 'ALL', label: 'All Jobs', count: totalCount },
    { key: 'ACTIVE', label: 'Live', count: liveCount, dotColor: 'bg-emerald-500' },
    { key: 'DRAFT', label: 'Drafts', count: draftCount, dotColor: 'bg-slate-400' },
    { key: 'CLOSED', label: 'Closed', count: closedCount, dotColor: 'bg-red-500' },
    { key: 'EXPIRED', label: 'Expired', count: expiredCount, dotColor: 'bg-amber-500' },
  ];

  const handleTabClick = (key: string) => {
    if (key === 'EXPIRED') {
      setFilter('selectedTimeline', 'PAST');
      setFilter('selectedStatus', 'ALL');
    } else {
      setFilter('selectedStatus', key);
      if (filters.selectedTimeline === 'PAST') {
        setFilter('selectedTimeline', 'ALL');
      }
    }
  };

  const isTabActive = (tabKey: string) => {
    if (tabKey === 'EXPIRED') {
      return filters.selectedTimeline === 'PAST';
    }
    return filters.selectedStatus === tabKey && filters.selectedTimeline !== 'PAST';
  };

  return (
    <div className="border-b border-slate-200/80 bg-white/50 backdrop-blur-xs rounded-2xl px-2">
      <div className="flex items-center gap-1 sm:gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mb-px">
        {tabs.map((tab) => {
          const active = isTabActive(tab.key);
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabClick(tab.key)}
              className={`group relative flex items-center gap-2 py-3.5 px-3 border-b-2 text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                active
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab.dotColor && (
                <span className={`h-2 w-2 rounded-full ${tab.dotColor} ${tab.key === 'ACTIVE' ? 'animate-pulse' : ''}`} />
              )}
              <span>{tab.label}</span>
              <span
                className={`text-[11px] font-black px-2 py-0.5 rounded-full transition-colors tabular-nums ${
                  active
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
