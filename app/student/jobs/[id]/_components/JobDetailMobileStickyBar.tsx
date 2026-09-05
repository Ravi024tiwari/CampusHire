'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { StudentJobItem } from '@/store/useStudentJobsStore';

interface JobDetailMobileStickyBarProps {
  job: StudentJobItem;
  onApplyClick: () => void;
}

export function JobDetailMobileStickyBar({ job, onApplyClick }: JobDetailMobileStickyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-xl border-t border-slate-200 p-3 sm:px-6 lg:hidden shadow-[0_-4px_25px_rgba(0,0,0,0.08)]">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Package & Deadline */}
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Package Offer
          </p>
          <p className="text-xs sm:text-sm font-black text-blue-600 truncate">
            {job.salaryPackage}
          </p>
        </div>

        {/* Right: Apply Button */}
        {job.hasApplied ? (
          <div className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200 flex items-center gap-1.5 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Applied</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onApplyClick}
            className="flex-1 max-w-[200px] py-2.5 px-4 rounded-xl bg-blue-600 active:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

      </div>
    </div>
  );
}
