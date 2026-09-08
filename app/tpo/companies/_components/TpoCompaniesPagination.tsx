'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface TpoCompaniesPaginationProps {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
}

export function TpoCompaniesPagination({
  total,
  page,
  limit,
  totalPages,
  onPageChange,
  onLimitChange,
}: TpoCompaniesPaginationProps) {
  if (total === 0) return null;

  const start = Math.min((page - 1) * limit + 1, total);
  const end = Math.min(page * limit, total);

  // Generate page numbers
  const pages: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (page > 3) {
      pages.push('...');
    }
    const startRange = Math.max(2, page - 1);
    const endRange = Math.min(totalPages - 1, page + 1);
    for (let i = startRange; i <= endRange; i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) {
      pages.push('...');
    }
    pages.push(totalPages);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 pb-2 text-xs sm:text-sm text-slate-600">
      {/* Range Info */}
      <div>
        <span>Showing </span>
        <span className="font-bold text-slate-900">{start}</span>
        <span>-</span>
        <span className="font-bold text-slate-900">{end}</span>
        <span> of </span>
        <span className="font-bold text-slate-900">{total}</span>
        <span> companies</span>
      </div>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Number Buttons */}
        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`dots-${idx}`} className="px-2 py-1 text-slate-400 font-bold">
                ...
              </span>
            );
          }

          const pageNum = Number(p);
          const isActive = pageNum === page;

          return (
            <button
              key={`p-${pageNum}`}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-lg font-bold text-xs transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Rows per page */}
      <div className="flex items-center gap-2">
        <span className="text-slate-500 font-medium">Rows per page</span>
        <div className="relative inline-block">
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="appearance-none bg-white border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 pr-6 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-xs"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
