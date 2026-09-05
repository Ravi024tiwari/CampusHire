'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface RecruiterJobsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function RecruiterJobsPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: RecruiterJobsPaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers array (up to 5 pages)
  const pages = Array.from({ length: Math.min(5, Math.max(1, totalPages)) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
      
      {/* 1. Left: Showing 1-5 of 24 jobs */}
      <div className="text-xs sm:text-sm font-semibold text-slate-500">
        Showing <span className="font-bold text-slate-800">{startItem}-{endItem}</span> of{' '}
        <span className="font-bold text-slate-800">{totalItems}</span> jobs
      </div>

      {/* 2. Middle: Page Number Buttons */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        
        {/* Prev Page */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page numbers */}
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-2xs ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {p}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

      {/* 3. Right: Rows per page selector */}
      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
        <span>Rows per page</span>
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="appearance-none rounded-xl border border-slate-200 bg-white py-1.5 pl-3 pr-7 text-xs font-bold text-slate-800 focus:border-blue-600 focus:outline-none cursor-pointer shadow-2xs"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
        </div>
      </div>

    </div>
  );
}
