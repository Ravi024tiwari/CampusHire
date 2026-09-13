'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
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
  Building,
  User,
  Eye,
  EyeOff,
  Phone,
  Calendar,
  FileText,
  BarChart3,
  Bell,
  Sparkles,
  Layers,
  BookOpen,
  Info,
  AlertCircle
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

// Helpers for Phone and DOB Validation (10-digit phone & 18-30 years age limits)
function getDobConstraints() {
  const today = new Date();
  const maxYear = today.getFullYear() - 18;
  const minYear = today.getFullYear() - 30;
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return {
    maxDob: `${maxYear}-${month}-${day}`, // User must be at least 18 years old
    minDob: `${minYear}-${month}-${day}`, // User cannot be older than 30 years
  };
}

function validateDobInput(dobStr: string): { valid: boolean; message?: string; age?: number } {
  if (!dobStr) return { valid: true };
  const birthDate = new Date(dobStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(birthDate.getTime())) {
    return { valid: false, message: 'Please enter a valid date' };
  }
  if (birthDate >= today) {
    return { valid: false, message: 'Date of birth cannot be today or a future date' };
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 18) {
    return { valid: false, message: `Minimum age required is 18 years (Selected age: ${age < 0 ? 0 : age})`, age };
  }
  if (age > 30) {
    return { valid: false, message: `Maximum age allowed is 30 years (Selected age: ${age})`, age };
  }

  return { valid: true, age };
}

function validatePhoneInput(phoneStr: string): { valid: boolean; message?: string } {
  if (!phoneStr || !phoneStr.trim()) return { valid: true };
  const digits = phoneStr.replace(/\D/g, '');
  if (
    digits.length === 10 ||
    (digits.length === 12 && digits.startsWith('91')) ||
    (digits.length === 11 && digits.startsWith('0'))
  ) {
    return { valid: true };
  }
  return {
    valid: false,
    message: `Mobile number must be exactly 10 digits (Entered ${digits.length} digits)`,
  };
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);

  // Active Tab State (Student, Company Entity, College Institution)
  const [tab, setTab] = useState<RegistrationTab>('STUDENT');

  // Password Visibility State
  const [showPassword, setShowPassword] = useState(false);

  // Student Credentials & Data
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentDob, setStudentDob] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [batchYear, setBatchYear] = useState(new Date().getFullYear());
  const [cgpa, setCgpa] = useState('');

  // Company Account Credentials & Profile (ALL fields preserved)
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('Information Technology & Services');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyLogoUrl, setCompanyLogoUrl] = useState('');

  // College Institution Specific Fields (ALL fields preserved)
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

  // Live validation calculations
  const { minDob, maxDob } = getDobConstraints();
  const studentPhoneValidation = validatePhoneInput(studentPhone);
  const studentDobValidation = validateDobInput(studentDob);
  const collegePhoneValidation = validatePhoneInput(collegeContactPhone);

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

    let isMounted = true;

    async function fetchColleges() {
      try {
        setIsLoadingColleges(true);
        const response = await apiClient.get<ApiResponse<{ colleges: CollegeOption[] }>>('/api/colleges?isVerified=true&limit=50');
        const data = response.data;
        if (isMounted && data && data.success && Array.isArray(data.data?.colleges)) {
          setColleges(data.data.colleges);
          if (data.data.colleges.length > 0 && !collegeId) {
            setCollegeId(data.data.colleges[0].id);
          }
        }
      } catch (err) {
        // Silently handle without throwing unhandled console errors
      } finally {
        if (isMounted) {
          setIsLoadingColleges(false);
        }
      }
    }
    fetchColleges();

    return () => {
      isMounted = false;
    };
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
        if (collegeContactPhone.trim()) {
          const phoneCheck = validatePhoneInput(collegeContactPhone);
          if (!phoneCheck.valid) {
            throw new Error(phoneCheck.message || 'Placement helpline phone must be a 10-digit number');
          }
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

      // 2. DIRECT COMPANY REGISTRATION FLOW
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
        if (!studentName.trim()) {
          throw new Error('Please enter your full name');
        }
        if (!studentEmail.trim()) {
          throw new Error('Please enter your student email address');
        }
        if (!collegeId) {
          throw new Error('Please select your verified college');
        }
        if (!enrollmentNumber.trim()) {
          throw new Error('Please enter your enrollment or roll number');
        }
        const parsedCgpa = parseFloat(cgpa);
        if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10) {
          throw new Error('Please enter a valid CGPA between 0 and 10');
        }
        if (!studentPassword || studentPassword.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
        if (studentPhone.trim()) {
          const phoneCheck = validatePhoneInput(studentPhone);
          if (!phoneCheck.valid) {
            throw new Error(phoneCheck.message || 'Mobile number must be a valid 10-digit number');
          }
        }
        if (studentDob.trim()) {
          const dobCheck = validateDobInput(studentDob);
          if (!dobCheck.valid) {
            throw new Error(dobCheck.message || 'Date of birth must correspond to an age between 18 and 30 years');
          }
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
          phone: studentPhone.trim() || undefined,
          dob: studentDob.trim() || undefined,
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
      {/* Top Standard Navigation Bar */}
      <Navbar />

      {/* Main Form & Showcase Layout */}
      <main className="flex-1 max-w-[1520px] w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* =========================================================================
              LEFT SHOWCASE CARD (Matches Mockup with 100% Fidelity)
             ========================================================================= */}
          <div className="lg:col-span-5 xl:col-span-5 rounded-3xl bg-gradient-to-br from-[#EEF6FF] via-[#F4F9FF] to-[#FAF5FF] border border-blue-100/90 p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden">
            
            {/* Ambient Lighting Flares */}
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              
              {/* Top Track Badge */}
              <div className="inline-block">
                <span className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                  {tab === 'STUDENT' ? 'FOR STUDENTS' : tab === 'COMPANY' ? 'FOR RECRUITERS' : 'FOR UNIVERSITIES'}
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-heading text-[#0A2540] leading-tight">
                  Your Career
                </h2>
                <div className="relative inline-block">
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight font-heading text-blue-600 leading-tight">
                    Starts Here
                  </h3>
                  {/* Handwritten Blue Brush Doodle Underline */}
                  <svg className="w-36 h-2 text-blue-500/70" viewBox="0 0 150 10" fill="none">
                    <path d="M2 7C40 2 110 3 148 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Subheadline */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {tab === 'STUDENT'
                  ? 'Join your college placement cell, apply to verified drives, and get placed with top companies.'
                  : tab === 'COMPANY'
                  ? 'Connect with premier college campuses, post placement drives, and hire exceptional student talent.'
                  : 'Automate university placement operations, verify candidate rosters, and engage corporate recruiters.'}
              </p>

              {/* 4 Feature Badges with Circular Icons */}
              <div className="space-y-3.5 pt-2">
                
                {/* 1. Apply to Verified Placement Drives */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#0A2540]">
                      Apply to Verified Placement Drives
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Get access to opportunities from top companies.
                    </p>
                  </div>
                </div>

                {/* 2. Track Your Progress */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <BarChart3 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#0A2540]">
                      Track Your Progress
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Stay updated at every stage of the process.
                    </p>
                  </div>
                </div>

                {/* 3. Get Notified */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <Bell className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#0A2540]">
                      Get Notified
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Receive important updates and reminders.
                    </p>
                  </div>
                </div>

                {/* 4. One Unified Platform */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <Building className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#0A2540]">
                      One Unified Platform
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Connect with your college placement cell seamlessly.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Visual Scene: Slogan & Quotes */}
            <div className="pt-6 relative z-10 flex flex-col justify-end space-y-3">
              
              {/* Floating Slogan with Arrow */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-serif italic font-black text-blue-900 text-xs sm:text-sm transform -rotate-3 leading-tight">
                    Better Opportunities<br />
                    <span className="text-blue-600">Brighter Future</span>
                  </span>
                  <svg className="w-6 h-6 text-blue-500 transform rotate-12 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>

                {/* Quote Box Pill */}
                <div className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs max-w-[200px]">
                  <p className="text-[10.5px] font-serif italic text-slate-600 font-bold leading-snug text-center">
                    &ldquo;Discipline today leads to a brighter tomorrow.&rdquo;
                  </p>
                </div>
              </div>

              {/* Book Stacks Desk Accent */}
              <div className="flex items-center gap-2 pt-1">
                <div className="px-3 py-1 rounded-xl bg-blue-600 text-white text-[10px] font-black shadow-xs">
                  Learn
                </div>
                <div className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-[10px] font-black shadow-xs">
                  Apply
                </div>
                <div className="px-3 py-1 rounded-xl bg-[#0A2540] text-white text-[10px] font-black shadow-xs">
                  Grow
                </div>
              </div>

            </div>

          </div>

          {/* =========================================================================
              RIGHT FORM CONTAINER (Interactive, Structured & All Fields Preserved)
             ========================================================================= */}
          <div className="lg:col-span-7 xl:col-span-7 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6 flex flex-col justify-between">
            
            {/* 1. CONFIRMATION STATE FOR SUBMITTED COMPANY */}
            {submittedCompany ? (
              <div className="space-y-6 text-center py-6 animate-in fade-in">
                <div className="w-16 h-16 rounded-3xl bg-purple-50 border border-purple-200 text-purple-600 mx-auto flex items-center justify-center shadow-lg shadow-purple-500/10">
                  <Building2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                    <span>Submitted — Super Admin Verification In Progress</span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-black font-heading text-[#0A2540]">
                    {submittedCompany.name}
                  </h2>
                  
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Your company account has been created and submitted successfully. Our platform Super Admin team will review and verify your account credentials within 24 hours.
                  </p>
                </div>

                {/* Submitted Details Summary */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Company Name:</span>
                    <span className="font-bold text-[#0A2540]">{submittedCompany.name}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Login Work Email:</span>
                    <span className="font-bold text-purple-700 font-mono">{submittedCompany.email}</span>
                  </div>
                  {submittedCompany.website && (
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Website:</span>
                      <span className="font-bold text-blue-600 font-mono">{submittedCompany.website}</span>
                    </div>
                  )}
                  {submittedCompany.industry && (
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Industry:</span>
                      <span className="font-medium text-[#0A2540]">{submittedCompany.industry}</span>
                    </div>
                  )}
                  {submittedCompany.location && (
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Location:</span>
                      <span className="font-medium text-[#0A2540]">{submittedCompany.location}</span>
                    </div>
                  )}
                  {submittedCompany.description && (
                    <div className="flex items-start justify-between">
                      <span className="text-slate-500">Description:</span>
                      <span className="font-medium text-[#0A2540] text-right max-w-xs">{submittedCompany.description}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/login"
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Go to Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/"
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#0A2540] text-xs font-bold transition-all text-center"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            ) : submittedCollege ? (
              /* 2. CONFIRMATION STATE FOR SUBMITTED COLLEGE */
              <div className="space-y-6 text-center py-6 animate-in fade-in">
                <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-200 text-blue-600 mx-auto flex items-center justify-center shadow-lg shadow-blue-500/10">
                  <Building className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                    <span>Submitted — Super Admin Verification In Progress</span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-black font-heading text-[#0A2540]">
                    {submittedCollege.name}
                  </h2>
                  
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Your university institutional profile has been submitted successfully. Our Super Admin team will verify your college domain authority and accreditation within 24 hours.
                  </p>
                </div>

                {/* Submitted Institution Summary */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Institution Code:</span>
                    <span className="font-bold text-[#0A2540]">{submittedCollege.code || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Official Domain:</span>
                    <span className="font-bold text-blue-600 font-mono">{submittedCollege.domain || 'N/A'}</span>
                  </div>
                  {submittedCollege.city && (
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Location:</span>
                      <span className="font-medium text-[#0A2540]">{submittedCollege.city}, {submittedCollege.state}</span>
                    </div>
                  )}
                  {submittedCollege.contactEmail && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Contact Email:</span>
                      <span className="font-medium text-[#0A2540]">{submittedCollege.contactEmail}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all"
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
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#0A2540] text-xs font-bold transition-all cursor-pointer"
                  >
                    Register Another Entity
                  </button>
                </div>
              </div>
            ) : (
              /* 3. ACTIVE ONBOARDING FORM WITH ALL FIELDS */
              <div className="space-y-6">
                
                {/* Top Row: Title, Subtitle & Sign In Link */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="space-y-0.5">
                    <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
                      {tab === 'STUDENT'
                        ? 'Create Student Account'
                        : tab === 'COMPANY'
                        ? 'Register Company Account'
                        : 'Register College / Institution'}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      {tab === 'STUDENT'
                        ? 'Join your college placement cell and apply to verified placement drives.'
                        : tab === 'COMPANY'
                        ? 'Register company account with official credentials to post jobs.'
                        : 'Register your university for Super Admin verification & automation.'}
                    </p>
                  </div>

                  <div className="text-xs text-slate-500 font-medium self-start sm:self-auto shrink-0">
                    <span>Already have an account? </span>
                    <Link href="/login" className="font-extrabold text-blue-600 hover:text-blue-700 transition-colors">
                      Sign In
                    </Link>
                  </div>
                </div>

                {/* Role Switcher Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/70">
                  <button
                    type="button"
                    onClick={() => handleTabChange('STUDENT')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      tab === 'STUDENT'
                        ? 'bg-white text-blue-600 shadow-xs border border-blue-100 scale-[1.01]'
                        : 'text-slate-600 hover:text-[#0A2540]'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    <span>Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange('COMPANY')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      tab === 'COMPANY'
                        ? 'bg-white text-purple-600 shadow-xs border border-purple-100 scale-[1.01]'
                        : 'text-slate-600 hover:text-[#0A2540]'
                    }`}
                  >
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span>Company</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange('TPO_ADMIN')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      tab === 'TPO_ADMIN'
                        ? 'bg-white text-blue-600 shadow-xs border border-blue-100 scale-[1.01]'
                        : 'text-slate-600 hover:text-[#0A2540]'
                    }`}
                  >
                    <Building className="w-4 h-4 shrink-0" />
                    <span>College</span>
                  </button>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
                    <span className="text-sm shrink-0">⚠️</span>
                    <span className="font-semibold">{error}</span>
                  </div>
                )}

                {/* Main Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* =========================================================================
                      1. STUDENT REGISTRATION FORM (Structured with All Fields Visible)
                     ========================================================================= */}
                  {tab === 'STUDENT' && (
                    <div className="space-y-6">
                      
                      {/* Section 1: Personal Details */}
                      <div className="space-y-3.5">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                          <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-xs sm:text-sm font-black text-[#0A2540]">
                              1. Personal Details
                            </h3>
                            <p className="text-[10.5px] text-slate-400 font-medium">
                              Tell us about yourself
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Full Name <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative group">
                              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                              <input
                                type="text"
                                required
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                placeholder="e.g. Rahul Sharma"
                                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Email Address <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative group">
                              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                              <input
                                type="email"
                                required
                                value={studentEmail}
                                onChange={(e) => setStudentEmail(e.target.value)}
                                placeholder="student@college.edu"
                                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-xs font-bold text-slate-700">
                                Phone Number
                              </label>
                              <span className="text-[10px] text-slate-400 font-medium">10 Digits</span>
                            </div>
                            <div className="relative group">
                              <Phone className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                                studentPhone.trim() 
                                  ? studentPhoneValidation.valid 
                                    ? 'text-emerald-500' 
                                    : 'text-rose-500' 
                                  : 'text-slate-400 group-focus-within:text-blue-600'
                              }`} />
                              <input
                                type="tel"
                                value={studentPhone}
                                maxLength={14}
                                onChange={(e) => setStudentPhone(e.target.value)}
                                placeholder="e.g. 9876543210"
                                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 transition-all ${
                                  studentPhone.trim()
                                    ? studentPhoneValidation.valid
                                      ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20 text-slate-800'
                                      : 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900 bg-rose-50/20'
                                    : 'border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 text-slate-800'
                                }`}
                              />
                            </div>
                            {studentPhone.trim() && (
                              <p className={`mt-1 text-[11px] flex items-center gap-1 font-medium ${
                                studentPhoneValidation.valid ? 'text-emerald-600' : 'text-rose-600'
                              }`}>
                                {studentPhoneValidation.valid ? (
                                  <>
                                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                                    <span>Valid 10-digit mobile number</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="w-3 h-3 shrink-0" />
                                    <span>{studentPhoneValidation.message}</span>
                                  </>
                                )}
                              </p>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-xs font-bold text-slate-700">
                                Date of Birth
                              </label>
                              <span className="text-[10px] text-slate-400 font-medium">Age 18 - 30 yrs</span>
                            </div>
                            <div className="relative group">
                              <Calendar className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                                studentDob
                                  ? studentDobValidation.valid
                                    ? 'text-emerald-500'
                                    : 'text-rose-500'
                                  : 'text-slate-400 group-focus-within:text-blue-600'
                              }`} />
                              <input
                                type="date"
                                min={minDob}
                                max={maxDob}
                                value={studentDob}
                                onChange={(e) => setStudentDob(e.target.value)}
                                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium bg-white focus:outline-none focus:ring-2 transition-all ${
                                  studentDob
                                    ? studentDobValidation.valid
                                      ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20 text-slate-800'
                                      : 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900 bg-rose-50/20'
                                    : 'border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 text-slate-800'
                                }`}
                              />
                            </div>
                            {studentDob ? (
                              <p className={`mt-1 text-[11px] flex items-center gap-1 font-medium ${
                                studentDobValidation.valid ? 'text-emerald-600' : 'text-rose-600'
                              }`}>
                                {studentDobValidation.valid ? (
                                  <>
                                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                                    <span>Age: {studentDobValidation.age} years (Eligible)</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="w-3 h-3 shrink-0" />
                                    <span>{studentDobValidation.message}</span>
                                  </>
                                )}
                              </p>
                            ) : (
                              <p className="mt-1 text-[10.5px] text-slate-400 font-medium">
                                Eligible age: 18 - 30 years (No future dates)
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Academic Details */}
                      <div className="space-y-3.5 pt-2">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                          <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-xs sm:text-sm font-black text-[#0A2540]">
                              2. Academic & University Details
                            </h3>
                            <p className="text-[10.5px] text-slate-400 font-medium">
                              Provide your college and academic information
                            </p>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs font-bold text-slate-700">
                              Select Your College / University <span className="text-rose-500">*</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => handleTabChange('TPO_ADMIN')}
                              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                            >
                              College not listed? Request to add
                            </button>
                          </div>
                          <div className="relative group">
                            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                            <select
                              required
                              value={collegeId}
                              onChange={(e) => setCollegeId(e.target.value)}
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-semibold text-slate-800 bg-white cursor-pointer"
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
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Enrollment / Roll Number <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={enrollmentNumber}
                              onChange={(e) => setEnrollmentNumber(e.target.value)}
                              placeholder="e.g. 2022CSB101"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-mono uppercase text-slate-800 placeholder:text-slate-400 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Branch / Major <span className="text-rose-500">*</span>
                            </label>
                            <select
                              value={branch}
                              onChange={(e) => setBranch(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-semibold text-slate-800 bg-white cursor-pointer"
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
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Current CGPA (out of 10) <span className="text-rose-500">*</span>
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
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-mono text-slate-800 placeholder:text-slate-400 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Graduating Batch Year <span className="text-rose-500">*</span>
                            </label>
                            <select
                              value={batchYear}
                              onChange={(e) => setBatchYear(Number(e.target.value))}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-mono font-semibold text-slate-800 bg-white cursor-pointer"
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

                      {/* Section 3: Account Password */}
                      <div className="space-y-3.5 pt-2">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                          <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Lock className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-xs sm:text-sm font-black text-[#0A2540]">
                              3. Account Password
                            </h3>
                            <p className="text-[10.5px] text-slate-400 font-medium">
                              Set up a password for portal login
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Password <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative group">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              required
                              minLength={6}
                              value={studentPassword}
                              onChange={(e) => setStudentPassword(e.target.value)}
                              placeholder="Minimum 6 characters"
                              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
                        >
                          {loading ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Creating Account...</span>
                            </>
                          ) : (
                            <>
                              <span>Create Student Account</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  )}

                  {/* =========================================================================
                      2. COMPANY REGISTRATION FORM (All Fields & Logo Upload Preserved)
                     ========================================================================= */}
                  {tab === 'COMPANY' && (
                    <div className="space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Company Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative group">
                            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-purple-600 transition-colors" />
                            <input
                              type="text"
                              required
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              placeholder="e.g. Microsoft India, Google, Infosys"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Official Work Email (Login ID) <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative group">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-purple-600 transition-colors" />
                            <input
                              type="email"
                              required
                              value={companyEmail}
                              onChange={(e) => setCompanyEmail(e.target.value)}
                              placeholder="careers@company.com"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Login Password <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative group">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-purple-600 transition-colors" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              required
                              minLength={6}
                              value={companyPassword}
                              onChange={(e) => setCompanyPassword(e.target.value)}
                              placeholder="Minimum 6 characters"
                              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-100">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Official Website URL
                          </label>
                          <div className="relative group">
                            <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-purple-600 transition-colors" />
                            <input
                              type="url"
                              value={companyWebsite}
                              onChange={(e) => setCompanyWebsite(e.target.value)}
                              placeholder="https://company.com"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Industry Sector <span className="text-rose-500">*</span>
                          </label>
                          <select
                            value={companyIndustry}
                            onChange={(e) => setCompanyIndustry(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 text-xs sm:text-sm font-semibold text-slate-800 bg-white cursor-pointer"
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
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Headquarters / Office Location
                        </label>
                        <div className="relative group">
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-purple-600 transition-colors" />
                          <input
                            type="text"
                            value={companyLocation}
                            onChange={(e) => setCompanyLocation(e.target.value)}
                            placeholder="e.g. Bangalore, Mumbai, Gurgaon"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Brief Company Overview / About
                        </label>
                        <textarea
                          rows={2}
                          value={companyDescription}
                          onChange={(e) => setCompanyDescription(e.target.value)}
                          placeholder="Brief summary of your company and hiring domains..."
                          className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 resize-none bg-white"
                        />
                      </div>

                      {/* Company Logo Upload */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Upload Company Logo (Optional)
                        </label>

                        {companyLogoUrl ? (
                          <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 relative shrink-0">
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
                              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
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
                                <span className="text-[10.5px] text-slate-400 block">
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
                      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
                        <span className="text-amber-600 text-base shrink-0 mt-0.5">🛡️</span>
                        <div>
                          <span className="font-bold block">Super Admin Verification Process</span>
                          Your company account will be registered and submitted for Super Admin verification to maintain verified institutional hiring integrity.
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
                        >
                          {loading ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Submitting Company...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Company for Verification</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  )}

                  {/* =========================================================================
                      3. COLLEGE REGISTRATION FORM (All Fields & Campus Photo Preserved)
                     ========================================================================= */}
                  {tab === 'TPO_ADMIN' && (
                    <div className="space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Official College / University Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative group">
                            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                            <input
                              type="text"
                              required
                              value={collegeName}
                              onChange={(e) => setCollegeName(e.target.value)}
                              placeholder="e.g. Delhi Technological University"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            College Code
                          </label>
                          <input
                            type="text"
                            value={collegeCode}
                            onChange={(e) => setCollegeCode(e.target.value.toUpperCase())}
                            placeholder="e.g. DTU"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-mono uppercase font-bold text-slate-800 placeholder:text-slate-400 bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Official Domain
                          </label>
                          <input
                            type="text"
                            value={collegeDomain}
                            onChange={(e) => setCollegeDomain(e.target.value.toLowerCase())}
                            placeholder="dtu.ac.in"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-mono text-slate-800 placeholder:text-slate-400 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            value={collegeCity}
                            onChange={(e) => setCollegeCity(e.target.value)}
                            placeholder="New Delhi"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            value={collegeState}
                            onChange={(e) => setCollegeState(e.target.value)}
                            placeholder="Delhi"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Placement Cell Contact Email
                          </label>
                          <div className="relative group">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                            <input
                              type="email"
                              value={collegeContactEmail}
                              onChange={(e) => setCollegeContactEmail(e.target.value)}
                              placeholder="placement@university.ac.in"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs font-bold text-slate-700">
                              Placement Helpline Phone
                            </label>
                            <span className="text-[10px] text-slate-400 font-medium">10 Digits</span>
                          </div>
                          <div className="relative group">
                            <Phone className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                              collegeContactPhone.trim()
                                ? collegePhoneValidation.valid
                                  ? 'text-emerald-500'
                                  : 'text-rose-500'
                                : 'text-slate-400 group-focus-within:text-blue-600'
                            }`} />
                            <input
                              type="tel"
                              value={collegeContactPhone}
                              maxLength={14}
                              onChange={(e) => setCollegeContactPhone(e.target.value)}
                              placeholder="e.g. 9876543210"
                              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 transition-all ${
                                collegeContactPhone.trim()
                                  ? collegePhoneValidation.valid
                                    ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20 text-slate-800'
                                    : 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900 bg-rose-50/20'
                                  : 'border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 text-slate-800'
                              }`}
                            />
                          </div>
                          {collegeContactPhone.trim() && (
                            <p className={`mt-1 text-[11px] flex items-center gap-1 font-medium ${
                              collegePhoneValidation.valid ? 'text-emerald-600' : 'text-rose-600'
                            }`}>
                              {collegePhoneValidation.valid ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                                  <span>Valid 10-digit helpline number</span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="w-3 h-3 shrink-0" />
                                  <span>{collegePhoneValidation.message}</span>
                                </>
                              )}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Campus Image Upload */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Upload College Campus Photo or Logo (Optional)
                        </label>

                        {collegeLogoUrl ? (
                          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-200 relative shrink-0">
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
                          <div className="relative border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-2xl p-4 text-center transition-colors bg-slate-50/50">
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/webp"
                              disabled={isUploadingImage}
                              onChange={(e) => handleImageUpload(e, 'college_campus')}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            />
                            <div className="flex flex-col items-center justify-center gap-1.5">
                              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                {isUploadingImage ? (
                                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Upload className="w-4 h-4" />
                                )}
                              </div>
                              <div>
                                <span className="text-xs font-bold text-[#0A2540] block">
                                  {isUploadingImage ? 'Uploading Campus Photo...' : 'Click or Drag Campus Photo'}
                                </span>
                                <span className="text-[10.5px] text-slate-400 block">
                                  JPG, PNG, WEBP up to 10MB
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

                      {/* Institutional Policy Alert */}
                      <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
                        <span className="text-blue-600 text-base shrink-0 mt-0.5">🏛️</span>
                        <div>
                          <span className="font-bold block">Permanent Institutional Registration</span>
                          Your college entity is permanently registered on CampusHire. Once submitted, your profile enters Super Admin verification.
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
                        >
                          {loading ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Submitting University...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit College for Verification</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  )}

                </form>

                {/* Bottom Security Note */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your information is secure and will only be used for placement purposes.</span>
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
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
