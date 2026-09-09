'use client';

import React from 'react';
import { Download, ChevronDown, RefreshCw } from 'lucide-react';

interface TpoAnalyticsHeaderProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
  availableYears?: string[];
  onDownloadReport: () => void;
  isDownloading?: boolean;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function TpoAnalyticsHeader({
  selectedYear,
  onYearChange,
  availableYears,
  onDownloadReport,
  isDownloading = false,
  onRefresh,
  isLoading = false,
}: TpoAnalyticsHeaderProps) {
  const defaultYears = ['ALL', '2026-27', '2025-26', '2024-25'];
  const yearsList = availableYears && availableYears.length > 0 ? availableYears : defaultYears;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-[28px] font-black tracking-tight text-[#0A2540] font-heading flex items-center gap-2.5">
          Placement Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
          Get a comprehensive overview of your students&apos; placement journey.
        </p>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh Analytics"
          className="p-2.5 rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:text-[#2563EB] hover:border-blue-200 hover:bg-blue-50/50 shadow-2xs transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#2563EB]' : ''}`} />
        </button>

        {/* Academic Year Selector */}
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="appearance-none bg-white border border-slate-200/90 hover:border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl px-3.5 py-2.5 pr-8 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all cursor-pointer"
          >
            {yearsList.map((yr) => (
              <option key={yr} value={yr}>
                {yr === 'ALL' ? 'All Academic Batches' : `Academic Year ${yr}`}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Download Placement Report Button */}
        <button
          onClick={onDownloadReport}
          disabled={isDownloading}
          className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold rounded-xl px-4 py-2.5 shadow-sm shadow-blue-500/25 transition-all duration-200 hover:shadow-md hover:shadow-blue-500/30 active:scale-95 shrink-0 cursor-pointer"
        >
          <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
          <span>{isDownloading ? 'Exporting...' : 'Download Report'}</span>
        </button>
      </div>
    </div>
  );
}
