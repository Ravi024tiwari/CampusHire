'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/store/useUIStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  GraduationCap,
  Briefcase, 
  Users, 
  FileText, 
  Calendar, 
  Award, 
  Building2, 
  BarChart2, 
  Building, 
  Bell, 
  Settings, 
  PanelLeftClose,
  PanelLeftOpen,
  X,
  LogOut,
  Loader2
} from 'lucide-react';

export function RecruiterSidebar() {
  const pathname = usePathname();
  const { 
    isMobileMenuOpen, 
    setMobileMenuOpen, 
    isRecruiterSidebarCollapsed, 
    setRecruiterSidebarCollapsed,
    toggleRecruiterSidebar 
  } = useUIStore();
  const { user, logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // 1. Initialize collapse state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('campushire_recruiter_sidebar_collapsed');
      if (saved !== null) {
        setRecruiterSidebarCollapsed(JSON.parse(saved));
      }
    } catch (err) {
      console.error('[RecruiterSidebar] Error reading stored state:', err);
    }
  }, [setRecruiterSidebarCollapsed]);

  // 2. Keyboard shortcut (Ctrl+B / Cmd+B) to toggle collapse
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        toggleRecruiterSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleRecruiterSidebar]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      if (isMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      await logout();
    } catch (err) {
      console.error('[RecruiterSidebar] Logout error:', err);
      setIsLoggingOut(false);
    }
  };

  const isCurrentActive = (href: string) => {
    if (href === '/recruiter/dashboard') {
      return pathname === '/recruiter' || pathname === '/recruiter/dashboard';
    }
    if (href === '/recruiter/colleges') {
      return pathname.startsWith('/recruiter/colleges');
    }
    if (href === '/recruiter/interviews' || href === '/recruiter/drives') {
      return pathname.startsWith('/recruiter/interviews') || pathname.startsWith('/recruiter/drives');
    }
    if (href === '/recruiter/jobs') {
      return pathname === '/recruiter/jobs' || pathname.startsWith('/recruiter/jobs/');
    }
    if (href === '/recruiter/applications') {
      return pathname === '/recruiter/applications' || pathname.startsWith('/recruiter/applications/');
    }
    return pathname.startsWith(href);
  };

  const navItems = [
    { 
      label: 'Dashboard', 
      href: '/recruiter/dashboard', 
      icon: LayoutDashboard,
      badge: null
    },
    { 
      label: 'Verified Colleges', 
      href: '/recruiter/colleges', 
      icon: GraduationCap,
      badge: 'Verified',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    { 
      label: 'Job Postings', 
      href: '/recruiter/jobs', 
      icon: Briefcase,
      badge: null
    },
    { 
      label: 'Applications', 
      href: '/recruiter/applications', 
      icon: FileText,
      badge: null
    },
    { 
      label: 'Interviews', 
      href: '/recruiter/interviews', 
      icon: Calendar,
      badge: null
    },
    { 
      label: 'Offers', 
      href: '/recruiter/offers', 
      icon: Award,
      badge: null
    },
    { 
      label: 'Analytics', 
      href: '/recruiter/analytics', 
      icon: BarChart2,
      badge: null
    },
    { 
      label: 'Company Profile', 
      href: '/recruiter/company', 
      icon: Building, 
      badge: null
    },
    { 
      label: 'Notifications', 
      href: '/recruiter/notifications', 
      icon: Bell, 
      badge: '3',
      badgeColor: 'bg-rose-500 text-white'
    },
    { 
      label: 'Settings', 
      href: '/recruiter/settings', 
      icon: Settings,
      badge: null
    },
  ];

  const initialChar = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'R';

  const sidebarContent = (isCollapsedMode: boolean, isMobile: boolean) => (
    <div className="flex flex-col h-full justify-between select-none">
      
      {/* Top Header & Navigation Links */}
      <div className="flex flex-col min-h-0 flex-1">
        
        {/* Section Header & Collapse Toggle */}
        <div className={`flex items-center border-b border-slate-100 transition-all duration-300 shrink-0 ${
          isCollapsedMode ? 'justify-center py-4 px-2' : 'justify-between px-4.5 py-4'
        }`}>
          {!isCollapsedMode ? (
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-blue-50 text-blue-600">
                <Building2 className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 font-heading">
                Hiring Menu
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={toggleRecruiterSidebar}
              className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200 cursor-pointer shadow-2xs"
              title="Expand Sidebar (Ctrl+B)"
              aria-label="Expand Sidebar"
            >
              <PanelLeftOpen className="w-4.5 h-4.5 text-blue-600" />
            </button>
          )}

          {/* Desktop Collapse Toggle Button (When Expanded) */}
          {!isMobile && !isCollapsedMode && (
            <button
              type="button"
              onClick={toggleRecruiterSidebar}
              className="p-1.5 rounded-xl text-slate-400 hover:text-[#0A2540] hover:bg-slate-100 transition-colors cursor-pointer"
              title="Collapse Sidebar (Ctrl+B)"
              aria-label="Collapse Sidebar"
            >
              <PanelLeftClose className="w-4.5 h-4.5" />
            </button>
          )}

          {/* Mobile Drawer Close Button */}
          {isMobile && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-[#0A2540] hover:bg-slate-100 cursor-pointer border border-slate-200/70 shadow-2xs"
              title="Close menu"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Links List */}
        <nav className="p-2.5 space-y-1 overflow-y-auto flex-1 [scrollbar-width:thin]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrentActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => isMobile && setMobileMenuOpen(false)}
                className={`relative group flex items-center rounded-xl transition-all duration-200 cursor-pointer ${
                  isCollapsedMode
                    ? 'justify-center p-2.5'
                    : 'justify-between px-3 py-2.5 text-xs'
                } ${
                  active
                    ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-600/25 font-bold'
                    : 'text-slate-600 hover:text-[#0A2540] hover:bg-slate-50 font-semibold'
                }`}
              >
                <div className={`flex items-center gap-3 ${isCollapsedMode ? 'justify-center relative' : ''}`}>
                  <Icon
                    className={`w-4.5 h-4.5 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                      active ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />

                  {/* Collapsed Mode Notification Dot */}
                  {isCollapsedMode && item.badge && (
                    <span className={`absolute -top-1 -right-1 flex h-2.5 w-2.5 rounded-full ring-2 ring-white ${
                      item.badge === 'Verified' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`} />
                  )}

                  {!isCollapsedMode && (
                    <span className="truncate">{item.label}</span>
                  )}
                </div>

                {!isCollapsedMode && item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                      active
                        ? 'bg-white text-blue-700'
                        : item.badgeColor || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Floating Tooltip in Collapsed Mode */}
                {isCollapsedMode && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-[#0A2540] text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 shadow-xl z-50 flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`rounded-md px-1.5 py-0.2 text-[9px] font-black ${
                        item.badge === 'Verified' ? 'bg-emerald-600 text-white' : 'bg-rose-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Profile Summary & Sign Out Action Button */}
      <div className={`border-t border-slate-200/80 bg-slate-50/60 shrink-0 transition-all duration-300 ${
        isCollapsedMode ? 'p-2 flex flex-col items-center gap-2' : 'p-3 space-y-2'
      }`}>
        {isCollapsedMode ? (
          /* Collapsed Mode: Icon-only Sign Out Button */
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="group relative p-2.5 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs border border-transparent hover:border-red-200"
            title="Sign Out Session"
            aria-label="Sign Out Session"
          >
            {isLoggingOut ? (
              <Loader2 className="w-4.5 h-4.5 text-red-600 animate-spin" />
            ) : (
              <LogOut className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
            )}

            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-[#0A2540] text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 shadow-xl z-50 flex items-center gap-1.5">
              <span className="text-red-400 font-black">●</span>
              <span>Sign Out Session</span>
            </div>
          </button>
        ) : (
          /* Expanded Mode: Recruiter Profile Snippet + Full Sign Out Button */
          <>
            {/* Recruiter Identity Snippet */}
            <div className="flex items-center gap-2.5 px-1 py-0.5">
              <div className="relative shrink-0">
                <Avatar size="sm" className="h-7.5 w-7.5 border border-slate-200 shadow-2xs">
                  {user?.avatarUrl && (
                    <AvatarImage
                      src={user.avatarUrl}
                      alt={user.name || 'Recruiter'}
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback className="bg-gradient-to-tr from-[#2563EB] to-indigo-700 text-white font-extrabold text-[10px]">
                    {initialChar}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-1.5 ring-white" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-[#0A2540] truncate leading-tight font-heading">
                  {user?.name || 'Recruiter'}
                </p>
                <p className="text-[10px] font-medium text-slate-400 truncate leading-tight">
                  {user?.email || 'recruiter@campushire.com'}
                </p>
              </div>
            </div>

            {/* Responsive Sign Out Button */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-red-600 bg-white hover:bg-red-50 hover:text-red-700 border border-slate-200/80 hover:border-red-200 shadow-2xs transition-all duration-200 cursor-pointer disabled:opacity-50 active:scale-98"
            >
              <div className="flex items-center gap-2">
                {isLoggingOut ? (
                  <Loader2 className="w-4 h-4 text-red-600 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                )}
                <span>{isLoggingOut ? 'Signing out...' : 'Sign Out'}</span>
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-red-100/60 text-red-700 uppercase">
                Exit
              </span>
            </button>
          </>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* 1. Desktop Collapsible Sidebar (Fluidly expands/collapses with cubic easing) */}
      <aside
        className={`shrink-0 border-r border-slate-200/90 bg-white hidden lg:flex flex-col h-full overflow-hidden shadow-xs transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-20 ${
          isRecruiterSidebarCollapsed ? 'w-18' : 'w-60 xl:w-64'
        }`}
      >
        {sidebarContent(isRecruiterSidebarCollapsed, false)}
      </aside>

      {/* 2. Mobile & Tablet Slide-Over Drawer with Smooth Backdrop */}
      <div
        className={`fixed inset-0 z-[100] flex lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Sliding Drawer Container */}
        <div
          className={`relative w-64 max-w-[85vw] bg-white h-full shadow-2xl z-10 flex flex-col transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent(false, true)}
        </div>
      </div>
    </>
  );
}
