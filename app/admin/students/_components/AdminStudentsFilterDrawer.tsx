'use client';

import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import type { AdminStudentFilters, AdminStudentFilterOptions } from '@/store/useAdminStore';

interface AdminStudentsFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: AdminStudentFilters;
  filterOptions: AdminStudentFilterOptions | null;
  onApplyFilters: (filters: Partial<AdminStudentFilters>) => void;
  onResetFilters: () => void;
}

export function AdminStudentsFilterDrawer({
  isOpen,
  onClose,
  filters,
  filterOptions,
  onApplyFilters,
  onResetFilters,
}: AdminStudentsFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<AdminStudentFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    onResetFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Card */}
      <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 p-5 space-y-4 overflow-y-auto animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-base font-black text-[#0A2540] font-heading">Filters</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Search */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Search</label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Student name, email, roll no..."
              value={localFilters.search}
              onChange={(e) =>
                setLocalFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20"
            />
          </div>
        </div>

        {/* 2. College */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">College</label>
          <select
            value={localFilters.collegeId}
            onChange={(e) =>
              setLocalFilters((prev) => ({ ...prev, collegeId: e.target.value }))
            }
            className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20"
          >
            <option value="ALL">All Colleges</option>
            {filterOptions?.colleges.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Batch Year & Job Role (2 Columns) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Batch Year</label>
            <select
              value={localFilters.batchYear}
              onChange={(e) =>
                setLocalFilters((prev) => ({ ...prev, batchYear: e.target.value }))
              }
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold"
            >
              <option value="ALL">All Batches</option>
              {(filterOptions?.batches || [2024, 2025, 2026, 2027, 2028]).map((b) => (
                <option key={b} value={String(b)}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Job Role</label>
            <select
              value={localFilters.jobRole}
              onChange={(e) =>
                setLocalFilters((prev) => ({ ...prev, jobRole: e.target.value }))
              }
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold truncate"
            >
              <option value="ALL">All Roles</option>
              {(filterOptions?.jobRoles || ['SDE', 'Frontend', 'Backend', 'Data', 'AI / ML', 'Product']).map(
                (r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* 4. Status & Placement Status (2 Columns) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Status</label>
            <select
              value={localFilters.status}
              onChange={(e) =>
                setLocalFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Placement Status</label>
            <select
              value={localFilters.placementStatus}
              onChange={(e) =>
                setLocalFilters((prev) => ({ ...prev, placementStatus: e.target.value }))
              }
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold truncate"
            >
              <option value="ALL">All</option>
              <option value="PLACED">Placed</option>
              <option value="INTERVIEWING">Interviewing</option>
              <option value="OFFERED">Offered</option>
              <option value="NOT_PLACED">Not Placed</option>
            </select>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClear}
            className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="w-full py-2.5 rounded-xl bg-[#0D8B8A] text-white font-bold text-xs hover:bg-[#0F766E]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
