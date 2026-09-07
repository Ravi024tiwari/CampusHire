'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, Check, RefreshCw } from 'lucide-react';
import type { AdminJobFilters, AdminJobFilterOptions } from '@/store/useAdminStore';

interface AdminJobsFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: AdminJobFilters;
  filterOptions: AdminJobFilterOptions | null;
  onApplyFilters: (filters: Partial<AdminJobFilters>) => void;
  onResetFilters: () => void;
}

export function AdminJobsFilterDrawer({
  isOpen,
  onClose,
  filters,
  filterOptions,
  onApplyFilters,
  onResetFilters,
}: AdminJobsFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<AdminJobFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters({ ...localFilters, page: 1 });
    onClose();
  };

  const handleClear = () => {
    onResetFilters();
    onClose();
  };

  const companies = filterOptions?.companies || [
    'All Companies',
    'Google',
    'Microsoft',
    'Amazon',
    'Adobe',
    'Tesla',
    'Infosys',
    'Flipkart',
  ];

  const jobRoles = filterOptions?.jobRoles || [
    'All Roles',
    'Software Engineer',
    'Data Analyst',
    'Product Intern',
    'Frontend Developer',
    'Machine Learning Intern',
    'Backend Developer',
  ];

  const jobTypes = filterOptions?.jobTypes || [
    'All Types',
    'Full Time',
    'Internship',
    'Intern + FTE',
  ];

  const locations = filterOptions?.locations || [
    'All Locations',
    'Bangalore, KA',
    'Hyderabad, TG',
    'Pune, MH',
    'Remote',
  ];

  const statuses = filterOptions?.statuses || [
    'All Statuses',
    'Active',
    'Closed',
    'Draft',
    'Pending Approval',
    'Rejected',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Card */}
      <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 p-5 space-y-4 overflow-y-auto animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-black text-[#0A2540] font-heading">
            Filter Job Postings
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Search Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Search Query</label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localFilters.search}
              onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
              placeholder="Search title, company, skills..."
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0D8B8A]"
            />
          </div>
        </div>

        {/* 2. Company */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Company</label>
          <select
            value={localFilters.companyName || 'ALL'}
            onChange={(e) => setLocalFilters({ ...localFilters, companyName: e.target.value })}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
          >
            {companies.map((c) => (
              <option key={c} value={c === 'All Companies' ? 'ALL' : c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Job Role */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Job Role</label>
          <select
            value={localFilters.jobRole || 'ALL'}
            onChange={(e) => setLocalFilters({ ...localFilters, jobRole: e.target.value })}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
          >
            {jobRoles.map((r) => (
              <option key={r} value={r === 'All Roles' ? 'ALL' : r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Job Type & Status Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Type</label>
            <select
              value={localFilters.type || 'ALL'}
              onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
            >
              {jobTypes.map((t) => (
                <option key={t} value={t === 'All Types' ? 'ALL' : t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Status</label>
            <select
              value={localFilters.status || 'ALL'}
              onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
            >
              {statuses.map((s) => (
                <option key={s} value={s === 'All Statuses' ? 'ALL' : s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 5. Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Location</label>
          <select
            value={localFilters.location || 'ALL'}
            onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc === 'All Locations' ? 'ALL' : loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-3 px-4 rounded-xl bg-[#0D8B8A] hover:bg-[#0F766E] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Apply Filters</span>
          </button>
        </div>

      </div>
    </div>
  );
}
