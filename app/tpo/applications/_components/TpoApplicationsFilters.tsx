'use strict';
'use client';

import React from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  ChevronDown, 
  Calendar, 
  Building2, 
  Briefcase, 
  MapPin, 
  GraduationCap,
  X
} from 'lucide-react';
import { TpoApplicationsFilterOptions, TpoApplicationsFilterState } from '../_types/tpo-applications.types';

interface TpoApplicationsFiltersProps {
  filters: TpoApplicationsFilterState;
  filterOptions: TpoApplicationsFilterOptions;
  onFilterChange: (updates: Partial<TpoApplicationsFilterState>) => void;
  onClearAll: () => void;
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  activeFilterCount: number;
}

export function TpoApplicationsFilters({
  filters,
  filterOptions,
  onFilterChange,
  onClearAll,
  showAdvanced,
  onToggleAdvanced,
  activeFilterCount,
}: TpoApplicationsFiltersProps) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
      {/* Top Row: Search input + Filter count trigger + Clear all */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
            placeholder="Search by student name, company, job title, or location..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange({ search: '', page: 1 })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Toggle Actions */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={onToggleAdvanced}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
              showAdvanced || activeFilterCount > 0
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Dropdowns Grid */}
      {(showAdvanced || true) && (
        <div className="space-y-3 pt-2 border-t border-slate-100">
          {/* Row 1: Company, Job Role, Application Status, Stage */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {/* Company Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Company</label>
              <div className="relative">
                <select
                  value={filters.companyName}
                  onChange={(e) => onFilterChange({ companyName: e.target.value, page: 1 })}
                  className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50/80 hover:bg-white text-xs sm:text-sm font-semibold text-slate-800 rounded-xl border border-slate-200 focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option value="ALL">All Companies</option>
                  {filterOptions.companies.map((c) => (
                    <option key={c.id} value={c.label}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Job Role Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Job Role</label>
              <div className="relative">
                <select
                  value={filters.jobTitle}
                  onChange={(e) => onFilterChange({ jobTitle: e.target.value, page: 1 })}
                  className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50/80 hover:bg-white text-xs sm:text-sm font-semibold text-slate-800 rounded-xl border border-slate-200 focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option value="ALL">All Roles</option>
                  {filterOptions.jobRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Application Status */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Application Status</label>
              <div className="relative">
                <select
                  value={filters.status}
                  onChange={(e) => onFilterChange({ status: e.target.value as any, page: 1 })}
                  className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50/80 hover:bg-white text-xs sm:text-sm font-semibold text-slate-800 rounded-xl border border-slate-200 focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="SHORTLISTED">Shortlisted</option>
                  <option value="INTERVIEW_SCHEDULED">Interviewed</option>
                  <option value="OFFERED">Offered</option>
                  <option value="REJECTED">Rejected</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Current Stage */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Current Stage</label>
              <div className="relative">
                <select
                  value={filters.status}
                  onChange={(e) => onFilterChange({ status: e.target.value as any, page: 1 })}
                  className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50/80 hover:bg-white text-xs sm:text-sm font-semibold text-slate-800 rounded-xl border border-slate-200 focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option value="ALL">All Stages</option>
                  <option value="APPLIED">Initial Application</option>
                  <option value="UNDER_REVIEW">Resume Screening</option>
                  <option value="SHORTLISTED">OA Assessment</option>
                  <option value="INTERVIEW_SCHEDULED">Technical Round</option>
                  <option value="OFFERED">Final Selection</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Branch, Batch Year, Location, Applied Date */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
            {/* Branch */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Branch</label>
              <div className="relative">
                <select
                  value={filters.branch}
                  onChange={(e) => onFilterChange({ branch: e.target.value, page: 1 })}
                  className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50/80 hover:bg-white text-xs sm:text-sm font-semibold text-slate-800 rounded-xl border border-slate-200 focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option value="ALL">All Branches</option>
                  {filterOptions.branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Batch Year */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Batch Year</label>
              <div className="relative">
                <select
                  value={filters.batchYear}
                  onChange={(e) => onFilterChange({ batchYear: e.target.value, page: 1 })}
                  className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50/80 hover:bg-white text-xs sm:text-sm font-semibold text-slate-800 rounded-xl border border-slate-200 focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option value="ALL">All Years</option>
                  {filterOptions.batchYears.map((yr) => (
                    <option key={yr} value={yr.toString()}>
                      {yr}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Location</label>
              <div className="relative">
                <select
                  value={filters.location}
                  onChange={(e) => onFilterChange({ location: e.target.value, page: 1 })}
                  className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50/80 hover:bg-white text-xs sm:text-sm font-semibold text-slate-800 rounded-xl border border-slate-200 focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option value="ALL">All Locations</option>
                  {filterOptions.locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Applied Date */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Applied Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.appliedDate}
                  onChange={(e) => onFilterChange({ appliedDate: e.target.value, page: 1 })}
                  className="w-full px-3 py-1.5 bg-slate-50/80 hover:bg-white text-xs sm:text-sm font-semibold text-slate-800 rounded-xl border border-slate-200 focus:border-blue-500 outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
