'use client';

import React, { useEffect } from 'react';
import { useStudentResumeStore } from '@/store/useStudentResumeStore';
import { ResumeHeaderBanner } from './_components/ResumeHeaderBanner';
import { ResumeUploadZone } from './_components/ResumeUploadZone';
import { ResumeCardGrid } from './_components/ResumeCardGrid';
import { ResumeTipsSection } from './_components/ResumeTipsSection';
import { ResumePreviewModal } from './_components/ResumePreviewModal';
import { RenameResumeModal } from './_components/RenameResumeModal';
import { DeleteResumeModal } from './_components/DeleteResumeModal';

export default function StudentResumePage() {
  const { fetchResumes } = useStudentResumeStore();

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <ResumeHeaderBanner />

      {/* 2. Main Operational Layout (Upload Zone + Active Resumes Grid) */}
      <div className="space-y-6">
        
        {/* Upload New Resume Version Section */}
        <ResumeUploadZone />

        {/* Active Resume Versions List / Cards Grid */}
        <ResumeCardGrid />

        {/* Placement Resume Guidelines & Best Practices */}
        <ResumeTipsSection />

      </div>

      {/* 3. Footer Emblem */}
      <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-bold text-slate-700">
            Multiple Resume Versions Ready for Campus Drives
          </p>
        </div>

        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <span>LEARN • APPLY • GROW</span>
          <span>🇮🇳</span>
          <span className="hidden md:inline text-slate-400">| Empowering India&apos;s Next Generation</span>
        </p>
      </div>

      {/* 4. Interactive Modals */}
      <ResumePreviewModal />
      <RenameResumeModal />
      <DeleteResumeModal />

    </div>
  );
}
