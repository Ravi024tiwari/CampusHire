'use strict';
'use client';

import React from 'react';
import { X, ChevronDown, RotateCcw } from 'lucide-react';
import { FilterState } from './TpoStudentsFilters';
import { ACADEMIC_BRANCHES } from '@/lib/constants/branches';

interface TpoMobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  onApply: () => void;
  availableBranches: string[];
  availableBatches: number[];
}

export function TpoMobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onResetFilters,
  onApply,
  availableBranches = [],
  availableBatches = [],
}: TpoMobileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet Modal */}
      <div className="fixed inset-x-0 bottom-0 max-h-[90vh] bg-white rounded-t-3xl shadow-2xl p-5 overflow-y-auto animate-in slide-in-from-bottom duration-300">
        {/* Top Handle & Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2.5" />
          <h3 className="text-base font-bold text-slate-900 mt-1">Filters</h3>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full bg-slate-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 py-4">
          {/* Branch Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Branch</label>
            <div className="relative">
              <select
                value={filters.branch}
                onChange={(e) => onFilterChange('branch', e.target.value)}
                className="w-full appearance-none bg-slate-50 text-xs font-medium text-slate-800 py-2.5 pl-3 pr-8 rounded-xl border border-slate-200 outline-none"
              >
                <option value="ALL">All Branches</option>
                {availableBranches.length > 0 ? (
                  availableBranches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))
                ) : (
                  ACADEMIC_BRANCHES.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.code} - {b.name}
                    </option>
                  ))
                )}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Batch Year Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Batch Year</label>
            <div className="relative">
              <select
                value={filters.batchYear}
                onChange={(e) => onFilterChange('batchYear', e.target.value)}
                className="w-full appearance-none bg-slate-50 text-xs font-medium text-slate-800 py-2.5 pl-3 pr-8 rounded-xl border border-slate-200 outline-none"
              >
                <option value="ALL">All Years</option>
                {availableBatches.map((b) => (
                  <option key={b} value={b.toString()}>
                    {b}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Placement Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Placement Status
            </label>
            <div className="relative">
              <select
                value={filters.placementStatus}
                onChange={(e) => onFilterChange('placementStatus', e.target.value)}
                className="w-full appearance-none bg-slate-50 text-xs font-medium text-slate-800 py-2.5 pl-3 pr-8 rounded-xl border border-slate-200 outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="PLACED">Placed</option>
                <option value="IN_INTERVIEW">In Interview</option>
                <option value="ELIGIBLE">Eligible</option>
                <option value="APPLIED">Applied</option>
                <option value="NOT_PLACED">Not Placed</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* CGPA Range */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">CGPA Range</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="Min"
                value={filters.minCgpa}
                onChange={(e) => onFilterChange('minCgpa', e.target.value)}
                className="w-1/2 bg-slate-50 text-xs font-medium text-slate-800 py-2.5 px-3 rounded-xl border border-slate-200 outline-none text-center"
              />
              <span className="text-slate-400 font-bold">-</span>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="Max"
                value={filters.maxCgpa}
                onChange={(e) => onFilterChange('maxCgpa', e.target.value)}
                className="w-1/2 bg-slate-50 text-xs font-medium text-slate-800 py-2.5 px-3 rounded-xl border border-slate-200 outline-none text-center"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={() => {
              onResetFilters();
              onClose();
            }}
            type="button"
            className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Clear All
          </button>
          <button
            onClick={() => {
              onApply();
              onClose();
            }}
            type="button"
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-sm"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
