'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CollegeItem } from '../_types/recruiter-colleges.types';
import { 
  CheckCircle2, 
  MapPin, 
  Globe, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Eye,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  Building2,
  Sparkles,
  ShieldCheck,
  School,
  Award,
  Sparkle
} from 'lucide-react';

interface RecruiterCollegesCardsProps {
  colleges: CollegeItem[];
  onSelectCollege: (college: CollegeItem) => void;
  onResetFilters?: () => void;
}

export function RecruiterCollegesCards({ 
  colleges, 
  onSelectCollege,
  onResetFilters
}: RecruiterCollegesCardsProps) {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopyCode = (e: React.MouseEvent, id: string, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  if (colleges.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-white shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-[#2563EB] border border-blue-100 shadow-md shadow-blue-500/10 mb-4">
          <GraduationCap className="w-8 h-8 stroke-[1.75]" />
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-[#0A2540] font-heading">
          No Verified Universities Found
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
          No accredited university campuses matched your current filter criteria.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {colleges.map((college) => {
        const isCopied = copiedCodeId === college.id;
        const liveDrivesCount = college._count?.jobs || 0;
        const hasActiveDrives = liveDrivesCount > 0;
        const studentPool = college._count?.students || 0;
        const locationStr = [college.city, college.state].filter(Boolean).join(', ');

        return (
          <div
            key={college.id}
            onClick={() => onSelectCollege(college)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectCollege(college);
              }
            }}
            className="group relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-5.5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08),0_2px_6px_-1px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_35px_-8px_rgba(37,99,235,0.18),0_8px_16px_-4px_rgba(0,0,0,0.06)] hover:border-blue-400 -translate-y-0 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
          >
            {/* Top Interactive Animated Gradient Accent Bar */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
              {/* 1. Header: Crest, Verification Shield & Live Drives Pulse */}
              <div className="flex items-start justify-between gap-3 mb-4">
                {/* University Crest / Emblem */}
                <div className="relative w-13 h-13 rounded-2xl bg-white border border-slate-200 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:scale-105 group-hover:border-blue-400 group-hover:shadow-md transition-all duration-300">
                  {college.logoUrl ? (
                    <Image
                      src={college.logoUrl}
                      alt={college.name}
                      fill
                      sizes="52px"
                      className="object-contain p-1.5"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100/70 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-[#2563EB] stroke-[2]" />
                    </div>
                  )}
                </div>

                {/* Status Badges */}
                <div className="flex flex-col items-end gap-1.5">
                  <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-800 bg-emerald-50/90 px-2.5 py-0.5 rounded-full border border-emerald-200/90 shadow-xs shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Verified Campus</span>
                  </span>

                  {hasActiveDrives ? (
                    <span className="inline-flex items-center gap-1.5 text-[10.5px] font-extrabold text-[#2563EB] bg-blue-50/90 px-2.5 py-0.5 rounded-full border border-blue-200 shadow-xs">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                      </span>
                      <span>{liveDrivesCount} Active {liveDrivesCount === 1 ? 'Drive' : 'Drives'}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-full border border-slate-200/70 shadow-2xs">
                      <span>Drive Ready</span>
                    </span>
                  )}
                </div>
              </div>

              {/* 2. University Name */}
              <h3 className="font-extrabold text-sm sm:text-base text-[#0A2540] group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug mb-2 font-heading tracking-tight">
                {college.name}
              </h3>

              {/* 3. Institutional Metadata Strip (Code & Domain) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-4">
                {college.code && (
                  <button
                    type="button"
                    onClick={(e) => handleCopyCode(e, college.id, college.code!)}
                    className="inline-flex items-center gap-1.5 font-mono font-bold text-[11px] text-slate-700 bg-slate-100 hover:bg-slate-200/90 active:bg-slate-300 px-2.5 py-1 rounded-lg border border-slate-200 transition-all cursor-pointer shadow-xs group/btn"
                    title="Copy institutional code"
                  >
                    <span>{college.code}</span>
                    {isCopied ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400 group-hover/btn:text-slate-700" />
                    )}
                  </button>
                )}

                {college.domain && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200/70 shadow-2xs truncate max-w-[170px]">
                    <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{college.domain}</span>
                  </span>
                )}
              </div>

              {/* 4. 2x2 Telemetry Grid with Rich Depth & Elevation */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {/* Tile A: Student Pool */}
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 group-hover:bg-blue-50/30 group-hover:border-blue-200/70 p-2.5 shadow-xs transition-colors flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    <Users className="w-3 h-3 text-[#2563EB]" />
                    <span>Candidate Pool</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-extrabold text-[#0A2540]">{studentPool}</span>
                    <span className="text-[10px] text-slate-500 font-medium">Students</span>
                  </div>
                </div>

                {/* Tile B: Placement Drives */}
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 group-hover:bg-purple-50/30 group-hover:border-purple-200/70 p-2.5 shadow-xs transition-colors flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    <Briefcase className="w-3 h-3 text-purple-600" />
                    <span>Live Drives</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-extrabold text-[#0A2540]">{liveDrivesCount}</span>
                    <span className="text-[10px] text-slate-500 font-medium">Recruitments</span>
                  </div>
                </div>

                {/* Tile C: Campus Location */}
                <div className="col-span-2 rounded-xl border border-slate-200/80 bg-slate-50/70 group-hover:bg-white group-hover:border-slate-300 p-2.5 shadow-xs transition-colors flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 shadow-2xs">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">Campus Hub</p>
                      <p className="text-xs font-bold text-slate-700 truncate">
                        {locationStr || 'National Accreditation Hub'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200 shrink-0 shadow-2xs">
                    NIRF Compliant
                  </span>
                </div>
              </div>
            </div>

            {/* 5. Bottom Interactive Action Bar */}
            <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <School className="w-3.5 h-3.5 text-slate-400" />
                <span>TPO Cell Linked</span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCollege(college);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 group-hover:bg-[#2563EB] text-[#2563EB] group-hover:text-white font-extrabold text-xs transition-all duration-200 cursor-pointer shadow-xs group-hover:shadow-md group-hover:shadow-blue-600/25"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect Dossier</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
