'use client';

import React, { useRef } from 'react';
import { 
  Camera, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Edit3, 
  Building2, 
  GraduationCap,
  Loader2
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useStudentProfileStore } from '@/store/useStudentProfileStore';
import { formatBranchDisplay } from '@/lib/constants/branches';

export function ProfileHeroBanner() {
  const { 
    profile, 
    isUploadingAvatar, 
    uploadAvatar, 
    setEditProfileOpen 
  } = useStudentProfileStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!profile) return null;

  const studentName = profile.user.name || 'Ravi Tiwari';
  const avatarUrl = profile.user.avatarUrl;
  const initial = studentName.trim().charAt(0).toUpperCase() || 'S';
  const branch = formatBranchDisplay(profile.branch || 'CSE');
  const batchYear = profile.batchYear || 2026;
  const collegeName = profile.college?.name || 'Guru Ghasidas University';
  const collegeCity = profile.college?.city || 'Bilaspur';
  const bio = profile.bio || 'Passionate about building scalable web applications and solving real world problems.';
  const completionPercentage = profile.stats?.profileScore || 80;

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadAvatar(file);
      // Reset input value so same file can be re-uploaded if needed
      e.target.value = '';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-sky-100/80 border border-blue-200/70 p-5 sm:p-7 lg:p-8 shadow-xs">
      {/* Hidden file input for fast avatar upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarFileChange}
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
      />

      {/* Background Decorative Campus Silhouette & Sunburst */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none opacity-20 hidden md:block overflow-hidden">
        <svg
          viewBox="0 0 400 300"
          className="absolute right-0 bottom-0 w-full h-full text-blue-900"
          fill="currentColor"
        >
          {/* Stylized Classical Campus Monument */}
          <path d="M120,280 L280,280 L280,180 L300,180 L300,280 L340,280 L340,160 L200,80 L60,160 L60,280 L100,280 L100,180 L120,180 Z" opacity="0.4" />
          <path d="M160,280 L160,200 L240,200 L240,280 Z" opacity="0.5" />
          <circle cx="200" cy="140" r="16" opacity="0.6" />
          <polygon points="200,40 180,80 220,80" opacity="0.8" />
          {/* Sun Rays */}
          <circle cx="340" cy="60" r="28" opacity="0.25" />
          <line x1="340" y1="15" x2="340" y2="28" stroke="currentColor" strokeWidth="4" />
          <line x1="340" y1="92" x2="340" y2="105" stroke="currentColor" strokeWidth="4" />
          <line x1="295" y1="60" x2="308" y2="60" stroke="currentColor" strokeWidth="4" />
          <line x1="372" y1="60" x2="385" y2="60" stroke="currentColor" strokeWidth="4" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Side: Avatar + Student Meta */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
          
          {/* Avatar with Interactive Camera Button */}
          <div className="relative group shrink-0">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-3 border-white shadow-md ring-2 ring-blue-200">
              {avatarUrl ? (
                <AvatarImage 
                  src={avatarUrl} 
                  alt={studentName} 
                  className="object-cover"
                />
              ) : null}
              <AvatarFallback className="bg-gradient-to-tr from-[#0A2540] to-[#2563EB] text-white text-2xl font-black">
                {initial}
              </AvatarFallback>
            </Avatar>

            {/* Quick Change Overlay Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingAvatar}
              className="absolute -bottom-1 -right-1 p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white"
              title="Change Profile Photo"
            >
              {isUploadingAvatar ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Camera className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Identity & Badges */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-heading">
                {studentName}
              </h1>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-600 flex items-center gap-1.5">
              <span>{branch}</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-700 font-bold">Batch {batchYear}</span>
            </p>

            <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{collegeName}{collegeCity ? `, ${collegeCity}` : ''}</span>
            </p>

            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Profile Completion Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Profile Completed {completionPercentage}%</span>
              </div>

              {/* Verified Student Badge */}
              {profile.isVerified && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Verified Student</span>
                </div>
              )}
            </div>

            {/* Bio / Quote */}
            {bio && (
              <p className="text-xs italic text-slate-600 pt-1 max-w-xl line-clamp-2">
                &ldquo;{bio}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Edit Profile CTA + Flag Tagline */}
        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-3.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-200/70">
          
          <button
            onClick={() => setEditProfileOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 border border-transparent hover:bg-blue-700 lg:bg-white lg:text-blue-600 lg:border-blue-200/90 lg:shadow-xs lg:hover:bg-blue-600 lg:hover:text-white lg:hover:border-blue-600 lg:hover:shadow-md lg:hover:shadow-blue-500/20 lg:active:bg-blue-700 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 shrink-0" />
            <span>Edit Profile</span>
          </button>

          <div className="text-right">
            <p className="text-[11px] sm:text-xs font-bold text-slate-700 flex items-center gap-1.5 justify-end">
              <span>&ldquo;Better Skills, Brighter Opportunities&rdquo;</span>
              <span className="text-sm">🇮🇳</span>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
