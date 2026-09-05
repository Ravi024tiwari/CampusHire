'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { useStudentDashboardStore } from '@/store/useStudentDashboardStore';

export function StudentHeroBanner() {
  const { data } = useStudentDashboardStore();
  const studentName = data?.student?.name || 'Ravi Tiwari';

  // Dynamic greeting based on current local hour
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning,';
    if (hour < 17) return 'Good Afternoon,';
    return 'Good Evening,';
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#EBF3FF] via-[#F2EEFD] to-[#E8F8F5] border border-blue-200/60 p-4 sm:p-6 lg:p-7 shadow-xs transition-all duration-300">
      
      {/* Background Ambient Decorative Light Orbs */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none animate-float-delayed" />

      {/* Decorative Lavender Stems (SVG matching original mockup) */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-72 h-36 pointer-events-none opacity-30 hidden md:block">
        <svg viewBox="0 0 200 120" className="w-full h-full text-indigo-400/50" fill="currentColor">
          <path d="M70,120 Q60,60 50,40 Q55,55 70,120" />
          <path d="M50,40 Q40,35 42,45 Q46,45 50,40" />
          <path d="M55,55 Q45,50 48,60 Q52,60 55,55" />
          <path d="M130,120 Q140,60 150,40 Q145,55 130,120" />
          <path d="M150,40 Q160,35 158,45 Q154,45 150,40" />
          <path d="M145,55 Q155,50 152,60 Q148,60 145,55" />
        </svg>
      </div>

      {/* Main Horizontal Flex Row Layout (Maintains Same Left & Right Alignment on ALL Screens) */}
      <div className="relative z-10 flex flex-row items-center justify-between gap-3 sm:gap-6">
        
        {/* Left Side: Badge, Greeting, Name, Subtitle (Same horizontal alignment on Mobile & Desktop) */}
        <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0 pr-2">
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-600/10 text-blue-700 text-[10.5px] font-extrabold border border-blue-200/60 shadow-2xs">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>Campus Season 2026</span>
          </div>

          <div className="space-y-0.5">
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              {greeting}
            </p>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] font-heading tracking-tight flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span>{studentName}</span>
              <span className="inline-block animate-pulse">👋</span>
            </h1>
          </div>

          <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 font-medium leading-relaxed">
            Keep going! You&apos;re closer to your dream career.
          </p>
        </div>

        {/* Center / Right Side: Pure Transparent 3D Character (No White Box, Fully Fitted & Scaled) */}
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
            &ldquo;Discipline today,<br />
            a dream job tomorrow.&rdquo;
          </p>
          <div className="h-1 w-8 bg-emerald-500 rounded-full mt-1 ml-auto" />
        </div>

      </div>

    </div>
  );
}
