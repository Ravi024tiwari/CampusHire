'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  FileText, 
  GraduationCap,
  PanelLeftClose, 
  PanelLeftOpen, 
  X, 
  LogOut, 
  Loader2,
  Sparkles
} from 'lucide-react';

interface RecruiterSidebarProps {
  activeDrivesCount?: number;
  applicantsCount?: number;
  teamCount?: number;
}

export function RecruiterSidebar({
  activeDrivesCount = 0,
  applicantsCount = 0,
  teamCount = 0,
}: RecruiterSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('campushire_recruiter_sidebar_collapsed');
      if (saved !== null) {
        setIsCollapsed(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, setMobileMenuOpen]);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('campushire_recruiter_sidebar_collapsed', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const navLinks = [
    {
      href: '/recruiter/dashboard',
      label: 'Hiring Command',
      shortLabel: 'Command',
      icon: LayoutDashboard,
      badge: null,
      badgeColor: '',
      color: 'text-blue-600',
    },
    {
      href: '/recruiter/colleges',
      label: 'Verified Campuses',
      shortLabel: 'Campuses',
      icon: GraduationCap,
      badge: null,
      badgeColor: '',
      color: 'text-emerald-600',
    },
    {
      href: '/recruiter/dashboard#drives',
      label: 'Campus Drives',
      shortLabel: 'Drives',
      icon: Briefcase,
      badge: activeDrivesCount,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 font-extrabold',
      color: 'text-blue-600',
    },
    {
      href: '/recruiter/dashboard#applications',
      label: 'Candidate Stream',
      shortLabel: 'Candidates',
      icon: FileText,
      badge: applicantsCount,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-extrabold',
      color: 'text-emerald-600',
    },
    {
      href: '/recruiter/dashboard#team',
      label: 'Talent Team',
      shortLabel: 'Team',
      icon: Users,
      badge: teamCount,
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 font-extrabold',
      color: 'text-purple-600',
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full min-h-0 pt-3.5 sm:pt-4.5 px-3 sm:px-3.5 pb-3.5 select-none transition-all duration-300">
      
      {/* Top Header Controls */}
      <div className="shrink-0 pb-3 sm:pb-3.5 border-b border-slate-100">
        
        {/* Mobile Header: Logo & Close Button */}
        <div className="flex md:hidden items-center justify-between gap-2 pb-2">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-slate-200/80 bg-white p-0.5 shrink-0 shadow-2xs">
              <img
                src="/images/campushire-emblem.png"
                alt="CampusHire"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-extrabold text-sm font-heading tracking-tight">
              <span className="text-[#0A2540]">Campus</span>
              <span className="text-[#FBAB23]">Hire</span>
            </span>
            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[8.5px] font-black text-blue-800 border border-blue-200">
              RECRUITER
            </span>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-[#0A2540] hover:bg-slate-100 cursor-pointer border border-slate-200/70 shadow-2xs"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Desktop Header: Collapse Button */}
        <div className={`hidden md:flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-1'}`}>
          {!isCollapsed && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-blue-500" />
              Recruiting Hub
            </p>
          )}

          <button
            type="button"
            onClick={toggleCollapse}
            className="p-1 rounded-lg text-slate-400 hover:text-[#0A2540] hover:bg-slate-100 transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-4.5 w-4.5 text-blue-600" />
            ) : (
              <PanelLeftClose className="h-4.5 w-4.5" />
            )}
          </button>
        </div>

      </div>

      {/* Middle Links (Comfortable top margin and item spacing) */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pt-3 sm:pt-3.5 pb-2 space-y-1.5 pr-0.5 [scrollbar-width:thin]">
        <nav className="space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            
            // Dynamic multi-route active detection
            let isActive = false;
            if (item.href === '/recruiter/dashboard') {
              isActive = pathname === '/recruiter/dashboard' || pathname === '/recruiter';
            } else if (item.href === '/recruiter/colleges') {
              isActive = pathname === '/recruiter/colleges' || pathname.startsWith('/recruiter/colleges');
            } else if (!item.href.includes('#')) {
              isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`relative group flex items-center rounded-xl transition-all duration-200 cursor-pointer ${
                  isCollapsed
                    ? 'justify-center p-2'
                    : 'justify-between px-2.5 py-2'
                } ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/90 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0A2540] border border-transparent'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full bg-blue-600" />
                )}

                <div className={`flex items-center gap-2.5 ${isCollapsed ? 'justify-center relative' : ''}`}>
                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-blue-600' : item.color
                    }`}
                  />

                  {isCollapsed && item.badge !== null && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
                  )}

                  {!isCollapsed && (
                    <span className="text-xs font-semibold tracking-tight truncate">{item.label}</span>
                  )}
                </div>

                {!isCollapsed && item.badge !== null && item.badge > 0 && (
                  <span
                    className={`rounded-md px-1.5 py-0.2 text-[10px] font-black border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Sign Out Action */}
      <div className="shrink-0 pt-2.5 border-t border-slate-100">
        <button
          onClick={async () => {
            setIsLoggingOut(true);
            await logout();
          }}
          disabled={isLoggingOut}
          className={`w-full group relative flex items-center rounded-xl p-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50/50 hover:bg-red-50 border border-red-100/80 hover:border-red-200 transition-all duration-200 cursor-pointer shadow-2xs ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          <div className={`flex items-center gap-2.5 ${isCollapsed ? 'justify-center' : ''}`}>
            {isLoggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin text-red-600 shrink-0" />
            ) : (
              <LogOut className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform duration-200 shrink-0" />
            )}
            {!isCollapsed && (
              <span className="font-extrabold tracking-tight truncate">
                {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
              </span>
            )}
          </div>
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`shrink-0 border-r border-slate-200 bg-white hidden md:flex flex-col h-full overflow-hidden shadow-xs transition-all duration-300 ease-in-out z-20 ${
          isCollapsed ? 'w-16' : 'w-56 xl:w-60'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Fluid Slide-Over Drawer (Smooth entry and exit transitions) */}
      <div
        className={`fixed inset-0 z-[100] flex md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Smooth Backdrop Fade */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Tactile Sliding Drawer (Slides out and slides back in with smooth cubic ease) */}
        <div
          className={`relative w-64 max-w-[85vw] bg-white h-full shadow-2xl z-10 flex flex-col transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
}
