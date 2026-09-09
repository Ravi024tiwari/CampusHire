'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Clock, 
  Award,
  Building2,
  Check
} from 'lucide-react';
import { StudentJobItem, useStudentJobsStore } from '@/store/useStudentJobsStore';
import { AtsScoreCard } from '@/components/ats/AtsScoreCard';
import { AtsAnalysisResult } from '@/lib/ai/ats-pipeline';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

interface JobDetailOverviewSectionProps {
  job: StudentJobItem;
}

export function JobDetailOverviewSection({ job }: JobDetailOverviewSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [atsScoreData, setAtsScoreData] = useState<AtsAnalysisResult | null>(null);
  const [isAtsLoading, setIsAtsLoading] = useState(false);
  const [isAtsCached, setIsAtsCached] = useState(false);
  const [atsError, setAtsError] = useState<string | null>(null);

  const { studentResumes, selectedResumeId } = useStudentJobsStore();
  const selectedResume = studentResumes.find((r) => r.id === selectedResumeId) || studentResumes[0];

  const handleAnalyzeAts = async (forceRefresh: boolean = false) => {
    if (!job) return;
    setIsAtsLoading(true);
    setAtsError(null);

    try {
      const res = await apiClient.post<ApiResponse<{ score: AtsAnalysisResult; fromCache: boolean }>>(
        `/api/student/jobs/${job.id}/ats-score`,
        {
          resumeUrl: selectedResume?.fileUrl,
          forceRefresh,
        }
      );

      if (res.data.success && res.data.data) {
        setAtsScoreData(res.data.data.score);
        setIsAtsCached(Boolean(res.data.data.fromCache));
      } else {
        setAtsError(res.data.message || 'Failed to analyze resume fit.');
      }
    } catch (err: any) {
      setAtsError(err.response?.data?.message || err.message || 'Failed to analyze resume fit.');
    } finally {
      setIsAtsLoading(false);
    }
  };

  // Responsibilities
  const responsibilities = [
    'Design, develop, and maintain high-throughput, low-latency microservices and full-stack applications.',
    'Collaborate with product managers, UX designers, and cross-functional teams to ship impactful user-facing features.',
    'Write clean, efficient, robust, and well-tested code following industry best practices and design patterns.',
    'Participate in peer code reviews, architectural discussions, and technical sprint plannings.',
    'Identify performance bottlenecks, optimize system architecture, and ensure 99.99% service reliability.',
    'Solve complex algorithmic challenges and contribute to foundational developer tooling and CI/CD pipelines.',
  ];

  // Format date
  const deadlineDate = new Date(job.deadline);
  const formattedDeadline = isNaN(deadlineDate.getTime())
    ? 'Sep 30, 2026 (11:59 PM)'
    : deadlineDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) + ' (11:59 PM)';

  const postedDate = new Date(job.createdAt);
  const formattedPosted = isNaN(postedDate.getTime())
    ? 'Aug 20, 2026'
    : postedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

  return (
    <div className="space-y-6">
      
      {/* 0. ATS Resume Fit & Skill Matcher */}
      <div id="section-overview" className="scroll-mt-28">
        <AtsScoreCard
          scoreData={atsScoreData}
          isLoading={isAtsLoading}
          isCached={isAtsCached}
          onAnalyze={handleAnalyzeAts}
          error={atsError}
        />
      </div>

      {/* 1. Job Description & Skills Section Wrapper */}
      <div id="section-job-description" className="scroll-mt-28 space-y-6">
        
        {/* 1a. About the Role */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-blue-600">
            <FileText className="w-5 h-5" />
            <h3 className="text-base font-black text-[#0A2540] font-heading">
              About the Role
            </h3>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
            <p>
              As a <span className="font-extrabold text-[#0A2540]">{job.title}</span> at <span className="font-extrabold text-[#0A2540]">{job.company.name}</span>, you will work on scalable systems, solve complex real-world engineering problems, and build mission-critical products that impact millions of users across India and globally.
            </p>
            <p className={`${!isExpanded ? 'line-clamp-2 sm:line-clamp-none' : ''}`}>
              {job.description || 'You will collaborate with world-class engineers, architects, and product visionaries to deliver high-performance cloud architectures, intuitive user interfaces, and resilient distributed platforms.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="sm:hidden text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            {isExpanded ? 'Show Less' : 'Read More...'}
          </button>
        </div>

        {/* 1b. Key Responsibilities */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-3.5">
          <div className="flex items-center gap-2 text-blue-600">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-base font-black text-[#0A2540] font-heading">
              Key Responsibilities
            </h3>
          </div>

          <ul className="space-y-2.5">
            {responsibilities.map((resp, idx) => (
              <li key={`resp-${idx}`} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-normal">
                <div className="h-4.5 w-4.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 1c. Required Skills */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-3.5">
          <div className="flex items-center gap-2 text-blue-600">
            <Code2 className="w-5 h-5" />
            <h3 className="text-base font-black text-[#0A2540] font-heading">
              Required Skills
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <div
                key={skill}
                className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-bold shadow-2xs hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
              >
                {skill}
              </div>
            ))}
            {/* Extended supplementary skill tags */}
            {['System Design', 'Git & GitHub', 'REST APIs', 'Problem Solving'].filter((s) => !job.skills.includes(s)).map((supp) => (
              <div
                key={supp}
                className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-bold shadow-2xs hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
              >
                {supp}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 2. Eligibility & Drive Specs Section */}
      <div id="section-eligibility" className="scroll-mt-28 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card A: Job Details */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <Briefcase className="w-5 h-5" />
              <h3 className="text-base font-black text-[#0A2540] font-heading">
                Job Details
              </h3>
            </div>

            <div className="space-y-3 divide-y divide-slate-100 text-xs sm:text-sm">
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-medium">Job Type</span>
                <span className="font-extrabold text-[#0A2540]">{job.type === 'FULL_TIME' ? 'Full Time' : job.type === 'INTERNSHIP' ? 'Internship' : 'Intern + FTE'}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-medium">Location</span>
                <span className="font-extrabold text-[#0A2540]">{job.location} (Hybrid)</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-medium">Salary Package</span>
                <span className="font-extrabold text-blue-600">{job.salaryPackage}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-medium">Application Deadline</span>
                <span className="font-extrabold text-[#0A2540]">{formattedDeadline}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-medium">Job Status</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active</span>
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-medium">Posted On</span>
                <span className="font-extrabold text-slate-700">{formattedPosted}</span>
              </div>

            </div>
          </div>

          {/* Card B: Eligibility Criteria */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <GraduationCap className="w-5 h-5" />
              <h3 className="text-base font-black text-[#0A2540] font-heading">
                Eligibility Criteria
              </h3>
            </div>

            <div className="space-y-3 divide-y divide-slate-100 text-xs sm:text-sm">
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-medium">Minimum CGPA</span>
                <span className="inline-flex items-center gap-1 font-extrabold text-[#0A2540]">
                  <span>{job.minCgpa || 7.5}+</span>
                  <span className="text-[10px] text-slate-400">/ 10</span>
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-medium">Eligible Branches</span>
                <div className="flex items-center gap-1 flex-wrap justify-end">
                  {(job.allowedBranches.length > 0 ? job.allowedBranches : ['CSE', 'IT', 'ECE', 'EE', 'Others']).map((br) => (
                    <span key={br} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {br}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-medium">Eligible Batches</span>
                <span className="font-extrabold text-[#0A2540]">{job.eligibleBatches.join(', ') || '2026, 2027'}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-medium">Employment Type</span>
                <span className="font-extrabold text-[#0A2540]">Full Time</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-medium">Work Mode</span>
                <span className="font-extrabold text-[#0A2540]">Hybrid (3 days office)</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 font-medium">College Drive</span>
                <span className="font-extrabold text-emerald-600">Your College Approved</span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
