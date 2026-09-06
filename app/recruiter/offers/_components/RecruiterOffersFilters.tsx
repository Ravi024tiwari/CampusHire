'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  X,
  Calendar,
  LayoutGrid,
  List,
  ChevronDown,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { useRecruiterOffersStore } from '@/store/useRecruiterOffersStore';

export function RecruiterOffersFilters() {
  const {
    filters,
    filterOptions,
    pagination,
    setFilter,
    resetFilters,
  } = useRecruiterOffersStore();

  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.status !== 'ALL' ||
    filters.collegeId !== 'ALL' ||
    filters.batchYear !== null ||
    filters.role !== 'ALL' ||
    Boolean(filters.startDate) ||
    Boolean(filters.endDate);

  const startRecord = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const endRecord = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4">
      
      {/* 1. Main Search Bar & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            placeholder="Search by student name, role, or college..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => setFilter('search', '')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl sm:rounded-2xl border text-xs font-bold transition cursor-pointer ${
              showMoreFilters || hasActiveFilters
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>More Filters</span>
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Primary Filter Dropdowns Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        
        {/* College Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">College</label>
          <div className="relative">
            <select
              value={filters.collegeId}
              onChange={(e) => setFilter('collegeId', e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer truncate"
            >
              <option value="ALL">All Colleges</option>
              {filterOptions.colleges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.code ? `(${c.code})` : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Batch Year Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Batch Year</label>
          <div className="relative">
            <select
              value={filters.batchYear ? filters.batchYear.toString() : 'ALL'}
              onChange={(e) => setFilter('batchYear', e.target.value === 'ALL' ? null : Number(e.target.value))}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
            >
              <option value="ALL">All Years</option>
              {filterOptions.batchYears.map((year) => (
                <option key={year} value={year}>
                  {year} Batch
                </option>
              ))}
              {!filterOptions.batchYears.includes(2026) && <option value="2026">2026 Batch</option>}
              {!filterOptions.batchYears.includes(2027) && <option value="2027">2027 Batch</option>}
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Role Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Role</label>
          <div className="relative">
            <select
              value={filters.role}
              onChange={(e) => setFilter('role', e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer truncate"
            >
              <option value="ALL">All Roles</option>
              {filterOptions.jobs.map((job) => (
                <option key={job.id} value={job.title}>
                  {job.title} ({job.type})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Offer Status</label>
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => setFilter('status', e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACCEPTED">✦ Accepted</option>
              <option value="PENDING">✦ Pending Response</option>
              <option value="DECLINED">✦ Declined</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* 3. Extended Filters: Date Range Picker */}
      {showMoreFilters && (
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-600 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Offer Date Range:
            </span>
            <input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => setFilter('startDate', e.target.value || null)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white"
            />
            <span className="text-slate-400">to</span>
            <input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => setFilter('endDate', e.target.value || null)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white"
            />
          </div>
        </div>
      )}

      {/* 4. Sub-Bar: Item Count + Sort By + Grid/Table Mode */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
        <span className="font-bold text-slate-500">
          Showing <strong className="text-slate-900">{startRecord}-{endRecord}</strong> of <strong className="text-slate-900">{pagination.total}</strong> offers
        </span>

        <div className="flex items-center gap-3">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Sort by:</span>
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilter('sortBy', e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-hidden focus:border-blue-500 cursor-pointer"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="salary_high">Highest Package</option>
              </select>
              <ChevronDown className="absolute right-2 top-2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setFilter('viewMode', 'grid')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                filters.viewMode === 'grid' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setFilter('viewMode', 'table')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                filters.viewMode === 'table' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
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
