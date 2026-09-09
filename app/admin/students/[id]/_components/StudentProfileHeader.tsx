'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Edit3, 
  MoreHorizontal,
  Quote,
  ExternalLink,
  Globe
} from 'lucide-react';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6 1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

export interface StudentDossierData {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  isActive: boolean;
  isVerified: boolean;
  bio: string;
  enrollmentNumber: string;
  branch: string;
  batchYear: number;
  cgpa: number;
  tenthPercentage?: number | null;
  twelfthPercentage?: number | null;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  nationality?: string;
  college: {
    id: string;
    name: string;
    code?: string | null;
    city?: string | null;
    state?: string | null;
    logoUrl?: string | null;
  };
  placementStatus: 'Placed' | 'Interviewing' | 'Offered' | 'Not Placed';
  profileCompletion: number;
  stats?: {
    totalApplications: number;
    totalInterviews: number;
    totalOffers: number;
    totalPlaced: number;
  };
  metrics?: {
    totalApplications?: number;
    interviewCount?: number;
    offersReceived?: number;
    offersAccepted?: number;
    isPlaced?: boolean;
    acceptedOfferPackage?: string | null;
    acceptedOfferCompany?: string | null;
  };
  skills: string[];
  jobInterests?: string[];
  projects?: Array<{
    id: string;
    title: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
  }>;
  socialLinks?: {
    portfolio?: string | null;
    linkedin?: string | null;
    github?: string | null;
    leetcode?: string | null;
  };
  resumes: Array<{
    id: string;
    title: string;
    fileUrl: string;
    fileSize?: number | null;
    fileType?: string | null;
    isDefault: boolean;
    createdAt: string;
  }>;
  primaryResume?: {
    id: string;
    title: string;
    fileUrl: string;
    fileSize?: number | null;
    fileType?: string | null;
    isDefault: boolean;
    createdAt: string;
  } | null;
  applications: Array<{
    id: string;
    status: string;
    createdAt: string;
    job: {
      id: string;
      title: string;
      type: string;
      salaryPackage: string;
      location: string;
      company: {
        id: string;
        name: string;
        logoUrl?: string | null;
      };
    };
  }>;
  offers: Array<{
    id: string;
    status: string;
    designation: string;
    salaryPackage: string;
    location: string;
    joiningDate?: string | null;
    letterUrl?: string | null;
    createdAt: string;
    company: {
      id: string;
      name: string;
      logoUrl?: string | null;
    };
  }>;
  activityStream: Array<{
    id: string;
    title: string;
    timestamp: string;
    timeAgo: string;
    type: string;
    icon: string;
    color: string;
  }>;
  joinedOn: string;
}

interface StudentProfileHeaderProps {
  student: StudentDossierData;
  onToggleStatus: () => void;
  onSendMessage: () => void;
  isUpdatingStatus?: boolean;
  backUrl?: string;
  backLabel?: string;
}

export function StudentProfileHeader({
  student,
  onToggleStatus,
  onSendMessage,
  isUpdatingStatus = false,
  backUrl = '/admin/students',
  backLabel = 'Students',
}: StudentProfileHeaderProps) {
  return (
    <div className="space-y-4">
      
      {/* 1. Breadcrumbs & Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Breadcrumb Links */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link href={backUrl} className="hover:text-blue-600 transition-colors">
            {backLabel}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0A2540] font-bold">
            Student Details
          </span>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={onSendMessage}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-bold text-xs shadow-2xs transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
            <span>Message</span>
          </button>

          <button
            type="button"
            onClick={onToggleStatus}
            disabled={isUpdatingStatus}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-2xs transition-colors ${
              student.isActive
                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isUpdatingStatus ? 'Updating...' : student.isActive ? 'Deactivate' : 'Activate'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Profile Identity Banner */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Avatar & Identity */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            
            {/* Avatar Container with Verified Badge */}
            <div className="relative shrink-0">
              {student.avatarUrl ? (
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-100 shadow-sm">
                  <Image
                    src={student.avatarUrl}
                    alt={student.name}
                    fill
                    sizes="(max-width: 640px) 80px, 96px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#0D8B8A] to-teal-400 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-md">
                  {student.name.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Verified Badge */}
              <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                <span>Verified</span>
              </div>
            </div>

            {/* Typography & Contact Matrix */}
            <div className="space-y-2 flex-1 min-w-0">
              {/* Name & Status Pill */}
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
                  {student.name}
                </h1>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
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

              {/* Subheading: Branch & Institution */}
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                {student.branch} &bull; {student.college.name} &bull; {student.batchYear}
              </p>

              {/* Contact Icons Row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-[11px] sm:text-xs text-slate-500 font-medium">
                {student.email && (
                  <a
                    href={`mailto:${student.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-[#0D8B8A] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{student.email}</span>
                  </a>
                )}
                {student.phone && (
                  <a
                    href={`tel:${student.phone}`}
                    className="inline-flex items-center gap-1.5 hover:text-[#0D8B8A] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{student.phone}</span>
                  </a>
                )}
                {student.address && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{student.address}</span>
                  </span>
                )}
                {student.socialLinks?.linkedin && (
                  <a
                    href={student.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sky-700 hover:underline font-bold"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {student.socialLinks?.github && (
                  <a
                    href={student.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-800 hover:underline font-bold"
                  >
                    <GitHubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Career Bio / Quote Card (Desktop & Tablet) */}
          <div className="lg:col-span-4 w-full">
            {student.bio ? (
              <div className="rounded-2xl bg-gradient-to-br from-teal-50/70 via-emerald-50/30 to-sky-50/50 border border-teal-100/80 p-4 sm:p-5 relative overflow-hidden">
                <Quote className="w-6 h-6 text-teal-600/20 absolute top-3 right-3" />
                <blockquote className="text-xs sm:text-[13px] text-slate-700 font-medium italic leading-relaxed relative z-10 mb-2">
                  &ldquo;{student.bio}&rdquo;
                </blockquote>
                <div className="text-[11px] font-extrabold text-[#0A2540] font-heading text-right">
                  — {student.name}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center text-xs text-slate-400">
                Candidate enrolled in campus placement drives.
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
