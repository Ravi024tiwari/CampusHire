'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStudentApplicationsStore } from '@/store/useStudentApplicationsStore';

export function AppliedJobsPagination() {
  const { pagination, setPage } = useStudentApplicationsStore();

  const { page, limit, total, totalPages } = pagination;

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  if (total === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200/80">
      
      {/* Left: Range Info */}
      <p className="text-xs sm:text-sm font-semibold text-slate-500">
        Showing <span className="font-extrabold text-[#0A2540]">{start}-{end}</span> of <span className="font-extrabold text-[#0A2540]">{total}</span> applications
      </p>

      {/* Right: Page Buttons */}
      <div className="flex items-center gap-1.5">
        {/* Previous Page */}
        <button
          type="button"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="p-2 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none text-slate-600 transition-colors cursor-pointer shadow-2xs"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
          const isActive = p === page;

          return (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`h-8 w-8 rounded-xl text-xs font-black transition-all cursor-pointer shadow-2xs active:scale-95 ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-500/20'
                  : 'bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {p}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          type="button"
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="p-2 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none text-slate-600 transition-colors cursor-pointer shadow-2xs"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
