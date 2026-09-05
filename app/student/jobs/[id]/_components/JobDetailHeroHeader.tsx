'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  ShieldCheck, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Check, 
  Sparkles,
  Building2
} from 'lucide-react';
import { StudentJobItem, useStudentJobsStore } from '@/store/useStudentJobsStore';

interface JobDetailHeroHeaderProps {
  job: StudentJobItem;
}

export function JobDetailHeroHeader({ job }: JobDetailHeroHeaderProps) {
  const { savedJobIds, toggleSaveJob } = useStudentJobsStore();
  const isSaved = savedJobIds.includes(job.id);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${job.title} at ${job.company.name}`,
          text: `Check out this campus placement drive for ${job.title} at ${job.company.name} on CampusHire!`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Company Brand Logo
  const renderCompanyBrandLogo = () => {
    const name = job.company.name.toLowerCase();

    if (name.includes('google')) {
      return (
        <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-white border border-slate-200/90 p-2.5 flex items-center justify-center shrink-0 shadow-xs">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
        </div>
      );
    }

    if (name.includes('microsoft')) {
      return (
        <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-white border border-slate-200/90 p-3 flex items-center justify-center shrink-0 shadow-xs">
          <div className="grid grid-cols-2 gap-1.5 w-8 h-8">
            <div className="bg-[#F25022] rounded-xs" />
            <div className="bg-[#7FBA00] rounded-xs" />
            <div className="bg-[#00A4EF] rounded-xs" />
            <div className="bg-[#FFB900] rounded-xs" />
          </div>
        </div>
      );
    }

    if (name.includes('amazon')) {
      return (
        <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-white border border-slate-200/90 p-2.5 flex items-center justify-center shrink-0 shadow-xs text-black font-black text-2xl font-serif">
          a
        </div>
      );
    }

    return (
      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-tr from-[#0A2540] to-blue-600 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-xs">
        {job.company.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/student/jobs"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-600 hover:text-blue-600 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Jobs</span>
        </Link>
      </div>

      {/* Main Hero Card Container */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
        
        {/* Ambient Glow */}
        <div className="absolute -top-12 -left-12 w-56 h-56 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left / Info Column (7-8 cols on Desktop) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            
            {/* Top Row: Company Logo + Verified Name + Actions */}
            <div className="flex items-start justify-between gap-2.5 sm:gap-4">
              <div className="flex items-start gap-2.5 sm:gap-4 min-w-0 flex-1">
                {renderCompanyBrandLogo()}

                <div className="space-y-1 min-w-0 flex-1">
                  {/* Company Name & Verified Badge in a clean single line */}
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <h2 className="text-xs sm:text-base font-extrabold text-slate-800 font-heading truncate shrink-0 max-w-[140px] xs:max-w-none">
                      {job.company.name}
                    </h2>
                    <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9.5px] sm:text-[10px] font-extrabold border border-emerald-200 shrink-0 whitespace-nowrap">
                      <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Verified<span className="hidden sm:inline"> Company</span></span>
                    </span>
                  </div>

                  <h1 className="text-lg sm:text-2xl lg:text-3xl font-black text-[#0A2540] font-heading tracking-tight leading-snug sm:leading-tight">
                    {job.title}
                  </h1>

                  <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 font-medium line-clamp-1 sm:line-clamp-none">
                    Build for everyone. Create technology that changes the world.
                  </p>
                </div>
              </div>

              {/* Bookmark & Share Actions */}
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 pl-1">
                <button
                  type="button"
                  onClick={() => toggleSaveJob(job.id)}
                  className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer ${
                    isSaved
                      ? 'border-blue-200 bg-blue-50 text-blue-600'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-blue-600'
                  }`}
                  title={isSaved ? 'Saved' : 'Save Job'}
                >
                  <Bookmark className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="p-1.5 sm:p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-blue-600 transition-all cursor-pointer relative"
                  title="Share Job"
                >
                  {copied ? (
                    <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  )}
                  {copied && (
                    <span className="absolute -bottom-7 right-0 text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded shadow">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Middle Row: Quick Metadata Pills with clean wrapping */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-slate-100/90 text-slate-700 text-[11px] sm:text-xs font-bold border border-slate-200/60">
                <Briefcase className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500 shrink-0" />
                <span>{job.type === 'FULL_TIME' ? 'Full Time' : job.type === 'INTERNSHIP' ? 'Internship' : 'Intern + FTE'}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-slate-100/90 text-slate-700 text-[11px] sm:text-xs font-bold border border-slate-200/60">
                <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500 shrink-0" />
                <span>{job.location} (Hybrid)</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-blue-50 text-blue-700 text-[11px] sm:text-xs font-extrabold border border-blue-200/80">
                <span>💰</span>
                <span>{job.salaryPackage}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-purple-50 text-purple-700 text-[11px] sm:text-xs font-bold border border-purple-200/80">
                <Calendar className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-600 shrink-0" />
                <span>Eligible: {job.eligibleBatches.join(', ') || '2026, 2027'}</span>
              </div>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5 sm:pt-1">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-slate-50 text-slate-700 text-[11px] sm:text-xs font-semibold border border-slate-200/80"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>

          {/* Right / Company Campus Showcase Banner (4-5 cols on Desktop, stacked on Mobile) */}
          <div className="lg:col-span-5 xl:col-span-4 relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900 aspect-16/9 sm:aspect-21/9 lg:aspect-4/3 shadow-xs group">
            {/* Headquarters Glass/Modern Architecture Image Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-950 via-slate-900 to-indigo-950">
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
              
              {/* Graphic modern building facade representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full p-6 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold tracking-widest text-sky-400 uppercase">
                      {job.company.name} Campus
                    </span>
                    <Building2 className="w-6 h-6 text-sky-400/80" />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-lg sm:text-xl font-black font-heading text-white tracking-wide">
                      Innovation Hub
                    </p>
                    <p className="text-xs text-slate-300 font-medium">
                      World-class engineering infrastructure & research labs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Glass Badge matching mockup: "#3 in World's Best Places to Work" */}
            <div className="absolute bottom-3 right-3 left-3 sm:left-auto bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/80 shadow-md flex items-center justify-center sm:justify-start gap-2 text-xs font-extrabold text-[#0A2540]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>#3 in World&apos;s Best Places to Work</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
