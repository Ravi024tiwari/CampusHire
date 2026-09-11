'use client';

import React, { useEffect, useState, use, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';
import { 
  ArrowLeft, 
  Building2, 
  CheckCircle2, 
  ShieldAlert, 
  Globe, 
  MapPin, 
  Mail, 
  Phone, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  Image as ImageIcon, 
  Loader2, 
  ExternalLink,
  Award,
  BookOpen,
  TrendingUp,
  Clock,
  ChevronRight,
  Sparkles,
  UserPlus,
  X,
  Check,
  Search,
  Filter,
  Copy,
  Edit3,
  Layers,
  BarChart3,
  ShieldCheck,
  Share2,
  AlertCircle
} from 'lucide-react';

interface TpoOfficer {
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

interface CampusJob {
  id: string;
  title: string;
  type: string;
  status: string;
  location?: string | null;
  salaryPackage?: string | null;
  minCgpa?: number | null;
  allowedBranches?: string[];
  eligibleBatches?: number[];
  deadline?: string | null;
  createdAt: string;
  company?: {
    id: string;
    name: string;
    logoUrl?: string | null;
    industry?: string | null;
    isVerified: boolean;
  };
  _count?: {
    applications: number;
    offers: number;
  };
}

interface CollegeDetailData {
  college: {
    id: string;
    name: string;
    code?: string | null;
    domain?: string | null;
    city?: string | null;
    state?: string | null;
    logoUrl?: string | null;
    images?: string[];
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    tpos?: TpoOfficer[];
    jobs?: CampusJob[];
  };
  analytics: {
    totalEnrolledStudents: number;
    totalPlacedStudents: number;
    totalUnplacedStudents: number;
    placementRate: string;
    totalPlacementDrives: number;
    totalOffersGenerated: number;
    branchDistribution: { branch: string; count: number }[];
    batchDistribution: { batchYear: number; count: number }[];
  };
}

export default function CollegeDetailsDossierPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const collegeId = resolvedParams.id;
  const router = useRouter();

  const { verifyCollege, isVerifyingId } = useAdminStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CollegeDetailData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'tpos' | 'drives' | 'gallery'>('overview');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Search & Filter States
  const [tpoSearchQuery, setTpoSearchQuery] = useState('');
  const [driveSearchQuery, setDriveSearchQuery] = useState('');
  const [driveTypeFilter, setDriveTypeFilter] = useState<string>('ALL');

  // Edit College Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editCode, setEditCode] = useState('');
  const [editDomain, setEditDomain] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editState, setEditState] = useState('');
  const [editLogoUrl, setEditLogoUrl] = useState('');
  const [isSavingCollege, setIsSavingCollege] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);

  const fetchCollegeDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/admin/colleges/${collegeId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || 'Failed to fetch college dossier');
      }

      setData(result.data);

      // Pre-fill edit modal form
      if (result.data?.college) {
        setEditName(result.data.college.name || '');
        setEditCode(result.data.college.code || '');
        setEditDomain(result.data.college.domain || '');
        setEditCity(result.data.college.city || '');
        setEditState(result.data.college.state || '');
        setEditLogoUrl(result.data.college.logoUrl || '');
      }
    } catch (err: any) {
      console.error('[FETCH_COLLEGE_DETAILS_ERROR]', err);
      setError(err.message || 'Error loading institutional dossier');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (collegeId) {
      fetchCollegeDetails();
    }
  }, [collegeId]);

  const handleAccreditationToggle = async (shouldVerify: boolean) => {
    if (!data?.college) return;
    await verifyCollege(data.college.id, shouldVerify);
    fetchCollegeDetails();
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSaveCollegeDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    setEditSuccess(null);
    setIsSavingCollege(true);

    try {
      const res = await fetch(`/api/admin/colleges/${collegeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editName,
          code: editCode || null,
          domain: editDomain || null,
          city: editCity || null,
          state: editState || null,
          logoUrl: editLogoUrl || null,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to update institutional metadata');
      }

      setEditSuccess('College information updated successfully!');
      fetchCollegeDetails();
      setTimeout(() => {
        setShowEditModal(false);
        setEditSuccess(null);
      }, 1200);
    } catch (err: any) {
      setEditError(err.message || 'Update failed');
    } finally {
      setIsSavingCollege(false);
    }
  };



  // Filtered TPOs
  const filteredTpos = useMemo(() => {
    if (!data?.college?.tpos) return [];
    return data.college.tpos.filter((tpo) => {
      const query = tpoSearchQuery.toLowerCase();
      const name = tpo.user?.name?.toLowerCase() || '';
      const email = tpo.user?.email?.toLowerCase() || '';
      const dept = tpo.department?.toLowerCase() || '';
      const desig = tpo.designation?.toLowerCase() || '';
      return name.includes(query) || email.includes(query) || dept.includes(query) || desig.includes(query);
    });
  }, [data?.college?.tpos, tpoSearchQuery]);

  // Filtered Campus Drives
  const filteredJobs = useMemo(() => {
    if (!data?.college?.jobs) return [];
    return data.college.jobs.filter((job) => {
      const query = driveSearchQuery.toLowerCase();
      const title = job.title.toLowerCase();
      const company = job.company?.name.toLowerCase() || '';
      const matchesSearch = title.includes(query) || company.includes(query);
      const matchesType = driveTypeFilter === 'ALL' || job.type === driveTypeFilter;
      return matchesSearch && matchesType;
    });
  }, [data?.college?.jobs, driveSearchQuery, driveTypeFilter]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mb-4 shadow-sm">
          <Loader2 className="h-7 w-7 animate-spin text-[#0D8B8A]" />
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-[#0A2540] font-heading">
          Loading Institutional Dossier...
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm">
          Retrieving verified college metadata, TPC roster, and campus recruitment metrics.
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        <Link
          href="/admin/colleges"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#0D8B8A] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Colleges Directory</span>
        </Link>

        <div className="rounded-3xl border border-red-200 bg-red-50/70 p-6 sm:p-10 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-2xs">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-red-900 font-heading">
            Unable to load college details
          </h3>
          <p className="text-xs sm:text-sm text-red-700 max-w-md mx-auto">
            {error || 'The requested college record could not be found or has been removed.'}
          </p>
          <button
            onClick={() => fetchCollegeDetails()}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all shadow-sm cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  const { college, analytics } = data;
  const isVerifying = isVerifyingId === college.id;

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 transition-all duration-300 ease-in-out">
      
      {/* 1. Context Breadcrumb Navigation & Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200/80">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 overflow-x-auto whitespace-nowrap py-1">
          <Link 
            href="/admin/dashboard" 
            className="hover:text-[#0D8B8A] transition-colors"
          >
            Super Admin
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <Link 
            href="/admin/colleges" 
            className="hover:text-[#0D8B8A] transition-colors"
          >
            Colleges
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="text-[#0A2540] font-bold truncate max-w-[200px] sm:max-w-[320px]">
            {college.name}
          </span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setShowEditModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-[#0A2540] hover:bg-slate-50 hover:border-teal-300 transition-all shadow-2xs cursor-pointer"
          >
            <Edit3 className="h-3.5 w-3.5 text-[#0D8B8A]" />
            <span>Edit Profile</span>
          </button>

          <Link
            href="/admin/colleges"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-[#0A2540] hover:bg-slate-50 transition-all shadow-2xs"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-slate-400" />
            <span>Directory</span>
          </Link>
        </div>
      </div>

      {/* 2. Institutional Master Hero Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-4.5 sm:p-7 xl:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          
          {/* Left: Emblem & Details */}
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 min-w-0">
            
            {/* Crest / Emblem */}
            <div className="h-16 w-16 sm:h-20 sm:w-20 xl:h-22 xl:w-22 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center text-xl sm:text-2xl font-black text-[#0D8B8A] shadow-xs">
              {college.logoUrl ? (
                <img 
                  src={college.logoUrl} 
                  alt={college.name} 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <span className="font-heading">
                  {college.code || college.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            {/* Title & Metadata */}
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight leading-tight">
                  {college.name}
                </h1>

                {college.code && (
                  <span className="rounded-lg bg-teal-50 px-2.5 py-0.5 text-xs font-mono font-black text-teal-800 border border-teal-200">
                    {college.code}
                  </span>
                )}

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-extrabold border ${
                    college.isVerified
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  {college.isVerified ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Accredited & Verified</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
                      <span>Pending Accreditation</span>
                    </>
                  )}
                </span>
              </div>

              {/* Tags & Quick Contacts Row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                {college.domain && (
                  <button
                    type="button"
                    onClick={() => handleCopy(college.domain!, 'domain')}
                    className="flex items-center gap-1 text-[#0D8B8A] hover:text-teal-800 font-mono font-bold bg-teal-50/70 hover:bg-teal-100/70 px-2 py-0.5 rounded-md border border-teal-100 transition-colors cursor-pointer"
                    title="Click to copy official domain"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>@{college.domain}</span>
                    {copiedText === 'domain' && (
                      <span className="text-[10px] text-emerald-700 font-bold ml-1">Copied!</span>
                    )}
                  </button>
                )}

                {(college.city || college.state) && (
                  <span className="flex items-center gap-1 font-medium text-slate-600">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {[college.city, college.state].filter(Boolean).join(', ')}
                  </span>
                )}

                <span className="flex items-center gap-1 font-medium text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  Registered {new Date(college.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Accreditation & TPO Action Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            {college.isVerified && (
              <Link
                href={`/admin/colleges/${collegeId}/appoint-tpo`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A2540] hover:bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-indigo-950/10 transition-all hover:scale-101 active:scale-99 cursor-pointer"
              >
                <UserPlus className="h-4 w-4 text-[#FBAB23]" />
                <span>Appoint TPO Officer</span>
              </Link>
            )}

            {college.isVerified ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Revoke accreditation for ${college.name}? Placement drives for this college will be placed on hold.`)) {
                    handleAccreditationToggle(false);
                  }
                }}
                disabled={isVerifying}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-red-600 transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
              >
                {isVerifying ? (
                  <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                ) : (
                  <ShieldAlert className="h-4 w-4 text-red-600" />
                )}
                <span>Revoke Accreditation</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleAccreditationToggle(true)}
                disabled={isVerifying}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 hover:bg-teal-800 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-teal-700/20 transition-all hover:scale-101 active:scale-99 cursor-pointer disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Accrediting Institution...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    <span>Accredit & Verify College</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 3. Performance & Institutional Placement Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Metric 1: Enrolled Students */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
              Enrolled Students
            </span>
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700 border border-teal-100 shadow-2xs shrink-0">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
              {analytics.totalEnrolledStudents}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5">
              Across all batches & branches
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-slate-400 font-medium">Placed:</span>
            <span className="font-bold text-emerald-600 font-mono">{analytics.totalPlacedStudents} Students</span>
          </div>
        </div>

        {/* Metric 2: Campus Hiring Drives */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
              Campus Drives
            </span>
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs shrink-0">
              <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
              {analytics.totalPlacementDrives}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5">
              Active & scheduled drives
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-slate-400 font-medium">Recruiting Partners:</span>
            <span className="font-bold text-blue-600 font-mono">{college.jobs?.length || 0} Openings</span>
          </div>
        </div>

        {/* Metric 3: Placement Conversion Rate */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
              Placement Rate
            </span>
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-100 shadow-2xs shrink-0">
              <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
              {analytics.placementRate}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5">
              {analytics.totalPlacedStudents} of {analytics.totalEnrolledStudents} secured
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-slate-400 font-medium">Unplaced pool:</span>
            <span className="font-bold text-amber-600 font-mono">{analytics.totalUnplacedStudents} Candidates</span>
          </div>
        </div>

        {/* Metric 4: Offers Issued */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
              Offers Generated
            </span>
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 border border-purple-100 shadow-2xs shrink-0">
              <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
              {analytics.totalOffersGenerated}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5">
              Formal placement contracts
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-slate-400 font-medium">Officers assigned:</span>
            <span className="font-bold text-purple-600 font-mono">{college.tpos?.length || 0} TPCs</span>
          </div>
        </div>

      </div>

      {/* 4. Interactive Tabbed Navigation */}
      <div className="border-b border-slate-200/90">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1">
          
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'overview'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A2540] hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview & Demographics</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tpos')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'tpos'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A2540] hover:bg-slate-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>TPC Officers</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
              activeTab === 'tpos' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {college.tpos?.length || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('drives')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'drives'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A2540] hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Campus Drives</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
              activeTab === 'drives' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {college.jobs?.length || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'gallery'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A2540] hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Campus Gallery</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
              activeTab === 'gallery' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {college.images?.length || 0}
            </span>
          </button>

        </div>
      </div>

      {/* 5. Dynamic Tab Contents */}

      {/* TAB 1: Overview & Demographics */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Left 2 Cols: Demographics & Distribution */}
          <div className="lg:col-span-2 space-y-5">
            
            {/* Branch-Wise Student Enrollment */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0A2540] font-heading">
                      Branch-Wise Student Enrollment
                    </h3>
                    <p className="text-xs text-slate-500">
                      Distribution of registered candidate profiles across departments
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-400 font-mono">
                  {analytics.branchDistribution.length} Branches
                </span>
              </div>

              {analytics.branchDistribution.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-xs text-slate-500">
                  No branch-specific student data registered for this college yet.
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  {analytics.branchDistribution.map((b, idx) => {
                    const pct = analytics.totalEnrolledStudents > 0 
                      ? Math.round((b.count / analytics.totalEnrolledStudents) * 100) 
                      : 0;
                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-800">{b.branch || 'General'}</span>
                          <span className="text-slate-500 font-mono">
                            {b.count} students ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-teal-600 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Batch Year Distribution */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0A2540] font-heading">
                      Graduation Batch Distribution
                    </h3>
                    <p className="text-xs text-slate-500">
                      Active cohorts participating in placement cycles
                    </p>
                  </div>
                </div>
              </div>

              {analytics.batchDistribution.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-xs text-slate-500">
                  No graduating batch cohorts registered yet.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  {analytics.batchDistribution.map((batch, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 text-center space-y-1"
                    >
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Batch Class
                      </span>
                      <h4 className="text-lg font-black text-[#0A2540] font-heading">
                        {batch.batchYear}
                      </h4>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-teal-100/70 text-teal-800 font-mono text-[10px] font-bold">
                        {batch.count} Candidates
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Col: Placement Conversion & Governance Metadata */}
          <div className="space-y-5">
            
            {/* Conversion Summary Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-4">
              <h3 className="text-sm sm:text-base font-bold text-[#0A2540] font-heading">
                Placement Conversion Summary
              </h3>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50/80 to-emerald-50/50 border border-teal-100 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Placed Rate:</span>
                  <span className="text-teal-800 font-mono text-sm">{analytics.placementRate}</span>
                </div>

                <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-teal-700 h-full transition-all duration-500" 
                    style={{ width: analytics.placementRate }} 
                  />
                  <div 
                    className="bg-amber-400 h-full transition-all duration-500" 
                    style={{ width: `${100 - parseFloat(analytics.placementRate || '0')}%` }} 
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-700 inline-block" />
                    Placed: {analytics.totalPlacedStudents}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    In Pipeline: {analytics.totalUnplacedStudents}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Accreditation Status:</span>
                  <span className="font-bold text-slate-800">
                    {college.isVerified ? 'Accredited (Active)' : 'Pending Review'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Campus Code:</span>
                  <span className="font-mono font-bold text-slate-800">{college.code || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Official Domain:</span>
                  <span className="font-mono font-bold text-teal-700">
                    {college.domain ? `@${college.domain}` : 'None'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Last Synced:</span>
                  <span className="font-medium text-slate-500">
                    {new Date(college.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#0A2540] font-heading">
                Institutional Actions
              </h3>
              
              <div className="space-y-2">
                <Link
                  href={`/admin/colleges/${collegeId}/appoint-tpo`}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 text-[#0A2540] hover:text-indigo-800 border border-slate-200 text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-indigo-600" />
                    <span>Appoint New TPO Officer</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowEditModal(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#0A2540] border border-slate-200 text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-slate-600" />
                    <span>Edit Profile Metadata</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: TPC Officers Roster */}
      {activeTab === 'tpos' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-7 shadow-xs space-y-4">
          
          {/* Section Bar & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">
                Training & Placement Cell (TPC Officers)
              </h3>
              <p className="text-xs text-slate-500">
                Institutional faculty members authorized to manage placement drives and candidate verifications
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={tpoSearchQuery}
                  onChange={(e) => setTpoSearchQuery(e.target.value)}
                  placeholder="Search officer name, dept..."
                  className="pl-8.5 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600 w-44 sm:w-56"
                />
              </div>

              <Link
                href={`/admin/tpos/register?collegeId=${collegeId}`}
                className="px-3.5 py-1.5 rounded-xl bg-[#0A2540] hover:bg-slate-900 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#FBAB23]" />
                <span>Appoint TPO</span>
              </Link>
            </div>
          </div>

          {/* Officers Grid */}
          {filteredTpos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center space-y-3">
              <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">No TPO Officers Found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {tpoSearchQuery 
                  ? 'No TPO matches your search criteria. Try a different search query.' 
                  : 'No placement officers have been appointed for this college yet.'}
              </p>
              <Link
                href={`/admin/tpos/register?collegeId=${collegeId}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A2540] text-white text-xs font-bold hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#FBAB23]" />
                <span>Appoint First TPO Officer</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
              {filteredTpos.map((tpo) => (
                <div 
                  key={tpo.id}
                  className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 space-y-3 hover:bg-white hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {tpo.user?.avatarUrl ? (
                        <img
                          src={tpo.user.avatarUrl}
                          alt={tpo.user.name || 'TPO'}
                          className="h-11 w-11 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
                        />
                      ) : (
                        <div className="h-11 w-11 rounded-2xl bg-[#0A2540] text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0 font-heading">
                          {tpo.user?.name ? tpo.user.name.slice(0, 2).toUpperCase() : 'TP'}
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-[#0A2540]">
                          {tpo.user?.name || 'TPO Officer'}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          {tpo.designation || 'Faculty Placement Coordinator'}
                        </p>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      tpo.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {tpo.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200/60 pt-2.5">
                    {tpo.department && (
                      <p className="flex items-center gap-1.5 text-slate-700">
                        <BookOpen className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{tpo.department}</span>
                      </p>
                    )}
                    {tpo.user?.email && (
                      <button
                        type="button"
                        onClick={() => handleCopy(tpo.user!.email, `tpo-${tpo.id}`)}
                        className="flex items-center gap-1.5 text-teal-700 hover:text-teal-900 font-medium truncate cursor-pointer"
                        title="Click to copy email"
                      >
                        <Mail className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{tpo.user.email}</span>
                        {copiedText === `tpo-${tpo.id}` && (
                          <span className="text-[10px] text-emerald-600 font-bold ml-1">Copied!</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* TAB 3: Campus Drives */}
      {activeTab === 'drives' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-7 shadow-xs space-y-4">
          
          {/* Header Bar & Search/Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">
                Campus Hiring Drives & Job Openings
              </h3>
              <p className="text-xs text-slate-500">
                Corporate placement recruitment drives scheduled specifically for this university campus
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Type Filter */}
              <select
                value={driveTypeFilter}
                onChange={(e) => setDriveTypeFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-teal-600 cursor-pointer"
              >
                <option value="ALL">All Types</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="INTERN_PLUS_FTE">Intern + FTE</option>
              </select>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={driveSearchQuery}
                  onChange={(e) => setDriveSearchQuery(e.target.value)}
                  placeholder="Search role, company..."
                  className="pl-8.5 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600 w-44 sm:w-56"
                />
              </div>
            </div>
          </div>

          {/* Drives Grid */}
          {filteredJobs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center space-y-3">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">No Campus Drives Found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {driveSearchQuery || driveTypeFilter !== 'ALL'
                  ? 'No drives match your filter settings. Try adjusting the search term.'
                  : 'No placement drives have been scheduled yet for this college.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id}
                  className="rounded-2xl border border-slate-200/90 bg-white p-4.5 space-y-3 hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#0A2540] hover:text-teal-700 transition-colors">
                        {job.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {job.company?.name || 'Partner Company'} • <span className="font-semibold text-slate-700">{job.type.replace(/_/g, ' ')}</span>
                      </p>
                    </div>

                    {job.salaryPackage && (
                      <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-mono font-extrabold text-teal-800 border border-teal-200 shrink-0">
                        {job.salaryPackage}
                      </span>
                    )}
                  </div>

                  {/* Eligibility Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    {job.minCgpa !== null && job.minCgpa !== undefined && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono font-bold">
                        Min CGPA: {job.minCgpa}
                      </span>
                    )}
                    {job.allowedBranches && job.allowedBranches.length > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold truncate max-w-[200px]">
                        {job.allowedBranches.join(', ')}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-100 pt-2.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {job.location || 'Campus / Remote'}
                    </span>

                    {job._count && (
                      <span className="flex items-center gap-1 font-bold text-teal-700">
                        <Users className="h-3.5 w-3.5" />
                        {job._count.applications} Applicants
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* TAB 4: Campus Gallery */}
      {activeTab === 'gallery' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">
                Campus Infrastructure & Inspection Assets
              </h3>
              <p className="text-xs text-slate-500">
                Official infrastructure images and campus verification assets ({college.images?.length || 0} photos)
              </p>
            </div>
          </div>

          {!college.images || college.images.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center space-y-3">
              <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">No Campus Photos Uploaded</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No official campus infrastructure assets have been uploaded for this institution yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {college.images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className="group relative h-36 sm:h-48 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 cursor-pointer shadow-2xs hover:shadow-md transition-all"
                >
                  <img
                    src={imgUrl}
                    alt={`Campus photo ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1.5 backdrop-blur-[1px]">
                    <ExternalLink className="h-4 w-4" />
                    <span>View Full Size</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* Lightbox Modal for Gallery */}
      {activeImageIndex !== null && college.images && (
        <div 
          onClick={() => setActiveImageIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-black border border-white/20 shadow-2xl"
          >
            <img 
              src={college.images[activeImageIndex]} 
              alt="Campus photo enlarged view"
              className="max-h-[80vh] w-auto object-contain mx-auto"
            />
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-3 right-3 rounded-full bg-black/70 hover:bg-black text-white p-2 text-xs font-bold transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Edit College Metadata Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">
                    Edit Institutional Profile
                  </h3>
                  <p className="text-xs text-slate-500">
                    Update core metadata and official domain for this university
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-bold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{editSuccess}</span>
              </div>
            )}

            {editError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-800 font-bold">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleSaveCollegeDetails} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  College / University Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    College Code (e.g. DTU)
                  </label>
                  <input
                    type="text"
                    value={editCode}
                    onChange={(e) => setEditCode(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Official Domain
                  </label>
                  <input
                    type="text"
                    value={editDomain}
                    onChange={(e) => setEditDomain(e.target.value)}
                    placeholder="e.g. dtu.ac.in"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={editState}
                    onChange={(e) => setEditState(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Emblem / Logo Image URL
                </label>
                <input
                  type="url"
                  value={editLogoUrl}
                  onChange={(e) => setEditLogoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSavingCollege}
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isSavingCollege ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
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
