'use client';

import React from 'react';
import { Trophy, Download, Sparkles } from 'lucide-react';

interface RecruiterAnalyticsBottomBannerProps {
  onDownloadReport: () => void;
  isDownloading?: boolean;
}

export function RecruiterAnalyticsBottomBanner({
  onDownloadReport,
  isDownloading,
}: RecruiterAnalyticsBottomBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-sky-50 border border-blue-100/90 p-5 sm:p-7 shadow-2xs">
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        
        {/* Left Side: Trophy Icon & Motivation Copy */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading tracking-tight">
              Together We Build Brighter Futures
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 max-w-xl">
              Your campus hiring drives create real opportunities for aspiring students nationwide. Keep scaling your impact!
            </p>
          </div>
        </div>

        {/* Right Side: Download Full Report Action Button */}
        <button
          type="button"
          onClick={onDownloadReport}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0 disabled:opacity-50 active:scale-98"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? 'Generating Report...' : 'Download Full Report'}</span>
        </button>

      </div>
    </div>
  );
}
