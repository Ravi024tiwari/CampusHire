'use client';

import React from 'react';
import Link from 'next/link';
import { Users, FileSpreadsheet, Share2, ChevronRight, ArrowUpRight } from 'lucide-react';

interface TpoAnalyticsQuickActionsProps {
  onDownloadReport: () => void;
  onShare: () => void;
}

export function TpoAnalyticsQuickActions({
  onDownloadReport,
  onShare,
}: TpoAnalyticsQuickActionsProps) {
  const actions = [
    {
      id: 'placed-students',
      title: 'View Placed Students',
      subtitle: 'Explore the verified list of placed student candidates',
      icon: Users,
      iconBg: 'bg-blue-50 text-[#2563EB] border-blue-100',
      href: '/tpo/students',
    },
    {
      id: 'download-report',
      title: 'Download Placement Report',
      subtitle: 'Get detailed executive placement statistics and report dossier',
      icon: FileSpreadsheet,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      onClick: onDownloadReport,
    },
    {
      id: 'share-analytics',
      title: 'Share Analytics',
      subtitle: 'Share real-time placement telemetry with university management',
      icon: Share2,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
      onClick: onShare,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
      {actions.map((act) => {
        const Icon = act.icon;

        if (act.href) {
          return (
            <Link
              key={act.id}
              href={act.href}
              className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-2xs hover:shadow-xs hover:border-blue-300 transition-all duration-200 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${act.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors truncate">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                    {act.subtitle}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>
          );
        }

        return (
          <button
            key={act.id}
            type="button"
            onClick={act.onClick}
            className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-2xs hover:shadow-xs hover:border-blue-300 transition-all duration-200 flex items-center justify-between group text-left cursor-pointer"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${act.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors truncate">
                  {act.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                  {act.subtitle}
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
          </button>
        );
      })}
    </div>
  );
}
