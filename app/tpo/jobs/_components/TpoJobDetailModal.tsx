'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, 
  Building2, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  Award, 
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { TpoJobItem, CompanyBrandLogo } from './TpoJobCard';

interface TpoJobDetailModalProps {
  job: TpoJobItem | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (jobId: string, newStatus: string) => Promise<void>;
}

export function TpoJobDetailModal({
  job,
  isOpen,
  onClose,
  onStatusChange,
}: TpoJobDetailModalProps) {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  if (!isOpen || !job) return null;

  const formattedDeadline = job.deadline
    ? new Date(job.deadline).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Not Specified';

  const formatJobType = (type: string) => {
    switch (type) {
      case 'FULL_TIME':
        return 'Full Time Employee (FTE)';
      case 'INTERNSHIP':
        return 'Internship Program';
      case 'INTERN_PLUS_FTE':
        return 'Internship + Full Time (PPO)';
      default:
        return type;
    }
  };

  const handleStatusUpdate = async (status: string) => {
    if (!onStatusChange) return;
    try {
      setIsUpdatingStatus(true);
      await onStatusChange(job.id, status);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <CompanyBrandLogo name={job.company.name} logoUrl={job.company.logoUrl} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0A2540] font-heading">
                  {job.title}
                </h2>
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs font-semibold text-slate-500">
                <span>{job.company.name}</span>
                {job.company.isVerified && (
                  <span className="inline-flex items-center gap-0.5 text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-[10px]">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Partner
                  </span>
                )}
                {job.company.website && (
                  <a
                    href={job.company.website.startsWith('http') ? job.company.website : `https://${job.company.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2563EB] hover:underline inline-flex items-center gap-0.5 ml-1"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Quick Metrics & Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Salary Package */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Package / CTC
              </span>
              <p className="text-sm font-extrabold text-emerald-600 mt-0.5">
                {job.salaryPackage || 'Disclosed on interview'}
              </p>
            </div>

            {/* Job Type */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Job Type
              </span>
              <p className="text-xs font-bold text-slate-800 mt-0.5">
                {job.type.replace('_', ' ')}
              </p>
            </div>

            {/* Min CGPA */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Min CGPA Cutoff
              </span>
              <p className="text-sm font-extrabold text-[#0A2540] mt-0.5">
                {job.minCgpa > 0 ? `${job.minCgpa} CGPA` : 'No Cutoff'}
              </p>
            </div>

            {/* Total Applicants */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Applicants
              </span>
              <p className="text-sm font-extrabold text-[#2563EB] mt-0.5">
                {job.totalApplications} Students
              </p>
            </div>
          </div>

          {/* Institutional Eligibility Dossier */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#2563EB]" />
              Campus Eligibility Rules
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 font-medium">Eligible Branches:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.allowedBranches && job.allowedBranches.length > 0 ? (
                    job.allowedBranches.map((branch, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white border border-blue-200 text-blue-800 font-bold text-[11px]"
                      >
                        {branch}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-700 font-semibold">Open to All Branches</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-medium">Eligible Batches:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.eligibleBatches && job.eligibleBatches.length > 0 ? (
                    job.eligibleBatches.map((batch, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white border border-blue-200 text-blue-800 font-bold text-[11px]"
                      >
                        Batch {batch}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-700 font-semibold">All Graduating Batches</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-blue-100/80 flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Deadline: {formattedDeadline}</span>
              </div>
              <div className="flex items-center gap-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>

          {/* Required Skills */}
          {job.skills && job.skills.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Required Technical Skills & Competencies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Job Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Drive Description & Responsibilities
            </h4>
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto font-sans">
              {job.description || 'No detailed description provided by recruiter.'}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 sm:px-6 py-4 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Quick Status Toggle for TPO */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Status:</span>
            <div className="flex items-center gap-1.5">
              {job.status !== 'ACTIVE' && (
                <button
                  onClick={() => handleStatusUpdate('ACTIVE')}
                  disabled={isUpdatingStatus}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50"
                >
                  Approve / Set Active
                </button>
              )}
              {job.status === 'ACTIVE' && (
                <button
                  onClick={() => handleStatusUpdate('CLOSED')}
                  disabled={isUpdatingStatus}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors disabled:opacity-50"
                >
                  Close Drive
                </button>
              )}
            </div>
          </div>

          {/* View Applications Link */}
          <div className="flex items-center gap-2 justify-end">
            <Link
              href={`/tpo/applications?jobId=${job.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span>View Student Applications ({job.totalApplications})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
