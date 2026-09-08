'use client';

import React from 'react';
import { Search, Filter, X, ChevronDown, RotateCcw } from 'lucide-react';
import { TpoCompaniesFilterOptions, TpoCompaniesFilterState } from '../_types/tpo-companies.types';

interface TpoCompaniesFiltersProps {
  filters: TpoCompaniesFilterState;
  options: TpoCompaniesFilterOptions;
  activeFilterCount: number;
  onFilterChange: (key: keyof TpoCompaniesFilterState, value: any) => void;
  onClearFilters: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export function TpoCompaniesFilters({
  filters,
  options,
  activeFilterCount,
  onFilterChange,
  onClearFilters,
  showFilters,
  onToggleFilters,
}: TpoCompaniesFiltersProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-4">
      {/* Top Search Bar & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search by company name, industry, location..."
            className="w-full bg-slate-50/80 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm rounded-xl pl-10 pr-10 py-2.5 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all shadow-inner"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Toggle & Clear All */}
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={onToggleFilters}
            className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl border transition-all ${
              showFilters || activeFilterCount > 0
                ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-2 rounded-xl hover:bg-rose-50 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Expandable 5 Dropdown Filters */}
      {showFilters && (
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 animate-in fade-in duration-200">
          {/* 1. Industry */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Industry
            </label>
            <div className="relative">
              <select
                value={filters.industry}
                onChange={(e) => onFilterChange('industry', e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs sm:text-sm rounded-xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
              >
                <option value="ALL">All Industries</option>
                {options.industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 2. Visit Year */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Visit Year
            </label>
            <div className="relative">
              <select
                value={filters.visitYear}
                onChange={(e) => onFilterChange('visitYear', e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs sm:text-sm rounded-xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
              >
                <option value="ALL">All Years</option>
                {options.visitYears.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 3. Company Type */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Company Type
            </label>
            <div className="relative">
              <select
                value={filters.companyType}
                onChange={(e) => onFilterChange('companyType', e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs sm:text-sm rounded-xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
              >
                <option value="ALL">All Types</option>
                {options.companyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 4. Placement Status */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Placement Status
            </label>
            <div className="relative">
              <select
                value={filters.placementStatus}
                onChange={(e) => onFilterChange('placementStatus', e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs sm:text-sm rounded-xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
              >
                <option value="ALL">All Statuses</option>
                {options.placementStatuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 5. Location */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Location
            </label>
            <div className="relative">
              <select
                value={filters.location}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs sm:text-sm rounded-xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
              >
                <option value="ALL">All Locations</option>
                {options.locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
