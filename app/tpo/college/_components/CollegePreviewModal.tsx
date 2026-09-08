'use client';

import React from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  Award, 
  ExternalLink 
} from 'lucide-react';

interface CollegePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  college: {
    name: string;
    code?: string | null;
    domain?: string | null;
    city?: string | null;
    state?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
    logoUrl?: string | null;
    images?: string[];
    isVerified?: boolean;
  };
  stats?: {
    enrolledStudents: number;
    placedStudents: number;
    totalOffers: number;
    placementRate: number;
    activeDrives: number;
  };
}

export function CollegePreviewModal({
  isOpen,
  onClose,
  college,
  stats,
}: CollegePreviewModalProps) {
  if (!isOpen) return null;

  const primaryCover = college.images?.[0] || 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 my-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800">
              Live Recruiter & Student Directory Showcase
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Card Preview Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[16/7] bg-slate-900 shadow-sm">
            <img
              src={primaryCover}
              alt={college.name}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

            {/* Emblem and Titles */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-md shrink-0 border border-white/40 overflow-hidden flex items-center justify-center">
                  {college.logoUrl ? (
                    <img
                      src={college.logoUrl}
                      alt={college.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Building2 className="w-7 h-7 text-blue-600" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-xl font-black truncate text-white">
                      {college.name}
                    </h3>
                    {college.code && (
                      <span className="px-1.5 py-0.5 rounded bg-white/20 text-white text-[10px] font-mono font-bold">
                        {college.code}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-200 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>{[college.city, college.state].filter(Boolean).join(', ') || 'India'}</span>
                  </p>
                </div>
              </div>

              {college.isVerified && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-bold backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>
              )}
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-[10px] uppercase font-bold text-slate-400">Total Enrolled</p>
              <p className="text-base font-black text-slate-900 mt-0.5">
                {(stats?.enrolledStudents ?? 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-[10px] uppercase font-bold text-slate-400">Placement Rate</p>
              <p className="text-base font-black text-emerald-600 mt-0.5">
                {stats?.placementRate ?? 0}%
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-[10px] uppercase font-bold text-slate-400">Offers Released</p>
              <p className="text-base font-black text-slate-900 mt-0.5">
                {(stats?.totalOffers ?? 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-[10px] uppercase font-bold text-slate-400">Active Drives</p>
              <p className="text-base font-black text-blue-600 mt-0.5">
                {(stats?.activeDrives ?? 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2 text-xs">
            <h4 className="font-bold text-blue-900">Placement Cell Channels</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 font-medium">
              {college.contactEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{college.contactEmail}</span>
                </div>
              )}
              {college.contactPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{college.contactPhone}</span>
                </div>
              )}
              {college.domain && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{college.domain}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
