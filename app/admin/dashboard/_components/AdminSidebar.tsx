'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Building2, 
  Briefcase, 
  FileText, 
  Award, 
  Calendar, 
  GraduationCap, 
  BarChart2, 
  Layers, 
  ScrollText, 
  UserCog, 
  Settings, 
  Headphones, 
  Sparkles, 
  PanelLeftClose, 
  PanelLeftOpen, 
  X, 
  LogOut, 
  Loader2,
  ShieldCheck
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();
  const { 
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    toggleSidebar
  } = useAdminStore();

  const { logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Initialize sidebar collapsed state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('campushire_admin_sidebar_collapsed');
      if (saved !== null) {
        setIsSidebarCollapsed(JSON.parse(saved));
      }
    } catch (err) {
      console.error('[AdminSidebar] Error reading saved state:', err);
    }
  }, [setIsSidebarCollapsed]);

  // Keyboard shortcut (Ctrl+B / Cmd+B) to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  const navLinks = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/admin/colleges',
      label: 'Colleges',
      icon: Building2,
    },
    {
      href: '/admin/verify-colleges',
      label: 'Verification Queue',
      icon: ShieldCheck,
    },
    {
      href: '/admin/recruiters',
      label: 'Recruiters & Companies',
      icon: UserCheck,
    },
    {
      href: '/admin/students',
      label: 'Students Directory',
      icon: Users,
    },
    {
      href: '/admin/jobs',
      label: 'Placement Drives',
      icon: Briefcase,
    },
    {
      href: '/admin/analytics',
      label: 'National Analytics',
      icon: BarChart2,
    },
    {
      href: '/admin/audit',
      label: 'Security & Audit Trail',
      icon: ScrollText,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full min-h-0 pt-3 sm:pt-4 px-2.5 pb-3 select-none transition-all duration-300">
      
      {/* Top: Section Header & Collapse/Close Controls */}
      <div className="shrink-0 pb-2 border-b border-slate-100">
        
        {/* Mobile Header: Logo & Close Button */}
        <div className="flex md:hidden items-center justify-between gap-2 pb-1.5 px-1">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-slate-200/80 bg-white p-0.5 shrink-0 shadow-2xs">
              <img
                src="/images/campushire-emblem.png"
                alt="CampusHire Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-extrabold text-sm font-heading tracking-tight">
              <span className="text-[#0A2540]">Campus</span>
              <span className="text-[#FBAB23]">Hire</span>
            </span>
            <span className="rounded bg-teal-50 px-1.5 py-0.2 text-[8.5px] font-black text-teal-800 border border-teal-200">
              SUPER ADMIN
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-[#0A2540] hover:bg-slate-100 cursor-pointer border border-slate-200/70 shadow-2xs"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Desktop Header: Collapse Button & Section Label */}
        <div className={`hidden md:flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between px-1.5'}`}>
          {!isSidebarCollapsed && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">
              Admin Governance
            </p>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleSidebar();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-[#0A2540] hover:bg-slate-100 transition-colors cursor-pointer"
            title={isSidebarCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="h-4 w-4 text-[#0D8B8A]" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

      </div>

      {/* Middle: Independently Scrollable Navigation Links */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pt-2 pb-2 space-y-0.5 pr-0.5 [scrollbar-width:thin]">
        <nav className="space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin/dashboard'
                ? pathname === '/admin/dashboard' || pathname === '/admin'
                : pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative group flex items-center rounded-xl transition-all duration-200 cursor-pointer ${
                  isSidebarCollapsed
                    ? 'justify-center p-2.5'
                    : 'justify-between px-3 py-2 text-xs'
                } ${
                  isActive
                    ? 'bg-[#0D8B8A] text-white font-black shadow-sm shadow-teal-700/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0A2540] font-semibold'
                }`}
              >
                <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center relative' : ''}`}>
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />

                  {!isSidebarCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </div>

                {/* Floating Tooltip in Collapsed Mode */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-[#0A2540] text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 shadow-xl z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Widgets & Support */}
      <div className="shrink-0 pt-2 border-t border-slate-100 space-y-2">
        
        {/* Support Box (Expanded Mode) */}
        {!isSidebarCollapsed && (
          <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-50/90 via-emerald-50/40 to-sky-50 border border-teal-100/90 space-y-2 text-center">
            <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center mx-auto shadow-xs">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 leading-tight font-heading">
                Need Help?
              </p>
              <p className="text-[10px] font-medium text-slate-500 mt-0.5 leading-tight">
                Our team is here to assist you.
              </p>
            </div>
            <Link
              href="mailto:support@campushire.com"
              className="block w-full py-1.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-bold shadow-xs hover:shadow-md transition-all text-center"
            >
              Contact Support
            </Link>
          </div>
        )}

        {/* Branding Tagline (Expanded Mode) */}
        {!isSidebarCollapsed && (
          <div className="px-1 text-center">
            <p className="text-[10px] font-extrabold text-teal-800 uppercase tracking-widest flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Empowering Talent</span>
            </p>
            <p className="text-[9.5px] font-medium text-slate-400">
              Building Brighter Futures
            </p>
          </div>
        )}

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full flex items-center rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 border border-transparent hover:border-red-200 transition-colors cursor-pointer ${
            isSidebarCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
          }`}
          title="Sign Out Session"
        >
          <div className="flex items-center gap-2">
            {isLoggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin text-red-600" />
            ) : (
              <LogOut className="w-4 h-4 text-red-500" />
            )}
            {!isSidebarCollapsed && <span>{isLoggingOut ? 'Signing out...' : 'Sign Out'}</span>}
          </div>
          {!isSidebarCollapsed && (
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-100/60 text-red-700 uppercase">
              Exit
            </span>
          )}
        </button>

      </div>

    </div>
  );

  return (
    <>
      {/* 1. Desktop Collapsible Sidebar */}
      <aside
        className={`shrink-0 border-r border-slate-200/90 bg-white hidden md:flex flex-col h-full overflow-hidden shadow-xs transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-20 ${
          isSidebarCollapsed ? 'w-18' : 'w-56 xl:w-60'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* 2. Mobile & Tablet Slide-Over Drawer with Smooth Backdrop */}
      <div
        className={`fixed inset-0 z-[100] flex md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
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
          {sidebarContent}
        </div>
      </div>
    </>
  );
}
