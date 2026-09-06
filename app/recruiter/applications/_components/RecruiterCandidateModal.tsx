'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, 
  ExternalLink, 
  FileText, 
  Download, 
  GraduationCap, 
  Building, 
  Mail, 
  Phone, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Bookmark, 
  Calendar, 
  Award, 
  XCircle, 
  ShieldCheck, 
  Briefcase, 
  Clock, 
  Save, 
  Loader2,
  DollarSign,
  MapPin,
  Code2
} from 'lucide-react';
import { 
  RecruiterApplicationItem, 
  useRecruiterApplicationsStore 
} from '@/store/useRecruiterApplicationsStore';

interface RecruiterCandidateModalProps {
  application: RecruiterApplicationItem | null;
  onClose: () => void;
  onSuccessToast: (msg: string) => void;
}

export function RecruiterCandidateModal({
  application,
  onClose,
  onSuccessToast,
}: RecruiterCandidateModalProps) {
  const { updateApplicationStatus, isActionLoading } = useRecruiterApplicationsStore();

  const [selectedStatus, setSelectedStatus] = useState<string>(application?.status || 'APPLIED');
  const [evaluationNotes, setEvaluationNotes] = useState<string>(application?.notes || '');
  
  // Offer Letter Generation Form States (when status is OFFERED)
  const [offerDesignation, setOfferDesignation] = useState<string>(
    application?.offer?.designation || application?.job.title || ''
  );
  const [offerSalary, setOfferSalary] = useState<string>(
    application?.offer?.salaryPackage || application?.job.salaryPackage || ''
  );
  const [offerLocation, setOfferLocation] = useState<string>(
    application?.offer?.location || application?.job.location || ''
  );
  const [offerJoiningDate, setOfferJoiningDate] = useState<string>(
    application?.offer?.joiningDate ? new Date(application.offer.joiningDate).toISOString().slice(0, 10) : ''
  );
  const [offerLetterUrl, setOfferLetterUrl] = useState<string>(
    application?.offer?.letterUrl || ''
  );

  if (!application) return null;

  const resumeLink = application.resume?.fileUrl || application.resumeUrl || application.student.resumeUrl;

  const handleSaveStatus = async () => {
    const extraPayload: any = {
      notes: evaluationNotes,
    };

    if (selectedStatus === 'OFFERED') {
      extraPayload.designation = offerDesignation;
      extraPayload.salaryPackage = offerSalary;
      extraPayload.location = offerLocation;
      if (offerJoiningDate) extraPayload.joiningDate = offerJoiningDate;
      if (offerLetterUrl) extraPayload.offerLetterUrl = offerLetterUrl;
    }

    const res = await updateApplicationStatus(application.id, selectedStatus, extraPayload);
    if (res.success) {
      onSuccessToast(res.message || `Status updated to ${selectedStatus}`);
      onClose();
    }
  };

  const stages = [
    { id: 'APPLIED', label: 'Applied', icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'SHORTLISTED', label: 'Shortlisted', icon: Bookmark, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { id: 'INTERVIEW_SCHEDULED', label: 'Interview', icon: Calendar, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { id: 'OFFERED', label: 'Offered', icon: Award, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { id: 'REJECTED', label: 'Rejected', icon: XCircle, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            {application.student.user.avatarUrl ? (
              <img
                src={application.student.user.avatarUrl}
                alt={application.student.user.name}
                className="h-11 w-11 rounded-2xl object-cover shrink-0 shadow-sm border border-slate-200/90"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white font-black text-sm shadow-sm">
                {application.student.user.name.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-[#0A2540] font-heading">
                  {application.student.user.name}
                </h2>
                {application.student.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Applied for <span className="font-bold text-slate-700">{application.job.title}</span> • {new Date(application.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-700 [scrollbar-width:thin]">
          
          {/* 1. Pipeline Stepper / Status Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500 font-heading">
              Hiring Pipeline Stage
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {stages.map((st) => {
                const Icon = st.icon;
                const isCurrent = selectedStatus === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStatus(st.id)}
                    className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-black transition-all cursor-pointer ${
                      isCurrent
                        ? `${st.color} ring-2 ring-blue-600/20 shadow-xs`
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{st.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Offer Letter Section (Only shown if status is OFFERED) */}
          {selectedStatus === 'OFFERED' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-4 animate-in fade-in-50 duration-200">
              <div className="flex items-center gap-2 text-emerald-800 font-heading font-black text-sm">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Formal Offer Letter Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-emerald-900">Offered Designation</label>
                  <input
                    type="text"
                    value={offerDesignation}
                    onChange={(e) => setOfferDesignation(e.target.value)}
                    placeholder="e.g. Software Engineer - Frontend"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-emerald-900">Salary Package (CTC)</label>
                  <input
                    type="text"
                    value={offerSalary}
                    onChange={(e) => setOfferSalary(e.target.value)}
                    placeholder="e.g. 18.5 LPA"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-emerald-900">Work Location</label>
                  <input
                    type="text"
                    value={offerLocation}
                    onChange={(e) => setOfferLocation(e.target.value)}
                    placeholder="e.g. Bangalore (Hybrid)"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-emerald-900">Expected Joining Date</label>
                  <input
                    type="date"
                    value={offerJoiningDate}
                    onChange={(e) => setOfferJoiningDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/recruiter/applications/${application.id}/offer`}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold shadow-sm transition"
                >
                  <FileText className="w-4 h-4" />
                  <span>Open Full Offer Page & Upload PDF Offer Letter</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* 3. Academic & Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Academic Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-800 font-heading font-black text-xs uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Academic Record</span>
              </div>
              
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">College:</span>
                  <span className="font-bold text-slate-800 text-right max-w-[200px] truncate">{application.student.college.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Branch:</span>
                  <span className="font-bold text-slate-800">{application.student.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Graduation Year:</span>
                  <span className="font-bold text-slate-800">{application.student.batchYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Roll Number:</span>
                  <span className="font-bold text-slate-800">{application.student.enrollmentNumber}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                  <span className="text-slate-500 font-medium">Undergrad CGPA:</span>
                  <span className="font-black text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                    {application.student.cgpa.toFixed(2)} / 10.0
                  </span>
                </div>
              </div>
            </div>

            {/* Contact & Portfolio Links */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-800 font-heading font-black text-xs uppercase tracking-wider">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Contact & Profiles</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[200px]">{application.student.user.email}</span>
                </div>
                {application.student.phone && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Phone:</span>
                    <span className="font-bold text-slate-800">{application.student.phone}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                  {application.student.githubUrl && (
                    <a
                      href={application.student.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-black hover:border-slate-400 transition-colors"
                      title="GitHub Profile"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {application.student.linkedinUrl && (
                    <a
                      href={application.student.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-white border border-slate-200 text-blue-600 hover:border-blue-400 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  {application.student.portfolioUrl && (
                    <a
                      href={application.student.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-white border border-slate-200 text-purple-600 hover:border-purple-400 transition-colors"
                      title="Portfolio Website"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  {resumeLink && (
                    <a
                      href={resumeLink}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Resume</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* 4. Skills Match Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 font-heading">
                Candidate Skills & Competencies
              </span>
              <span className="text-[11px] font-bold text-blue-600">
                {application.student.skills.length} skills listed
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {application.student.skills.map((skill, idx) => {
                const matchesJob = application.job.skills.some(
                  (js) => js.toLowerCase() === skill.toLowerCase()
                );
                return (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${
                      matchesJob
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-500/20'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {matchesJob && <Sparkles className="w-3 h-3 text-emerald-600" />}
                    <span>{skill}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* 5. Recruiter Internal Evaluation Notes */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500 font-heading">
              Internal Recruiter Notes & Evaluation Feedback
            </label>
            <textarea
              rows={3}
              value={evaluationNotes}
              onChange={(e) => setEvaluationNotes(e.target.value)}
              placeholder="Add interviewer notes, technical score, behavioral assessment, or follow-up tasks..."
              className="w-full p-3 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
            />
          </div>

        </div>

        {/* Modal Bottom Sticky Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/80">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isActionLoading}
            onClick={handleSaveStatus}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50"
          >
            {isActionLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save & Update Pipeline</span>
          </button>
        </div>

      </div>
    </div>
  );
}
