'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Building2 } from 'lucide-react';

interface CompanyHeroBannerProps {
  companyName: string;
  isVerified?: boolean;
  coverImage?: string;
  headline?: string;
  subheadline?: string;
}

export function CompanyHeroBanner({
  companyName,
  isVerified = true,
  coverImage,
  headline = 'Build for a brighter tomorrow.',
  subheadline = 'Innovative people. Impactful work.',
}: CompanyHeroBannerProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Default fallback cover banner image
  const defaultBanner = '/images/company/office_workspace.jpg';
  const bannerBg = coverImage || defaultBanner;

  return (
    <div className="relative w-full h-44 sm:h-56 md:h-64 lg:h-72 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs group/banner select-none bg-slate-100">
      
      {/* Shimmer skeleton while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      )}

      {/* Background Image with Crisp Details and Light Natural Exposure */}
      <img
        src={bannerBg}
        alt={`${companyName} Cover Banner`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover object-center group-hover/banner:scale-105 transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onError={(e) => {
          // Fallback if local image or URL fails
          (e.target as HTMLImageElement).src = '/images/company/google.jpg';
          setIsLoaded(true);
        }}
      />

      {/* Crystal Clear Light Vignette Overlay (Allows Full Visibility of Image Details) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent pointer-events-none" />

      {/* Top Right Verified Badge Overlay */}
      {isVerified && (
        <div className="absolute top-3.5 sm:top-5 right-3.5 sm:right-5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/90 hover:bg-emerald-500 text-white backdrop-blur-md text-[11px] sm:text-xs font-black shadow-lg border border-emerald-400/40 transition-transform">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 fill-emerald-100 text-emerald-800" />
            <span>Verified Company</span>
          </span>
        </div>
      )}

      {/* Bottom Left Punchy Hero Text with Crisp Backdrop */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10 max-w-lg space-y-1 text-white">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-md text-blue-200 text-[10.5px] sm:text-xs font-bold uppercase tracking-wider border border-white/10">
          <Sparkles className="w-3 h-3 text-blue-300" />
          <span>Employer Brand Showcase</span>
        </div>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-black font-heading tracking-tight leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {headline}
        </h2>
        <p className="text-xs sm:text-sm text-slate-100 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] hidden xs:block">
          {subheadline}
        </p>
      </div>

    </div>
  );
}
