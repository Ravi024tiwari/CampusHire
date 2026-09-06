'use client';

import React from 'react';
import { Download, Sparkles, FileSpreadsheet, Plus } from 'lucide-react';
import Link from 'next/link';

interface RecruiterOffersHeaderProps {
  onExportReport: () => void;
  isExporting?: boolean;
}

export function RecruiterOffersHeader({ onExportReport, isExporting }: RecruiterOffersHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
          Offers
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Manage and track all offers made by your company.
        </p>
      </div>

      <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
        <button
          type="button"
          onClick={onExportReport}
          disabled={isExporting}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Exporting Report...' : 'Generate Offer Report'}</span>
        </button>
      </div>
    </div>
  );
}
