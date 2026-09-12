'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LogOut, 
  ChevronRight,
  Briefcase,
  FileText,
  Copy,
  Check,
  User,
  Loader2
} from 'lucide-react';

interface RecruiterUserDropdownProps {
  companyName?: string;
  designation?: string;
}

export function RecruiterUserDropdown({ 
  companyName = 'Corporate Partner', 
  designation = 'Campus Recruiter' 
}: RecruiterUserDropdownProps) {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const initialChar = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'R';

  return (
    <DropdownMenu>
      {/* 1. Adaptive Header Trigger Button (Mobile & Desktop Ergonomics) */}
      <DropdownMenuTrigger
        className="group relative flex items-center gap-2 rounded-full md:rounded-2xl p-0.5 sm:p-1 md:py-1.5 md:px-2.5 border border-transparent md:border-slate-200/90 bg-transparent md:bg-white hover:border-blue-300 hover:shadow-xs focus:ring-2 focus:ring-[#0070F3]/30 active:scale-95 transition-all duration-200 cursor-pointer outline-none select-none shrink-0 min-h-[36px] sm:min-h-[40px]"
        title={`Corporate Profile (${user?.name || 'Recruiter'})`}
        aria-label="User profile menu"
      >
        <div className="relative shrink-0">
          <Avatar size="default" className="border border-slate-200/90 shadow-2xs h-8 w-8 sm:h-9 sm:w-9 transition-transform group-hover:scale-105">
            {user?.avatarUrl && (
              <AvatarImage
                src={user.avatarUrl}
                alt={user.name || 'Recruiter'}
                className="object-cover"
              />
            )}
            <AvatarFallback className="bg-gradient-to-tr from-[#0070F3] to-[#0A2540] text-white font-black text-xs">
              {initialChar}
            </AvatarFallback>
          </Avatar>

          {/* Live Active Status Indicator Dot */}
          <span className="absolute bottom-0 right-0 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500 ring-2 ring-white shadow-xs" />
        </div>

        {/* User Name & Designation (Hidden on small mobile, visible on MD+ screens) */}
        <div className="hidden md:flex flex-col text-left pr-0.5">
          <span className="text-xs font-black text-[#0A2540] group-hover:text-[#0070F3] transition-colors leading-tight font-heading truncate max-w-[130px]">
            {user?.name || 'Corporate Recruiter'}
          </span>
          <span className="text-[10px] font-bold text-slate-400 leading-tight truncate max-w-[125px]">
            {designation} • {companyName}
          </span>
        </div>

        <ChevronRight className="hidden md:block w-3.5 h-3.5 text-slate-400 rotate-90 group-hover:text-slate-700 transition-transform shrink-0" />
      </DropdownMenuTrigger>

      {/* 2. Responsive Dropdown Container (Mobile Safe-Bounds & Glassmorphic Polish) */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[calc(100vw-24px)] xs:w-[290px] sm:w-[315px] max-w-[320px] rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/98 backdrop-blur-xl p-1.5 sm:p-2 shadow-2xl z-50 text-[#0A2540] animate-in fade-in zoom-in-95 duration-150 origin-top-right"
      >
        {/* Profile Card Header (Mobile-Optimized Layout) */}
        <DropdownMenuLabel className="p-1.5 sm:p-2 font-normal">
          <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl bg-slate-50/80 p-2 sm:p-2.5 border border-slate-100/90">
            <div className="relative shrink-0">
              <Avatar size="lg" className="h-9 w-9 sm:h-10 sm:w-10 border border-slate-200 shadow-2xs">
                {user?.avatarUrl && (
                  <AvatarImage
                    src={user.avatarUrl}
                    alt={user.name || 'Recruiter'}
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="bg-gradient-to-tr from-[#0070F3] to-[#0A2540] text-white font-extrabold text-xs sm:text-sm">
                  {initialChar}
                </AvatarFallback>
              </Avatar>

              {/* Status Indicator Dot */}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white shadow-2xs" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-snug font-heading">
                {user?.name || 'Corporate Recruiter'}
              </p>
              
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-[11px] sm:text-xs text-slate-500 truncate max-w-[140px] xs:max-w-[155px] font-medium">
                  {user?.email || 'recruiter@company.com'}
                </p>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-slate-400 hover:text-slate-700 hover:bg-white active:scale-90 p-1 rounded-md transition-all cursor-pointer shrink-0"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {isCopied ? <Check className="h-3 w-3 text-emerald-600 stroke-[2.5]" /> : <Copy className="h-3 w-3" />}
                </button>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-100 my-1" />

        {/* Action Items with Touch-Friendly Hit Targets & Responsive Badges */}
        <div className="space-y-0.5 py-0.5">
          
          {/* 1. View Profile */}
          <DropdownMenuItem
            onClick={() => router.push('/recruiter/company')}
            className="group flex items-center justify-between rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs font-semibold text-slate-700 hover:bg-blue-50/70 hover:text-[#0070F3] focus:bg-blue-50/70 focus:text-[#0070F3] transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 sm:h-7.5 sm:w-7.5 items-center justify-center rounded-lg sm:rounded-xl bg-blue-50 text-[#0070F3] border border-blue-100/70 shrink-0 group-hover:scale-105 transition-transform">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="font-bold text-slate-800 group-hover:text-[#0070F3] transition-colors text-xs sm:text-[13px]">
                View Profile
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9.5px] sm:text-[10px] font-bold bg-blue-50 text-[#0070F3] border border-blue-200/80 shadow-2xs max-w-[90px] truncate">
              {companyName}
            </span>
          </DropdownMenuItem>

          {/* 2. Job Postings */}
          <DropdownMenuItem
            onClick={() => router.push('/recruiter/jobs')}
            className="group flex items-center justify-between rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs font-semibold text-slate-700 hover:bg-emerald-50/70 hover:text-[#0D8B8A] focus:bg-emerald-50/70 focus:text-[#0D8B8A] transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 sm:h-7.5 sm:w-7.5 items-center justify-center rounded-lg sm:rounded-xl bg-emerald-50 text-[#0D8B8A] border border-emerald-100/70 shrink-0 group-hover:scale-105 transition-transform">
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="font-bold text-slate-800 group-hover:text-[#0D8B8A] transition-colors text-xs sm:text-[13px]">
                Job Postings
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9.5px] sm:text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
              Drives
            </span>
          </DropdownMenuItem>

          {/* 3. Applications */}
          <DropdownMenuItem
            onClick={() => router.push('/recruiter/applications')}
            className="group flex items-center justify-between rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs font-semibold text-slate-700 hover:bg-purple-50/70 hover:text-purple-700 focus:bg-purple-50/70 focus:text-purple-700 transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 sm:h-7.5 sm:w-7.5 items-center justify-center rounded-lg sm:rounded-xl bg-purple-50 text-purple-600 border border-purple-100/70 shrink-0 group-hover:scale-105 transition-transform">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="font-bold text-slate-800 group-hover:text-purple-700 transition-colors text-xs sm:text-[13px]">
                Applications
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9.5px] sm:text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200/80 shadow-2xs">
              Pipeline
            </span>
          </DropdownMenuItem>

        </div>

        <DropdownMenuSeparator className="bg-slate-100 my-1" />

        {/* 4. Logout Action */}
        <div className="pt-0.5">
          <DropdownMenuItem
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="group flex items-center justify-between rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50/80 hover:text-rose-700 focus:bg-rose-50/80 focus:text-rose-700 transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 sm:h-7.5 sm:w-7.5 items-center justify-center rounded-lg sm:rounded-xl bg-rose-50 text-rose-600 border border-rose-100/70 shrink-0">
                {isLoggingOut ? (
                  <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-rose-600" />
                ) : (
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 group-hover:text-rose-600 transition-colors" />
                )}
              </div>
              <span className="font-bold text-rose-600 text-xs sm:text-[13px]">
                {isLoggingOut ? 'Signing out...' : 'Log Out'}
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9.5px] sm:text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200/80 shadow-2xs">
              Exit
            </span>
          </DropdownMenuItem>
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
