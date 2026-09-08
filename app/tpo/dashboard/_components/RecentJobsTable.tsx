'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, ExternalLink, Calendar, MapPin } from 'lucide-react';
import type { TpoDashboardData } from '@/store/useTpoStore';

interface RecentJobsTableProps {
  jobs?: TpoDashboardData['recentJobs'];
}

export function RecentJobsTable({ jobs }: RecentJobsTableProps) {
  const defaultJobs = [
    {
      id: 'job-1',
      title: 'Software Engineer',
      companyName: 'Google',
      companyLogo: 'https://www.google.com/favicon.ico',
      type: 'Full Time',
      deadline: 'Sep 30, 2025',
      salaryPackage: '22-28 LPA',
      status: 'ACTIVE',
      applicantsCount: 68,
    },
    {
      id: 'job-2',
      title: 'Data Analyst',
      companyName: 'Microsoft',
      companyLogo: 'https://www.microsoft.com/favicon.ico',
      type: 'Full Time',
      deadline: 'Sep 28, 2025',
      salaryPackage: '18-24 LPA',
      status: 'ACTIVE',
      applicantsCount: 45,
    },
    {
      id: 'job-3',
      title: 'Product Intern',
      companyName: 'Amazon',
      companyLogo: 'https://www.amazon.com/favicon.ico',
      type: 'Internship',
      deadline: 'Sep 25, 2025',
      salaryPackage: '₹80,000/mo',
      status: 'ACTIVE',
      applicantsCount: 92,
    },
    {
      id: 'job-4',
      title: 'Frontend Developer',
      companyName: 'Adobe',
      companyLogo: 'https://www.adobe.com/favicon.ico',
      type: 'Full Time',
      deadline: 'Sep 20, 2025',
      salaryPackage: '16-20 LPA',
      status: 'ACTIVE',
      applicantsCount: 38,
    },
    {
      id: 'job-5',
      title: 'ML Intern',
      companyName: 'Tesla',
      companyLogo: 'https://www.tesla.com/favicon.ico',
      type: 'Internship',
      deadline: 'Sep 18, 2025',
      salaryPackage: '₹95,000/mo',
      status: 'ACTIVE',
      applicantsCount: 54,
    },
  ];

  const data = jobs && jobs.length > 0 ? jobs : defaultJobs;

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">
            Recent Job Opportunities
          </h3>
        </div>

        <Link
          href="/tpo/jobs"
          className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Table / Responsive Card List */}
      <div className="overflow-x-auto [scrollbar-width:thin]">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pl-1 font-semibold">Job Title</th>
              <th className="pb-3 font-semibold">Company</th>
              <th className="pb-3 font-semibold">Type</th>
              <th className="pb-3 font-semibold">Deadline</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 pr-1 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {data.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50/70 transition-colors group">
                
                {/* Job Title & Icon */}
                <td className="py-3 pl-1">
                  <span className="font-bold text-[#0A2540] group-hover:text-blue-600 transition-colors block truncate max-w-[170px]">
                    {job.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono sm:hidden">
                    {job.salaryPackage}
                  </span>
                </td>

                {/* Company Name */}
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-600 shrink-0">
                      {job.companyName.slice(0, 1)}
                    </div>
                    <span className="font-semibold text-slate-700 truncate max-w-[100px]">
                      {job.companyName}
                    </span>
                  </div>
                </td>

                {/* Type */}
                <td className="py-3 text-slate-600 font-medium">
                  {job.type}
                </td>

                {/* Deadline */}
                <td className="py-3 text-slate-500 font-mono text-[11px]">
                  {job.deadline}
                </td>

                {/* Status Badge */}
                <td className="py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </td>

                {/* Actions Button */}
                <td className="py-3 pr-1 text-right">
                  <Link
                    href={`/tpo/jobs?id=${job.id}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 font-bold text-[11px] shadow-2xs transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View</span>
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
