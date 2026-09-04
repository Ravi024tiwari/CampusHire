'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUIStore } from '@/store/useUIStore';
import { RecruiterUserDropdown } from './RecruiterUserDropdown';
import { 
  Building2, 
  Menu, 
  X, 
  RefreshCw 
} from 'lucide-react';

interface RecruiterHeaderProps {
  companyName?: string;
  designation?: string;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function RecruiterHeader({
  companyName = 'Corporate Partner',
  designation,
  onRefresh,
  isLoading,
}: RecruiterHeaderProps) {
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b border-slate-200/90 bg-white/95 backdrop-blur-md transition-all shadow-xs shrink-0">
      <div className="flex h-16 sm:h-[4.5rem] w-full items-center justify-between px-2.5 sm:px-6">
        
        {/* Left: Mobile Toggle & Brand Emblem + Corporate Identity */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Mobile Sidebar Hamburger Toggle Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-[#0A2540] cursor-pointer shadow-2xs shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>

          {/* CampusHire Official Link */}
          <Link href="/recruiter/dashboard" className="flex items-center gap-2 sm:gap-3 group select-none outline-none">
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

            <div className="hidden sm:flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-base sm:text-lg font-heading leading-none flex items-center">
                <span className="text-[#0A2540]">Campus</span>
                <span className="text-[#FBAB23]">Hire</span>
              </span>
              <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[9px] sm:text-[10px] font-black text-blue-700 border border-blue-200 tracking-wider flex items-center gap-1">
                <Building2 className="w-2.5 h-2.5" />
                CORPORATE RECRUITER
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Actions, Refresh, User Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh Hiring Telemetry"
              className="flex h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 cursor-pointer shadow-2xs shrink-0"
            >
              <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          )}

          <div className="h-5 sm:h-6 w-[1px] bg-slate-200" />

          {/* User Profile Dropdown */}
          <RecruiterUserDropdown companyName={companyName} designation={designation} />
        </div>
      </div>
    </header>
  );
}
