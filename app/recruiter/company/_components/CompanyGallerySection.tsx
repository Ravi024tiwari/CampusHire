'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Eye, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useRecruiterCompanyStore } from '@/store/useRecruiterCompanyStore';

interface CompanyGallerySectionProps {
  images: string[];
  companyName: string;
}

export function CompanyGallerySection({ images, companyName }: CompanyGallerySectionProps) {
  const { setEditModalOpen } = useRecruiterCompanyStore();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const defaultGalleryImages = [
    '/images/company/google.jpg',
    '/images/company/office_workspace.jpg',
    '/images/company/office_lounge.jpg',
    '/images/company/google_hq.jpg',
  ];

  const galleryList = images && images.length > 0 ? images : defaultGalleryImages;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryList.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryList.length) % galleryList.length);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4.5 sm:p-6 space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
            Workplace & Culture Gallery ({galleryList.length})
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            High-resolution visuals showcasing office architecture, team events, and workspace amenities.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEditModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Manage / Upload Photos</span>
        </button>
      </div>

      {/* Gallery Grid with Progressive Lazy Loading & Compact Mobile Dimensions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
        {galleryList.map((imgUrl, idx) => (
          <GalleryGridCard
            key={idx}
            imgUrl={imgUrl}
            idx={idx}
            companyName={companyName}
            onClick={() => openLightbox(idx)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 select-none"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            title="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={prevImage}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer active:scale-95"
            title="Previous Image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={nextImage}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer active:scale-95"
            title="Next Image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img
              src={galleryList[lightboxIndex]}
              alt={`${companyName} Preview`}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl sm:rounded-3xl"
            />
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold border border-white/10 whitespace-nowrap">
              {lightboxIndex + 1} / {galleryList.length} • {companyName} Workplace
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function GalleryGridCard({
  imgUrl,
  idx,
  companyName,
  onClick,
}: {
  imgUrl: string;
  idx: number;
  companyName: string;
  onClick: () => void;
}) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div
      onClick={onClick}
      className="group relative h-32 xs:h-36 sm:h-44 md:h-48 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs cursor-pointer bg-slate-100 select-none transition-all duration-300 hover:shadow-md"
    >
      {/* Shimmer Placeholder while lazy loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      )}

      <img
        src={imgUrl}
        alt={`${companyName} Workplace photo ${idx + 1}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/company/office_workspace.jpg';
          setIsLoaded(true);
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5 sm:p-3">
        <span className="text-white text-[10.5px] sm:text-xs font-bold inline-flex items-center gap-1 drop-shadow-xs">
          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-300" />
          <span className="truncate max-w-[100px]">View</span>
        </span>
        <span className="text-[9.5px] sm:text-[10px] font-bold text-white/90 bg-black/50 backdrop-blur-xs px-1.5 py-0.5 rounded-md border border-white/10">
          #{idx + 1}
        </span>
      </div>
    </div>
  );
}

