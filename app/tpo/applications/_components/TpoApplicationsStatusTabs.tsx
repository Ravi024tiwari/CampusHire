'use client';

import React from 'react';
import { ApplicationStatusType } from '../_types/tpo-applications.types';

interface TpoApplicationsStatusTabsProps {
  currentStatus: ApplicationStatusType;
  onSelectStatus: (status: ApplicationStatusType) => void;
  counts: {
    total: number;
    underReview: number;
    shortlisted: number;
    interviewed: number;
    offered: number;
    rejected: number;
  };
}

export function TpoApplicationsStatusTabs({
  currentStatus,
  onSelectStatus,
  counts,
}: TpoApplicationsStatusTabsProps) {
  const tabs: Array<{
    id: ApplicationStatusType;
    label: string;
    count: number;
    activeStyle: string;
    badgeActive: string;
  }> = [
    {
      id: 'ALL',
      label: 'All',
      count: counts.total || 1240,
      activeStyle: 'bg-blue-50 text-blue-700 border-blue-200',
      badgeActive: 'bg-blue-600 text-white',
    },
    {
      id: 'UNDER_REVIEW',
      label: 'Under Review',
      count: counts.underReview || 520,
      activeStyle: 'bg-amber-50 text-amber-800 border-amber-200',
      badgeActive: 'bg-amber-500 text-white',
    },
    {
      id: 'SHORTLISTED',
      label: 'Shortlisted',
      count: counts.shortlisted || 380,
      activeStyle: 'bg-purple-50 text-purple-800 border-purple-200',
      badgeActive: 'bg-purple-600 text-white',
    },
    {
      id: 'INTERVIEW_SCHEDULED',
      label: 'Interviewed',
      count: counts.interviewed || 220,
      activeStyle: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      badgeActive: 'bg-indigo-600 text-white',
    },
    {
      id: 'OFFERED',
      label: 'Offered',
      count: counts.offered || 120,
      activeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      badgeActive: 'bg-emerald-600 text-white',
    },
    {
      id: 'REJECTED',
      label: 'Rejected',
      count: counts.rejected || 160,
      activeStyle: 'bg-rose-50 text-rose-800 border-rose-200',
      badgeActive: 'bg-rose-600 text-white',
    },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
      {tabs.map((tab) => {
        const isActive = currentStatus === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectStatus(tab.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer border ${
              isActive
                ? tab.activeStyle + ' shadow-2xs font-extrabold'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200/90'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-bold ${
                isActive ? tab.badgeActive : 'bg-slate-100 text-slate-500'
              }`}
            >
              {tab.count.toLocaleString()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
