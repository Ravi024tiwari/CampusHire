'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAdminStore } from '@/store/useAdminStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  Award
} from 'lucide-react';

export function AdminHeroBanner() {
  const { kpis, pendingColleges } = useAdminStore();
  const { user } = useAuthStore();

  const firstName = user?.name ? user.name.split(' ')[0] : 'Director';

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-blue-50/40 to-slate-50 shadow-xs">
      {/* Background Hero Artwork with Ambient Light Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/admin/super_admin_banner.jpg"
          alt="CampusHire National Placement Hub Banner"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1400px"
          className="object-cover object-right lg:object-center opacity-15 sm:opacity-25 transition-transform duration-1000 hover:scale-102"
        />
        {/* Soft Multi-Tone Ambient Light Diffusion */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-[#FBAB23]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 p-5 sm:p-8 lg:p-10 xl:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
        
        {/* Left: Text & Institutional Mission */}
        <div className="max-w-3xl space-y-3.5 sm:space-y-4">
          
          {/* Top Pill with Friendly Greeting */}
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs sm:text-sm font-extrabold text-[#2563EB] border border-blue-200 shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
            <span>Welcome back, {firstName} • Super Admin Command Center</span>
          </div>

          {/* Large Screen Bold Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[#0A2540] tracking-tight leading-tight font-heading">
            Empowering Campus Placements Across India’s Premier Universities.
          </h1>

          {/* Subtitle - Increased size for large screens */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-medium">
            Centralized institutional governance connecting autonomous campuses, departmental TPC cells, and global corporate recruiters. Accredit new colleges, schedule placement drives, and monitor real-time CTC packages.
          </p>

          {/* Interactive Fast Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/admin/verify-colleges"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] px-5 sm:px-6 py-3 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-blue-600/20 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <GraduationCap className="h-5 w-5" />
              <span>Review Accreditations ({pendingColleges.length})</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/admin/drives"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold text-[#0A2540] shadow-2xs transition-all hover:border-blue-400 cursor-pointer"
            >
              <Briefcase className="h-5 w-5 text-[#FBAB23]" />
              <span>Active Campus Drives ({kpis?.activePlacementDrives || 0})</span>
            </Link>
          </div>

        </div>

        {/* Right: Compact Institutional Highlight Cards on Mobile, Sleek Widgets on Desktop */}
        <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2.5 sm:gap-3.5 shrink-0 lg:w-72 xl:w-80 w-full">
          
          {/* Card 1: Top CTC Pulse */}
          <div className="flex-1 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-4 lg:p-5 shadow-2xs hover:shadow-xs transition-all">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">Top Batch Package</span>
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-[#FBAB23] shrink-0" />
            </div>
            <div className="mt-1.5 sm:mt-2 flex flex-wrap items-baseline justify-between gap-1">
              <span className="text-base sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-mono tracking-tight">{kpis?.maxSalaryPackage || '₹48.0 LPA'}</span>
              <span className="text-[9px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                Verified
              </span>
            </div>
            <p className="mt-1 text-[9.5px] sm:text-xs text-slate-500 font-medium truncate">Highest verified compensation offer</p>
          </div>

          {/* Card 2: Placement Success Rate */}
          <div className="flex-1 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-4 lg:p-5 shadow-2xs hover:shadow-xs transition-all">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">Selection Rate</span>
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#2563EB] shrink-0" />
            </div>
            <div className="mt-1.5 sm:mt-2 flex flex-wrap items-baseline justify-between gap-1">
              <span className="text-base sm:text-2xl lg:text-3xl font-extrabold text-[#2563EB] font-mono tracking-tight">{kpis?.placementPercentage || '96.4%'}</span>
              <span className="text-[9px] sm:text-[11px] font-bold text-blue-700 bg-blue-50 px-1.5 sm:px-2.5 py-0.5 rounded-full border border-blue-200 shrink-0">
                2026 Batch
              </span>
            </div>
            <p className="mt-1 text-[9.5px] sm:text-xs text-slate-500 font-medium truncate">{kpis?.totalOffersAccepted || 0} student offers confirmed</p>
          </div>

        </div>

      </div>
    </div>
  );
}
