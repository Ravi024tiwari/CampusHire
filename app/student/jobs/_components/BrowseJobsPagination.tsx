'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BrowseJobsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const BrowseJobsPagination: React.FC<BrowseJobsPaginationProps> = ({
  currentPage,
  totalPages,
  totalResults,
  pageSize,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const startResult = Math.min((currentPage - 1) * pageSize + 1, totalResults);
  const endResult = Math.min(currentPage * pageSize, totalResults);

  // Generate page numbers array with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 1; // Number of pages before and after current page

    const left = currentPage - delta;
    const right = currentPage + delta + 1;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 border-t border-slate-200 mt-6">
      {/* Result Counter */}
      <div className="text-xs sm:text-sm text-slate-500 order-2 sm:order-1 font-medium">
        Showing <span className="font-semibold text-[#0A2540]">{startResult}</span> - <span className="font-semibold text-[#0A2540]">{endResult}</span> of <span className="font-semibold text-[#0A2540]">{totalResults}</span> jobs
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        {/* First Page */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>

        {/* Previous Page */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages.map((page, idx) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 py-1 text-xs text-slate-400 font-medium select-none"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={`page-${pageNum}`}
                onClick={() => onPageChange(pageNum)}
                className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 ring-2 ring-blue-600/20'
                    : 'text-slate-700 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Last Page */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
