'use client';

import React from 'react';
import { 
  Search, 
  X, 
  Filter, 
  ChevronDown, 
  RotateCcw,
  Calendar,
  MapPin,
  Briefcase
} from 'lucide-react';
import { useStudentApplicationsStore } from '@/store/useStudentApplicationsStore';

export function AppliedJobsFilterBar() {
  const { 
    summaryStats, 
    filters, 
    setStatusTab, 
    setSearch, 
    setJobType, 
    setLocation, 
    setSortBy, 
    resetFilters 
  } = useStudentApplicationsStore();

  const statusTabs = [
    { id: 'ALL', label: 'All', count: summaryStats.total },
    { id: 'UNDER_REVIEW', label: 'Under Review', count: summaryStats.underReview },
    { id: 'SHORTLISTED', label: 'Shortlisted', count: summaryStats.shortlisted },
    { id: 'INTERVIEWING', label: 'Interviewing', count: summaryStats.interviewing },
    { id: 'OFFERS', label: 'Offers', count: summaryStats.offers },
    { id: 'REJECTED', label: 'Rejected', count: summaryStats.rejected },
  ];

  const hasActiveFilters = 
    filters.status !== 'ALL' || 
    filters.search !== '' || 
    filters.jobType !== 'ALL' || 
    filters.location !== 'ALL' || 
    filters.sortBy !== 'latest';

  return (
    <div className="space-y-3.5">
      
      {/* 1. Status Filter Pills Tabs (Horizontal Touch Scroll on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {statusTabs.map((tab) => {
          const isActive = filters.status === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs active:scale-95 ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-500/20'
                  : 'bg-white border border-slate-200/90 text-slate-600 hover:text-[#0A2540] hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10.5px] font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                ({tab.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Search & Select Filters Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Left: Search Bar */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by job title, company..."
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200/90 bg-white py-2.5 pl-10 pr-9 text-xs sm:text-sm text-[#0A2540] placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 font-medium transition-all shadow-2xs"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Dropdown Selects & Clear Action */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          
          {/* Job Type Filter */}
          <div className="relative min-w-[120px] sm:min-w-[130px]">
            <select
              value={filters.jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200/90 bg-white py-2.5 pl-3 pr-8 text-xs font-bold text-slate-700 hover:border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 cursor-pointer shadow-2xs"
            >
              <option value="ALL">Job Type: All</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="INTERN_PLUS_FTE">Intern + FTE</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Location Filter */}
          <div className="relative min-w-[120px] sm:min-w-[130px]">
            <select
              value={filters.location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200/90 bg-white py-2.5 pl-3 pr-8 text-xs font-bold text-slate-700 hover:border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 cursor-pointer shadow-2xs"
            >
              <option value="ALL">Location: All</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi NCR</option>
              <option value="Remote">Remote</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Sort By Filter */}
          <div className="relative min-w-[120px] sm:min-w-[130px]">
            <select
              value={filters.sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full appearance-none rounded-xl border border-slate-200/90 bg-white py-2.5 pl-3 pr-8 text-xs font-bold text-slate-700 hover:border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 cursor-pointer shadow-2xs"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="package_high_to_low">Highest Package</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Clear Filters Button (Visible when active) */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-rose-200/80 bg-rose-50 text-rose-600 hover:bg-rose-100/80 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
