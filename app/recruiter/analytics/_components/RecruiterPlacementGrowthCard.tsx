'use client';

import React from 'react';
import { TrendingUp, ArrowUpRight, Award, Zap } from 'lucide-react';
import { PlacementGrowthData } from '@/store/useRecruiterAnalyticsStore';

interface RecruiterPlacementGrowthCardProps {
  growth: PlacementGrowthData;
}

export function RecruiterPlacementGrowthCard({ growth }: RecruiterPlacementGrowthCardProps) {
  const g = growth || { growthPercentage: 28, year2024: 216, year2025: 280 };
  const netGain = g.year2025 - g.year2024;

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-2xs flex flex-col justify-between space-y-3.5 sm:space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-emerald-50 text-emerald-600">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h3 className="text-xs sm:text-sm md:text-base font-black text-[#0A2540] font-heading">
            Placement Growth
          </h3>
        </div>
        <span className="inline-flex items-center gap-1 text-[10.5px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
          <ArrowUpRight className="w-3 h-3" />
          <span>YoY Surge</span>
        </span>
      </div>

      {/* Main Growth Metric Highlight */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-heading tracking-tight">
            +{g.growthPercentage}%
          </span>
          <span className="text-xs font-bold text-slate-700">
            annual increase
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
          Net increase in students placed compared to last year
        </p>
      </div>

      {/* Responsive Horizontal YoY Comparative Progress Bars */}
      <div className="space-y-2.5 pt-1">
        
        {/* 2024 Progress Track */}
        <div className="space-y-1 group cursor-pointer">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-slate-500 group-hover:text-slate-800 transition-colors">
              2024 Placements
            </span>
            <span className="text-slate-700 font-black">
              {g.year2024} students
            </span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
            <div
              style={{ width: `${Math.round((g.year2024 / g.year2025) * 100)}%` }}
              className="h-full bg-blue-300 rounded-full transition-all duration-500 group-hover:bg-blue-400"
            />
          </div>
        </div>

        {/* 2025 Progress Track */}
        <div className="space-y-1 group cursor-pointer">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-[#0A2540] font-extrabold flex items-center gap-1 group-hover:text-blue-600 transition-colors">
              <span>2025 Placements</span>
              <span className="text-[9.5px] px-1.5 py-0.2 rounded-md bg-blue-100 text-blue-700 font-black">
                Current
              </span>
            </span>
            <span className="text-blue-700 font-black">
              {g.year2025} students
            </span>
          </div>
          <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 ring-1 ring-blue-200">
            <div
              style={{ width: '100%' }}
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-2xs transition-all duration-500 group-hover:brightness-110"
            />
          </div>
        </div>

      </div>

      {/* Bottom Mini Metrics Summary Box */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Net Added</span>
          <span className="text-xs sm:text-sm font-black text-emerald-600">+{netGain} Hires</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Drive Velocity</span>
          <span className="text-xs sm:text-sm font-black text-[#0A2540]">1.29x Scale</span>
        </div>
      </div>

    </div>
  );
}


