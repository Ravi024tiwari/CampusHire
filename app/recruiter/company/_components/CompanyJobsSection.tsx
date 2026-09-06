'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users, 
  Building2, 
  ArrowRight,
  ExternalLink,
  Plus
} from 'lucide-react';
import { CompanyJob } from '@/store/useRecruiterCompanyStore';

interface CompanyJobsSectionProps {
  jobs: CompanyJob[];
}

export function CompanyJobsSection({ jobs }: CompanyJobsSectionProps) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4.5 sm:p-6 space-y-5">
      
      {/* Header with Post Job Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
            Job Opportunities ({jobs.length})
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Active and past campus recruitment drives posted by your organization.
          </p>
        </div>

        <Link
          href="/recruiter/jobs/new"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Post New Job</span>
        </Link>
      </div>

      {/* Jobs Grid / List */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => {
            const isLive = job.status === 'ACTIVE';
            const applicantCount = job._count?.applications || 0;
            return (
              <div
                key={job.id}
                className="group p-4 sm:p-5 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-blue-300 transition-all duration-200 hover:shadow-md space-y-3.5 flex flex-col justify-between"
              >
                {/* Top Row: Title + Status */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-black text-[#0A2540] font-heading group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h4>
                    <span className={`text-[10.5px] font-black px-2.5 py-0.5 rounded-full border shrink-0 ${
                      isLive 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {job.status}
                    </span>
                  </div>

                  {/* College & Location */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                    {job.college && (
                      <span className="font-bold text-blue-700">{job.college.name}</span>
                    )}
                    {job.college && <span>•</span>}
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{job.location}</span>
                    </span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-200/60 font-bold text-slate-700 text-[11px]">
                      {job.type}
                    </span>
                  </div>
                </div>

                {/* Package & Skills */}
                <div className="space-y-2 pt-1 border-t border-slate-200/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Package</span>
                    <span className="font-black text-[#0A2540] font-heading">{job.salaryPackage}</span>
                  </div>

                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {job.skills.slice(0, 3).map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10.5px] font-bold text-slate-600"
                        >
                          {sk}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-bold self-center">
                          +{job.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                  <span className="inline-flex items-center gap-1 font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200/70">
                    <Users className="w-3 h-3" />
                    <span>{applicantCount} Applicants</span>
                  </span>

                  <Link
                    href={`/recruiter/jobs/${job.id}`}
                    className="inline-flex items-center gap-1 font-black text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <span>View Drive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-700">No Jobs Posted Yet</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Post your first campus job or internship opportunity to start receiving candidate applications.
          </p>
          <Link
            href="/recruiter/jobs/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Job Posting</span>
          </Link>
        </div>
      )}

    </div>
  );
}
