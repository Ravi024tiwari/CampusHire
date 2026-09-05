'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  Bookmark, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { StudentJobItem, useStudentJobsStore } from '@/store/useStudentJobsStore';
import { Card } from '@/components/ui/card';

interface BrowseJobCardProps {
  job: StudentJobItem;
  viewMode?: 'grid' | 'list';
}

export function BrowseJobCard({ job, viewMode = 'grid' }: BrowseJobCardProps) {
  const { savedJobIds, toggleSaveJob, openJobDetail } = useStudentJobsStore();
  const isSaved = savedJobIds.includes(job.id);

  // High-fidelity brand logos
  const renderCompanyBrandLogo = () => {
    const name = job.company.name.toLowerCase();

    if (name.includes('google')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200/80 p-2 flex items-center justify-center shrink-0 shadow-2xs">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
        </div>
      );
    }

    if (name.includes('microsoft')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200/80 p-2 flex items-center justify-center shrink-0 shadow-2xs">
          <div className="grid grid-cols-2 gap-1 w-6 h-6">
            <div className="bg-[#F25022] rounded-xs" />
            <div className="bg-[#7FBA00] rounded-xs" />
            <div className="bg-[#00A4EF] rounded-xs" />
            <div className="bg-[#FFB900] rounded-xs" />
          </div>
        </div>
      );
    }

    if (name.includes('amazon')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200/80 p-1.5 flex items-center justify-center shrink-0 shadow-2xs text-black font-black text-base">
          <span className="font-serif">a</span>
        </div>
      );
    }

    if (name.includes('tcs') || name.includes('tata')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-purple-800 to-indigo-900 border border-slate-200/80 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-2xs tracking-tighter">
          TCS
        </div>
      );
    }

    if (name.includes('infosys')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-[#007CC3] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
          Infy
        </div>
      );
    }

    if (name.includes('deloitte')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-[#86BC25] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
          D.
        </div>
      );
    }

    if (name.includes('zomato')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-[#CB202D] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
          Z
        </div>
      );
    }

    if (name.includes('swiggy')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-[#FC8019] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
          S
        </div>
      );
    }

    if (name.includes('phonepe')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-[#5f259f] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
          पे
        </div>
      );
    }

    if (name.includes('adobe')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-[#FF0000] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
          A
        </div>
      );
    }

    if (name.includes('accenture')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-[#A100FF] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
          &gt;
        </div>
      );
    }

    if (name.includes('flipkart')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-[#2874F0] text-[#FFE500] flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
          fk
        </div>
      );
    }

    return (
      <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-[#0A2540] to-blue-600 text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-2xs">
        {job.company.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <Card 
      onClick={() => openJobDetail(job)}
      className="flex flex-col justify-between p-4 sm:p-5 rounded-3xl border border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300 group cursor-pointer select-none"
    >
      
      {/* 1. Top Row: Company Logo + Name + Verified Badge + Bookmark Action */}
      <div>
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            {renderCompanyBrandLogo()}

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-xs sm:text-sm font-extrabold text-slate-700 truncate leading-tight font-heading">
                  {job.company.name}
                </p>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-md bg-emerald-50 text-emerald-700 text-[9.5px] font-black border border-emerald-200/80">
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveJob(job.id);
            }}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer shrink-0"
            title={isSaved ? 'Remove from bookmarks' : 'Save opportunity'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600 text-blue-600' : ''}`} />
          </button>
        </div>

        {/* 2. Middle Section: Job Title + Metadata + Skills */}
        <div className="mt-3.5 space-y-1.5">
          <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading leading-tight group-hover:text-blue-600 transition-colors">
            {job.title}
          </h3>

          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500 pt-0.5 flex-wrap">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>{job.type === 'FULL_TIME' ? 'Full Time' : job.type === 'INTERNSHIP' ? 'Internship' : 'Intern + FTE'}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{job.location}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="font-extrabold text-[#0A2540]">{job.salaryPackage}</span>
          </div>

          {/* Skill Tag Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {job.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-lg bg-slate-100/90 text-slate-700 text-[10.5px] font-semibold"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-1.5 py-0.5 rounded-lg bg-slate-50 text-slate-400 text-[10.5px] font-medium">
                +{job.skills.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Posted Time + Interactive Details Button */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-slate-400">
          {job.postedAgo}
        </span>

        {job.hasApplied ? (
          <Link
            href={`/student/jobs/${job.id}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Applied</span>
          </Link>
        ) : (
          <Link
            href={`/student/jobs/${job.id}`}
            onClick={(e) => e.stopPropagation()}
            className="py-2 px-3.5 rounded-xl border bg-[#2563EB] text-white border-[#2563EB] shadow-xs sm:bg-slate-50/80 sm:text-[#0A2540] sm:border-slate-200/90 sm:hover:bg-[#2563EB] sm:hover:text-white sm:hover:border-[#2563EB] sm:hover:shadow-md sm:hover:shadow-blue-500/25 text-xs font-extrabold transition-all duration-200 cursor-pointer text-center active:scale-95 flex items-center gap-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

    </Card>
  );
}
