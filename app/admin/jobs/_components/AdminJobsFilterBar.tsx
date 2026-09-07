'use client';

import React, { useState, useTransition } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import type { AdminJobFilters, AdminJobFilterOptions } from '@/store/useAdminStore';

interface AdminJobsFilterBarProps {
  filters: AdminJobFilters;
  filterOptions: AdminJobFilterOptions | null;
  onFilterChange: (filters: Partial<AdminJobFilters>) => void;
  onResetFilters: () => void;
  onOpenMobileFilters?: () => void;
}

export function AdminJobsFilterBar({
  filters,
  filterOptions,
  onFilterChange,
  onResetFilters,
  onOpenMobileFilters,
}: AdminJobsFilterBarProps) {
  const [localSearch, setLocalSearch] = useState(filters.search || '');
  const [showFilters, setShowFilters] = useState(true);
  const [, startTransition] = useTransition();

  // Compute active filters count
  const activeFiltersCount = [
    filters.companyName !== 'ALL' && filters.companyName !== 'All Companies' && filters.companyName !== '',
    filters.jobRole !== 'ALL' && filters.jobRole !== 'All Roles' && filters.jobRole !== '',
    filters.type !== 'ALL' && filters.type !== 'All Types' && filters.type !== '',
    filters.location !== 'ALL' && filters.location !== 'All Locations' && filters.location !== '',
    filters.experienceLevel !== 'ALL' && filters.experienceLevel !== 'All Levels' && filters.experienceLevel !== '',
    filters.status !== 'ALL' && filters.status !== 'All Statuses' && filters.status !== '',
    filters.postedDate !== 'ALL' && filters.postedDate !== 'Any Date' && filters.postedDate !== '',
    filters.deadline !== 'ALL' && filters.deadline !== 'Any Date' && filters.deadline !== '',
    Boolean(filters.search),
  ].filter(Boolean).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ search: localSearch.trim(), page: 1 });
  };

  const handleClearAll = () => {
    setLocalSearch('');
    onResetFilters();
  };

  // Fallback lists if filter options not loaded yet
  const companies = filterOptions?.companies || [
    'All Companies',
    'Google',
    'Microsoft',
    'Amazon',
    'Adobe',
    'Tesla',
    'Infosys',
    'Flipkart',
    'Wipro',
    'Zoho',
    'Deloitte',
  ];

  const jobRoles = filterOptions?.jobRoles || [
    'All Roles',
    'Software Engineer',
    'Data Analyst',
    'Product Intern',
    'Frontend Developer',
    'Machine Learning Intern',
    'Backend Developer',
    'UI/UX Designer',
    'DevOps Engineer',
    'Product Manager',
    'Business Analyst',
  ];

  const jobTypes = filterOptions?.jobTypes || [
    'All Types',
    'Full Time',
    'Internship',
    'Intern + FTE',
    'Contract',
  ];

  const locations = filterOptions?.locations || [
    'All Locations',
    'Bangalore, KA',
    'Hyderabad, TG',
    'Pune, MH',
    'Chennai, TN',
    'Gurgaon, HR',
    'Mumbai, MH',
    'Remote',
  ];

  const experienceLevels = filterOptions?.experienceLevels || [
    'All Levels',
    'Fresher / Entry Level',
    '1-3 Years',
    '3-5 Years',
    '5+ Years',
  ];

  const statuses = filterOptions?.statuses || [
    'All Statuses',
    'Active',
    'Closed',
    'Draft',
    'Pending Approval',
    'Rejected',
  ];

  const postedDates = filterOptions?.postedDates || [
    'Any Date',
    'Past 24 Hours',
    'Past Week',
    'Past Month',
    'Past 3 Months',
  ];

  const deadlines = filterOptions?.deadlines || [
    'Any Date',
    'Expiring Soon (7 Days)',
    'This Month',
    'Next Month',
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs space-y-4">
      
      {/* Top Search & Filter Actions Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search Input Box */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex-1"
        >
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                if (e.target.value === '') {
                  onFilterChange({ search: '', page: 1 });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onFilterChange({ search: localSearch.trim(), page: 1 });
                }
              }}
              placeholder="Search by job title, company name, or location..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200/90 focus:border-[#0D8B8A] rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/15 transition-all"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('');
                  onFilterChange({ search: '', page: 1 });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </form>

        {/* Filter Trigger & Clear All Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
          
          {/* Mobile Filter Button (opens drawer) */}
          <button
            type="button"
            onClick={onOpenMobileFilters || (() => setShowFilters(!showFilters))}
            className="inline-flex sm:hidden items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold text-xs"
          >
            <Filter className="w-3.5 h-3.5 text-[#0D8B8A]" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#0D8B8A] text-white text-[10px] font-black flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Desktop Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
              showFilters
                ? 'bg-teal-50 border-teal-200 text-[#0D8B8A]'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#0D8B8A] text-white text-[10px] font-black">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Clear All Button */}
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-bold text-[#0D8B8A] hover:text-teal-800 hover:underline px-2 py-1 transition-colors cursor-pointer"
            >
              Clear All
            </button>
          )}

        </div>

      </div>

      {/* 2-Row Filter Dropdown Controls (Collapsible on Desktop) */}
      {showFilters && (
        <div className="hidden sm:block space-y-3 pt-2 border-t border-slate-100 animate-in fade-in duration-200">
          
          {/* Row 1: Company, Job Role, Job Type, Location */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* 1. Company */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-heading">
                Company
              </label>
              <div className="relative">
                <select
                  value={filters.companyName || 'ALL'}
                  onChange={(e) => {
                    startTransition(() => {
                      onFilterChange({ companyName: e.target.value, page: 1 });
                    });
                  }}
                  className="w-full appearance-none px-3 py-2 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15 transition-all cursor-pointer pr-8"
                >
                  {companies.map((c) => (
                    <option key={c} value={c === 'All Companies' ? 'ALL' : c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* 2. Job Role */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-heading">
                Job Role
              </label>
              <div className="relative">
                <select
                  value={filters.jobRole || 'ALL'}
                  onChange={(e) => {
                    startTransition(() => {
                      onFilterChange({ jobRole: e.target.value, page: 1 });
                    });
                  }}
                  className="w-full appearance-none px-3 py-2 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15 transition-all cursor-pointer pr-8"
                >
                  {jobRoles.map((r) => (
                    <option key={r} value={r === 'All Roles' ? 'ALL' : r}>
                      {r}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* 3. Job Type */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-heading">
                Job Type
              </label>
              <div className="relative">
                <select
                  value={filters.type || 'ALL'}
                  onChange={(e) => {
                    startTransition(() => {
                      onFilterChange({ type: e.target.value, page: 1 });
                    });
                  }}
                  className="w-full appearance-none px-3 py-2 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15 transition-all cursor-pointer pr-8"
                >
                  {jobTypes.map((t) => (
                    <option key={t} value={t === 'All Types' ? 'ALL' : t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* 4. Location */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-heading">
                Location
              </label>
              <div className="relative">
                <select
                  value={filters.location || 'ALL'}
                  onChange={(e) => {
                    startTransition(() => {
                      onFilterChange({ location: e.target.value, page: 1 });
                    });
                  }}
                  className="w-full appearance-none px-3 py-2 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15 transition-all cursor-pointer pr-8"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc === 'All Locations' ? 'ALL' : loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Row 2: Experience Level, Status, Posted Date, Application Deadline */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* 5. Experience Level */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-heading">
                Experience Level
              </label>
              <div className="relative">
                <select
                  value={filters.experienceLevel || 'ALL'}
                  onChange={(e) => {
                    startTransition(() => {
                      onFilterChange({ experienceLevel: e.target.value, page: 1 });
                    });
                  }}
                  className="w-full appearance-none px-3 py-2 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15 transition-all cursor-pointer pr-8"
                >
                  {experienceLevels.map((exp) => (
                    <option key={exp} value={exp === 'All Levels' ? 'ALL' : exp}>
                      {exp}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* 6. Status */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-heading">
                Status
              </label>
              <div className="relative">
                <select
                  value={filters.status || 'ALL'}
                  onChange={(e) => {
                    startTransition(() => {
                      onFilterChange({ status: e.target.value, page: 1 });
                    });
                  }}
                  className="w-full appearance-none px-3 py-2 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15 transition-all cursor-pointer pr-8"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st === 'All Statuses' ? 'ALL' : st}>
                      {st}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* 7. Posted Date */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-heading">
                Posted Date
              </label>
              <div className="relative">
                <select
                  value={filters.postedDate || 'ALL'}
                  onChange={(e) => {
                    startTransition(() => {
                      onFilterChange({ postedDate: e.target.value, page: 1 });
                    });
                  }}
                  className="w-full appearance-none px-3 py-2 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15 transition-all cursor-pointer pr-8"
                >
                  {postedDates.map((pd) => (
                    <option key={pd} value={pd === 'Any Date' ? 'ALL' : pd}>
                      {pd}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* 8. Application Deadline */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-heading">
                Application Deadline
              </label>
              <div className="relative">
                <select
                  value={filters.deadline || 'ALL'}
                  onChange={(e) => {
                    startTransition(() => {
                      onFilterChange({ deadline: e.target.value, page: 1 });
                    });
                  }}
                  className="w-full appearance-none px-3 py-2 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15 transition-all cursor-pointer pr-8"
                >
                  {deadlines.map((dl) => (
                    <option key={dl} value={dl === 'Any Date' ? 'ALL' : dl}>
                      {dl}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
