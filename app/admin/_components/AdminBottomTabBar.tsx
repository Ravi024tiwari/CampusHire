'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Briefcase, 
  MoreHorizontal 
} from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';

export function AdminBottomTabBar() {
  const pathname = usePathname();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useAdminStore();

  const navTabs = [
    {
      label: 'Home',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      isActive: pathname === '/admin/dashboard' || pathname === '/admin',
    },
    {
      label: 'Students',
      href: '/admin/students',
      icon: Users,
      isActive: pathname.startsWith('/admin/students'),
    },
    {
      label: 'Recruiters',
      href: '/admin/recruiters',
      icon: UserCheck,
      isActive: pathname.startsWith('/admin/recruiters') || pathname.startsWith('/admin/companies'),
    },
    {
      label: 'Jobs',
      href: '/admin/jobs',
      icon: Briefcase,
      isActive: pathname.startsWith('/admin/jobs'),
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
                ? 'text-[#0D8B8A] font-bold scale-105'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <div className={`p-1 rounded-lg ${tab.isActive ? 'bg-teal-50 text-[#0D8B8A]' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
          </Link>
        );
      })}

      {/* More / Menu Drawer Trigger (Opens the complete mobile sidebar drawer to see all other links) */}
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
          isMobileMenuOpen
            ? 'text-[#0D8B8A] font-bold scale-105'
            : 'text-slate-500 hover:text-slate-800 font-medium'
        }`}
      >
        <div className={`p-1 rounded-lg ${isMobileMenuOpen ? 'bg-teal-50 text-[#0D8B8A]' : ''}`}>
          <MoreHorizontal className="w-5 h-5" />
        </div>
        <span className="text-[10px] tracking-tight mt-0.5">More</span>
      </button>
    </nav>
  );
}
