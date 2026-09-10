'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  ArrowRight, 
  Bookmark, 
  Share2, 
  Users, 
  Calendar, 
  Tag, 
  Lightbulb, 
  CheckCircle2, 
  Sparkles,
  Building2,
  Check
} from 'lucide-react';
import { StudentJobItem, useStudentJobsStore } from '@/store/useStudentJobsStore';
import { Button } from '@/components/ui/button';

interface JobDetailRightSidebarProps {
  job: StudentJobItem;
  onApplyClick: () => void;
}

export function JobDetailRightSidebar({ job, onApplyClick }: JobDetailRightSidebarProps) {
  const { savedJobIds, toggleSaveJob, getSimilarJobs } = useStudentJobsStore();
  const isSaved = savedJobIds.includes(job.id);
  const similarJobs = getSimilarJobs(job.id, 3);
  const [copied, setCopied] = useState(false);

  // Format deadline and compute remaining days
  const deadlineDate = new Date(job.deadline);
  const formattedDeadline = isNaN(deadlineDate.getTime())
    ? 'Sep 30, 2026'
    : deadlineDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

  const now = new Date();
  const diffTime = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const daysLeftLabel = diffDays > 0 ? `${diffDays} days left` : 'Deadline passed';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${job.title} at ${job.company.name}`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 sticky top-20">
      
      {/* 1. Main Application Action Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-5">
        
        {/* Deadline Header Box */}
        <div className="flex items-center justify-between gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-xl bg-red-50 text-red-600 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                Application Deadline
              </p>
              <p className="text-xs sm:text-sm font-extrabold text-[#0A2540] truncate">
                {formattedDeadline}
              </p>
            </div>
          </div>

          <span className="shrink-0 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[11px] font-extrabold border border-red-100 animate-pulse">
            {daysLeftLabel}
          </span>
        </div>

        {/* Primary Action Button: Apply Now */}
        {job.hasApplied ? (
          <button
            type="button"
            disabled
            className="w-full p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-2 text-emerald-700 text-sm font-extrabold cursor-not-allowed select-none opacity-90 shadow-none"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Already Applied for this Drive</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onApplyClick}
            className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-98"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* Secondary Action: Save Job */}
        <button
          type="button"
          onClick={() => toggleSaveJob(job.id)}
          className={`w-full py-2.5 px-4 rounded-2xl border text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isSaved
              ? 'border-blue-200 bg-blue-50 text-blue-700'
              : 'border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-600 text-blue-600' : 'text-slate-500'}`} />
          <span>{isSaved ? 'Saved to Bookmarks' : 'Save Job'}</span>
        </button>

        {/* Telemetry Stats List */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600 font-semibold">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span>12,543 students applied</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{job.postedAgo || 'Posted 10 days ago'}</span>
          </div>

          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400" />
            <span className="font-mono text-[11px] text-slate-500">ID: {job.id.substring(0, 16)}</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer w-full text-left"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Share2 className="w-4 h-4 text-slate-400" />
            )}
            <span>{copied ? 'Link copied to clipboard!' : 'Share this job'}</span>
          </button>
        </div>

        {/* Tip Card (Light Green matching mockup) */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-2.5 text-xs text-emerald-900 leading-relaxed">
          <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            <span className="font-black text-emerald-950">Tip:</span> Make sure your resume highlights relevant skills and projects to improve your chances of selection.
          </p>
        </div>

      </div>

      {/* 2. Similar Jobs Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-black text-[#0A2540] font-heading">
            Similar Jobs
          </h3>
          <Link
            href="/student/jobs"
            className="text-[11px] font-extrabold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            View All
          </Link>
        </div>

        <div className="space-y-3">
          {similarJobs.map((simJob) => (
            <Link
              key={simJob.id}
              href={`/student/jobs/${simJob.id}`}
              className="flex items-start justify-between p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50/70 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#0A2540] to-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  {simJob.company.name.charAt(0)}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-extrabold text-[#0A2540] group-hover:text-blue-600 transition-colors truncate">
                    {simJob.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-slate-500 truncate">
                    {simJob.company.name}
                  </p>
                  <p className="text-[10.5px] font-extrabold text-blue-600">
                    {simJob.salaryPackage} • <span className="text-slate-400 font-normal">{simJob.location}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
