'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Briefcase, 
  GraduationCap, 
  Layers, 
  SlidersHorizontal, 
  ArrowUpDown, 
  RotateCcw, 
  Table as TableIcon, 
  LayoutGrid,
  ChevronDown,
  X,
  Sparkles
} from 'lucide-react';
import { useRecruiterApplicationsStore } from '@/store/useRecruiterApplicationsStore';

export function RecruiterApplicationsFilters() {
  const { 
    filters, 
    setFilter, 
    resetFilters, 
    availableJobs, 
    availableColleges 
  } = useRecruiterApplicationsStore();

  const [isExpanded, setIsExpanded] = useState(false);

  // Active non-default filter count
  const activeFiltersCount = [
    filters.jobId !== 'ALL',
    filters.collegeId !== 'ALL',
    filters.branch !== 'ALL',
    filters.minCgpa !== 'ALL',
    filters.searchQuery !== '',
    filters.sortBy !== 'latest',
  ].filter(Boolean).length;

  const branches = [
    'ALL',
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Data Science & AI',
  ];

  const cgpaOptions = [
    { label: 'Any CGPA', value: 'ALL' },
    { label: '7.0+ CGPA', value: '7.0' },
    { label: '7.5+ CGPA', value: '7.5' },
    { label: '8.0+ CGPA', value: '8.0' },
    { label: '8.5+ CGPA', value: '8.5' },
    { label: '9.0+ CGPA (Dean\'s List)', value: '9.0' },
  ];

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-5 space-y-3.5 transition-all">
      
      {/* Top Primary Filter Row: Search Bar, Job Selector, View Mode Toggle & Expand Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Search input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilter('searchQuery', e.target.value)}
            placeholder="Search candidate by name, email, roll no, skills, or job..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilter('searchQuery', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right side controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          
          {/* Job Posting Selector Dropdown */}
          <div className="relative min-w-[160px] sm:min-w-[200px]">
            <select
              value={filters.jobId}
              onChange={(e) => setFilter('jobId', e.target.value)}
              className="w-full appearance-none pl-8 pr-8 py-2.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-700 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 cursor-pointer shadow-2xs"
            >
              <option value="ALL">All Job Postings</option>
              {availableJobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.applicationsCount} applicants)
                </option>
              ))}
            </select>
            <Briefcase className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilter('sortBy', e.target.value as any)}
              className="appearance-none pl-8 pr-7 py-2.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-700 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer shadow-2xs"
            >
              <option value="latest">Sort: Newest First</option>
              <option value="cgpa_desc">Sort: Highest CGPA</option>
              <option value="name_asc">Sort: Name (A-Z)</option>
              <option value="oldest">Sort: Oldest</option>
            </select>
            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Toggle More Filters */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-black transition-all cursor-pointer shadow-2xs ${
              isExpanded || activeFiltersCount > 0
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white font-black">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* View Mode Toggle (Table vs Cards) */}
          <div className="hidden sm:flex items-center bg-slate-100/90 p-1 rounded-xl sm:rounded-2xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => setFilter('viewMode', 'table')}
              title="Table View"
              className={`p-1.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filters.viewMode === 'table'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setFilter('viewMode', 'cards')}
              title="Cards View"
              className={`p-1.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filters.viewMode === 'cards'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Reset Filters (if active) */}
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              title="Reset all filters"
              className="p-2.5 rounded-xl sm:rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

        </div>
      </div>

      {/* Expanded Multi-Filter Section (College, Min CGPA, Branch) */}
      {isExpanded && (
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in-50 slide-in-from-top-2 duration-200">
          
          {/* College Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
              Filter by College
            </label>
            <div className="relative">
              <select
                value={filters.collegeId}
                onChange={(e) => setFilter('collegeId', e.target.value)}
                className="w-full appearance-none pl-8 pr-7 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-white focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
              >
                <option value="ALL">All Colleges</option>
                {availableColleges.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
              <GraduationCap className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Min CGPA */}
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
              Minimum CGPA Cutoff
            </label>
            <div className="relative">
              <select
                value={filters.minCgpa}
                onChange={(e) => setFilter('minCgpa', e.target.value)}
                className="w-full appearance-none pl-8 pr-7 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-white focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
              >
                {cgpaOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <Sparkles className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Branch / Stream */}
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
              Academic Branch / Discipline
            </label>
            <div className="relative">
              <select
                value={filters.branch}
                onChange={(e) => setFilter('branch', e.target.value)}
                className="w-full appearance-none pl-8 pr-7 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-white focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
              >
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b === 'ALL' ? 'All Branches' : b}
                  </option>
                ))}
              </select>
              <Layers className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
