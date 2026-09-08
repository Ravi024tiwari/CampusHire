'use strict';
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  ArrowLeft, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  Award, 
  Calendar, 
  ShieldCheck, 
  Loader2, 
  Save, 
  AlertCircle, 
  Sparkles, 
  GraduationCap, 
  Check, 
  X,
  FileCheck,
  ChevronRight,
  Globe
} from 'lucide-react';

interface ApplicationDetailData {
  id: string;
  createdAt: string;
  status: string;
  resumeUrl?: string | null;
  notes?: string | null;
  student: {
    id: string;
    userId: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    enrollmentNumber: string;
    branch: string;
    batchYear: number;
    cgpa: number;
    phone?: string | null;
    college?: {
      id: string;
      name: string;
      code?: string | null;
    };
  };
  job: {
    id: string;
    title: string;
    type: string;
    location: string;
    salaryPackage: string;
    deadline: string;
    status: string;
    company: {
      id: string;
      name: string;
      logoUrl?: string | null;
      website?: string | null;
      location?: string | null;
    };
  };
  offer?: {
    id: string;
    designation?: string;
    salaryPackage?: string;
    status?: string;
  } | null;
}

export function TpoApplicationDetailClient({ applicationId }: { applicationId: string }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [application, setApplication] = useState<ApplicationDetailData | null>(null);

  const [currentStatus, setCurrentStatus] = useState<string>('APPLIED');
  const [notes, setNotes] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load application details from backend
  const loadApplication = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await axios.get(`/api/tpo/applications/${applicationId}`);
      if (res.data.success && res.data.data) {
        const app = res.data.data;
        // Normalize student name/email
        const normalizedData: ApplicationDetailData = {
          ...app,
          student: {
            ...app.student,
            name: app.student.user?.name || app.student.name || 'Candidate Student',
            email: app.student.user?.email || app.student.email || '',
            avatarUrl: app.student.user?.avatarUrl || app.student.avatarUrl || null,
          },
        };
        setApplication(normalizedData);
        setCurrentStatus(normalizedData.status || 'APPLIED');
        setNotes(normalizedData.notes || '');
      }
    } catch (err: any) {
      console.error('Failed to load application:', err);
      setErrorMsg('Failed to load application details from server.');
    } finally {
      setIsLoading(false);
    }
  }, [applicationId]);

  useEffect(() => {
    loadApplication();
  }, [loadApplication]);

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg(null);
    setSaveSuccess(false);

    try {
      const res = await axios.patch(`/api/tpo/applications/${applicationId}`, {
        status: currentStatus,
        notes: notes.trim(),
      });
      if (res.data.success) {
        setSaveSuccess(true);
        if (application) {
          setApplication({
            ...application,
            status: currentStatus,
            notes: notes.trim(),
          });
        }
        setTimeout(() => setSaveSuccess(false), 3500);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Failed to update application status.');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const stages = [
    { id: 'APPLIED', label: 'Applied' },
    { id: 'UNDER_REVIEW', label: 'Under Review' },
    { id: 'SHORTLISTED', label: 'Shortlisted' },
    { id: 'INTERVIEW_SCHEDULED', label: 'Interview' },
    { id: 'OFFERED', label: 'Offered' },
  ];

  const getStageIndex = (status: string) => {
    const idx = stages.findIndex((s) => s.id === status);
    return idx >= 0 ? idx : 0;
  };

  const currentStageIdx = getStageIndex(currentStatus);

  const getStageBadge = (status: string) => {
    switch (status) {
      case 'SHORTLISTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
            Shortlisted
          </span>
        );
      case 'UNDER_REVIEW':
      case 'APPLIED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            Under Review
          </span>
        );
      case 'INTERVIEW_SCHEDULED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            Interview Scheduled
          </span>
        );
      case 'OFFERED':
      case 'ACCEPTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Offer Released
          </span>
        );
      case 'REJECTED':
      case 'DECLINED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 shadow-2xs">
            {status}
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-200 flex items-center justify-center shadow-xs animate-pulse">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Loading Application Dossier...
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Retrieving candidate profile, drive details, verified resume, and stage history.
          </p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="p-10 max-w-lg mx-auto text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4 my-12">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-lg font-black text-slate-900">Application Not Found</h3>
        <p className="text-xs text-slate-500">
          The requested application could not be found or you do not have permission to view it.
        </p>
        <Link
          href="/tpo/applications"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Applications</span>
        </Link>
      </div>
    );
  }

  const { student, job, offer } = application;

  return (
    <div className="p-3.5 sm:p-5 md:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-7 transition-all duration-300 ease-in-out pb-28 md:pb-16">
      
      {/* 1. Breadcrumb & Back Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
          <Link
            href="/tpo/applications"
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Applications Roster</span>
          </Link>
          <span>/</span>
          <span className="text-[#0A2540] font-black truncate max-w-[200px] sm:max-w-none">
            {student.name} — {job.title} ({job.company?.name})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {getStageBadge(currentStatus)}
        </div>
      </div>

      {/* 2. Application Hero Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-[0_2px_10px_rgba(15,23,42,0.04)] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          {/* Candidate & Job Titles */}
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            {/* Student Avatar */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-xs flex items-center justify-center">
                {student.avatarUrl ? (
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-xl flex items-center justify-center">
                    {student.name?.[0] || 'S'}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-white shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Candidate & Role Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-black text-[#0A2540] tracking-tight">
                  {student.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-black border border-blue-100">
                  {student.branch} &bull; Batch {student.batchYear}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1 flex items-center gap-2 flex-wrap">
                <span className="text-blue-600">{job.title}</span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-slate-800">{job.company?.name}</span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-emerald-600 font-black">{job.salaryPackage}</span>
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-1.5 flex-wrap">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{student.email}</span>
                </span>
                {student.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{student.phone}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <Link
              href={`/tpo/students/${student.id}`}
              className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Full Candidate Dossier</span>
              <ExternalLink className="w-3 h-3 text-blue-500" />
            </Link>

            {application.resumeUrl && (
              <a
                href={application.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>
            )}
          </div>
        </div>

        {/* Pipeline Stage Visual Progress Stepper */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Application Pipeline Progression
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {stages.map((stage, idx) => {
              const isPassed = idx <= currentStageIdx;
              const isCurrent = idx === currentStageIdx;

              return (
                <div
                  key={stage.id}
                  className={`p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-100 shadow-xs'
                      : isPassed
                      ? 'bg-emerald-50/40 border-emerald-300'
                      : 'bg-slate-50/60 border-slate-200/80 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    {isPassed && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <p className="text-xs font-black text-slate-800 mt-2">
                    {stage.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Main Detail Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Dossier Snapshots (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section A: Academic Profile Matrix */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-black text-[#0A2540] tracking-tight">
                    Candidate Academic Credentials
                  </h2>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Verified academic transcript and institutional enrollment record
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase">Enrollment No.</span>
                <p className="font-mono font-bold text-slate-900">{student.enrollmentNumber || 'N/A'}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase">Degree Branch</span>
                <p className="font-bold text-slate-900">{student.branch}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase">Passing Batch</span>
                <p className="font-bold text-slate-900">Batch {student.batchYear}</p>
              </div>

              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-0.5">
                <span className="text-[10.5px] font-bold text-emerald-700 uppercase">Cumulative CGPA</span>
                <p className="text-base font-black text-emerald-700">{student.cgpa} / 10</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase">Application Date</span>
                <p className="font-bold text-slate-900">{formatDate(application.createdAt)}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase">Candidate Status</span>
                <p className="font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Eligible & Active</span>
                </p>
              </div>
            </div>
          </div>

          {/* Section B: Recruitment Drive Specification */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-black text-[#0A2540] tracking-tight">
                    Recruitment Drive Overview
                  </h2>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Corporate job specification, package breakdown, and campus terms
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-bold text-[10.5px] uppercase">Hiring Company</span>
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  {job.company?.name}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-bold text-[10.5px] uppercase">Job Title</span>
                <p className="font-bold text-slate-900 text-sm">{job.title}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-bold text-[10.5px] uppercase">Compensation Package</span>
                <p className="font-black text-blue-600 text-sm">{job.salaryPackage}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-bold text-[10.5px] uppercase">Location / Work Mode</span>
                <p className="font-bold text-slate-800">{job.location}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-bold text-[10.5px] uppercase">Employment Type</span>
                <p className="font-bold text-slate-800">{job.type || 'Full Time'}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-bold text-[10.5px] uppercase">Application Deadline</span>
                <p className="font-bold text-slate-800">{formatDate(job.deadline)}</p>
              </div>
            </div>
          </div>

          {/* Section C: Candidate Resume Viewer */}
          {application.resumeUrl && (
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-black text-[#0A2540] tracking-tight">
                      Submitted Candidate Resume
                    </h2>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Official verified PDF resume attached to this application
                    </p>
                  </div>
                </div>

                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full PDF</span>
                </a>
              </div>

              <div className="h-[420px] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <iframe
                  src={`${application.resumeUrl}#toolbar=0`}
                  title="Candidate Resume"
                  className="w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Section D: Offer Letter Snapshot (If available) */}
          {offer && (
            <div className="bg-emerald-50/60 rounded-2xl sm:rounded-3xl border border-emerald-200 p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-emerald-950">
                      Formal Placement Offer Extended
                    </h3>
                    <p className="text-[11px] text-emerald-700 font-medium">
                      Official recruitment contract issued by {job.company?.name}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                  {offer.status || 'Active Offer'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                <div>
                  <span className="text-emerald-800 font-bold text-[10.5px] uppercase">Offered Designation</span>
                  <p className="text-sm font-black text-emerald-950">{offer.designation || job.title}</p>
                </div>
                <div>
                  <span className="text-emerald-800 font-bold text-[10.5px] uppercase">Package CTC</span>
                  <p className="text-sm font-black text-emerald-950">{offer.salaryPackage || job.salaryPackage}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Stage & Notes Actions (4 Cols, Sticky) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
          
          {/* TPO Status Management Card */}
          <form onSubmit={handleSaveStatus} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-[#0A2540] tracking-tight">
                TPO Stage Management
              </h3>
              <span className="text-[10.5px] font-bold text-slate-400 uppercase">
                Authorized TPO
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Application stage updated successfully!</span>
              </div>
            )}

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Update Candidate Stage
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/80 hover:bg-slate-50 focus:bg-white text-xs sm:text-sm font-bold text-slate-900 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-colors cursor-pointer"
                >
                  <option value="APPLIED">Applied (Pending Review)</option>
                  <option value="UNDER_REVIEW">Under Review (Screening)</option>
                  <option value="SHORTLISTED">Shortlisted (OA Assessment)</option>
                  <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
                  <option value="OFFERED">Offered / Selected</option>
                  <option value="REJECTED">Rejected / Unqualified</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Internal Placement Notes
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add evaluation notes, interviewer remarks, or screening feedback..."
                  className="w-full px-3.5 py-2.5 bg-slate-50/80 hover:bg-slate-50 focus:bg-white text-xs font-medium text-slate-900 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Updates...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Stage Changes</span>
                </>
              )}
            </button>
          </form>

          {/* Company Channels Snapshot */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3.5 text-xs">
            <h4 className="font-bold text-slate-900 pb-2 border-b border-slate-100">
              Company Coordination
            </h4>

            <div className="space-y-2 text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Company</span>
                <span className="font-bold text-slate-800">{job.company?.name}</span>
              </div>
              {job.company?.website && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Website</span>
                  <a
                    href={job.company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-bold hover:underline truncate max-w-[150px]"
                  >
                    {job.company.website.replace('https://', '')}
                  </a>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Drive Status</span>
                <span className="font-bold text-emerald-600">Active Campus Drive</span>
              </div>
            </div>
          </div>

          {/* Application Metadata Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Application ID:</span>
              <span className="font-mono text-slate-700">{application.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Submitted On:</span>
              <span className="text-slate-700 font-medium">{formatDate(application.createdAt)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
