'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Plus, ArrowRight } from 'lucide-react';

export function PostJobCalloutBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50/90 via-sky-50/60 to-indigo-50/80 border border-blue-200/80 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Left Icon & Text */}
      <div className="flex items-center gap-4 text-center sm:text-left">
        <div className="h-11 w-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0 mx-auto sm:mx-0">
          <Award className="w-6 h-6" />
        </div>

        <div className="space-y-0.5">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
            Find the best talent from top campuses
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Post new job openings and get quality applications directly from university placement drives.
          </p>
        </div>
      </div>

      {/* Right Action Button */}
      <div className="shrink-0 w-full sm:w-auto">
        <Link
          href="/recruiter/jobs/create"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Post a New Job</span>
        </Link>
      </div>

    </div>
  );
}
