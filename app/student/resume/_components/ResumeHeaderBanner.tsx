'use client';

import React from 'react';
import { 
  FileText, 
  Star, 
  Sparkles, 
  Target, 
  Zap, 
  ShieldCheck, 
  ArrowDown, 
  Layers 
} from 'lucide-react';
import { useStudentResumeStore } from '@/store/useStudentResumeStore';

export function ResumeHeaderBanner() {
  const { resumes } = useStudentResumeStore();

  const totalResumes = resumes.length;
  const defaultResume = resumes.find((r) => r.isDefault);

  const scrollToUpload = () => {
    const uploadElement = document.getElementById('resume-upload-section');
    if (uploadElement) {
      uploadElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/95 via-indigo-50/70 to-sky-100/90 border border-blue-200/80 p-6 sm:p-8 lg:p-9 shadow-xs">
      
      {/* Background Decorative Campus Silhouette & Sunburst */}
      <div className="absolute right-0 top-0 bottom-0 w-2/5 pointer-events-none opacity-15 hidden lg:block overflow-hidden">
        <svg
          viewBox="0 0 400 300"
          className="absolute right-0 bottom-0 w-full h-full text-blue-900"
          fill="currentColor"
        >
          <path d="M60,40 L240,40 L300,100 L300,280 L60,280 Z" opacity="0.35" />
          <path d="M240,40 L240,100 L300,100 Z" opacity="0.6" />
          <rect x="90" y="100" width="120" height="10" rx="3" opacity="0.7" />
          <rect x="90" y="125" width="170" height="10" rx="3" opacity="0.7" />
          <rect x="90" y="150" width="150" height="10" rx="3" opacity="0.7" />
          <rect x="90" y="175" width="100" height="10" rx="3" opacity="0.7" />
          {/* Sunburst badge */}
          <circle cx="340" cy="60" r="35" opacity="0.2" />
        </svg>
      </div>

      <div className="relative z-10 space-y-6">
        
        {/* Top Header: Badge, Heading, Copywriter Narrative & Tagline */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="space-y-2.5 max-w-3xl">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Placement Resume Architecture</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-heading leading-tight">
              Tailor, Manage & Target Multiple Resumes for Every Campus Drive
            </h1>

            {/* Strategic Content Writer Narrative */}
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Top recruiters look for domain depth. Increase your shortlist rate by keeping distinct, high-impact resume versions tailored for <strong>Full Stack Web, Data & AI, and Core Software Engineering</strong> roles. Assign a primary default resume for instant 1-click applications across all college placement drives.
            </p>
          </div>

          {/* Right Slogan Box */}
          <div className="lg:text-right shrink-0">
            <div className="inline-flex lg:flex-col items-center lg:items-end gap-1.5 px-3.5 py-2 rounded-2xl bg-white/80 border border-blue-100 shadow-2xs backdrop-blur-xs">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>&ldquo;Better Skills, Brighter Opportunities&rdquo;</span>
                <span className="text-base">🇮🇳</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                CampusHire Verified Portal
              </span>
            </div>
          </div>

        </div>

        {/* 3 Guidance Value Pillars (Pill Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          
          {/* Pillar 1: Role Tailoring */}
          <div className="p-3.5 rounded-2xl bg-white/85 border border-blue-100/90 shadow-2xs flex items-start gap-3 group hover:border-blue-300 transition-colors">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
              <Target className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-slate-900 leading-snug">
                Role-Specific Targeting
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                Customize your project highlights and skill sets to match company job descriptions.
              </p>
            </div>
          </div>

          {/* Pillar 2: 1-Click Smart Default */}
          <div className="p-3.5 rounded-2xl bg-white/85 border border-blue-100/90 shadow-2xs flex items-start gap-3 group hover:border-blue-300 transition-colors">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-slate-900 leading-snug">
                Smart 1-Click Default
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                Your primary resume is auto-selected for fast application submissions on the job board.
              </p>
            </div>
          </div>

          {/* Pillar 3: Immutable Drive Snapshot */}
          <div className="p-3.5 rounded-2xl bg-white/85 border border-blue-100/90 shadow-2xs flex items-start gap-3 group hover:border-blue-300 transition-colors">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-slate-900 leading-snug">
                Cloud Encrypted & Permanent
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                Applied drives lock in the exact PDF submitted, so recruiters always view your original application.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Telemetry & Quick Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/70">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Version Count Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>{totalResumes} {totalResumes === 1 ? 'Version Active' : 'Versions Active'}</span>
            </div>

            {/* Default Resume Indicator */}
            {defaultResume ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <Star className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>Primary: {defaultResume.title}</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                <Star className="w-3.5 h-3.5 text-amber-600" />
                <span>No Default Set</span>
              </div>
            )}
          </div>

          {/* Quick Jump Action */}
          <button
            onClick={scrollToUpload}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer active:scale-95"
          >
            <span>Upload New Version</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </div>
  );
}
