'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AdminStudentPagination as PaginationType } from '@/store/useAdminStore';

interface AdminStudentsPaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function AdminStudentsPagination({
  pagination,
  onPageChange,
  onLimitChange,
}: AdminStudentsPaginationProps) {
  const { page, limit, total, totalPages } = pagination;

  const startIdx = total === 0 ? 0 : (page - 1) * limit + 1;
  const endIdx = Math.min(page * limit, total);

  // Generate dynamic page numbers with ellipsis
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs font-medium text-slate-600">
      
      {/* Left Text: Showing 1-10 of 12,842 students */}
      <div className="text-slate-500 font-semibold">
        Showing <span className="text-slate-900 font-bold">{startIdx}-{endIdx}</span> of{' '}
        <span className="text-slate-900 font-bold">{total.toLocaleString()}</span> students
      </div>

      {/* Middle: Numbered Pagination Controls */}
      <div className="flex items-center gap-1.5 self-center">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="p-1.5 rounded-lg border border-slate-200/90 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        </button>

        {/* Page Buttons */}
        <div className="flex items-center gap-1">
          {generatePageNumbers().map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`dots-${idx}`} className="px-2 py-1 text-slate-400 font-bold">
                  ...
                </span>
              );
            }

            const isCurrent = p === page;
            return (
              <button
                key={`page-${p}`}
                type="button"
                onClick={() => onPageChange(p as number)}
                className={`min-w-[32px] h-8 px-2 rounded-lg font-bold text-xs transition-all ${
                  isCurrent
                    ? 'bg-[#0D8B8A] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="p-1.5 rounded-lg border border-slate-200/90 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      {/* Right: Rows per page selector */}
      <div className="flex items-center gap-2">
        <span className="text-slate-500 font-medium">Rows per page:</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="py-1 px-2.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 cursor-pointer"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

    </div>
  );
}
