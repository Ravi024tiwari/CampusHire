'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BarChart3, ShieldCheck } from 'lucide-react';

interface AdminHeroBannerProps {
  adminName?: string;
}

export function AdminHeroBanner({ adminName = 'Admin' }: AdminHeroBannerProps) {
  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#F0FDF9] via-[#F3F9FD] to-[#EBF6FE] border border-slate-200/80 shadow-xs p-5 sm:p-7 lg:p-9 transition-all duration-300 hover:shadow-sm">
      
      {/* ========================================================================= */}
      {/* 1. SEAMLESS BACKGROUND INTEGRATED IMAGE LAYER (Interactive Across Devices) */}
      {/* ========================================================================= */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Responsive background student graphic positioned towards center-right */}
        <div className="absolute top-0 right-0 w-full sm:w-2/3 lg:w-1/2 h-full opacity-30 sm:opacity-40 lg:opacity-55 mix-blend-multiply transition-opacity duration-700">
          <Image
            src="/images/admin/admin_hero_students.jpg"
            alt="Campus Hiring Background"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
            className="object-cover object-center lg:object-right-center"
          />
        </div>

        {/* Soft Radial & Linear Gradient Mask overlays to blend the image seamlessly into the base */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F0FDF9] via-[#F0FDF9]/95 sm:via-[#F0FDF9]/85 to-transparent w-full sm:w-3/4 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#EBF6FE]/90 sm:from-[#EBF6FE]/50 via-transparent to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F0FDF9]/80 sm:from-[#F0FDF9]/40 via-transparent to-transparent z-[1]" />
        
        {/* Ambient Decorative Mesh Glows */}
        <div className="absolute -top-10 -left-10 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-teal-300/20 blur-2xl sm:blur-3xl" />
        <div className="absolute -bottom-10 right-1/4 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-sky-300/20 blur-2xl sm:blur-3xl" />
      </div>

      {/* ========================================================================= */}
      {/* 2. FLOATING CONTENT LAYER                                                 */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4 text-left animate-in fade-in slide-in-from-left-4 duration-700 fill-mode-forwards">
        
        {/* Welcome Tag Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-teal-200/90 text-teal-800 text-[10px] sm:text-[11px] font-black tracking-wider uppercase shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          <span>WELCOME BACK, {adminName.toUpperCase()}</span>
        </div>

        {/* Main Title Heading */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 font-heading tracking-tight leading-snug sm:leading-tight">
          A Stronger Tomorrow Through Campus Hiring
        </h1>

        {/* Subtext */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
          Connect students, colleges, and enterprise recruiters to build better careers and empower the next generation of leadership across India.
        </p>

        {/* Quick Action Navigation Buttons */}
        <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3">
          <Link
            href="/admin/colleges"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all duration-200 group"
          >
            <ShieldCheck className="w-4 h-4 text-teal-100" />
            <span>Manage Platform</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-100 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/admin/analytics"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 hover:bg-white active:scale-95 text-slate-700 hover:text-teal-800 border border-slate-200/90 font-bold text-xs shadow-2xs transition-all duration-200"
          >
            <BarChart3 className="w-4 h-4 text-slate-500" />
            <span>View Reports</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
