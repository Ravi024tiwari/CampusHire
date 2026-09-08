'use client';

import React from 'react';
import Link from 'next/link';
import type { TpoDashboardData } from '@/store/useTpoStore';

interface RecentApplicationsListProps {
  applications?: TpoDashboardData['recentApplications'];
}

export function RecentApplicationsList({ applications }: RecentApplicationsListProps) {
  const defaultApps = [
    {
      id: 'app-1',
      studentName: 'Priya Singh',
      studentAvatar: null,
      branch: 'CSE',
      jobTitle: 'Software Engineer',
      companyName: 'Google',
      status: 'UNDER_REVIEW',
      appliedAt: '2 hours ago',
    },
    {
      id: 'app-2',
      studentName: 'Rohit Kumar',
      studentAvatar: null,
      branch: 'IT',
      jobTitle: 'SDE Intern',
      companyName: 'Microsoft',
      status: 'SHORTLISTED',
      appliedAt: '5 hours ago',
    },
    {
      id: 'app-3',
      studentName: 'Sneha Patel',
      studentAvatar: null,
      branch: 'ECE',
      jobTitle: 'Product Analyst',
      companyName: 'Amazon',
      status: 'INTERVIEW_SCHEDULED',
      appliedAt: '1 day ago',
    },
    {
      id: 'app-4',
      studentName: 'Aman Verma',
      studentAvatar: null,
      branch: 'CSE',
      jobTitle: 'Data Science Intern',
      companyName: 'Tesla',
      status: 'OFFERED',
      appliedAt: '2 days ago',
    },
    {
      id: 'app-5',
      studentName: 'Neha Gupta',
      studentAvatar: null,
      branch: 'CSE',
      jobTitle: 'Frontend Developer',
      companyName: 'Adobe',
      status: 'UNDER_REVIEW',
      appliedAt: '2 days ago',
    },
  ];

  const data = applications && applications.length > 0 ? applications : defaultApps;

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'OFFERED':
      case 'ACCEPTED':
        return { label: 'Offered', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'SHORTLISTED':
        return { label: 'Shortlisted', cls: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'INTERVIEW_SCHEDULED':
      case 'INTERVIEWED':
        return { label: 'Interviewed', cls: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'UNDER_REVIEW':
      case 'APPLIED':
      default:
        return { label: 'Under Review', cls: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">
            Recent Applications
          </h3>
        </div>

        <Link
          href="/tpo/applications"
          className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {data.map((app) => {
          const badge = getStatusBadge(app.status);
          return (
            <div
              key={app.id}
              className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50/80 border border-slate-100 transition-colors"
            >
              {/* Candidate Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs font-heading">
                  {app.studentName.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0A2540] truncate">
                    {app.studentName}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate font-medium">
                    {app.jobTitle}
                  </p>
                </div>
              </div>

              {/* Status Pill */}
              <div className="shrink-0 ml-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.cls}`}>
                  {badge.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
