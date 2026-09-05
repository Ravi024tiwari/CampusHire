'use client';

import React from 'react';
import { Target, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function AppliedJobsHeroHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Left: Heading & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
          Applied Jobs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Track your applications and stay updated
        </p>
      </div>

      {/* Right: Motivational Target Banner (Matches Mockup) */}
      <Card className="hidden md:flex items-center gap-3.5 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-sky-50/90 border-blue-200/70 py-2.5 px-4 shadow-2xs">
        <div className="text-right">
          <p className="text-xs font-black text-[#0A2540] leading-tight font-heading">
            &ldquo;Every application is a step<br />
            towards your dream career.&rdquo;
          </p>
          <p className="text-[10px] font-bold text-slate-500 mt-0.5">
            🇮🇳 CampusHire
          </p>
        </div>

        {/* Illustrated Glowing Target Emblem */}
        <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25 ring-2 ring-blue-400/30">
          <Target className="w-5 h-5 animate-pulse" />
        </div>
      </Card>
    </div>
  );
}
