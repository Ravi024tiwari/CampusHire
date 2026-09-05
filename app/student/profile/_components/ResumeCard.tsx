'use client';

import React, { useRef } from 'react';
import { 
  FileText, 
  ExternalLink, 
  UploadCloud, 
  Edit3, 
  Lightbulb, 
  Check, 
  Loader2 
} from 'lucide-react';
import { useStudentProfileStore } from '@/store/useStudentProfileStore';

export function ResumeCard() {
  const { 
    profile, 
    isUploadingResume, 
    uploadResume, 
    setManageResumeOpen 
  } = useStudentProfileStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!profile) return null;

  const defaultResume = profile.resumes?.find((r) => r.isDefault) || profile.resumes?.[0];
  const resumeTitle = defaultResume?.title || (profile.user.name ? `${profile.user.name.replace(/\s+/g, '_')}_Resume.pdf` : 'Ravi_Tiwari_Resume.pdf');
  const resumeUrl = defaultResume?.fileUrl || profile.resumeUrl || '#';
  
  const formattedDate = defaultResume?.createdAt
    ? new Date(defaultResume.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Aug 10, 2025';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadResume(file, file.name);
      e.target.value = '';
    }
  };

  const handleViewResume = () => {
    if (resumeUrl && resumeUrl !== '#') {
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
    } else {
      setManageResumeOpen(true);
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        className="hidden"
      />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Resume
            </h2>
          </div>

          <button
            onClick={() => setManageResumeOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-700 lg:bg-blue-50 lg:text-blue-700 lg:border lg:border-blue-100 lg:hover:bg-blue-600 lg:hover:text-white lg:hover:border-blue-600 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        {/* Document Details Block */}
        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-3">
          <div className="flex items-center gap-3">
            {/* Red PDF Badge */}
            <div className="h-10 w-10 rounded-lg bg-rose-500 text-white flex flex-col items-center justify-center font-black text-[9px] shadow-xs shrink-0 tracking-wider">
              <span>PDF</span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">
                {resumeTitle}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Updated on {formattedDate}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleViewResume}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 text-xs font-bold shadow-2xs transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Resume</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingResume}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold shadow-2xs transition-all cursor-pointer"
            >
              {isUploadingResume ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
              ) : (
                <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
              )}
              <span>Replace</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tip Banner + Link to full Resume Hub */}
      <div className="mt-4 space-y-2">
        <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2 text-emerald-800">
          <Lightbulb className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-[11px] font-medium leading-tight">
            Keep your resume updated to improve your chances of getting shortlisted.
          </p>
        </div>

        <a
          href="/student/resume"
          className="flex items-center justify-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline pt-1"
        >
          <span>Manage All Resume Versions →</span>
        </a>
      </div>
    </div>
  );
}
