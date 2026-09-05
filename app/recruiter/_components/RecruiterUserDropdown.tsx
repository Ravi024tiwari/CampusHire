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
  Building2, 
  LogOut, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Briefcase,
  Users,
  Copy,
  Check,
  FileText,
  Target
} from 'lucide-react';

interface RecruiterUserDropdownProps {
  companyName?: string;
  designation?: string;
}

export function RecruiterUserDropdown({ companyName = 'Corporate Partner', designation = 'Campus Recruiter' }: RecruiterUserDropdownProps) {
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
      {/* 1. Tactile Executive Avatar + Name Trigger */}
      <DropdownMenuTrigger
        className="group relative flex items-center gap-2.5 rounded-full md:rounded-2xl p-1 md:py-1.5 md:px-2.5 border border-transparent md:border-slate-200/90 bg-transparent md:bg-white hover:border-slate-300 hover:shadow-xs focus:ring-2 focus:ring-[#2563EB]/40 active:scale-98 transition-all duration-200 cursor-pointer outline-none select-none"
        title={`Corporate Profile (${user?.name || 'Recruiter'})`}
        aria-label="User profile menu"
      >
        <div className="relative">
          <Avatar size="default" className="border border-slate-200 shadow-2xs h-8.5 w-8.5 sm:h-9 sm:w-9 transition-transform group-hover:scale-102">
            {user?.avatarUrl && (
              <AvatarImage
                src={user.avatarUrl}
                alt={user.name || 'Recruiter'}
                className="object-cover"
              />
            )}
            <AvatarFallback className="bg-gradient-to-tr from-[#2563EB] to-indigo-700 text-white font-black text-xs">
              {initialChar}
            </AvatarFallback>
          </Avatar>

          {/* Live Active Status Indicator with Micro-Ring */}
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white shadow-xs" />
        </div>

        {/* User Name & Designation (Visible on Desktop / MD screens) */}
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-black text-[#0A2540] group-hover:text-blue-600 transition-colors leading-tight">
            {user?.name || 'Rahul Sharma'}
          </span>
          <span className="text-[10px] font-bold text-slate-400 leading-tight truncate max-w-[120px]">
            {designation} - {companyName}
          </span>
        </div>

        <ChevronRight className="hidden md:block w-3.5 h-3.5 text-slate-400 rotate-90 group-hover:text-slate-700 transition-transform" />
      </DropdownMenuTrigger>

      {/* 2. Responsive Glassmorphic Dropdown Menu */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[calc(100vw-24px)] xs:w-80 max-w-[320px] rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/98 backdrop-blur-xl p-2 sm:p-2.5 shadow-2xl z-50 text-[#0A2540] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Executive Profile Card Header */}
        <DropdownMenuLabel className="p-1 font-normal">
          <div className="flex items-start gap-3 rounded-2xl bg-gradient-to-br from-blue-50/80 via-slate-50 to-indigo-50/40 p-3 sm:p-3.5 border border-blue-100 shadow-2xs">
            <Avatar size="lg" className="border border-blue-200 shadow-xs shrink-0 mt-0.5">
              {user?.avatarUrl && (
                <AvatarImage
                  src={user.avatarUrl}
                  alt={user.name || 'Recruiter'}
                  className="object-cover"
                />
              )}
              <AvatarFallback className="bg-gradient-to-tr from-[#2563EB] to-indigo-600 text-white font-extrabold text-sm">
                {initialChar}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-xs sm:text-sm font-extrabold text-[#0A2540] truncate leading-tight font-heading">
                {user?.name || 'Campus Recruiter'}
              </p>
              
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-[11px] text-slate-500 font-mono truncate max-w-[140px]">
                  {user?.email || 'recruiter@company.com'}
                </p>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer shrink-0"
                  title="Copy email address"
                >
                  {isCopied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                </button>
              </div>
              
              <div className="mt-2 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#2563EB]/10 px-2 py-0.5 text-[9.5px] font-black text-[#2563EB] border border-[#2563EB]/20">
                  <ShieldCheck className="h-3 w-3 text-[#2563EB]" />
                  {companyName}
                </span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-100 my-1.5" />

        {/* Quick Navigation Items */}
        <div className="space-y-0.5 px-0.5">
          
          {/* 1. Company Hiring Command */}
          <DropdownMenuItem
            onClick={() => router.push('/recruiter/dashboard')}
            className="flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-bold text-[#0A2540] hover:bg-blue-50/80 hover:text-[#2563EB] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
                <Briefcase className="h-3.5 w-3.5" />
              </div>
              <span>Hiring Command</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </DropdownMenuItem>

          {/* 2. Campus Placement Portal */}
          <DropdownMenuItem
            onClick={() => router.push('/')}
            className="flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-bold text-[#0A2540] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
              <span>Placement Portal</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </DropdownMenuItem>

        </div>

        <DropdownMenuSeparator className="bg-slate-100 my-1.5" />

        {/* Sign Out Action Button */}
        <div className="p-1">
          <DropdownMenuItem
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <LogOut className="h-3.5 w-3.5" />
              </div>
              <span>{isLoggingOut ? 'Signing out...' : 'Sign Out Session'}</span>
            </div>
            <span className="rounded bg-red-100/50 px-1.5 py-0.5 text-[9px] font-mono font-bold text-red-600 uppercase">
              Exit
            </span>
          </DropdownMenuItem>
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
