'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckSquare, 
  Square, 
  FileText, 
  ExternalLink, 
  Eye, 
  GraduationCap, 
  Building, 
  Briefcase, 
  Bookmark, 
  Calendar, 
  Award, 
  XCircle, 
  Sparkles,
  ShieldCheck,
  Mail,
  Phone,
  User,
  Clock
} from 'lucide-react';
import { 
  RecruiterApplicationItem, 
  useRecruiterApplicationsStore 
} from '@/store/useRecruiterApplicationsStore';

interface RecruiterApplicationsCardsProps {
  applications: RecruiterApplicationItem[];
  onOpenCandidateModal: (app: RecruiterApplicationItem) => void;
  onSuccessToast: (msg: string) => void;
}

export function RecruiterApplicationsCards({
  applications,
  onOpenCandidateModal,
  onSuccessToast,
}: RecruiterApplicationsCardsProps) {
  const { 
    selectedApplicationIds, 
    toggleSelectApplication, 
    updateApplicationStatus 
  } = useRecruiterApplicationsStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPLIED':
        return { label: 'Applied', color: 'bg-amber-50 text-amber-700 border-amber-200/80', dot: 'bg-amber-500' };
      case 'UNDER_REVIEW':
        return { label: 'In Review', color: 'bg-blue-50 text-blue-700 border-blue-200/80', dot: 'bg-blue-500' };
      case 'SHORTLISTED':
        return { label: 'Shortlisted', color: 'bg-purple-50 text-purple-700 border-purple-200/80', dot: 'bg-purple-500' };
      case 'INTERVIEW_SCHEDULED':
        return { label: 'Interviewing', color: 'bg-indigo-50 text-indigo-700 border-indigo-200/80', dot: 'bg-indigo-500' };
      case 'OFFERED':
        return { label: 'Offered', color: 'bg-emerald-50 text-emerald-700 border-emerald-200/80', dot: 'bg-emerald-500' };
      case 'ACCEPTED':
        return { label: 'Hired / Accepted', color: 'bg-teal-50 text-teal-700 border-teal-200/80', dot: 'bg-teal-500' };
      case 'REJECTED':
        return { label: 'Rejected', color: 'bg-rose-50 text-rose-700 border-rose-200/80', dot: 'bg-rose-500' };
      default:
        return { label: status, color: 'bg-slate-50 text-slate-700 border-slate-200', dot: 'bg-slate-400' };
    }
  };

  const handleQuickStatus = async (app: RecruiterApplicationItem, newStatus: string, label: string) => {
    const res = await updateApplicationStatus(app.id, newStatus);
    if (res.success) {
      onSuccessToast(res.message || `Moved ${app.student.user.name} to ${label}`);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {applications.map((app) => {
        const isSelected = selectedApplicationIds.includes(app.id);
        const statusBadge = getStatusBadge(app.status);
        const resumeLink = app.resume?.fileUrl || app.resumeUrl || app.student.resumeUrl;

        return (
          <div
            key={app.id}
            className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border bg-white p-4.5 sm:p-5 shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
              isSelected
                ? 'border-blue-600 ring-2 ring-blue-600/15 bg-blue-50/20'
                : 'border-slate-200/90 hover:border-slate-300'
            }`}
          >
            {/* Top Row: Checkbox, Avatar, Candidate Name & Status */}
            <div>
              <div className="flex items-start justify-between gap-2.5 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => toggleSelectApplication(app.id)}
                    className="flex items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer shrink-0"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>

                  {app.student.user.avatarUrl ? (
                    <img
                      src={app.student.user.avatarUrl}
                      alt={app.student.user.name}
                      className="h-10 w-10 rounded-2xl object-cover shrink-0 shadow-2xs border border-slate-200/90"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white font-black text-xs shadow-2xs shrink-0">
                      {app.student.user.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <Link 
                        href={`/recruiter/applications/${app.id}`}
                        className="font-bold text-sm text-[#0A2540] hover:text-blue-600 transition-colors truncate cursor-pointer"
                      >
                        {app.student.user.name}
                      </Link>
                      {app.student.isVerified && (
                        <span title="Verified Candidate" className="shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium truncate">
                      {app.student.user.email}
                    </p>
                  </div>
                </div>

                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-black shrink-0 ${statusBadge.color}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${statusBadge.dot}`} />
                  <span>{statusBadge.label}</span>
                </span>
              </div>

              {/* Target Job & Package */}
              <div className="py-3 space-y-2 border-b border-slate-100">
                <div className="flex items-center justify-between text-xs gap-2">
                  <span className="font-bold text-slate-800 truncate">
                    {app.job.title}
                  </span>
                  <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 shrink-0">
                    {app.job.salaryPackage}
                  </span>
                </div>

                {/* College, Branch & CGPA */}
                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-medium truncate">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{app.student.college.name}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <span className="truncate text-[11px]">{app.student.branch} ({app.student.batchYear})</span>
                    <span className="inline-flex items-center gap-1 font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60 shrink-0 text-[11px]">
                      <Sparkles className="w-2.5 h-2.5 text-blue-600" />
                      {app.student.cgpa.toFixed(2)} CGPA
                    </span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  {app.student.skills.slice(0, 4).map((skill, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {app.student.skills.length > 4 && (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md">
                      +{app.student.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom: Quick Actions Bar */}
            <div className="pt-3.5 flex items-center justify-between gap-2">
              {resumeLink && (
                <a
                  href={resumeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-blue-600 text-xs font-bold transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </a>
              )}

              <div className="flex items-center gap-1.5 ml-auto">
                {app.status === 'APPLIED' && (
                  <button
                    type="button"
                    onClick={() => handleQuickStatus(app, 'SHORTLISTED', 'Shortlisted')}
                    className="px-2.5 py-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white text-xs font-black transition-colors cursor-pointer"
                  >
                    Shortlist
                  </button>
                )}
                {app.status === 'SHORTLISTED' && (
                  <button
                    type="button"
                    onClick={() => handleQuickStatus(app, 'INTERVIEW_SCHEDULED', 'Interview Scheduled')}
                    className="px-2.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white text-xs font-black transition-colors cursor-pointer"
                  >
                    Interview
                  </button>
                )}
                <Link
                  href={`/recruiter/applications/${app.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Review</span>
                </Link>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
