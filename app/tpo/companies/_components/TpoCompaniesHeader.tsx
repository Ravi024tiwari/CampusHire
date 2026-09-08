'use client';

import React from 'react';
import { Plus, ChevronDown, Calendar, Building2 } from 'lucide-react';

interface TpoCompaniesHeaderProps {
  academicYear: string;
  onAcademicYearChange: (year: string) => void;
  onAddCompany: () => void;
}

export function TpoCompaniesHeader({
  academicYear,
  onAcademicYearChange,
  onAddCompany,
}: TpoCompaniesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-tight">
          Companies
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          View and manage all companies that have visited your campus.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
        {/* Academic Year Dropdown */}
        <div className="relative inline-block">
          <select
            value={academicYear}
            onChange={(e) => onAcademicYearChange(e.target.value)}
            className="appearance-none bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm cursor-pointer transition-all"
          >
            <option value="Academic Year 2025-26">Academic Year 2025–26</option>
            <option value="Academic Year 2024-25">Academic Year 2024–25</option>
            <option value="Academic Year 2023-24">Academic Year 2023–24</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Add Company / Recruiter Button */}
        <button
          onClick={onAddCompany}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Company</span>
        </button>
      </div>
    </div>
  );
}
