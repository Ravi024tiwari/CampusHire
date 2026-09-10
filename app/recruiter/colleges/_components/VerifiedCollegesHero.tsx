'use client';

import React from 'react';
import { 
  Building2, 
  GraduationCap, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface VerifiedCollegesHeroProps {
  totalVerified?: number | string;
  totalStates?: number | string;
  totalStudents?: number | string;
  isRealData?: boolean;
}

export function VerifiedCollegesHero({
  totalVerified = 500,
  totalStates = 28,
  totalStudents = '1.2M+',
  isRealData = false,
}: VerifiedCollegesHeroProps) {
  // Format student count nicely
  const formattedStudents = React.useMemo(() => {
    if (typeof totalStudents === 'string') return totalStudents;
    if (typeof totalStudents === 'number') {
      if (totalStudents >= 1_000_000) {
        return `${(totalStudents / 1_000_000).toFixed(1)}M+`;
      }
      if (totalStudents >= 1_000) {
        return `${(totalStudents / 1_000).toFixed(1)}K+`;
      }
      return totalStudents.toLocaleString();
    }
    return '0';
  }, [totalStudents]);

  const formattedColleges = React.useMemo(() => {
    if (typeof totalVerified === 'string') return totalVerified;
    if (typeof totalVerified === 'number') {
      return totalVerified > 0 ? `${totalVerified}` : '0';
    }
    return '0';
  }, [totalVerified]);

  const formattedStates = React.useMemo(() => {
    if (typeof totalStates === 'string') return totalStates;
    if (typeof totalStates === 'number') {
      return `${totalStates}`;
    }
    return '0';
  }, [totalStates]);

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-50/95 via-indigo-50/60 to-sky-50/90 border border-blue-100/90 p-4 sm:p-6 lg:p-7 shadow-xs">
      
      {/* Background Decorative Ambient Blobs */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 left-1/3 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left: Title, Description, and Counter Chips */}
        <div className="space-y-4 max-w-2xl">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
                Verified Colleges
              </h1>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-0.5 text-[10.5px] sm:text-xs font-black text-emerald-700 border border-emerald-200 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Accredited Network
              </span>
              {isRealData && (
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-blue-700 border border-blue-200 shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                  Live Directory
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Partner with India’s top accredited universities and discover vetted candidate pools.
            </p>
          </div>

          {/* Metric Counter Chips */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-4 pt-1">
            
            {/* 1. Verified Colleges */}
            <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-xs px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-sm sm:text-base font-black text-[#0A2540] font-heading leading-tight block truncate">
                  {formattedColleges}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block leading-tight truncate">
                  Verified Campuses
                </span>
              </div>
            </div>

            {/* 2. States Covered */}
            <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-xs px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-sm sm:text-base font-black text-[#0A2540] font-heading leading-tight block truncate">
                  {formattedStates}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block leading-tight truncate">
                  States Covered
                </span>
              </div>
            </div>

            {/* 3. Students Pool */}
            <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-xs px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-black text-xs shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-sm sm:text-base font-black text-[#0A2540] font-heading leading-tight block truncate">
                  {formattedStudents}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block leading-tight truncate">
                  Candidates Pool
                </span>
              </div>
            </div>

            {/* 4. Trusted Recruiters */}
            <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-xs px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xs shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-sm sm:text-base font-black text-[#0A2540] font-heading leading-tight block truncate">
                  Enterprise
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block leading-tight truncate">
                  Direct Drives
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Campus Building Art & Quote Banner */}
        <div className="relative hidden md:flex items-center justify-end shrink-0">
          <div className="relative w-72 lg:w-80 h-36 rounded-2xl bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-950 overflow-hidden shadow-md border border-white/40 p-3 flex flex-col justify-between text-white">
            
            {/* Architectural Grid SVG Graphic */}
            <div className="absolute inset-0 opacity-25">
              <svg className="w-full h-full" viewBox="0 0 320 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="45" width="280" height="95" rx="4" fill="#3B82F6" fillOpacity="0.3" />
                <rect x="110" y="25" width="100" height="115" rx="4" fill="#60A5FA" fillOpacity="0.4" />
                <polygon points="160,5 105,25 215,25" fill="#93C5FD" fillOpacity="0.6" />
                <rect x="40" y="60" width="16" height="20" rx="2" fill="#FFFFFF" fillOpacity="0.5" />
                <rect x="70" y="60" width="16" height="20" rx="2" fill="#FFFFFF" fillOpacity="0.5" />
                <rect x="130" y="45" width="18" height="22" rx="2" fill="#FFFFFF" fillOpacity="0.7" />
                <rect x="172" y="45" width="18" height="22" rx="2" fill="#FFFFFF" fillOpacity="0.7" />
                <rect x="234" y="60" width="16" height="20" rx="2" fill="#FFFFFF" fillOpacity="0.5" />
                <rect x="264" y="60" width="16" height="20" rx="2" fill="#FFFFFF" fillOpacity="0.5" />
                <rect x="40" y="90" width="16" height="20" rx="2" fill="#FFFFFF" fillOpacity="0.5" />
                <rect x="70" y="90" width="16" height="20" rx="2" fill="#FFFFFF" fillOpacity="0.5" />
                <rect x="130" y="80" width="18" height="22" rx="2" fill="#FFFFFF" fillOpacity="0.7" />
                <rect x="172" y="80" width="18" height="22" rx="2" fill="#FFFFFF" fillOpacity="0.7" />
                <rect x="234" y="90" width="16" height="20" rx="2" fill="#FFFFFF" fillOpacity="0.5" />
                <rect x="264" y="90" width="16" height="20" rx="2" fill="#FFFFFF" fillOpacity="0.5" />
                <path d="M145 140V115C145 106.716 151.716 100 160 100C168.284 100 175 106.716 175 115V140H145Z" fill="#FFFFFF" fillOpacity="0.8" />
              </svg>
            </div>

            {/* Top Quote Floating Tag */}
            <div className="relative z-10 p-2.5 rounded-xl bg-white/95 text-slate-900 shadow-sm max-w-[250px] border border-white/60">
              <p className="text-[10.5px] font-extrabold text-slate-900 leading-tight">
                &ldquo;Great campuses greater talent, brighter tomorrow.&rdquo;
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[11px]">🇮🇳</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                  India Campus Grid
                </span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-bold text-blue-200">
              <span>National Accreditation</span>
              <span>Verified Direct Sourcing</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
