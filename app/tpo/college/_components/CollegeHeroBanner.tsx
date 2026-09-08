'use client';

import React from 'react';
import { 
  Building2, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  School,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface CollegeHeroBannerProps {
  name: string;
  code?: string | null;
  domain?: string | null;
  city?: string | null;
  state?: string | null;
  logoUrl?: string | null;
  coverImage?: string | null;
  isVerified?: boolean;
  totalStudents?: number;
  activeDrives?: number;
  onOpenPreview?: () => void;
  isDirty?: boolean;
}

export function CollegeHeroBanner({
  name,
  code,
  domain,
  city,
  state,
  logoUrl,
  coverImage,
  isVerified = true,
  totalStudents = 0,
  activeDrives = 0,
  onOpenPreview,
  isDirty = false,
}: CollegeHeroBannerProps) {
  const fallbackCover = 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&auto=format&fit=crop&q=80';
  const displayCover = coverImage || fallbackCover;

  return (
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-xs transition-all duration-300">
      {/* Background Cover Image with Gradient */}
      <div className="h-44 sm:h-52 md:h-60 lg:h-64 w-full relative">
        <img
          src={displayCover}
          alt={name || 'Campus Cover'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-900/20" />

        {/* Top Badges & Preview Action */}
        <div className="absolute top-3.5 sm:top-5 left-3.5 sm:left-5 right-3.5 sm:right-5 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-2">
            {isVerified ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-bold backdrop-blur-md shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Campus</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-white text-xs font-bold backdrop-blur-md shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verification Pending</span>
              </span>
            )}

            {isDirty && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wider animate-pulse shadow-xs">
                Unsaved Draft
              </span>
            )}
          </div>

          {onOpenPreview && (
            <button
              type="button"
              onClick={onOpenPreview}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-md border border-white/25 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Recruiter Directory Preview</span>
              <span className="sm:hidden">Preview</span>
            </button>
          )}
        </div>

        {/* Bottom Hero Info */}
        <div className="absolute bottom-3.5 sm:bottom-5 left-3.5 sm:left-6 right-3.5 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Emblem */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-white p-1.5 shadow-lg shrink-0 border-2 border-white/60 overflow-hidden flex items-center justify-center">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-inner">
                  {code ? code.slice(0, 3) : <School className="w-7 h-7" />}
                </div>
              )}
            </div>

            {/* Titles & Meta */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-white drop-shadow-sm truncate max-w-full">
                  {name || 'Institution Name'}
                </h1>
                {code && (
                  <span className="inline-block px-2 py-0.5 rounded-md bg-white/20 border border-white/30 text-white text-xs font-mono font-bold shrink-0">
                    {code}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-200 mt-1 flex-wrap">
                {(city || state) && (
                  <span className="flex items-center gap-1 text-slate-100 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{[city, state].filter(Boolean).join(', ')}</span>
                  </span>
                )}
                {domain && (
                  <>
                    <span className="text-white/40 hidden sm:inline">&bull;</span>
                    <a
                      href={`https://${domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-200 hover:text-white font-medium transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{domain}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Metrics Badge (Desktop / Tablet) */}
          <div className="hidden md:flex items-center gap-3 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 shrink-0 text-right">
            {totalStudents > 0 && (
              <div className="pr-3 border-r border-white/20">
                <p className="text-[10px] uppercase font-bold text-slate-300">Enrolled</p>
                <p className="text-sm font-black text-white">{totalStudents.toLocaleString()} Students</p>
              </div>
            )}
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-300">Placement Hub</p>
              <p className="text-sm font-black text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Live Active</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
