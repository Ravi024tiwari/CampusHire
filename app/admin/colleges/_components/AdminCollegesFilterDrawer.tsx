'use client';

import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import type { AdminCollegeFilters, AdminCollegeFilterOptions } from '@/store/useAdminStore';

interface AdminCollegesFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: AdminCollegeFilters;
  filterOptions: AdminCollegeFilterOptions | null;
  onApplyFilters: (filters: Partial<AdminCollegeFilters>) => void;
  onResetFilters: () => void;
}

export function AdminCollegesFilterDrawer({
  isOpen,
  onClose,
  filters,
  filterOptions,
  onApplyFilters,
  onResetFilters,
}: AdminCollegesFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<AdminCollegeFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    onResetFilters();
    onClose();
  };

  const statuses = ['ALL', 'Verified', 'Pending', 'Rejected'];

  const types = ['ALL', ...(filterOptions?.types || ['Government', 'Private', 'Deemed', 'Autonomous'])];

  const domains = [
    'ALL',
    ...(filterOptions?.domains || ['Engineering', 'Management', 'Medical', 'Arts & Science', 'Law']),
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Slide-Up Drawer */}
      <div className="relative bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl z-10 animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-[#0A2540] font-heading">
              Filter Colleges
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Filter partner colleges by multiple criteria
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Status */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verification Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((st) => {
                const isSelected = localFilters.status === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setLocalFilters({ ...localFilters, status: st })}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'border-[#0D8B8A] bg-teal-50/60 text-[#0D8B8A]'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{st === 'ALL' ? 'All Statuses' : st}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#0D8B8A]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Location / City
            </label>
            <select
              value={localFilters.location}
              onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20"
            >
              <option value="ALL">All Locations</option>
              {filterOptions?.locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* College Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Institution Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {types.slice(0, 6).map((t) => {
                const isSelected = localFilters.type === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setLocalFilters({ ...localFilters, type: t })}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'border-[#0D8B8A] bg-teal-50/60 text-[#0D8B8A]'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{t === 'ALL' ? 'All Types' : t}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#0D8B8A]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Domain */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Specialization Domain
            </label>
            <select
              value={localFilters.domain}
              onChange={(e) => setLocalFilters({ ...localFilters, domain: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20"
            >
              <option value="ALL">All Domains</option>
              {domains
                .filter((d) => d !== 'ALL')
                .map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-2.5 rounded-xl bg-[#0D8B8A] hover:bg-[#0F766E] font-bold text-xs text-white shadow-xs transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
