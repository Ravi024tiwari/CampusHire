'use strict';
'use client';

import React from 'react';
import { Search, Filter, X, ChevronDown, RotateCcw } from 'lucide-react';

export interface FilterState {
  search: string;
  branch: string;
  batchYear: string;
  placementStatus: string;
  minCgpa: string;
  maxCgpa: string;
  applicationStatus: string;
  verificationStatus: string;
}

interface TpoStudentsFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  availableBranches: string[];
  availableBatches: number[];
  activeFilterCount: number;
}

export function TpoStudentsFilters({
  filters,
  onFilterChange,
  onResetFilters,
  availableBranches = [],
  availableBatches = [],
  activeFilterCount = 0,
}: TpoStudentsFiltersProps) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
      {/* Top Search Bar & Action Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Main Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, enrollment no., email.."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Indicator Badge & Clear Button */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-semibold border border-blue-100">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              type="button"
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 px-2 py-2 transition-colors cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Select Controls Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1 border-t border-slate-100">
        {/* Branch Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Branch
          </label>
          <div className="relative">
            <select
              value={filters.branch}
              onChange={(e) => onFilterChange('branch', e.target.value)}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs font-medium text-slate-700 py-2 pl-3 pr-8 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="ALL">All Branches</option>
              {availableBranches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
              {availableBranches.length === 0 && (
                <>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="ME">ME</option>
                  <option value="EE">EE</option>
                  <option value="CE">CE</option>
                  <option value="IT">IT</option>
                </>
              )}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Batch Year Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Batch Year
          </label>
          <div className="relative">
            <select
              value={filters.batchYear}
              onChange={(e) => onFilterChange('batchYear', e.target.value)}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs font-medium text-slate-700 py-2 pl-3 pr-8 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="ALL">All Years</option>
              {availableBatches.map((batch) => (
                <option key={batch} value={batch.toString()}>
                  {batch}
                </option>
              ))}
              {availableBatches.length === 0 && (
                <>
                  <option value="2027">2027</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </>
              )}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Placement Status Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Placement Status
          </label>
          <div className="relative">
            <select
              value={filters.placementStatus}
              onChange={(e) => onFilterChange('placementStatus', e.target.value)}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs font-medium text-slate-700 py-2 pl-3 pr-8 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="PLACED">Placed</option>
              <option value="IN_INTERVIEW">In Interview</option>
              <option value="ELIGIBLE">Eligible</option>
              <option value="APPLIED">Applied</option>
              <option value="NOT_PLACED">Not Placed</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* CGPA Range Inputs */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            CGPA Range
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              placeholder="Min"
              value={filters.minCgpa}
              onChange={(e) => onFilterChange('minCgpa', e.target.value)}
              className="w-1/2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs font-medium text-slate-700 py-2 px-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all text-center"
            />
            <span className="text-slate-400 text-xs font-bold">-</span>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              placeholder="Max"
              value={filters.maxCgpa}
              onChange={(e) => onFilterChange('maxCgpa', e.target.value)}
              className="w-1/2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs font-medium text-slate-700 py-2 px-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all text-center"
            />
          </div>
        </div>

        {/* Application Status Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Application Status
          </label>
          <div className="relative">
            <select
              value={filters.applicationStatus}
              onChange={(e) => onFilterChange('applicationStatus', e.target.value)}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs font-medium text-slate-700 py-2 pl-3 pr-8 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="APPLIED">Applied</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
              <option value="OFFERED">Offered</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Verification Status Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Verification Status
          </label>
          <div className="relative">
            <select
              value={filters.verificationStatus}
              onChange={(e) => onFilterChange('verificationStatus', e.target.value)}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs font-medium text-slate-700 py-2 pl-3 pr-8 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="VERIFIED">Verified</option>
              <option value="UNVERIFIED">Unverified</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
