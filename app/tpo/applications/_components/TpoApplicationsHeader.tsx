'use strict';
'use client';

import React from 'react';
import { Download, ChevronDown, Calendar } from 'lucide-react';

interface TpoApplicationsHeaderProps {
  totalCount: number;
  academicYear: string;
  onAcademicYearChange: (year: string) => void;
  onExportCsv: () => void;
  isExporting?: boolean;
}

export function TpoApplicationsHeader({
  totalCount,
  academicYear,
  onAcademicYearChange,
  onExportCsv,
  isExporting = false,
}: TpoApplicationsHeaderProps) {
  const academicYears = ['Academic Year 2025–26', 'Academic Year 2024–25', 'Academic Year 2023–24'];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-1">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] tracking-tight">
          Applications
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5 sm:mt-1">
          <span className="hidden sm:inline">Track and manage all job applications submitted by your students.</span>
          <span className="sm:hidden">Track student applications.</span>
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {/* Export Data Button */}
        <button
          onClick={onExportCsv}
          disabled={isExporting || totalCount === 0}
          type="button"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs hover:border-slate-300 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
          <span>{isExporting ? 'Exporting...' : 'Export Data'}</span>
        </button>

        {/* Academic Year Selector */}
        <div className="relative inline-block text-left">
          <select
            value={academicYear}
            onChange={(e) => onAcademicYearChange(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-2 sm:py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl shadow-2xs outline-none focus:border-blue-500 cursor-pointer transition-colors"
          >
            {academicYears.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
