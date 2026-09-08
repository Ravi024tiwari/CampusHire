'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Building2,
  FileText, 
  MoreHorizontal 
} from 'lucide-react';
import { useTpoStore } from '@/store/useTpoStore';

export function TpoBottomNav() {
  const pathname = usePathname();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useTpoStore();

  const navTabs = [
    {
      label: 'Home',
      href: '/tpo/dashboard',
      icon: LayoutDashboard,
      isActive: pathname === '/tpo/dashboard' || pathname === '/tpo',
    },
    {
      label: 'Students',
      href: '/tpo/students',
      icon: Users,
      isActive: pathname.startsWith('/tpo/students'),
    },
    {
      label: 'Jobs',
      href: '/tpo/jobs',
      icon: Briefcase,
      isActive: pathname.startsWith('/tpo/jobs'),
    },
    {
      label: 'Companies',
      href: '/tpo/companies',
      icon: Building2,
      isActive: pathname.startsWith('/tpo/companies') || pathname.startsWith('/tpo/recruiters'),
    },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation" 
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1 flex items-center justify-around safe-area-pb"
    >
      {navTabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 ${
              tab.isActive
                ? 'text-blue-600 font-bold scale-105'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <div className={`p-1 rounded-lg ${tab.isActive ? 'bg-blue-50 text-blue-600' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
          </Link>
        );
      })}

      {/* More / Menu Drawer Trigger */}
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
          isMobileMenuOpen
            ? 'text-blue-600 font-bold scale-105'
            : 'text-slate-500 hover:text-slate-800 font-medium'
        }`}
      >
        <div className={`p-1 rounded-lg ${isMobileMenuOpen ? 'bg-blue-50 text-blue-600' : ''}`}>
          <MoreHorizontal className="w-5 h-5" />
        </div>
        <span className="text-[10px] tracking-tight mt-0.5">More</span>
      </button>
    </nav>
  );
}
