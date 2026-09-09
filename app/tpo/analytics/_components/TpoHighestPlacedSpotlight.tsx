'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CompanyBrandLogo } from '@/app/tpo/jobs/_components/TpoJobCard';
import { 
  Trophy, 
  Sparkles, 
  ArrowUpRight, 
  GraduationCap, 
  Calendar, 
  Award, 
  Building2, 
  Mail,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

export interface HighestPlacedCandidate {
  offerId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatar?: string | null;
  enrollmentNumber: string;
  branch: string;
  batchYear: number;
  cgpa: number;
  companyName: string;
  companyLogo?: string | null;
  designation: string;
  salaryPackage: string;
  numericLpa: number;
  offerDate: string;
  status: string;
}

interface TpoHighestPlacedSpotlightProps {
  candidate?: HighestPlacedCandidate | null;
  isLoading?: boolean;
}

/**
 * Robust Student Avatar Image Component
 * Loads real database avatarUrl, falling back to styled gradient initials on error/empty
 */
export function StudentAvatar({
  name,
  avatarUrl,
  size = 'lg',
  className = '',
}: {
  name: string;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-9 h-9 text-xs rounded-xl',
    md: 'w-11 h-11 text-sm rounded-xl',
    lg: 'w-14 h-14 sm:w-16 sm:h-16 text-xl rounded-2xl',
    xl: 'w-16 h-16 sm:w-20 sm:h-20 text-2xl rounded-3xl',
  }[size];

  const firstLetter = name?.trim() ? name.trim().charAt(0).toUpperCase() : 'S';

  if (avatarUrl && !hasError) {
    return (
      <div className={`relative shrink-0 overflow-hidden bg-slate-100 ${sizeClasses} ${className}`}>
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={() => setHasError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative shrink-0 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white font-black flex items-center justify-center font-heading select-none shadow-xs ${sizeClasses} ${className}`}
    >
      {firstLetter}
    </div>
  );
}

export function TpoHighestPlacedSpotlight({
  candidate,
  isLoading = false,
}: TpoHighestPlacedSpotlightProps) {
  if (isLoading) {
    return (
      <div className="rounded-3xl border border-amber-200/90 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-orange-500/5 p-5 sm:p-7 shadow-xs animate-pulse">
        <div className="h-6 w-48 bg-amber-200/50 rounded-md mb-4" />
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-200/40" />
          <div className="space-y-2 flex-1">
            <div className="h-5 w-40 bg-amber-200/50 rounded-md" />
            <div className="h-4 w-60 bg-amber-200/40 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  // If no candidate placed yet in the database for this academic year
  if (!candidate) {
    return (
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 font-heading">
              Highest Placement Record Spotlight
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              No placement offers recorded for this academic cycle yet.
            </p>
          </div>
        </div>
        <Link
          href="/tpo/jobs"
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors shrink-0"
        >
          View Job Drives
        </Link>
      </div>
    );
  }

  const spotlight = candidate;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-200/90 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 p-5 sm:p-6 lg:p-7 shadow-2xs hover:shadow-xs transition-all duration-300 group">
      {/* Decorative Golden Ambient Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-orange-400/10 blur-2xl pointer-events-none" />

      {/* Top Banner Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-amber-200/60 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <Trophy className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-950 font-heading">
            Highest Placement Record Spotlight
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300/80 inline-flex items-center gap-1 shadow-2xs">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Top Campus Offer
          </span>
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/80 text-slate-600 border border-slate-200">
            {spotlight.offerDate ? new Date(spotlight.offerDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent'}
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
        {/* Left: Student Image + Details */}
        <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
          {/* Real Avatar Photo with Gold Ring & Badge */}
          <div className="relative shrink-0">
            <div className="ring-4 ring-amber-200/90 rounded-2xl sm:rounded-3xl shadow-md">
              <StudentAvatar
                name={spotlight.studentName}
                avatarUrl={spotlight.studentAvatar}
                size="lg"
              />
            </div>
            {/* Trophy Overlay Badge */}
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-500 text-white border-2 border-white flex items-center justify-center shadow-xs">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Details & Tags */}
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/tpo/students/${spotlight.studentId}`}
                className="text-base sm:text-lg lg:text-xl font-black text-[#0A2540] hover:text-[#2563EB] hover:underline font-heading tracking-tight inline-flex items-center gap-1 group/name"
              >
                <span>{spotlight.studentName}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover/name:opacity-100 group-hover/name:translate-x-0 transition-all text-[#2563EB]" />
              </Link>

              <span className="text-[11px] font-bold text-amber-900 bg-amber-100/90 border border-amber-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1 shadow-2xs">
                <ShieldCheck className="w-3 h-3 text-amber-600" />
                CGPA {spotlight.cgpa?.toFixed(2) || 'N/A'}
              </span>
            </div>

            {/* Subtitle / Department Info */}
            <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-700 font-bold">{spotlight.enrollmentNumber}</span>
              <span className="text-slate-300">•</span>
              <span>{spotlight.branch}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-medium">Batch {spotlight.batchYear}</span>
            </p>

            {/* Email link */}
            {spotlight.studentEmail && (
              <a
                href={`mailto:${spotlight.studentEmail}`}
                className="text-[11px] text-slate-500 hover:text-[#2563EB] inline-flex items-center gap-1 transition-colors"
              >
                <Mail className="w-3 h-3 text-slate-400" />
                <span className="truncate max-w-[200px] sm:max-w-none">{spotlight.studentEmail}</span>
              </a>
            )}
          </div>
        </div>

        {/* Right: Company & Package Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-3.5 sm:gap-5 pt-3 lg:pt-0 border-t lg:border-t-0 border-amber-100/80 shrink-0">
          {/* Company Brand */}
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-xs p-2.5 sm:p-3 rounded-2xl border border-amber-100 shadow-2xs">
            <CompanyBrandLogo name={spotlight.companyName} logoUrl={spotlight.companyLogo} size="md" />
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-black text-slate-900 block truncate font-heading">
                {spotlight.companyName}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 block truncate max-w-[140px] sm:max-w-[180px]">
                {spotlight.designation}
              </span>
            </div>
          </div>

          {/* Glowing Package Badge */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1">
            <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white shadow-sm shadow-amber-500/30 text-center min-w-[120px]">
              <span className="text-[10px] font-extrabold uppercase tracking-wider block leading-none opacity-90">
                Offered Package
              </span>
              <span className="text-base sm:text-lg lg:text-xl font-black font-heading tracking-tight block mt-0.5">
                {spotlight.salaryPackage.startsWith('₹') ? spotlight.salaryPackage : `₹ ${spotlight.salaryPackage}`}
              </span>
            </div>

            <Link
              href={`/tpo/students/${spotlight.studentId}`}
              className="px-3 py-1.5 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

