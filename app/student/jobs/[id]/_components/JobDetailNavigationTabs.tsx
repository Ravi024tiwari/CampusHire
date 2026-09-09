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
  const tabs: Array<{ key: JobDetailTabKey; sectionId: string; label: string; icon: React.FC<{ className?: string }> }> = [
    { key: 'overview', sectionId: 'section-overview', label: 'Overview & ATS Fit', icon: Sparkles },
    { key: 'job_description', sectionId: 'section-job-description', label: 'Job Description', icon: FileText },
    { key: 'eligibility', sectionId: 'section-eligibility', label: 'Eligibility Criteria', icon: CheckCircle2 },
    { key: 'selection_process', sectionId: 'section-selection-process', label: 'Selection Process', icon: GitFork },
    { key: 'about_company', sectionId: 'section-about-company', label: 'About Company', icon: Building2 },
  ];

  const handleTabClick = (tabKey: JobDetailTabKey, sectionId: string) => {
    onTabChange(tabKey);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-[#F8FAFC]/95 backdrop-blur-md py-2.5 border-b border-slate-200/90 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 transition-all duration-200 shadow-2xs">
      <div className="max-w-[1700px] mx-auto flex items-center gap-1 sm:gap-2 overflow-x-auto [scrollbar-width:none] py-0.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabClick(tab.key, tab.sectionId)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 ring-2 ring-blue-600/20'
                  : 'text-slate-600 hover:text-[#0A2540] hover:bg-slate-200/70 bg-white/60 border border-slate-200/60'
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
