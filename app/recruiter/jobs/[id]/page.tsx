'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
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
  Radio,
  SlidersHorizontal,
  ExternalLink,
  Target,
  ArrowRight,
  TrendingUp,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { RecruiterJobItem, useRecruiterJobsStore } from '@/store/useRecruiterJobsStore';
import { RecruiterJobEditForm } from '../_components/RecruiterJobEditForm';

interface JobDetailResponse {
  job: RecruiterJobItem;
  pipelineBreakdown: Record<string, number>;
}

export default function RecruiterJobDetailPage({
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
  const [copiedId, setCopiedId] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    navigator.clipboard.writeText(jobId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
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
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-10 w-44 bg-slate-200 rounded-xl" />
        <div className="h-72 rounded-3xl bg-slate-200" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="h-28 rounded-2xl bg-slate-200" />
          <div className="h-28 rounded-2xl bg-slate-200" />
          <div className="h-28 rounded-2xl bg-slate-200" />
          <div className="h-28 rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 md:p-12 max-w-2xl mx-auto text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto shadow-xs">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-extrabold text-[#0A2540]">Unable to Load Campus Drive Profile</h2>
        <p className="text-xs sm:text-sm text-slate-600">{error || 'The requested placement drive was not found or access is restricted.'}</p>
        <button
          onClick={() => router.push('/recruiter/jobs')}
          className="py-2.5 px-6 rounded-xl bg-[#2563EB] text-white text-xs font-bold inline-flex items-center gap-2 shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Drives Catalog</span>
        </button>
      </div>
    );
  }

  const { job, pipelineBreakdown } = data;
  const isDeadlineExpired = new Date(job.deadline) < new Date();
  const formattedDeadline = new Date(job.deadline).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const calculateDaysLeft = (deadlineStr: string) => {
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

  const pipelineStages = [
    { 
      label: 'Applied', 
      key: 'APPLIED', 
      count: pipelineBreakdown['APPLIED'] || 0, 
      trend: '+8 this week',
      isPositive: true,
      cardBg: 'bg-blue-50/70 border-blue-200/90 hover:border-blue-400', 
      iconBg: 'bg-blue-100/90 text-blue-600',
      numColor: 'text-blue-600',
      chevronColor: 'text-blue-400',
      Icon: FileText 
    },
    { 
      label: 'Under Review', 
      key: 'UNDER_REVIEW', 
      count: pipelineBreakdown['UNDER_REVIEW'] || 0, 
      trend: '+4 this week',
      isPositive: true,
      cardBg: 'bg-amber-50/70 border-amber-200/90 hover:border-amber-400', 
      iconBg: 'bg-amber-100/90 text-amber-600',
      numColor: 'text-amber-600',
      chevronColor: 'text-amber-400',
      Icon: Clock 
    },
    { 
      label: 'Shortlisted', 
      key: 'SHORTLISTED', 
      count: pipelineBreakdown['SHORTLISTED'] || 0, 
      trend: '+3 this week',
      isPositive: true,
      cardBg: 'bg-purple-50/70 border-purple-200/90 hover:border-purple-400', 
      iconBg: 'bg-purple-100/90 text-purple-600',
      numColor: 'text-purple-600',
      chevronColor: 'text-purple-400',
      Icon: Users 
    },
    { 
      label: 'Interviewed', 
      key: 'INTERVIEW_SCHEDULED', 
      count: pipelineBreakdown['INTERVIEW_SCHEDULED'] || 0, 
      trend: '+2 this week',
      isPositive: true,
      cardBg: 'bg-fuchsia-50/70 border-fuchsia-200/90 hover:border-fuchsia-400', 
      iconBg: 'bg-fuchsia-100/90 text-fuchsia-600',
      numColor: 'text-fuchsia-600',
      chevronColor: 'text-fuchsia-400',
      Icon: Calendar 
    },
    { 
      label: 'Offers Generated', 
      key: 'OFFERED', 
      count: pipelineBreakdown['OFFERED'] || 0, 
      trend: '+1 this week',
      isPositive: true,
      cardBg: 'bg-emerald-50/70 border-emerald-200/90 hover:border-emerald-400', 
      iconBg: 'bg-emerald-100/90 text-emerald-600',
      numColor: 'text-emerald-600',
      chevronColor: 'text-emerald-400',
      Icon: CheckCircle2 
    },
    { 
      label: 'Declined / Rejected', 
      key: 'REJECTED', 
      count: pipelineBreakdown['REJECTED'] || 0, 
      trend: '0 this week',
      isPositive: null,
      cardBg: 'bg-rose-50/70 border-rose-200/90 hover:border-rose-400', 
      iconBg: 'bg-rose-100/90 text-rose-600',
      numColor: 'text-rose-600',
      chevronColor: 'text-rose-400',
      Icon: X 
    },
  ];

  const totalApplications = job._count?.applications || 0;
  const campusBackground = (job.college as any).images?.[0] || '/images/college/College.png';

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-7xl mx-auto space-y-6 pb-24 transition-all duration-300">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#0A2540] text-white px-4 py-3 shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. Industrial-Grade Top Action Header (Clean Interactive Back Button + Responsive Menu) */}
      <div className="flex items-center justify-between gap-3 pb-1">
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && window.history.length > 1) {
              router.back();
            } else {
              router.push('/recruiter/jobs');
            }
          }}
          className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 text-xs sm:text-sm font-extrabold text-slate-700 hover:text-[#0A2540] shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
          title="Return to previous page"
        >
          <ArrowLeft className="h-4 w-4 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Back to Drives</span>
          <span className="sm:hidden">Back</span>
        </button>

        {/* Desktop Action Controls (sm+) */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer border shadow-2xs ${
              isEditing
                ? 'bg-slate-100 text-slate-800 border-slate-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-[#0A2540]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-600" />
            <span>{isEditing ? 'View Overview' : 'Edit Drive'}</span>
          </button>

          <button
            onClick={handleToggleStatus}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer border shadow-2xs ${
              job.status === 'ACTIVE'
                ? 'bg-white text-red-600 border-red-200 hover:bg-red-50'
                : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            {job.status === 'ACTIVE' ? <Lock className="w-3.5 h-3.5 text-red-500" /> : <Unlock className="w-3.5 h-3.5 text-emerald-500" />}
            <span>{job.status === 'ACTIVE' ? 'Close Drive' : 'Reactivate Drive'}</span>
          </button>

          <Link
            href={`/recruiter/dashboard#applications`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-extrabold shadow-md shadow-blue-600/25 transition-all cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Candidate Stream ({totalApplications})</span>
          </Link>
        </div>

        {/* Mobile Actions Dropdown Menu (3-dots vertical kebab trigger) */}
        <div className="relative sm:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs cursor-pointer active:scale-95 transition-all"
            title="Drive actions menu"
            aria-label="Drive actions menu"
          >
            <MoreVertical className="w-4 h-4 text-slate-700" />
          </button>

          {isMobileMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-[1px]" 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
              <div className="absolute right-0 top-11 z-50 w-56 rounded-2xl bg-white border border-slate-200/90 p-1.5 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  <Edit3 className="w-4 h-4 text-blue-600" />
                  <span>{isEditing ? 'View Overview' : 'Edit Drive Parameters'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleToggleStatus();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer text-left hover:bg-slate-50"
                >
                  {job.status === 'ACTIVE' ? <Lock className="w-4 h-4 text-red-500" /> : <Unlock className="w-4 h-4 text-emerald-500" />}
                  <span className={job.status === 'ACTIVE' ? 'text-red-600' : 'text-emerald-600'}>
                    {job.status === 'ACTIVE' ? 'Close Drive' : 'Reactivate Drive'}
                  </span>
                </button>

                <Link
                  href="/recruiter/dashboard#applications"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer text-left"
                >
                  <Users className="w-4 h-4" />
                  <span>Candidate Stream ({totalApplications})</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 2. Executive Showcase Banner (Lighter Radiant Blue with Silky Smooth Micro-Animations) */}
      <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(37,99,235,0.18)] border border-blue-200/40 group transition-all duration-500 bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] text-white">
        
        {/* Layer A: Campus Background Photo with Luminous Soft Blue Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={campusBackground}
            alt={`${job.college.name} Campus Infrastructure`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover object-center opacity-30 mix-blend-luminosity scale-100 group-hover:scale-105 transition-all duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-blue-600/25 to-indigo-900/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 via-transparent to-blue-400/10" />
          
          {/* Silky Floating Ambient Glow Orbs */}
          <div className="absolute -top-16 -right-16 w-88 h-88 bg-sky-200/30 rounded-full blur-3xl pointer-events-none animate-float-slow" />
          <div className="absolute -bottom-16 left-1/4 w-88 h-88 bg-orange-300/30 rounded-full blur-3xl pointer-events-none animate-float-delayed" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-300/25 rounded-full blur-2xl pointer-events-none animate-soft-glow" />
          
          {/* Subtle Dynamic Mesh Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        </div>

        {/* Layer B: Content Container */}
        <div className="relative z-10 p-5 sm:p-7 lg:p-8 space-y-6">
          
          {/* Top Status & Accreditation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/20">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Active Drive Pill with Ripple Dot (Vibrant Orange Accent) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/30 hover:bg-orange-500/40 border border-orange-300/60 text-orange-100 text-xs font-bold backdrop-blur-md shadow-xs transition-transform hover:scale-[1.02]">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-300" />
                </div>
                <span className="hidden sm:inline">{job.status === 'ACTIVE' ? 'Active Recruitment Drive' : `${job.status} Drive`}</span>
                <span className="sm:hidden">{job.status === 'ACTIVE' ? 'Active Drive' : job.status}</span>
              </div>

              {/* Verified Badge (Visible on SM+) */}
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-semibold backdrop-blur-md shadow-xs transition-transform hover:scale-[1.02]">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-200" />
                <span>Verified by Placement Cell</span>
              </div>
            </div>

            {/* Drive ID with Copy */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyId}
                className="text-xs text-white hover:text-sky-100 font-mono flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 backdrop-blur-md transition-all cursor-pointer shadow-xs active:scale-95"
                title="Click to copy full Drive Reference ID"
              >
                <span className="hidden sm:inline">Drive ID: {job.id.slice(0, 8)}</span>
                <span className="sm:hidden">ID: {job.id.slice(0, 8)}</span>
                {copiedId ? <Check className="w-3.5 h-3.5 text-orange-300" /> : <Copy className="w-3.5 h-3.5 text-sky-200" />}
              </button>
            </div>
          </div>

          {/* Main Grid: Identity vs CTC & Location Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Col (8 cols on Desktop): Logo + Title + Tags + Deadline */}
            <div className="lg:col-span-8 space-y-4">
              
              <div className="flex items-start sm:items-center gap-4">
                {/* University Logo Card with Hover Elevation */}
                <Link 
                  href={`/recruiter/colleges/${job.collegeId}`}
                  className="group/logo relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2.5 shadow-lg border-2 border-white/90 shrink-0 overflow-hidden flex items-center justify-center backdrop-blur-md hover:scale-105 hover:-rotate-1 transition-all duration-300"
                  title="View University Placement Profile"
                >
                  {job.college.logoUrl ? (
                    <img
                      src={job.college.logoUrl}
                      alt={job.college.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Building2 className="w-8 h-8 text-blue-800" />
                  )}
                </Link>

                <div className="space-y-1">
                  {/* University Name & Code */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Link 
                      href={`/recruiter/colleges/${job.collegeId}`}
                      className="text-xs sm:text-sm font-bold text-sky-100 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>{job.college.name}</span>
                      {job.college.code && (
                        <span className="bg-white/20 border border-white/30 text-white px-1.5 py-0.2 rounded text-[10.5px] font-mono font-bold shadow-2xs">
                          {job.college.code}
                        </span>
                      )}
                    </Link>
                  </div>

                  {/* Main Job Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight text-white leading-tight drop-shadow-sm">
                    {job.title}
                  </h1>

                  {/* Sub-row: Location | Type | Cutoff */}
                  <div className="flex items-center gap-2 pt-1 flex-wrap text-xs text-blue-100 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-200" />
                      <span>{job.college.city || 'Campus Partner'}{job.college.state ? `, ${job.college.state}` : ''}</span>
                    </span>
                    
                    <span className="text-blue-200/50 hidden sm:inline">|</span>

                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-sky-200" />
                      <span>{job.type === 'FULL_TIME' ? 'Full Time' : job.type === 'INTERNSHIP' ? 'Internship' : 'Internship + Full Time'}</span>
                    </span>

                    <span className="text-blue-200/50 hidden sm:inline">|</span>

                    <span className="flex items-center gap-1 text-purple-100 font-semibold">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-200" />
                      <span>{job.minCgpa > 0 ? `${job.minCgpa}+ CGPA` : 'Open Cutoff'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Deadline & Days Left Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-white">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/20 text-white border border-white/30 shadow-2xs">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-blue-100 block font-medium">Application Deadline</span>
                    <span className="font-bold text-white">{formattedDeadline}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-500/30 hover:bg-orange-500/40 border border-orange-300/60 text-orange-100 text-xs font-bold backdrop-blur-md shadow-xs transition-transform hover:scale-105">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{daysLeftText}</span>
                </div>
              </div>

            </div>

            {/* Right Col (4 cols on Desktop, Full Width on Mobile): CTC & Location Cards */}
            <div className="lg:col-span-4 space-y-3">
              
              {/* Compensation Package Card with Hover Lift (Orange Accent) */}
              <div className="bg-white/15 hover:bg-white/20 border border-white/30 hover:border-orange-300/50 rounded-2xl p-4 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex items-center justify-between gap-3 backdrop-blur-md group/ctc">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/30 text-orange-100 border border-orange-300/50 font-bold text-lg shrink-0 group-hover/ctc:scale-110 transition-transform">
                    ₹
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight">
                      {job.salaryPackage}
                    </p>
                    <span className="text-[11px] font-bold text-orange-200 uppercase tracking-wider block">
                      Compensation Package
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-orange-400/20 text-orange-200">
                  <Banknote className="w-5 h-5" />
                </div>
              </div>

              {/* Work Location Card with Hover Lift */}
              <div className="bg-white/15 hover:bg-white/20 border border-white/30 rounded-2xl p-3.5 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex items-center justify-between gap-3 backdrop-blur-md group/loc">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400/25 text-sky-100 border border-sky-300/40 shrink-0 group-hover/loc:scale-110 transition-transform">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-white truncate max-w-[200px]">
                      {job.location}
                    </p>
                    <span className="text-[10.5px] font-bold text-sky-200 uppercase tracking-wider block">
                      Work Location
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex h-8 w-8 items-center justify-center text-sky-100/70">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>

              {/* Slogan Watermark */}
              <p className="hidden lg:block text-right text-xs font-serif italic text-blue-100/90 pt-1 tracking-wide">
                Build your future, with purpose 🇮🇳
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* 3. Real-Time Application Overview & Candidate Pipeline Funnel */}
      <div className="space-y-3.5">
        
        {/* Overview Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#0A2540] font-heading tracking-tight">
                Application Overview
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Track the progress of candidates through the recruitment pipeline
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-600">
              Total Submissions: <strong className="text-slate-900 font-black">{totalApplications}</strong>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs border border-emerald-200 shadow-2xs">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>+12% from last week</span>
            </span>
          </div>
        </div>

        {/* 6 Responsive Pipeline Funnel Cards (Horizontal Swipe on Mobile/Tablet) */}
        <div className="flex lg:grid lg:grid-cols-6 gap-3 overflow-x-auto pb-2 lg:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5">
          {pipelineStages.map((stage) => {
            const Icon = stage.Icon;
            return (
              <div
                key={stage.key}
                className={`min-w-[150px] sm:min-w-[170px] lg:min-w-0 flex-1 shrink-0 snap-start p-4 rounded-2xl border flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all ${stage.cardBg}`}
              >
                {/* Top Row: Icon + Chevron */}
                <div className="flex items-center justify-between">
                  <div className={`h-8 w-8 rounded-xl flex items-center justify-center shadow-2xs ${stage.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <ChevronRight className={`w-4 h-4 ${stage.chevronColor}`} />
                </div>

                {/* Center: Stage Label */}
                <span className="text-xs font-bold text-slate-700 mt-3 truncate">
                  {stage.label}
                </span>

                {/* Bottom: Big Count + Trend */}
                <div className="mt-1">
                  <p className={`text-2xl font-black font-heading tracking-tight ${stage.numColor}`}>
                    {stage.count}
                  </p>
                  <p className="text-[11px] font-bold text-emerald-600 mt-0.5">
                    {stage.isPositive ? `↑ ${stage.trend}` : `— ${stage.trend}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Swipe Hint on smaller screens */}
        <div className="flex lg:hidden items-center justify-center gap-1 text-[10.5px] text-slate-400 font-medium">
          <span>← Swipe horizontally to explore all candidate pipeline stages →</span>
        </div>
      </div>

      {/* 4. Main Content: Clean Overview vs Inline Edit Form Component */}
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
        /* CLEAN HIGH-GRADE VIEW MODE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left 8 cols: Detailed Overview */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Key Parameters Matrix Strip (Horizontally Swipeable on Mobile/Tablet) */}
            <div className="flex sm:grid sm:grid-cols-4 gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="min-w-[130px] sm:min-w-0 flex-1 shrink-0 snap-start space-y-1 p-1">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                  Package / CTC
                </span>
                <p className="text-sm sm:text-base font-black text-[#0A2540] truncate">{job.salaryPackage}</p>
              </div>

              <div className="min-w-[130px] sm:min-w-0 flex-1 shrink-0 snap-start space-y-1 p-1">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  Location
                </span>
                <p className="text-sm sm:text-base font-bold text-[#0A2540] truncate">{job.location}</p>
              </div>

              <div className="min-w-[130px] sm:min-w-0 flex-1 shrink-0 snap-start space-y-1 p-1">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                  Min CGPA
                </span>
                <p className="text-sm sm:text-base font-bold text-[#0A2540]">{job.minCgpa > 0 ? `${job.minCgpa} CGPA` : 'No Cutoff'}</p>
              </div>

              <div className="min-w-[130px] sm:min-w-0 flex-1 shrink-0 snap-start space-y-1 p-1">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Deadline
                </span>
                <p className={`text-xs sm:text-sm font-bold truncate ${isDeadlineExpired ? 'text-red-600' : 'text-[#0A2540]'}`}>
                  {formattedDeadline}
                </p>
              </div>
            </div>

            {/* Required Skills Matrix */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#0A2540] uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600" />
                Required Skills & Tech Competencies
              </h3>
              {job.skills && job.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-xl bg-blue-50 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-blue-800 border border-blue-200 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No specific skills listed for this drive.</p>
              )}
            </div>

            {/* Academic Eligibility Matrix */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#0A2540] uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                University Placement Eligibility Matrix
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-slate-700">Eligible Graduation Batches: </span>
                  <span className="text-slate-600 font-semibold">
                    {job.eligibleBatches && job.eligibleBatches.length > 0
                      ? job.eligibleBatches.join(', ')
                      : 'Open to all graduating batches'}
                  </span>
                </div>

                <div>
                  <span className="font-bold text-slate-700">Eligible Engineering & Academic Branches: </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {job.allowedBranches && job.allowedBranches.length > 0 ? (
                      job.allowedBranches.map((branch, i) => (
                        <span key={i} className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 border border-slate-200">
                          {branch}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-500">All engineering branches eligible</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Role Overview & Details */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#0A2540] uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Job Description & Hiring Process
              </h3>
              <div className="rounded-2xl bg-slate-50/80 p-4 sm:p-5 border border-slate-200/80 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                {job.description}
              </div>
            </div>

          </div>

          {/* Right 4 cols: Placement Cell Actions & Danger Zone */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Actions Card */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#0A2540] uppercase tracking-wider">
                Drive Management
              </h3>

              <div className="space-y-2.5">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-blue-600/25 transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Drive Parameters</span>
                </button>

                <button
                  onClick={handleToggleStatus}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold border transition-all cursor-pointer shadow-2xs ${
                    job.status === 'ACTIVE'
                      ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {job.status === 'ACTIVE' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  <span>{job.status === 'ACTIVE' ? 'Close Drive Applications' : 'Reopen Placement Drive'}</span>
                </button>

                <Link
                  href={`/recruiter/colleges/${job.collegeId}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-sm font-bold shadow-2xs transition-all"
                >
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>View University Placement Cell</span>
                </Link>
              </div>

              {/* Danger Zone: Delete / Purge */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Drive Removal</p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Placement Drive</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowDeleteConfirm(false)} className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" />
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 z-10">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0A2540]">Delete Placement Drive?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Are you sure you want to remove <strong>{job.title}</strong> for {job.college.name}?
                {job._count && job._count.applications > 0 && (
                  <span className="block mt-2 font-bold text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    Note: This drive has active candidate records. It will be safely marked as CLOSED to preserve candidate history.
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold shadow-md shadow-red-500/20"
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
