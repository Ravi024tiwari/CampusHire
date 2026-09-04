'use client';

import React, { useEffect, useState, use } from 'react';
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
  Lock,
  ShieldCheck
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
  eligibleBatches?: string[];
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
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // TPO Appointment Form State
  const [showAddTpoModal, setShowAddTpoModal] = useState(false);
  const [newTpoName, setNewTpoName] = useState('');
  const [newTpoEmail, setNewTpoEmail] = useState('');
  const [newTpoPassword, setNewTpoPassword] = useState('');
  const [newTpoDepartment, setNewTpoDepartment] = useState('');
  const [newTpoDesignation, setNewTpoDesignation] = useState('');
  const [isSubmittingTpo, setIsSubmittingTpo] = useState(false);
  const [tpoFormError, setTpoFormError] = useState<string | null>(null);
  const [tpoFormSuccess, setTpoFormSuccess] = useState<string | null>(null);

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
    // Refresh the details in place
    fetchCollegeDetails();
  };

  const handleAddTpo = async (e: React.FormEvent) => {
    e.preventDefault();
    setTpoFormError(null);
    setTpoFormSuccess(null);
    setIsSubmittingTpo(true);

    try {
      const res = await fetch(`/api/colleges/${collegeId}/tpos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTpoName,
          email: newTpoEmail,
          password: newTpoPassword,
          department: newTpoDepartment,
          designation: newTpoDesignation,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to appoint TPO officer');
      }

      setTpoFormSuccess('TPO Officer appointed and credentials activated successfully!');
      setNewTpoName('');
      setNewTpoEmail('');
      setNewTpoPassword('');
      setNewTpoDepartment('');
      setNewTpoDesignation('');
      
      // Refresh college details to display updated TPO roster
      fetchCollegeDetails();

      setTimeout(() => {
        setShowAddTpoModal(false);
        setTpoFormSuccess(null);
      }, 1500);
    } catch (err: any) {
      setTpoFormError(err.message || 'Failed to appoint TPO');
    } finally {
      setIsSubmittingTpo(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#2563EB] mb-3" />
        <h3 className="text-base sm:text-lg font-bold text-[#0A2540]">Loading Institutional Dossier...</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Retrieving official records, TPC roster, and campus infrastructure data.</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        <Link
          href="/admin/verify-colleges"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#2563EB] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Verification Queue</span>
        </Link>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8 text-center space-y-3">
          <ShieldAlert className="h-10 w-10 text-red-600 mx-auto" />
          <h3 className="text-lg font-bold text-red-900">Unable to load college details</h3>
          <p className="text-xs sm:text-sm text-red-700 max-w-md mx-auto">{error || 'College record not found.'}</p>
          <button
            onClick={() => fetchCollegeDetails()}
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-4 py-2 text-xs font-extrabold text-white transition-all cursor-pointer"
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
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 transition-all duration-300 ease-in-out">
      
      {/* 1. Breadcrumb & Back Navigation (Desktop/Tablet Only, hidden on mobile for clean screen real estate) */}
      <div className="hidden sm:flex sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
          <Link 
            href="/admin/dashboard" 
            className="hover:text-[#2563EB] transition-colors"
          >
            Super Admin
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <Link 
            href={college.isVerified ? "/admin/colleges" : "/admin/verify-colleges"} 
            className="hover:text-[#2563EB] transition-colors"
          >
            {college.isVerified ? "Accredited Colleges" : "Verification Queue"}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-[#0A2540] font-bold truncate max-w-[160px] sm:max-w-none">
            {college.name}
          </span>
        </div>

        <Link
          href={college.isVerified ? "/admin/colleges" : "/admin/verify-colleges"}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-bold text-[#0A2540] hover:bg-slate-50 hover:border-blue-300 transition-all self-start sm:self-auto shadow-2xs"
        >
          <ArrowLeft className="h-4 w-4 text-slate-500" />
          <span>Back to List</span>
        </Link>
      </div>

      {/* 2. Top University Institutional Banner */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: Crest & Institutional Identity */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
            {/* Crest / Emblem */}
            <div className="h-16 w-16 sm:h-20 sm:w-20 xl:h-24 xl:w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center text-xl sm:text-2xl font-black text-[#2563EB] shadow-sm">
              {college.logoUrl ? (
                <img 
                  src={college.logoUrl} 
                  alt={college.name} 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <span>{college.code || college.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>

            {/* University Metadata */}
            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight leading-tight">
                  {college.name}
                </h1>

                {college.code && (
                  <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-mono font-extrabold text-slate-700 border border-slate-200">
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
                      Accredited & Verified
                    </>
                  ) : (
                    <>
                      <Clock className="h-3.5 w-3.5 text-amber-600" />
                      Awaiting Super Admin Accreditation
                    </>
                  )}
                </span>
              </div>

              {/* Tags Row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-500">
                {college.domain && (
                  <span className="flex items-center gap-1 text-[#2563EB] font-mono font-bold">
                    <Globe className="h-4 w-4 text-[#2563EB]" />
                    @{college.domain}
                  </span>
                )}

                {(college.city || college.state) && (
                  <span className="flex items-center gap-1 font-medium text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {[college.city, college.state].filter(Boolean).join(', ')}
                  </span>
                )}

                <span className="flex items-center gap-1 font-medium text-slate-400">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  Registered on {new Date(college.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Primary Action Controls */}
          <div className="flex items-center gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            {college.isVerified ? (
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to revoke accreditation for ${college.name}?`)) {
                    handleAccreditationToggle(false);
                  }
                }}
                disabled={isVerifying}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-5 py-3 text-xs sm:text-sm font-extrabold text-red-600 transition-all cursor-pointer disabled:opacity-50"
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
                onClick={() => handleAccreditationToggle(true)}
                disabled={isVerifying}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-emerald-600/25 transition-all hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Accrediting Campus...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                    <span>Accredit & Unlock Placement Cells</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 3. Campus Infrastructure Gallery */}
      {college.images && college.images.length > 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-200 shadow-2xs">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0A2540] tracking-tight font-heading">
                  Campus Infrastructure & Inspection Assets
                </h3>
                <p className="text-xs text-slate-500">
                  High-resolution photo assets submitted for campus verification ({college.images.length} photos)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {college.images.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className="group relative h-36 sm:h-44 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 cursor-pointer shadow-2xs hover:shadow-md transition-all"
              >
                <img
                  src={imgUrl}
                  alt={`Campus infrastructure photo ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1 backdrop-blur-[2px]">
                  <ExternalLink className="h-4 w-4" />
                  <span>View Full Photo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full-Screen Lightbox Modal for Photos */}
      {activeImageIndex !== null && college.images && (
        <div 
          onClick={() => setActiveImageIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-4 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-black border border-white/20 shadow-2xl">
            <img 
              src={college.images[activeImageIndex]} 
              alt="Campus infrastructure full view"
              className="max-h-[85vh] w-auto object-contain mx-auto"
            />
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-3 right-3 rounded-full bg-black/60 hover:bg-black/90 text-white p-2 text-xs font-bold transition-colors"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}

      {/* 4. Placement & Institutional KPI Metrics Grid */}
      <div className="relative">
        {/* Compact, Agile Horizontally Swipeable Row on (<xl), 4-Column Grid on Large Screens (xl+) */}
        <div className="flex xl:grid xl:grid-cols-4 gap-2 sm:gap-3 xl:gap-4 overflow-x-auto xl:overflow-x-visible pb-1.5 xl:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 xl:px-0">
          
          {/* Metric 1 */}
          <div className="min-w-[130px] xs:min-w-[145px] sm:min-w-[175px] md:min-w-[195px] xl:min-w-0 max-w-[200px] xl:max-w-none flex-1 shrink-0 snap-start rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-3.5 xl:p-4 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[9.5px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
                Enrolled Students
              </span>
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 xl:h-8 xl:w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs shrink-0">
                <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 xl:h-4 xl:w-4" />
              </div>
            </div>

            <div className="mt-1.5 sm:mt-2.5 flex items-baseline justify-between gap-1">
              <h3 className="text-base xs:text-lg sm:text-xl xl:text-2xl font-extrabold tracking-tight text-slate-800 font-heading">
                {analytics.totalEnrolledStudents}
              </h3>
              <span className="inline-flex items-center gap-0.5 rounded-md bg-slate-50 px-1 xs:px-1.5 py-0.5 text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-semibold text-slate-600 border border-slate-200/70 shrink-0">
                Profiles
              </span>
            </div>

            <div className="mt-2 sm:mt-2.5 xl:mt-3 flex items-center justify-between border-t border-slate-100 pt-1.5 sm:pt-2">
              <p className="text-[9px] xs:text-[9.5px] sm:text-[11px] text-slate-500 font-medium truncate max-w-[75px] xs:max-w-[90px] sm:max-w-[120px]">Verified roster</p>
              <span className="text-[9.5px] xs:text-[10.5px] sm:text-xs font-mono font-bold text-blue-600">Active</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="min-w-[130px] xs:min-w-[145px] sm:min-w-[175px] md:min-w-[195px] xl:min-w-0 max-w-[200px] xl:max-w-none flex-1 shrink-0 snap-start rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-3.5 xl:p-4 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[9.5px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
                Campus Drives
              </span>
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 xl:h-8 xl:w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-2xs shrink-0">
                <Briefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5 xl:h-4 xl:w-4" />
              </div>
            </div>

            <div className="mt-1.5 sm:mt-2.5 flex items-baseline justify-between gap-1">
              <h3 className="text-base xs:text-lg sm:text-xl xl:text-2xl font-extrabold tracking-tight text-slate-800 font-heading">
                {analytics.totalPlacementDrives}
              </h3>
              <span className="inline-flex items-center gap-0.5 rounded-md bg-slate-50 px-1 xs:px-1.5 py-0.5 text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-semibold text-slate-600 border border-slate-200/70 shrink-0">
                Scheduled
              </span>
            </div>

            <div className="mt-2 sm:mt-2.5 xl:mt-3 flex items-center justify-between border-t border-slate-100 pt-1.5 sm:pt-2">
              <p className="text-[9px] xs:text-[9.5px] sm:text-[11px] text-slate-500 font-medium truncate max-w-[75px] xs:max-w-[90px] sm:max-w-[120px]">Hiring drives</p>
              <span className="text-[9.5px] xs:text-[10.5px] sm:text-xs font-mono font-bold text-emerald-600">Live</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="min-w-[130px] xs:min-w-[145px] sm:min-w-[175px] md:min-w-[195px] xl:min-w-0 max-w-[200px] xl:max-w-none flex-1 shrink-0 snap-start rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-3.5 xl:p-4 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[9.5px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
                Placement Rate
              </span>
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 xl:h-8 xl:w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-100 shadow-2xs shrink-0">
                <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 xl:h-4 xl:w-4" />
              </div>
            </div>

            <div className="mt-1.5 sm:mt-2.5 flex items-baseline justify-between gap-1">
              <h3 className="text-base xs:text-lg sm:text-xl xl:text-2xl font-extrabold tracking-tight text-slate-800 font-heading">
                {analytics.placementRate}
              </h3>
              <span className="inline-flex items-center gap-0.5 rounded-md bg-slate-50 px-1 xs:px-1.5 py-0.5 text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-semibold text-slate-600 border border-slate-200/70 shrink-0">
                {analytics.totalPlacedStudents} Placed
              </span>
            </div>

            <div className="mt-2 sm:mt-2.5 xl:mt-3 flex items-center justify-between border-t border-slate-100 pt-1.5 sm:pt-2">
              <p className="text-[9px] xs:text-[9.5px] sm:text-[11px] text-slate-500 font-medium truncate max-w-[75px] xs:max-w-[90px] sm:max-w-[120px]">Conversion</p>
              <span className="text-[9.5px] xs:text-[10.5px] sm:text-xs font-mono font-bold text-amber-600">Batch 2026</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="min-w-[130px] xs:min-w-[145px] sm:min-w-[175px] md:min-w-[195px] xl:min-w-0 max-w-[200px] xl:max-w-none flex-1 shrink-0 snap-start rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-3.5 xl:p-4 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[9.5px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
                Offers Generated
              </span>
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 xl:h-8 xl:w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-2xs shrink-0">
                <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 xl:h-4 xl:w-4" />
              </div>
            </div>

            <div className="mt-1.5 sm:mt-2.5 flex items-baseline justify-between gap-1">
              <h3 className="text-base xs:text-lg sm:text-xl xl:text-2xl font-extrabold tracking-tight text-slate-800 font-heading">
                {analytics.totalOffersGenerated}
              </h3>
              <span className="inline-flex items-center gap-0.5 rounded-md bg-slate-50 px-1 xs:px-1.5 py-0.5 text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-semibold text-slate-600 border border-slate-200/70 shrink-0">
                Letters
              </span>
            </div>

            <div className="mt-2 sm:mt-2.5 xl:mt-3 flex items-center justify-between border-t border-slate-100 pt-1.5 sm:pt-2">
              <p className="text-[9px] xs:text-[9.5px] sm:text-[11px] text-slate-500 font-medium truncate max-w-[75px] xs:max-w-[90px] sm:max-w-[120px]">Issued offers</p>
              <span className="text-[9.5px] xs:text-[10.5px] sm:text-xs font-mono font-bold text-indigo-600">Season '26</span>
            </div>
          </div>

        </div>

        {/* Subtle Swipe Hint on all screens below xl */}
        <div className="flex xl:hidden items-center justify-center gap-1 pt-1 text-[9px] sm:text-[10px] text-slate-400 font-medium">
          <span>← Swipe to explore metrics →</span>
        </div>
      </div>

      {/* 5. TPO Cell & Departmental Officers Roster */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200 shadow-2xs">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A2540] tracking-tight font-heading">
                Training & Placement Cell (TPC Officers)
              </h3>
              <p className="text-xs text-slate-500">
                Institutional faculty coordinators authorized to manage campus drives
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 border border-slate-200">
              {college.tpos?.length || 0} Officers Assigned
            </span>
            {college.isVerified && (
              <button
                type="button"
                onClick={() => setShowAddTpoModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Appoint TPO Officer</span>
              </button>
            )}
          </div>
        </div>

        {!college.tpos || college.tpos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-xs sm:text-sm text-slate-500">
            No TPO officers currently registered for this university campus.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {college.tpos.map((tpo) => (
              <div 
                key={tpo.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#2563EB] text-white font-bold flex items-center justify-center text-sm shadow-2xs">
                    {tpo.user?.name ? tpo.user.name.slice(0, 2).toUpperCase() : 'TP'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0A2540]">{tpo.user?.name || 'TPO Officer'}</h4>
                    <p className="text-xs text-slate-500 font-medium">{tpo.designation || 'Faculty Placement Coordinator'}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200/60 pt-2.5">
                  {tpo.department && (
                    <p className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                      <span>{tpo.department}</span>
                    </p>
                  )}
                  {tpo.user?.email && (
                    <p className="flex items-center gap-1.5 text-[#2563EB] font-medium">
                      <Mail className="h-3.5 w-3.5 text-[#2563EB]" />
                      <span>{tpo.user.email}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Campus Placement Drives Active */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-2xs">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A2540] tracking-tight font-heading">
                Campus Hiring Drives & Openings
              </h3>
              <p className="text-xs text-slate-500">
                Active corporate recruiting drives scheduled for this university
              </p>
            </div>
          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800 border border-emerald-200">
            {college.jobs?.length || 0} Drives
          </span>
        </div>

        {!college.jobs || college.jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-xs sm:text-sm text-slate-500">
            No campus placement drives scheduled yet. Accrediting this university will allow recruiters to schedule drives.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {college.jobs.map((job) => (
              <div 
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-4.5 space-y-3 hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0A2540] hover:text-[#2563EB] transition-colors">
                      {job.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {job.company?.name || 'Recruiting Partner'} • {job.type}
                    </p>
                  </div>
                  {job.salaryPackage && (
                    <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-mono font-extrabold text-emerald-800 border border-emerald-200">
                      {job.salaryPackage}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 border-t border-slate-100 pt-2.5">
                  {job.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {job.location}
                    </span>
                  )}
                  {job._count && (
                    <span className="flex items-center gap-1 font-bold text-[#2563EB]">
                      <Users className="h-3.5 w-3.5 text-[#2563EB]" />
                      {job._count.applications} Applications
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Appoint TPO Officer Modal */}
      {showAddTpoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0A2540] font-heading">
                    Appoint TPO Officer
                  </h3>
                  <p className="text-xs text-slate-500">
                    Assign an authorized faculty placement coordinator for <span className="font-bold text-[#0A2540]">{college.name}</span>
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

            {/* Success Message */}
            {tpoFormSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800 font-bold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{tpoFormSuccess}</span>
              </div>
            )}

            {/* Error Message */}
            {tpoFormError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs text-rose-800 font-bold">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{tpoFormError}</span>
              </div>
            )}

            {/* Appointment Form */}
            <form onSubmit={handleAddTpo} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                    Officer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTpoName}
                    onChange={(e) => setNewTpoName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="input-placecom !py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                    Official College Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={newTpoEmail}
                    onChange={(e) => setNewTpoEmail(e.target.value)}
                    placeholder={college.domain ? `tpo@${college.domain}` : 'tpo@college.edu'}
                    className="input-placecom !py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                    Temporary Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newTpoPassword}
                    onChange={(e) => setNewTpoPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="input-placecom !py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                    Department / Branch
                  </label>
                  <input
                    type="text"
                    value={newTpoDepartment}
                    onChange={(e) => setNewTpoDepartment(e.target.value)}
                    placeholder="e.g. Computer Science & Engg"
                    className="input-placecom !py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                  Designation / Role in TPC
                </label>
                <input
                  type="text"
                  value={newTpoDesignation}
                  onChange={(e) => setNewTpoDesignation(e.target.value)}
                  placeholder="e.g. Head of Training & Placement / Faculty Coordinator"
                  className="input-placecom !py-2 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddTpoModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmittingTpo}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isSubmittingTpo ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Appointing Officer...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Confirm & Appoint TPO</span>
                    </>
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
