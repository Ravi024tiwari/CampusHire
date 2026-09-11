'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  UserPlus,
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Copy,
  Check,
  RefreshCw,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Users,
  KeyRound,
  X,
  Phone,
  ChevronRight,
  ShieldAlert,
  Info,
  BadgeCheck,
  Compass,
} from 'lucide-react';

interface CollegeData {
  id: string;
  name: string;
  code: string | null;
  domain: string | null;
  city: string | null;
  state: string | null;
  logoUrl: string | null;
  images?: string[];
  isVerified: boolean;
  contactEmail?: string | null;
  contactPhone?: string | null;
  createdAt: string;
  _count?: {
    tpos?: number;
    students?: number;
    jobs?: number;
  };
}

const DESIGNATION_PRESETS = [
  'Head, Training & Placement Cell',
  'Training & Placement Officer (TPO)',
  'Director - Corporate Relations & Placements',
  'Assistant Placement Officer (APO)',
  'Head - Career Development Center (CDC)',
  'Faculty Placement Coordinator',
  'Dean - Industry Collaborations',
];

const DEPARTMENT_PRESETS = [
  'Central Placement Cell',
  'Training & Placement Cell',
  'Computer Science & Engineering',
  'Corporate Relations Cell',
  'Career Development Center',
  'Department of Information Technology',
  'School of Management Studies',
];

const FALLBACK_CAMPUS_IMAGE =
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80';

export default function CollegeAppointTpoPage({
  params,
}: {
  params?: Promise<{ id: string }>;
}) {
  const routeParams = useParams();
  const rawId = routeParams?.id;
  const collegeId = typeof rawId === 'string' ? rawId : Array.isArray(rawId) ? rawId[0] : '';
  const router = useRouter();

  // College Data state
  const [college, setCollege] = useState<CollegeData | null>(null);
  const [loadingCollege, setLoadingCollege] = useState(true);
  const [collegeError, setCollegeError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [designation, setDesignation] = useState('Head, Training & Placement Cell');
  const [department, setDepartment] = useState('Central Placement Cell');
  const [phone, setPhone] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Avatar upload state
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarUploadError, setAvatarUploadError] = useState<string | null>(null);

  // Submission & UI feedback state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    tpoName: string;
    email: string;
    collegeName: string;
    designation: string;
    tempPassword?: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Fetch College Details on Mount
  useEffect(() => {
    async function fetchCollege() {
      try {
        setLoadingCollege(true);
        setCollegeError(null);

        // Try Admin endpoint first
        let res = await fetch(`/api/admin/colleges/${collegeId}`);
        let json = await res.json();

        // Fallback to general college endpoint if needed
        if (!res.ok || !json.success) {
          res = await fetch(`/api/colleges/${collegeId}`);
          json = await res.json();
        }

        if (!res.ok || !json.success) {
          throw new Error(json.error || json.message || 'Failed to load institution details');
        }

        const collegeData = json.data?.college || json.data;
        if (!collegeData || !collegeData.id) {
          throw new Error('College record not found');
        }

        setCollege(collegeData);
      } catch (err: any) {
        setCollegeError(err.message || 'Error loading college details');
      } finally {
        setLoadingCollege(false);
      }
    }
    if (collegeId) {
      fetchCollege();
    }
  }, [collegeId]);

  // Generate strong random password
  const generateStrongPassword = () => {
    const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lowercase = 'abcdefghjkmnpqrstuvwxyz';
    const numbers = '23456789';
    const symbols = '!@#$%^&*';
    const all = uppercase + lowercase + numbers + symbols;

    let pwd = '';
    pwd += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    pwd += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    pwd += numbers.charAt(Math.floor(Math.random() * numbers.length));
    pwd += symbols.charAt(Math.floor(Math.random() * symbols.length));

    for (let i = 4; i < 12; i++) {
      pwd += all.charAt(Math.floor(Math.random() * all.length));
    }
    const shuffled = pwd.split('').sort(() => 0.5 - Math.random()).join('');
    setPassword(shuffled);
    setShowPassword(true);
  };

  // Handle avatar upload via /api/upload
  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAvatarUploadError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarUploadError('Image size must be less than 5MB.');
      return;
    }

    setAvatarUploadError(null);
    setIsUploadingAvatar(true);

    const localPreviewUrl = URL.createObjectURL(file);
    setAvatarPreview(localPreviewUrl);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'avatar');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to upload profile photo');
      }

      setAvatarUrl(json.data.url);
      setAvatarPreview(json.data.url);
    } catch (err: any) {
      setAvatarUploadError(err.message || 'Image upload failed. Using initials fallback.');
      setAvatarUrl(null);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const removeAvatar = () => {
    setAvatarUrl(null);
    setAvatarPreview(null);
    setAvatarUploadError(null);
  };

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Password strength calculator
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength();

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!college) {
      setFormError('Institution information not found.');
      return;
    }

    if (!college.isVerified) {
      setFormError(`"${college.name}" has not been accredited yet. Please verify this institution from the Accreditation Queue first.`);
      return;
    }

    if (!name.trim()) {
      setFormError('Officer full name is required.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setFormError('A valid institutional email address is required.');
      return;
    }

    if (!password || password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      let res = await fetch('/api/admin/tpos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collegeId: college.id,
          name: name.trim(),
          email: email.trim(),
          password,
          designation: designation.trim() || 'Head, Training & Placement Cell',
          department: department.trim() || 'Central Placement Cell',
          avatarUrl: avatarUrl || null,
          isActive,
        }),
      });

      let json = await res.json();
      if (!res.ok || !json.success) {
        res = await fetch(`/api/colleges/${collegeId}/tpos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
            designation: designation.trim() || 'Head, Training & Placement Cell',
            department: department.trim() || 'Central Placement Cell',
            avatarUrl: avatarUrl || null,
            isActive,
          }),
        });
        json = await res.json();
      }

      if (!res.ok || !json.success) {
        throw new Error(json.error || json.message || 'Failed to appoint TPO officer.');
      }

      // Success
      setSuccessData({
        tpoName: name.trim(),
        email: email.trim(),
        collegeName: college.name,
        designation: designation.trim(),
        tempPassword: password,
      });
    } catch (err: any) {
      setFormError(err.message || 'An unexpected error occurred while appointing TPO.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const bgImage =
    (college?.images && college.images.length > 0 && college.images[0]) ||
    college?.logoUrl ||
    FALLBACK_CAMPUS_IMAGE;

  if (loadingCollege) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-slate-800 animate-pulse" />
          </div>
          <RefreshCw className="w-20 h-20 text-amber-500 animate-spin absolute" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-base font-extrabold text-slate-900 font-heading">
            Loading Institution Dossier
          </h3>
          <p className="text-xs text-slate-500">Preparing institutional verification credentials...</p>
        </div>
      </div>
    );
  }

  if (collegeError || !college) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto shadow-xs">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg font-extrabold text-slate-900 font-heading">Institution Not Found</h2>
            <p className="text-xs text-slate-500 leading-relaxed">{collegeError || 'Unable to locate the specified college record.'}</p>
          </div>
          <Link
            href="/admin/colleges"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-black transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Colleges Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1600px] mx-auto space-y-6 sm:space-y-8 transition-all">
      
      {/* 1. Breadcrumb & Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 flex-wrap">
          <Link href="/admin/colleges" className="hover:text-slate-900 transition-colors flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Colleges</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href={`/admin/colleges/${collegeId}`} className="hover:text-slate-900 font-bold text-slate-700 transition-colors truncate max-w-[220px]">
            {college.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-extrabold bg-amber-50 text-amber-900 px-3 py-0.5 rounded-full border border-amber-200">
            Appoint TPO Officer
          </span>
        </div>

        <Link
          href={`/admin/colleges/${collegeId}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-2xs transition-all self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          <span>Back to Institution</span>
        </Link>
      </div>

      {/* 2. Campus Image Background Banner */}
      <div className="relative overflow-hidden rounded-3xl min-h-[220px] sm:min-h-[260px] shadow-2xl border border-slate-800 flex flex-col justify-end p-5 sm:p-7 lg:p-9 group">
        {/* Real Background Image with Smooth Scaling Effect */}
        <img
          src={bgImage}
          alt={college.name}
          className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Sophisticated Multi-Layer Dark Slate / Charcoal Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/50 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950/80" />

        {/* Banner Content (Foreground) */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/95 p-1.5 border-2 border-white/40 shadow-2xl shrink-0 flex items-center justify-center overflow-hidden backdrop-blur-md">
              {college.logoUrl ? (
                <img
                  src={college.logoUrl}
                  alt={college.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-slate-900 text-[#FBAB23] font-black text-2xl flex items-center justify-center font-heading">
                  {college.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="space-y-1.5 text-white">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-heading tracking-tight drop-shadow-md">
                  {college.name}
                </h1>
                {college.code && (
                  <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-lg bg-black/50 text-[#FBAB23] border border-amber-500/30 backdrop-blur-sm">
                    {college.code}
                  </span>
                )}
                {college.isVerified ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-extrabold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Accredited Institution</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-extrabold bg-amber-950/80 text-amber-300 border border-amber-500/40 backdrop-blur-sm shadow-sm">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pending Accreditation</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 sm:gap-5 text-xs text-slate-200 flex-wrap font-medium pt-0.5">
                {college.city && (
                  <span className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-xs">
                    <Compass className="w-3.5 h-3.5 text-[#FBAB23]" />
                    <span>{college.city}, {college.state || 'India'}</span>
                  </span>
                )}
                {college.domain && (
                  <span className="flex items-center gap-1.5 font-mono text-amber-200 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-xs">
                    <Mail className="w-3.5 h-3.5 text-[#FBAB23]" />
                    <span>@{college.domain}</span>
                  </span>
                )}
                <span className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-xs">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{college._count?.students || 0} Registered Students</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            <span className="text-xs font-bold text-slate-200 bg-black/60 px-3.5 py-2 rounded-xl border border-white/15 backdrop-blur-md">
              ROLE: <span className="text-[#FBAB23] font-mono font-extrabold">TPO_ADMIN</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Success Modal (Animated Credentials Card) */}
      {successData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 shadow-xs">
                <BadgeCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xl font-black text-slate-900 font-heading">
                  TPO Appointed Successfully!
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Official credentials generated and bound to <strong>{successData.collegeName}</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>Account Credentials</span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <span className="text-slate-500 font-medium">Officer Name:</span>
                  <span className="font-bold text-slate-900">{successData.tpoName}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <span className="text-slate-500 font-medium">Login Email:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{successData.email}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(successData.email, 'email')}
                      className="p-1 text-slate-400 hover:text-slate-900 transition-colors"
                      title="Copy Email"
                    >
                      {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {successData.tempPassword && (
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 text-xs">
                    <span className="text-slate-500 font-medium">Password:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        {successData.tempPassword}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(successData.tempPassword!, 'password')}
                        className="p-1 text-slate-400 hover:text-slate-900 transition-colors"
                        title="Copy Password"
                      >
                        {copiedField === 'password' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <span className="text-slate-500 font-medium">Designation:</span>
                  <span className="font-bold text-slate-800">{successData.designation}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const credentialsText = `CampusHire Institutional Login Credentials:\nInstitution: ${successData.collegeName}\nOfficer: ${successData.tpoName}\nLogin Portal: ${window.location.origin}/login\nEmail: ${successData.email}\nPassword: ${successData.tempPassword || 'Set by Super Admin'}\nRole: Training & Placement Officer (TPO_ADMIN)`;
                  handleCopy(credentialsText, 'all');
                }}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold text-slate-800 bg-slate-100 border border-slate-300 hover:bg-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copiedField === 'all' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedField === 'all' ? 'Copied to Clipboard!' : 'Copy All Credentials'}</span>
              </button>
              
              <button
                type="button"
                onClick={() => router.push(`/admin/colleges/${collegeId}`)}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-slate-900 hover:bg-black shadow-md transition-all cursor-pointer"
              >
                Back to College Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Main Two-Column Workflow Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Form Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Error Alert */}
          {formError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs sm:text-sm animate-in fade-in">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
              <div className="flex-1 font-medium">{formError}</div>
              <button type="button" onClick={() => setFormError(null)} className="text-rose-400 hover:text-rose-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Section 1: Officer Portrait & Personal Identity */}
          <div className="p-6 sm:p-7 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-800 font-black text-xs flex items-center justify-center">
                1
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading">
                  Officer Identity & Profile Photo
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Provide the official name, contact details, and institutional portrait for this officer.
                </p>
              </div>
            </div>

            {/* Profile Avatar Upload Container */}
            <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-5">
              <div className="relative group shrink-0">
                {avatarPreview ? (
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-md">
                    <img src={avatarPreview} alt="TPO Avatar" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="absolute top-1.5 right-1.5 bg-rose-600 text-white p-1 rounded-full shadow hover:bg-rose-700 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-700 text-[#FBAB23] flex flex-col items-center justify-center font-black text-2xl shadow-md border-2 border-slate-800 font-heading">
                    {name ? name.substring(0, 2).toUpperCase() : 'TPO'}
                  </div>
                )}

                {isUploadingAvatar && (
                  <div className="absolute inset-0 bg-black/70 rounded-2xl flex items-center justify-center text-white backdrop-blur-xs">
                    <RefreshCw className="w-6 h-6 animate-spin text-[#FBAB23]" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                  Official Profile Picture (Optional)
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Upload a professional headshot (PNG, JPG, or WebP up to 5MB). This will be showcased on placement bulletins and student verification requests.
                </p>
                
                <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 cursor-pointer shadow-2xs transition-all">
                    <UploadCloud className="w-4 h-4 text-slate-700" />
                    <span>{avatarPreview ? 'Change Photo' : 'Upload Headshot'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileChange}
                      className="hidden"
                    />
                  </label>
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="text-xs font-bold text-rose-600 hover:underline px-2 py-1"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
                {avatarUploadError && (
                  <div className="text-xs font-semibold text-rose-600">{avatarUploadError}</div>
                )}
              </div>
            </div>

            {/* Officer Name & Contact Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700">
                  Officer Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (college.domain && !email) {
                      const sanitized = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '.');
                      setEmail(`tpo.${sanitized}@${college.domain}`);
                    }
                  }}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-800 font-medium transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700">
                  Contact Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-800 font-medium transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Designation & Department Placement Cell */}
          <div className="p-6 sm:p-7 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-800 font-black text-xs flex items-center justify-center">
                2
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading">
                  Designation & Department
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Specify the officer&apos;s institutional authority and placement cell affiliation.
                </p>
              </div>
            </div>

            {/* Official Designation */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700">
                Official Designation <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Head, Training & Placement Cell"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-800 font-medium transition-all"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {DESIGNATION_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDesignation(preset)}
                    className={`text-[11px] font-bold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                      designation === preset
                        ? 'bg-slate-900 border-slate-900 text-[#FBAB23] shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700">
                Department / Cell
              </label>
              <input
                type="text"
                placeholder="e.g. Central Placement Cell"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-800 font-medium transition-all"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {DEPARTMENT_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDepartment(preset)}
                    className={`text-[11px] font-bold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                      department === preset
                        ? 'bg-slate-900 border-slate-900 text-[#FBAB23] shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Credentials & Access Control */}
          <div className="p-6 sm:p-7 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-800 font-black text-xs flex items-center justify-center">
                3
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading">
                  Authentication & Login Credentials
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Set the institutional email and secure credentials used by the TPO to sign in.
                </p>
              </div>
            </div>

            {/* Login Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700">
                Institutional Login Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder={college.domain ? `tpo@${college.domain}` : 'tpo@college.edu'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-800 font-medium transition-all"
                />
              </div>
            </div>

            {/* Password Generator & Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-slate-700">
                  Initial Password <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={generateStrongPassword}
                  className="text-xs font-extrabold text-slate-900 hover:text-black flex items-center gap-1.5 transition-colors cursor-pointer bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-300/80"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Generate Strong Password</span>
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-800 font-mono font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-500">Security Strength:</span>
                    <span
                      className={
                        passwordStrength < 50
                          ? 'text-rose-600'
                          : passwordStrength < 75
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }
                    >
                      {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Medium' : 'Strong & Secure'}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full flex-1 rounded-full ${passwordStrength >= 25 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full ${passwordStrength >= 50 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full ${passwordStrength >= 75 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full ${passwordStrength >= 100 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                  </div>
                </div>
              )}
            </div>

            {/* Immediate Activation Switch */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                  Activate Account Immediately
                </div>
                <div className="text-xs text-slate-500">
                  Enables instant login access to the CampusHire TPO console.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

          {/* Submit Action CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isUploadingAvatar}
              className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-black text-white font-extrabold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-[1.005] active:scale-[0.995]"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-[#FBAB23]" />
                  <span>Appointing Officer & Activating Console...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-[#FBAB23]" />
                  <span>Confirm & Appoint TPO Officer</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Sticky Column: Live Interactive Digital Faculty ID Card (5 Cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
          <div className="p-6 sm:p-7 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading">
                  Live Institutional ID Card
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-full">
                Interactive Pass
              </span>
            </div>

            {/* Digital Obsidian Pass */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-6 sm:p-7 shadow-2xl border border-slate-800 space-y-6">
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Pass Header */}
              <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 p-1.5 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-[#FBAB23]" />
                  </div>
                  <div>
                    <span className="text-xs font-black tracking-tight text-white font-heading">
                      Campus<span className="text-[#FBAB23]">Hire</span>
                    </span>
                    <div className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                      TPO Faculty Pass
                    </div>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  {isActive ? 'ACTIVE TPO' : 'INACTIVE'}
                </span>
              </div>

              {/* Officer Portrait & Metadata */}
              <div className="relative flex items-center gap-4">
                <div className="relative shrink-0">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Preview"
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-[#FBAB23] shadow-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-slate-900 text-[#FBAB23] font-black text-2xl flex items-center justify-center border-2 border-amber-500/40 shadow-lg font-heading">
                      {name ? name.substring(0, 2).toUpperCase() : 'TP'}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="font-extrabold text-base sm:text-lg text-white truncate font-heading">
                    {name || 'Officer Full Name'}
                  </div>
                  <div className="text-xs text-amber-300 font-semibold truncate">
                    {designation || 'Head, Training & Placement Cell'}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {department || 'Central Placement Cell'}
                  </div>
                </div>
              </div>

              {/* Affiliated College Snapshot */}
              <div className="relative p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1.5">
                <div className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                  Affiliated Institution
                </div>
                <div className="flex items-center gap-3">
                  {college.logoUrl ? (
                    <img
                      src={college.logoUrl}
                      alt={college.name}
                      className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 shrink-0"
                    />
                  ) : (
                    <Building2 className="w-6 h-6 text-amber-400 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-extrabold text-white truncate">
                      {college.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {college.city ? `${college.city}, ${college.state || ''}` : 'Accredited Campus'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer with Role Details */}
              <div className="relative pt-3 flex items-center justify-between text-xs text-slate-300 border-t border-white/10">
                <div className="flex items-center gap-1.5 font-mono text-[11px] truncate max-w-[200px]">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{email || `tpo@${college.domain || 'college.edu'}`}</span>
                </div>
                <div className="font-mono text-[10px] text-amber-400 font-extrabold tracking-wider bg-white/10 px-2 py-0.5 rounded">
                  ROLE: TPO_ADMIN
                </div>
              </div>
            </div>

            {/* Privileges Summary */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-600">
              <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-slate-700" />
                <span>Officer Institutional Privileges</span>
              </div>
              <ul className="space-y-2 text-[11px] text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full authority to verify student candidate profiles and enrollment records.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Review, schedule, and approve incoming corporate campus hiring drives.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Access institution placement analytics, median salary tracking, and NIRF reports.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </form>

    </div>
  );
}
