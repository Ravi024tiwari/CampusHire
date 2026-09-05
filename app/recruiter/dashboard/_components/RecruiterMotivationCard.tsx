'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export function RecruiterMotivationCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-200/80 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Content */}
      <div className="space-y-1 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>Campus Talent Partner</span>
        </div>
        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading">
          Hire Talent. Build Tomorrow.
        </h4>
        <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5 justify-center sm:justify-start">
          <span>Connect with the brightest minds from top campuses across India</span>
          <span className="text-sm">🇮🇳</span>
        </p>
      </div>

      {/* SVG Character Graphic */}
      <div className="shrink-0">
        <svg viewBox="0 0 100 80" className="w-20 h-16 drop-shadow-xs">
          <circle cx="50" cy="40" r="35" fill="#10B981" opacity="0.2" />
          <path d="M30 70 C30 52 40 45 50 45 C60 45 70 52 70 70 Z" fill="#047857" />
          <circle cx="50" cy="30" r="14" fill="#FBBF24" />
          <path d="M38 26 C38 15 62 15 62 26 Z" fill="#1E293B" />
          <rect x="35" y="55" width="30" height="15" rx="3" fill="#3B82F6" />
        </svg>
      </div>

    </div>
  );
}
