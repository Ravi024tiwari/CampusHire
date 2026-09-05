'use client';

import React from 'react';
import { 
  Building2, 
  Briefcase, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { CompanyInfo, CurrentRecruiter, RecruiterKpis } from '../_types/recruiter-dashboard.types';

interface RecruiterHeroBannerProps {
  company: CompanyInfo;
  currentRecruiter: CurrentRecruiter;
  kpis: RecruiterKpis;
}

export function RecruiterHeroBanner({
  company,
  currentRecruiter,
  kpis,
}: RecruiterHeroBannerProps) {
  const recruiterName = currentRecruiter.name || 'Rahul Sharma';
  const companyName = company.name || 'Google';
  const totalJobs = kpis.totalJobs ?? kpis.activeDrives ?? 12;
  const totalApps = kpis.totalApplications ?? kpis.totalApplicants ?? 1240;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50/95 via-indigo-50/70 to-sky-100/90 border border-blue-200/80 p-5 sm:p-7 lg:p-8 shadow-xs">
      
      {/* Background Decorative Corporate Office Illustration */}
      <div className="absolute right-0 top-0 bottom-0 w-2/5 pointer-events-none opacity-25 hidden md:block overflow-hidden">
        <svg
          viewBox="0 0 450 300"
          className="absolute right-0 bottom-0 w-full h-full text-blue-900"
          fill="currentColor"
        >
          {/* Stylized Modern Glass Corporate HQ Architecture */}
          <polygon points="180,60 320,30 380,80 240,110" opacity="0.35" />
          <polygon points="180,60 240,110 240,280 180,230" opacity="0.6" />
          <polygon points="240,110 380,80 380,250 240,280" opacity="0.45" />
          {/* Window Grids */}
          <line x1="200" y1="90" x2="200" y2="245" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
          <line x1="220" y1="100" x2="220" y2="265" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
          <line x1="280" y1="130" x2="280" y2="270" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
          <line x1="320" y1="115" x2="320" y2="260" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
          {/* Stylized Trees & Sun Rays */}
          <circle cx="120" cy="240" r="24" opacity="0.3" />
          <circle cx="150" cy="250" r="18" opacity="0.35" />
          <circle cx="410" cy="240" r="28" opacity="0.3" />
          <circle cx="420" cy="50" r="30" opacity="0.15" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Side: Welcome Greeting & Corporate Badge */}
        <div className="space-y-3.5 max-w-2xl">
          
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Welcome back,
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
              {recruiterName}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-600">
              Let&apos;s build amazing teams together.
            </p>
          </div>

          {/* Partner Badge & Active Metric Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            
            {/* Company Partner Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              {company.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={company.logoUrl}
                  alt={companyName}
                  className="w-4 h-4 object-contain rounded-xs"
                />
              ) : (
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[9px]">
                  {companyName.charAt(0)}
                </div>
              )}
              <span className="text-xs font-bold text-slate-900">
                {companyName}
              </span>
              <span className="text-[10.5px] font-medium text-slate-400">
                Recruiting Partner
              </span>
            </div>

            {/* Active Job Openings */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50/90 border border-blue-200/80 text-blue-800 text-xs font-bold">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>{totalJobs}+ Active Job Openings</span>
            </div>

            {/* Total Applications Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50/90 border border-indigo-200/80 text-indigo-800 text-xs font-bold">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>{totalApps.toLocaleString()} Total Applications</span>
            </div>

          </div>

        </div>

        {/* Right Side: Slogan & Indian Flag */}
        <div className="flex flex-col items-start lg:items-end justify-between w-full lg:w-auto gap-2 text-left lg:text-right pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200/60">
          
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-extrabold text-slate-800 flex items-center gap-1.5 justify-start lg:justify-end">
              <span>&ldquo;Great talent builds greater products.&rdquo;</span>
              <span className="text-base">🇮🇳</span>
            </p>
            <p className="text-[11px] font-semibold text-slate-500">
              Empowering top university placements
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
