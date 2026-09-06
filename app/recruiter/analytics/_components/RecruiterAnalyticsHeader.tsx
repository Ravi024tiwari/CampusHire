'use client';

import React from 'react';
import { Calendar, Download, ChevronDown, Sparkles } from 'lucide-react';
import { useRecruiterAnalyticsStore } from '@/store/useRecruiterAnalyticsStore';

interface RecruiterAnalyticsHeaderProps {
  onExportReport: () => void;
  isExporting?: boolean;
}

export function RecruiterAnalyticsHeader({ onExportReport, isExporting }: RecruiterAnalyticsHeaderProps) {
  const { yearRange, setYearRange } = useRecruiterAnalyticsStore();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
      {/* Title and Subtitle */}
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
            Placement Analytics
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-black">
            <Sparkles className="w-3 h-3 text-blue-600" />
            Live Insights
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Track your hiring impact, placement trends, and key insights across campuses.
        </p>
      </div>

      {/* Action Controls: Year Range Dropdown & Export Button */}
      <div className="flex items-center gap-2.5 sm:gap-3 self-start md:self-auto shrink-0">
        
        {/* Year Range Selector */}
        <div className="relative">
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-colors">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={yearRange}
              onChange={(e) => setYearRange(e.target.value)}
              className="appearance-none pr-5 bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="2021-2025">2021 - 2025</option>
              <option value="2022-2026">2022 - 2026</option>
              <option value="2024-2025">2024 - 2025</option>
              <option value="2025-2026">2025 - 2026</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
          </div>
        </div>

        {/* Export Report CTA */}
        <button
          type="button"
          onClick={onExportReport}
          disabled={isExporting}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 active:scale-98"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Exporting...' : 'Export Report'}</span>
        </button>
      </div>
    </div>
  );
}
