'use client';

import React from 'react';
import { useAdminStore, type CollegeItem } from '@/store/useAdminStore';
import { 
  X, 
  Globe, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ShieldAlert, 
  Image as ImageIcon, 
  Loader2 
} from 'lucide-react';

export function CollegeDossierModal() {
  const { 
    selectedCollegeForDossier, 
    setSelectedCollegeForDossier, 
    verifyCollege, 
    isVerifyingId 
  } = useAdminStore();

  if (!selectedCollegeForDossier) return null;

  const college = selectedCollegeForDossier;
  const isVerifying = isVerifyingId === college.id;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 p-2 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-8 shadow-2xl text-[#0A2540]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedCollegeForDossier(null)}
          className="absolute right-3.5 top-3.5 sm:right-5 sm:top-5 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-[#0A2540] transition-colors cursor-pointer border border-slate-200"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-100 pr-8 sm:pr-0">
          <div className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center text-lg sm:text-xl font-extrabold text-[#2563EB] shadow-2xs">
            {college.logoUrl ? (
              <img src={college.logoUrl} alt={college.name} className="h-full w-full object-cover" />
            ) : (
              college.code || college.name.slice(0, 2).toUpperCase()
            )}
          </div>

          <div className="space-y-1 sm:space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
              <h3 className="text-base sm:text-xl font-bold text-[#0A2540] tracking-tight font-heading leading-tight">{college.name}</h3>
              {college.code && (
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] sm:text-xs font-mono font-extrabold text-slate-700 border border-slate-200">
                  {college.code}
                </span>
              )}
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-extrabold border ${
                  college.isVerified
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {college.isVerified ? 'Accredited & Verified' : 'Awaiting Review'}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">National Higher Education Institutional Dossier</p>
          </div>
        </div>

        {/* Campus Gallery Section (10MB Image Assets) */}
        {college.images && college.images.length > 0 && (
          <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#2563EB]" />
              Campus Infrastructure & Labs ({college.images.length} photos)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {college.images.map((imgUrl, i) => (
                <div key={i} className="relative h-24 sm:h-32 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 group shadow-2xs">
                  <img
                    src={imgUrl}
                    alt={`Campus photo ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Grid */}
        <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 p-3.5 sm:p-5 space-y-2.5 sm:space-y-3">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2563EB]">Institutional Accreditation Details</h4>
            <div className="space-y-2 text-xs text-[#0A2540]">
              <p className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
                <span className="font-mono text-[#2563EB] font-bold truncate">
                  {college.domain ? `@${college.domain}` : 'Domain not configured'}
                </span>
              </p>
              <p className="flex items-center gap-2 font-medium text-slate-600">
                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{[college.city, college.state].filter(Boolean).join(', ') || 'Location not specified'}</span>
              </p>
              <p className="flex items-center gap-2 font-medium text-slate-600">
                <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{college.contactEmail || 'No official contact email'}</span>
              </p>
              <p className="flex items-center gap-2 font-medium text-slate-600">
                <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{college.contactPhone || 'No official contact phone'}</span>
              </p>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 p-3.5 sm:p-5 space-y-2.5 sm:space-y-3">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2563EB]">TPC Cell & Placement Roster</h4>
            <div className="space-y-2 sm:space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="font-medium">Enrolled Students:</span>
                <span className="font-extrabold text-[#0A2540] font-mono text-xs sm:text-sm">{college._count?.students || 0}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="font-medium">Campus Drives Scheduled:</span>
                <span className="font-extrabold text-[#2563EB] font-mono text-xs sm:text-sm">{college._count?.jobs || 0}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium">TPC Officers Assigned:</span>
                <span className="font-extrabold text-[#0A2540] font-mono text-xs sm:text-sm">{college.tpos?.length || 0} officers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Controls */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3.5 sm:pt-4 border-t border-slate-100">
          <p className="text-[11px] sm:text-xs text-slate-500 order-2 sm:order-1 text-center sm:text-left">
            Registered on: {new Date(college.createdAt).toLocaleDateString()}
          </p>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-3 order-1 sm:order-2">
            <button
              onClick={() => setSelectedCollegeForDossier(null)}
              className="rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-[#0A2540] hover:bg-slate-50 transition-colors cursor-pointer text-center"
            >
              Close
            </button>

            {college.isVerified ? (
              <button
                onClick={() => verifyCollege(college.id, false, 'Manual Super Admin revocation')}
                disabled={isVerifying}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-red-200 bg-red-50 px-3 sm:px-4.5 py-2 sm:py-2.5 text-xs font-extrabold text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isVerifying ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShieldAlert className="h-3.5 w-3.5" />}
                Revoke
              </button>
            ) : (
              <button
                onClick={() => verifyCollege(college.id, true)}
                disabled={isVerifying}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs font-extrabold text-white shadow-md shadow-emerald-600/20 hover:scale-102 active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {isVerifying ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5 stroke-[2.5]" />}
                Accredit & Grant
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
