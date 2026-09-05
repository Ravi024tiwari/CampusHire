'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronRight,
  FileText
} from 'lucide-react';
import { useStudentDashboardStore } from '@/store/useStudentDashboardStore';

export function ResumeAnalysisCard() {
  const { data } = useStudentDashboardStore();
  const resume = data?.resumeAnalysis || {
    score: 85,
    headline: 'Your resume is looking great!',
    checklist: [
      { label: 'Good structure', passed: true },
      { label: 'Relevant skills found', passed: true },
      { label: 'Add more projects', passed: false },
      { label: 'Include achievements', passed: true },
    ],
  };

  const score = resume.score;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between h-full">
      
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-100">
        <h2 className="text-base sm:text-lg font-black text-[#0A2540] font-heading flex items-center gap-2">
          <FileText className="w-4.5 h-4.5 text-blue-600" />
          <span>Resume Analysis</span>
        </h2>

        <Link
          href="/student/resume"
          className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
          title="View Resume details"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Center Body: Circular Score Meter + Checklist (Responsive Non-overlapping Grid/Flex) */}
      <div className="flex flex-row items-center gap-3.5 sm:gap-4.5">
        
        {/* Scalable Circular Progress Gauge */}
        <div className="relative w-20 h-20 sm:w-22 sm:h-22 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 70 70" className="w-full h-full transform -rotate-90">
            <circle
              cx="35"
              cy="35"
              r={radius}
              stroke="#E2E8F0"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="35"
              cy="35"
              r={radius}
              stroke="#10B981"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-lg sm:text-xl font-black text-[#0A2540] font-heading leading-none">
              {score}%
            </span>
          </div>
        </div>

        {/* Checklist Breakdown */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <p className="text-xs sm:text-[13px] font-extrabold text-[#0A2540] truncate">
            {resume.headline}
          </p>

          <div className="space-y-1">
            {resume.checklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs min-w-0">
                {item.passed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                )}
                <span className={`text-[11px] sm:text-[11.5px] font-semibold truncate ${item.passed ? 'text-slate-600' : 'text-slate-800 font-bold'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Action Button: Improve Resume with AI */}
      <div className="pt-1">
        <Link
          href="/student/resume"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-extrabold shadow-sm shadow-blue-600/25 transition-all cursor-pointer active:scale-98"
        >
          <Sparkles className="w-4 h-4 text-sky-200" />
          <span>Improve Resume with AI ✨</span>
        </Link>
      </div>

    </div>
  );
}
