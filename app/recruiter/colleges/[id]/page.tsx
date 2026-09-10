'use client';

import React, { useEffect, useState, use, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { CollegeDetail, CollegeJobSummary } from '../_types/recruiter-colleges.types';
import { 
  Building2, 
  CheckCircle2, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Users, 
  Briefcase, 
  ExternalLink, 
  Loader2, 
  ShieldCheck, 
  GraduationCap, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Copy, 
  Check, 
  Calendar, 
  Award, 
  FileText, 
  TrendingUp, 
  School,
  ChevronRight,
  ChevronLeft,
  X,
  Download,
  MoreVertical,
  Share2,
  Bookmark,
  PlusCircle,
  Clock,
  Layers,
  FlaskConical,
  Trophy,
  Network,
  Sun,
  FileDown,
  Send,
  Building,
  CheckCircle,
  Search,
  Filter,
  SlidersHorizontal,
  Zap,
  Star,
  DollarSign,
  Eye,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type TabType = 
  | 'overview' 
  | 'placement' 
  | 'courses' 
  | 'infrastructure' 
  | 'demographics' 
  | 'recruitment' 
  | 'contact';

export default function RecruiterCollegeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const collegeId = resolvedParams.id;
  const router = useRouter();

  const [college, setCollege] = useState<CollegeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Interactive UI states
  const [isSaved, setIsSaved] = useState(false);
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isReadMoreBio, setIsReadMoreBio] = useState(false);
  const [partnerMessageSent, setPartnerMessageSent] = useState(false);
  const [partnerNote, setPartnerNote] = useState('');

  // Recruiting Companies Interactive Filtering State
  const [companyCategory, setCompanyCategory] = useState<string>('all');
  const [companySearch, setCompanySearch] = useState<string>('');
  const [selectedCompanyTier, setSelectedCompanyTier] = useState<string>('all');
  const [showAllCompanies, setShowAllCompanies] = useState<boolean>(false);

  // Placement Drives / Job Posting Cards Interactive State
  const [jobSearch, setJobSearch] = useState<string>('');
  const [jobTypeFilter, setJobTypeFilter] = useState<string>('ALL');
  const [jobStatusFilter, setJobStatusFilter] = useState<string>('ALL');
  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);

  // Fetch full details from production route
  useEffect(() => {
    async function fetchCollegeDetails() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<ApiResponse<CollegeDetail>>(`/api/colleges/${collegeId}`);
        if (response.data.success && response.data.data) {
          setCollege(response.data.data);
        } else {
          setError(response.data.message || 'Failed to load college details');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while loading college details');
      } finally {
        setIsLoading(false);
      }
    }

    if (collegeId) {
      fetchCollegeDetails();
    }
  }, [collegeId]);

  // All useMemo hooks defined unconditionally BEFORE any early returns (Rules of Hooks)
  const recruitingCompanies = useMemo(() => {
    return college?.recruitingCompanies || [];
  }, [college?.recruitingCompanies]);

  const collegeJobs = useMemo(() => {
    return college?.jobs || [];
  }, [college?.jobs]);

  const filteredCollegeJobs = useMemo(() => {
    return collegeJobs.filter((job) => {
      if (jobTypeFilter !== 'ALL' && job.type !== jobTypeFilter) {
        return false;
      }
      if (jobStatusFilter !== 'ALL') {
        const status = job.status || 'ACTIVE';
        if (status !== jobStatusFilter) return false;
      }
      if (jobSearch.trim()) {
        const q = jobSearch.toLowerCase().trim();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchCompany = (job.company?.name || '').toLowerCase().includes(q);
        const matchPackage = (job.salaryPackage || '').toLowerCase().includes(q);
        const matchLocation = (job.location || '').toLowerCase().includes(q);
        if (!matchTitle && !matchCompany && !matchPackage && !matchLocation) return false;
      }
      return true;
    });
  }, [collegeJobs, jobTypeFilter, jobStatusFilter, jobSearch]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: recruitingCompanies.length,
      tech: 0,
      fintech: 0,
      consulting: 0,
      core: 0,
      startup: 0,
    };
    recruitingCompanies.forEach((c) => {
      const cat = c.category || 'tech';
      if (counts[cat] !== undefined) {
        counts[cat]++;
      } else {
        counts.tech++;
      }
    });
    return counts;
  }, [recruitingCompanies]);

  const filteredRecruitingCompanies = useMemo(() => {
    return recruitingCompanies.filter((comp) => {
      if (companyCategory !== 'all' && (comp.category || 'tech') !== companyCategory) {
        return false;
      }
      if (selectedCompanyTier !== 'all' && comp.tier !== selectedCompanyTier) {
        return false;
      }
      if (companySearch.trim()) {
        const q = companySearch.toLowerCase().trim();
        const matchName = comp.name.toLowerCase().includes(q);
        const matchIndustry = (comp.industry || '').toLowerCase().includes(q);
        const matchRoles = (comp.roles || []).some((r) => r.toLowerCase().includes(q));
        if (!matchName && !matchIndustry && !matchRoles) return false;
      }
      return true;
    });
  }, [recruitingCompanies, companyCategory, selectedCompanyTier, companySearch]);

  const handleCopyJobLink = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/student/jobs/${jobId}`);
      setCopiedJobId(jobId);
      setTimeout(() => setCopiedJobId(null), 2000);
    }
  };

  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopiedLink(true);
      setTimeout(() => setIsCopiedLink(false), 2000);
      setIsMoreMenuOpen(false);
    }
  };

  const handleToggleBookmark = () => {
    setIsSaved((prev) => !prev);
    setIsMoreMenuOpen(false);
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerMessageSent(true);
    setTimeout(() => {
      setPartnerMessageSent(false);
      setIsPartnerModalOpen(false);
      setPartnerNote('');
    }, 2000);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-5 w-36 bg-slate-200 rounded-md" />
        <div className="h-64 rounded-3xl bg-slate-200" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-200" />
          ))}
        </div>
        <div className="h-12 rounded-2xl bg-slate-200" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 rounded-3xl bg-slate-200" />
          <div className="h-96 rounded-3xl bg-slate-200" />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !college) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <Link
          href="/recruiter/colleges"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Colleges</span>
        </Link>

        <div className="p-8 sm:p-12 text-center rounded-3xl border border-red-200 bg-red-50 text-red-700 space-y-3 shadow-xs">
          <School className="w-12 h-12 mx-auto text-red-500" />
          <h2 className="text-lg font-bold">University Details Not Available</h2>
          <p className="text-xs sm:text-sm text-red-600 max-w-md mx-auto">
            {error || 'The requested college could not be found in the system registry.'}
          </p>
          <Button
            type="button"
            onClick={() => router.push('/recruiter/colleges')}
            className="rounded-xl bg-blue-600 text-white font-bold text-xs px-5 py-2.5 shadow-md shadow-blue-600/20"
          >
            Return to Colleges Directory
          </Button>
        </div>
      </div>
    );
  }

  // Structured data helpers
  const code = (college.code || 'DTU').toUpperCase();
  const locationText = [college.city, college.state].filter(Boolean).join(', ') || 'Delhi, India';
  const bannerPhoto = college.images?.[0] || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80';
  const stats = college.placementStats;

  const totalStudents = stats?.enrolledStudents ?? college._count?.students ?? 12482;
  const placementEligible = stats?.placementEligible ?? Math.round(totalStudents * 0.82);
  const placementRate = stats?.placementRate ?? 78;
  const recruitingCompaniesCount = stats?.recruitingCompaniesCount ?? 240;

  const websiteUrl = college.domain 
    ? (college.domain.startsWith('http') ? college.domain : `https://${college.domain}`)
    : 'https://dtu.ac.in';

  const contactEmail = college.contactEmail || college.keyDetails?.contactEmail || `tpo@${college.domain || 'dtu.ac.in'}`;
  const contactPhone = college.contactPhone || college.keyDetails?.contactPhone || '+91 11 2787 1000';

  const highlights = college.highlights || [
    { title: 'Top 10', subtitle: 'Engineering Institutes in India', icon: 'trophy' },
    { title: 'Strong Industry', subtitle: 'Collaborations & Global MoUs', icon: 'network' },
    { title: 'Modern Labs', subtitle: '& Research Facilities', icon: 'flask' },
    { title: 'Vibrant Campus', subtitle: 'Life & Hackathons', icon: 'sparkles' },
  ];

  const keyDetails = college.keyDetails || {
    universityType: 'Public University',
    establishedYear: 1941,
    location: locationText,
    website: college.domain || 'www.dtu.ac.in',
    contactEmail: contactEmail,
    contactPhone: contactPhone,
    accreditation: 'NAAC A+',
    approvedBy: 'AICTE, UGC',
  };

  const brochure = college.brochure || {
    title: `${code} Placement Brochure 2024-25`,
    format: 'PDF',
    size: '2.4 MB',
    url: '#',
  };

  const mapLocation = college.mapLocation || {
    label: `${college.name}, Rohini, ${college.city || 'Delhi'}`,
    mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(`${college.name} ${college.city || ''}`)}`,
  };

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Breadcrumb Navigation */}
      <div>
        <Link
          href="/recruiter/colleges"
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Colleges</span>
        </Link>
      </div>

      {/* 2. Main Header Showcase Banner Card matching Mockup */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-xs p-4 sm:p-6 lg:p-7 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          
          {/* Left: Campus Image Frame */}
          <div className="relative w-full lg:w-72 h-48 sm:h-52 lg:h-44 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80 shadow-2xs">
            <Image
              src={bannerPhoto}
              alt={college.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 300px"
              className="object-cover"
            />
          </div>

          {/* Center & Right: College Info & Primary Actions */}
          <div className="flex-1 min-w-0 space-y-3 w-full">
            
            {/* Top Row: Title, Verified Badge, Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
                    {college.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified College
                  </span>
                </div>

                <div className="flex items-center gap-1 text-slate-500 text-xs sm:text-sm font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{locationText}</span>
                </div>
              </div>

              {/* Action Buttons: Partner with Us + More Options + Brochure */}
              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto flex-wrap">
                <Button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(true)}
                  className="rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold px-5 py-2.5 shadow-md shadow-blue-600/20 cursor-pointer transition-all active:scale-95"
                >
                  Partner with Us
                </Button>

                {/* More Options Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsMoreMenuOpen((prev) => !prev)}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
                    title="More actions"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {isMoreMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                      <button
                        type="button"
                        onClick={handleToggleBookmark}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors text-left"
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'text-blue-600 fill-blue-600' : 'text-slate-400'}`} />
                        <span>{isSaved ? 'Saved in Directory' : 'Bookmark College'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleShareLink}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors text-left"
                      >
                        {isCopiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-400" />}
                        <span>{isCopiedLink ? 'Link Copied!' : 'Share Profile'}</span>
                      </button>

                      <Link
                        href={`/recruiter/jobs/create?collegeId=${college.id}`}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors text-left"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Post Placement Drive</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Download Brochure CTA Button */}
                <a
                  href={brochure.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#0A2540] text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Download Brochure</span>
                </a>
              </div>
            </div>

            {/* Short Bio Paragraph */}
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed line-clamp-2 sm:line-clamp-none">
              {college.about?.summary || `${college.name} (${code}) is a premier engineering institution known for its academic excellence, innovative culture, and industry-oriented programs. ${code} has a strong track record of placements and produces highly skilled professionals across various domains.`}
            </p>

            {/* Quick Links Row: Website, Email, Phone */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-slate-600 font-semibold">
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 hover:underline"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{college.domain || 'dtu.ac.in'}</span>
              </a>

              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{contactEmail}</span>
              </a>

              <a
                href={`tel:${contactPhone}`}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{contactPhone}</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Top 4 Metric KPI Cards matching Mockup - Horizontal scrollable on smaller screens */}
      <div className="relative">
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto pb-2 md:pb-0 pt-0.5 -mx-3 px-3 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          
          {/* KPI 1: Total Students */}
          <div className="min-w-[240px] sm:min-w-[260px] md:min-w-0 flex-1 shrink-0 snap-start rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-3.5 hover:border-blue-300 hover:shadow-sm transition-all">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-lg sm:text-2xl font-black text-slate-900 font-heading block leading-tight truncate">
                {totalStudents.toLocaleString()}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">
                Total Students
              </span>
            </div>
          </div>

          {/* KPI 2: Placement Eligible */}
          <div className="min-w-[240px] sm:min-w-[260px] md:min-w-0 flex-1 shrink-0 snap-start rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-3.5 hover:border-emerald-300 hover:shadow-sm transition-all">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-lg sm:text-2xl font-black text-slate-900 font-heading block leading-tight truncate">
                {placementEligible.toLocaleString()}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">
                Placement Eligible
              </span>
            </div>
          </div>

          {/* KPI 3: Placement Rate */}
          <div className="min-w-[240px] sm:min-w-[260px] md:min-w-0 flex-1 shrink-0 snap-start rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-3.5 hover:border-blue-300 hover:shadow-sm transition-all">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-lg sm:text-2xl font-black text-slate-900 font-heading block leading-tight truncate">
                {placementRate}%
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">
                Placement Rate
              </span>
            </div>
          </div>

          {/* KPI 4: Recruiting Companies */}
          <div className="min-w-[240px] sm:min-w-[260px] md:min-w-0 flex-1 shrink-0 snap-start rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-3.5 hover:border-sky-300 hover:shadow-sm transition-all">
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-lg sm:text-2xl font-black text-slate-900 font-heading block leading-tight truncate">
                {recruitingCompanies.length > 0 ? `${recruitingCompanies.length}` : '0'}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">
                {recruitingCompanies.length > 0 ? 'Recruiting Companies' : 'No Companies Tied Up'}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Tab Navigation Strip matching Mockup */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto pb-0.5 [scrollbar-width:none]">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'placement', label: 'Placement Statistics' },
            { id: 'courses', label: 'Courses & Programs' },
            { id: 'infrastructure', label: 'Infrastructure' },
            { id: 'demographics', label: 'Student Demographics' },
            { id: 'recruitment', label: 'Recruitment Process' },
            { id: 'contact', label: 'Contact' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-3 px-1 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-600 font-black'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Tab Content: Overview (2-Column Responsive Layout matching Screenshot) */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column (2/3 width on Desktop): About, Highlights, Companies, Map */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 5.1 About the College */}
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
                About the College
              </h3>

              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {college.about?.description || `Established in 1941 as Delhi Polytechnic and later elevated to university status, ${college.name} has been at the forefront of technical education in India. The university is known for its rigorous curriculum, world-class faculty, and strong industry connections.`}
                </p>
                {isReadMoreBio && (
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed animate-in fade-in duration-200">
                    The institution offers undergraduate, postgraduate, and doctoral degrees in various engineering and management disciplines, fostering an ecosystem of entrepreneurship, research excellence, and national innovation.
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setIsReadMoreBio((prev) => !prev)}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer block pt-1"
                >
                  {isReadMoreBio ? 'Read Less' : 'Read More'}
                </button>
              </div>

              {/* 4 Feature Badges Strip (Established, Type, Approved By, Accreditation) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#0A2540] block truncate">{keyDetails.establishedYear}</span>
                    <span className="text-[10px] text-slate-400 font-medium block uppercase">Established</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                  <Building className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#0A2540] block truncate">{keyDetails.universityType}</span>
                    <span className="text-[10px] text-slate-400 font-medium block uppercase">Type</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#0A2540] block truncate">{keyDetails.approvedBy}</span>
                    <span className="text-[10px] text-slate-400 font-medium block uppercase">Approved By</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#0A2540] block truncate">{keyDetails.accreditation}</span>
                    <span className="text-[10px] text-slate-400 font-medium block uppercase">Accreditation</span>
                  </div>
                </div>
              </div>

            </div>

            {/* 5.2 Highlights (2x2 Grid) */}
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
                Highlights
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-sm transition-all flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      {item.icon === 'trophy' ? <Trophy className="w-4 h-4" /> :
                       item.icon === 'network' ? <Network className="w-4 h-4" /> :
                       item.icon === 'flask' ? <FlaskConical className="w-4 h-4" /> :
                       <Sun className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-extrabold text-[#0A2540] block truncate">
                        {item.title}
                      </span>
                      <span className="text-xs text-slate-500 font-medium block">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5.3 Corporate Recruiting Partners & Hiring Ecosystem (Interactive & Responsive) */}
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 lg:p-7 shadow-xs space-y-6">
              
              {/* Header Title & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
                      Corporate Recruiting Partners
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10.5px] font-extrabold border border-blue-200/60">
                      {recruitingCompanies.length > 0 ? `${recruitingCompanies.length}+ Active` : 'No Partners Yet'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Verified institutional hiring network, marquee employers & placement track record.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('placement')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <span>Placement Intelligence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Conditional: When NO companies are tied up yet, render comprehensive informative fallback */}
              {recruitingCompanies.length === 0 ? (
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/60 via-slate-50/80 to-indigo-50/50 p-6 sm:p-8 text-center space-y-6">
                  {/* Decorative background blurs */}
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-44 h-44 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Header Badge & Icon */}
                  <div className="relative space-y-3 max-w-xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/90 border border-blue-200 text-blue-700 text-xs font-extrabold tracking-wide uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Early Hiring Opportunity</span>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-white border border-blue-100 shadow-md text-blue-600 flex items-center justify-center mx-auto">
                      <Building2 className="w-8 h-8 text-[#0066FF]" />
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-base sm:text-xl font-black text-[#0A2540] font-heading">
                        No Corporate Hiring Partners Tied Up Yet
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        There are currently no enterprise recruiters or campus hiring drives tied up with <span className="font-bold text-slate-900">{college.name}</span> on CampusHire. You have a prime opportunity to be their first corporate hiring partner.
                      </p>
                    </div>
                  </div>

                  {/* 3 Key First-Mover Advantage Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-2xl mx-auto">
                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-1.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                        <Users className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-bold text-[#0A2540]">Priority Talent Access</h5>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        First pick of {placementEligible.toLocaleString()} verified student profiles and graduating engineers across all branches.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-1.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                        <Zap className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-bold text-[#0A2540]">Zero Hiring Competition</h5>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        Organize exclusive online assessments and offline interview slots without competing enterprise drives.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs space-y-1.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-bold text-[#0A2540]">Direct TPO Coordination</h5>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        Direct communication with institutional Training & Placement Officers to fast-track recruitment drives.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons Strip */}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href={`/recruiter/jobs/create?collegeId=${college.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white text-xs font-extrabold transition-all cursor-pointer shadow-md shadow-blue-600/25 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Post First Campus Placement Drive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => setIsPartnerModalOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0A2540] border border-slate-200/90 text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                    >
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span>Request Campus Tie-Up / Connect TPO</span>
                    </button>
                  </div>

                  {/* Quick TPO Contact Link */}
                  {keyDetails.contactEmail && (
                    <div className="pt-1 text-center">
                      <span className="text-[11px] text-slate-500 font-medium">
                        Need placement cell coordination? Contact{' '}
                        <a
                          href={`mailto:${keyDetails.contactEmail}?subject=${encodeURIComponent(`Campus Placement Partnership - ${college.name}`)}`}
                          className="text-blue-600 font-bold hover:underline"
                        >
                          {keyDetails.contactEmail}
                        </a>
                        {keyDetails.contactPhone && (
                          <> or call <span className="text-slate-800 font-bold">{keyDetails.contactPhone}</span></>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* 4-Stat Ecosystem Intelligence Strip */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 space-y-0.5">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Top Package</span>
                      <span className="text-sm sm:text-base font-black text-emerald-600 font-heading block truncate">
                        {stats?.highestPackage || 'Competitive'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium block">Institutional Max</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 space-y-0.5">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Avg Package</span>
                      <span className="text-sm sm:text-base font-black text-[#0A2540] font-heading block truncate">
                        {stats?.averagePackage || 'Competitive'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium block">Batch Average</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 space-y-0.5">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Verified Partners</span>
                      <span className="text-sm sm:text-base font-black text-blue-600 font-heading block truncate">
                        {recruitingCompanies.filter((c) => c.tier === 'Verified Partner' || c.tier === 'Tier-1' || c.tier === 'Marquee').length} Partners
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium block">Verified Tier-1</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 space-y-0.5">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Active Employers</span>
                      <span className="text-sm sm:text-base font-black text-purple-600 font-heading block truncate">
                        {recruitingCompanies.length} Recruiters
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium block">Campus Drives</span>
                    </div>
                  </div>

                  {/* Interactive Search & Filter Toolbar */}
                  <div className="space-y-3 pt-1">
                    
                    {/* Search Bar + Tier Selector */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={companySearch}
                          onChange={(e) => setCompanySearch(e.target.value)}
                          placeholder="Search by company name, sector or role (e.g. Google, SDE, Quant)..."
                          className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                        />
                        {companySearch && (
                          <button
                            type="button"
                            onClick={() => setCompanySearch('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Tier Filter Toggle */}
                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-auto overflow-x-auto">
                        {[
                          { id: 'all', label: 'All Partners' },
                          { id: 'Verified Partner', label: 'Verified Partners' },
                        ].map((tier) => (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setSelectedCompanyTier(tier.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                              selectedCompanyTier === tier.id
                                ? 'bg-white text-blue-600 shadow-2xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {tier.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Industry Category Filter Pills (Scrollable on Mobile) */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {[
                        { id: 'all', label: 'All Sectors', count: categoryCounts.all },
                        { id: 'tech', label: 'Tech & Cloud', count: categoryCounts.tech },
                        { id: 'fintech', label: 'FinTech & Quant', count: categoryCounts.fintech },
                        { id: 'consulting', label: 'Consulting & Strategy', count: categoryCounts.consulting },
                        { id: 'core', label: 'Core & Automotive', count: categoryCounts.core },
                        { id: 'startup', label: 'Startups & Unicorns', count: categoryCounts.startup },
                      ].map((cat) => {
                        const isActive = companyCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCompanyCategory(cat.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                              isActive
                                ? 'bg-[#0A2540] text-white shadow-2xs'
                                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                            }`}
                          >
                            <span>{cat.label}</span>
                            {cat.count > 0 && (
                              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                                isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                              }`}>
                                {cat.count}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                  </div>

                  {/* Filtered Empty State */}
                  {filteredRecruitingCompanies.length === 0 ? (
                    <div className="py-12 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 text-center space-y-2.5">
                      <Building2 className="w-8 h-8 text-slate-300 mx-auto" />
                      <h4 className="text-sm font-extrabold text-[#0A2540]">No Matching Companies Found</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        No corporate recruiting partners matched your current category or search keyword.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setCompanyCategory('all');
                          setSelectedCompanyTier('all');
                          setCompanySearch('');
                        }}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {(showAllCompanies ? filteredRecruitingCompanies : filteredRecruitingCompanies.slice(0, 8)).map((comp) => {
                    const isMarquee = comp.tier === 'Marquee';
                    return (
                      <div
                        key={comp.id}
                        className="group relative rounded-2xl border border-slate-200/90 bg-white hover:border-blue-300 p-4 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3 hover:-translate-y-0.5"
                      >
                        {/* Top: Logo + Name + Tier Badge */}
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center p-2 shrink-0 shadow-2xs group-hover:border-blue-300 transition-colors">
                            {comp.logoUrl ? (
                              <img
                                src={comp.logoUrl}
                                alt={comp.name}
                                className="max-h-8 max-w-[36px] object-contain"
                              />
                            ) : (
                              <Building2 className="w-6 h-6 text-slate-400" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1 space-y-0.5">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="font-black text-sm text-[#0A2540] group-hover:text-blue-600 transition-colors truncate block">
                                {comp.name}
                              </span>
                              {comp.tier && (
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                                  isMarquee
                                    ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                                    : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                                }`}>
                                  {comp.tier}
                                </span>
                              )}
                            </div>

                            <span className="text-xs text-slate-500 font-medium block truncate">
                              {comp.industry || 'Corporate Partner'}
                            </span>
                          </div>
                        </div>

                        {/* Middle: Package Range & Hires Badge */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {comp.packageRange && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-extrabold border border-emerald-200/60">
                              <TrendingUp className="w-3 h-3 text-emerald-600" />
                              <span>{comp.packageRange}</span>
                            </span>
                          )}

                          {comp.hiresCount && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold">
                              <Users className="w-3 h-3 text-slate-500" />
                              <span>{comp.hiresCount}+ Hired</span>
                            </span>
                          )}
                        </div>

                        {/* Hired Roles Tags */}
                        {comp.roles && comp.roles.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 pt-0.5">
                            {comp.roles.map((role, rIdx) => (
                              <span
                                key={rIdx}
                                className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/80 text-slate-600 text-[10.5px] font-semibold"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Bottom Action Strip */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          <Link
                            href={`/recruiter/jobs/create?collegeId=${college.id}`}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 group-hover:text-blue-700 transition-colors"
                          >
                            <span>Post Drive Here</span>
                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                          </Link>

                          <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-slate-400">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>Verified Recruiter</span>
                          </span>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

              {/* Show More / Show Less Toggle */}
              {filteredRecruitingCompanies.length > 8 && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAllCompanies((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                  >
                    <span>
                      {showAllCompanies
                        ? 'Show Top Partners Only'
                        : `Explore All ${filteredRecruitingCompanies.length} Recruiting Partners`}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAllCompanies ? '-rotate-90' : 'rotate-90'}`} />
                  </button>
                </div>
              )}
                </>
              )}

            </div>

          </div>

          {/* Right Column (1/3 width on Desktop): Verified Card, Key Details, Social, Brochure */}
          <div className="space-y-6">
            
            {/* 5.5 Verified Information Card */}
            <div className="rounded-2xl sm:rounded-3xl bg-emerald-50/70 border border-emerald-200/90 p-5 shadow-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <h4 className="text-sm font-black text-emerald-950 font-heading">
                  Verified Information
                </h4>
                <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                  This college&apos;s information and placement statistics have been verified by the CampusHire accreditation team.
                </p>
              </div>
            </div>

            {/* 5.6 Key Details List Card */}
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-base font-black text-[#0A2540] font-heading">
                Key Details
              </h3>

              <div className="space-y-3.5 text-xs">
                
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>University Type</span>
                  </span>
                  <span className="font-bold text-slate-800 text-right">{keyDetails.universityType}</span>
                </div>

                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Established Year</span>
                  </span>
                  <span className="font-bold text-slate-800 text-right">{keyDetails.establishedYear}</span>
                </div>

                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Location</span>
                  </span>
                  <span className="font-bold text-slate-800 text-right truncate max-w-[140px]">{keyDetails.location}</span>
                </div>

                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Website</span>
                  </span>
                  <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline text-right truncate max-w-[140px]">
                    {keyDetails.website}
                  </a>
                </div>

                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact Email</span>
                  </span>
                  <a href={`mailto:${keyDetails.contactEmail}`} className="font-bold text-blue-600 hover:underline text-right truncate max-w-[140px]">
                    {keyDetails.contactEmail}
                  </a>
                </div>

                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Contact Phone</span>
                  </span>
                  <a href={`tel:${keyDetails.contactPhone}`} className="font-bold text-slate-800 text-right">
                    {keyDetails.contactPhone}
                  </a>
                </div>

                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>Accreditation</span>
                  </span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-right">{keyDetails.accreditation}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approved By</span>
                  </span>
                  <span className="font-bold text-slate-800 text-right">{keyDetails.approvedBy}</span>
                </div>

              </div>
            </div>

            {/* 5.7 Social Media Handles */}
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3.5">
              <h3 className="text-base font-black text-[#0A2540] font-heading">
                Social Media
              </h3>

              <div className="flex items-center gap-2.5">
                {/* LinkedIn */}
                <a
                  href={`https://linkedin.com/school/${code.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="LinkedIn Profile"
                >
                  <span className="font-bold text-xs">in</span>
                </a>

                {/* Instagram */}
                <a
                  href={`https://instagram.com/${code.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-pink-50 hover:bg-pink-600 text-pink-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="Instagram"
                >
                  <span className="font-bold text-xs">IG</span>
                </a>

                {/* YouTube */}
                <a
                  href={`https://youtube.com/@${code.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="YouTube"
                >
                  <span className="font-bold text-xs">YT</span>
                </a>

                {/* X / Twitter */}
                <a
                  href={`https://x.com/${code.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-900 text-slate-800 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="X (Twitter)"
                >
                  <span className="font-bold text-xs">𝕏</span>
                </a>

                {/* Facebook */}
                <a
                  href={`https://facebook.com/${code.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-800 text-blue-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="Facebook"
                >
                  <span className="font-bold text-xs">fb</span>
                </a>
              </div>
            </div>

            {/* 5.8 Placement Brochure Card */}
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3.5">
              <h3 className="text-base font-black text-[#0A2540] font-heading">
                Placement Brochure
              </h3>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-extrabold text-xs text-[#0A2540] block truncate">
                      {brochure.title}
                    </span>
                    <span className="text-[10.5px] text-slate-400 font-medium block">
                      {brochure.format} • {brochure.size}
                    </span>
                  </div>
                </div>

                <a
                  href={brochure.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 text-blue-600 hover:text-white border border-slate-200 text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer"
                >
                  Download
                </a>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 6. Other Tab Views */}
      
      {/* 6.1 Placement Statistics Tab */}
      {activeTab === 'placement' && (
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 lg:p-7 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-black text-[#0A2540] font-heading">
              Placement Intelligence & Package Track Record
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Verified campus hiring performance for recent academic graduating batches.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
              <span className="text-xs font-bold uppercase text-emerald-800 block">Highest Package</span>
              <span className="text-2xl font-black text-emerald-700 font-heading">{stats?.highestPackage || '₹64.2 LPA'}</span>
              <span className="text-[11px] text-emerald-600 font-medium block mt-0.5">International/Domestic Tier-1</span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-center">
              <span className="text-xs font-bold uppercase text-blue-800 block">Average Package</span>
              <span className="text-2xl font-black text-blue-700 font-heading">{stats?.averagePackage || '₹17.8 LPA'}</span>
              <span className="text-[11px] text-blue-600 font-medium block mt-0.5">Overall Across Streams</span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-center">
              <span className="text-xs font-bold uppercase text-purple-800 block">Median Package</span>
              <span className="text-2xl font-black text-purple-700 font-heading">{stats?.medianPackage || '₹14.5 LPA'}</span>
              <span className="text-[11px] text-purple-600 font-medium block mt-0.5">Core Engineering & Tech</span>
            </div>
          </div>

          {/* Active Live Placement Drives Section (Interactive & Responsive Cards) */}
          <div className="space-y-4 pt-2">
            
            {/* Header Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
                    Active & Recent Campus Placement Drives
                  </h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10.5px] font-extrabold border border-blue-200/60">
                    {collegeJobs.length > 0 ? `${collegeJobs.length} Drives` : 'Open'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Verified campus hiring campaigns, role requisitions, and application telemetry.
                </p>
              </div>

              <Link
                href={`/recruiter/jobs/create?collegeId=${college.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Launch New Campus Drive</span>
              </Link>
            </div>

            {/* Interactive Search & Type Filter Toolbar (Only when jobs exist) */}
            {collegeJobs.length > 0 && (
              <div className="space-y-2.5 pt-1">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={jobSearch}
                      onChange={(e) => setJobSearch(e.target.value)}
                      placeholder="Search drives by role, company name, location or package..."
                      className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                    />
                    {jobSearch && (
                      <button
                        type="button"
                        onClick={() => setJobSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Type Filter Pills */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-auto overflow-x-auto">
                    {[
                      { id: 'ALL', label: 'All Drives' },
                      { id: 'FULL_TIME', label: 'Full Time' },
                      { id: 'INTERNSHIP', label: 'Internships' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setJobTypeFilter(t.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                          jobTypeFilter === t.id
                            ? 'bg-white text-blue-600 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                </div>
              </div>
            )}

            {/* Placement Drives Responsive Cards Grid */}
            {collegeJobs.length === 0 ? (
              <div className="p-8 sm:p-10 text-center rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-extrabold text-[#0A2540]">No Active Recruitment Drives Scheduled Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Be the first organization to schedule a placement drive with {college.name} and recruit verified graduating engineers.
                </p>
                <Link
                  href={`/recruiter/jobs/create?collegeId=${college.id}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Launch Campus Placement Drive</span>
                </Link>
              </div>
            ) : filteredCollegeJobs.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2.5">
                <Briefcase className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="text-sm font-extrabold text-[#0A2540]">No Matching Placement Drives Found</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No campus drives matched your current search keyword or job type filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setJobSearch('');
                    setJobTypeFilter('ALL');
                    setJobStatusFilter('ALL');
                  }}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 text-xs font-bold transition-colors cursor-pointer"
                >
                  Reset Drive Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCollegeJobs.map((job) => {
                  const isLive = (job.status || 'ACTIVE') === 'ACTIVE';
                  const isInternship = job.type === 'INTERNSHIP';
                  const isCopied = copiedJobId === job.id;

                  return (
                    <div
                      key={job.id}
                      className="group relative rounded-2xl border border-slate-200/90 bg-white hover:border-blue-300 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 hover:-translate-y-0.5"
                    >
                      {/* Top Header: Logo + Title + Badges */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center p-2 shrink-0 shadow-2xs group-hover:border-blue-300 transition-colors">
                              {job.company?.logoUrl ? (
                                <img
                                  src={job.company.logoUrl}
                                  alt={job.company.name}
                                  className="max-h-7 max-w-[32px] object-contain"
                                />
                              ) : (
                                <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                                  {(job.company?.name || job.title).substring(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1 space-y-0.5">
                              <Link
                                href={`/recruiter/jobs/${job.id}`}
                                className="font-extrabold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer truncate block"
                              >
                                {job.title}
                              </Link>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <span className="truncate">{job.company?.name || 'Corporate Partner'}</span>
                                {job.company?.isVerified && (
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Status Pill */}
                          <div className="shrink-0">
                            {isLive ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10.5px] font-black border border-emerald-200/60 shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Live</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10.5px] font-bold border border-slate-200">
                                <span>Closed</span>
                              </span>
                            )}
                          </div>

                        </div>

                        {/* Badges Strip: Salary Package + Job Type + Location */}
                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          {job.salaryPackage && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-black border border-emerald-200/60 font-mono">
                              <TrendingUp className="w-3 h-3 text-emerald-600" />
                              <span>{job.salaryPackage}</span>
                            </span>
                          )}

                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                            isInternship 
                              ? 'bg-purple-50 text-purple-700 border border-purple-200/60' 
                              : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                          }`}>
                            <Briefcase className="w-3 h-3" />
                            <span>{isInternship ? 'Internship' : 'Full-Time (FTE)'}</span>
                          </span>

                          {job.location && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-medium truncate max-w-[140px]">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">{job.location}</span>
                            </span>
                          )}
                        </div>

                      </div>

                      {/* Middle: Real-time Application Telemetry Strip */}
                      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/70 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                            <Users className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Applied</span>
                            <span className="text-xs font-black text-[#0A2540]">
                              {job._count?.applications || 0} Candidates
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                            <Trophy className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Offers</span>
                            <span className="text-xs font-black text-emerald-700">
                              {job._count?.offers || 0} Released
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Footer Action Toolbar */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/recruiter/applications?jobId=${job.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            <Users className="w-3.5 h-3.5" />
                            <span>View Applicants</span>
                          </Link>

                          <Link
                            href={`/recruiter/jobs/${job.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Drive Details</span>
                          </Link>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleCopyJobLink(e, job.id)}
                          title="Share Drive Link"
                          className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Share2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      )}

      {/* 6.2 Courses & Programs Tab */}
      {activeTab === 'courses' && (
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 lg:p-7 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-black text-[#0A2540] font-heading">
              Academic Degrees & Engineering Departments
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Curriculum breakdown and student enrollment statistics per branch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(college.courses || []).map((course, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-extrabold text-sm text-[#0A2540]">{course.branch}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10.5px] font-bold border border-blue-200 shrink-0">
                    {course.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Level: <strong className="text-slate-800 font-semibold">{course.level}</strong></span>
                  <span>Enrolled: <strong className="text-slate-800 font-semibold">{course.enrolled.toLocaleString()}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6.3 Infrastructure Tab */}
      {activeTab === 'infrastructure' && (
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 lg:p-7 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-black text-[#0A2540] font-heading">
              Campus Facilities & Placement Infrastructure
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Dedicated on-campus interview rooms, assessment computer labs, and auditorium spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold uppercase text-blue-600 block">Assessment Labs</span>
              <span className="text-xl font-extrabold text-slate-900 block">2,400+ Nodes</span>
              <p className="text-xs text-slate-500">High-speed gigabit LAN computers for mass online coding tests.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold uppercase text-indigo-600 block">Interview Chambers</span>
              <span className="text-xl font-extrabold text-slate-900 block">32 Soundproof Rooms</span>
              <p className="text-xs text-slate-500">Dedicated recruiter cabins for 1-on-1 technical and HR interviews.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold uppercase text-emerald-600 block">Auditoriums</span>
              <span className="text-xl font-extrabold text-slate-900 block">1,200 Seating</span>
              <p className="text-xs text-slate-500">Acoustic convention halls for Pre-Placement Talks (PPTs).</p>
            </div>
          </div>
        </div>
      )}

      {/* 6.4 Student Demographics Tab */}
      {activeTab === 'demographics' && (
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 lg:p-7 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-black text-[#0A2540] font-heading">
              Candidate Pool Demographics & Skills Distribution
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Real-time student batch statistics across technical branches.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-400 block uppercase">Graduating Batch</span>
              <span className="text-xl font-black text-slate-900">2026</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-400 block uppercase">Average CGPA</span>
              <span className="text-xl font-black text-emerald-600">8.42 / 10</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-400 block uppercase">Gender Diversity</span>
              <span className="text-xl font-black text-purple-600">38% Women in Tech</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-400 block uppercase">Top Skill</span>
              <span className="text-xl font-black text-blue-600">DSA & Full Stack</span>
            </div>
          </div>
        </div>
      )}

      {/* 6.5 Recruitment Process Tab */}
      {activeTab === 'recruitment' && (
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 lg:p-7 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-black text-[#0A2540] font-heading">
              Institutional Recruitment Process Roadmap
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Seamless step-by-step workflow for corporate recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              { step: '01', title: 'Slot Request', desc: 'Recruiter posts job & requests hiring schedule with TPO.' },
              { step: '02', title: 'Pre-Placement Talk', desc: 'Conduct offline/virtual PPT with eligible candidates.' },
              { step: '03', title: 'Online Assessment', desc: 'Host coding and aptitude test via CampusHire ATS.' },
              { step: '04', title: 'Interviews', desc: 'Conduct shortlisted candidate technical & HR rounds.' },
              { step: '05', title: 'Instant Offers', desc: 'Release digital offer letters directly to selected students.' },
            ].map((st) => (
              <div key={st.step} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-mono font-black text-lg text-blue-600 block">{st.step}</span>
                <h4 className="font-extrabold text-xs text-[#0A2540]">{st.title}</h4>
                <p className="text-[11px] text-slate-500 leading-normal">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6.6 Contact Tab */}
      {activeTab === 'contact' && (
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 lg:p-7 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-black text-[#0A2540] font-heading">
              University Placement Cell & TPO Coordinators
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Official accredited university contacts for campus placement drives.
            </p>
          </div>

          {(!college.tpos || college.tpos.length === 0) ? (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <p className="text-xs font-bold text-slate-700">Institutional placement office contact: {contactEmail}</p>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Placement Office</span>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {college.tpos.map((tpo) => (
                <div key={tpo.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {tpo.user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-[#0A2540] truncate">{tpo.user.name}</span>
                      <span className="px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold">Active TPO</span>
                    </div>
                    <p className="text-xs text-blue-600 font-medium">{tpo.designation || 'Placement Officer'}</p>
                    <div className="flex items-center gap-3 pt-1">
                      <a href={`mailto:${tpo.user.email}`} className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span>{tpo.user.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 7. Interactive "Partner with Us" Modal Dialog */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0A2540] font-heading">
                    Partner with {college.name}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">Official Recruitment Collaboration</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPartnerModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {partnerMessageSent ? (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-extrabold text-base text-[#0A2540]">Partnership Request Sent!</h4>
                <p className="text-xs text-slate-500">The university placement cell has been notified and will reach out shortly.</p>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Proposal / Drive Message to TPO</label>
                  <textarea
                    rows={4}
                    required
                    value={partnerNote}
                    onChange={(e) => setPartnerNote(e.target.value)}
                    placeholder={`Hello ${college.name} Placement Team, our recruitment team at TechCorp would like to schedule an on-campus hiring drive for Batch 2026...`}
                    className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:bg-white text-slate-800"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <Link
                    href={`/recruiter/jobs/create?collegeId=${college.id}`}
                    className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Directly Post Placement Drive</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPartnerModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <Button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20"
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      <span>Send Request</span>
                    </Button>
                  </div>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
