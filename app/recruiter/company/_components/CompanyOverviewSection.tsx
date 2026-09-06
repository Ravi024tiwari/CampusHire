'use client';

import React, { useRef } from 'react';
import { 
  Building2, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Calendar, 
  Users, 
  Briefcase, 
  ChevronLeft, 
  ChevronRight, 
  HeartHandshake, 
  Sparkles, 
  Compass, 
  ShieldAlert,
  ExternalLink,
  Eye
} from 'lucide-react';
import { CompanyProfileData, useRecruiterCompanyStore } from '@/store/useRecruiterCompanyStore';

interface CompanyOverviewSectionProps {
  company: CompanyProfileData;
}

export function CompanyOverviewSection({ company }: CompanyOverviewSectionProps) {
  const { setActiveTab } = useRecruiterCompanyStore();
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  const defaultGalleryImages = [
    '/images/company/google.jpg',
    '/images/company/office_workspace.jpg',
    '/images/company/office_lounge.jpg',
    '/images/company/google_hq.jpg',
  ];

  const galleryList = company.images && company.images.length > 0 ? company.images : defaultGalleryImages;

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryScrollRef.current) {
      galleryScrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  const values = [
    {
      title: 'Focus on the user',
      desc: 'Everything we do starts with the user and their success.',
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-200/80',
    },
    {
      title: 'Think big',
      desc: 'We take bold bets and pursue moonshots to drive innovation.',
      icon: Sparkles,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
    },
    {
      title: 'Be inclusive',
      desc: 'We build for everyone, everywhere with diverse perspectives.',
      icon: HeartHandshake,
      color: 'text-purple-600 bg-purple-50 border-purple-200/80',
    },
    {
      title: 'Do the right thing',
      desc: 'We act with integrity and highest standards in everything we do.',
      icon: ShieldCheck,
      color: 'text-amber-600 bg-amber-50 border-amber-200/80',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. About Company & Quick Facts (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        
        {/* Left Column: About Company */}
        <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4.5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
              About {company.name}
            </h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              Overview
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {company.description ||
              `${company.name} is a global innovation leader focused on building products and platforms that help people and businesses grow. From software engineering and artificial intelligence to campus placements, our tools empower millions worldwide.`}
          </p>

          {/* 4 Metadata Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            
            {/* Industry */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Industry</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block">
                  {company.industry || 'Technology & Innovation'}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Location</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block">
                  {company.location || 'Bangalore / Silicon Valley'}
                </span>
              </div>
            </div>

            {/* Website */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Website</span>
                {company.website ? (
                  <a
                    href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm font-bold text-blue-600 hover:underline truncate block"
                  >
                    {company.website.replace(/^https?:\/\//, '')}
                  </a>
                ) : (
                  <span className="text-xs sm:text-sm font-bold text-slate-700">Not specified</span>
                )}
              </div>
            </div>

            {/* Verification */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Verification Status</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-700">
                  {company.isVerified ? 'Verified Enterprise' : 'Pending Verification'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Quick Facts */}
        <div className="lg:col-span-4 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4.5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
              Quick Facts
            </h3>
            <span className="text-xs font-bold text-slate-400">At a Glance</span>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm">
            
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">Founded</span>
              </div>
              <span className="font-bold text-slate-800">1998</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">Company Size</span>
              </div>
              <span className="font-bold text-slate-800">10,000+ employees</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-600">
                <Briefcase className="w-4 h-4 text-purple-600" />
                <span className="font-semibold">Work Type</span>
              </div>
              <span className="font-bold text-slate-800">Hybrid / Onsite</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span className="font-semibold">Headquarters</span>
              </div>
              <span className="font-bold text-slate-800 truncate max-w-[140px]">
                {company.location || 'Mountain View, CA'}
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* 2. Gallery Section */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 lg:p-6 space-y-3.5 sm:space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base lg:text-lg font-black text-[#0A2540] font-heading">
              Workplace Gallery
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
              A glimpse into our workplace, team culture and people.
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className="text-xs font-black text-blue-600 hover:text-blue-700 hover:underline px-1.5 py-1 cursor-pointer"
            >
              View All ({galleryList.length})
            </button>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollGallery('left')}
                className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer shadow-2xs active:scale-95 transition-all"
                title="Scroll Left"
                aria-label="Scroll Gallery Left"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollGallery('right')}
                className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer shadow-2xs active:scale-95 transition-all"
                title="Scroll Right"
                aria-label="Scroll Gallery Right"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Photo Slider with Smooth Touch Scrolling & Compact Dimensions */}
        <div
          ref={galleryScrollRef}
          className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch] scroll-smooth py-1 -mx-2 px-2 snap-x snap-mandatory"
        >
          {galleryList.map((imgUrl, idx) => (
            <GallerySliderItem
              key={idx}
              imgUrl={imgUrl}
              idx={idx}
              companyName={company.name}
              onSelect={() => setActiveTab('gallery')}
            />
          ))}
        </div>
      </div>

      {/* 3. Our Values Section */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 lg:p-6 space-y-3.5 sm:space-y-4">
        <div>
          <h3 className="text-sm sm:text-base lg:text-lg font-black text-[#0A2540] font-heading">
            Our Core Values
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            The principles and cultural pillars that guide how we hire, build and innovate.
          </p>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 overflow-x-auto sm:overflow-visible [scrollbar-width:none] [-webkit-overflow-scrolling:touch] py-1 -mx-1 px-1 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div
                key={idx}
                className="shrink-0 w-[200px] xs:w-[220px] sm:w-auto snap-start p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all hover:-translate-y-0.5 shadow-2xs space-y-2 select-none"
              >
                <div className={`p-1.5 sm:p-2 rounded-xl inline-block ${v.color}`}>
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-black text-[#0A2540] font-heading">
                  {v.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

function GallerySliderItem({
  imgUrl,
  idx,
  companyName,
  onSelect,
}: {
  imgUrl: string;
  idx: number;
  companyName: string;
  onSelect: () => void;
}) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div
      onClick={onSelect}
      className="group/photo shrink-0 w-[180px] xs:w-[210px] sm:w-[250px] md:w-[280px] h-28 xs:h-32 sm:h-36 md:h-40 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs relative snap-start cursor-pointer bg-slate-100 select-none transition-all duration-300 hover:shadow-md"
    >
      {/* Shimmer Placeholder while lazy loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      )}

      <img
        src={imgUrl}
        alt={`${companyName} Workspace photo ${idx + 1}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover group-hover/photo:scale-105 transition-all duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/company/office_workspace.jpg';
          setIsLoaded(true);
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-end justify-between p-2.5 sm:p-3">
        <span className="text-white text-[11px] sm:text-xs font-bold inline-flex items-center gap-1 drop-shadow-xs">
          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-300" />
          <span className="truncate max-w-[120px]">View Photo</span>
        </span>
        <span className="text-[9.5px] sm:text-[10px] font-bold text-white/90 bg-black/50 backdrop-blur-xs px-1.5 py-0.5 rounded-md border border-white/10">
          #{idx + 1}
        </span>
      </div>
    </div>
  );
}

