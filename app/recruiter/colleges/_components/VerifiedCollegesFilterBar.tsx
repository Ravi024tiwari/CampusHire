'use client';

import React from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  LayoutGrid, 
  List,
  RotateCcw
} from 'lucide-react';

interface VerifiedCollegesFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  statesList: string[];
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  locationsList: string[];
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  totalCount: number;
  currentShowingCount: number;
  activeFilters: string[];
  onRemoveFilter: (filter: string) => void;
  onClearAll: () => void;
}

export function VerifiedCollegesFilterBar({
  searchQuery,
  onSearchChange,
  selectedState,
  onStateChange,
  statesList,
  selectedLocation,
  onLocationChange,
  locationsList,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalCount,
  currentShowingCount,
  activeFilters,
  onRemoveFilter,
  onClearAll,
}: VerifiedCollegesFilterBarProps) {
  return (
    <div className="space-y-3">
      
      {/* 1. Main Search & Filter Selectors Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 sm:gap-3 bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 shadow-xs">
        
        {/* Search Input (Left/Center) */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by college name, code, location..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Filters (Right) */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          
          {/* Location / City Filter */}
          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              aria-label="Filter by Location"
              className="h-10 pl-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/30 cursor-pointer appearance-none"
            >
              <option value="ALL">Location (All)</option>
              {locationsList.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* State Filter */}
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => onStateChange(e.target.value)}
              aria-label="Filter by State"
              className="h-10 pl-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/30 cursor-pointer appearance-none"
            >
              <option value="ALL">State (All)</option>
              {statesList.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Clear All Button */}
          {activeFilters.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="h-10 px-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}

        </div>

      </div>

      {/* 2. Secondary Filter Summary, Active Tags, and Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-1">
        
        {/* Active Filter Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {activeFilters.length > 0 ? (
            activeFilters.map((filter) => (
              <span
                key={filter}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200 shadow-2xs"
              >
                <span>{filter}</span>
                <button
                  type="button"
                  onClick={() => onRemoveFilter(filter)}
                  className="hover:text-blue-900 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-xs font-semibold text-slate-500">
              Showing <strong className="text-slate-900 font-bold">{currentShowingCount}</strong> of <strong className="text-slate-900 font-bold">{totalCount}</strong> accredited colleges
            </span>
          )}
        </div>

        {/* Right: Sort Control & View Switcher */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
          
          {/* Sort Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 hidden md:block">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                aria-label="Sort options"
                className="h-9 pl-3 pr-7 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/30 cursor-pointer appearance-none shadow-2xs"
              >
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="students_desc">Student Pool (High to Low)</option>
                <option value="drives_desc">Active Drives (High to Low)</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
