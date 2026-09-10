'use client';

import React from 'react';
import { User, Lock, Settings, ScrollText } from 'lucide-react';

export type AdminProfileTabType = 'general' | 'security' | 'preferences' | 'audit';

interface AdminProfileNavTabsProps {
  activeTab: AdminProfileTabType;
  onTabChange: (tab: AdminProfileTabType) => void;
  hasUnsavedSecurity?: boolean;
}

export function AdminProfileNavTabs({
  activeTab,
  onTabChange,
  hasUnsavedSecurity = false,
}: AdminProfileNavTabsProps) {
  const tabs = [
    {
      id: 'general' as AdminProfileTabType,
      label: 'Executive Identity',
      icon: User,
      badge: null,
    },
    {
      id: 'security' as AdminProfileTabType,
      label: 'Security & Password',
      icon: Lock,
      badge: hasUnsavedSecurity ? 'Modified' : null,
    },
    {
      id: 'preferences' as AdminProfileTabType,
      label: 'Governance & Alerts',
      icon: Settings,
      badge: null,
    },
    {
      id: 'audit' as AdminProfileTabType,
      label: 'Session & Audit Trail',
      icon: ScrollText,
      badge: 'Live',
    },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              isActive
                ? 'bg-[#0D8B8A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className={`text-[9.5px] font-black px-1.5 py-0.2 rounded-full ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : tab.badge === 'Live'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
