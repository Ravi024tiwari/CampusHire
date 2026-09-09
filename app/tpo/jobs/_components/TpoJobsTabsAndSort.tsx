'use client';

import React from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

export type JobTabType = 'all' | 'open' | 'closing_soon' | 'internships' | 'full_time';

export interface TabCounts {
  all: number;
  open: number;
  closingSoon: number;
  internships: number;
  fullTime: number;
}

interface TpoJobsTabsAndSortProps {
  activeTab: JobTabType;
  onTabChange: (tab: JobTabType) => void;
  tabCounts: TabCounts;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export function TpoJobsTabsAndSort({
  activeTab,
  onTabChange,
  tabCounts,
  sortBy,
  onSortChange,
}: TpoJobsTabsAndSortProps) {
  const tabs = [
    {
      id: 'all' as JobTabType,
      label: 'All Jobs',
      count: tabCounts.all,
    },
    {
      id: 'open' as JobTabType,
      label: 'Open',
      count: tabCounts.open,
    },
    {
      id: 'closing_soon' as JobTabType,
      label: 'Closing Soon',
      count: tabCounts.closingSoon,
      badgeColor: 'bg-amber-100 text-amber-800 border border-amber-200/80',
    },
    {
      id: 'internships' as JobTabType,
      label: 'Internships',
      count: tabCounts.internships,
    },
    {
      id: 'full_time' as JobTabType,
      label: 'Full Time',
      count: tabCounts.fullTime,
    },
  ];

  const sortOptions = [
    { label: 'Posted Date (Newest)', value: 'newest' },
    { label: 'Posted Date (Oldest)', value: 'oldest' },
    { label: 'Closing Soonest', value: 'deadline_asc' },
    { label: 'Highest Salary CTC', value: 'salary_desc' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pt-1">
      {/* Scrollable Tabs List */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth -mb-px">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group relative flex items-center gap-1.5 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-[#2563EB]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                  tab.badgeColor
                    ? tab.badgeColor
                    : isActive
                    ? 'bg-blue-100 text-[#2563EB]'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                }`}
              >
                ({tab.count})
              </span>

              {/* Active Bottom Tab Line */}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Sort Selector */}
      <div className="flex items-center justify-end gap-2 pb-2 sm:pb-0 shrink-0">
        <span className="text-xs font-semibold text-slate-500 hidden md:inline">
          Sort by:
        </span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 pr-7 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
