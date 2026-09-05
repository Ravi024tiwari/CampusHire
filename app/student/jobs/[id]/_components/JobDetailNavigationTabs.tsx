'use client';

import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  GitFork, 
  Building2, 
  Sparkles 
} from 'lucide-react';

export type JobDetailTabKey = 'overview' | 'job_description' | 'eligibility' | 'selection_process' | 'about_company';

interface JobDetailNavigationTabsProps {
  activeTab: JobDetailTabKey;
  onTabChange: (tab: JobDetailTabKey) => void;
}

export function JobDetailNavigationTabs({
  activeTab,
  onTabChange,
}: JobDetailNavigationTabsProps) {
  const tabs: Array<{ key: JobDetailTabKey; label: string; icon: React.FC<{ className?: string }> }> = [
    { key: 'overview', label: 'Overview', icon: Sparkles },
    { key: 'job_description', label: 'Job Description', icon: FileText },
    { key: 'eligibility', label: 'Eligibility', icon: CheckCircle2 },
    { key: 'selection_process', label: 'Selection Process', icon: GitFork },
    { key: 'about_company', label: 'About Company', icon: Building2 },
  ];

  return (
    <div className="border-b border-slate-200/90 pb-px">
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto [scrollbar-width:none] py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 ring-2 ring-blue-600/20'
                  : 'text-slate-600 hover:text-[#0A2540] hover:bg-slate-100/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
