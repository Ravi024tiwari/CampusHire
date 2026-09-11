'use client';

import React, { useState, useEffect, useCallback, use, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Banknote, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Save, 
  X, 
  Lock, 
  Unlock, 
  Trash2, 
  Copy, 
  Check, 
  ShieldCheck, 
  GraduationCap, 
  Layers, 
  Send, 
  FileText, 
  Award, 
  Loader2,
  Tag,
  Briefcase,
  ExternalLink,
  Target,
  ArrowRight,
  TrendingUp,
  ChevronRight,
  MoreVertical,
  Share2,
  Bookmark,
  Mail,
  Phone,
  Sparkles,
  Globe,
  SlidersHorizontal
} from 'lucide-react';
import { RecruiterJobItem, useRecruiterJobsStore } from '@/store/useRecruiterJobsStore';
import { RecruiterJobEditForm } from '../_components/RecruiterJobEditForm';

interface JobDetailResponse {
  job: RecruiterJobItem;
  pipelineBreakdown: Record<string, number>;
  isOwner?: boolean;
}

function RecruiterJobDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;
  const router = useRouter();
  const searchParams = useSearchParams();

  const { updateJob, deleteJob } = useRecruiterJobsStore();

  const [data, setData] = useState<JobDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(searchParams.get('edit') === 'true');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'logistics'>('overview');

  const fetchJobDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiClient.get<ApiResponse<JobDetailResponse>>(`/api/recruiter/jobs/${jobId}`);
      if (res.data.success && res.data.data) {
        setData(res.data.data);
      } else {
        setError(res.data.message || 'Failed to retrieve job details');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Unable to load campus drive profile');
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchJobDetail();
  }, [fetchJobDetail]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyId = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(jobId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}/student/jobs/${jobId}`;
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      showToast('Student application link copied to clipboard');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleToggleStatus = async () => {
    if (!data) return;
    const nextStatus = data.job.status === 'ACTIVE' ? 'CLOSED' : 'ACTIVE';
    const res = await updateJob(jobId, { status: nextStatus });
    if (res.success) {
      showToast(`Drive is now marked as ${nextStatus}`);
      setData({ ...data, job: { ...data.job, status: nextStatus } });
    } else {
      showToast(res.message || 'Failed to update status');
    }
  };

  const handleConfirmDelete = async () => {
    const res = await deleteJob(jobId);
    if (res.success) {
      router.push('/recruiter/jobs');
    } else {
      showToast(res.message || 'Failed to delete job drive');
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-9 w-36 bg-slate-200 rounded-xl" />
          <div className="h-9 w-48 bg-slate-200 rounded-xl" />
        </div>
        <div className="h-64 rounded-3xl bg-slate-200" />
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-slate-200" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 rounded-3xl bg-slate-200" />
          <div className="h-96 rounded-3xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 md:p-12 max-w-2xl mx-auto text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 font-heading">Unable to Load Campus Drive Profile</h2>
        <p className="text-xs sm:text-sm text-slate-600">{error || 'The requested placement drive was not found or access is restricted.'}</p>
        <button
          type="button"
          onClick={() => router.push('/recruiter/jobs')}
          className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-md cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Drives Catalog</span>
        </button>
      </div>
    );
  }

  const { job, pipelineBreakdown, isOwner = true } = data;
  const isDeadlineExpired = job.deadline ? new Date(job.deadline) < new Date() : false;
  const formattedDeadline = job.deadline ? new Date(job.deadline).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) : 'Rolling Recruitment';

  const calculateDaysLeft = (deadlineStr?: string) => {
    if (!deadlineStr) return 'Active drive';
    const deadlineDate = new Date(deadlineStr);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Deadline passed';
    if (diffDays === 0) return 'Closes today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  const daysLeftText = calculateDaysLeft(job.deadline);
  const totalApplications = job._count?.applications || 0;
  const isLive = job.status === 'ACTIVE';

  const pipelineStages = [
    { 
      label: 'Applied', 
      key: 'APPLIED', 
      count: pipelineBreakdown['APPLIED'] || 0, 
      trend: 'Initial pool',
      cardBg: 'bg-white hover:bg-blue-50/50 border-slate-200/90 hover:border-blue-300', 
      iconBg: 'bg-blue-50 text-blue-600',
      numColor: 'text-slate-900',
      Icon: FileText 
    },
    { 
      label: 'Under Review', 
      key: 'UNDER_REVIEW', 
      count: pipelineBreakdown['UNDER_REVIEW'] || 0, 
      trend: 'Screening',
      cardBg: 'bg-white hover:bg-amber-50/50 border-slate-200/90 hover:border-amber-300', 
      iconBg: 'bg-amber-50 text-amber-600',
      numColor: 'text-slate-900',
      Icon: Clock 
    },
    { 
      label: 'Shortlisted', 
      key: 'SHORTLISTED', 
      count: pipelineBreakdown['SHORTLISTED'] || 0, 
      trend: 'Eligible for test',
      cardBg: 'bg-white hover:bg-sky-50/50 border-slate-200/90 hover:border-sky-300', 
      iconBg: 'bg-sky-50 text-sky-600',
      numColor: 'text-slate-900',
      Icon: Users 
    },
    { 
      label: 'Interviews', 
      key: 'INTERVIEW_SCHEDULED', 
      count: pipelineBreakdown['INTERVIEW_SCHEDULED'] || 0, 
      trend: 'Technical rounds',
      cardBg: 'bg-white hover:bg-indigo-50/50 border-slate-200/90 hover:border-indigo-300', 
      iconBg: 'bg-indigo-50 text-indigo-600',
      numColor: 'text-slate-900',
      Icon: Calendar 
    },
    { 
      label: 'Offers Made', 
      key: 'OFFERED', 
      count: pipelineBreakdown['OFFERED'] || 0, 
      trend: 'Offers generated',
      cardBg: 'bg-white hover:bg-emerald-50/50 border-slate-200/90 hover:border-emerald-300', 
      iconBg: 'bg-emerald-50 text-emerald-600',
      numColor: 'text-emerald-700',
      Icon: CheckCircle2 
    },
    { 
      label: 'Declined / Rejected', 
      key: 'REJECTED', 
      count: pipelineBreakdown['REJECTED'] || 0, 
      trend: 'Closed files',
      cardBg: 'bg-white hover:bg-slate-100/50 border-slate-200/90 hover:border-slate-300', 
      iconBg: 'bg-slate-100 text-slate-600',
      numColor: 'text-slate-600',
      Icon: X 
    },
  ];

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 pb-24 text-slate-800 transition-all duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 text-white px-4 py-3 shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. Top Breadcrumb & Action Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200/80">
        
        {/* Left: Back Link & Breadcrumbs */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && window.history.length > 1) {
                router.back();
              } else {
                router.push('/recruiter/jobs');
              }
            }}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-all shadow-2xs cursor-pointer shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </button>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-medium truncate">
            <span>/</span>
            <Link href="/recruiter/jobs" className="hover:text-blue-600 transition-colors">Drives Catalog</Link>
            <span>/</span>
            {job.college && (
              <>
                <Link href={`/recruiter/colleges/${job.collegeId}`} className="hover:text-blue-600 transition-colors truncate max-w-[140px]">
                  {job.college.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="font-bold text-slate-900 truncate max-w-[160px]">{job.title}</span>
          </div>
        </div>

        {/* Right: Desktop Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Share Button */}
          <button
            type="button"
            onClick={handleCopyShareLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer"
            title="Copy Student Share Link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
            <span className="hidden sm:inline">{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>

          {isOwner && (
            <>
              {/* Edit Drive Button */}
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-2xs cursor-pointer ${
                  isEditing
                    ? 'bg-slate-100 text-slate-800 border-slate-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">{isEditing ? 'View Drive' : 'Edit Parameters'}</span>
                <span className="sm:hidden">Edit</span>
              </button>

              {/* Status Toggle Button */}
              <button
                type="button"
                onClick={handleToggleStatus}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors shadow-2xs cursor-pointer ${
                  isLive
                    ? 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50'
                    : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                {isLive ? <Lock className="w-3.5 h-3.5 text-rose-500" /> : <Unlock className="w-3.5 h-3.5 text-emerald-500" />}
                <span className="hidden sm:inline">{isLive ? 'Close Drive' : 'Reopen Drive'}</span>
                <span className="sm:hidden">{isLive ? 'Close' : 'Reopen'}</span>
              </button>
            </>
          )}

          {/* View Candidate Stream CTA */}
          <Link
            href={`/recruiter/applications?jobId=${job.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Applicants ({totalApplications})</span>
          </Link>
        </div>

      </div>

      {/* 2. Executive Showcase Hero Header Card (Clean Modern Card with Slate & Emerald Accents) */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 lg:p-8 shadow-xs space-y-6 transition-all">
        
        {/* Top Header Strip: Badges & ID */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            {/* Live Status Badge */}
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-extrabold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Campus Placement Drive</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold">
                <span>Closed Drive</span>
              </span>
            )}

            {/* Workplace / Type Pill */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-bold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{job.type === 'FULL_TIME' ? 'Full-Time Role' : job.type === 'INTERNSHIP' ? 'Internship Drive' : 'Internship + Full-Time'}</span>
            </span>

            {/* Verified Campus Partner */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Campus Placement</span>
            </span>
          </div>

          {/* Drive Reference ID */}
          <button
            type="button"
            onClick={handleCopyId}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-mono font-bold transition-colors cursor-pointer"
            title="Click to copy Drive ID"
          >
            <span>ID: {job.id.slice(0, 10)}</span>
            {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          </button>
        </div>

        {/* Main Hero Identity Strip */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: University Logo + Job Title + Sub-meta */}
          <div className="flex items-start gap-4 min-w-0">
            {/* Institution Avatar */}
            {job.college ? (
              <Link
                href={`/recruiter/colleges/${job.collegeId}`}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-slate-200 p-2.5 shrink-0 flex items-center justify-center hover:border-blue-300 transition-colors shadow-2xs"
                title={`View ${job.college.name}`}
              >
                {job.college.logoUrl ? (
                  <img
                    src={job.college.logoUrl}
                    alt={job.college.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-blue-600" />
                )}
              </Link>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-black text-xl shrink-0">
                {job.title.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0 space-y-1">
              {job.college && (
                <Link
                  href={`/recruiter/colleges/${job.collegeId}`}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1.5"
                >
                  <span>{job.college.name}</span>
                  {job.college.code && (
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[10px] font-mono border border-slate-200">
                      {job.college.code}
                    </span>
                  )}
                </Link>
              )}

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 font-heading leading-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium pt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.location || job.college?.city || 'Campus / Hybrid'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.minCgpa && job.minCgpa > 0 ? `${job.minCgpa}+ CGPA` : 'Open Cutoff'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Deadline: <strong className="text-slate-800">{formattedDeadline}</strong></span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Compensation & Deadline Highlight Boxes */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            {/* Package Card */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-0.5 min-w-[160px] flex-1 sm:flex-initial">
              <span className="text-[10.5px] font-extrabold uppercase text-emerald-800 tracking-wider block">
                Compensation Package
              </span>
              <p className="text-lg sm:text-xl font-black text-emerald-700 font-mono font-heading">
                {job.salaryPackage || 'Competitive Package'}
              </p>
              <span className="text-[10px] text-emerald-600 font-medium block">
                Full CTC / Stipend
              </span>
            </div>

            {/* Timeline / Days Left Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5 min-w-[150px] flex-1 sm:flex-initial">
              <span className="text-[10.5px] font-extrabold uppercase text-slate-400 tracking-wider block">
                Recruitment Window
              </span>
              <p className="text-sm sm:text-base font-black text-slate-800 font-heading">
                {daysLeftText}
              </p>
              <span className="text-[10px] text-slate-500 font-medium block">
                {formattedDeadline}
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Interactive Candidate Pipeline Funnel (6 Clickable Stages) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 font-heading">
                Candidate Pipeline Funnel
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Click any stage to filter applicants in the recruitment stream
              </p>
            </div>
          </div>

          <Link
            href={`/recruiter/applications?jobId=${job.id}`}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Applicant Stream</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Responsive Funnel Cards - Smooth horizontal scroll on mobile/tablet, full grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-6 gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-3 px-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {pipelineStages.map((stage) => {
            const Icon = stage.Icon;
            return (
              <Link
                key={stage.key}
                href={`/recruiter/applications?jobId=${job.id}&status=${stage.key}`}
                className={`min-w-[160px] sm:min-w-[185px] lg:min-w-0 flex-1 shrink-0 snap-start p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-2 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 cursor-pointer ${stage.cardBg}`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${stage.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <div className="space-y-0.5 pt-1">
                  <span className="text-xs font-bold text-slate-600 block truncate">
                    {stage.label}
                  </span>
                  <p className={`text-xl sm:text-2xl font-black font-heading ${stage.numColor}`}>
                    {stage.count}
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    {stage.trend}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Main Body: Overview vs Inline Edit Form */}
      {isEditing ? (
        <RecruiterJobEditForm
          job={job}
          onCancel={() => setIsEditing(false)}
          onSaved={(updatedJob) => {
            setData((prev) => (prev ? { ...prev, job: updatedJob } : null));
            setIsEditing(false);
          }}
          showToast={showToast}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column (2/3 width on Desktop): Parameters, Description, Skills, Eligibility */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 4.1 Key Parameters Matrix Card */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>Core Requisition Parameters</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Package</span>
                  <span className="font-extrabold text-sm text-emerald-700 font-mono block truncate">{job.salaryPackage}</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Location</span>
                  <span className="font-bold text-slate-800 text-xs block truncate">{job.location || 'On-Campus'}</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Min Cutoff</span>
                  <span className="font-bold text-slate-800 text-xs block truncate">{job.minCgpa && job.minCgpa > 0 ? `${job.minCgpa} CGPA` : 'Open GPA'}</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Status</span>
                  <span className={`font-bold text-xs block truncate ${isLive ? 'text-emerald-700' : 'text-slate-600'}`}>
                    {isLive ? 'Active Drive' : 'Closed'}
                  </span>
                </div>
              </div>
            </div>

            {/* 4.2 Job Description & Scope */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Job Description & Selection Process</span>
              </h3>

              <div className="rounded-2xl bg-slate-50/70 p-4 sm:p-5 border border-slate-200/80 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                {job.description || `Drive campus recruitment campaign for ${job.title} with students of ${job.college?.name || 'the institution'}. Candidates will undergo online assessment and structured technical interview rounds.`}
              </div>
            </div>

            {/* 4.3 Required Skills & Competencies */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600" />
                <span>Required Skills & Technical Competencies</span>
              </h3>

              {job.skills && job.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-bold shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No specific skills listed for this drive.</p>
              )}
            </div>

            {/* 4.4 University Placement Eligibility Matrix */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Campus Eligibility Matrix</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-slate-700">Eligible Graduation Batches: </span>
                  <span className="text-slate-600 font-semibold">
                    {job.eligibleBatches && job.eligibleBatches.length > 0
                      ? job.eligibleBatches.join(', ')
                      : '2025, 2026 Graduating Batches'}
                  </span>
                </div>

                <div>
                  <span className="font-bold text-slate-700">Eligible Academic Branches: </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {job.allowedBranches && job.allowedBranches.length > 0 ? (
                      job.allowedBranches.map((branch, i) => (
                        <span key={i} className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 border border-slate-200">
                          {branch}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-500">All engineering & management branches eligible</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (1/3 width on Desktop): Controls, TPO Connection, Share & Danger Zone */}
          <div className="space-y-6">
            
            {/* 4.5 Drive Management & Controls Card */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
                Drive Management
              </h3>

              <div className="space-y-2.5">
                <Link
                  href={`/recruiter/applications?jobId=${job.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>Manage Applicants ({totalApplications})</span>
                </Link>

                {isOwner && (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4 text-blue-600" />
                      <span>Edit Drive Parameters</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleStatus}
                      className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl text-xs font-bold border transition-colors cursor-pointer shadow-2xs ${
                        isLive
                          ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {isLive ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      <span>{isLive ? 'Close Applications' : 'Reactivate Drive'}</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 4.6 Target College Placement Cell Card */}
            {job.college && (
              <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3.5">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
                  Target Institution
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 p-1.5 shrink-0 flex items-center justify-center">
                      {job.college.logoUrl ? (
                        <img src={job.college.logoUrl} alt={job.college.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <Building2 className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="font-extrabold text-xs text-slate-900 block truncate">{job.college.name}</span>
                      <span className="text-[11px] text-slate-500 block truncate">
                        {job.college.city || 'India'}{job.college.state ? `, ${job.college.state}` : ''}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/recruiter/colleges/${job.collegeId}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-600 text-xs font-bold border border-slate-200 transition-colors"
                  >
                    <span>View Institution Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* 4.7 Share Student Portal Link */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
                Shareable Student Drive Link
              </h3>
              <p className="text-xs text-slate-500">
                Share this direct URL with campus students or the placement officer to accept online applications.
              </p>
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Student Portal Link'}</span>
              </button>
            </div>

            {/* 4.8 Danger Zone (Delete Drive) */}
            {isOwner && (
              <div className="rounded-3xl bg-rose-50/50 border border-rose-200/80 p-5 space-y-2.5">
                <span className="text-[10.5px] font-extrabold uppercase text-rose-800 tracking-wider block">
                  Danger Zone
                </span>
                <p className="text-xs text-rose-700 leading-normal">
                  Remove or permanently close this campus recruitment requisition.
                </p>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Placement Drive</span>
                </button>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-heading">Delete Placement Drive?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Are you sure you want to remove <strong>{job.title}</strong> for {job.college?.name || 'this campus'}?
                {job._count && job._count.applications > 0 && (
                  <span className="block mt-2 font-bold text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    Note: This drive has active candidate submissions. It will be safely marked as CLOSED to preserve candidate history.
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-md shadow-rose-600/20 cursor-pointer"
              >
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function RecruiterJobDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex h-96 w-full items-center justify-center">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RecruiterJobDetailContent {...props} />
    </Suspense>
  );
}
