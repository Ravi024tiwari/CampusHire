'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CompanyInfo, CurrentRecruiter } from '../_types/recruiter-dashboard.types';
import { 
  Building2, 
  CheckCircle2, 
  Globe, 
  MapPin, 
  ShieldCheck, 
  Briefcase, 
  ExternalLink, 
  ImageIcon, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X,
  Target,
  FileText,
  ArrowRight
} from 'lucide-react';

interface RecruiterHeroBannerProps {
  company: CompanyInfo;
  currentRecruiter?: CurrentRecruiter;
  kpis?: any;
}

export function RecruiterHeroBanner({ company, currentRecruiter }: RecruiterHeroBannerProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Normalize image sources array
  const bannerImages = (company.images && company.images.length > 0)
    ? company.images
    : ['/images/company/google_hq.jpg'];

  const currentBgImage = bannerImages[activeImageIndex] || bannerImages[0];

  // Auto-play slideshow timer (pauses on manual hover or interaction)
  useEffect(() => {
    if (!isAutoPlay || bannerImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % bannerImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, bannerImages.length]);

  const handleNext = () => {
    setIsAutoPlay(false);
    setActiveImageIndex((prev) => (prev + 1) % bannerImages.length);
  };

  const handlePrev = () => {
    setIsAutoPlay(false);
    setActiveImageIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const firstName = currentRecruiter?.name ? currentRecruiter.name.split(' ')[0] : 'Recruiter';

  return (
    <>
      <div 
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 group transition-all duration-500 flex flex-col justify-between"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        
        {/* 1. High-Clarity Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={currentBgImage}
            alt={`${company.name} Workspace Architecture`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1700px"
            className="object-cover object-center scale-100 group-hover:scale-105 transition-all duration-1000 ease-out"
          />
          
          {/* Luminous, Crystal-Clear Multi-Tone Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/35 to-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30" />

          {/* Ambient Glow Lights: Warm Gold + Electric Cyan Highlights */}
          <div className="absolute -top-12 -right-12 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 left-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/3 w-60 h-60 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

          {/* Blueprint Micro-Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        </div>

        {/* 2. Top Header Navigation Bar */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-7 pb-0 flex flex-wrap items-center justify-between gap-3 border-b border-white/15">
          {/* Greeting & Season Accreditation Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/50 hover:bg-slate-950/70 border border-emerald-400/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-sm transition-colors">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Welcome back, {firstName} • {company.name} Corporate Hiring Hub</span>
          </div>

          {/* Gallery Switcher & Fullscreen Trigger */}
          <div className="flex items-center gap-2">
            {bannerImages.length > 1 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/60 border border-white/20 backdrop-blur-md shadow-sm">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-0.5 text-slate-300 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
                  title="Previous photo"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <span className="text-[10.5px] font-mono font-bold text-slate-100 px-1">
                  {activeImageIndex + 1} / {bannerImages.length}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
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
              className="p-1.5 rounded-full bg-slate-950/60 hover:bg-white/20 border border-white/20 text-slate-200 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-sm"
              title="Expand workspace photos"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. Main Center Hero Layout (Clean, Wide & Open) */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-8 py-6 sm:py-8">
          
          <div className="max-w-3xl space-y-3.5 sm:space-y-4">
            
            <div className="flex items-center gap-3.5 sm:gap-4">
              {/* Logo Emblem Container */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/98 p-2 shadow-[0_8px_24px_rgba(0,0,0,0.4)] border-2 border-white/80 shrink-0 overflow-hidden flex items-center justify-center group/logo hover:scale-105 transition-transform duration-300 backdrop-blur-md">
                {company.logoUrl ? (
                  <Image
                    src={company.logoUrl}
                    alt={company.name}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-slate-800" />
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {company.name}
                  </h1>
                  {company.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-[11px] sm:text-xs font-bold backdrop-blur-md shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-200">
                  {company.industry && (
                    <span className="inline-flex items-center gap-1 font-semibold text-cyan-300">
                      <Briefcase className="w-3.5 h-3.5" />
                      {company.industry}
                    </span>
                  )}
                  {company.location && (
                    <>
                      <span className="text-slate-400">•</span>
                      <span className="inline-flex items-center gap-1 text-slate-200">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        {company.location}
                      </span>
                    </>
                  )}
                  {company.website && (
                    <>
                      <span className="text-slate-400">•</span>
                      <a
                        href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-white underline-offset-2 hover:underline font-semibold"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>{company.website.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-100 max-w-2xl leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] font-medium">
              {company.description || 'Enterprise talent acquisition, university campus placement drives, and candidate evaluation command.'}
            </p>

            {/* Interactive Fast Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1.5">
              <button
                type="button"
                onClick={() => scrollToSection('drives')}
                className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] px-4.5 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-102 active:scale-98 cursor-pointer"
              >
                <Target className="h-4 w-4" />
                <span>Review Active Drives</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('applications')}
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-slate-950/60 hover:bg-slate-900/80 px-4.5 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:border-cyan-400/50 cursor-pointer backdrop-blur-md"
              >
                <FileText className="h-4 w-4 text-cyan-400" />
                <span>Candidate Pipeline</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 4. Fullscreen Lightbox Modal for Company Office Gallery */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/92 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-white/20 overflow-hidden shadow-2xl flex flex-col">
            
            {/* Modal Top Bar */}
            <div className="p-4 px-6 bg-slate-950 flex items-center justify-between border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm">{company.name} Workspace Gallery</span>
                <span className="text-xs font-mono text-slate-400">({activeImageIndex + 1} of {bannerImages.length})</span>
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
                alt={company.name}
                fill
                className="object-contain"
              />

              {bannerImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-white shadow-xl transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-white shadow-xl transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Strip */}
            {bannerImages.length > 1 && (
              <div className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center justify-center gap-2 overflow-x-auto">
                {bannerImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
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
    </>
  );
}
