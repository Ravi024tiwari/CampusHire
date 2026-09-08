'use client';

import React, { useState } from 'react';
import { Users, UserCheck, GraduationCap, Search, TrendingUp } from 'lucide-react';
import type { TpoDashboardData } from '@/store/useTpoStore';

interface PlacementStatsDonutProps {
  stats?: TpoDashboardData['placementStatistics'];
}

type CategoryKey = 'all' | 'placed' | 'higher' | 'looking';

export function PlacementStatsDonut({ stats }: PlacementStatsDonutProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const eligible = stats?.eligibleStudents || 242;
  const placed = stats?.studentsPlaced || 192;
  const higherStudies = stats?.higherStudies || 18;
  const stillLooking = stats?.stillLooking || 32;

  // Percentage calculations
  const placedPct = eligible > 0 ? ((placed / eligible) * 100).toFixed(1) : '79.3';
  const higherPct = eligible > 0 ? ((higherStudies / eligible) * 100).toFixed(1) : '7.4';
  const lookingPct = eligible > 0 ? ((stillLooking / eligible) * 100).toFixed(1) : '13.2';
  const overallRate = stats?.placementRate || Math.round(parseFloat(placedPct));

  // Multi-segment Donut SVG math based on radius = 38 (viewBox="0 0 100 100")
  const radius = 38;
  const circumference = 2 * Math.PI * radius; // ~238.76

  const placedStroke = (parseFloat(placedPct) / 100) * circumference;
  const higherStroke = (parseFloat(higherPct) / 100) * circumference;
  const lookingStroke = (parseFloat(lookingPct) / 100) * circumference;

  // Dynamic center metrics
  const getCenterContent = () => {
    switch (activeCategory) {
      case 'placed':
        return {
          title: `${placed}`,
          label: 'Students Placed',
          sub: `${placedPct}%`,
          color: 'text-emerald-600',
        };
      case 'higher':
        return {
          title: `${higherStudies}`,
          label: 'Higher Studies',
          sub: `${higherPct}%`,
          color: 'text-sky-600',
        };
      case 'looking':
        return {
          title: `${stillLooking}`,
          label: 'Still Looking',
          sub: `${lookingPct}%`,
          color: 'text-amber-600',
        };
      case 'all':
      default:
        return {
          title: `${overallRate}%`,
          label: 'Placement Rate',
          sub: `${placed}/${eligible}`,
          color: 'text-[#0A2540]',
        };
    }
  };

  const centerData = getCenterContent();

  const cohortItems = [
    {
      key: 'all' as CategoryKey,
      title: 'Eligible Students',
      count: eligible,
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
      activeRing: 'ring-1.5 ring-blue-500 bg-blue-50/50 border-blue-200',
    },
    {
      key: 'placed' as CategoryKey,
      title: 'Students Placed',
      count: placed,
      icon: UserCheck,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      activeRing: 'ring-1.5 ring-emerald-500 bg-emerald-50/50 border-emerald-200',
    },
    {
      key: 'higher' as CategoryKey,
      title: 'Higher Studies',
      count: higherStudies,
      icon: GraduationCap,
      iconBg: 'bg-sky-50 text-sky-600 border-sky-100',
      activeRing: 'ring-1.5 ring-sky-500 bg-sky-50/50 border-sky-200',
    },
    {
      key: 'looking' as CategoryKey,
      title: 'Still Looking',
      count: stillLooking,
      icon: Search,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      activeRing: 'ring-1.5 ring-amber-500 bg-amber-50/50 border-amber-200',
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-5 lg:p-6 shadow-xs flex flex-col justify-between space-y-4 overflow-hidden w-full min-w-0 transition-all">
      
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between gap-2 min-w-0">
        <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading truncate">
          Placement Statistics (2025)
        </h3>

        <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
          {overallRate}%
        </span>
      </div>

      {/* 2. Scalable Circular Donut Gauge */}
      <div 
        onMouseLeave={() => setActiveCategory('all')}
        className="relative w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 mx-auto flex items-center justify-center shrink-0 cursor-pointer select-none group"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Background Ring Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#F1F5F9"
            strokeWidth="9"
            fill="transparent"
          />

          {/* Segment 1: Placed Students (Emerald) */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#10B981"
            strokeWidth={activeCategory === 'placed' ? 11 : 9}
            strokeDasharray={`${placedStroke} ${circumference}`}
            strokeDashoffset="0"
            strokeLinecap="round"
            fill="transparent"
            onMouseEnter={() => setActiveCategory('placed')}
            className="transition-all duration-300 hover:stroke-emerald-400"
          />

          {/* Segment 2: Higher Studies (Sky Blue) */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#0284C7"
            strokeWidth={activeCategory === 'higher' ? 11 : 9}
            strokeDasharray={`${higherStroke} ${circumference}`}
            strokeDashoffset={`-${placedStroke}`}
            strokeLinecap="round"
            fill="transparent"
            onMouseEnter={() => setActiveCategory('higher')}
            className="transition-all duration-300 hover:stroke-sky-400"
          />

          {/* Segment 3: Still Looking (Amber) */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#F59E0B"
            strokeWidth={activeCategory === 'looking' ? 11 : 9}
            strokeDasharray={`${lookingStroke} ${circumference}`}
            strokeDashoffset={`-${placedStroke + higherStroke}`}
            strokeLinecap="round"
            fill="transparent"
            onMouseEnter={() => setActiveCategory('looking')}
            className="transition-all duration-300 hover:stroke-amber-300"
          />
        </svg>

        {/* Center Numbers & Outcome Tag */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1 pointer-events-none">
          <span className={`text-xl xs:text-2xl font-black font-heading tracking-tight leading-none transition-all duration-200 ${centerData.color}`}>
            {centerData.title}
          </span>
          <span className="text-[10px] font-bold text-slate-700 mt-1 leading-tight truncate max-w-[90px]">
            {centerData.label}
          </span>
          <span className="text-[9px] font-mono font-semibold text-slate-400 mt-0.5">
            {centerData.sub}
          </span>
        </div>
      </div>

      {/* 3. Stacked 4 Cohort Metrics List (100% Contained & Non-Overflowing) */}
      <div className="w-full space-y-1.5 min-w-0">
        {cohortItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeCategory === item.key;
          return (
            <div
              key={item.key}
              onMouseEnter={() => setActiveCategory(item.key)}
              onClick={() => setActiveCategory(activeCategory === item.key ? 'all' : item.key)}
              className={`w-full flex items-center justify-between p-2 sm:p-2.5 rounded-2xl border transition-all cursor-pointer min-w-0 ${
                isActive ? item.activeRing : 'border-slate-100 hover:bg-slate-50/80 bg-slate-50/40'
              }`}
            >
              {/* Icon & Label */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className={`w-7 h-7 rounded-xl border flex items-center justify-center shadow-2xs shrink-0 ${item.iconBg}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-700 truncate">
                  {item.title}
                </span>
              </div>

              {/* Number Count */}
              <span className="text-xs sm:text-sm font-black text-slate-900 font-heading font-mono ml-2 shrink-0">
                {item.count}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
