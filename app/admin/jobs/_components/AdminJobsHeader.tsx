'use client';

import React from 'react';
import { Download } from 'lucide-react';

interface AdminJobsHeaderProps {
  onExport: () => void;
  isExporting?: boolean;
}

export function AdminJobsHeader({
  onExport,
  isExporting = false,
}: AdminJobsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title & Description */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
          Jobs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          <span className="hidden sm:inline">Manage and monitor all job postings on the platform.</span>
          <span className="sm:hidden">Manage all job postings.</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 sm:gap-3 self-start sm:self-auto">
        {/* Export Data Button */}
        <button
          type="button"
          onClick={onExport}
          disabled={isExporting}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 text-slate-700 hover:text-slate-900 border border-slate-200/90 font-bold text-xs shadow-2xs transition-all duration-200 disabled:opacity-60 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>{isExporting ? 'Exporting...' : 'Export Data'}</span>
        </button>
      </div>
    </div>
  );
}
