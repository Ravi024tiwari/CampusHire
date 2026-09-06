'use client';

import React from 'react';
import { useRecruiterAnalyticsStore, AnalyticsNavTab } from '@/store/useRecruiterAnalyticsStore';

export function RecruiterAnalyticsNavTabs() {
  const { activeTab, setActiveTab } = useRecruiterAnalyticsStore();

  const tabs: Array<{ id: AnalyticsNavTab; label: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'trends', label: 'Hiring Trends' },
    { id: 'colleges', label: 'College Wise' },
    { id: 'roles', label: 'Role Wise' },
    { id: 'offers', label: 'Offer Analytics' },
    { id: 'insights', label: 'Candidate Insights' },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/80">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-xs font-black whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
              isActive
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
