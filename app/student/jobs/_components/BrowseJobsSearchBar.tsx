'use client';

import React from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  ChevronDown, 
  LayoutGrid, 
  List,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useStudentJobsStore } from '@/store/useStudentJobsStore';

export function BrowseJobsSearchBar() {
  const {
    filters,
    setSearch,
    setSortBy,
    setViewMode,
    toggleJobType,
    toggleLocation,
    removeFilterChip,
    resetFilters,
    setMobileFilterOpen,
    pagination,
  } = useStudentJobsStore();

  const activeChips: Array<{ type: 'jobType' | 'location' | 'category' | 'skill'; label: string; value: string }> = [
    ...filters.jobTypes.map((t) => ({ type: 'jobType' as const, label: t === 'FULL_TIME' ? 'Full Time' : t === 'INTERNSHIP' ? 'Internship' : 'Part Time', value: t })),
    ...filters.locations.map((l) => ({ type: 'location' as const, label: l, value: l })),
    ...filters.categories.map((c) => ({ type: 'category' as const, label: c, value: c })),
    ...filters.skills.map((s) => ({ type: 'skill' as const, label: s, value: s })),
  ];

  const totalActiveFilterCount = activeChips.length;

  const quickMobilePills = [
    { id: 'ALL', label: 'All' },
    { id: 'FULL_TIME', label: 'Full Time' },
    { id: 'INTERNSHIP', label: 'Internship' },
    { id: 'Remote', label: 'Remote' },
  ];

  return (
    <div className="space-y-3.5">
      
      {/* 1. Main Search & Sort Bar Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search Input Bar */}
        <div className="relative flex-1 flex items-center">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by job title, company, skills..."
              value={filters.search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200/90 bg-white py-2.5 sm:py-3 pl-10 pr-24 text-xs sm:text-sm text-[#0A2540] placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 font-medium transition-all shadow-2xs"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-20 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 text-slate-400 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden xs:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </div>

        {/* Right Actions: Mobile Filter Drawer Trigger + Sort Dropdown + View Mode */}
        <div className="flex items-center gap-2 sm:gap-2.5 justify-between sm:justify-end">
          
          {/* Mobile Filter Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#0A2540] text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            <span>Filters</span>
            {totalActiveFilterCount > 0 && (
              <span className="h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                {totalActiveFilterCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative min-w-[130px] sm:min-w-[140px]">
            <select
              value={filters.sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full appearance-none rounded-xl border border-slate-200/90 bg-white py-2.5 pl-3 pr-8 text-xs font-bold text-slate-700 hover:border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 cursor-pointer shadow-2xs"
            >
              <option value="latest">Sort: Latest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="highest_ctc">Sort: Highest CTC</option>
              <option value="min_cgpa">Sort: Min CGPA</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Grid vs List View Switcher (Desktop) */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-slate-100/80 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                filters.viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                filters.viewMode === 'list'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* 2. Mobile Quick Category Horizontal Pills */}
      <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {quickMobilePills.map((pill) => {
          const isAll = pill.id === 'ALL';
          const isSelected = isAll
            ? filters.jobTypes.length === 0 && filters.locations.length === 0
            : pill.id === 'Remote'
            ? filters.locations.includes('Remote')
            : filters.jobTypes.includes(pill.id);

          return (
            <button
              key={pill.id}
              type="button"
              onClick={() => {
                if (isAll) resetFilters();
                else if (pill.id === 'Remote') toggleLocation('Remote');
                else toggleJobType(pill.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shadow-2xs ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* 3. Active Removable Filter Pills Row & Result Count */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        {activeChips.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 mr-1">Active Filters:</span>
            {activeChips.map((chip) => (
              <span
                key={`${chip.type}-${chip.value}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-[11px] font-bold shadow-2xs"
              >
                <span>{chip.label}</span>
                <button
                  type="button"
                  onClick={() => removeFilterChip(chip.type, chip.value)}
                  className="hover:bg-blue-200/60 p-0.5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] font-extrabold text-blue-600 hover:text-blue-800 underline transition-colors cursor-pointer ml-1"
            >
              Clear All
            </button>
          </div>
        ) : null}

        {/* Counter Summary */}
        <p className="text-xs font-semibold text-slate-500 ml-auto">
          Showing <span className="font-extrabold text-[#0A2540]">1-12</span> of <span className="font-extrabold text-[#0A2540]">{pagination.total}</span> jobs
        </p>
      </div>

    </div>
  );
}
