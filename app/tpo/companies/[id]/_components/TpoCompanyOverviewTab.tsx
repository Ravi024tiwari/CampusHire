'use client';

import React, { useState } from 'react';
import { Building2, Sparkles, Image as ImageIcon, MapPin, CheckCircle2, X } from 'lucide-react';

interface TpoCompanyOverviewTabProps {
  description: string;
  images: string[];
  industry: string;
  location: string;
  companyType: string;
}

export function TpoCompanyOverviewTab({
  description,
  images,
  industry,
  location,
  companyType,
}: TpoCompanyOverviewTabProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* About Description Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex items-center gap-2 text-[#0A2540]">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-extrabold">Company Overview</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
          {description}
        </p>

        {/* Highlight Pills */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5 flex-wrap">
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
            Domain: <strong className="text-slate-900">{industry}</strong>
          </span>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
            Operating Model: <strong className="text-slate-900">{companyType}</strong>
          </span>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
            Hubs: <strong className="text-slate-900">{location}</strong>
          </span>
        </div>
      </div>

      {/* Office & Culture Gallery */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#0A2540]">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-extrabold">Work Culture & Campus Photos</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {images.length} Photos
          </span>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(img)}
                className="group relative h-48 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Company office photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white text-xs font-bold">
                  Click to expand
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-400">
            No gallery photos uploaded yet for this company.
          </div>
        )}
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[85vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto}
              alt="Expanded preview"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
