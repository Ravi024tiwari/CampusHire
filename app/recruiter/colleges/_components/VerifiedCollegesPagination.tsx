'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VerifiedCollegesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function VerifiedCollegesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: VerifiedCollegesPaginationProps) {
  if (totalPages <= 1) return null;

  // Compute pagination range with ellipses
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 pt-6 sm:pt-8 pb-4 select-none">
      
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="px-2 py-1 text-slate-400 font-bold text-xs"
              >
                ...
              </span>
            );
          }

          const pageNum = Number(p);
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`h-9 min-w-[2.25rem] px-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-2xs ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

    </div>
  );
}
