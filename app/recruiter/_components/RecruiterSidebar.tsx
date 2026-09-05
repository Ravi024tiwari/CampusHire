'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/store/useUIStore';
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
  UserCheck, 
  Bell, 
  Settings, 
  HelpCircle, 
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Mail,
  PlusCircle,
  ShieldCheck,
  Sparkles
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

  const isCurrentActive = (href: string) => {
    if (href === '/recruiter/dashboard') {
      return pathname === '/recruiter' || pathname === '/recruiter/dashboard';
    }
    if (href === '/recruiter/colleges') {
      return pathname.startsWith('/recruiter/colleges');
    }
    if (href === '/recruiter/drives') {
      return pathname.startsWith('/recruiter/drives');
    }
    if (href === '/recruiter/jobs') {
      return pathname === '/recruiter/jobs' || pathname.startsWith('/recruiter/jobs/');
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
      label: 'Campus Drives', 
      href: '/recruiter/drives', 
      icon: Calendar,
      badge: null
    },
    { 
      label: 'Job Postings', 
      href: '/recruiter/jobs', 
      icon: Briefcase,
      badge: null
    },
    { 
      label: 'Candidates', 
      href: '/recruiter/dashboard#applications', 
      icon: Users,
      badge: null
    },
    { 
      label: 'Applications', 
      href: '/recruiter/dashboard#applications', 
      icon: FileText,
      badge: null
    },
    { 
      label: 'Interviews', 
      href: '/recruiter/drives', 
      icon: Calendar,
      badge: null
    },
    { 
      label: 'Offers', 
      href: '/recruiter/dashboard#offers', 
      icon: Award,
      badge: null
    },
    { 
      label: 'Analytics', 
      href: '/recruiter/dashboard#trends', 
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
      label: 'Team Members', 
      href: '/recruiter/team', 
      icon: UserCheck,
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

  const sidebarContent = (isCollapsedMode: boolean, isMobile: boolean) => (
    <div className="flex flex-col h-full justify-between select-none">
      
      {/* Top Header & Navigation Links */}
      <div className="flex flex-col min-h-0">
        
        {/* Section Header & Collapse Toggle */}
        <div className={`flex items-center border-b border-slate-100 transition-all duration-300 ${
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

        {/* Quick Post Job CTA Button in Sidebar (When Expanded) */}
        {!isCollapsedMode && !isMobile && (
          <div className="p-2.5 pb-0">
            <Link
              href="/recruiter/jobs/create"
              className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Job</span>
            </Link>
          </div>
        )}

        {/* Navigation Links List */}
        <nav className={`p-2.5 space-y-1 overflow-y-auto flex-1 ${
          isCollapsedMode ? 'max-h-[calc(100vh-160px)]' : 'max-h-[calc(100vh-270px)]'
        } [scrollbar-width:thin]`}>
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

      {/* Bottom Section: Support Card (Expanded) or Help Icon (Collapsed) */}
      <div className={`border-t border-slate-100 transition-all duration-300 ${
        isCollapsedMode ? 'p-2.5 bg-slate-50/50 flex justify-center' : 'p-3 bg-slate-50/40'
      }`}>
        {isCollapsedMode ? (
          <Link
            href="/recruiter/drives"
            className="group relative p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-2xs cursor-pointer"
            title="Partner with top tier colleges - Post Drive"
            aria-label="Partner with top tier colleges"
          >
            <ShieldCheck className="w-5 h-5 text-blue-600 group-hover:text-white" />
            
            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-[#0A2540] text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 shadow-xl z-50 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Partner with Colleges</span>
            </div>
          </Link>
        ) : (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-sky-50 border border-blue-100/90 space-y-2.5 text-center">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 leading-tight font-heading">
                Partner with top tier colleges India
              </p>
              <p className="text-[10px] font-medium text-slate-500 mt-0.5 leading-tight">
                Connect, recruit and build the future.
              </p>
            </div>
            <Link
              href="/recruiter/drives"
              className="block w-full py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-extrabold shadow-xs hover:shadow-md transition-all text-center active:scale-98"
            >
              Post a New Drive
            </Link>
          </div>
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
