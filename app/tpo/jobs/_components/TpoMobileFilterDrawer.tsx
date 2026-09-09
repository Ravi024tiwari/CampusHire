'use client';

import React from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { FilterOptions, FilterState } from './TpoJobsFilterBar';

interface TpoMobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClearAll: () => void;
  filterOptions: FilterOptions;
  activeFilterCount: number;
}

export function TpoMobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearAll,
  filterOptions,
  activeFilterCount,
}: TpoMobileFilterDrawerProps) {
  if (!isOpen) return null;

  const jobTypes = [
    { label: 'All Types', value: 'ALL' },
    { label: 'Full Time', value: 'FULL_TIME' },
    { label: 'Internship', value: 'INTERNSHIP' },
    { label: 'Intern + FTE', value: 'INTERN_PLUS_FTE' },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#0A2540] font-heading">
              Filter Opportunities
            </h2>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#2563EB] text-xs font-bold">
                {activeFilterCount} Active
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Fields (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* 1. Company */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Recruiting Company
            </label>
            <select
              value={filters.companyId}
              onChange={(e) => onFilterChange('companyId', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
            >
              <option value="ALL">All Companies</option>
              {filterOptions.companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Job Role */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Job Role
            </label>
            <select
              value={filters.role}
              onChange={(e) => onFilterChange('role', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
            >
              <option value="ALL">All Roles</option>
              {filterOptions.roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Job Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Job Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {jobTypes.map((t) => {
                const isSelected = filters.type === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => onFilterChange('type', t.value)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      isSelected
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Job Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange('location', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
            >
              <option value="ALL">All Locations</option>
              {filterOptions.locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Eligible Branches */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Eligible Branch
            </label>
            <select
              value={filters.branch}
              onChange={(e) => onFilterChange('branch', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
            >
              <option value="ALL">All Branches</option>
              {filterOptions.branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* 6. Batch Year */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Batch Year
            </label>
            <select
              value={filters.batchYear}
              onChange={(e) => onFilterChange('batchYear', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
            >
              <option value="ALL">All Years</option>
              {filterOptions.batches.map((batch) => (
                <option key={batch} value={batch.toString()}>
                  Batch {batch}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex items-center gap-3">
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                onClearAll();
                onClose();
              }}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
