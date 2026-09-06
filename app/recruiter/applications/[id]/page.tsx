'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  FileText, 
  Download, 
  Eye, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  Bookmark, 
  Award, 
  XCircle, 
  CheckCircle2, 
  Send, 
  Check, 
  Plus, 
  X, 
  Loader2, 
  Globe, 
  Building2, 
  DollarSign, 
  FileCheck2,
  Code2,
  Trophy,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function RecruiterApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const router = useRouter();
  const { id: applicationId } = use(params);

  const [application, setApplication] = useState<any | null>(null);
  const [adjacent, setAdjacent] = useState<{ previousId: string | null; nextId: string | null; currentIndex: number; total: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [activeTab, setActiveTab] = useState<'Overview' | 'Resume' | 'Skills' | 'Education' | 'Experience' | 'Projects' | 'Other Details'>('Overview');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Status management states
  const [targetStatus, setTargetStatus] = useState<string>('APPLIED');
  const [noteText, setNoteText] = useState<string>('');
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  // Offer Letter Generation form states
  const [offerDesignation, setOfferDesignation] = useState('');
  const [offerSalary, setOfferSalary] = useState('');
  const [offerLocation, setOfferLocation] = useState('');
  const [offerJoiningDate, setOfferJoiningDate] = useState('');
  const [offerLetterUrl, setOfferLetterUrl] = useState('');

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch application detail
  const fetchApplicationDetail = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get<ApiResponse<{ application: any; adjacent: any }>>(
        `/api/recruiter/applications/${applicationId}`
      );
      if (res.data?.success && res.data.data) {
        const app = res.data.data.application;
        setApplication(app);
        setAdjacent(res.data.data.adjacent);
        setTargetStatus(app.status);
        setNoteText(app.notes || '');

        // Populate offer states if available
        setOfferDesignation(app.offer?.designation || app.job?.title || '');
        setOfferSalary(app.offer?.salaryPackage || app.job?.salaryPackage || '');
        setOfferLocation(app.offer?.location || app.job?.location || '');
        setOfferJoiningDate(app.offer?.joiningDate ? new Date(app.offer.joiningDate).toISOString().slice(0, 10) : '');
        setOfferLetterUrl(app.offer?.letterUrl || '');
      } else {
        showToast(res.data?.message || 'Application not found', 'error');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || err.message || 'Failed to load application', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationDetail();
  }, [applicationId]);

  // ScrollSpy to update activeTab on scroll
  useEffect(() => {
    if (isLoading || !application) return;

    const sections = [
      { id: 'section-overview', tab: 'Overview' },
      { id: 'section-resume', tab: 'Resume' },
      { id: 'section-skills', tab: 'Skills' },
      { id: 'section-education', tab: 'Education' },
      { id: 'section-experience', tab: 'Experience' },
      { id: 'section-projects', tab: 'Projects' },
      { id: 'section-other-details', tab: 'Other Details' },
    ] as const;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.id === entry.target.id);
            if (match) {
              setActiveTab(match.tab);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [isLoading, application]);

  // Status Progression Business Rules
  const getAvailableNextStatuses = (currentStatus: string) => {
    switch (currentStatus) {
      case 'APPLIED':
        return [
          { label: 'Applied', value: 'APPLIED' },
          { label: 'Under Review', value: 'UNDER_REVIEW' },
          { label: 'Shortlisted', value: 'SHORTLISTED' },
          { label: 'Reject Application', value: 'REJECTED' },
        ];
      case 'UNDER_REVIEW':
        return [
          { label: 'Under Review', value: 'UNDER_REVIEW' },
          { label: 'Shortlisted', value: 'SHORTLISTED' },
          { label: 'Interview Scheduled', value: 'INTERVIEW_SCHEDULED' },
          { label: 'Reject Application', value: 'REJECTED' },
        ];
      case 'SHORTLISTED':
        return [
          { label: 'Shortlisted', value: 'SHORTLISTED' },
          { label: 'Interview Scheduled', value: 'INTERVIEW_SCHEDULED' },
          { label: 'Extend Formal Offer', value: 'OFFERED' },
          { label: 'Reject Application', value: 'REJECTED' },
        ];
      case 'INTERVIEW_SCHEDULED':
        return [
          { label: 'Interview Scheduled', value: 'INTERVIEW_SCHEDULED' },
          { label: 'Extend Formal Offer', value: 'OFFERED' },
          { label: 'Reject Application', value: 'REJECTED' },
        ];
      case 'OFFERED':
        return [
          { label: 'Offered (Pending Student Acceptance)', value: 'OFFERED' },
          { label: 'Accepted / Hired', value: 'ACCEPTED' },
          { label: 'Declined by Candidate', value: 'DECLINED' },
          { label: 'Revoke / Reject Offer', value: 'REJECTED' },
        ];
      case 'ACCEPTED':
        return [
          { label: 'Accepted / Hired (Final)', value: 'ACCEPTED' },
          { label: 'Declined / Withdrawn', value: 'DECLINED' },
          { label: 'Revoke / Terminate', value: 'REJECTED' },
        ];
      case 'REJECTED':
      case 'DECLINED':
        return [
          { label: currentStatus === 'REJECTED' ? 'Rejected' : 'Declined', value: currentStatus },
          { label: 'Reopen & Review', value: 'UNDER_REVIEW' },
          { label: 'Move to Shortlisted', value: 'SHORTLISTED' },
        ];
      default:
        return [{ label: currentStatus, value: currentStatus }];
    }
  };

  const handleUpdateStatus = async (overrideStatus?: string) => {
    const statusToApply = overrideStatus || targetStatus;

    if (statusToApply === 'OFFERED') {
      router.push(`/recruiter/applications/${applicationId}/offer`);
      return;
    }

    setIsUpdatingStatus(true);
    try {
      const payload: any = {
        status: statusToApply,
        notes: noteText,
      };

      if (statusToApply === 'OFFERED') {
        payload.designation = offerDesignation;
        payload.salaryPackage = offerSalary;
        payload.location = offerLocation;
        if (offerJoiningDate) payload.joiningDate = offerJoiningDate;
        if (offerLetterUrl) payload.offerLetterUrl = offerLetterUrl;
      }

      const res = await apiClient.patch<ApiResponse<any>>(
        `/api/recruiter/applications/${applicationId}/status`,
        payload
      );

      if (res.data?.success) {
        showToast(res.data.message || `Application moved to ${statusToApply}`);
        setIsOfferModalOpen(false);
        fetchApplicationDetail();
      } else {
        showToast(res.data?.message || 'Failed to update status', 'error');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || err.message || 'Status update failed', 'error');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNoteOnly = async () => {
    if (!noteText.trim()) return;
    setIsUpdatingStatus(true);
    try {
      const res = await apiClient.patch<ApiResponse<any>>(
        `/api/recruiter/applications/${applicationId}/status`,
        {
          status: application.status,
          notes: noteText,
        }
      );
      if (res.data?.success) {
        showToast('Evaluation note saved successfully');
      }
    } catch (err: any) {
      showToast('Failed to save note', 'error');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1700px] mx-auto space-y-6 animate-pulse font-sans">
        <div className="h-6 w-72 bg-slate-200 rounded-lg" />
        <div className="h-44 bg-slate-200 rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 h-96 bg-slate-200 rounded-3xl" />
          <div className="lg:col-span-4 h-96 bg-slate-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="p-12 text-center space-y-4 max-w-lg mx-auto">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-black text-slate-800 font-heading">Application Not Found</h2>
        <p className="text-sm text-slate-500">The requested application could not be loaded or you do not have permission to view it.</p>
        <Link
          href="/recruiter/applications"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Applications</span>
        </Link>
      </div>
    );
  }

  const { student, job, resume, offer } = application;
  const user = student.user;
  const resumeLink = resume?.fileUrl || application.resumeUrl || student.resumeUrl;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPLIED':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'UNDER_REVIEW':
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
      case 'SHORTLISTED':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      case 'INTERVIEW_SCHEDULED':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
      case 'OFFERED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'ACCEPTED':
        return 'bg-teal-50 text-teal-700 border-teal-200/80';
      case 'REJECTED':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Timeline Step Completion Checks
  const isStepDone = (stepStatus: string) => {
    const order = ['APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'ACCEPTED'];
    const currentIdx = order.indexOf(application.status);
    const stepIdx = order.indexOf(stepStatus);
    return currentIdx >= stepIdx && application.status !== 'REJECTED';
  };

  // Calculate days ago
  const daysAgo = Math.floor((Date.now() - new Date(application.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  const daysAgoLabel = daysAgo === 0 ? 'Applied Today' : `${daysAgo} days ago`;

  return (
    <div className="p-3 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 pb-28 transition-all duration-300 font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-[#0A2540] text-white px-4 py-3 shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-2 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. Header Title & Previous/Next Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
              Application Review
            </h1>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-black ${getStatusColor(application.status)}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              {application.status}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Review the candidate&apos;s profile, resume, skills and other details to make an informed decision.
          </p>
        </div>

        {/* Previous & Next Applicant Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          {adjacent?.previousId && (
            <Link
              href={`/recruiter/applications/${adjacent.previousId}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-black transition-all shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Link>
          )}

          {adjacent?.nextId && (
            <Link
              href={`/recruiter/applications/${adjacent.nextId}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-black transition-all shadow-2xs"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* 2. Hero Profile Showcase Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4.5 sm:p-6 transition-all">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Avatar, Name, Academic Info & Contact Details */}
          <div className="flex items-start gap-4 sm:gap-5 min-w-0">
            {/* Avatar */}
            <div className="relative shrink-0">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl object-cover border-2 border-slate-100 shadow-md"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-linear-to-br from-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              {student.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                </div>
              )}
            </div>

            {/* Meta details */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-black text-[#0A2540] font-heading">
                  {user.name}
                </h2>
                {student.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Student
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-600">
                {student.branch} • Batch {student.batchYear}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {student.college.name} {student.college.city ? `, ${student.college.city}` : ''}
              </p>

              {/* Contact and Links Pill Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1.5 text-xs text-slate-600">
                <a href={`mailto:${user.email}`} className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user.email}</span>
                </a>
                {student.phone && (
                  <>
                    <span className="text-slate-300">•</span>
                    <a href={`tel:${student.phone}`} className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{student.phone}</span>
                    </a>
                  </>
                )}
                {student.college.city && (
                  <>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{student.college.city}{student.college.state ? `, ${student.college.state}` : ''}</span>
                    </span>
                  </>
                )}
              </div>

              {/* Social Link Badges */}
              <div className="flex items-center gap-2 pt-1">
                {student.linkedinUrl && (
                  <a
                    href={student.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-blue-200 bg-blue-50/50 text-blue-700 text-xs font-bold hover:bg-blue-100 transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {student.githubUrl && (
                  <a
                    href={student.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {student.portfolioUrl && (
                  <a
                    href={student.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-purple-200 bg-purple-50/50 text-purple-700 text-xs font-bold hover:bg-purple-100 transition-colors"
                  >
                    <span>Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bio Callout Box on Right */}
          {student.bio && (
            <div className="w-full lg:max-w-xs bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-xs text-slate-600 italic leading-relaxed">
              &ldquo;{student.bio}&rdquo;
            </div>
          )}

        </div>
      </div>

      {/* 3. Section Navigation Tabs (Sticky Bar with Smooth Navigation) */}
      <div className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur-md py-2.5 -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8 border-b border-slate-200/80 flex items-center gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] transition-all">
        {([
          { label: 'Overview', id: 'section-overview', icon: Eye },
          { label: 'Resume', id: 'section-resume', icon: FileText },
          { label: 'Skills', id: 'section-skills', icon: Code2 },
          { label: 'Education', id: 'section-education', icon: GraduationCap },
          { label: 'Experience', id: 'section-experience', icon: Briefcase },
          { label: 'Projects', id: 'section-projects', icon: Sparkles },
          { label: 'Other Details', id: 'section-other-details', icon: HelpCircle },
        ] as const).map((tabItem) => {
          const Icon = tabItem.icon;
          const isActive = activeTab === tabItem.label;
          return (
            <button
              key={tabItem.label}
              type="button"
              onClick={() => {
                setActiveTab(tabItem.label);
                const elem = document.getElementById(tabItem.id);
                if (elem) {
                  elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tabItem.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Main Two-Column Layout (Content Grid + Sticky Right Action Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left / Main Content Column (7 cols on Large screens) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Section 1: Overview / Applied For Job Card */}
          <div id="section-overview" className="scroll-mt-24 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-heading">
                Overview & Applied Role
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                {daysAgoLabel}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 font-black shadow-2xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                    <span className="font-bold text-blue-600">{job.company?.name || 'Company'}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold">{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>

              <div className="sm:text-right">
                <div className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
                  {job.salaryPackage}
                </div>
                <p className="text-[11px] text-slate-400">Offered CTC Package</p>
              </div>
            </div>
          </div>

          {/* Section 2: Resume Document Viewer */}
          <div id="section-resume" className="scroll-mt-24 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-heading">
                Resume Document
              </span>
              {resumeLink && (
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  Candidate CV
                </span>
              )}
            </div>

            {resumeLink ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 font-black shadow-2xs shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-xs sm:text-sm text-slate-800 block truncate max-w-xs">
                      {resume?.title || `${user.name}_Resume.pdf`}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      PDF Document • Uploaded {new Date(application.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={resumeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Resume</span>
                  </a>
                  <a
                    href={resumeLink}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center">
                <p className="text-xs text-slate-400 font-medium">No resume file attached to this application record.</p>
              </div>
            )}
          </div>

          {/* Section 3: Skills & Competencies */}
          <div id="section-skills" className="scroll-mt-24 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-heading">
                Technical Skills & Competencies
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {student.skills.length} skills listed
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {student.skills.length > 0 ? (
                student.skills.map((skill: string, idx: number) => {
                  const matchesJob = job.skills?.some((js: string) => js.toLowerCase() === skill.toLowerCase());
                  return (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                        matchesJob
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-500/20'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {matchesJob && <Sparkles className="w-3 h-3 text-emerald-600" />}
                      <span>{skill}</span>
                    </span>
                  );
                })
              ) : (
                <p className="text-xs text-slate-400 italic">No explicit skills listed in candidate profile.</p>
              )}
            </div>
          </div>

          {/* Section 4: Academic Details */}
          <div id="section-education" className="scroll-mt-24 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3.5">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-heading">
              Education & Academic Details
            </span>

            {/* Score metric boxes */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-center">
                <div className="text-lg sm:text-xl font-black text-blue-700 font-heading">
                  {student.cgpa.toFixed(2)}
                </div>
                <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  CGPA / 10
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
                <div className="text-lg sm:text-xl font-black text-slate-800 font-heading">
                  {student.tenthMarks ? `${student.tenthMarks}%` : '—'}
                </div>
                <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  10th Grade
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
                <div className="text-lg sm:text-xl font-black text-slate-800 font-heading">
                  {student.twelfthMarks ? `${student.twelfthMarks}%` : '—'}
                </div>
                <p className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  12th Grade
                </p>
              </div>
            </div>

            {/* Branch and College details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="text-[11px] text-slate-400 block">Degree & Branch</span>
                <span className="font-bold text-slate-800">{student.branch}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="text-[11px] text-slate-400 block">Graduation Batch Year</span>
                <span className="font-bold text-slate-800">{student.batchYear}</span>
              </div>
              <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="text-[11px] text-slate-400 block">Institution / University</span>
                <span className="font-bold text-slate-800">{student.college.name}</span>
              </div>
            </div>
          </div>

          {/* Section 5: Work & Internship Experience */}
          <div id="section-experience" className="scroll-mt-24 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-heading">
                Work & Internship Experience
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                Prior Exposure
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                      Software Development Intern
                    </h4>
                    <p className="text-xs text-blue-600 font-medium">Tech Solutions Inc. • Internship</p>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200 self-start sm:self-auto">
                    May 2024 - July 2024 (3 mos)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Collaborated on scalable microservices using TypeScript and Next.js. Optimized database query performance and implemented automated unit test suites.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Projects Portfolio */}
          <div id="section-projects" className="scroll-mt-24 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-heading">
                Projects Portfolio
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                Featured Work
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                    Campus Placement & Recruitment Portal
                  </h4>
                  <span className="text-[11px] font-bold text-blue-600">Next.js • PostgreSQL • Prisma</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Developed an end-to-end recruitment platform with role-based access control (RBAC), multi-stage candidate pipelines, and automated offer letter issuance.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                    High-Throughput Bus Booking Engine
                  </h4>
                  <span className="text-[11px] font-bold text-purple-600">React • Node.js • Redis</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Engineered a distributed seat reservation engine handling high concurrency locks and optimistic seat holds with real-time socket updates.
                </p>
              </div>
            </div>
          </div>

          {/* Section 7: Additional Information */}
          <div id="section-other-details" className="scroll-mt-24 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-heading">
              Additional Candidate Information
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="text-slate-400 block text-[11px]">Opportunity Interest</span>
                <span className="font-bold text-slate-800">Full Time & Internship (FTE)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="text-slate-400 block text-[11px]">Earliest Joining Availability</span>
                <span className="font-bold text-slate-800">Immediate / Next Batch</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="text-slate-400 block text-[11px]">Relocation Preference</span>
                <span className="font-bold text-slate-800">Open to Relocate (Bangalore/Hyderabad/Pune)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="text-slate-400 block text-[11px]">Notice Period</span>
                <span className="font-bold text-slate-800">Not Applicable (Fresher / Student)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Action Panel (5 cols on Large screens) */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
          
          {/* Action Box 1: Update Status */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-heading">
                Application Status
              </span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${getStatusColor(application.status)}`}>
                {application.status}
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 block">
                Advance Candidate Stage
              </label>
              <select
                value={targetStatus}
                onChange={(e) => setTargetStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer shadow-2xs"
              >
                {getAvailableNextStatuses(application.status).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              disabled={isUpdatingStatus || targetStatus === application.status}
              onClick={() => handleUpdateStatus()}
              className="w-full py-2.5 px-4 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black transition-all shadow-md shadow-blue-500/20 hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUpdatingStatus ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>Update Status</span>
            </button>
          </div>

          {/* Action Box 2: Reviewer Notes */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-heading">
                Add Evaluation Note
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                Team Visible
              </span>
            </div>

            <textarea
              rows={3}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write a private note about candidate's technical round, CGPA, or interview schedule..."
              className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 font-medium transition-all"
            />

            <button
              type="button"
              disabled={isUpdatingStatus}
              onClick={handleSaveNoteOnly}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              Save Note
            </button>
          </div>

          {/* Action Box 3: Pipeline Timeline Stepper */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-heading">
              Pipeline Timeline
            </span>

            <div className="space-y-3 text-xs relative pl-2 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              
              {/* Step 1: Application Submitted */}
              <div className="flex items-start gap-3 relative">
                <div className={`h-3.5 w-3.5 rounded-full border-2 border-white ring-2 ring-slate-100 shrink-0 mt-0.5 ${
                  isStepDone('APPLIED') ? 'bg-blue-600' : 'bg-slate-300'
                }`} />
                <div>
                  <span className="font-bold text-slate-800 block">Application Submitted</span>
                  <span className="text-[11px] text-slate-400">{new Date(application.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Step 2: Under Review */}
              <div className="flex items-start gap-3 relative">
                <div className={`h-3.5 w-3.5 rounded-full border-2 border-white ring-2 ring-slate-100 shrink-0 mt-0.5 ${
                  isStepDone('UNDER_REVIEW') ? 'bg-blue-600' : 'bg-slate-300'
                }`} />
                <div>
                  <span className="font-bold text-slate-800 block">Under Review</span>
                  <span className="text-[11px] text-slate-400">
                    {isStepDone('UNDER_REVIEW') ? 'Screening Completed' : 'Pending Screening'}
                  </span>
                </div>
              </div>

              {/* Step 3: Shortlisted */}
              <div className="flex items-start gap-3 relative">
                <div className={`h-3.5 w-3.5 rounded-full border-2 border-white ring-2 ring-slate-100 shrink-0 mt-0.5 ${
                  isStepDone('SHORTLISTED') ? 'bg-purple-600' : 'bg-slate-300'
                }`} />
                <div>
                  <span className="font-bold text-slate-800 block">Shortlisted</span>
                  <span className="text-[11px] text-slate-400">
                    {isStepDone('SHORTLISTED') ? 'Qualified for Interview' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Step 4: Interview Scheduled */}
              <div className="flex items-start gap-3 relative">
                <div className={`h-3.5 w-3.5 rounded-full border-2 border-white ring-2 ring-slate-100 shrink-0 mt-0.5 ${
                  isStepDone('INTERVIEW_SCHEDULED') ? 'bg-indigo-600' : 'bg-slate-300'
                }`} />
                <div>
                  <span className="font-bold text-slate-800 block">Interview Round</span>
                  <span className="text-[11px] text-slate-400">
                    {isStepDone('INTERVIEW_SCHEDULED') ? 'Interview In Progress' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Step 5: Offer Extended */}
              <div className="flex items-start gap-3 relative">
                <div className={`h-3.5 w-3.5 rounded-full border-2 border-white ring-2 ring-slate-100 shrink-0 mt-0.5 ${
                  isStepDone('OFFERED') ? 'bg-emerald-600' : 'bg-slate-300'
                }`} />
                <div>
                  <span className="font-bold text-slate-800 block">Offer Letter</span>
                  <span className="text-[11px] text-slate-400">
                    {offer ? `Offered ${offer.salaryPackage}` : 'Pending final decision'}
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Action Shortcuts */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <Link
                href={`/recruiter/applications/${applicationId}/offer`}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>{application.status === 'OFFERED' ? 'View / Update Offer Letter' : 'Generate & Dispatch Offer'}</span>
              </Link>

              {application.status === 'SHORTLISTED' && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('INTERVIEW_SCHEDULED')}
                  className="w-full py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Interview</span>
                </button>
              )}

              {application.status !== 'REJECTED' && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('REJECTED')}
                  className="w-full py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject Application</span>
                </button>
              )}

              <Link
                href="/recruiter/applications"
                className="w-full py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>View All Applications</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* 5. Dynamic Modal for Extending Formal Offer Letter */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-6 space-y-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0A2540] font-heading">
                    Extend Formal Offer
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">To {user.name} ({student.college.name})</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOfferModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Designation / Role Title</label>
                <input
                  type="text"
                  value={offerDesignation}
                  onChange={(e) => setOfferDesignation(e.target.value)}
                  placeholder="e.g. Associate Software Engineer"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Annual Salary Package (CTC)</label>
                <input
                  type="text"
                  value={offerSalary}
                  onChange={(e) => setOfferSalary(e.target.value)}
                  placeholder="e.g. 14.5 LPA"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Work Location</label>
                <input
                  type="text"
                  value={offerLocation}
                  onChange={(e) => setOfferLocation(e.target.value)}
                  placeholder="e.g. Bangalore (Hybrid)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Expected Joining Date</label>
                <input
                  type="date"
                  value={offerJoiningDate}
                  onChange={(e) => setOfferJoiningDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Offer Letter Document URL (PDF)</label>
                <input
                  type="url"
                  value={offerLetterUrl}
                  onChange={(e) => setOfferLetterUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsOfferModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isUpdatingStatus}
                onClick={() => handleUpdateStatus('OFFERED')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                {isUpdatingStatus ? <Loader2 className="w-4 h-4 animate-spin" /> : <Award className="w-4 h-4" />}
                <span>Confirm & Send Offer</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
