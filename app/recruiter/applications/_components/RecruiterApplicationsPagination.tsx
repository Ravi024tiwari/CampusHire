'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RecruiterApplicationsPagination as PaginationType } from '@/store/useRecruiterApplicationsStore';

interface RecruiterApplicationsPaginationProps {
  pagination: PaginationType | null;
  onPageChange: (page: number) => void;
}

export function RecruiterApplicationsPagination({
  pagination,
  onPageChange,
}: RecruiterApplicationsPaginationProps) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages, total, limit } = pagination;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200/80 text-xs text-slate-500">
      <div>
        Showing <span className="font-bold text-slate-800">{start}</span> to{' '}
        <span className="font-bold text-slate-800">{end}</span> of{' '}
        <span className="font-bold text-slate-800">{total}</span> candidates
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
          .map((p, idx, arr) => {
            const prev = arr[idx - 1];
            const isEllipsis = prev && p - prev > 1;

            return (
              <React.Fragment key={p}>
                {isEllipsis && <span className="px-1 text-slate-400">...</span>}
                <button
                  type="button"
                  onClick={() => onPageChange(p)}
                  className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black transition-all cursor-pointer ${
                    page === p
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              </React.Fragment>
            );
          })}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
