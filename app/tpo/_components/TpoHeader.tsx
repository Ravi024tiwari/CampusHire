'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTpoStore } from '@/store/useTpoStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  Bell, 
  ChevronDown, 
  Menu, 
  LogOut, 
  Settings, 
  Building2,
  ShieldCheck
} from 'lucide-react';

export function TpoHeader() {
  const router = useRouter();
  const { isMobileMenuOpen, setIsMobileMenuOpen, dashboardData } = useTpoStore();
  const { user, logout } = useAuthStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const officerName = dashboardData?.tpoOfficer?.name || user?.name || 'TPO Officer';
  const officerAvatar = dashboardData?.tpoOfficer?.avatarUrl || user?.avatarUrl;
  const officerEmail = dashboardData?.tpoOfficer?.email || user?.email || '';
  const officerDesignation = dashboardData?.tpoOfficer?.designation || user?.tpo?.designation || 'Head, Training & Placement';
  const collegeCode = dashboardData?.college?.code || user?.tpo?.college?.code || 'CAMPUS';
  const collegeName = dashboardData?.college?.name || user?.tpo?.college?.name || 'College Placement Cell';

  // Compute initials cleanly
  const getInitials = (name: string) => {
    if (!name) return 'TP';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(officerName);
  const hasAvatar = Boolean(officerAvatar) && !avatarError;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/90 bg-white/95 px-3 sm:px-6 backdrop-blur-md shadow-2xs">
      
      {/* 1. Left: Mobile Hamburger & Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl text-slate-500 hover:text-[#0A2540] hover:bg-slate-100 md:hidden transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/tpo/dashboard" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-slate-200/80 bg-white p-0.5 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <img
              src="/images/campushire-emblem.png"
              alt="CampusHire Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-tight text-[#0A2540] font-heading leading-tight flex items-center">
              Campus<span className="text-[#FBAB23]">Hire</span>
            </span>
            <span className="text-[9.5px] font-bold tracking-wider text-slate-400 uppercase leading-none">
              College Portal
            </span>
          </div>
        </Link>
      </div>

      {/* 2. Right: Notifications & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl text-slate-500 hover:text-[#0A2540] hover:bg-slate-100 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-white">
              3
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
                <span className="text-xs font-bold text-[#0A2540] font-heading">Campus Notifications</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  3 New
                </span>
              </div>
              <div className="space-y-2 py-2 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
                  <p className="font-bold text-slate-800">Google India Campus Drive</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Shortlisting deadline closes tomorrow at 5:00 PM.</p>
                </div>
                <div className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-800">14 New Offers Released</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Microsoft accepted 14 candidates for SWE roles.</p>
                </div>
                <div className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-800">Accreditation Audit Confirmed</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">NIRF placement statistics report ready for download.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Pill & Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 pl-1.5 pr-2 sm:pr-3 py-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
          >
            {/* Officer Avatar / Initials Avatar */}
            <div className="h-8 w-8 rounded-xl overflow-hidden shadow-2xs shrink-0 flex items-center justify-center border border-slate-200/80 bg-slate-100">
              {hasAvatar ? (
                <img
                  src={officerAvatar!}
                  alt={officerName}
                  onError={() => setAvatarError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-linear-to-br from-blue-600 to-indigo-700 text-white font-black flex items-center justify-center text-[11px] font-heading">
                  {initials}
                </div>
              )}
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-[#0A2540] truncate max-w-[130px] font-heading">
                {officerName}
              </span>
              <span className="text-[10px] font-medium text-slate-500 leading-none">
                TPO, {collegeCode}
              </span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 space-y-1.5">
              <div className="p-3 border border-slate-100 bg-slate-50/80 rounded-xl flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl overflow-hidden shadow-2xs shrink-0 flex items-center justify-center border border-slate-200 bg-white">
                  {hasAvatar ? (
                    <img
                      src={officerAvatar!}
                      alt={officerName}
                      onError={() => setAvatarError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-linear-to-br from-blue-600 to-indigo-700 text-white font-black flex items-center justify-center text-xs font-heading">
                      {initials}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-[#0A2540] font-heading truncate">{officerName}</p>
                  <p className="text-[10px] text-slate-500 truncate">{officerEmail || officerDesignation}</p>
                  <p className="text-[10.5px] font-bold text-blue-700 truncate mt-0.5">{collegeName}</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Authorized TPC Lead
                  </span>
                </div>
              </div>

              <Link
                href="/tpo/college"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>College Profile & TPC</span>
              </Link>

              <Link
                href="/tpo/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Placement Settings</span>
              </Link>

              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={async () => {
                    setShowProfileMenu(false);
                    await logout();
                    router.push('/login');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Sign Out Console</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}
