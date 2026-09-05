'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Search,
  User, 
  FileText, 
  Briefcase, 
  Calendar, 
  Award, 
  GraduationCap, 
  Bell, 
  BookOpen, 
  Settings,
  Sparkles,
  X,
  FileCheck
} from 'lucide-react';
import { useStudentDashboardStore } from '@/store/useStudentDashboardStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number | string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
  { label: 'Browse Jobs', href: '/student/jobs', icon: Search },
  { label: 'My Profile', href: '/student/profile', icon: User },
  { label: 'Resume', href: '/student/resume', icon: FileText },
  { label: 'Applied Jobs', href: '/student/applications', icon: FileCheck },
  { label: 'Interviews', href: '/student/interviews', icon: Calendar },
  { label: 'Offers', href: '/student/offers', icon: Award },
  { label: 'Skill Assessment', href: '/student/assessments', icon: GraduationCap },
  { label: 'Notifications', href: '/student/notifications', icon: Bell, badge: 3 },
  { label: 'Resources', href: '/student/resources', icon: BookOpen },
  { label: 'Settings', href: '/student/settings', icon: Settings },
];

export function StudentSidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { data, isMobileSidebarOpen, setMobileSidebarOpen } = useStudentDashboardStore();

  const studentName = user?.name || data?.student?.name || 'Ravi Tiwari';
  const studentSubtitle = data?.student?.subtitle || 'B.Tech CSE (2026)';
  const avatarUrl = user?.avatarUrl || data?.student?.avatarUrl;
  const initialChar = studentName.trim().charAt(0).toUpperCase() || 'S';

  const isCurrentActive = (href: string) => {
    if (href === '/student/dashboard') {
      return pathname === '/student' || pathname === '/student/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-55 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMobileSidebarOpen(false);
          }}
        />
      )}

      {/* Sidebar Container (Fixed on Desktop, Drawer on Mobile) */}
      <aside
        className={`fixed top-0 left-0 z-60 h-screen w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top: Logo Branding */}
        <div>
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <Link 
              href="/student/dashboard" 
              className="flex items-center gap-2.5 group cursor-pointer"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#0A2540] to-[#2563EB] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-base font-black tracking-tight text-[#0A2540] font-heading">
                    CampusHire
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Student Portal
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              title="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)] [scrollbar-width:thin]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isCurrentActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-600/25'
                      : 'text-slate-600 hover:text-[#0A2540] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`h-5 w-5 rounded-full flex items-center justify-center text-[10.5px] font-black ${
                        active
                          ? 'bg-white text-blue-600'
                          : 'bg-rose-500 text-white shadow-2xs'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Circular Profile Pill + Motivation Card */}
        <div className="p-3.5 border-t border-slate-100 space-y-2.5 bg-slate-50/40">
          
          {/* Quick Profile Link with Circular Avatar */}
          <Link
            href="/student/profile"
            onClick={() => setMobileSidebarOpen(false)}
            className="flex items-center gap-2.5 p-2 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="relative shrink-0">
              <Avatar size="sm" className="h-8 w-8 border border-blue-200/90 shadow-2xs">
                {avatarUrl && (
                  <AvatarImage
                    src={avatarUrl}
                    alt={studentName}
                    className="object-cover rounded-full"
                  />
                )}
                <AvatarFallback className="bg-gradient-to-tr from-[#0A2540] to-[#2563EB] text-white font-extrabold text-[11px]">
                  {initialChar}
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-black text-[#0A2540] truncate leading-tight group-hover:text-blue-600 transition-colors">
                {studentName}
              </p>
              <p className="text-[10px] font-medium text-slate-400 truncate">
                {studentSubtitle}
              </p>
            </div>
          </Link>

          {/* Motivation Tagline */}
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-sky-50/80 border border-blue-100/70 text-center">
            <p className="text-[11px] font-extrabold text-[#0A2540] leading-tight">
              Build your future 🇮🇳
            </p>
            <p className="text-[9.5px] font-semibold text-slate-500 mt-0.5">
              Campus to Corporate Career
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

