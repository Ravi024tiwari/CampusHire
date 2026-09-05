'use client';

import React from 'react';
import { Sparkles, Flag, TrendingUp, Compass } from 'lucide-react';

export function MotivationalCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF8E7] via-[#FFF3D6] to-[#FFE8B8] border border-amber-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between group transition-all duration-300 min-h-[220px]">
      
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

      {/* Top Tag & Quote */}
      <div className="space-y-3 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-900 text-[10.5px] font-extrabold border border-amber-300/60 shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-amber-700" />
          <span>Daily Inspiration</span>
        </span>

        <h3 className="text-base sm:text-lg font-black text-amber-950 font-heading leading-snug">
          &ldquo;Small steps every day lead to big results.&rdquo;
        </h3>
      </div>

      {/* Vector Graphic: Mountain Sunset Summit Illustration */}
      <div className="relative z-10 pt-4 flex items-end justify-between">
        
        <div className="space-y-0.5">
          <p className="text-[11px] font-bold text-amber-800">
            Keep moving forward
          </p>
          <p className="text-[10px] font-medium text-amber-700/80">
            Every application brings you closer.
          </p>
        </div>

        {/* Stylized Mountain with Flag */}
        <div className="relative w-28 h-18 shrink-0 flex items-end justify-end">
          <svg viewBox="0 0 120 70" className="w-full h-full">
            {/* Sun */}
            <circle cx="85" cy="20" r="14" fill="#FBBF24" opacity="0.6" />
            
            {/* Rear Peak */}
            <polygon points="10,70 55,25 95,70" fill="#D97706" opacity="0.4" />
            
            {/* Front Peak */}
            <polygon points="35,70 85,15 120,70" fill="#B45309" opacity="0.8" />
            <polygon points="75,28 85,15 95,28" fill="#FDE68A" />
            
            {/* Flag on Summit */}
            <line x1="85" y1="15" x2="85" y2="4" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <polygon points="85,4 100,8 85,13" fill="#EF4444" />
          </svg>
        </div>

      </div>

    </div>
  );
}
