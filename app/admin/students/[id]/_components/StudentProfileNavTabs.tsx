'use client';

import React from 'react';

export type StudentProfileTabType =
  | 'overview'
  | 'academic'
  | 'skills_projects'
  | 'applications'
  | 'interviews'
  | 'offers'
  | 'placement'
  | 'activity_logs';

interface StudentProfileNavTabsProps {
  activeTab: StudentProfileTabType;
  onTabChange: (tab: StudentProfileTabType) => void;
  applicationsCount?: number;
  interviewsCount?: number;
  offersCount?: number;
}

export function StudentProfileNavTabs({
  activeTab,
  onTabChange,
  applicationsCount = 0,
  interviewsCount = 0,
  offersCount = 0,
}: StudentProfileNavTabsProps) {
  const tabs: Array<{ id: StudentProfileTabType; label: string; count?: number }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'academic', label: 'Academic' },
    { id: 'skills_projects', label: 'Skills & Projects' },
    { id: 'applications', label: 'Applications', count: applicationsCount },
    { id: 'interviews', label: 'Interviews', count: interviewsCount },
    { id: 'offers', label: 'Offers', count: offersCount },
    { id: 'placement', label: 'Placement' },
    { id: 'activity_logs', label: 'Activity Logs' },
  ];

  return (
    <div className="border-b border-slate-200/90 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-1 sm:gap-2 min-w-max pb-px">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative py-3 px-3.5 sm:px-4 text-xs sm:text-sm font-extrabold tracking-tight transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'text-[#0D8B8A]'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60 rounded-t-xl'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {/* Active Underline Pill */}
              {isActive && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#0D8B8A] rounded-full shadow-xs" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
