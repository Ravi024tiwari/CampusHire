'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import {
  ArrowLeft,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Send,
  Upload,
  User,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Loader2,
  Eye,
  Trash2,
  Briefcase,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface RecruiterOfferPageProps {
  params: Promise<{ id: string }>;
}

export default function RecruiterCreateOfferPage({ params }: RecruiterOfferPageProps) {
  const router = useRouter();
  const { id: applicationId } = use(params);

  const [application, setApplication] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Offer Form States
  const [designation, setDesignation] = useState('');
  const [salaryPackage, setSalaryPackage] = useState('');
  const [location, setLocation] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [notes, setNotes] = useState('');
  const [letterUrl, setLetterUrl] = useState('');
  const [letterFileName, setLetterFileName] = useState('');

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  useEffect(() => {
    const fetchApplication = async () => {
      setIsLoading(true);
      try {
        const res = await apiClient.get<ApiResponse<{ application: any }>>(
          `/api/recruiter/applications/${applicationId}`
        );
        if (res.data?.success && res.data.data?.application) {
          const app = res.data.data.application;
          setApplication(app);

          // Pre-populate with existing offer or job defaults
          setDesignation(app.offer?.designation || app.job?.title || '');
          setSalaryPackage(app.offer?.salaryPackage || app.job?.salaryPackage || '');
          setLocation(app.offer?.location || app.job?.location || '');
          if (app.offer?.joiningDate) {
            setJoiningDate(new Date(app.offer.joiningDate).toISOString().slice(0, 10));
          }
          if (app.offer?.expiresAt) {
            setExpiresAt(new Date(app.offer.expiresAt).toISOString().slice(0, 10));
          } else {
            // Default 7 days from now
            const defaultExpiry = new Date();
            defaultExpiry.setDate(defaultExpiry.getDate() + 7);
            setExpiresAt(defaultExpiry.toISOString().slice(0, 10));
          }
          if (app.offer?.notes) setNotes(app.offer.notes);
          if (app.offer?.letterUrl) {
            setLetterUrl(app.offer.letterUrl);
            setLetterFileName('Official_Offer_Letter.pdf');
          }
        } else {
          showToast(res.data?.message || 'Failed to load application data', 'error');
        }
      } catch (err: any) {
        showToast(err.response?.data?.message || err.message || 'Network error loading application', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId]);

  // Handle PDF Upload to Cloudinary
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setUploadError('Only PDF files are supported for official offer letters.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setUploadError('File size exceeds 15MB limit.');
      return;
    }

    setUploadError(null);
    setIsUploadingPdf(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'offer-letters');

      const res = await apiClient.post<ApiResponse<{ url: string; secure_url: string; original_filename?: string }>>(
        '/api/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (res.data?.success && res.data.data) {
        const uploadedUrl = res.data.data.secure_url || res.data.data.url;
        setLetterUrl(uploadedUrl);
        setLetterFileName(file.name);
        showToast('Offer letter PDF uploaded successfully!');
      } else {
        setUploadError(res.data?.message || 'Upload failed');
      }
    } catch (err: any) {
      setUploadError(err.response?.data?.message || err.message || 'Error uploading PDF file');
    } finally {
      setIsUploadingPdf(false);
    }
  };

  // Submit and Issue Offer
  const handleSubmitOffer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!designation.trim()) {
      showToast('Please provide a designation/job title.', 'error');
      return;
    }
    if (!salaryPackage.trim()) {
      showToast('Please enter the compensation package (CTC/Stipend).', 'error');
      return;
    }
    if (!location.trim()) {
      showToast('Please enter work location.', 'error');
      return;
    }
    if (!letterUrl) {
      showToast('Please upload the official Offer Letter PDF before issuing.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        applicationId,
        designation,
        salaryPackage,
        location,
        joiningDate: joiningDate ? new Date(joiningDate).toISOString() : null,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
        letterUrl,
        notes: notes.trim() || null,
      };

      const res = await apiClient.post<ApiResponse<any>>('/api/recruiter/offers', payload);

      if (res.data?.success) {
        showToast('🎉 Offer Letter issued and emailed to student successfully!');
        setTimeout(() => {
          router.push(`/recruiter/applications/${applicationId}`);
        }, 1500);
      } else {
        showToast(res.data?.message || 'Failed to issue offer', 'error');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || err.message || 'Error creating placement offer', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-sm font-semibold text-slate-600">Loading applicant & offer workspace...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center justify-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Application Not Found</h2>
        <p className="text-sm text-slate-600 mb-6">The requested candidate application does not exist or access is restricted.</p>
        <Link
          href="/recruiter/applications"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Applications
        </Link>
      </div>
    );
  }

  const student = application.student;
  const userObj = student?.user;
  const job = application.job;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium transition-all animate-in fade-in slide-in-from-top-4 ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/recruiter/applications/${applicationId}`}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  Placement Drive 2026
                </span>
                <span className="text-xs text-slate-400 font-medium">•</span>
                <span className="text-xs text-slate-500 font-semibold">{job?.title}</span>
              </div>
              <h1 className="text-xl font-black text-[#0A2540] tracking-tight mt-0.5">
                Generate & Dispatch Official Offer Letter
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/recruiter/applications/${applicationId}`}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              Cancel
            </Link>
            <button
              onClick={handleSubmitOffer}
              disabled={isSubmitting || isUploadingPdf || !letterUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Issuing & Sending Email...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Issue & Dispatch Offer</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Candidate & Drive Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Candidate Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <Avatar className="h-14 w-14 border-2 border-blue-100 shadow-xs">
                  {userObj?.avatarUrl && <AvatarImage src={userObj.avatarUrl} alt={userObj.name} />}
                  <AvatarFallback className="bg-gradient-to-br from-[#0A2540] to-blue-600 text-white font-bold text-lg">
                    {userObj?.name?.charAt(0) || 'S'}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h3 className="text-base font-extrabold text-[#0A2540] truncate">{userObj?.name}</h3>
                  <p className="text-xs text-slate-500 font-medium truncate">{userObj?.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Candidate Profile Verified
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <GraduationCap className="w-3.5 h-3.5" /> Branch / Batch
                  </span>
                  <span className="font-bold text-slate-800">{student?.branch || 'N/A'} ({student?.batchYear || '2026'})</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Building2 className="w-3.5 h-3.5" /> College
                  </span>
                  <span className="font-bold text-slate-800 text-right truncate max-w-[170px]">{student?.college?.name || 'DTU'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Award className="w-3.5 h-3.5" /> CGPA
                  </span>
                  <span className="font-bold text-emerald-600">{student?.cgpa ? `${student.cgpa} / 10.0` : 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5" /> Applied Date
                  </span>
                  <span className="font-medium text-slate-700">
                    {new Date(application.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {application.resumeUrl && (
                <div className="pt-3 border-t border-slate-100">
                  <a
                    href={application.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-xs font-bold text-slate-700 transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>View Candidate Resume</span>
                  </a>
                </div>
              )}
            </div>

            {/* Email Dispatch Preview Alert */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-blue-50/90 border border-blue-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-extrabold text-xs">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Automated Email Dispatch</span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-blue-950/80 font-medium">
                Upon submitting this form, an official placement email will be automatically sent to{' '}
                <strong className="text-blue-900">{userObj?.email}</strong> with your uploaded Offer Letter PDF attached.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-blue-800 bg-white/70 px-3 py-2 rounded-lg border border-blue-100">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Powered by Resend with verified domain</span>
              </div>
            </div>

          </div>

          {/* Right Column: Offer Details & PDF Upload Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmitOffer} className="space-y-6">
              
              {/* Section 1: Offer Letter PDF Upload */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div>
                  <h2 className="text-base font-extrabold text-[#0A2540] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    1. Upload Official Offer Letter PDF
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Upload the official signed PDF offer letter from your company that will be delivered to the student.
                  </p>
                </div>

                {!letterUrl ? (
                  <div className="relative border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 text-center transition bg-slate-50/50 hover:bg-blue-50/30">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfUpload}
                      disabled={isUploadingPdf}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
                        {isUploadingPdf ? (
                          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                        ) : (
                          <Upload className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {isUploadingPdf ? 'Uploading PDF to secure cloud storage...' : 'Click to browse or drag & drop PDF here'}
                        </p>
                        <p className="text-xs text-slate-400 font-medium mt-1">
                          Supported format: PDF only (Max 15MB)
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-emerald-900">{letterFileName || 'Official_Offer_Letter.pdf'}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-semibold text-emerald-700">✓ Uploaded & Ready to Attach</span>
                          <span className="text-[11px] text-slate-400">•</span>
                          <a
                            href={letterUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline"
                          >
                            <Eye className="w-3 h-3" /> Preview PDF
                          </a>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setLetterUrl('');
                        setLetterFileName('');
                      }}
                      className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                      title="Remove PDF and upload new one"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {uploadError && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>

              {/* Section 2: Compensation & Offer Details */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-5">
                <div>
                  <h2 className="text-base font-extrabold text-[#0A2540] flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    2. Position & Compensation Breakdown
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    These key terms will appear prominently in the student dashboard and email summary.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Designation */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Offered Designation / Role <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. Associate Software Engineer"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                        required
                      />
                    </div>
                  </div>

                  {/* CTC Package */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Compensation (CTC / Stipend) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={salaryPackage}
                        onChange={(e) => setSalaryPackage(e.target.value)}
                        placeholder="e.g. ₹16.0 LPA or ₹50,000/month"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Work Location */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Job Location & Work Mode <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Bangalore (Hybrid)"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Expected Joining Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Expected Date of Joining
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>
                  </div>

                  {/* Offer Validity / Expiry Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Offer Response Deadline (Expiry Date)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        value={expiresAt}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>
                    <p className="text-[10.5px] text-slate-400 mt-1 font-medium">Candidate will have until this date to accept or decline.</p>
                  </div>

                </div>

                {/* Recruiter Notes / Special Terms */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Recruiter Remarks & Terms (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Includes ₹1,00,000 relocation bonus. Final semester degree completion required with minimum 60% aggregate."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="flex items-center justify-between p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div>
                  <p className="text-xs font-bold text-slate-800">Ready to issue this offer?</p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    This will lock the offer terms, upload the letter, and email the candidate immediately.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/recruiter/applications/${applicationId}`}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                  >
                    Discard
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting || isUploadingPdf || !letterUrl}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Offer Email...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Issue & Dispatch Offer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
