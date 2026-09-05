'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface MotivationBannerProps {
  variant?: 'compact' | 'full';
}

export function MotivationBanner({ variant = 'compact' }: MotivationBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-[#0A2540] p-5 sm:p-6 text-white shadow-md">
      {/* Glow Circles */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-blue-400/20 blur-xl pointer-events-none" />
      <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-indigo-300/15 blur-xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-4">
        
        {/* Text Content */}
        <div className="space-y-2 max-w-sm">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-xs text-[10px] font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Career Booster</span>
          </div>

          <h3 className="text-sm sm:text-base font-extrabold leading-snug font-heading">
            A better profile leads to bigger opportunities.
          </h3>

          <p className="text-xs text-blue-100/90 font-medium flex items-center gap-1.5">
            <span>Keep your projects and skills fresh</span>
            <span className="text-sm">🇮🇳</span>
          </p>
        </div>

        {/* Stylized Student Avatar Graphic */}
        <div className="shrink-0 flex items-center justify-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            {/* SVG Illustration of student with laptop */}
            <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
              <circle cx="60" cy="60" r="50" fill="#3B82F6" opacity="0.3" />
              {/* Person Body */}
              <path d="M35 105 C35 85 45 75 60 75 C75 75 85 85 85 105 Z" fill="#1E40AF" />
              <path d="M48 78 L60 88 L72 78 Z" fill="#DBEAFE" />
              {/* Head */}
              <circle cx="60" cy="52" r="18" fill="#FBBF24" />
              {/* Hair */}
              <path d="M44 48 C44 32 76 32 76 48 C76 40 68 36 60 36 C52 36 44 40 44 48 Z" fill="#1E293B" />
              {/* Glasses / Face */}
              <circle cx="53" cy="52" r="4" fill="#1E293B" />
              <circle cx="67" cy="52" r="4" fill="#1E293B" />
              <path d="M57 52 L63 52" stroke="#1E293B" strokeWidth="2" />
              <path d="M55 60 Q60 64 65 60" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Laptop in Hands */}
              <rect x="40" y="85" width="40" height="20" rx="3" fill="#94A3B8" />
              <rect x="44" y="88" width="32" height="13" rx="2" fill="#38BDF8" />
              <circle cx="60" cy="94" r="2" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
