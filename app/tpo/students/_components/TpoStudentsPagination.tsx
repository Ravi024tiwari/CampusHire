'use strict';
'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface TpoStudentsPaginationProps {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  from: number;
  to: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
}

export function TpoStudentsPagination({
  page,
  limit,
  total,
  totalPages,
  from,
  to,
  onPageChange,
  onLimitChange,
}: TpoStudentsPaginationProps) {
  if (total === 0) return null;

  // Generate page numbers with smart ellipses
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-600 font-medium">
      {/* Left Summary Text */}
      <div className="text-slate-500">
        Showing <span className="font-semibold text-slate-800">{from}-{to}</span> of{' '}
        <span className="font-semibold text-slate-800">{total.toLocaleString()}</span> students
      </div>

      {/* Right Controls: Rows per page & Page Numbers */}
      <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 whitespace-nowrap">Rows per page</span>
          <div className="relative">
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="appearance-none bg-white border border-slate-200 hover:border-slate-300 font-semibold text-slate-700 py-1.5 pl-3 pr-7 rounded-lg text-xs outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Page Buttons */}
        <div className="flex items-center gap-1">
          {/* Previous Page */}
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            type="button"
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Number Chips */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((p, idx) => {
              if (p === '...') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 font-bold"
                  >
                    ...
                  </span>
                );
              }

              const isCurrent = p === page;
              return (
                <button
                  key={`page-${p}`}
                  onClick={() => onPageChange(p as number)}
                  type="button"
                  className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 shadow-2xs'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>

          {/* Next Page */}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            type="button"
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
