'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  ChevronRight, 
  MoreHorizontal, 
  CheckCircle2, 
  Clock, 
  Briefcase 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CandidateApplicationItem } from '../_types/recruiter-dashboard.types';

interface RecentApplicationsTableProps {
  applications: CandidateApplicationItem[];
}

export function RecentApplicationsTable({ applications }: RecentApplicationsTableProps) {
  const statusStyles: Record<string, { bg: string; text: string; border: string }> = {
    APPLIED: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200/80' },
    UNDER_REVIEW: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200/80' },
    SHORTLISTED: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200/80' },
    INTERVIEWING: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200/80' },
    INTERVIEW_SCHEDULED: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200/80' },
    OFFERED: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200/80' },
    REJECTED: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200/80' },
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'UNDER_REVIEW': return 'Under Review';
      case 'SHORTLISTED': return 'Shortlisted';
      case 'INTERVIEWING':
      case 'INTERVIEW_SCHEDULED': return 'Interviewing';
      case 'OFFERED': return 'Offered';
      case 'REJECTED': return 'Rejected';
      default: return 'Applied';
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
            Recent Applications
          </h3>
        </div>

        <Link
          href="/recruiter/jobs"
          className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Table / Empty State Container */}
      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 sm:py-12 px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-2xs">
            <Users className="w-6 h-6" />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
            No Candidate Applications Yet
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
            Applications submitted by students for your campus job drives will appear here in real time.
          </p>
          <Link
            href="/recruiter/jobs"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all"
          >
            <span>View Job Drives</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto [scrollbar-width:thin]">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-2">Candidate</th>
                <th className="py-2.5 px-2">Job Title</th>
                <th className="py-2.5 px-2">Applied On</th>
                <th className="py-2.5 px-2">Status</th>
                <th className="py-2.5 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 text-xs">
              {applications.map((app) => {
                const statusStyle = statusStyles[app.status] || statusStyles.APPLIED;
                const initial = app.candidateName?.charAt(0).toUpperCase() || 'S';

                return (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group">
                    
                    {/* Candidate */}
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 border border-slate-200 shadow-2xs shrink-0">
                          {app.candidateAvatar && (
                            <AvatarImage src={app.candidateAvatar} alt={app.candidateName} className="object-cover" />
                          )}
                          <AvatarFallback className="bg-gradient-to-tr from-blue-900 to-blue-600 text-white font-bold text-xs">
                            {initial}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">
                            {app.candidateName}
                          </p>
                          <p className="text-[10.5px] font-semibold text-slate-400">
                            {app.branch} • {app.batchYear}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Job Title */}
                    <td className="py-3 px-2">
                      <p className="font-bold text-slate-800 truncate">
                        {app.jobTitle}
                      </p>
                      <p className="text-[10.5px] font-semibold text-slate-400">
                        {app.jobType}
                      </p>
                    </td>

                    {/* Applied On */}
                    <td className="py-3 px-2 text-[11.5px] font-semibold text-slate-600">
                      {app.appliedOn}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-2">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                        {getStatusLabel(app.status)}
                      </span>
                    </td>

                    {/* Action Menu */}
                    <td className="py-3 px-2 text-right">
                      <button
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="More Options"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
