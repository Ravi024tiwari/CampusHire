'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAdminStore } from '@/store/useAdminStore';
import { AdminUserDropdown } from './AdminUserDropdown';
import { 
  Bell, 
  RefreshCw, 
  Menu, 
  X 
} from 'lucide-react';

export function AdminHeader() {
  const { 
    pendingColleges, 
    fetchDashboardData, 
    isLoading,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useAdminStore();

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all shadow-xs shrink-0">
      <div className="flex h-16 sm:h-[4.5rem] w-full items-center justify-between px-3 sm:px-6">
        
        {/* Left: Mobile Menu Toggle & Official CampusHire Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer shadow-2xs shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>

          {/* Official Website Emblem Logo & Platform Branding */}
          <Link href="/admin/dashboard" className="flex items-center gap-2 sm:gap-3 group select-none outline-none">
            {/* High-Impact Circular Emblem Icon matching landing page */}
            <div className="relative w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-white p-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/campushire-emblem.png"
                alt="CampusHire Official Emblem"
                fill
                priority
                sizes="(max-width: 768px) 36px, 44px"
                className="object-contain p-0.5 rounded-lg sm:rounded-xl"
              />
            </div>

            {/* Brand text hidden on mobile/small screens, visible from sm up */}
            <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold tracking-tight text-base sm:text-xl font-heading leading-none flex items-center">
                <span className="text-slate-900">Campus</span>
                <span className="text-[#FBAB23] drop-shadow-xs">Hire</span>
              </span>
              <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-black text-amber-800 border border-amber-200 tracking-wider">
                SUPER ADMIN
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Refresh, Notifications, User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Refresh Button */}
          <button
            onClick={() => fetchDashboardData()}
            disabled={isLoading}
            title="Refresh Placement Telemetry"
            className="flex h-8.5 w-8.5 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700 disabled:opacity-50 cursor-pointer shadow-2xs shrink-0"
          >
            <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isLoading ? 'animate-spin text-teal-600' : ''}`} />
          </button>

          {/* Notifications with Pending Count Badge */}
          <div className="relative shrink-0">
            <Link
              href="/admin/verification-queue"
              title="Pending Accreditations & Verifications"
              className="flex h-8.5 w-8.5 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700 cursor-pointer shadow-2xs"
            >
              <Bell className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              {pendingColleges.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 sm:h-5 sm:min-w-5 items-center justify-center rounded-full bg-[#FBAB23] px-1 text-[9px] sm:text-[10px] font-extrabold text-slate-900 ring-2 ring-white shadow-md animate-pulse">
                  {pendingColleges.length}
                </span>
              )}
            </Link>
          </div>

          <div className="h-5 sm:h-6 w-[1px] bg-slate-200 mx-0.5" />

          {/* Minimalist Shadcn Avatar Dropdown */}
          <AdminUserDropdown />
        </div>
      </div>
    </header>
  );
}
