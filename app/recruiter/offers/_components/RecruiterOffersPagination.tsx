'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useRecruiterOffersStore } from '@/store/useRecruiterOffersStore';

export function RecruiterOffersPagination() {
  const { pagination, setPage, setLimit } = useRecruiterOffersStore();

  const { page, limit, total, totalPages } = pagination;

  if (total === 0) return null;

  const startRecord = (page - 1) * limit + 1;
  const endRecord = Math.min(page * limit, total);

  // Generate page numbers array
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-3 text-xs">
      {/* Showing count */}
      <div className="text-slate-500 font-bold order-2 sm:order-1">
        Showing <strong className="text-slate-900">{startRecord}-{endRecord}</strong> of{' '}
        <strong className="text-slate-900">{total}</strong> offers
      </div>

      {/* Pagination Page Numbers */}
      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="h-8 w-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-slate-400 font-bold">
                ...
              </span>
            );
          }

          const pageNum = Number(p);
          const isCurrent = pageNum === page;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => setPage(pageNum)}
              className={`h-8 min-w-[32px] px-2 rounded-xl text-xs font-black transition cursor-pointer ${
                isCurrent
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="h-8 w-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Rows Per Page Dropdown */}
      <div className="flex items-center gap-2 order-3">
        <span className="text-slate-500 font-medium">Rows per page:</span>
        <div className="relative">
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="appearance-none pl-3 pr-7 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-hidden focus:border-blue-500 cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <ChevronDown className="absolute right-2 top-2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
