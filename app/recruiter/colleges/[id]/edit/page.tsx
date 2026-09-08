'use client';

import React, { useEffect, useState, use, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Building2, 
  CheckCircle2, 
  Globe, 
  MapPin, 
  Mail, 
  Phone, 
  Users, 
  Briefcase, 
  Award, 
  Calendar, 
  Image as ImageIcon, 
  Loader2, 
  ExternalLink,
  Sparkles,
  UserPlus,
  X,
  Check,
  UploadCloud,
  Edit3,
  Trash2,
  HelpCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
  Info,
  Lightbulb,
  FileText
} from 'lucide-react';

interface TpoContact {
  id: string;
  designation?: string | null;
  department?: string | null;
  isActive: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
  };
}

interface CollegeData {
  id: string;
  name: string;
  code?: string | null;
  domain?: string | null;
  city?: string | null;
  state?: string | null;
  logoUrl?: string | null;
  images?: string[];
  contactEmail?: string | null;
  contactPhone?: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  tpos?: TpoContact[];
  _count?: {
    students: number;
    jobs: number;
    offers: number;
  };
}

export default function RecruiterUpdateCollegePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const collegeId = resolvedParams.id;
  const router = useRouter();

  const logoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [college, setCollege] = useState<CollegeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form Fields State
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [domain, setDomain] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [about, setAbout] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [tpoList, setTpoList] = useState<TpoContact[]>([]);

  // Upload States
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  // Mobile Tab State
  const [mobileTab, setMobileTab] = useState<'basic' | 'about' | 'images' | 'tpos'>('basic');

  // Add TPO Modal State
  const [showAddTpoModal, setShowAddTpoModal] = useState(false);
  const [newTpoName, setNewTpoName] = useState('');
  const [newTpoEmail, setNewTpoEmail] = useState('');
  const [newTpoPassword, setNewTpoPassword] = useState('');
  const [newTpoDepartment, setNewTpoDepartment] = useState('');
  const [newTpoDesignation, setNewTpoDesignation] = useState('');
  const [isAddingTpo, setIsAddingTpo] = useState(false);
  const [tpoModalError, setTpoModalError] = useState<string | null>(null);

  // Fetch Existing College Data
  const fetchCollege = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/colleges/${collegeId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to fetch college profile');
      }

      const c = json.data;
      setCollege(c);
      setName(c.name || '');
      setCode(c.code || '');
      setDomain(c.domain || '');
      setCity(c.city || '');
      setState(c.state || '');
      setContactEmail(c.contactEmail || '');
      setContactPhone(c.contactPhone || '');
      setLogoUrl(c.logoUrl || '');
      setImages(c.images || []);
      setTpoList(c.tpos || []);
      setWebsite(c.domain ? `https://www.${c.domain}` : '');
      setAbout(
        `${c.name} is a premier educational institution committed to academic rigor, state-of-the-art campus infrastructure, and high-impact corporate campus recruitment.`
      );
    } catch (err: any) {
      console.error('[FETCH_COLLEGE_ERROR]', err);
      setError(err.message || 'Unable to load college details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (collegeId) {
      fetchCollege();
    }
  }, [collegeId]);

  // Handle Logo Upload via Cloudinary
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file size must be less than 2MB.');
      return;
    }

    try {
      setIsUploadingLogo(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'college_logo');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to upload logo.');
      }

      setLogoUrl(json.data.url);
      setSuccessToast('Emblem logo uploaded successfully!');
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Logo upload failed');
    } finally {
      setIsUploadingLogo(false);
      if (logoInputRef.current) logoInputRef.current.value = '';
    }
  };

  // Handle Gallery Images Upload via Cloudinary
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 10) {
      alert('Maximum 10 campus images allowed in total.');
      return;
    }

    try {
      setIsUploadingImages(true);
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} exceeds 5MB limit and was skipped.`);
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', 'college_campus');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const json = await res.json();
        if (res.ok && json.success) {
          uploadedUrls.push(json.data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        setImages((prev) => [...prev, ...uploadedUrls].slice(0, 10));
        setSuccessToast(`${uploadedUrls.length} campus image(s) uploaded!`);
        setTimeout(() => setSuccessToast(null), 3000);
      }
    } catch (err: any) {
      alert(err.message || 'Images upload failed');
    } finally {
      setIsUploadingImages(false);
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  // Remove single image from gallery
  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Handle Appointing New TPO
  const handleAddTpoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTpoModalError(null);
    setIsAddingTpo(true);

    try {
      const res = await fetch(`/api/colleges/${collegeId}/tpos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTpoName,
          email: newTpoEmail,
          password: newTpoPassword,
          department: newTpoDepartment || 'Central Placement Cell',
          designation: newTpoDesignation || 'Head, Training & Placement Cell',
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to appoint TPO officer');
      }

      // Add to local state
      const createdTpo: TpoContact = {
        id: json.data.id || String(Date.now()),
        designation: newTpoDesignation || 'Head, Training & Placement Cell',
        department: newTpoDepartment || 'Central Placement Cell',
        isActive: true,
        user: {
          id: json.data.id,
          name: newTpoName,
          email: newTpoEmail,
        },
      };

      setTpoList((prev) => [createdTpo, ...prev]);
      setShowAddTpoModal(false);
      setNewTpoName('');
      setNewTpoEmail('');
      setNewTpoPassword('');
      setNewTpoDepartment('');
      setNewTpoDesignation('');
      setSuccessToast(`TPO Officer ${newTpoName} appointed successfully!`);
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err: any) {
      setTpoModalError(err.message || 'Failed to appoint TPO');
    } finally {
      setIsAddingTpo(false);
    }
  };

  // Submit Main Form (PATCH /api/colleges/[id])
  const handleUpdateCollegeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        name,
        code: code || null,
        domain: domain || null,
        city: city || null,
        state: state || null,
        contactEmail: contactEmail || null,
        contactPhone: contactPhone || null,
        logoUrl: logoUrl || null,
        images,
      };

      const res = await fetch(`/api/colleges/${collegeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to update college profile');
      }

      setSuccessToast('College profile updated successfully!');
      setTimeout(() => {
        router.push(`/recruiter/colleges/${collegeId}`);
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to update college.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mb-4 shadow-sm">
          <Loader2 className="h-7 w-7 animate-spin text-[#0D8B8A]" />
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-[#0A2540] font-heading">
          Loading College Editor...
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm">
          Retrieving verified institutional profile and campus media assets.
        </p>
      </div>
    );
  }

  if (error && !college) {
    return (
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        <Link
          href="/recruiter/colleges"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#0D8B8A] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Colleges Directory</span>
        </Link>

        <div className="rounded-3xl border border-red-200 bg-red-50/70 p-6 sm:p-10 text-center space-y-4">
          <Building2 className="h-10 w-10 text-red-500 mx-auto" />
          <h3 className="text-lg sm:text-xl font-bold text-red-900 font-heading">
            Unable to edit college details
          </h3>
          <p className="text-xs sm:text-sm text-red-700 max-w-md mx-auto">{error}</p>
          <button
            onClick={() => fetchCollege()}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-2 text-xs font-bold text-white transition-all cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 transition-all duration-300 ease-in-out">
      
      {/* Hidden File Inputs for Logo & Gallery */}
      <input 
        type="file" 
        ref={logoInputRef} 
        onChange={handleLogoUpload} 
        accept="image/png,image/jpeg,image/webp,image/svg+xml" 
        className="hidden" 
      />
      <input 
        type="file" 
        ref={galleryInputRef} 
        onChange={handleGalleryUpload} 
        accept="image/png,image/jpeg,image/webp" 
        multiple 
        className="hidden" 
      />

      {/* Floating Success Toast */}
      {successToast && (
        <div className="fixed top-5 right-5 z-50 bg-teal-800 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-bold animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* 1. Header & Breadcrumbs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <Link 
              href={`/recruiter/colleges/${collegeId}`} 
              className="hover:text-[#0D8B8A] transition-colors"
            >
              College Profile
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="text-[#0A2540] font-bold">Update College</span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
            Update College Details
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Keep your college information up to date. This helps recruiters and students connect with you easily.
          </p>
        </div>

        {/* Verification Status Badge */}
        <div className="self-start sm:self-auto shrink-0">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <div>
              <span>Verified College</span>
              {college?.updatedAt && (
                <span className="block text-[10px] text-emerald-700 font-normal">
                  Last updated on {new Date(college.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Mobile Step/Tab Switcher (<md screens) */}
      <div className="md:hidden border-b border-slate-200">
        <div className="flex items-center justify-around text-xs font-bold text-slate-600 pb-1">
          <button
            type="button"
            onClick={() => setMobileTab('basic')}
            className={`py-2 px-2 border-b-2 transition-all cursor-pointer ${
              mobileTab === 'basic' ? 'border-[#0D8B8A] text-[#0D8B8A]' : 'border-transparent text-slate-500'
            }`}
          >
            Basic Info
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('about')}
            className={`py-2 px-2 border-b-2 transition-all cursor-pointer ${
              mobileTab === 'about' ? 'border-[#0D8B8A] text-[#0D8B8A]' : 'border-transparent text-slate-500'
            }`}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('images')}
            className={`py-2 px-2 border-b-2 transition-all cursor-pointer ${
              mobileTab === 'images' ? 'border-[#0D8B8A] text-[#0D8B8A]' : 'border-transparent text-slate-500'
            }`}
          >
            Images ({images.length})
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('tpos')}
            className={`py-2 px-2 border-b-2 transition-all cursor-pointer ${
              mobileTab === 'tpos' ? 'border-[#0D8B8A] text-[#0D8B8A]' : 'border-transparent text-slate-500'
            }`}
          >
            TPOs ({tpoList.length})
          </button>
        </div>
      </div>

      {/* 3. Main Grid: Left Form Area (2 cols) & Right Live Preview (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT COLUMN: The Master Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleUpdateCollegeSubmit} className="space-y-6">
            
            {/* Error banner if any */}
            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3 text-xs sm:text-sm text-red-800 font-bold">
                <Info className="w-5 h-5 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* SECTION 1: Basic Information */}
            <div className={`rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5 ${
              mobileTab !== 'basic' ? 'hidden md:block' : ''
            }`}>
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">
                    Basic Information
                  </h3>
                  <p className="text-xs text-slate-500">
                    Update the basic details about your college.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    College Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Delhi Technological University"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    College Code
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="DTU"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 font-mono focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Official Email Domain
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value.toLowerCase())}
                    placeholder="dtu.ac.in"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 font-mono focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/10"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Used for college email verification (e.g. dtu.ac.in)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New Delhi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Delhi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="tpo@dtu.ac.in"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>
              </div>

              {/* Contact Phone & College Logo Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 11 2787 4001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    College Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                      {logoUrl ? (
                        <img src={logoUrl} alt="Logo preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-heading font-black text-slate-400 text-sm">
                          {code || 'LOGO'}
                        </span>
                      )}
                      {logoUrl && (
                        <button
                          type="button"
                          onClick={() => setLogoUrl('')}
                          className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        disabled={isUploadingLogo}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-[#0A2540] transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                      >
                        {isUploadingLogo ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-700" />
                        ) : (
                          <UploadCloud className="w-3.5 h-3.5 text-teal-700" />
                        )}
                        <span>{isUploadingLogo ? 'Uploading...' : 'Change Logo'}</span>
                      </button>
                      <p className="text-[10px] text-slate-400">
                        Recommended size: 200 × 200 px PNG, JPG (Max 2MB)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* SECTION 2: Additional Information */}
            <div className={`rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5 ${
              mobileTab !== 'about' ? 'hidden md:block' : ''
            }`}>
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">
                    Additional Information
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add more details to help recruiters know about your institution.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    College Website
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://www.dtu.ac.in"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/10"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      About College
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">
                      {about.length}/500
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Describe your institution, achievements, academic excellence..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/10 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: Campus Images */}
            <div className={`rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5 ${
              mobileTab !== 'images' ? 'hidden md:block' : ''
            }`}>
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">
                    Campus Images
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload multiple images of your campus, infrastructure, and facilities.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="relative group h-28 sm:h-32 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs"
                  >
                    <img src={img} alt={`Campus ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-2 right-2 bg-slate-900/80 hover:bg-red-600 text-white rounded-full p-1 transition-colors cursor-pointer shadow-sm"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {/* Add Images Dropzone Button */}
                {images.length < 10 && (
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    disabled={isUploadingImages}
                    className="h-28 sm:h-32 rounded-2xl border-2 border-dashed border-slate-200 hover:border-teal-500 bg-slate-50/70 hover:bg-teal-50/30 flex flex-col items-center justify-center gap-1.5 text-center p-3 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isUploadingImages ? (
                      <Loader2 className="w-5 h-5 animate-spin text-teal-700" />
                    ) : (
                      <UploadCloud className="w-5 h-5 text-teal-700" />
                    )}
                    <span className="text-xs font-bold text-slate-700">Add Images</span>
                    <span className="text-[9.5px] text-slate-400 leading-tight">
                      Upload up to 10 images (Max 5MB each)
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* SECTION 4: TPO Contacts */}
            <div className={`rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5 ${
              mobileTab !== 'tpos' ? 'hidden md:block' : ''
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">
                      TPO Contacts
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage Training & Placement Officer details.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddTpoModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Add TPO</span>
                </button>
              </div>

              {tpoList.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 rounded-2xl border border-dashed border-slate-200 bg-slate-50">
                  No TPO contacts configured. Click "+ Add TPO" to appoint official coordinators.
                </div>
              ) : (
                <div className="space-y-3">
                  {tpoList.map((tpo, idx) => (
                    <div 
                      key={tpo.id || idx}
                      className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-700 text-white font-bold flex items-center justify-center text-xs shrink-0 font-heading">
                          {tpo.user?.name ? tpo.user.name.slice(0, 2).toUpperCase() : 'TP'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-[#0A2540]">
                              {tpo.user?.name || 'TPO Officer'}
                            </span>
                            {idx === 0 && (
                              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                                Primary TPO
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-0.5">
                            {tpo.user?.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-slate-400" />
                                {tpo.user.email}
                              </span>
                            )}
                            {contactPhone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-slate-400" />
                                {contactPhone}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => alert(`Edit TPO Officer ${tpo.user?.name}`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-teal-50 transition-colors cursor-pointer"
                          title="Edit TPO"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Remove TPO ${tpo.user?.name}?`)) {
                              setTpoList((prev) => prev.filter((_, i) => i !== idx));
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove TPO"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <Link
                href={`/recruiter/colleges/${collegeId}`}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs sm:text-sm font-bold text-slate-700 transition-colors"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-teal-700/20 transition-all hover:scale-101 active:scale-99 cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating College...</span>
                  </>
                ) : (
                  <span>Update College</span>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* RIGHT COLUMN: Live Interactive Profile Card & Tips */}
        <div className="space-y-6">
          
          {/* 1. Live Preview Card */}
          <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs space-y-4">
            
            {/* Campus Cover Banner */}
            <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900 relative">
              {images.length > 0 ? (
                <img src={images[0]} alt="Campus Cover" className="w-full h-full object-cover opacity-80" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600">
                  <Building2 className="w-8 h-8 opacity-40" />
                </div>
              )}
              
              {/* Overlay Logo Crest */}
              <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-2xl border-2 border-white bg-white shadow-md overflow-hidden flex items-center justify-center">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-heading font-black text-teal-700 text-sm">
                    {code || 'DTU'}
                  </span>
                )}
              </div>
            </div>

            {/* University Identity */}
            <div className="p-5 pt-3 space-y-4">
              <div>
                <h3 className="text-base font-extrabold text-[#0A2540] font-heading leading-tight">
                  {name || 'Delhi Technological University'}
                </h3>
                <p className="flex items-center gap-1 text-xs text-slate-500 font-medium mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{[city, state].filter(Boolean).join(', ') || 'New Delhi, Delhi'}</span>
                </p>
              </div>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-slate-100">
                <div className="p-2 rounded-xl bg-slate-50">
                  <span className="block text-xs font-black text-[#0A2540] font-heading">
                    {college?._count?.students ? `${college._count.students}` : '12.8K'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Students</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <span className="block text-xs font-black text-[#0A2540] font-heading">
                    {college?._count?.jobs ? `${college._count.jobs}` : '320'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Active Jobs</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <span className="block text-xs font-black text-[#0A2540] font-heading">
                    {college?._count?.offers ? `${college._count.offers}` : '186'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Offers</span>
                </div>
              </div>

              {/* Metadata details */}
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Member Since
                  </span>
                  <span className="font-semibold text-slate-700">
                    {college?.createdAt 
                      ? new Date(college.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'Jan 15, 2023'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    Verification Status
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Last Updated
                  </span>
                  <span className="font-medium text-slate-500">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* 2. Helpful Tips Card */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2 text-teal-700 font-bold text-xs sm:text-sm font-heading">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Tips for Profile Excellence</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Keep your information updated for better recruiter visibility.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Add high-quality campus images to showcase infrastructure.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Ensure correct contact details for swift placement cell communication.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Contact super admin if you need any domain verification assistance.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* MODAL: Add TPO Officer */}
      {showAddTpoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">
                    Add TPO Officer
                  </h3>
                  <p className="text-xs text-slate-500">
                    Appoint an authorized placement coordinator for {name || 'this college'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddTpoModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {tpoModalError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-800 font-bold">
                <Info className="w-4 h-4 text-red-600 shrink-0" />
                <span>{tpoModalError}</span>
              </div>
            )}

            <form onSubmit={handleAddTpoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Officer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTpoName}
                    onChange={(e) => setNewTpoName(e.target.value)}
                    placeholder="e.g. Dr. Rakesh Kumar"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Official College Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={newTpoEmail}
                    onChange={(e) => setNewTpoEmail(e.target.value)}
                    placeholder={domain ? `tpo@${domain}` : 'tpo@college.edu'}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Temporary Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newTpoPassword}
                    onChange={(e) => setNewTpoPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={newTpoDepartment}
                    onChange={(e) => setNewTpoDepartment(e.target.value)}
                    placeholder="e.g. Central Placement Cell"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  value={newTpoDesignation}
                  onChange={(e) => setNewTpoDesignation(e.target.value)}
                  placeholder="e.g. Head, Training & Placement Cell"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddTpoModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isAddingTpo}
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isAddingTpo ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Appointing...</span>
                    </>
                  ) : (
                    <span>Add Officer</span>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
