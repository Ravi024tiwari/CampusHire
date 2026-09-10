'use client';

import React from 'react';
import { 
  User, 
  Mail, 
  Building2, 
  Briefcase, 
  Phone, 
  FileText, 
  CheckCircle2,
  ShieldCheck,
  Globe,
  UploadCloud,
  Loader2
} from 'lucide-react';

interface AdminProfileGeneralTabProps {
  formData: {
    name: string;
    email: string;
    title: string;
    department: string;
    phone: string;
    bio: string;
    location: string;
  };
  onChange: (field: string, value: string) => void;
  isSaving: boolean;
  onSave: () => void;
  hasUnsavedChanges: boolean;
}

export function AdminProfileGeneralTab({
  formData,
  onChange,
  isSaving,
  onSave,
  hasUnsavedChanges,
}: AdminProfileGeneralTabProps) {
  return (
    <div className="space-y-6">
      {/* 1. Identity & System Attributes Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading">
              Executive Profile & Institutional Dossier
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Personal identity details displayed on admin audits, university communications, and governance logs.
            </p>
          </div>

          {hasUnsavedChanges && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shrink-0 self-start sm:self-auto">
              Unsaved Changes
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Full Name <span className="text-rose-500">*</span></span>
              <span className="text-[10px] text-slate-400 font-normal">{formData.name.length}/50</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.name}
                maxLength={50}
                onChange={(e) => onChange('name', e.target.value)}
                placeholder="e.g. Dr. Ravi Tiwari"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Primary Email (Read-Only Root Account) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Root Administrator Email</span>
              <span className="text-[10.5px] text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Root
              </span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-600 cursor-not-allowed shadow-inner"
              />
            </div>
          </div>

          {/* Executive Role / Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Administrative Title / Role
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.title}
                onChange={(e) => onChange('title', e.target.value)}
                placeholder="e.g. Director General & Super Administrator"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Department / Division */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Department / Office
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.department}
                onChange={(e) => onChange('department', e.target.value)}
                placeholder="e.g. Central University & Corporate Directorate"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Phone / Emergency Hotline */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Contact / Hotline Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                placeholder="+91 (0) 11 2787 1018"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Headquarters Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Operations Headquarters
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => onChange('location', e.target.value)}
                placeholder="New Delhi, India"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Executive Bio / Mission Statement */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Executive Dossier & Governance Responsibilities</span>
              <span className="text-[10px] text-slate-400 font-normal">{formData.bio.length}/500</span>
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <textarea
                value={formData.bio}
                maxLength={500}
                rows={3}
                onChange={(e) => onChange('bio', e.target.value)}
                placeholder="Describe your governance responsibilities, system policies, or institutional focus..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] shadow-2xs transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[11px] text-slate-500 font-medium">
            Changes will be committed to the root database immediately.
          </p>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving || !hasUnsavedChanges}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
              hasUnsavedChanges
                ? 'bg-[#0D8B8A] hover:bg-teal-700 text-white cursor-pointer active:scale-98 shadow-teal-700/20'
                : 'bg-slate-400 text-white cursor-not-allowed border border-slate-400/80 opacity-90'
            }`}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span className="text-white font-bold">Saving Details...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4 text-white" />
                <span className="text-white font-bold">Save Profile Details</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. System Verification Footnote */}
      <div className="rounded-2xl bg-teal-50/60 border border-teal-100 p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#0D8B8A] shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600">
          <p className="font-bold text-slate-900">Root Administrator Integrity</p>
          <p className="mt-0.5">
            Updates to your profile name and executive avatar are audited and synchronized instantly across the Super Admin portal, live websocket telemetry, and university reports.
          </p>
        </div>
      </div>
    </div>
  );
}
