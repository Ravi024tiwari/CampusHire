'use client';

import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Briefcase, 
  Calendar, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Check, 
  Sparkles,
  ExternalLink,
  Award
} from 'lucide-react';
import { useStudentJobsStore } from '@/store/useStudentJobsStore';
import { AtsScoreCard } from '@/components/ats/AtsScoreCard';
import { AtsAnalysisResult } from '@/lib/ai/ats-pipeline';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

export function JobDetailAndApplyModal() {
  const {
    selectedJob,
    isDetailModalOpen,
    closeJobDetail,
    studentResumes,
    selectedResumeId,
    setSelectedResumeId,
    submitJobApplication,
    isApplying,
    applySuccessMessage,
    applyErrorMessage,
  } = useStudentJobsStore();

  const [atsScoreData, setAtsScoreData] = useState<AtsAnalysisResult | null>(null);
  const [isAtsLoading, setIsAtsLoading] = useState(false);
  const [isAtsCached, setIsAtsCached] = useState(false);
  const [atsError, setAtsError] = useState<string | null>(null);

  if (!isDetailModalOpen || !selectedJob) return null;

  const job = selectedJob;
  const isEligible = job.eligibility.isEligible;
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

  const handleApply = async () => {
    if (!isEligible || job.hasApplied) return;
    await submitJobApplication(job.id, selectedResumeId);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-5 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto [scrollbar-width:thin]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10.5px] font-extrabold border border-blue-200/60">
                On-Campus Placement Drive
              </span>
              <span className="text-xs font-bold text-slate-400">
                Deadline: {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#0A2540] font-heading mt-2 leading-tight">
              {job.title}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 flex items-center gap-1.5">
              <span>{job.company.name}</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-600 font-bold">{job.company.industry || 'Technology'}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={closeJobDetail}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 font-semibold block text-[10.5px]">Package / CTC</span>
            <span className="font-extrabold text-[#0A2540] text-sm">{job.salaryPackage}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[10.5px]">Location</span>
            <span className="font-extrabold text-[#0A2540]">{job.location}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[10.5px]">Job Type</span>
            <span className="font-extrabold text-[#0A2540]">{job.type === 'FULL_TIME' ? 'Full Time' : 'Internship'}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[10.5px]">Min CGPA</span>
            <span className="font-extrabold text-[#0A2540]">{job.minCgpa > 0 ? `${job.minCgpa} CGPA` : 'No Cutoff'}</span>
          </div>
        </div>

        {/* Eligibility Status Alert */}
        <div className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
          isEligible
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
            : 'bg-amber-50/80 border-amber-200 text-amber-900'
        }`}>
          <div className="shrink-0 mt-0.5">
            {isEligible ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            )}
          </div>
          <div className="text-xs space-y-0.5">
            <p className="font-extrabold">
              {isEligible ? 'You are eligible to apply for this campus drive!' : 'Eligibility Restriction'}
            </p>
            <p className="text-[11px] opacity-90 leading-relaxed">
              {job.eligibility.isAlreadyPlaced
                ? `Placement Policy: You have already accepted an offer from ${job.eligibility.placedCompany}.`
                : !job.eligibility.isCgpaEligible
                ? `Minimum required CGPA is ${job.minCgpa} (Your CGPA: ${job.eligibility.studentCgpa}).`
                : !job.eligibility.isBranchEligible
                ? `Allowed branches: ${job.allowedBranches.join(', ')} (Your branch: ${job.eligibility.studentBranch}).`
                : 'All academic and campus placement requirements verified.'}
            </p>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
            Job Description & Responsibilities
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Evaluated Skills */}
        {job.skills.length > 0 && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
              Required Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ATS Resume Fit Analyzer */}
        <AtsScoreCard
          scoreData={atsScoreData}
          isLoading={isAtsLoading}
          isCached={isAtsCached}
          onAnalyze={handleAnalyzeAts}
          error={atsError}
        />

        {/* Multi-Resume Selector Section */}
        {!job.hasApplied && (
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
                Select Resume for Application
              </h4>
              <span className="text-[11px] font-bold text-slate-400">
                {studentResumes.length} resume(s) available
              </span>
            </div>

            <div className="space-y-2">
              {studentResumes.map((resume) => {
                const isSelected = selectedResumeId === resume.id;

                return (
                  <label
                    key={resume.id}
                    onClick={() => setSelectedResumeId(resume.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/15'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#0A2540] truncate">
                          {resume.title}
                        </p>
                        <p className="text-[10px] font-medium text-slate-400">
                          {resume.isDefault ? 'Default Profile Resume' : 'Specialized Version'}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 pl-2">
                      <input
                        type="radio"
                        name="selectedResume"
                        checked={isSelected}
                        onChange={() => setSelectedResumeId(resume.id)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Status Messages */}
        {applySuccessMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{applySuccessMessage}</span>
          </div>
        )}

        {applyErrorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>{applyErrorMessage}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={closeJobDetail}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>

          {job.hasApplied ? (
            <span className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Already Applied</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleApply}
              disabled={!isEligible || isApplying}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                isEligible
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              {isApplying ? 'Submitting Application...' : 'Apply to Placement Drive'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
