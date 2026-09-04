'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  LayoutDashboard, 
  Building2, 
  CheckCircle2, 
  Briefcase, 
  ScrollText, 
  TrendingUp,
  GraduationCap,
  UserCheck,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  LogOut,
  Loader2
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();
  const { 
    pendingColleges, 
    verifiedColleges, 
    kpis,
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

  // Industry-standard keyboard shortcut (Ctrl+B / Cmd+B) to toggle sidebar
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
      label: 'Placement Pulse',
      shortLabel: 'Pulse',
      icon: LayoutDashboard,
      badge: null,
      color: 'text-[#2563EB]',
    },
    {
      href: '/admin/verify-colleges',
      label: 'Accreditation Queue',
      shortLabel: 'Accredit',
      icon: GraduationCap,
      badge: pendingColleges.length,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 font-extrabold',
      color: 'text-amber-600',
    },
    {
      href: '/admin/colleges',
      label: 'Verified Universities',
      shortLabel: 'Universities',
      icon: CheckCircle2,
      badge: verifiedColleges.length,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-extrabold',
      color: 'text-emerald-600',
    },
    {
      href: '/admin/companies',
      label: 'Corporate Partners',
      shortLabel: 'Companies',
      icon: Building2,
      badge: kpis?.verifiedCompaniesCount || 0,
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 font-extrabold',
      color: 'text-purple-600',
    },
    {
      href: '/admin/recruiters',
      label: 'Manage Recruiters',
      shortLabel: 'Recruiters',
      icon: UserCheck,
      badge: null,
      color: 'text-indigo-600',
    },
    {
      href: '/admin/drives',
      label: 'Campus Drives',
      shortLabel: 'Drives',
      icon: Briefcase,
      badge: kpis?.activePlacementDrives || 0,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 font-extrabold',
      color: 'text-blue-600',
    },
    {
      href: '/admin/analytics',
      label: 'Placement Analytics',
      shortLabel: 'Analytics',
      icon: TrendingUp,
      badge: null,
      color: 'text-emerald-600',
    },
    {
      href: '/admin/audit',
      label: 'Audit & Governance',
      shortLabel: 'Audit',
      icon: ScrollText,
      badge: null,
      color: 'text-indigo-600',
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full min-h-0 pt-3 sm:pt-4 px-3 pb-3 select-none transition-all duration-300">
      
      {/* Top: Section Header & Collapse/Close Controls */}
      <div className="shrink-0 pb-2.5 sm:pb-3 border-b border-slate-100">
        
        {/* Mobile Header: Logo & Close Button */}
        <div className="flex md:hidden items-center justify-between gap-2 pb-1.5">
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
            <span className="rounded bg-amber-50 px-1 py-0.2 text-[8.5px] font-black text-amber-800 border border-amber-200">
              ADMIN
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
        <div className={`hidden md:flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between px-1'}`}>
          {!isSidebarCollapsed && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Institutional Navigation
            </p>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleSidebar();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-[#0A2540] hover:bg-slate-100 transition-colors cursor-pointer"
            title={isSidebarCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="h-4.5 w-4.5 text-[#2563EB]" />
            ) : (
              <PanelLeftClose className="h-4.5 w-4.5" />
            )}
          </button>
        </div>

      </div>

      {/* Middle: Independently Scrollable Navigation Links (Smooth scrolling on all screen heights) */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pt-2.5 sm:pt-3 pb-2 space-y-1 pr-0.5 [-ms-overflow-style:none] [scrollbar-width:thin]">
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
                    ? 'justify-center p-2'
                    : 'justify-between px-2.5 py-2'
                } ${
                  isActive
                    ? 'bg-blue-50 text-[#2563EB] border border-blue-200/90 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0A2540] border border-transparent'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full bg-[#2563EB]" />
                )}

                <div className={`flex items-center gap-2.5 ${isSidebarCollapsed ? 'justify-center relative' : ''}`}>
                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-[#2563EB]' : item.color
                    }`}
                  />

                  {/* Collapsed Mode Badge Dot */}
                  {isSidebarCollapsed && item.badge !== null && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-[#FBAB23] ring-2 ring-white" />
                  )}

                  {!isSidebarCollapsed && (
                    <span className="text-xs font-semibold tracking-tight truncate">{item.label}</span>
                  )}
                </div>

                {!isSidebarCollapsed && item.badge !== null && item.badge > 0 && (
                  <span
                    className={`rounded-md px-1.5 py-0.2 text-[10px] font-black border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Industry Standard Floating Tooltip on Collapsed Hover */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-2.5 px-2.5 py-1 rounded-lg bg-[#0A2540] text-white text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 shadow-lg z-50 flex items-center gap-1.5">
                    <span>{item.label}</span>
                    {item.badge !== null && item.badge > 0 && (
                      <span className="rounded bg-white/20 px-1 py-0.2 text-[9px] font-black text-amber-300">
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

      {/* Bottom: Professional Sign Out / Logout Action */}
      <div className="shrink-0 pt-2.5 border-t border-slate-100">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full group relative flex items-center rounded-xl p-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50/50 hover:bg-red-50 border border-red-100/80 hover:border-red-200 transition-all duration-200 cursor-pointer shadow-2xs ${
            isSidebarCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          <div className={`flex items-center gap-2.5 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            {isLoggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin text-red-600 shrink-0" />
            ) : (
              <LogOut className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform duration-200 shrink-0" />
            )}
            {!isSidebarCollapsed && (
              <span className="font-extrabold tracking-tight truncate">
                {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
              </span>
            )}
          </div>

          {!isSidebarCollapsed && !isLoggingOut && (
            <span className="text-[9px] font-mono text-red-400 group-hover:text-red-600 uppercase font-black tracking-wider">
              Exit
            </span>
          )}

          {/* Collapsed Tooltip for Logout */}
          {isSidebarCollapsed && (
            <div className="absolute left-full ml-2.5 px-2.5 py-1 rounded-lg bg-red-600 text-white text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 shadow-lg z-50">
              Sign Out
            </div>
          )}
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* 1. Desktop Persistent Collapsible Sidebar (Fixed in viewport, sleek compact width) */}
      <aside
        className={`shrink-0 border-r border-slate-200 bg-white hidden md:flex flex-col h-full overflow-hidden shadow-xs transition-all duration-300 ease-in-out z-20 ${
          isSidebarCollapsed ? 'w-16' : 'w-56 xl:w-60'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* 2. Mobile Responsive Slide-Over Drawer with Smooth Entry & Exit Animations */}
      <div
        className={`fixed inset-0 z-[100] flex md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Smooth Backdrop Fade */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
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

