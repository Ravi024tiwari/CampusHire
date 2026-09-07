'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowRight } from 'lucide-react';

export function AdminBottomCtaBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#F0FDF9] via-white to-[#F0F7FF] border border-teal-200/80 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Left Icon & Message */}
      <div className="flex items-center gap-3.5 text-center sm:text-left">
        <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 shrink-0">
          <GraduationCap className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-base font-extrabold text-[#0A2540] font-heading tracking-tight leading-tight">
            Together for a Brighter Future
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5 leading-tight">
            Manage, Monitor, Support, Grow the Campus Hiring Ecosystem.
          </p>
        </div>
      </div>

      {/* Right Action Button */}
      <Link
        href="/admin/analytics"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-98 text-white text-xs font-bold shadow-md shadow-teal-700/20 transition-all cursor-pointer shrink-0"
      >
        <span>View Full Reports</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>

    </div>
  );
}
