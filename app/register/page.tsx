'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { BrandLogo } from '@/components/BrandLogo';
import { useAuthStore } from '@/store';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { 
  Building2, 
  GraduationCap, 
  Upload, 
  X, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Lock, 
  Globe, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Building
} from 'lucide-react';

interface CollegeOption {
  id: string;
  name: string;
  code: string | null;
  city: string | null;
  state: string | null;
}

interface SubmittedCollegeDetails {
  name: string;
  code?: string;
  domain?: string;
  city?: string;
  state?: string;
  contactEmail?: string;
  contactPhone?: string;
  logoUrl?: string;
}

interface SubmittedCompanyDetails {
  name: string;
  email: string;
  website?: string;
  industry?: string;
  location?: string;
  description?: string;
  logoUrl?: string;
}

type RegistrationTab = 'STUDENT' | 'COMPANY' | 'TPO_ADMIN';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);

  // Active Tab State (Student, Company Entity, College Institution)
  const [tab, setTab] = useState<RegistrationTab>('STUDENT');

  // Student Credentials & Data
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [batchYear, setBatchYear] = useState(new Date().getFullYear());
  const [cgpa, setCgpa] = useState('');

  // Company Direct Account Credentials & Profile
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('Information Technology & Services');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyLogoUrl, setCompanyLogoUrl] = useState('');

  // College Institution Specific Fields
  const [collegeName, setCollegeName] = useState('');
  const [collegeCode, setCollegeCode] = useState('');
  const [collegeDomain, setCollegeDomain] = useState('');
  const [collegeCity, setCollegeCity] = useState('');
  const [collegeState, setCollegeState] = useState('');
  const [collegeContactEmail, setCollegeContactEmail] = useState('');
  const [collegeContactPhone, setCollegeContactPhone] = useState('');
  const [collegeLogoUrl, setCollegeLogoUrl] = useState('');

  // Image Upload State
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  // Submission Confirmations
  const [submittedCollege, setSubmittedCollege] = useState<SubmittedCollegeDetails | null>(null);
  const [submittedCompany, setSubmittedCompany] = useState<SubmittedCompanyDetails | null>(null);

  // Verified Colleges List (For Student selection)
  const [colleges, setColleges] = useState<CollegeOption[]>([]);
  const [isLoadingColleges, setIsLoadingColleges] = useState(false);

  // Form State
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (newTab: RegistrationTab) => {
    if (newTab === tab) return;

    setTab(newTab);
    setError(null);
    setImageUploadError(null);
    setSubmittedCollege(null);
    setSubmittedCompany(null);
  };

  // Sync tab from URL query param if present
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'COMPANY' || roleParam === 'RECRUITER') {
      setTab('COMPANY');
    } else if (roleParam === 'TPO_ADMIN' || roleParam === 'COLLEGE') {
      setTab('TPO_ADMIN');
    } else if (roleParam === 'STUDENT') {
      setTab('STUDENT');
    }
  }, [searchParams]);

  // Fetch verified colleges when Student tab is active
  useEffect(() => {
    if (tab !== 'STUDENT') return;

    async function fetchColleges() {
      try {
        setIsLoadingColleges(true);
        const response = await apiClient.get<ApiResponse<{ colleges: CollegeOption[] }>>('/api/colleges?isVerified=true&limit=50');
        const data = response.data;
        if (data.success && data.data?.colleges) {
          setColleges(data.data.colleges);
          if (data.data.colleges.length > 0 && !collegeId) {
            setCollegeId(data.data.colleges[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load colleges', err);
      } finally {
        setIsLoadingColleges(false);
      }
    }
    fetchColleges();
  }, [tab]);

  // Handle image upload (Company Logo or College Campus Photo)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: 'logo' | 'college_campus') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setImageUploadError('Image size exceeds 10MB limit.');
      return;
    }

    setIsUploadingImage(true);
    setImageUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      const res = await apiClient.post<ApiResponse<{ url: string }>>('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success && res.data.data?.url) {
        if (category === 'logo') {
          setCompanyLogoUrl(res.data.data.url);
        } else {
          setCollegeLogoUrl(res.data.data.url);
        }
      } else {
        throw new Error(res.data.error || 'Failed to upload image');
      }
    } catch (err: any) {
      setImageUploadError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. INSTITUTIONAL COLLEGE REGISTRATION FLOW
      if (tab === 'TPO_ADMIN') {
        if (!collegeName.trim()) {
          throw new Error('Please enter your official College or University name');
        }

        const collegePayload = {
          name: collegeName.trim(),
          code: collegeCode.trim() || undefined,
          domain: collegeDomain.trim() || undefined,
          city: collegeCity.trim() || undefined,
          state: collegeState.trim() || undefined,
          contactEmail: collegeContactEmail.trim() || undefined,
          contactPhone: collegeContactPhone.trim() || undefined,
          logoUrl: collegeLogoUrl.trim() || undefined,
        };

        const res = await apiClient.post<ApiResponse<any>>('/api/colleges', collegePayload);

        if (res.data.success) {
          setSubmittedCollege(collegePayload);
        } else {
          throw new Error(res.data.error || 'Failed to submit college registration');
        }
        return;
      }

      // 2. DIRECT COMPANY REGISTRATION FLOW (Registers company with login email & password)
      if (tab === 'COMPANY') {
        if (!companyName.trim()) {
          throw new Error('Please enter your official company name');
        }
        if (!companyEmail.trim()) {
          throw new Error('Please enter an official company work email');
        }
        if (!companyPassword || companyPassword.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }

        const companyPayload = {
          role: 'RECRUITER',
          companyName: companyName.trim(),
          email: companyEmail.trim().toLowerCase(),
          password: companyPassword,
          website: companyWebsite.trim() || undefined,
          industry: companyIndustry.trim() || undefined,
          location: companyLocation.trim() || undefined,
          description: companyDescription.trim() || undefined,
          logoUrl: companyLogoUrl.trim() || undefined,
        };

        const res = await apiClient.post<ApiResponse<any>>('/api/auth/register', companyPayload);

        if (res.data.success) {
          setSubmittedCompany({
            name: companyName.trim(),
            email: companyEmail.trim().toLowerCase(),
            website: companyWebsite.trim() || undefined,
            industry: companyIndustry.trim() || undefined,
            location: companyLocation.trim() || undefined,
            description: companyDescription.trim() || undefined,
            logoUrl: companyLogoUrl.trim() || undefined,
          });
        } else {
          throw new Error(res.data.error || 'Failed to submit company registration');
        }
        return;
      }

      // 3. STUDENT REGISTRATION FLOW
      if (tab === 'STUDENT') {
        if (!collegeId) {
          throw new Error('Please select your verified college. If your college is not listed, your institution must register first.');
        }
        if (!enrollmentNumber.trim()) {
          throw new Error('Please enter your enrollment or roll number');
        }
        const parsedCgpa = parseFloat(cgpa);
        if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10) {
          throw new Error('Please enter a valid CGPA between 0 and 10');
        }

        const payload = {
          name: studentName.trim(),
          email: studentEmail.trim().toLowerCase(),
          password: studentPassword,
          role: 'STUDENT',
          collegeId,
          enrollmentNumber: enrollmentNumber.trim(),
          branch,
          batchYear: Number(batchYear),
          cgpa: parsedCgpa,
        };

        const response = await apiClient.post<ApiResponse<{ user: any }>>('/api/auth/register', payload);
        const result = response.data;
        const userData = result.data?.user;

        if (userData) {
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            avatarUrl: userData.avatarUrl,
            isActive: userData.isActive,
          });
        }

        router.push('/student/dashboard');
      }
    } catch (err: any) {
      let displayMessage = err.message || 'Unable to complete registration. Please try again.';
      if (err.errors && typeof err.errors === 'object') {
        const fieldErrorList = Object.values(err.errors).flat() as string[];
        if (fieldErrorList.length > 0) {
          displayMessage = fieldErrorList[0];
        }
      }
      setError(displayMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* Left Column: Platform Architecture Showcase */}
          <div className="hidden md:flex md:col-span-5 flex-col justify-between p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border border-[#E2E8F0] shadow-lg shadow-slate-200/50 min-h-[580px]">
            <div>
              <div className="mb-4 lg:mb-6">
                <BrandLogo size="md" variant="light" />
              </div>
            
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-[11px] font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-[#FBAB23] animate-pulse"></span>
                <span>Tier-1 Placement Architecture</span>
              </div>
              
              <h2 className="text-xl lg:text-2xl font-extrabold text-[#0A2540] font-heading tracking-tight leading-tight">
                Enterprise Corporate Hiring & University Automation
              </h2>
              
              <p className="text-xs text-[#64748B] mt-2.5 leading-relaxed">
                Connect verified universities with verified companies. Post campus drives, automate applicant screening, and issue placement offers.
              </p>

              {/* Architecture Highlights */}
              <div className="mt-6 space-y-3">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    🏢
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0A2540] block">Unified Company Accounts</span>
                    <span className="text-[11px] text-slate-500">Register directly with your company credentials to manage placement drives and candidate hiring.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    🛡️
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0A2540] block">Super Admin Verification Guard</span>
                    <span className="text-[11px] text-slate-500">Every company is verified by Super Admin before jobs and drives go live.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    🎓
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0A2540] block">Seamless Student Hiring</span>
                    <span className="text-[11px] text-slate-500">Enrolled students apply directly to verified company placement drives.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Trust Badge */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Enterprise RBAC & Security
              </span>
              <span>CampusHire v2.4</span>
            </div>
          </div>

          {/* Right Column: Registration Card */}
          <div className="md:col-span-7 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-[#E2E8F0] shadow-xl shadow-slate-200/60 flex flex-col justify-between">
            
            {/* 1. CONFIRMATION STATE FOR SUBMITTED COMPANY */}
            {submittedCompany ? (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-3xl bg-purple-50 border border-purple-200/80 text-purple-600 mx-auto flex items-center justify-center shadow-lg shadow-purple-500/10">
                  <Building2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                    <span>Submitted — Super Admin Verification In Progress</span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#0A2540]">
                    {submittedCompany.name}
                  </h2>
                  
                  <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
                    Your company account has been created and submitted successfully. Our platform Super Admin team will review and verify your account within 24 hours.
                  </p>
                </div>

                {/* Submitted Company & Login Account Summary */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Company Name:</span>
                    <span className="font-bold text-[#0A2540]">{submittedCompany.name}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Login Email:</span>
                    <span className="font-bold text-purple-700 font-mono">{submittedCompany.email}</span>
                  </div>
                  {submittedCompany.website && (
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Website:</span>
                      <span className="font-bold text-blue-600 font-mono">{submittedCompany.website}</span>
                    </div>
                  )}
                  {submittedCompany.industry && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Industry:</span>
                      <span className="font-medium text-[#0A2540]">{submittedCompany.industry}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/login"
                    className="btn-primary w-full sm:w-auto px-6 py-3 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span>Go to Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A2540] text-xs font-bold transition-all text-center"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            ) : submittedCollege ? (
              /* 2. CONFIRMATION STATE FOR SUBMITTED COLLEGE */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-200/80 text-blue-600 mx-auto flex items-center justify-center shadow-lg shadow-blue-500/10">
                  <Building className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                    <span>Submitted — Super Admin Verification In Progress</span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#0A2540]">
                    {submittedCollege.name}
                  </h2>
                  
                  <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
                    Your college institutional profile has been submitted successfully. Our platform Super Admin team will verify your accreditation and domain authority within 24 hours.
                  </p>
                </div>

                {/* Submitted Institution Summary */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Institution Code:</span>
                    <span className="font-bold text-[#0A2540]">{submittedCollege.code || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Official Domain:</span>
                    <span className="font-bold text-blue-600 font-mono">{submittedCollege.domain || 'N/A'}</span>
                  </div>
                  {submittedCollege.city && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Location:</span>
                      <span className="font-medium text-[#0A2540]">{submittedCollege.city}, {submittedCollege.state}</span>
                    </div>
                  )}
                  {submittedCollege.contactEmail && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Official Contact:</span>
                      <span className="font-medium text-[#0A2540]">{submittedCollege.contactEmail}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="btn-primary w-full sm:w-auto px-6 py-3 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span>Return to Home</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => {
                      setSubmittedCollege(null);
                      setCollegeName('');
                      setCollegeCode('');
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A2540] text-xs font-bold transition-all"
                  >
                    Register Another Entity
                  </button>
                </div>
              </div>
            ) : (
              /* 3. ACTIVE ONBOARDING FORMS */
              <div>
                {/* Header */}
                <div className="mb-5">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A2540] font-heading tracking-tight">
                    {tab === 'STUDENT'
                      ? 'Create Student Account'
                      : tab === 'COMPANY'
                      ? 'Register Company Account'
                      : 'Register College / Institution'}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                    {tab === 'STUDENT'
                      ? 'Join your college placement cell and apply to verified placement drives.'
                      : tab === 'COMPANY'
                      ? 'Register your company account with email and password to post jobs and recruit talent.'
                      : 'Register your university for Super Admin verification and campus placement automation.'}
                  </p>
                </div>

                {/* Role Switcher Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] mb-5">
                  <button
                    type="button"
                    onClick={() => handleTabChange('STUDENT')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer text-center ${
                      tab === 'STUDENT'
                        ? 'bg-white text-blue-600 shadow-sm border border-blue-100 font-extrabold'
                        : 'text-[#64748B] hover:text-[#0A2540]'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange('COMPANY')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer text-center ${
                      tab === 'COMPANY'
                        ? 'bg-white text-purple-600 shadow-sm border border-purple-100 font-extrabold'
                        : 'text-[#64748B] hover:text-[#0A2540]'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Company</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange('TPO_ADMIN')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer text-center ${
                      tab === 'TPO_ADMIN'
                        ? 'bg-white text-blue-600 shadow-sm border border-blue-100 font-extrabold'
                        : 'text-[#64748B] hover:text-[#0A2540]'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>College</span>
                  </button>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3">
                    <span className="text-base flex-shrink-0">⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                {/* Main Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* ================= 1. STUDENT REGISTRATION FIELDS ================= */}
                  {tab === 'STUDENT' && (
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider block border-b border-slate-100 pb-1.5">
                        1. Account Credentials
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            Student Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="input-placecom"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            Student Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            placeholder="student@college.edu"
                            className="input-placecom"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                          Password *
                        </label>
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={studentPassword}
                          onChange={(e) => setStudentPassword(e.target.value)}
                          placeholder="Minimum 6 characters"
                          className="input-placecom"
                        />
                      </div>

                      <div className="space-y-4 pt-2 border-t border-[#F1F5F9]">
                        <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider block border-b border-slate-100 pb-1.5">
                          2. Academic & University Details
                        </span>

                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider">
                              Select Your Verified College / University *
                            </label>
                            <button
                              type="button"
                              onClick={() => handleTabChange('TPO_ADMIN')}
                              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              College not listed? Register →
                            </button>
                          </div>
                          <select
                            required
                            value={collegeId}
                            onChange={(e) => setCollegeId(e.target.value)}
                            className="input-placecom"
                          >
                            {colleges.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name} {c.code ? `(${c.code})` : ''} {c.city ? `- ${c.city}` : ''}
                              </option>
                            ))}
                            {colleges.length === 0 && (
                              <option value="">
                                {isLoadingColleges ? 'Loading verified colleges...' : 'No verified colleges available yet'}
                              </option>
                            )}
                          </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                              Enrollment / Roll Number *
                            </label>
                            <input
                              type="text"
                              required
                              value={enrollmentNumber}
                              onChange={(e) => setEnrollmentNumber(e.target.value)}
                              placeholder="e.g. 2022CSB101"
                              className="input-placecom font-mono uppercase"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                              Current CGPA (Out of 10) *
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              max="10"
                              required
                              value={cgpa}
                              onChange={(e) => setCgpa(e.target.value)}
                              placeholder="e.g. 8.75"
                              className="input-placecom font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                              Branch / Major *
                            </label>
                            <select
                              value={branch}
                              onChange={(e) => setBranch(e.target.value)}
                              className="input-placecom"
                            >
                              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                              <option value="Information Technology">Information Technology</option>
                              <option value="Electronics & Communication">Electronics & Communication</option>
                              <option value="Electrical Engineering">Electrical Engineering</option>
                              <option value="Mechanical Engineering">Mechanical Engineering</option>
                              <option value="Civil Engineering">Civil Engineering</option>
                              <option value="Chemical Engineering">Chemical Engineering</option>
                              <option value="Data Science & AI">Data Science & AI</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                              Graduating Batch Year *
                            </label>
                            <select
                              value={batchYear}
                              onChange={(e) => setBatchYear(Number(e.target.value))}
                              className="input-placecom font-mono"
                            >
                              {[2024, 2025, 2026, 2027, 2028].map((year) => (
                                <option key={year} value={year}>
                                  Class of {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= 2. DIRECT COMPANY REGISTRATION ================= */}
                  {tab === 'COMPANY' && (
                    <div className="space-y-4">
                      
                      {/* Account Credentials */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. Microsoft India, Google, Infosys"
                            className="input-placecom"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            Company Official Email (Login ID) *
                          </label>
                          <input
                            type="email"
                            required
                            value={companyEmail}
                            onChange={(e) => setCompanyEmail(e.target.value)}
                            placeholder="careers@company.com or hr@company.com"
                            className="input-placecom"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            Password (Login Password) *
                          </label>
                          <input
                            type="password"
                            required
                            minLength={6}
                            value={companyPassword}
                            onChange={(e) => setCompanyPassword(e.target.value)}
                            placeholder="Minimum 6 characters"
                            className="input-placecom"
                          />
                        </div>
                      </div>

                      {/* Company Profile Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F1F5F9]">
                        <div>
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            Official Website URL (Optional)
                          </label>
                          <input
                            type="url"
                            value={companyWebsite}
                            onChange={(e) => setCompanyWebsite(e.target.value)}
                            placeholder="https://company.com"
                            className="input-placecom"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            Industry Sector *
                          </label>
                          <select
                            value={companyIndustry}
                            onChange={(e) => setCompanyIndustry(e.target.value)}
                            className="input-placecom"
                          >
                            <option value="Information Technology & Services">Information Technology & Services</option>
                            <option value="Product Engineering & Software">Product Engineering & Software</option>
                            <option value="Banking & Financial Services">Banking & Financial Services (BFSI)</option>
                            <option value="Management Consulting">Management Consulting</option>
                            <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                            <option value="Automotive & Manufacturing">Automotive & Manufacturing</option>
                            <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                            <option value="Telecommunications">Telecommunications</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                          Headquarters / Office Location (Optional)
                        </label>
                        <input
                          type="text"
                          value={companyLocation}
                          onChange={(e) => setCompanyLocation(e.target.value)}
                          placeholder="e.g. Bangalore, Mumbai, Gurgaon"
                          className="input-placecom"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                          Brief Company Overview / About (Optional)
                        </label>
                        <textarea
                          rows={2}
                          value={companyDescription}
                          onChange={(e) => setCompanyDescription(e.target.value)}
                          placeholder="Brief summary of your company..."
                          className="input-placecom resize-none text-xs"
                        />
                      </div>

                      {/* Company Logo Upload */}
                      <div>
                        <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                          Upload Company Logo (Optional)
                        </label>

                        {companyLogoUrl ? (
                          <div className="p-3 rounded-2xl bg-purple-50/50 border border-purple-200 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 relative flex-shrink-0">
                                <Image
                                  src={companyLogoUrl}
                                  alt="Company Logo Preview"
                                  fill
                                  sizes="48px"
                                  className="object-contain p-1"
                                />
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-bold text-[#0A2540] block truncate">
                                  Logo Uploaded Successfully
                                </span>
                                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Ready for submission
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setCompanyLogoUrl('')}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Remove Logo"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="relative border-2 border-dashed border-slate-300 hover:border-purple-400 rounded-2xl p-4 text-center transition-colors bg-slate-50/50">
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/webp, image/svg+xml"
                              disabled={isUploadingImage}
                              onChange={(e) => handleImageUpload(e, 'logo')}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            />
                            <div className="flex flex-col items-center justify-center gap-1.5">
                              <div className="w-9 h-9 rounded-xl bg-purple-100/70 text-purple-600 flex items-center justify-center">
                                {isUploadingImage ? (
                                  <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Upload className="w-4 h-4" />
                                )}
                              </div>
                              <div>
                                <span className="text-xs font-bold text-[#0A2540] block">
                                  {isUploadingImage ? 'Uploading Logo...' : 'Click or Drag to Upload Company Logo'}
                                </span>
                                <span className="text-[10px] text-slate-500 block">
                                  Supports PNG, JPG, SVG, WEBP up to 10MB
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {imageUploadError && (
                          <p className="text-xs text-rose-600 mt-1 font-semibold">
                            ⚠️ {imageUploadError}
                          </p>
                        )}
                      </div>

                      {/* Verification Notice */}
                      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
                        <span className="text-amber-600 text-base flex-shrink-0 mt-0.5">🛡️</span>
                        <div>
                          <span className="font-bold block">Super Admin Verification Process</span>
                          Your company account (<span className="font-mono font-bold">{companyEmail || 'company email'}</span>) will be registered and submitted for Super Admin verification. Once verified, you can sign in to post campus placement drives.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= 3. COLLEGE INSTITUTIONAL REGISTRATION ================= */}
                  {tab === 'TPO_ADMIN' && (
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider block border-b border-slate-100 pb-1.5">
                        1. Institutional Identity & University Details
                      </span>

                      {/* College Name & Code */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            Official College / University Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={collegeName}
                            onChange={(e) => setCollegeName(e.target.value)}
                            placeholder="e.g. Delhi Technological University"
                            className="input-placecom"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            College Code
                          </label>
                          <input
                            type="text"
                            value={collegeCode}
                            onChange={(e) => setCollegeCode(e.target.value.toUpperCase())}
                            placeholder="e.g. DTU"
                            className="input-placecom font-mono uppercase"
                          />
                        </div>
                      </div>

                      {/* Domain & Address */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            Official Domain
                          </label>
                          <input
                            type="text"
                            value={collegeDomain}
                            onChange={(e) => setCollegeDomain(e.target.value.toLowerCase())}
                            placeholder="e.g. dtu.ac.in"
                            className="input-placecom font-mono text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            City
                          </label>
                          <input
                            type="text"
                            value={collegeCity}
                            onChange={(e) => setCollegeCity(e.target.value)}
                            placeholder="e.g. New Delhi"
                            className="input-placecom"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            State
                          </label>
                          <input
                            type="text"
                            value={collegeState}
                            onChange={(e) => setCollegeState(e.target.value)}
                            placeholder="e.g. Delhi"
                            className="input-placecom"
                          />
                        </div>
                      </div>

                      {/* Official Contacts */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            Placement Cell Contact Email
                          </label>
                          <input
                            type="email"
                            value={collegeContactEmail}
                            onChange={(e) => setCollegeContactEmail(e.target.value)}
                            placeholder="placement@university.ac.in"
                            className="input-placecom"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                            Placement Cell Helpline Phone
                          </label>
                          <input
                            type="tel"
                            value={collegeContactPhone}
                            onChange={(e) => setCollegeContactPhone(e.target.value)}
                            placeholder="+91 11 27871018"
                            className="input-placecom font-mono"
                          />
                        </div>
                      </div>

                      {/* Campus Image Upload */}
                      <div>
                        <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                          Upload College Campus Photo or Official Logo (Optional)
                        </label>

                        {collegeLogoUrl ? (
                          <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-200 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-200 relative flex-shrink-0">
                                <Image
                                  src={collegeLogoUrl}
                                  alt="Campus Preview"
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-bold text-[#0A2540] block truncate">
                                  Campus Image Uploaded Successfully
                                </span>
                                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Ready for submission
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setCollegeLogoUrl('')}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Remove Image"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="relative border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-2xl p-4 sm:p-5 text-center transition-colors bg-slate-50/50">
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/webp"
                              disabled={isUploadingImage}
                              onChange={(e) => handleImageUpload(e, 'college_campus')}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            />
                            <div className="flex flex-col items-center justify-center gap-2">
                              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center">
                                {isUploadingImage ? (
                                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Upload className="w-4 h-4" />
                                )}
                              </div>
                              <div>
                                <span className="text-xs font-bold text-[#0A2540] block">
                                  {isUploadingImage ? 'Uploading Campus Photo...' : 'Click or Drag to Upload Campus Image'}
                                </span>
                                <span className="text-[11px] text-slate-500 block mt-0.5">
                                  Supports JPG, PNG, WEBP up to 10MB
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {imageUploadError && (
                          <p className="text-xs text-rose-600 mt-1 font-semibold">
                            ⚠️ {imageUploadError}
                          </p>
                        )}
                      </div>

                      {/* Institutional Lifecycle Policy Notice */}
                      <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
                        <span className="text-blue-600 text-base flex-shrink-0 mt-0.5">🏛️</span>
                        <div>
                          <span className="font-bold block">Permanent Institutional Registration & Super Admin Verification</span>
                          Your College entity is permanently registered on CampusHire. Once submitted, your profile enters Super Admin verification. After verification, your college platform unlocks to appoint departmental TPO officers and host recruitment drives.
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading || isUploadingImage}
                      className="btn-primary w-full py-3.5 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/25 transition-all"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Processing Registration...</span>
                        </>
                      ) : (
                        <span>
                          {tab === 'STUDENT'
                            ? 'Register as Student'
                            : tab === 'COMPANY'
                            ? 'Register Company Account'
                            : 'Submit College for Verification'}{' '}
                          →
                        </span>
                      )}
                    </button>
                  </div>

                </form>

                {/* Footer Sign In Link */}
                <div className="mt-6 pt-6 border-t border-[#F1F5F9] text-center text-xs text-[#64748B]">
                  <span>Already have an account? </span>
                  <Link href="/login" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
                    Sign In to CampusHire →
                  </Link>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
      <RegisterForm />
    </Suspense>
  );
}
