'use client';

import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, X, ChevronDown } from 'lucide-react';
import type { AdminCollegeFilters, AdminCollegeFilterOptions } from '@/store/useAdminStore';

interface AdminCollegesFilterBarProps {
  filters: AdminCollegeFilters;
  filterOptions: AdminCollegeFilterOptions | null;
  onFilterChange: (filters: Partial<AdminCollegeFilters>) => void;
  onResetFilters: () => void;
  onOpenMobileFilters: () => void;
}

export function AdminCollegesFilterBar({
  filters,
  filterOptions,
  onFilterChange,
  onResetFilters,
  onOpenMobileFilters,
}: AdminCollegesFilterBarProps) {
  const hasActiveFilters =
    Boolean(filters.search) ||
    filters.status !== 'ALL' ||
    filters.location !== 'ALL' ||
    filters.type !== 'ALL' ||
    filters.domain !== 'ALL';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-3.5">
      {/* Top Search & Action Line */}
      <div className="flex items-center gap-3">
        {/* Omni Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by college name, location, or domain..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-10 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] transition-all"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Filter Drawer Button */}
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

        {/* Clear All Text Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0D8B8A] hover:text-[#0F766E] transition-colors shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Desktop Filter Dropdowns Row (4 Columns Grid) */}
      <div className="hidden lg:grid grid-cols-4 gap-3 pt-1">
        {/* 1. Status Dropdown */}
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs bg-slate-50/90 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] cursor-pointer transition-all"
          >
            <option value="ALL">All Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 2. Location Dropdown */}
        <div className="relative">
          <select
            value={filters.location}
            onChange={(e) => onFilterChange({ location: e.target.value })}
            className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs bg-slate-50/90 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] cursor-pointer transition-all truncate"
          >
            <option value="ALL">All Locations</option>
            {filterOptions?.locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 3. Type Dropdown */}
        <div className="relative">
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ type: e.target.value })}
            className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs bg-slate-50/90 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] cursor-pointer transition-all"
          >
            <option value="ALL">All Types</option>
            {filterOptions?.types && filterOptions.types.length > 0 ? (
              filterOptions.types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))
            ) : (
              <>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Deemed">Deemed</option>
                <option value="Autonomous">Autonomous</option>
              </>
            )}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 4. Domain Dropdown */}
        <div className="relative">
          <select
            value={filters.domain}
            onChange={(e) => onFilterChange({ domain: e.target.value })}
            className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs bg-slate-50/90 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] cursor-pointer transition-all"
          >
            <option value="ALL">All Domains</option>
            {filterOptions?.domains && filterOptions.domains.length > 0 ? (
              filterOptions.domains.map((dom) => (
                <option key={dom} value={dom}>
                  {dom}
                </option>
              ))
            ) : (
              <>
                <option value="Engineering">Engineering</option>
                <option value="Management">Management</option>
                <option value="Medical">Medical</option>
                <option value="Arts & Science">Arts & Science</option>
                <option value="Law">Law</option>
              </>
            )}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
