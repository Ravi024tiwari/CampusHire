'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Banknote, 
  Briefcase,
  Calendar, 
  Clock, 
  Users, 
  ChevronRight, 
  Edit3, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Trash2,
  Lock,
  Unlock,
  GraduationCap
} from 'lucide-react';
import { RecruiterJobItem } from '@/store/useRecruiterJobsStore';

interface RecruiterJobsCardsProps {
  jobs: RecruiterJobItem[];
  onSelectJob: (job: RecruiterJobItem) => void;
  onEditJob: (job: RecruiterJobItem) => void;
  onToggleStatus: (job: RecruiterJobItem) => void;
  onDeleteJob: (job: RecruiterJobItem) => void;
}

export function RecruiterJobsCards({
  jobs,
  onSelectJob,
  onEditJob,
  onToggleStatus,
  onDeleteJob,
}: RecruiterJobsCardsProps) {
  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/90 shadow-xs space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
          <Briefcase className="w-8 h-8" />
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h3 className="text-lg font-extrabold text-slate-900 font-heading">
            No Placement Drives Found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            No campus placement drives match the active filters or query. Adjust your filters or create a new campus drive.
          </p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-black text-emerald-800 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        );
      case 'PENDING_APPROVAL':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-black text-amber-800 border border-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Pending Approval
          </span>
        );
      case 'DRAFT':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700 border border-slate-200">
            Draft
          </span>
        );
      case 'CLOSED':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-black text-red-700 border border-red-200">
            Closed
          </span>
        );
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'FULL_TIME':
        return 'Full Time';
      case 'INTERNSHIP':
        return 'Internship';
      case 'INTERN_PLUS_FTE':
        return 'Intern + FTE';
      default:
        return type;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
      {jobs.map((job) => {
        const isExpired = new Date(job.deadline) < new Date();
        const formattedDeadline = new Date(job.deadline).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });

        return (
          <div
            key={job.id}
            className="group relative flex flex-col justify-between rounded-3xl bg-white p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden"
          >
            {/* Top Row: College Brand & Status */}
            <div>
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 p-0.5 shrink-0 flex items-center justify-center">
                    {job.college.logoUrl ? (
                      <img
                        src={job.college.logoUrl}
                        alt={job.college.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Building2 className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                      <span>{job.college.name}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    </p>
                    <p className="text-[11px] font-medium text-slate-400 truncate">
                      {job.college.city ? `${job.college.city}${job.college.code ? ` (${job.college.code})` : ''}` : job.college.code || 'Verified Campus'}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {getStatusBadge(job.status)}
                </div>
              </div>

              {/* Title & Role Type */}
              <div className="mt-3.5 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10.5px] font-extrabold text-blue-700 border border-blue-200/80">
                    {getTypeBadge(job.type)}
                  </span>
                  {job.minCgpa > 0 && (
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-700 border border-slate-200/80">
                      {job.minCgpa}+ CGPA
                    </span>
                  )}
                </div>

                <Link 
                  href={`/recruiter/jobs/${job.id}`}
                  className="text-base sm:text-lg font-black font-heading text-slate-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1 mt-1 block"
                >
                  {job.title}
                </Link>
              </div>

              {/* Salary & Location Strip */}
              <div className="mt-3 flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                <div className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80">
                  <Banknote className="w-3.5 h-3.5" />
                  <span>{job.salaryPackage}</span>
                </div>

                <div className="inline-flex items-center gap-1 text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span className="truncate max-w-[130px] font-semibold">{job.location}</span>
                </div>
              </div>

              {/* Skills Tags List */}
              <div className="mt-3.5 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Required Skills
                </p>
                <div className="flex flex-wrap gap-1">
                  {job.skills && job.skills.length > 0 ? (
                    job.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-700 border border-slate-200/70"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">General Eligibility</span>
                  )}
                  {job.skills && job.skills.length > 4 && (
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
                      +{job.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Meta & Action Row */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>{job._count?.applications || 0} Candidates</span>
                </div>
                <div className={`text-[10.5px] flex items-center gap-1 font-medium ${isExpired ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                  <Clock className="w-3 h-3" />
                  <span>{isExpired ? 'Expired' : `Due: ${formattedDeadline}`}</span>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <Link
                  href={`/recruiter/jobs/${job.id}`}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition-colors cursor-pointer"
                  title="Inspect Drive Details"
                >
                  <Eye className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => onEditJob(job)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                  title="Edit Parameters"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onToggleStatus(job)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    job.status === 'ACTIVE'
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  }`}
                  title={job.status === 'ACTIVE' ? 'Close Drive' : 'Reactivate Drive'}
                >
                  {job.status === 'ACTIVE' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => onDeleteJob(job)}
                  className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                  title="Delete Drive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
