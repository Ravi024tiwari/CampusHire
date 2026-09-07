'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AdminStudentPagination } from '@/store/useAdminStore';

interface AdminJobsPaginationProps {
  pagination: AdminStudentPagination;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export function AdminJobsPagination({
  pagination,
  onPageChange,
  onLimitChange,
}: AdminJobsPaginationProps) {
  const { page, limit, total, totalPages, hasNextPage, hasPrevPage } = pagination;

  const startIdx = total === 0 ? 0 : (page - 1) * limit + 1;
  const endIdx = Math.min(page * limit, total);

  // Generate page numbers with ellipsis (e.g. 1, 2, 3, 4, 5, ..., 65)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
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

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      
      {/* Left: Summary Count */}
      <div className="text-slate-500 font-medium order-2 sm:order-1">
        Showing <span className="font-bold text-slate-800">{startIdx}-{endIdx}</span> of{' '}
        <span className="font-bold text-slate-800">{total.toLocaleString()}</span> jobs
      </div>

      {/* Middle: Page Number Buttons */}
      <div className="flex items-center gap-1 order-1 sm:order-2">
        {/* Prev Page */}
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevPage}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p, idx) => {
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

          const pageNum = p as number;
          const isActive = pageNum === page;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-sky-100 text-sky-700 font-extrabold shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Rows per page selector */}
      <div className="flex items-center gap-2 order-3">
        <span className="text-slate-500 font-medium">Rows per page</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange?.(Number(e.target.value))}
          className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 font-bold text-slate-700 focus:outline-none focus:border-[#0D8B8A] transition-all cursor-pointer"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

    </div>
  );
}
