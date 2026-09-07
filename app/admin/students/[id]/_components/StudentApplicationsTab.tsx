'use client';

import React from 'react';
import Image from 'next/image';
import { FileText, Building2, MapPin, Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';
import type { StudentDossierData } from './StudentProfileHeader';

interface StudentApplicationsTabProps {
  applications: StudentDossierData['applications'];
}

export function StudentApplicationsTab({ applications }: StudentApplicationsTabProps) {
  if (!applications || applications.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <FileText className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No Applications Submitted</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          This candidate has not applied to any campus hiring drives yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-[#0A2540] font-heading">
            Application Pipeline
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Review all recruitment drives applied by this candidate
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-100">
          {applications.length} Total
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {applications.map((app) => {
          const statusBadge = {
            APPLIED: 'bg-slate-100 text-slate-700 border-slate-200',
            UNDER_REVIEW: 'bg-blue-50 text-blue-700 border-blue-200',
            SHORTLISTED: 'bg-sky-50 text-sky-700 border-sky-200',
            INTERVIEW_SCHEDULED: 'bg-purple-50 text-purple-700 border-purple-200',
            OFFERED: 'bg-amber-50 text-amber-700 border-amber-200',
            ACCEPTED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            REJECTED: 'bg-rose-50 text-rose-700 border-rose-200',
          }[app.status] || 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <div
              key={app.id}
              className="p-5 hover:bg-slate-50/75 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Left Company & Job Role */}
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-sm text-slate-700 shrink-0 border border-slate-200 overflow-hidden">
                  {app.job.company.logoUrl ? (
                    <Image
                      src={app.job.company.logoUrl}
                      alt={app.job.company.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    app.job.company.name.charAt(0)
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-black text-[#0A2540] font-heading">
                    {app.job.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium">
                    <span className="font-bold text-slate-800">{app.job.company.name}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {app.job.location}
                    </span>
                    <span>&bull;</span>
                    <span className="font-bold text-emerald-700">{app.job.salaryPackage}</span>
                  </div>
                </div>
              </div>

              {/* Right Status Badge & Date */}
              <div className="flex items-center sm:flex-col sm:items-end gap-2 shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusBadge}`}>
                  {app.status.replace(/_/g, ' ')}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Applied on {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
