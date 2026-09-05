'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUIStore } from '@/store/useUIStore';
import { RecruiterUserDropdown } from './RecruiterUserDropdown';
import { 
  Building2, 
  Menu, 
  X, 
  Search,
  Bell,
  RefreshCw
} from 'lucide-react';

interface RecruiterHeaderProps {
  companyName?: string;
  designation?: string;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function RecruiterHeader({
  companyName = 'Google',
  designation = 'Recruiter',
  onRefresh,
  isLoading,
}: RecruiterHeaderProps) {
  const { 
    isMobileMenuOpen, 
    toggleMobileMenu
  } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpandedMobile, setIsSearchExpandedMobile] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b border-slate-200/90 bg-white/95 backdrop-blur-md transition-all shadow-2xs shrink-0">
      <div className="flex h-16 sm:h-[4.5rem] w-full items-center justify-between px-3 sm:px-6 gap-3">
        
        {/* Left: Mobile Toggle & Brand Emblem + Corporate Recruiter Tag (Always in place) */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Mobile Sidebar Hamburger Toggle Button (Hidden on Desktop) */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-[#0A2540] cursor-pointer shadow-2xs shrink-0 active:scale-95 transition-transform"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>

          {/* CampusHire Official Logo & Brand Tag (In place on all devices) */}
          <Link 
            href="/recruiter/dashboard" 
            className="flex items-center gap-2 sm:gap-3 group select-none outline-none"
          >
            <div className="relative w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-white p-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/campushire-emblem.png"
                alt="CampusHire"
                fill
                priority
                sizes="(max-width: 768px) 36px, 40px"
                className="object-contain p-0.5 rounded-lg sm:rounded-xl"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-base sm:text-lg font-heading leading-none flex items-center">
                <span className="text-[#0A2540]">Campus</span>
                <span className="text-[#FBAB23]">Hire</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[9px] sm:text-[10px] font-black text-blue-700 border border-blue-200 tracking-wider">
                <Building2 className="w-2.5 h-2.5" />
                CORPORATE RECRUITER
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar (Desktop Always, Expandable on Mobile/Tablet) */}
        <div className="flex-1 max-w-md mx-2">
          {/* Desktop & Tablet Search Bar */}
          <div className="relative hidden md:block w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidates, jobs, drives..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-500 focus:bg-white transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Right: Search Toggle (Mobile), Notifications, Refresh, User Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Mobile Search Toggle */}
          <button
            type="button"
            onClick={() => setIsSearchExpandedMobile(!isSearchExpandedMobile)}
            className="flex md:hidden h-8.5 w-8.5 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer shadow-2xs"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Refresh Action (if enabled) */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh Hiring Telemetry"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          )}

          {/* Notification Bell with Badge 1 (Matching UI Mockup) */}
          <Link
            href="/recruiter/notifications"
            className="relative flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-[#0A2540] cursor-pointer shadow-2xs active:scale-95 transition-transform"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 h-4 min-w-[1rem] px-1 rounded-full bg-rose-500 text-white text-[9.5px] font-black flex items-center justify-center shadow-xs ring-2 ring-white animate-pulse">
              1
            </span>
          </Link>

          <div className="h-5 sm:h-6 w-[1px] bg-slate-200 hidden sm:block" />

          {/* User Profile Dropdown */}
          <RecruiterUserDropdown companyName={companyName} designation={designation} />
        </div>
      </div>

      {/* Mobile Search Dropdown Bar (when expanded) */}
      {isSearchExpandedMobile && (
        <div className="md:hidden px-3 py-2 border-t border-slate-100 bg-slate-50/80 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidates, jobs, drives..."
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
            />
          </div>
        </div>
      )}
    </header>
  );
}
