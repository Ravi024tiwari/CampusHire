'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, Calendar, MapPin, Users, ChevronRight, CheckCircle2, Clock } from 'lucide-react';

interface JobDriveItem {
  id: string;
  title: string;
  type: string;
  status: string;
  location: string;
  salaryPackage: string;
  minCgpa?: number;
  allowedBranches?: string[];
  deadline: string;
  applicationsCount: number;
  offersCount?: number;
  skills?: string[];
}

interface TpoCompanyJobsTabProps {
  jobs: JobDriveItem[];
  companyName: string;
  onScheduleDrive: () => void;
}

export function TpoCompanyJobsTab({
  jobs,
  companyName,
  onScheduleDrive,
}: TpoCompanyJobsTabProps) {
  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center shadow-sm space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
          <Briefcase className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">No Campus Drives Posted Yet</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {companyName} has not initiated any campus placement drives at your institution yet.
        </p>
        <button
          onClick={onScheduleDrive}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>Invite for Campus Drive</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-blue-200 transition-all space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h4 className="text-base font-extrabold text-[#0A2540]">
                  {job.title}
                </h4>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full">
                  {job.type}
                </span>
                {job.status === 'ACTIVE' && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                    Active Drive
                  </span>
                )}
                {job.status === 'COMPLETED' && (
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    Completed
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mt-1.5 flex-wrap">
                <span className="text-slate-800 font-bold">
                  CTC: {job.salaryPackage}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {job.location}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Deadline: {job.deadline}
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <Link
              href={`/tpo/applications?companyName=${encodeURIComponent(companyName)}`}
              className="inline-flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100/80 text-blue-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-all self-start sm:self-center"
            >
              <span>View {job.applicationsCount} Applicants</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Eligibility Criteria & Skills */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-slate-600 flex-wrap">
              {job.minCgpa && (
                <span>
                  Min CGPA: <strong className="text-slate-800">{job.minCgpa}</strong>
                </span>
              )}
              {job.allowedBranches && job.allowedBranches.length > 0 && (
                <span>
                  Eligible Branches: <strong className="text-slate-800">{job.allowedBranches.join(', ')}</strong>
                </span>
              )}
            </div>

            {job.skills && job.skills.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {job.skills.slice(0, 4).map((sk, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
