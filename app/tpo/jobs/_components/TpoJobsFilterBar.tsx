'use client';

import React from 'react';
import { Search, X, SlidersHorizontal, ChevronDown, RotateCcw } from 'lucide-react';

export interface FilterOptions {
  companies: { id: string; name: string; logoUrl?: string | null }[];
  roles: string[];
  locations: string[];
  branches: string[];
  batches: number[];
}

export interface FilterState {
  search: string;
  companyId: string;
  role: string;
  type: string;
  location: string;
  branch: string;
  batchYear: string;
}

interface TpoJobsFilterBarProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClearAll: () => void;
  filterOptions: FilterOptions;
  activeFilterCount: number;
  onOpenMobileFilters: () => void;
}

export function TpoJobsFilterBar({
  filters,
  onFilterChange,
  onClearAll,
  filterOptions,
  activeFilterCount,
  onOpenMobileFilters,
}: TpoJobsFilterBarProps) {
  const jobTypes = [
    { label: 'All Types', value: 'ALL' },
    { label: 'Full Time', value: 'FULL_TIME' },
    { label: 'Internship', value: 'INTERNSHIP' },
    { label: 'Intern + FTE', value: 'INTERN_PLUS_FTE' },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-3">
      {/* Top Search & Actions Row */}
      <div className="flex items-center gap-2.5">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search by job title, company, skills, or location..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all font-medium"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange('search', '')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile / Tablet Filter Drawer Button */}
        <button
          onClick={onOpenMobileFilters}
          className="flex lg:hidden items-center gap-1.5 px-3.5 py-2.5 bg-blue-50/80 hover:bg-blue-100 text-[#2563EB] border border-blue-200/80 rounded-xl text-xs font-semibold shadow-2xs transition-all active:scale-95 shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white text-[10px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Clear All CTA (Desktop & Mobile) */}
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-blue-800 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Desktop 6-Column Dropdown Selectors Row */}
      <div className="hidden lg:grid grid-cols-6 gap-2.5 pt-1">
        {/* 1. Company Filter */}
        <div className="relative">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Company
          </label>
          <div className="relative">
            <select
              value={filters.companyId}
              onChange={(e) => onFilterChange('companyId', e.target.value)}
              className="w-full appearance-none bg-slate-50/60 hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-xl px-3 py-2 pr-7 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all cursor-pointer truncate"
            >
              <option value="ALL">All Companies</option>
              {filterOptions.companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 2. Job Role Filter */}
        <div className="relative">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Job Role
          </label>
          <div className="relative">
            <select
              value={filters.role}
              onChange={(e) => onFilterChange('role', e.target.value)}
              className="w-full appearance-none bg-slate-50/60 hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-xl px-3 py-2 pr-7 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all cursor-pointer truncate"
            >
              <option value="ALL">All Roles</option>
              {filterOptions.roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3. Job Type Filter */}
        <div className="relative">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Job Type
          </label>
          <div className="relative">
            <select
              value={filters.type}
              onChange={(e) => onFilterChange('type', e.target.value)}
              className="w-full appearance-none bg-slate-50/60 hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-xl px-3 py-2 pr-7 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all cursor-pointer truncate"
            >
              {jobTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 4. Location Filter */}
        <div className="relative">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Location
          </label>
          <div className="relative">
            <select
              value={filters.location}
              onChange={(e) => onFilterChange('location', e.target.value)}
              className="w-full appearance-none bg-slate-50/60 hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-xl px-3 py-2 pr-7 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all cursor-pointer truncate"
            >
              <option value="ALL">All Locations</option>
              {filterOptions.locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 5. Eligible Branches Filter */}
        <div className="relative">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Eligible Branches
          </label>
          <div className="relative">
            <select
              value={filters.branch}
              onChange={(e) => onFilterChange('branch', e.target.value)}
              className="w-full appearance-none bg-slate-50/60 hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-xl px-3 py-2 pr-7 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all cursor-pointer truncate"
            >
              <option value="ALL">All Branches</option>
              {filterOptions.branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 6. Batch Year Filter */}
        <div className="relative">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Batch Year
          </label>
          <div className="relative">
            <select
              value={filters.batchYear}
              onChange={(e) => onFilterChange('batchYear', e.target.value)}
              className="w-full appearance-none bg-slate-50/60 hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-xl px-3 py-2 pr-7 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all cursor-pointer truncate"
            >
              <option value="ALL">All Years</option>
              {filterOptions.batches.map((batch) => (
                <option key={batch} value={batch.toString()}>
                  Batch {batch}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
