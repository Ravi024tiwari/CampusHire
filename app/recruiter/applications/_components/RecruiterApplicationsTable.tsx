'use client';

import React, { useState } from 'react';
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
  Star, 
  MoreVertical, 
  Bookmark, 
  Calendar, 
  Award, 
  XCircle, 
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Mail,
  Phone,
  User
} from 'lucide-react';
import { 
  RecruiterApplicationItem, 
  useRecruiterApplicationsStore 
} from '@/store/useRecruiterApplicationsStore';

interface RecruiterApplicationsTableProps {
  applications: RecruiterApplicationItem[];
  onOpenCandidateModal: (app: RecruiterApplicationItem) => void;
  onSuccessToast: (msg: string) => void;
}

import { useRouter } from 'next/navigation';

export function RecruiterApplicationsTable({
  applications,
  onOpenCandidateModal,
  onSuccessToast,
}: RecruiterApplicationsTableProps) {
  const router = useRouter();
  const { 
    selectedApplicationIds, 
    toggleSelectApplication, 
    selectAllApplications, 
    clearSelection,
    updateApplicationStatus 
  } = useRecruiterApplicationsStore();

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const allSelected = applications.length > 0 && selectedApplicationIds.length === applications.length;
  const isIndeterminate = selectedApplicationIds.length > 0 && !allSelected;

  const handleStatusChange = async (app: RecruiterApplicationItem, newStatus: string) => {
    setActiveMenuId(null);
    if (newStatus === 'OFFERED') {
      router.push(`/recruiter/applications/${app.id}/offer`);
      return;
    }
    const res = await updateApplicationStatus(app.id, newStatus);
    if (res.success) {
      onSuccessToast(res.message || `Updated ${app.student.user.name}'s status to ${newStatus}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPLIED':
        return {
          label: 'Applied',
          color: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dot: 'bg-amber-500',
        };
      case 'UNDER_REVIEW':
        return {
          label: 'In Review',
          color: 'bg-blue-50 text-blue-700 border-blue-200/80',
          dot: 'bg-blue-500',
        };
      case 'SHORTLISTED':
        return {
          label: 'Shortlisted',
          color: 'bg-purple-50 text-purple-700 border-purple-200/80',
          dot: 'bg-purple-500',
        };
      case 'INTERVIEW_SCHEDULED':
        return {
          label: 'Interviewing',
          color: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
          dot: 'bg-indigo-500',
        };
      case 'OFFERED':
        return {
          label: 'Offered',
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dot: 'bg-emerald-500',
        };
      case 'ACCEPTED':
        return {
          label: 'Hired / Accepted',
          color: 'bg-teal-50 text-teal-700 border-teal-200/80',
          dot: 'bg-teal-500',
        };
      case 'REJECTED':
        return {
          label: 'Rejected',
          color: 'bg-rose-50 text-rose-700 border-rose-200/80',
          dot: 'bg-rose-500',
        };
      case 'DECLINED':
        return {
          label: 'Declined by Student',
          color: 'bg-rose-50 text-rose-700 border-rose-200/80',
          dot: 'bg-rose-500',
        };
      default:
        return {
          label: status,
          color: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
        };
    }
  };

  if (applications.length === 0) {
    return (
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <User className="w-6 h-6" />
        </div>
        <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
          No Applications Found
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          No student applications match your current filters. Try changing or clearing your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all">
      <div className="overflow-x-auto [scrollbar-width:thin]">
        <table className="w-full text-left border-collapse min-w-[950px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-black uppercase tracking-wider text-slate-500 font-heading">
              
              {/* Checkbox Column */}
              <th className="py-3.5 pl-4 sm:pl-5 pr-2 w-10">
                <button
                  type="button"
                  onClick={allSelected ? clearSelection : selectAllApplications}
                  className="flex items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                  title={allSelected ? 'Deselect all' : 'Select all'}
                >
                  {allSelected ? (
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                  ) : isIndeterminate ? (
                    <div className="w-4 h-4 rounded-md border-2 border-blue-600 bg-blue-50 flex items-center justify-center">
                      <div className="w-2 h-0.5 bg-blue-600 rounded-sm" />
                    </div>
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>

              {/* Candidate Info */}
              <th className="py-3.5 px-3">Candidate</th>

              {/* Job Applied For */}
              <th className="py-3.5 px-3">Applied Job</th>

              {/* College & CGPA */}
              <th className="py-3.5 px-3">College & Academics</th>

              {/* Skills */}
              <th className="py-3.5 px-3">Key Skills</th>

              {/* Status */}
              <th className="py-3.5 px-3">Pipeline Status</th>

              {/* Resume */}
              <th className="py-3.5 px-3 text-center">Resume</th>

              {/* Actions */}
              <th className="py-3.5 pr-4 sm:pr-5 pl-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100/90 text-xs sm:text-[13px]">
            {applications.map((app) => {
              const isSelected = selectedApplicationIds.includes(app.id);
              const statusBadge = getStatusBadge(app.status);
              const resumeLink = app.resume?.fileUrl || app.resumeUrl || app.student.resumeUrl;

              return (
                <tr
                  key={app.id}
                  className={`group transition-colors duration-150 hover:bg-slate-50/80 ${
                    isSelected ? 'bg-blue-50/40' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-3.5 pl-4 sm:pl-5 pr-2">
                    <button
                      type="button"
                      onClick={() => toggleSelectApplication(app.id)}
                      className="flex items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </td>

                  {/* Candidate Name & Contact */}
                  <td className="py-3.5 px-3">
                    <Link 
                      href={`/recruiter/applications/${app.id}`}
                      className="flex items-center gap-3 cursor-pointer group/name"
                    >
                      {app.student.user.avatarUrl ? (
                        <img
                          src={app.student.user.avatarUrl}
                          alt={app.student.user.name}
                          className="h-9 w-9 rounded-xl object-cover shrink-0 shadow-2xs border border-slate-200/90 group-hover/name:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-white font-black text-xs shrink-0 shadow-2xs group-hover/name:scale-105 transition-transform">
                          {app.student.user.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#0A2540] group-hover/name:text-blue-600 transition-colors truncate">
                            {app.student.user.name}
                          </span>
                          {app.student.isVerified && (
                            <span title="Verified Student" className="shrink-0">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium truncate">
                          {app.student.user.email}
                        </p>
                      </div>
                    </Link>
                  </td>

                  {/* Job Applied For */}
                  <td className="py-3.5 px-3">
                    <div className="space-y-0.5 max-w-[200px]">
                      <span className="font-bold text-slate-800 block truncate">
                        {app.job.title}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                          {app.job.salaryPackage}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="truncate">{app.job.location}</span>
                      </div>
                    </div>
                  </td>

                  {/* College & CGPA */}
                  <td className="py-3.5 px-3">
                    <div className="space-y-0.5 max-w-[210px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-700 truncate">
                          {app.student.college.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="inline-flex items-center gap-0.5 font-extrabold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded-md border border-blue-200/60">
                          <Sparkles className="w-2.5 h-2.5 text-blue-600" />
                          {app.student.cgpa.toFixed(2)} CGPA
                        </span>
                        <span className="truncate">{app.student.branch.replace('Computer Science & Engineering', 'CSE')}</span>
                      </div>
                    </div>
                  </td>

                  {/* Skills Chips */}
                  <td className="py-3.5 px-3">
                    <div className="flex flex-wrap items-center gap-1 max-w-[200px]">
                      {app.student.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="text-[10.5px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {app.student.skills.length > 3 && (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md">
                          +{app.student.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Pipeline Status Dropdown Pill */}
                  <td className="py-3.5 px-3">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === app.id ? null : app.id);
                        }}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-black transition-all cursor-pointer ${statusBadge.color} hover:shadow-xs`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${statusBadge.dot}`} />
                        <span>{statusBadge.label}</span>
                        <ChevronDown className="w-3 h-3 ml-0.5 opacity-60" />
                      </button>

                      {/* Dropdown Menu for quick status changes */}
                      {activeMenuId === app.id && (
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="absolute left-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-in fade-in-50 zoom-in-95 duration-150"
                        >
                          <div className="px-3 py-1 text-[10px] font-black uppercase text-slate-400">
                            Move Candidate To:
                          </div>
                          <button
                            onClick={() => handleStatusChange(app, 'APPLIED')}
                            className="w-full text-left px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-50 flex items-center gap-2"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            Applied / Needs Review
                          </button>
                          <button
                            onClick={() => handleStatusChange(app, 'SHORTLISTED')}
                            className="w-full text-left px-3 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-50 flex items-center gap-2"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                            Shortlisted
                          </button>
                          <button
                            onClick={() => handleStatusChange(app, 'INTERVIEW_SCHEDULED')}
                            className="w-full text-left px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-50 flex items-center gap-2"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                            Interviewing
                          </button>
                          <button
                            onClick={() => handleStatusChange(app, 'OFFERED')}
                            className="w-full text-left px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 flex items-center gap-2"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Offered
                          </button>
                          <button
                            onClick={() => handleStatusChange(app, 'REJECTED')}
                            className="w-full text-left px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-50 flex items-center gap-2"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                            Rejected
                          </button>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Resume PDF Link */}
                  <td className="py-3.5 px-3 text-center">
                    {resumeLink ? (
                      <a
                        href={resumeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="View / Download Resume"
                      >
                        <FileText className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>

                  {/* Actions (View Full Details) */}
                  <td className="py-3.5 pr-4 sm:pr-5 pl-2 text-right">
                    <Link
                      href={`/recruiter/applications/${app.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold transition-all shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
