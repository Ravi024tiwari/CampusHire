'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Search, 
  Bell, 
  Menu, 
  GraduationCap 
} from 'lucide-react';
import { useStudentDashboardStore } from '@/store/useStudentDashboardStore';
import { StudentUserDropdown } from './StudentUserDropdown';

export function StudentHeader() {
  const { searchQuery, setSearchQuery, setMobileSidebarOpen } = useStudentDashboardStore();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-all">
      <div className="flex items-center justify-between gap-3 max-w-[1700px] mx-auto">
        
        {/* Left: Mobile Drawer Trigger + Brand Logo (Visible on mobile/tablet <lg) */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMobileSidebarOpen(true);
            }}
            className="lg:hidden p-2 rounded-xl border border-slate-200/90 text-slate-600 hover:bg-slate-50 cursor-pointer shadow-2xs active:scale-95 transition-all touch-manipulation select-none"
            title="Open navigation menu"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/student/dashboard" className="flex lg:hidden items-center gap-2 cursor-pointer">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-[#0A2540] to-[#2563EB] flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="h-4.5 w-4.5" />
            </div>
            <span className="text-sm font-black text-[#0A2540] font-heading hidden sm:inline">
              CampusHire
            </span>
          </Link>
        </div>

        {/* Center: Global Search Input */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search for jobs, drives, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200/90 bg-slate-50/80 py-2 sm:py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#0A2540] placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/15 font-medium transition-all"
            />
          </div>
        </div>

        {/* Right: Notifications Bell & Circular Shadcn Avatar User Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Notifications Button */}
          <Link
            href="/student/notifications"
            className="relative p-2 sm:p-2.5 rounded-full border border-slate-200/90 hover:bg-slate-50 text-slate-600 hover:text-[#0A2540] transition-colors cursor-pointer shadow-2xs active:scale-95"
            title="View Notifications"
          >
            <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </Link>

          {/* Circular Shadcn Avatar User Dropdown */}
          <StudentUserDropdown />

        </div>

      </div>
    </header>
  );
}

