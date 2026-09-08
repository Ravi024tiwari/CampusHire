'use strict';
'use client';

import React from 'react';
import { Download, Plus } from 'lucide-react';

interface TpoStudentsHeaderProps {
  collegeName?: string;
  onOpenAddModal: () => void;
  onExport: () => void;
  isExporting?: boolean;
}

export function TpoStudentsHeader({
  collegeName = 'University Campus',
  onOpenAddModal,
  onExport,
  isExporting = false,
}: TpoStudentsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-1">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] tracking-tight">
          Students
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5 sm:mt-1">
          View and manage all students registered under <span className="font-bold text-[#0A2540]">{collegeName}</span>.
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <button
          onClick={onExport}
          disabled={isExporting}
          type="button"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs hover:border-slate-300 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
          <span>{isExporting ? 'Exporting...' : 'Export'}</span>
        </button>

        <button
          onClick={onOpenAddModal}
          type="button"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Add Student</span>
        </button>
      </div>
    </div>
  );
}
