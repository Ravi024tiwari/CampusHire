'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { CollegeDetail, TPOCoordinator, CollegeJobSummary } from '../_types/recruiter-colleges.types';
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
  Copy, 
  Check, 
  Calendar, 
  Award, 
  FileText, 
  TrendingUp, 
  Compass, 
  UserCheck, 
  Layers, 
  School,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  X,
  ImageIcon,
  Sparkle,
  Target
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tpo' | 'drives' | 'about'>('tpo');

  // Animated Background & Campus Gallery Slideshow State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    async function fetchCollegeDetail() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<ApiResponse<CollegeDetail>>(`/api/colleges/${collegeId}`);
        if (response.data.success && response.data.data) {
          setCollege(response.data.data);
        } else {
          setError(response.data.message || 'Failed to load college profile');
        }
      } catch (err: any) {
        setError(err.message || 'Unable to retrieve university institutional details');
      } finally {
        setIsLoading(false);
      }
    }

    if (collegeId) {
      fetchCollegeDetail();
    }
  }, [collegeId]);

  // Gallery images with dynamic fallback to campus photos
  const campusImages = (college?.images && college.images.length > 0)
    ? college.images
    : ['/images/college/College.png', '/images/college/collge2.avif'];

  const currentBgImage = campusImages[activeImageIndex] || campusImages[0];

  // Auto-play timer for background slideshow
  useEffect(() => {
    if (!isAutoPlay || campusImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % campusImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, campusImages.length]);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutoPlay(false);
    setActiveImageIndex((prev) => (prev + 1) % campusImages.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutoPlay(false);
    setActiveImageIndex((prev) => (prev - 1 + campusImages.length) % campusImages.length);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-6">
        {/* Loading Skeletons */}
        <div className="h-6 w-48 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-72 rounded-3xl bg-slate-200 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-28 rounded-2xl bg-slate-200 animate-pulse" />
          <div className="h-28 rounded-2xl bg-slate-200 animate-pulse" />
          <div className="h-28 rounded-2xl bg-slate-200 animate-pulse" />
          <div className="h-28 rounded-2xl bg-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-6">
        <Link
          href="/recruiter/colleges"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#2563EB] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Verified Directory</span>
        </Link>

        <div className="p-8 sm:p-12 text-center rounded-3xl border border-red-200 bg-red-50 text-red-700 space-y-3 shadow-sm">
          <School className="w-12 h-12 mx-auto text-red-500" />
          <h2 className="text-lg font-bold">University Profile Not Available</h2>
          <p className="text-xs sm:text-sm text-red-600 max-w-md mx-auto">
            {error || 'The requested university could not be located in the verified registry.'}
          </p>
          <Button
            type="button"
            onClick={() => router.push('/recruiter/colleges')}
            className="rounded-xl bg-[#2563EB] text-white font-bold text-xs px-5 py-2.5 shadow-md shadow-blue-600/20"
          >
            Return to Colleges Directory
          </Button>
        </div>
      </div>
    );
  }

  const tpos = college.tpos || [];
  const jobs = college.jobs || [];
  const stats = college.placementStats || {
    enrolledStudents: college._count?.students || 0,
    placedStudents: 0,
    totalOffers: 0,
    totalApplications: 0,
    placementRate: 0,
    activeDrives: college._count?.jobs || 0,
  };

  const fullLocation = [college.address, college.city, college.state, college.pincode]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-8 transition-all duration-300">
      
      {/* 1. Industrial-Grade Action Header (Clean Interactive Back Button) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && window.history.length > 1) {
              router.back();
            } else {
              router.push('/recruiter/colleges');
            }
          }}
          className="group inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0A2540] shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer active:scale-95 self-start"
          title="Return to previous page"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-blue-50 text-slate-500 group-hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Accredited Institution
          </span>

          <Link
            href={`/recruiter/jobs/create?collegeId=${college.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/25 transition-all cursor-pointer"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Post Placement Drive</span>
          </Link>

          <a
            href={`mailto:${college.contactEmail || tpos[0]?.user.email || 'placement@university.edu'}?subject=Campus Hiring Partnership Inquiry - CampusHire`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>Contact Placement Cell</span>
          </a>
        </div>
      </div>

      {/* 2. Interactive Animated Hero Showcase Banner */}
      <div 
        className="relative rounded-3xl border border-white/20 shadow-2xl overflow-hidden group transition-all duration-500 flex flex-col justify-between min-h-[340px]"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Layer A: High-Clarity Background Image with Smooth Hover Zoom */}
        <div className="absolute inset-0 z-0">
          <Image
            src={currentBgImage}
            alt={`${college.name} Campus Infrastructure`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1700px"
            className="object-cover object-center scale-100 group-hover:scale-105 transition-all duration-1000 ease-out"
          />
          
          {/* Luminous, Crystal-Clear Multi-Tone Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-slate-950/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/30" />

          {/* Animated Ambient Glow Orbs: Electric Cyan + Emerald + Warm Gold */}
          <div className="absolute -top-16 -right-16 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-16 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Blueprint Micro-Matrix Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        </div>

        {/* Layer B: Top Navigation & Gallery Controls Bar */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-7 pb-0 flex flex-wrap items-center justify-between gap-3 border-b border-white/15">
          {/* Accreditation Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/60 hover:bg-slate-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-bold backdrop-blur-md shadow-sm transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>AICTE & NIRF Compliant • Super Admin Verified Campus</span>
          </div>

          {/* Gallery Switcher & Fullscreen Trigger */}
          <div className="flex items-center gap-2">
            {campusImages.length > 1 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 border border-white/20 backdrop-blur-md shadow-sm">
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  className="p-0.5 text-slate-300 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
                  title="Previous photo"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <span className="text-[10.5px] font-mono font-bold text-slate-100 px-1">
                  {activeImageIndex + 1} / {campusImages.length}
                </span>

                <button
                  type="button"
                  onClick={handleNextPhoto}
                  className="p-0.5 text-slate-300 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
                  title="Next photo"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="p-1.5 rounded-full bg-slate-950/70 hover:bg-white/20 border border-white/20 text-slate-200 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-sm"
              title="Expand campus photos"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Layer C: Main Hero Showcase Content */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 sm:gap-6">
            
            {/* University Crest Container */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-3xl bg-white/98 p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-2 border-white/80 shrink-0 overflow-hidden flex items-center justify-center group/crest hover:scale-105 transition-transform duration-300 backdrop-blur-md">
              {college.logoUrl ? (
                <Image
                  src={college.logoUrl}
                  alt={college.name}
                  fill
                  sizes="112px"
                  className="object-contain p-1.5"
                />
              ) : (
                <GraduationCap className="w-12 h-12 text-[#2563EB]" />
              )}
            </div>

            {/* University Identity & Sourcing Metadata */}
            <div className="flex-1 space-y-2.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {college.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 text-xs font-bold backdrop-blur-md shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Verified Partner
                </span>
              </div>

              {/* Code, Location & Domain Pills */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-200 font-medium">
                {college.code && (
                  <button
                    type="button"
                    onClick={() => handleCopyCode(college.code!)}
                    className="inline-flex items-center gap-1.5 bg-slate-950/70 hover:bg-slate-900 active:bg-slate-800 px-2.5 py-1 rounded-lg border border-white/20 text-white font-mono font-bold transition-all cursor-pointer shadow-sm group/btn"
                    title="Copy University Code"
                  >
                    <span>Code: {college.code}</span>
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400 group-hover/btn:text-white" />}
                  </button>
                )}

                {(college.city || college.state) && (
                  <span className="inline-flex items-center gap-1 text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{[college.city, college.state].filter(Boolean).join(', ')}</span>
                  </span>
                )}

                {college.domain && (
                  <span className="inline-flex items-center gap-1 text-cyan-300 font-mono">
                    <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{college.domain}</span>
                  </span>
                )}
              </div>

              {/* Campus Address */}
              {fullLocation && (
                <p className="text-xs text-slate-200/90 max-w-2xl font-normal leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  {fullLocation}
                </p>
              )}

              {/* Interactive Quick Links & CTA Bar */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {college.websiteUrl && (
                  <a
                    href={college.websiteUrl.startsWith('http') ? college.websiteUrl : `https://${college.websiteUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white font-bold transition-colors bg-slate-950/60 hover:bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/20 backdrop-blur-md shadow-sm"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3 opacity-75" />
                  </a>
                )}

                {college.contactEmail && (
                  <a
                    href={`mailto:${college.contactEmail}`}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-200 hover:text-white transition-colors bg-slate-950/60 hover:bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/20 backdrop-blur-md shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{college.contactEmail}</span>
                  </a>
                )}

                {college.contactPhone && (
                  <a
                    href={`tel:${college.contactPhone}`}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-200 hover:text-white transition-colors bg-slate-950/60 hover:bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/20 backdrop-blur-md shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{college.contactPhone}</span>
                  </a>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* 3. Fullscreen Lightbox Modal for Campus Photos Gallery */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/92 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-white/20 overflow-hidden shadow-2xl flex flex-col">
            
            {/* Modal Top Bar */}
            <div className="p-4 px-6 bg-slate-950 flex items-center justify-between border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-sm">{college.name} Campus Infrastructure Gallery</span>
                <span className="text-xs font-mono text-slate-400">({activeImageIndex + 1} of {campusImages.length})</span>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Main Image */}
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center">
              <Image
                src={currentBgImage}
                alt={college.name}
                fill
                className="object-contain"
              />

              {campusImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-white shadow-xl transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-white shadow-xl transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Strip */}
            {campusImages.length > 1 && (
              <div className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center justify-center gap-2 overflow-x-auto">
                {campusImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-cyan-400 scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

      {/* 4. High-Impact Placement & Sourcing KPI Metric Cards (4 Tiles) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* KPI 1: Total Enrolled Students */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Candidate Pool
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shadow-2xs">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black font-heading text-[#0A2540]">
              {stats.enrolledStudents}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Verified active students on CampusHire
            </p>
          </div>
        </div>

        {/* KPI 2: Placed Students & Success Rate */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Placed Talent
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black font-heading text-[#0A2540]">
                {stats.placedStudents}
              </span>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {stats.placementRate}% Placed
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Recruited through verified drives
            </p>
          </div>
        </div>

        {/* KPI 3: Placement Drives Conducted */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Campus Drives
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shadow-2xs">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black font-heading text-[#0A2540]">
              {stats.activeDrives}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Active & past corporate sessions
            </p>
          </div>
        </div>

        {/* KPI 4: Total Offers Extended */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Offers Extended
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-2xs">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black font-heading text-[#0A2540]">
              {stats.totalOffers}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Letter of Intent / contracts issued
            </p>
          </div>
        </div>

      </div>

      {/* 5. Tabbed Detail Modules: TPO Officers, Campus Drives, Institutional Info */}
      <div className="space-y-4">
        
        {/* Module Tab Selector */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('tpo')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'tpo'
                ? 'bg-[#0A2540] text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Training & Placement Cell ({tpos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('drives')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'drives'
                ? 'bg-[#0A2540] text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Campus Placement Drives ({jobs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'bg-[#0A2540] text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <School className="w-4 h-4" />
            <span>Institutional Profile</span>
          </button>
        </div>

        {/* Tab 1: TPO Officers List */}
        {activeTab === 'tpo' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#0A2540] font-heading">
                  University Placement Cell & TPO Officers
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Direct accredited points of contact for scheduling campus recruitment drives and shortlisting candidates.
                </p>
              </div>
            </div>

            {tpos.length === 0 ? (
              <div className="p-8 text-center rounded-3xl border border-dashed border-slate-200 bg-white space-y-2">
                <Users className="w-8 h-8 mx-auto text-slate-400" />
                <h4 className="text-sm font-bold text-[#0A2540]">No Departmental TPOs Registered</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Central administration handles placement operations. Reach out directly via the university contact email.
                </p>
                {college.contactEmail && (
                  <a
                    href={`mailto:${college.contactEmail}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold shadow-md shadow-blue-600/20 mt-2"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Central Office</span>
                  </a>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {tpos.map((tpo) => {
                  const isCopied = copiedEmail === tpo.user.email;
                  return (
                    <div
                      key={tpo.id}
                      className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Avatar & Status Header */}
                        <div className="flex items-start justify-between gap-3 mb-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 overflow-hidden">
                            {tpo.user.avatarUrl ? (
                              <img src={tpo.user.avatarUrl} alt={tpo.user.name} className="w-full h-full object-cover" />
                            ) : (
                              <span>
                                {tpo.user.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </span>
                            )}
                          </div>

                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            Verified TPO
                          </span>
                        </div>

                        {/* TPO Name & Designation */}
                        <h4 className="text-sm sm:text-base font-extrabold text-[#0A2540] font-heading">
                          {tpo.user.name}
                        </h4>
                        <p className="text-xs font-bold text-[#2563EB] mt-0.5">
                          {tpo.designation || 'Head, Training & Placement Cell'}
                        </p>
                        {tpo.department && (
                          <p className="text-[11px] text-slate-500 font-medium">
                            {tpo.department}
                          </p>
                        )}
                      </div>

                      {/* Contact Actions Footer */}
                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyEmail(tpo.user.email)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
                          title="Copy Email"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
                          <span className="font-mono text-[11px] truncate max-w-[120px]">{tpo.user.email}</span>
                        </button>

                        <a
                          href={`mailto:${tpo.user.email}?subject=Campus Placement Drive Proposal - ${college.name}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-[#2563EB] text-[#2563EB] hover:text-white text-xs font-bold transition-all shadow-2xs"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Mail TPO</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Placement Drives & Campaigns */}
        {activeTab === 'drives' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#0A2540] font-heading">
                  Campus Placement Drives & Corporate Track Record
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Recent hiring drives conducted at {college.name} with applicant volume and offer outputs.
                </p>
              </div>
            </div>

            {jobs.length === 0 ? (
              <div className="p-8 text-center rounded-3xl border border-dashed border-slate-200 bg-white space-y-2">
                <Briefcase className="w-8 h-8 mx-auto text-slate-400" />
                <h4 className="text-sm font-bold text-[#0A2540]">No Past Drives Recorded</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Be among the first tier-1 corporate partners to launch an exclusive campus drive at this accredited institution.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10.5px]">
                        <th className="py-3.5 pl-6 pr-4">Hiring Company</th>
                        <th className="py-3.5 px-4">Role / Designation</th>
                        <th className="py-3.5 px-4">Package / CTC</th>
                        <th className="py-3.5 px-4">Type & Location</th>
                        <th className="py-3.5 px-4">Applicants</th>
                        <th className="py-3.5 pr-6 pl-4 text-right">Offers Extended</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-3.5 pl-6 pr-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                                {job.company?.logoUrl ? (
                                  <img src={job.company.logoUrl} alt="" className="w-6 h-6 object-contain" />
                                ) : (
                                  <Building2 className="w-4 h-4 text-purple-600" />
                                )}
                              </div>
                              <span className="font-extrabold text-xs text-[#0A2540]">
                                {job.company?.name || 'Corporate Partner'}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-800">
                            {job.title}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                              {job.salaryPackage}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            <div className="space-y-0.5">
                              <span className="font-bold text-[11px] block">{job.type.replace('_', ' ')}</span>
                              <span className="text-[10px] text-slate-400">{job.location || 'Pan-India'}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-700 flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-slate-400" />
                              {job._count?.applications || 0} Enrolled
                            </span>
                          </td>
                          <td className="py-3.5 pr-6 pl-4 text-right">
                            <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 inline-flex items-center gap-1">
                              <Award className="w-3 h-3 text-blue-600" />
                              {job._count?.offers || 0} Placed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Institutional Profile & Academic Overview */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] space-y-4">
              <h3 className="text-base font-extrabold text-[#0A2540] font-heading">
                Institutional Accreditation & Campus Overview
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {college.name} is a premier higher education university verified on CampusHire with direct placement cell integrations. The institution maintains an active roster of eligible graduates across engineering, technology, management, and foundational sciences.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10.5px] font-extrabold uppercase text-slate-400 tracking-wider">
                    Accreditation Status
                  </span>
                  <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified by CampusHire Super Admin
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10.5px] font-extrabold uppercase text-slate-400 tracking-wider">
                    Sourcing Policy
                  </span>
                  <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    Direct On-Campus & Virtual Sourcing
                  </p>
                </div>
              </div>
            </div>

            {/* Side Card: Direct Support */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-gradient-to-br from-blue-50 via-white to-indigo-50/40 p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-[#0A2540] font-heading">
                  Schedule Campus Drive
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Need dedicated interview slots, pre-placement talk auditoriums, or batch filtering for this campus? Contact the departmental TPO directly.
                </p>
              </div>

              <a
                href={`mailto:${college.contactEmail || tpos[0]?.user.email || 'placement@university.edu'}?subject=Campus Hiring Drive Proposal`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Initiate Hiring Drive</span>
              </a>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
