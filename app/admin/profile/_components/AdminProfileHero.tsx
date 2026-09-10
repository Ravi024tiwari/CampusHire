'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { 
  Camera, 
  Trash2, 
  Loader2, 
  ShieldCheck, 
  Mail, 
  Copy, 
  Check, 
  Calendar,
  Sparkles,
  UploadCloud,
  Building2,
  Lock,
  Globe
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface AdminProfileHeroProps {
  user: {
    id?: string;
    name?: string;
    email?: string;
    avatarUrl?: string | null;
    role?: string;
    createdAt?: string;
  } | null;
  avatarPreview: string | null;
  isUploadingAvatar: boolean;
  onAvatarUpload: (file: File) => Promise<void>;
  onRemoveAvatar: () => void;
  isSaving: boolean;
  onSaveProfile: () => void;
  hasUnsavedChanges: boolean;
}

export function AdminProfileHero({
  user,
  avatarPreview,
  isUploadingAvatar,
  onAvatarUpload,
  onRemoveAvatar,
  isSaving,
  onSaveProfile,
  hasUnsavedChanges,
}: AdminProfileHeroProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAvatarUpload(file);
    }
  };

  const displayAvatar = avatarPreview || user?.avatarUrl;
  const initialChar = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'A';
  const joinedDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : '2026';

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950 shadow-xl transition-all duration-300">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC BACKGROUND BANNER WITH CLEAR VISIBILITY & DEPTH              */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Background Cover Image with High Clarity and Dynamic Lighting */}
        <Image
          src="/images/admin/admin_profile_cover.jpg"
          alt="CampusHire Executive Administration Command Banner"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1700px"
          className="object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-102"
        />

        {/* Soft Contrast Gradient Overlays (Preserving Image Details while Guaranteeing Crisp White Text) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/20 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent z-[1]" />
      </div>

      {/* ========================================================================= */}
      {/* 2. EXECUTIVE HERO CONTENT LAYER (All text in crisp high-contrast white)  */}
      {/* ========================================================================= */}
      <div className="relative z-10 p-5 sm:p-7 lg:p-9 space-y-4">
        
        {/* Main Identity Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Avatar + Admin Name + Badges + Email */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            
            {/* Avatar Container with Controls */}
            <div className="relative group shrink-0">
              <Avatar size="lg" className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 rounded-3xl border-2 border-slate-700/80 shadow-2xl transition-all group-hover:border-[#0D8B8A]/80 overflow-hidden bg-slate-900 ring-4 ring-slate-950/80">
                {displayAvatar ? (
                  <AvatarImage src={displayAvatar} alt={user?.name || 'Super Admin'} className="object-cover" />
                ) : null}
                <AvatarFallback className="bg-gradient-to-tr from-[#0D8B8A] to-teal-900 text-white font-black text-2xl sm:text-3xl">
                  {initialChar}
                </AvatarFallback>
              </Avatar>

              {/* Upload Spinner Overlay */}
              {isUploadingAvatar && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs rounded-3xl flex items-center justify-center text-white z-30">
                  <Loader2 className="w-7 h-7 animate-spin text-teal-400" />
                </div>
              )}

              {/* Action Buttons: Camera Upload + Trash Delete */}
              <div className="absolute -bottom-1 -right-1 flex items-center gap-1 z-30">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingAvatar}
                  className="h-8 w-8 rounded-xl bg-[#0D8B8A] text-white flex items-center justify-center shadow-lg hover:bg-teal-600 transition-transform active:scale-95 cursor-pointer border-2 border-slate-950"
                  title="Upload executive photo"
                >
                  <Camera className="w-4 h-4" />
                </button>

                {displayAvatar && (
                  <button
                    type="button"
                    onClick={onRemoveAvatar}
                    disabled={isUploadingAvatar}
                    className="h-8 w-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 transition-transform active:scale-95 cursor-pointer border-2 border-slate-950"
                    title="Remove profile photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Admin Name in White & Role Credentials */}
            <div className="space-y-2 min-w-0">
              
              {/* Name & Roles Header */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-heading tracking-tight leading-tight drop-shadow-md">
                  {user?.name || 'Super Admin'}
                </h1>
                
                <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/20 backdrop-blur-md px-3 py-1 text-[10.5px] sm:text-xs font-black text-teal-300 border border-teal-400/40 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                  SUPER ADMIN
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 backdrop-blur-md px-3 py-1 text-[10.5px] sm:text-xs font-black text-amber-300 border border-amber-400/40 shadow-sm">
                  ROOT CLEARANCE
                </span>
              </div>

              {/* Email in Crisp White/Slate-200 with copy button */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-mono text-white/95 font-semibold truncate">
                  {user?.email || 'admin@campushire.com'}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Designation & Joined Details in Soft Slate-300 */}
              <div className="flex flex-wrap items-center gap-3 pt-0.5 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5 text-teal-200">
                  <Building2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Director General & National Administrator</span>
                </span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Member since {joinedDate}</span>
                </span>
              </div>
            </div>

          </div>

          {/* Right Action: Save Profile Changes with Crisp Pure White Text */}
          <div className="flex items-center gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
            <button
              type="button"
              onClick={onSaveProfile}
              disabled={isSaving || !hasUnsavedChanges}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white transition-all shadow-lg cursor-pointer ${
                hasUnsavedChanges
                  ? 'bg-[#0D8B8A] hover:bg-teal-600 text-white shadow-teal-900/50 active:scale-98 border border-teal-400/50'
                  : 'bg-slate-800/90 hover:bg-slate-800 text-white/90 border border-slate-700/80 cursor-not-allowed opacity-90'
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span className="text-white font-bold">Saving Profile...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4 text-white" />
                  <span className="text-white font-bold">Save Profile Changes</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
