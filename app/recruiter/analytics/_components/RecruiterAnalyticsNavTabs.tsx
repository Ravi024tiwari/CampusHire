'use client';

import React, { useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  Building2,
  MapPin,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useRecruiterAnalyticsStore, AnalyticsNavTab } from '@/store/useRecruiterAnalyticsStore';

export interface IndexedNavTabItem {
  id: AnalyticsNavTab;
  index: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  targetId: string;
  badge?: string;
}

export const ANALYTICS_INDEXED_TABS: IndexedNavTabItem[] = [
  {
    id: 'overview',
    index: '01',
    label: 'Overview Metrics',
    shortLabel: 'Overview',
    icon: LayoutDashboard,
    targetId: 'section-01-overview',
  },
  {
    id: 'trends',
    index: '02',
    label: 'Hiring Trends',
    shortLabel: 'Trends',
    icon: TrendingUp,
    targetId: 'section-02-trends',
  },
  {
    id: 'roles',
    index: '03',
    label: 'Role & Job Types',
    shortLabel: 'Roles',
    icon: Briefcase,
    targetId: 'section-03-roles',
  },
  {
    id: 'colleges',
    index: '04',
    label: 'College Wise',
    shortLabel: 'Colleges',
    icon: Building2,
    targetId: 'section-04-colleges',
  },
  {
    id: 'locations',
    index: '05',
    label: 'Location & Batches',
    shortLabel: 'Locations',
    icon: MapPin,
    targetId: 'section-05-locations',
  },
  {
    id: 'insights',
    index: '06',
    label: 'Growth & Insights',
    shortLabel: 'Insights',
    icon: Sparkles,
    targetId: 'section-06-insights',
    badge: 'AI',
  },
];

interface RecruiterAnalyticsNavTabsProps {
  onNavigateToSection?: (targetId: string, tabId: AnalyticsNavTab) => void;
}

export function RecruiterAnalyticsNavTabs({ onNavigateToSection }: RecruiterAnalyticsNavTabsProps) {
  const { activeTab, setActiveTab } = useRecruiterAnalyticsStore();
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll the active tab into the center of the viewport on tab change
  useEffect(() => {
    if (activeTabRef.current && tabsContainerRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeTab]);

  const handleTabClick = (tab: IndexedNavTabItem) => {
    setActiveTab(tab.id);
    if (onNavigateToSection) {
      onNavigateToSection(tab.targetId, tab.id);
    } else {
      const el = document.getElementById(tab.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const activeIndexNumber = ANALYTICS_INDEXED_TABS.find((t) => t.id === activeTab)?.index || '01';

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-xs p-1.5 sm:p-2 transition-all duration-300">
      <div className="flex items-center justify-between gap-3">
        
        {/* Left: Quick Section Index Indicator (Desktop & Tablet) */}
        <div className="hidden lg:flex items-center gap-2 pl-2 pr-3 py-1 border-r border-slate-200 shrink-0 select-none">
          <div className="w-6 h-6 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Index Navigator</span>
            <span className="text-[11px] font-black text-slate-800">
              Section <span className="text-blue-600 font-extrabold">{activeIndexNumber}</span> / 06
            </span>
          </div>
        </div>

        {/* Center: Scrollable Indexed Tabs */}
        <div
          ref={tabsContainerRef}
          className="flex-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5 px-0.5 scroll-smooth"
        >
          {ANALYTICS_INDEXED_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                ref={isActive ? activeTabRef : undefined}
                type="button"
                onClick={() => handleTabClick(tab)}
                className={`group relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl sm:rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                    : 'bg-slate-50/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100/90 border border-slate-200/60 hover:border-slate-300'
                }`}
                title={`Jump to Section ${tab.index}: ${tab.label}`}
              >
                {/* Numeric Index Badge */}
                <span
                  className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-md text-[10px] font-black tracking-wider transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200/80 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                  }`}
                >
                  {tab.index}
                </span>

                {/* Icon */}
                <Icon
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600 group-hover:scale-110'
                  }`}
                />

                {/* Tab Label (Shortened on small mobile, full on tablet/desktop) */}
                <span className="hidden xs:inline">{tab.label}</span>
                <span className="inline xs:hidden">{tab.shortLabel}</span>

                {/* Optional Badge (e.g. AI) */}
                {tab.badge && (
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}

                {/* Active Underline Glow Indicator */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-blue-400 blur-xs animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Mobile Index Counter */}
        <div className="flex lg:hidden items-center text-[11px] font-black text-slate-500 px-2 py-1 bg-slate-100 rounded-lg shrink-0">
          <span className="text-blue-600 font-extrabold">{activeIndexNumber}</span>
          <span className="text-slate-400 mx-0.5">/</span>
          <span>06</span>
        </div>

      </div>
    </div>
  );
}
