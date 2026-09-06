'use client';

import React from 'react';
import { 
  Building2, 
  Briefcase, 
  Users, 
  Image as ImageIcon, 
  BarChart2, 
  Sparkles 
} from 'lucide-react';
import { CompanyProfileTab, useRecruiterCompanyStore } from '@/store/useRecruiterCompanyStore';

interface CompanyProfileTabsProps {
  jobsCount?: number;
  teamCount?: number;
  galleryCount?: number;
}

export function CompanyProfileTabs({
  jobsCount = 0,
  teamCount = 0,
  galleryCount = 0,
}: CompanyProfileTabsProps) {
  const { activeTab, setActiveTab } = useRecruiterCompanyStore();

  const tabs: { id: CompanyProfileTab; label: string; count?: number; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'jobs', label: 'Jobs', count: jobsCount, icon: Briefcase },
    { id: 'team', label: 'Team Members', count: teamCount, icon: Users },
    { id: 'gallery', label: 'Gallery', count: galleryCount, icon: ImageIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <div className="w-full border-b border-slate-200/90 pb-2 flex items-center gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] sm:text-[11px] font-black ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-700'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
