'use client';

import React from 'react';
import { Lightbulb, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export function ResumeTipsSection() {
  const tips = [
    {
      title: 'Target Specific Drive Requirements',
      desc: 'Keep distinct resumes for Web Development, Data/AI, and Core Software roles so recruiters see your relevant projects instantly.',
    },
    {
      title: 'Quantify Your Impact & Metrics',
      desc: 'Use bullet points with real numbers (e.g. "Optimized API queries by 35%", "Served 5,000+ daily active users").',
    },
    {
      title: 'Active GitHub & Live Project Demos',
      desc: 'Ensure all links to GitHub repositories, live demo URLs, and LinkedIn profiles in your PDF are functional and public.',
    },
    {
      title: '1-Page Format for Campus Drives',
      desc: 'Top recruiters and campus placecoms prefer clean single-page PDF resumes with standard margins and legible fonts.',
    },
  ];

  return (
    <div className="rounded-3xl bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-100/90 p-5 sm:p-6 shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-blue-100/80">
        <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
            Placement Resume Guidelines & Best Practices
          </h3>
          <p className="text-xs text-slate-500">
            Follow standard campus hiring conventions to maximize shortlist rates
          </p>
        </div>
      </div>

      {/* Grid of Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/70 shadow-2xs space-y-1.5"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <h4 className="text-xs font-bold text-slate-800">
                {tip.title}
              </h4>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed pl-6">
              {tip.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
