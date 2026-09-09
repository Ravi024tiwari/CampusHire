'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useStudentDashboardStore } from '@/store/useStudentDashboardStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  FileText, 
  Briefcase, 
  LogOut, 
  ShieldCheck, 
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';

export function StudentUserDropdown() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { data } = useStudentDashboardStore();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Dynamic values merging store and auth state
  const studentName = user?.name || data?.student?.name || 'Student';
  const studentEmail = user?.email || 'student@campus.edu';
  const studentSubtitle = data?.student?.subtitle || 'B.Tech';
  const avatarUrl = user?.avatarUrl || data?.student?.avatarUrl;
  const profileCompletion = data?.stats?.profileCompletion?.percentage ?? 80;

  const initialChar = studentName.trim().charAt(0).toUpperCase() || 'S';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch {
      router.push('/login');
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (studentEmail) {
      navigator.clipboard.writeText(studentEmail);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <DropdownMenu>
      {/* 1. Tactile Circular Avatar Trigger (Responsive for all screen sizes) */}
      <DropdownMenuTrigger
        className="group relative flex items-center gap-2 sm:gap-2.5 p-1 sm:py-1.5 sm:pl-1.5 sm:pr-3 rounded-full border border-slate-200/90 hover:border-blue-400/80 bg-white hover:bg-slate-50/90 focus:ring-2 focus:ring-blue-600 focus:outline-none hover:shadow-xs active:scale-95 transition-all duration-200 cursor-pointer"
        title={`Student Profile (${studentName})`}
        aria-label="Student profile menu"
      >
        {/* Circular Avatar with Status Dot */}
        <div className="relative">
          <Avatar size="default" className="border border-blue-200/80 shadow-2xs h-8 w-8 sm:h-9 sm:w-9 transition-transform group-hover:scale-105">
            {avatarUrl && (
              <AvatarImage
                src={avatarUrl}
                alt={studentName}
                className="object-cover rounded-full"
              />
            )}
            <AvatarFallback className="bg-gradient-to-tr from-[#0A2540] via-blue-700 to-[#2563EB] text-white font-black text-xs">
              {initialChar}
            </AvatarFallback>
          </Avatar>

          {/* Live Active Status Indicator */}
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white shadow-xs" />
        </div>

        {/* Student Name & Subtitle on sm+ screens */}
        <div className="hidden sm:block text-left">
          <p className="text-xs font-black text-[#0A2540] leading-tight group-hover:text-blue-600 transition-colors">
            {studentName}
          </p>
          <p className="text-[10.5px] font-semibold text-slate-400 leading-tight truncate max-w-[130px]">
            {studentSubtitle}
          </p>
        </div>

        {/* Dynamic Chevron Arrow on sm+ screens */}
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform duration-200 hidden sm:block group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>

      {/* 2. Responsive Floating Dropdown Menu */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[calc(100vw-24px)] xs:w-80 max-w-[320px] rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/98 backdrop-blur-xl p-2 sm:p-2.5 shadow-2xl z-50 text-[#0A2540] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Student Profile Card Header */}
        <DropdownMenuLabel className="p-1 font-normal">
          <div className="flex flex-col gap-2.5 rounded-2xl bg-gradient-to-br from-blue-50/90 via-slate-50 to-indigo-50/40 p-3 sm:p-3.5 border border-blue-100/90 shadow-2xs">
            <div className="flex items-start gap-3">
              <Avatar size="lg" className="border-2 border-blue-300/80 shadow-xs shrink-0 mt-0.5">
                {avatarUrl && (
                  <AvatarImage
                    src={avatarUrl}
                    alt={studentName}
                    className="object-cover rounded-full"
                  />
                )}
                <AvatarFallback className="bg-gradient-to-tr from-[#0A2540] via-blue-700 to-[#2563EB] text-white font-extrabold text-sm">
                  {initialChar}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs sm:text-sm font-black text-[#0A2540] truncate leading-tight font-heading">
                    {studentName}
                  </p>
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                </div>

                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="text-[11px] text-slate-500 font-mono truncate max-w-[150px]">
                    {studentEmail}
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

                <div className="mt-1.5 flex flex-wrap items-center gap-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-600/10 px-2 py-0.5 text-[9.5px] font-black text-blue-700 border border-blue-600/20">
                    <GraduationCap className="h-3 w-3 text-blue-600" />
                    {studentSubtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Completion Indicator */}
            <div className="pt-2 border-t border-blue-100/70">
              <div className="flex items-center justify-between text-[10.5px] mb-1">
                <span className="font-bold text-slate-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Profile Completion
                </span>
                <span className="font-extrabold text-blue-700">{profileCompletion}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500" 
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-100 my-1.5" />

        {/* Clean, Functional Quick Navigation Group */}
        <DropdownMenuGroup className="space-y-1 px-0.5">
          {/* 1. Profile & Academics */}
          <DropdownMenuItem
            onClick={() => router.push('/student/profile')}
            className="flex items-center justify-between rounded-xl px-2.5 py-2.5 text-xs font-bold text-[#0A2540] hover:bg-blue-50/90 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <User className="h-3.5 w-3.5" />
              </div>
              <span>My Profile & Academics</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </DropdownMenuItem>

          {/* 2. Resume & ATS Score */}
          <DropdownMenuItem
            onClick={() => router.push('/student/profile')}
            className="flex items-center justify-between rounded-xl px-2.5 py-2.5 text-xs font-bold text-[#0A2540] hover:bg-blue-50/90 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <FileText className="h-3.5 w-3.5" />
              </div>
              <span>Resume & ATS Management</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </DropdownMenuItem>

          {/* 3. Applied Jobs */}
          <DropdownMenuItem
            onClick={() => router.push('/student/applications')}
            className="flex items-center justify-between rounded-xl px-2.5 py-2.5 text-xs font-bold text-[#0A2540] hover:bg-blue-50/90 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Briefcase className="h-3.5 w-3.5" />
              </div>
              <span>Applied Jobs & Drives</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-slate-100 my-1.5" />

        {/* Sign Out Action Button */}
        <div className="p-0.5">
          <DropdownMenuItem
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center justify-between rounded-xl px-2.5 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <LogOut className="h-3.5 w-3.5" />
              </div>
              <span>{isLoggingOut ? 'Signing out...' : 'Sign Out Session'}</span>
            </div>
            <span className="rounded bg-red-100/60 px-1.5 py-0.5 text-[9.5px] font-mono font-bold text-red-600 uppercase">
              Exit
            </span>
          </DropdownMenuItem>
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
