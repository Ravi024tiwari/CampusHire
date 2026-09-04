'use client';

import React from 'react';
import { Filter, ArrowUpDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SortOption, StatusFilterOption } from '../_types/company.types';

interface CompanyFiltersToolbarProps {
  totalCompanies: number;
  pendingCount: number;
  verifiedCount: number;
  statusFilter: StatusFilterOption;
  onStatusFilterChange: (status: StatusFilterOption) => void;
  industriesList: string[];
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function CompanyFiltersToolbar({
  totalCompanies,
  pendingCount,
  verifiedCount,
  statusFilter,
  onStatusFilterChange,
  industriesList,
  selectedIndustry,
  onIndustryChange,
  sortBy,
  onSortChange,
}: CompanyFiltersToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 p-2 bg-slate-100/80 backdrop-blur-xs rounded-2xl border border-slate-200/80">
      
      {/* Status Segmented Control using shadcn Button & Badge */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/90 shadow-2xs text-xs font-bold overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Button
          type="button"
          size="sm"
          variant={statusFilter === 'ALL' ? 'default' : 'ghost'}
          onClick={() => onStatusFilterChange('ALL')}
          className={`px-3 sm:px-3.5 py-1.5 h-auto rounded-lg transition-all cursor-pointer shrink-0 font-bold text-xs ${
            statusFilter === 'ALL'
              ? 'bg-slate-900 text-white shadow-2xs hover:bg-slate-800'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          All ({totalCompanies})
        </Button>
        
        <Button
          type="button"
          size="sm"
          variant={statusFilter === 'PENDING' ? 'default' : 'ghost'}
          onClick={() => onStatusFilterChange('PENDING')}
          className={`px-3 sm:px-3.5 py-1.5 h-auto rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 font-bold text-xs ${
            statusFilter === 'PENDING'
              ? 'bg-amber-600 text-white shadow-2xs hover:bg-amber-700'
              : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${statusFilter === 'PENDING' ? 'bg-white' : 'bg-amber-500'} animate-pulse`} />
          <span>Pending ({pendingCount})</span>
        </Button>
        
        <Button
          type="button"
          size="sm"
          variant={statusFilter === 'VERIFIED' ? 'default' : 'ghost'}
          onClick={() => onStatusFilterChange('VERIFIED')}
          className={`px-3 sm:px-3.5 py-1.5 h-auto rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 font-bold text-xs ${
            statusFilter === 'VERIFIED'
              ? 'bg-emerald-700 text-white shadow-2xs hover:bg-emerald-800'
              : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
          }`}
        >
          <Check className="w-3.5 h-3.5" />
          <span>Verified ({verifiedCount})</span>
        </Button>
      </div>

      {/* Industry & Sort Selectors */}
      <div className="flex items-center gap-2 sm:gap-2.5 self-stretch md:self-auto">
        {/* Industry Filter */}
        {industriesList.length > 0 && (
          <div className="relative flex-1 md:flex-none min-w-[130px]">
            <select
              value={selectedIndustry}
              onChange={(e) => onIndustryChange(e.target.value)}
              className="w-full text-xs font-bold text-slate-700 bg-white border border-slate-200/90 rounded-xl px-2.5 sm:px-3 py-2 pr-7 sm:pr-8 shadow-2xs focus:outline-none focus:border-purple-500 cursor-pointer appearance-none truncate"
            >
              <option value="ALL">All Industries</option>
              {industriesList.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        )}

        {/* Sort By Dropdown */}
        <div className="relative flex-1 md:flex-none min-w-[145px]">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full text-xs font-bold text-slate-700 bg-white border border-slate-200/90 rounded-xl px-2.5 sm:px-3 py-2 pr-7 sm:pr-8 shadow-2xs focus:outline-none focus:border-purple-500 cursor-pointer appearance-none truncate"
          >
            <option value="NEWEST">Recently Added</option>
            <option value="NAME_ASC">Name (A-Z)</option>
            <option value="MOST_DRIVES">Most Drives</option>
            <option value="MOST_RECRUITERS">Most Recruiters</option>
          </select>
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

    </div>
  );
}
