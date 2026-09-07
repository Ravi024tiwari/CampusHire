'use client';

import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, X, ChevronDown } from 'lucide-react';
import type { AdminStudentFilters, AdminStudentFilterOptions } from '@/store/useAdminStore';

interface AdminStudentsFilterBarProps {
  filters: AdminStudentFilters;
  filterOptions: AdminStudentFilterOptions | null;
  onFilterChange: (filters: Partial<AdminStudentFilters>) => void;
  onResetFilters: () => void;
  onOpenMobileFilters: () => void;
}

export function AdminStudentsFilterBar({
  filters,
  filterOptions,
  onFilterChange,
  onResetFilters,
  onOpenMobileFilters,
}: AdminStudentsFilterBarProps) {
  const hasActiveFilters =
    Boolean(filters.search) ||
    filters.collegeId !== 'ALL' ||
    filters.batchYear !== 'ALL' ||
    filters.jobRole !== 'ALL' ||
    filters.status !== 'ALL' ||
    filters.placementStatus !== 'ALL';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-3.5">
      {/* Top Search & Filter Toggles */}
      <div className="flex items-center gap-3">
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email, or roll number..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-10 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] transition-all"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Filter Drawer Button (Visible on mobile/tablet) */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs shrink-0 transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-[#0D8B8A]" />
          )}
        </button>

        {/* Clear All Button (Visible when active filters on desktop) */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Desktop Filter Dropdowns Row */}
      <div className="hidden lg:grid grid-cols-5 gap-3 pt-1">
        
        {/* 1. College Dropdown */}
        <div className="relative">
          <select
            value={filters.collegeId}
            onChange={(e) => onFilterChange({ collegeId: e.target.value })}
            className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs bg-slate-50/90 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] cursor-pointer transition-all truncate"
          >
            <option value="ALL">All Colleges</option>
            {filterOptions?.colleges.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 2. Batch Year Dropdown */}
        <div className="relative">
          <select
            value={filters.batchYear}
            onChange={(e) => onFilterChange({ batchYear: e.target.value })}
            className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs bg-slate-50/90 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] cursor-pointer transition-all"
          >
            <option value="ALL">All Batches</option>
            {(filterOptions?.batches || [2024, 2025, 2026, 2027, 2028]).map((b) => (
              <option key={b} value={String(b)}>
                Batch {b}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 3. Job Roles / Skills Dropdown */}
        <div className="relative">
          <select
            value={filters.jobRole}
            onChange={(e) => onFilterChange({ jobRole: e.target.value })}
            className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs bg-slate-50/90 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] cursor-pointer transition-all truncate"
          >
            <option value="ALL">All Job Roles</option>
            {(filterOptions?.jobRoles || [
              'SDE',
              'Frontend',
              'Backend',
              'Data',
              'AI / ML',
              'Product',
              'UI/UX',
              'Cloud',
              'DevOps',
              'Security',
            ]).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 4. Account Status Dropdown */}
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs bg-slate-50/90 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] cursor-pointer transition-all"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 5. Placement Status Dropdown */}
        <div className="relative">
          <select
            value={filters.placementStatus}
            onChange={(e) => onFilterChange({ placementStatus: e.target.value })}
            className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs bg-slate-50/90 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] cursor-pointer transition-all"
          >
            <option value="ALL">All Placement Status</option>
            <option value="PLACED">Placed</option>
            <option value="INTERVIEWING">Interviewing</option>
            <option value="OFFERED">Offered</option>
            <option value="NOT_PLACED">Not Placed</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
