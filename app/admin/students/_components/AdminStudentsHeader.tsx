'use client';

import React from 'react';
import { Download, Plus, Users } from 'lucide-react';

interface AdminStudentsHeaderProps {
  onExport: () => void;
  onAddStudent: () => void;
  isExporting?: boolean;
}

export function AdminStudentsHeader({
  onExport,
  onAddStudent,
  isExporting = false,
}: AdminStudentsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title & Description */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
          Students
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          <span className="hidden sm:inline">Manage and monitor all registered students on the platform.</span>
          <span className="sm:hidden">Manage all registered students.</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 sm:gap-3 self-start sm:self-auto">
        {/* Export Data Button */}
        <button
          type="button"
          onClick={onExport}
          disabled={isExporting}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 text-slate-700 hover:text-slate-900 border border-slate-200/90 font-bold text-xs shadow-2xs transition-all duration-200 disabled:opacity-60"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>{isExporting ? 'Exporting...' : 'Export Data'}</span>
        </button>

        {/* Add Student Button */}
        <button
          type="button"
          onClick={onAddStudent}
          className="inline-flex items-center gap-2 px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-xl bg-[#0D8B8A] hover:bg-[#0F766E] active:scale-95 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all duration-200"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>
            <span className="hidden sm:inline">Add Student</span>
            <span className="sm:hidden">Add</span>
          </span>
        </button>
      </div>
    </div>
  );
}
