'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useAdminStore } from '@/store/useAdminStore';
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  LogOut, 
  ShieldCheck, 
  GraduationCap,
  Copy,
  Check,
  ChevronRight,
  UserCog
} from 'lucide-react';

export function AdminUserDropdown() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { pendingColleges } = useAdminStore();
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

  const initialChar = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'A';

  return (
    <DropdownMenu>
      {/* 1. Tactile Executive Avatar Trigger */}
      <DropdownMenuTrigger
        className="group relative flex items-center justify-center rounded-full ring-2 ring-slate-200/80 hover:ring-[#0D8B8A]/70 focus:ring-2 focus:ring-[#0D8B8A] hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer p-0.5 outline-none"
        title={`Director Profile (${user?.name || 'Super Admin'})`}
        aria-label="User profile menu"
      >
        <Avatar size="default" className="border border-slate-200 shadow-2xs h-8.5 w-8.5 sm:h-9 sm:w-9 transition-transform group-hover:scale-102">
          {user?.avatarUrl && (
            <AvatarImage
              src={user.avatarUrl}
              alt={user.name || 'Super Admin'}
              className="object-cover"
            />
          )}
          <AvatarFallback className="bg-gradient-to-tr from-[#0D8B8A] to-teal-800 text-white font-black text-xs">
            {initialChar}
          </AvatarFallback>
        </Avatar>

        {/* Live Active Status Indicator with Micro-Ring */}
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white shadow-xs" />
      </DropdownMenuTrigger>

      {/* 2. Responsive & Viewport-Aware Glassmorphic Dropdown Menu */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[calc(100vw-24px)] xs:w-80 max-w-[320px] rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/98 backdrop-blur-xl p-2 sm:p-2.5 shadow-2xl z-50 text-slate-900 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Executive Profile Card Header */}
        <DropdownMenuLabel className="p-1 font-normal">
          <div 
            onClick={() => router.push('/admin/profile')}
            className="flex items-start gap-3 rounded-2xl bg-gradient-to-br from-teal-50/80 via-slate-50 to-amber-50/40 p-3 sm:p-3.5 border border-teal-100 shadow-2xs cursor-pointer hover:border-teal-300 transition-all group"
          >
            <Avatar size="lg" className="border border-teal-200 shadow-xs shrink-0 mt-0.5">
              {user?.avatarUrl && (
                <AvatarImage
                  src={user.avatarUrl}
                  alt={user.name || 'Super Admin'}
                  className="object-cover"
                />
              )}
              <AvatarFallback className="bg-gradient-to-tr from-[#0D8B8A] to-teal-700 text-white font-extrabold text-sm">
                {initialChar}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate leading-tight font-heading group-hover:text-[#0D8B8A] transition-colors">
                {user?.name || 'Super Admin'}
              </p>
              
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-[11px] text-slate-500 font-mono truncate max-w-[140px]">
                  {user?.email || 'admin@campushire.com'}
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
                <span className="inline-flex items-center gap-1 rounded-full bg-[#0D8B8A]/10 px-2 py-0.5 text-[9.5px] font-black text-teal-800 border border-[#0D8B8A]/20">
                  <ShieldCheck className="h-3 w-3 text-[#0D8B8A]" />
                  SUPER ADMIN COMMAND
                </span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-100 my-1.5" />

        {/* Quick Navigation Items */}
        <div className="space-y-0.5 px-0.5">
          
          {/* 1. Super Admin Profile & Account Settings */}
          <DropdownMenuItem
            onClick={() => router.push('/admin/profile')}
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 rounded-lg bg-teal-50 text-[#0D8B8A] flex items-center justify-center border border-teal-100 shrink-0">
                <UserCog className="h-3.5 w-3.5" />
              </div>
              <span className="font-bold">Admin Profile & Settings</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          </DropdownMenuItem>

          {/* 2. University Accreditations */}
          <DropdownMenuItem
            onClick={() => router.push('/admin/verify-colleges')}
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shrink-0">
                <GraduationCap className="h-3.5 w-3.5" />
              </div>
              <span>Accreditation Queue</span>
            </div>
            {pendingColleges.length > 0 ? (
              <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
                {pendingColleges.length} pending
              </span>
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            )}
          </DropdownMenuItem>

        </div>

        <DropdownMenuSeparator className="bg-slate-100 my-1.5" />

        {/* Destructive Sign Out Action */}
        <div className="p-0.5">
          <DropdownMenuItem
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center justify-between px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 rounded-xl cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <LogOut className="h-4 w-4 text-red-500" />
              <span>{isLoggingOut ? 'Signing Out...' : 'Sign Out'}</span>
            </div>
            {isLoggingOut ? (
              <span className="h-3.5 w-3.5 border-2 border-red-600 border-t-transparent rounded-full animate-spin shrink-0" />
            ) : (
              <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">Exit</span>
            )}
          </DropdownMenuItem>
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}


