'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  GraduationCap,
  Briefcase, 
  Calendar, 
  MoreHorizontal 
} from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

export function RecruiterBottomNav() {
  const pathname = usePathname();
  const { setMobileMenuOpen } = useUIStore();

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
    return pathname.startsWith(href);
  };

  const navTabs = [
    { label: 'Home', href: '/recruiter/dashboard', icon: Home },
    { label: 'Colleges', href: '/recruiter/colleges', icon: GraduationCap },
    { label: 'Interviews', href: '/recruiter/interviews', icon: Calendar },
    { label: 'Jobs', href: '/recruiter/jobs', icon: Briefcase },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 pt-2 pb-[calc(env(safe-area-inset-bottom,0px)+0.6rem)] px-3 sm:px-6 lg:hidden shadow-[0_-4px_25px_rgba(0,0,0,0.08)] transition-all">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const active = isCurrentActive(tab.href);

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-[10.5px] font-bold transition-all cursor-pointer active:scale-95 ${
                active
                  ? 'text-blue-600 font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/25 ring-2 ring-blue-500/20'
                    : 'text-slate-500'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
              </div>
              <span className="mt-1 leading-tight">{tab.label}</span>
            </Link>
          );
        })}

        {/* More Tab - Opens Full Recruiter Sidebar Drawer */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMobileMenuOpen(true);
          }}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-[10.5px] font-bold text-slate-500 hover:text-slate-800 transition-all cursor-pointer active:scale-95 touch-manipulation select-none"
          title="Open Navigation Menu"
          aria-label="Open Navigation Menu"
        >
          <div className="p-1.5 rounded-xl text-slate-500">
            <MoreHorizontal className="w-4.5 h-4.5" />
          </div>
          <span className="mt-1 leading-tight">More</span>
        </button>
      </div>
    </nav>
  );
}
