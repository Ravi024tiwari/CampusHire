'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  ExternalLink, 
  Download, 
  Globe, 
  Code2, 
  MessageSquare, 
  FileEdit, 
  AlertTriangle,
  Trophy,
  Briefcase,
  Calendar,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import type { StudentDossierData } from './StudentProfileHeader';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6 1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

interface StudentOverviewTabProps {
  student: StudentDossierData;
  onSendMessage: () => void;
  onToggleStatus: () => void;
  isUpdatingStatus?: boolean;
}

export function StudentOverviewTab({
  student,
  onSendMessage,
  onToggleStatus,
  isUpdatingStatus = false,
}: StudentOverviewTabProps) {
  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. TOP 3 INFORMATION MATRICES (Personal, Academic, Status & Actions)      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Card 1: Personal Information */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-[#0A2540] font-heading pb-2 border-b border-slate-100">
            Personal Information
          </h3>

          <div className="space-y-3 text-xs font-medium">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Full Name</span>
              <span className="font-bold text-slate-800 text-right">{student.name}</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Email Address</span>
              <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">
                {student.email}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Phone Number</span>
              <span className="font-bold text-slate-800 text-right">
                {student.phone || '+91 98765 43210'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Date of Birth</span>
              <span className="font-bold text-slate-800 text-right">
                {student.dateOfBirth || '15 May 2004'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Gender</span>
              <span className="font-bold text-slate-800 text-right">
                {student.gender || 'Male'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Current Address</span>
              <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">
                {student.address || 'Powai, Mumbai, Maharashtra'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Nationality</span>
              <span className="font-bold text-slate-800 text-right">
                {student.nationality || 'Indian'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Academic Information */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-[#0A2540] font-heading pb-2 border-b border-slate-100">
            Academic Information
          </h3>

          <div className="space-y-3 text-xs font-medium">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">College</span>
              <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">
                {student.college.name}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Branch</span>
              <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">
                {student.branch}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Batch Year</span>
              <span className="font-bold text-slate-800 text-right">{student.batchYear}</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">Enrollment No.</span>
              <span className="font-bold font-mono text-slate-800 text-right">
                {student.enrollmentNumber}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">CGPA</span>
              <span className="font-black text-[#0D8B8A] text-right">
                {student.cgpa ? `${student.cgpa} / 10` : '8.7 / 10'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">10th Percentage</span>
              <span className="font-bold text-slate-800 text-right">
                {student.tenthPercentage ? `${student.tenthPercentage}%` : '96%'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400">12th Percentage</span>
              <span className="font-bold text-slate-800 text-right">
                {student.twelfthPercentage ? `${student.twelfthPercentage}%` : '93%'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Status & Actions */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-[#0A2540] font-heading pb-2 border-b border-slate-100">
              Status & Actions
            </h3>

            <div className="space-y-3 text-xs font-medium">
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-400">Account Status</span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    student.isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      student.isActive ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  {student.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-400">Email Verified</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Yes
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-400">Profile Completion</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${student.profileCompletion}%` }}
                    />
                  </div>
                  <span className="font-bold text-slate-800">{student.profileCompletion}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-400">Placement Status</span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    student.placementStatus === 'Placed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : student.placementStatus === 'Interviewing'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : student.placementStatus === 'Offered'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      student.placementStatus === 'Placed'
                        ? 'bg-emerald-500'
                        : student.placementStatus === 'Interviewing'
                        ? 'bg-amber-500'
                        : student.placementStatus === 'Offered'
                        ? 'bg-blue-500'
                        : 'bg-rose-500'
                    }`}
                  />
                  {student.placementStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              type="button"
              onClick={onSendMessage}
              className="py-2 px-3 rounded-xl bg-[#0D8B8A] hover:bg-[#0F766E] text-white font-bold text-xs shadow-2xs text-center transition-colors"
            >
              Send Message
            </button>
            <button
              type="button"
              onClick={onSendMessage}
              className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs shadow-2xs text-center transition-colors"
            >
              Add Note
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. LOWER SECTION (Skills, Resume, Projects, Activity Logs)                */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column (8 Cols on desktop: Skills, Resume, Projects, Links) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* A. Technical Skills Matrix */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3.5">
            <h3 className="text-sm font-black text-[#0A2540] font-heading">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-sky-50/80 border border-sky-100 text-sky-800 font-bold text-xs hover:bg-sky-100/70 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* B. Resume & Career Document */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3.5">
            <h3 className="text-sm font-black text-[#0A2540] font-heading">
              Resume & Documents
            </h3>
            
            {student.primaryResume ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-[#0A2540] font-heading truncate max-w-[280px]">
                      {student.primaryResume.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      PDF &bull; 512 KB &bull; Uploaded on 12 Aug 2024
                    </p>
                  </div>
                </div>

                <a
                  href={student.primaryResume.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-teal-50 text-[#0D8B8A] border border-teal-200 font-bold text-xs shadow-2xs self-start sm:self-auto transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Resume</span>
                </a>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-center text-xs text-slate-400">
                No resume uploaded yet.
              </div>
            )}
          </div>

          {/* C. Job Interests */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3.5">
            <h3 className="text-sm font-black text-[#0A2540] font-heading">
              Job Interests & Preferred Roles
            </h3>
            <div className="flex flex-wrap gap-2">
              {student.jobInterests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-700 font-bold text-xs"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* D. Showcase Projects */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-[#0A2540] font-heading">
                Projects
              </h3>
              <span className="text-xs font-bold text-[#0D8B8A] hover:underline cursor-pointer">
                View All
              </span>
            </div>

            <div className="space-y-3.5">
              {student.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-2xl bg-slate-50/75 border border-slate-200/70 space-y-2 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-xs sm:text-sm font-black text-[#0A2540] font-heading">
                      {proj.title}
                    </h4>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900"
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-semibold text-[10px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* E. Additional Links */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3.5">
            <h3 className="text-sm font-black text-[#0A2540] font-heading">
              Additional Links
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {student.socialLinks.portfolio && (
                <a
                  href={student.socialLinks.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 text-slate-700 font-bold transition-colors truncate"
                >
                  <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{student.socialLinks.portfolio}</span>
                </a>
              )}

              {student.socialLinks.linkedin && (
                <a
                  href={student.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 text-slate-700 font-bold transition-colors truncate"
                >
                  <LinkedInIcon className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="truncate">{student.socialLinks.linkedin}</span>
                </a>
              )}

              {student.socialLinks.github && (
                <a
                  href={student.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 text-slate-700 font-bold transition-colors truncate"
                >
                  <GitHubIcon className="w-4 h-4 text-slate-700 shrink-0" />
                  <span className="truncate">{student.socialLinks.github}</span>
                </a>
              )}

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 font-bold truncate">
                <Code2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">leetcode.com/u/aaravsharma</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 Cols on desktop: Recent Activity & Governance Controls) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Recent Activity Timeline */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-[#0A2540] font-heading">
                Recent Activity
              </h3>
              <span className="text-xs font-bold text-[#0D8B8A] hover:underline cursor-pointer">
                View All
              </span>
            </div>

            <div className="space-y-3.5 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-100">
              {student.activityStream.map((act) => (
                <div key={act.id} className="flex items-start gap-3 relative z-10">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${
                      act.type === 'PLACEMENT'
                        ? 'bg-emerald-100 text-emerald-700'
                        : act.type === 'OFFER'
                        ? 'bg-amber-100 text-amber-700'
                        : act.type === 'INTERVIEW'
                        ? 'bg-sky-100 text-sky-700'
                        : act.type === 'APPLICATION'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-teal-100 text-teal-700'
                    }`}
                  >
                    {act.type === 'PLACEMENT' && <Trophy className="w-3.5 h-3.5" />}
                    {act.type === 'OFFER' && <Briefcase className="w-3.5 h-3.5" />}
                    {act.type === 'INTERVIEW' && <Calendar className="w-3.5 h-3.5" />}
                    {act.type === 'APPLICATION' && <FileText className="w-3.5 h-3.5" />}
                    {act.type === 'PROFILE' && <UserCheck className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 leading-tight">
                      {act.title}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {act.timeAgo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Governance Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-rose-100 p-5 sm:p-6 shadow-xs space-y-3 bg-gradient-to-b from-white to-rose-50/20">
            <h3 className="text-sm font-black text-rose-900 font-heading flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Account Controls
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Manage student portal access. Deactivating prevents candidate from applying to new placement drives.
            </p>
            <button
              type="button"
              onClick={onToggleStatus}
              disabled={isUpdatingStatus}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold border transition-colors shadow-2xs ${
                student.isActive
                  ? 'border-rose-300 text-rose-700 hover:bg-rose-50'
                  : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {isUpdatingStatus
                ? 'Updating Status...'
                : student.isActive
                ? 'Deactivate Account'
                : 'Activate Account'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
