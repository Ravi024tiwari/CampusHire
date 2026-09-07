'use client';

import React from 'react';
import { Plus, Download } from 'lucide-react';

interface AdminCollegesHeaderProps {
  onAddCollege: () => void;
  onExportData: () => void;
  isExporting?: boolean;
}

export function AdminCollegesHeader({
  onAddCollege,
  onExportData,
  isExporting = false,
}: AdminCollegesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
          Colleges
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          <span className="hidden sm:inline">Manage and verify all partner colleges on the platform.</span>
          <span className="sm:hidden">Manage and verify all partner colleges.</span>
        </p>
      </div>

      {/* Top Action Button */}
      <div className="flex items-center gap-2.5 self-start sm:self-auto">
        <button
          type="button"
          onClick={onAddCollege}
          className="inline-flex items-center gap-2 px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-xl bg-[#0D8B8A] hover:bg-[#0F766E] active:scale-95 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all duration-200"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>
            <span className="hidden sm:inline">Add College</span>
            <span className="sm:hidden">Add</span>
          </span>
        </button>
      </div>
    </div>
  );
}
