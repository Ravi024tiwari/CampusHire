'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { BrandLogo } from '@/components/BrandLogo';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';

interface CollegeOption {
  id: string;
  name: string;
  code: string | null;
  city: string | null;
  state: string | null;
}

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // Role State (STUDENT | RECRUITER | TPO_ADMIN)
  const [role, setRole] = useState<'STUDENT' | 'RECRUITER' | 'TPO_ADMIN'>('STUDENT');

  // Common User Credentials
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Student Specific Fields
  const [collegeId, setCollegeId] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [batchYear, setBatchYear] = useState(new Date().getFullYear());
  const [cgpa, setCgpa] = useState('');

  // Recruiter Specific Fields
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('Information Technology & Services');
  const [designation, setDesignation] = useState('Talent Acquisition Lead');

  // TPO Specific Fields
  const [tpoDesignation, setTpoDesignation] = useState('Head, Training & Placement Cell');

  // Colleges List State
  const [colleges, setColleges] = useState<CollegeOption[]>([]);
  const [isLoadingColleges, setIsLoadingColleges] = useState(false);

  // Form State
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Cleanly reset/wipe all form inputs when switching roles
  const handleRoleChange = (newRole: 'STUDENT' | 'RECRUITER' | 'TPO_ADMIN') => {
    if (newRole === role) return;

    setRole(newRole);
    setError(null);

    // Wipe common credentials
    setName('');
    setEmail('');
    setPassword('');

    // Reset student fields
    setEnrollmentNumber('');
    setCgpa('');
    setBranch('Computer Science & Engineering');
    setBatchYear(new Date().getFullYear());
    if (colleges.length > 0) {
      setCollegeId(colleges[0].id);
    }

    // Reset recruiter fields
    setCompanyName('');
    setCompanyWebsite('');
    setCompanyIndustry('Information Technology & Services');
    setDesignation('Talent Acquisition Lead');

    // Reset TPO fields
    setTpoDesignation('Head, Training & Placement Cell');
  };

  // Sync role from URL query param if present
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'RECRUITER' || roleParam === 'STUDENT' || roleParam === 'TPO_ADMIN') {
      setRole(roleParam);
    }
  }, [searchParams]);

  // Fetch available colleges for Student registration
  useEffect(() => {
    async function fetchColleges() {
      try {
        setIsLoadingColleges(true);
        const res = await fetch('/api/colleges?limit=50');
        const data = await res.json();
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let payload: any = {
        name,
        email,
        password,
        role,
      };

      if (role === 'STUDENT') {
        if (!collegeId) {
          throw new Error('Please select your college');
        }
        if (!enrollmentNumber.trim()) {
          throw new Error('Please enter your enrollment or roll number');
        }
        const parsedCgpa = parseFloat(cgpa);
        if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10) {
          throw new Error('Please enter a valid CGPA between 0 and 10');
        }

        payload = {
          ...payload,
          collegeId,
          enrollmentNumber: enrollmentNumber.trim(),
          branch,
          batchYear: Number(batchYear),
          cgpa: parsedCgpa,
        };
      } else if (role === 'RECRUITER') {
        if (!companyName.trim()) {
          throw new Error('Please enter your company name');
        }
        payload = {
          ...payload,
          companyName: companyName.trim(),
          companyWebsite: companyWebsite.trim() || undefined,
          companyIndustry: companyIndustry.trim() || undefined,
          designation: designation.trim() || 'Recruiter',
        };
      } else if (role === 'TPO_ADMIN') {
        payload = {
          ...payload,
          designation: tpoDesignation.trim() || 'Head, Training & Placement Cell',
        };
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || result.message || 'Registration failed');
      }

      const userData = result.data?.user;

      // Hydrate and persist user state in Redux store
      if (userData) {
        dispatch(
          setCredentials({
            user: {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              avatarUrl: userData.avatarUrl,
              isActive: userData.isActive,
            },
            studentProfile: userData.student || null,
            recruiterProfile: userData.recruiter
              ? {
                  id: userData.recruiter.id,
                  companyId: userData.recruiter.companyId,
                  companyName: userData.recruiter.company?.name,
                  companyLogoUrl: userData.recruiter.company?.logoUrl,
                  designation: userData.recruiter.designation,
                  isCompanyVerified: userData.recruiter.company?.isVerified,
                }
              : null,
            tpoProfile: userData.tpo
              ? {
                  id: userData.tpo.id,
                  collegeId: userData.tpo.collegeId,
                  collegeName: userData.tpo.college?.name,
                  collegeCode: userData.tpo.college?.code,
                  designation: userData.tpo.designation,
                  isCollegeVerified: userData.tpo.college?.isVerified,
                }
              : null,
          })
        );
      }

      // Route to user's portal upon successful registration
      if (role === 'STUDENT') {
        router.push('/student/dashboard');
      } else if (role === 'RECRUITER') {
        router.push('/recruiter/dashboard');
      } else {
        router.push('/tpo/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Placecom Inspired Value Showcase (High-Contrast, Clean Light Design) */}
          <div className="hidden md:flex md:col-span-5 flex-col justify-between p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border border-[#E2E8F0] shadow-lg shadow-slate-200/50 min-h-[580px]">
            <div>
              <div className="mb-4 lg:mb-6">
                <BrandLogo size="md" variant="light" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-[11px] font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-[#FBAB23] animate-pulse"></span>
                <span>Next-Gen Placement ERP</span>
              </div>

              <h2 className="text-xl lg:text-2xl font-extrabold font-heading tracking-tight leading-snug text-[#0A2540]">
                Launch Your Placement Journey with{" "}
                <span className="bg-gradient-to-r from-[#2563EB] to-[#FBAB23] bg-clip-text text-transparent">
                  CampusHire.
                </span>
              </h2>

              <p className="text-[#475569] text-xs lg:text-sm mt-3 leading-relaxed font-normal">
                Join thousands of students, top hiring companies, and accredited universities streamlining modern placement operations.
              </p>

              {/* Feature Highlights with Elevated Contrast Cards */}
              <div className="mt-6 lg:mt-7 space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-sm hover:border-blue-200 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    📄
                  </div>
                  <div>
                    <span className="font-bold text-[#0A2540] text-xs block">Multi-Resume Cloud Vault</span>
                    <span className="text-[11px] text-[#64748B] leading-tight block mt-0.5">
                      Store tailored resumes for Full Stack, AI & Core roles with instant preview.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-sm hover:border-amber-200 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    🎉
                  </div>
                  <div>
                    <span className="font-bold text-[#0A2540] text-xs block">Automated Offer Dispatch</span>
                    <span className="text-[11px] text-[#64748B] leading-tight block mt-0.5">
                      Formal offer letters dispatched directly to verified inboxes via Resend.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-sm hover:border-blue-200 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    🏛️
                  </div>
                  <div>
                    <span className="font-bold text-[#0A2540] text-xs block">University Placement Cell</span>
                    <span className="text-[11px] text-[#64748B] leading-tight block mt-0.5">
                      NIRF accreditation reporting, live drive approvals & fair single-offer guard.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Proof Quote */}
            <div className="pt-4 lg:pt-5 border-t border-[#E2E8F0] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0A2540] to-[#2563EB] text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-sm">
                  CH
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#0A2540]">CampusHire Verified</p>
                  <p className="text-[#64748B] text-[11px]">Trusted by 500+ Top Recruiters</p>
                </div>
              </div>
              <span className="badge-pill badge-verified text-[10px]">
                Active Network
              </span>
            </div>
          </div>

          {/* Right Column: Registration Card */}
          <div className="md:col-span-7 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#E2E8F0] shadow-xl shadow-slate-200/50">
            
            {/* Form Header */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] font-heading">
                Create Your Account
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Choose your role to get started with on-campus hiring.
              </p>
            </div>

            {/* Role Selection Tabs (3 Roles: Student, Recruiter, TPO) */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#F1F5F9] rounded-xl mb-6">
              <button
                type="button"
                onClick={() => handleRoleChange('STUDENT')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  role === 'STUDENT'
                    ? 'bg-white text-[#0A2540] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0A2540]'
                }`}
              >
                <span>🎓</span>
                <span className="truncate">Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('RECRUITER')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  role === 'RECRUITER'
                    ? 'bg-white text-[#0A2540] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0A2540]'
                }`}
              >
                <span>🏢</span>
                <span className="truncate">Recruiter</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('TPO_ADMIN')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  role === 'TPO_ADMIN'
                    ? 'bg-white text-[#0A2540] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0A2540]'
                }`}
              >
                <span>🏛️</span>
                <span className="truncate">College TPO</span>
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3">
                <span className="text-base flex-shrink-0">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Common Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                    {role === 'TPO_ADMIN' ? 'TPO Officer Name *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={
                      role === 'STUDENT'
                        ? 'e.g. Rohan Sharma'
                        : role === 'RECRUITER'
                        ? 'e.g. Ananya Kapoor'
                        : 'e.g. Dr. Rajesh Verma'
                    }
                    className="input-placecom"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                    {role === 'STUDENT'
                      ? 'Student Email *'
                      : role === 'RECRUITER'
                      ? 'Work Email *'
                      : 'Institutional Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      role === 'STUDENT'
                        ? 'rohan@college.edu'
                        : role === 'RECRUITER'
                        ? 'ananya@company.com'
                        : 'tpo@university.ac.in'
                    }
                    className="input-placecom"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                  Password (min. 6 characters) *
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-placecom"
                />
              </div>

              {/* ================= STUDENT DYNAMIC FIELDS ================= */}
              {role === 'STUDENT' && (
                <div className="space-y-4 pt-2 border-t border-[#F1F5F9]">
                  
                  {/* College Selection */}
                  <div>
                    <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                      Select Your College / University *
                    </label>
                    <select
                      value={collegeId}
                      onChange={(e) => setCollegeId(e.target.value)}
                      className="input-placecom"
                      required
                    >
                      {colleges.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} {c.code ? `(${c.code})` : ''} {c.city ? `- ${c.city}` : ''}
                        </option>
                      ))}
                      {colleges.length === 0 && (
                        <option value="">
                          {isLoadingColleges ? 'Loading colleges...' : 'No registered colleges found'}
                        </option>
                      )}
                    </select>
                  </div>

                  {/* Enrollment Number & CGPA */}
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
                        placeholder="e.g. 2022CS0145"
                        className="input-placecom"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                        Current CGPA (0 - 10) *
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
                        className="input-placecom"
                      />
                    </div>
                  </div>

                  {/* Branch & Batch Year */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                        Academic Branch *
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
                        <option value="Data Science & AI">Data Science & AI</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                        Graduation Batch Year *
                      </label>
                      <select
                        value={batchYear}
                        onChange={(e) => setBatchYear(Number(e.target.value))}
                        className="input-placecom"
                      >
                        <option value={2025}>2025</option>
                        <option value={2026}>2026</option>
                        <option value={2027}>2027</option>
                        <option value={2028}>2028</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= RECRUITER DYNAMIC FIELDS ================= */}
              {role === 'RECRUITER' && (
                <div className="space-y-4 pt-2 border-t border-[#F1F5F9]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Stripe, Google, Microsoft"
                        className="input-placecom"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                        Company Website (Optional)
                      </label>
                      <input
                        type="url"
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        placeholder="https://company.com"
                        className="input-placecom"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                        Industry / Sector
                      </label>
                      <select
                        value={companyIndustry}
                        onChange={(e) => setCompanyIndustry(e.target.value)}
                        className="input-placecom"
                      >
                        <option value="Information Technology & Services">Information Technology & Services</option>
                        <option value="Financial Services & Fintech">Financial Services & Fintech</option>
                        <option value="Consulting & Analytics">Consulting & Analytics</option>
                        <option value="E-Commerce & Internet">E-Commerce & Internet</option>
                        <option value="Core Engineering & Manufacturing">Core Engineering & Manufacturing</option>
                        <option value="Healthcare & BioTech">Healthcare & BioTech</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                        Your Work Designation
                      </label>
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. University Hiring Lead"
                        className="input-placecom"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ================= COLLEGE TPO DYNAMIC FIELDS ================= */}
              {role === 'TPO_ADMIN' && (
                <div className="space-y-4 pt-2 border-t border-[#F1F5F9]">
                  <div>
                    <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                      Your Official TPO Designation *
                    </label>
                    <input
                      type="text"
                      required
                      value={tpoDesignation}
                      onChange={(e) => setTpoDesignation(e.target.value)}
                      placeholder="e.g. Head, Training & Placement Cell"
                      className="input-placecom"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                    <span className="text-blue-600 text-base flex-shrink-0 mt-0.5">🏛️</span>
                    <div className="text-xs text-blue-900 leading-relaxed">
                      <span className="font-bold block">1 TPO per Institution Policy</span>
                      Register your personal TPO account now. Once signed in, you will be prompted to register and link your college details (campus infrastructure, logo, and NIRF roster) from your TPO dashboard.
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Creating Your Account & Profile...</span>
                    </>
                  ) : (
                    <span>
                      Register as{' '}
                      {role === 'STUDENT'
                        ? 'Student'
                        : role === 'RECRUITER'
                        ? 'Recruiter'
                        : 'College TPO'}{' '}
                      →
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Footer Sign In Link */}
            <div className="mt-6 pt-6 border-t border-[#F1F5F9] text-center text-xs text-[#64748B]">
              <span>Already have an account? </span>
              <Link href="/login" className="font-bold text-blue-600 hover:text-blue-800">
                Sign In to CampusHire
              </Link>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
