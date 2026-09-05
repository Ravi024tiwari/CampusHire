'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Building2, Users, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function BrowseJobsHeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#EBF3FF] via-[#F2EEFD] to-[#E8F8F5] border border-blue-200/60 p-4 sm:p-6 lg:p-7 shadow-xs transition-all duration-300">
      
      {/* Background Ambient Decorative Light Orbs */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Horizontal Flex Row Layout */}
      <div className="relative z-10 flex flex-row items-center justify-between gap-3 sm:gap-6">
        
        {/* Left Side: Title, Subtitle, Metric Chips */}
        <div className="space-y-2.5 sm:space-y-3 flex-1 min-w-0 pr-2">
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-600/10 text-blue-700 text-[10.5px] font-extrabold border border-blue-200/60 shadow-2xs">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>Campus Placement Drives 2026</span>
          </div>

          <div className="space-y-0.5">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
              Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Your Dream</span> Opportunity
            </h1>
            <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 font-medium leading-relaxed">
              Explore top companies, exciting roles and build your future.
            </p>
          </div>

          {/* 4 Metric Chips Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <span className="text-xs sm:text-sm font-black text-[#0A2540] font-heading">120+</span>
              <span className="text-[10.5px] font-semibold text-slate-500">Active Jobs</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <span className="text-xs sm:text-sm font-black text-blue-600 font-heading">50+</span>
              <span className="text-[10.5px] font-semibold text-slate-500">Recruiting Companies</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <span className="text-xs sm:text-sm font-black text-emerald-600 font-heading">1K+</span>
              <span className="text-[10.5px] font-semibold text-slate-500">Students Placed</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-orange-50 via-white to-green-50 border border-slate-200/80 shadow-2xs text-[10.5px] font-bold text-slate-700">
              <span>🇮🇳 Your skills. Our support.</span>
            </div>
          </div>

        </div>

        {/* Center / Right Side: Pure Transparent 3D Character */}
        <div className="shrink-0 flex items-center justify-center">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44">
            <Image
              src="/images/hero/student_avatar_transparent.png"
              alt="Student Mascot"
              fill
              priority
              sizes="(max-width: 640px) 100px, (max-width: 1024px) 140px, 180px"
              className="object-contain object-center drop-shadow-sm hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Right Side Quote (Desktop View 1024px+) */}
        <div className="hidden lg:flex flex-col items-end justify-center text-right space-y-1.5 max-w-xs shrink-0 pl-4 border-l border-slate-200/60">
          <p className="text-sm lg:text-[15px] font-extrabold text-[#0A2540] leading-snug tracking-tight">
            &ldquo;Opportunities<br />
            don&apos;t happen,<br />
            you create them.&rdquo;
          </p>
          <div className="h-1 w-8 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-full mt-1 ml-auto" />
        </div>

      </div>

    </div>
  );
}
