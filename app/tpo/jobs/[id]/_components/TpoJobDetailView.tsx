'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CompanyBrandLogo } from '../../_components/TpoJobCard';
import { StudentAvatar } from '@/app/tpo/analytics/_components/TpoHighestPlacedSpotlight';
import { 
  ChevronRight, 
  ChevronLeft,
  Building2, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  Award, 
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Download,
  Share2,
  FileText,
  Search,
  Check,
  RefreshCw,
  Eye,
  Layers,
  ArrowUpRight,
  UserCheck,
  Loader2
} from 'lucide-react';

interface CandidateApplication {
  id: string;
  status: string;
  createdAt: string;
  resumeUrl?: string | null;
  student: {
    id: string;
    enrollmentNumber: string;
    branch: string;
    batchYear: number;
    cgpa: number;
    user: {
      id: string;
      name: string;
      email: string;
      avatarUrl?: string | null;
    };
  };
}

interface JobDetailData {
  job: {
    id: string;
    title: string;
    description: string;
    type: string;
    status: string;
    location: string;
    salaryPackage: string;
    skills: string[];
    minCgpa: number;
    allowedBranches: string[];
    eligibleBatches: number[];
    deadline: string;
    createdAt: string;
    updatedAt: string;
    company: {
      id: string;
      name: string;
      logoUrl?: string | null;
      website?: string | null;
      industry?: string | null;
      location?: string | null;
      description?: string | null;
      isVerified?: boolean;
    };
    applications: CandidateApplication[];
    _count: {
      applications: number;
      offers: number;
    };
  };
  pipelineBreakdown: Record<string, number>;
}

interface TpoJobDetailViewProps {
  jobId: string;
}

export function TpoJobDetailView({ jobId }: TpoJobDetailViewProps) {
  const router = useRouter();
  const [data, setData] = useState<JobDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  
  // Tabs & Candidate Search
  const [activeTab, setActiveTab] = useState<'overview' | 'candidates' | 'company'>('overview');
  const [applicantFilterStage, setApplicantFilterStage] = useState<string>('ALL');
  const [applicantSearch, setApplicantSearch] = useState<string>('');

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const fetchJobDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/tpo/jobs/${jobId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to load job details');
      }

      setData(json.data);
    } catch (err: any) {
      console.error('[GET_TPO_JOB_DETAIL_CLIENT_ERROR]', err);
      setError(err.message || 'Error loading job details');
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchJobDetail();
  }, [fetchJobDetail]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      setIsUpdatingStatus(true);
      const res = await fetch(`/api/tpo/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to update job status');
      }

      showToast(`Placement drive status updated to ${newStatus}`);
      fetchJobDetail();
    } catch (err: any) {
      showToast(err.message || 'Failed to update status', 'error');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast('Placement drive link copied to clipboard!');
    }
  };

  const handleExportApplicants = () => {
    if (!data?.job?.applications || data.job.applications.length === 0) {
      showToast('No candidate applications to export', 'info');
      return;
    }

    const headers = [
      'Application ID',
      'Student Name',
      'Email',
      'Enrollment Number',
      'Branch',
      'Batch',
      'CGPA',
      'Status',
      'Applied Date',
      'Resume URL',
    ];

    const rows = data.job.applications.map((app) => [
      `"${app.id}"`,
      `"${app.student.user.name.replace(/"/g, '""')}"`,
      `"${app.student.user.email}"`,
      `"${app.student.enrollmentNumber}"`,
      `"${app.student.branch}"`,
      `"${app.student.batchYear}"`,
      `"${app.student.cgpa}"`,
      `"${app.status}"`,
      `"${new Date(app.createdAt).toLocaleDateString()}"`,
      `"${app.resumeUrl || ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${data.job.title}_${data.job.company.name}_Applicants.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Applicants roster exported successfully');
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4 shadow-2xs">
          <Loader2 className="h-7 w-7 animate-spin text-[#2563EB]" />
        </div>
        <h3 className="text-xl font-bold text-[#0A2540] font-heading tracking-tight">
          Loading Placement Drive Dossier...
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm font-medium">
          Fetching drive compensation, eligibility requirements, student applicant pipeline, and company profile.
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-4xl mx-auto space-y-4">
        <Link
          href="/tpo/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#2563EB] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Job Opportunities</span>
        </Link>

        <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6 sm:p-10 text-center space-y-3 shadow-2xs">
          <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
          <h3 className="text-lg font-bold text-rose-900 font-heading">Job Opportunity Not Found</h3>
          <p className="text-xs text-rose-700 max-w-md mx-auto font-medium">{error || 'Unable to retrieve placement drive dossier.'}</p>
          <button
            onClick={() => fetchJobDetail()}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors shadow-2xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Loading</span>
          </button>
        </div>
      </div>
    );
  }

  const { job, pipelineBreakdown } = data;
  const now = new Date();
  const deadlineDate = new Date(job.deadline);
  const diffTime = deadlineDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const hasExpired = diffTime < 0;

  // Filtered applicants
  const filteredApplicants = (job.applications || []).filter((app) => {
    const matchStage = applicantFilterStage === 'ALL' || app.status === applicantFilterStage;
    const matchSearch =
      !applicantSearch.trim() ||
      app.student.user.name.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.student.enrollmentNumber.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.student.branch.toLowerCase().includes(applicantSearch.toLowerCase());
    return matchStage && matchSearch;
  });

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-7 transition-all duration-300 ease-in-out pb-20 md:pb-14">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md text-xs sm:text-sm font-semibold ${
              toastMessage.type === 'success'
                ? 'bg-emerald-900/90 text-white border-emerald-500/30'
                : toastMessage.type === 'error'
                ? 'bg-rose-900/90 text-white border-rose-500/30'
                : 'bg-slate-900/90 text-white border-slate-700'
            }`}
          >
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
            {toastMessage.type === 'info' && <AlertCircle className="w-4 h-4 text-blue-400" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* 1. Header with Breadcrumbs & Action Buttons */}
      <div className="space-y-3.5">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-slate-500">
          <Link href="/tpo/dashboard" className="hover:text-[#2563EB] transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/tpo/jobs" className="hover:text-[#2563EB] transition-colors">
            Job Opportunities
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0A2540] font-bold truncate max-w-[200px] sm:max-w-xs">
            {job.title}
          </span>
        </nav>

        {/* Hero Card Container */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 lg:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            {/* Left Info */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0">
              <CompanyBrandLogo name={job.company.name} logoUrl={job.company.logoUrl} size="lg" />
              
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
                    {job.title}
                  </h1>

                  {/* Status Badges */}
                  {job.status === 'ACTIVE' && !hasExpired && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 inline-flex items-center gap-1.5 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active Drive
                    </span>
                  )}
                  {job.status === 'ACTIVE' && hasExpired && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 shadow-2xs">
                      Deadline Passed
                    </span>
                  )}
                  {job.status === 'PENDING_APPROVAL' && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200/80 shadow-2xs">
                      Pending TPO Approval
                    </span>
                  )}
                  {job.status === 'CLOSED' && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 shadow-2xs">
                      Closed Drive
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-500 flex-wrap pt-0.5">
                  <span className="text-slate-700 font-bold">{job.company.name}</span>
                  {job.company.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-md text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Partner
                    </span>
                  )}
                  {job.company.website && (
                    <a
                      href={job.company.website.startsWith('http') ? job.company.website : `https://${job.company.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#2563EB] hover:underline inline-flex items-center gap-1"
                    >
                      <span>{job.company.website.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Governance Actions */}
            <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
              <button
                onClick={handleShare}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition-all active:scale-95 inline-flex items-center gap-1.5"
                title="Share Placement Drive"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>

              <button
                onClick={handleExportApplicants}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition-all active:scale-95 inline-flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export Applicants</span>
              </button>

              {/* Status Toggle Action */}
              {job.status !== 'ACTIVE' ? (
                <button
                  onClick={() => handleStatusChange('ACTIVE')}
                  disabled={isUpdatingStatus}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95 disabled:opacity-50 inline-flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve & Activate</span>
                </button>
              ) : (
                <button
                  onClick={() => handleStatusChange('CLOSED')}
                  disabled={isUpdatingStatus}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all active:scale-95 disabled:opacity-50"
                >
                  Close Drive
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Stats & KPI Metrics (Consistent 4 Grid Dimension) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* 1. Compensation Package */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-all">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border bg-emerald-50 text-emerald-600 border-emerald-100">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-base sm:text-xl font-black text-emerald-600 font-heading block leading-tight truncate">
              {job.salaryPackage || 'Disclosed'}
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 block truncate mt-0.5">
              Package / CTC
            </span>
          </div>
        </div>

        {/* 2. Employment Type */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-all">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border bg-blue-50 text-[#2563EB] border-blue-100">
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-base sm:text-xl font-black text-[#0A2540] font-heading block leading-tight truncate">
              {job.type.replace(/_/g, ' ')}
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 block truncate mt-0.5">
              Employment Type
            </span>
          </div>
        </div>

        {/* 3. Min CGPA Cutoff */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-all">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border bg-purple-50 text-purple-600 border-purple-100">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-base sm:text-xl font-black text-[#0A2540] font-heading block leading-tight truncate">
              {job.minCgpa > 0 ? `${job.minCgpa} CGPA` : 'No Cutoff'}
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 block truncate mt-0.5">
              Min CGPA Cutoff
            </span>
          </div>
        </div>

        {/* 4. Total Applicants */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-all">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border bg-sky-50 text-sky-600 border-sky-100">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-base sm:text-xl font-black text-[#0A2540] font-heading block leading-tight truncate">
              {job._count?.applications || job.applications?.length || 0}
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 block truncate mt-0.5">
              Student Applicants
            </span>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs (Matching other detail pages) */}
      <div className="flex items-center gap-2 border-b border-slate-200/80">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold transition-all relative ${
            activeTab === 'overview' ? 'text-[#2563EB]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Drive Overview & Eligibility</span>
          {activeTab === 'overview' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('candidates')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold transition-all relative flex items-center gap-1.5 ${
            activeTab === 'candidates' ? 'text-[#2563EB]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Candidate Applicants</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-[#2563EB]">
            {job.applications?.length || 0}
          </span>
          {activeTab === 'candidates' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('company')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold transition-all relative ${
            activeTab === 'company' ? 'text-[#2563EB]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Company Profile</span>
          {activeTab === 'company' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
          )}
        </button>
      </div>

      {/* 4. Tab Panels */}
      <div className="transition-all duration-200">
        {/* TAB 1: OVERVIEW & ELIGIBILITY */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
            {/* Left Column (8 cols): Description & Skills */}
            <div className="lg:col-span-8 space-y-5">
              {/* Job Description */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-2xs space-y-3">
                <h2 className="text-sm sm:text-base font-bold text-[#0A2540] font-heading flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#2563EB]" />
                  Job Description & Scope
                </h2>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-sans pt-1">
                  {job.description || 'No detailed description provided by the recruiter.'}
                </div>
              </div>

              {/* Technical Skills Required */}
              {job.skills && job.skills.length > 0 && (
                <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-2xs space-y-3">
                  <h2 className="text-sm sm:text-base font-bold text-[#0A2540] font-heading flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#2563EB]" />
                    Key Competencies & Technical Skills
                  </h2>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/80 shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (4 cols): Eligibility & Application Pipeline */}
            <div className="lg:col-span-4 space-y-4">
              {/* Eligibility Rules */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-[#0A2540] font-heading flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                  Campus Eligibility Criteria
                </h3>

                <div className="space-y-3.5 text-xs">
                  {/* Allowed Branches */}
                  <div>
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                      Eligible Branches
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {job.allowedBranches && job.allowedBranches.length > 0 ? (
                        job.allowedBranches.map((b, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-200/80 font-bold text-[11px]"
                          >
                            {b}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-700 font-semibold">Open to All Branches</span>
                      )}
                    </div>
                  </div>

                  {/* Eligible Batches */}
                  <div>
                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                      Eligible Graduating Batches
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {job.eligibleBatches && job.eligibleBatches.length > 0 ? (
                        job.eligibleBatches.map((batch, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200/80 font-bold text-[11px]"
                          >
                            Batch {batch}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-700 font-semibold">All Graduating Batches</span>
                      )}
                    </div>
                  </div>

                  {/* Timeline & Location */}
                  <div className="pt-2.5 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Application Deadline:</span>
                      <span className="font-bold text-slate-800">
                        {new Date(job.deadline).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Work Location:</span>
                      <span className="font-bold text-slate-800 truncate max-w-[160px]">
                        {job.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Posted On:</span>
                      <span className="font-semibold text-slate-600">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Pipeline Stages */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-3">
                <h3 className="text-sm font-bold text-[#0A2540] font-heading flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#2563EB]" />
                  Applicant Pipeline
                </h3>
                <div className="space-y-2 text-xs">
                  {Object.entries(pipelineBreakdown || {}).map(([stage, count]) => (
                    <div key={stage} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                      <span className="font-semibold text-slate-600 capitalize">
                        {stage.toLowerCase().replace(/_/g, ' ')}
                      </span>
                      <span className="font-black text-[#0A2540] bg-slate-100 px-2.5 py-0.5 rounded-lg text-xs font-heading">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CANDIDATE APPLICANTS */}
        {activeTab === 'candidates' && (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-2xs space-y-5">
            {/* Candidates Filter Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={applicantSearch}
                  onChange={(e) => setApplicantSearch(e.target.value)}
                  placeholder="Search candidates by name, roll number, branch..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border border-slate-200/80 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
                />
              </div>

              {/* Stage Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {['ALL', 'APPLIED', 'SHORTLISTED', 'INTERVIEW', 'OFFERED', 'REJECTED'].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setApplicantFilterStage(stage)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      applicantFilterStage === stage
                        ? 'bg-[#2563EB] text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Applicants Table */}
            {filteredApplicants.length === 0 ? (
              <div className="text-center py-14 space-y-2">
                <Users className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-[#0A2540]">No Applicants Found</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  No students matching your search criteria have registered for this placement drive yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                      <th className="py-3.5 px-3">Candidate</th>
                      <th className="py-3.5 px-3">Enrollment & Branch</th>
                      <th className="py-3.5 px-3">CGPA</th>
                      <th className="py-3.5 px-3">Applied On</th>
                      <th className="py-3.5 px-3">Pipeline Stage</th>
                      <th className="py-3.5 px-3 text-right">Resume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredApplicants.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2.5">
                            <StudentAvatar
                              name={app.student.user.name}
                              avatarUrl={app.student.user.avatarUrl}
                              size="sm"
                              className="rounded-full shadow-2xs"
                            />
                            <div>
                              <Link
                                href={`/tpo/students/${app.student.id}`}
                                className="font-bold text-slate-900 hover:text-[#2563EB] hover:underline block"
                              >
                                {app.student.user.name}
                              </Link>
                              <span className="text-[11px] text-slate-400">{app.student.user.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-slate-700">
                          <div className="font-bold text-[#0A2540]">{app.student.enrollmentNumber}</div>
                          <div className="text-[11px] text-slate-500">{app.student.branch} • Batch {app.student.batchYear}</div>
                        </td>
                        <td className="py-3.5 px-3 font-black text-[#0A2540] font-heading text-sm">
                          {app.student.cgpa.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-3 text-slate-500">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-[#2563EB] border border-blue-200 shadow-2xs">
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          {app.resumeUrl ? (
                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[#2563EB] hover:underline font-bold text-xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </a>
                          ) : (
                            <span className="text-slate-400 text-[11px]">No File</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COMPANY PROFILE */}
        {activeTab === 'company' && (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-2xs space-y-4">
            <div className="flex items-center gap-4">
              <CompanyBrandLogo name={job.company.name} logoUrl={job.company.logoUrl} size="lg" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0A2540] font-heading">
                  {job.company.name}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  {job.company.industry || 'Technology & Engineering'} {job.company.location ? `• ${job.company.location}` : ''}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {job.company.description || 'Verified hiring partner registered on the CampusHire university recruitment network.'}
            </div>

            {job.company.website && (
              <div className="pt-2">
                <a
                  href={job.company.website.startsWith('http') ? job.company.website : `https://${job.company.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  <span>Visit Company Website</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
