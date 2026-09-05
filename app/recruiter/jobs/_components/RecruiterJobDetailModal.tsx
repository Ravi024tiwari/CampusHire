'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, 
  Building2, 
  MapPin, 
  Briefcase, 
  Calendar, 
  GraduationCap, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Tag, 
  ExternalLink, 
  Copy, 
  Check, 
  Edit3, 
  ShieldCheck,
  Layers,
  Banknote
} from 'lucide-react';
import { RecruiterJobItem } from '@/store/useRecruiterJobsStore';

interface RecruiterJobDetailModalProps {
  job: RecruiterJobItem | null;
  onClose: () => void;
  onEdit: (job: RecruiterJobItem) => void;
  onToggleStatus: (job: RecruiterJobItem) => void;
}

export function RecruiterJobDetailModal({
  job,
  onClose,
  onEdit,
  onToggleStatus,
}: RecruiterJobDetailModalProps) {
  const [copiedId, setCopiedId] = useState(false);

  if (!job) return null;

  const isDeadlinePassed = new Date(job.deadline) < new Date();
  const deadlineDate = new Date(job.deadline).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCopyJobId = () => {
    navigator.clipboard.writeText(job.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Drive
          </span>
        );
      case 'PENDING_APPROVAL':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700 border border-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Pending Approval
          </span>
        );
      case 'DRAFT':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700 border border-slate-200">
            Draft
          </span>
        );
      case 'CLOSED':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-700 border border-red-200">
            Closed
          </span>
        );
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'FULL_TIME':
        return 'Full Time (FTE)';
      case 'INTERNSHIP':
        return 'Internship';
      case 'INTERN_PLUS_FTE':
        return 'Internship + FTE Conversion';
      default:
        return type;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-[#0A2540] to-slate-900 text-white shrink-0 relative">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                {getStatusBadge(job.status)}
                <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[11px] font-bold text-blue-300 border border-blue-400/30">
                  {getTypeLabel(job.type)}
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  ID: {job.id.slice(0, 8)}...
                </span>
                <button
                  onClick={handleCopyJobId}
                  className="text-slate-300 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
                  title="Copy Full Job ID"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white mt-1">
                {job.title}
              </h2>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-semibold text-white">{job.college.name}</span>
                {job.college.code && (
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold font-mono">
                    {job.college.code}
                  </span>
                )}
                {job.college.city && (
                  <span className="text-slate-400">· {job.college.city}</span>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 [scrollbar-width:thin]">
          
          {/* Key Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="space-y-0.5">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Banknote className="w-3 h-3 text-emerald-600" />
                Compensation
              </span>
              <p className="text-sm font-extrabold text-[#0A2540]">{job.salaryPackage}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-600" />
                Location
              </span>
              <p className="text-sm font-extrabold text-[#0A2540] truncate">{job.location}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-purple-600" />
                Min CGPA
              </span>
              <p className="text-sm font-extrabold text-[#0A2540]">{job.minCgpa > 0 ? `${job.minCgpa} CGPA` : 'No Cutoff'}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-amber-600" />
                Applications
              </span>
              <p className="text-sm font-extrabold text-[#0A2540]">
                {job._count?.applications || 0} candidates
              </p>
            </div>
          </div>

          {/* Required Skills Section */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              Required Skills & Competencies
            </h3>
            {job.skills && job.skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-xl bg-blue-50/80 px-3 py-1 text-xs font-extrabold text-blue-800 border border-blue-200/90 shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No specific skills listed for this drive.</p>
            )}
          </div>

          {/* Eligibility Matrix */}
          <div className="space-y-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Eligibility Criteria & Batches
            </h3>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-700">Eligible Batches: </span>
                <span className="text-slate-600 font-medium">
                  {job.eligibleBatches && job.eligibleBatches.length > 0
                    ? job.eligibleBatches.join(', ')
                    : 'Open to all batches'}
                </span>
              </div>

              <div>
                <span className="font-bold text-slate-700">Eligible Branches / Disciplines: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.allowedBranches && job.allowedBranches.length > 0 ? (
                    job.allowedBranches.map((branch, i) => (
                      <span key={i} className="rounded-lg bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700 border border-slate-200">
                        {branch}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500">All engineering & management branches eligible</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  Deadline:{' '}
                  <strong className={isDeadlinePassed ? 'text-red-600' : 'text-slate-900'}>
                    {deadlineDate}
                  </strong>
                  {isDeadlinePassed && ' (Expired)'}
                </span>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Role Overview & Requirements
            </h3>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
              {job.description}
            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onToggleStatus(job)}
              className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-2xs ${
                job.status === 'ACTIVE'
                  ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {job.status === 'ACTIVE' ? 'Close Drive' : 'Reactivate Drive'}
            </button>

            <button
              onClick={() => {
                onClose();
                onEdit(job);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Drive</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              href={`/recruiter/dashboard#applications`}
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-2.5 px-5 rounded-xl text-xs font-extrabold bg-blue-600 text-white hover:bg-blue-700 transition-all cursor-pointer shadow-md shadow-blue-500/20"
            >
              <Users className="w-3.5 h-3.5" />
              <span>View Candidate Stream ({job._count?.applications || 0})</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
