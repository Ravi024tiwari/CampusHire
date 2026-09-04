'use client';

import React from 'react';
import { 
  Search, 
  Building2, 
  Briefcase, 
  RotateCcw, 
  X,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { CompanyOption } from '../_types/recruiter.types';

interface RecruiterFiltersToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCompanyId: string;
  onCompanyChange: (companyId: string) => void;
  selectedDesignation: string;
  onDesignationChange: (designation: string) => void;
  companies: CompanyOption[];
  onResetFilters: () => void;
  isFiltered: boolean;
  totalResults: number;
}

const COMMON_DESIGNATIONS = [
  'All Designations',
  'Campus Recruiter',
  'Lead Talent Partner',
  'Talent Acquisition Lead',
  'University Relations Manager',
  'HR Business Partner',
  'Senior Technical Recruiter',
];

export function RecruiterFiltersToolbar({
  searchQuery,
  onSearchChange,
  selectedCompanyId,
  onCompanyChange,
  selectedDesignation,
  onDesignationChange,
  companies,
  onResetFilters,
  isFiltered,
  totalResults,
}: RecruiterFiltersToolbarProps) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-2xs space-y-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Left: Search Input & Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-1 items-center gap-2 sm:gap-2.5">
          
          {/* 1. Global Search Box (Name, Email, Company) */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search recruiter name, work email, company..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 pr-8 h-9 text-xs font-medium rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* 2. Company Selector Dropdown */}
          <div className="relative min-w-[180px]">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-purple-600 pointer-events-none" />
            <select
              value={selectedCompanyId}
              onChange={(e) => onCompanyChange(e.target.value)}
              className="w-full h-9 pl-9 pr-7 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] cursor-pointer"
            >
              <option value="all">All Corporate Partners ({companies.length})</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c._count?.recruiters !== undefined ? `(${c._count.recruiters} team)` : ''}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
              ▼
            </div>
          </div>

          {/* 3. Designation Role Selector Dropdown */}
          <div className="relative min-w-[170px]">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-blue-600 pointer-events-none" />
            <select
              value={selectedDesignation}
              onChange={(e) => onDesignationChange(e.target.value)}
              className="w-full h-9 pl-9 pr-7 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] cursor-pointer"
            >
              {COMMON_DESIGNATIONS.map((role) => (
                <option key={role} value={role === 'All Designations' ? 'all' : role}>
                  {role}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
              ▼
            </div>
          </div>

        </div>

        {/* Right: Reset Filters & Counter */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span>
              Showing <strong className="text-slate-800 font-bold">{totalResults}</strong> recruiters
            </span>
          </div>

          {isFiltered && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="h-8 px-2.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3 text-slate-400" />
              <span>Reset Filters</span>
            </Button>
          )}

        </div>

      </div>
    </div>
  );
}
