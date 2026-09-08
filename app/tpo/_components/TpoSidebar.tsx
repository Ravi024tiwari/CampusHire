'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTpoStore } from '@/store/useTpoStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Building2, 
  FileText, 
  Calendar, 
  Award, 
  BarChart2, 
  UserCheck, 
  Bell, 
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Sparkles,
  School
} from 'lucide-react';

export function TpoSidebar() {
  const pathname = usePathname();
  const { 
    isSidebarCollapsed, 
    toggleSidebar, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen, 
    dashboardData 
  } = useTpoStore();

  const collegeName = dashboardData?.college?.name || 'Delhi Technological University';
  const collegeCode = dashboardData?.college?.code || 'DTU';
  const campusImage = dashboardData?.college?.images?.[0] || 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80';

  const navLinks = [
    {
      href: '/tpo/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/tpo/students',
      label: 'Students',
      icon: Users,
    },
    {
      href: '/tpo/placements',
      label: 'Placements',
      icon: GraduationCap,
    },
    {
      href: '/tpo/jobs',
      label: 'Job Opportunities',
      icon: Briefcase,
    },
    {
      href: '/tpo/recruiters',
      label: 'Recruiters',
      icon: Building2,
    },
    {
      href: '/tpo/applications',
      label: 'Applications',
      icon: FileText,
    },
    {
      href: '/tpo/interviews',
      label: 'Interviews',
      icon: Calendar,
    },
    {
      href: '/tpo/offers',
      label: 'Offers',
      icon: Award,
    },
    {
      href: '/tpo/analytics',
      label: 'Analytics',
      icon: BarChart2,
    },
    {
      href: '/tpo/college',
      label: 'College Profile',
      icon: School,
    },
    {
      href: '/tpo/team',
      label: 'Team Members',
      icon: UserCheck,
    },
    {
      href: '/tpo/notifications',
      label: 'Notifications',
      icon: Bell,
      badge: '3',
    },
    {
      href: '/tpo/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  const sidebarBody = (
    <div className="flex flex-col h-full min-h-0 pt-4 sm:pt-6 lg:pt-7 px-3 sm:px-3.5 pb-4 select-none transition-all duration-300">
      
      {/* Top Controls */}
      <div className="shrink-0 pb-3 mb-2 border-b border-slate-100 flex items-center justify-between px-1">
        
        {/* Mobile Header: Logo & Close Button */}
        <div className="flex md:hidden items-center justify-between w-full">
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
            <span className="rounded bg-blue-50 px-1.5 py-0.2 text-[8.5px] font-black text-blue-800 border border-blue-200">
              COLLEGE
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-[#0A2540] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Desktop Header */}
        {!isSidebarCollapsed && (
          <p className="hidden md:block text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400 font-heading">
            Campus Placement Cell
          </p>
        )}

        <button
          type="button"
          onClick={toggleSidebar}
          className="hidden md:flex p-1.5 rounded-xl text-slate-400 hover:text-[#0A2540] hover:bg-slate-100 transition-colors cursor-pointer"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="h-4 w-4 text-blue-600" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav Links List */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pt-1 pb-2 space-y-1 pr-0.5 [scrollbar-width:thin]">
        <nav className="space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/tpo/dashboard'
                ? pathname === '/tpo/dashboard' || pathname === '/tpo'
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
                    ? 'bg-blue-600 text-white font-black shadow-sm shadow-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0A2540] font-semibold'
                }`}
              >
                <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center relative' : ''}`}>
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {item.badge && !isSidebarCollapsed && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-600 border border-rose-200'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {/* Tooltip on Collapsed Mode */}
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

      {/* Bottom Campus Identity Card */}
      {!isSidebarCollapsed && (
        <div className="shrink-0 pt-2 border-t border-slate-100">
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50 overflow-hidden shadow-2xs space-y-2">
            {/* Campus Photo */}
            <div className="h-20 w-full relative overflow-hidden">
              <img
                src={campusImage}
                alt={collegeName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              <div className="absolute bottom-1.5 left-2 text-white">
                <p className="text-[11px] font-extrabold truncate font-heading">{collegeName}</p>
                <p className="text-[9.5px] font-bold text-blue-200">{collegeCode}</p>
              </div>
            </div>

            {/* Quote Tagline */}
            <div className="p-2.5 pt-0 text-center">
              <p className="text-[9.5px] font-bold text-slate-600 italic leading-snug">
                &ldquo;Empowering Students for a Brighter Future&rdquo;
              </p>
              <div className="flex items-center justify-center gap-1 mt-1.5">
                <span className="w-5 h-0.5 rounded-full bg-blue-600" />
                <span className="w-3 h-0.5 rounded-full bg-amber-500" />
                <span className="w-1 h-0.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`shrink-0 border-r border-slate-200/90 bg-white hidden md:flex flex-col h-full overflow-hidden shadow-xs transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-20 ${
          isSidebarCollapsed ? 'w-18' : 'w-56 xl:w-60'
        }`}
      >
        {sidebarBody}
      </aside>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[100] flex md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`relative w-64 max-w-[85vw] bg-white h-full shadow-2xl z-10 flex flex-col transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarBody}
        </div>
      </div>
    </>
  );
}
