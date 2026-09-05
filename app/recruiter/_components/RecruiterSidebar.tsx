'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/store/useUIStore';
import { 
  LayoutDashboard, 
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
  X,
  Sparkles
} from 'lucide-react';

export function RecruiterSidebar() {
  const pathname = usePathname();
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();

  const isCurrentActive = (href: string) => {
    if (href === '/recruiter/dashboard') {
      return pathname === '/recruiter' || pathname === '/recruiter/dashboard';
    }
    return pathname.startsWith(href);
  };

  const navItems = [
    { label: 'Dashboard', href: '/recruiter/dashboard', icon: LayoutDashboard },
    { label: 'My Jobs', href: '/recruiter/jobs', icon: Briefcase },
    { label: 'Candidates', href: '/recruiter/dashboard#applications', icon: Users },
    { label: 'Applications', href: '/recruiter/dashboard#applications', icon: FileText },
    { label: 'Interviews', href: '/recruiter/drives', icon: Calendar },
    { label: 'Offers', href: '/recruiter/dashboard#offers', icon: Award },
    { label: 'Campus Drives', href: '/recruiter/drives', icon: Building2 },
    { label: 'Analytics', href: '/recruiter/analytics', icon: BarChart2 },
    { label: 'Company Profile', href: '/recruiter/company', icon: Building },
    { label: 'Team Members', href: '/recruiter/team', icon: UserCheck },
    { label: 'Notifications', href: '/recruiter/notifications', icon: Bell, badge: 3 },
    { label: 'Settings', href: '/recruiter/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-55 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container (Fixed Drawer on Mobile/Tablet, Fixed on Desktop) */}
      <aside
        className={`fixed top-0 left-0 z-60 h-screen w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top: Logo Branding */}
        <div>
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <Link 
              href="/recruiter/dashboard" 
              className="flex items-center gap-2.5 group cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#0A2540] to-[#2563EB] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-base font-black tracking-tight text-[#0A2540] font-heading">
                    CampusHire
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Recruiter Portal
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              title="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)] [scrollbar-width:thin]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isCurrentActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
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

        {/* Bottom Section: Need Help Card */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/40">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50/40 to-sky-50 border border-blue-100/80 space-y-2 text-center">
            <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xs">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">
                Need Help?
              </p>
              <p className="text-[10.5px] font-medium text-slate-500 mt-0.5">
                Our team is here to assist you.
              </p>
            </div>
            <a
              href="mailto:support@campushire.in"
              className="block w-full py-1.5 px-3 rounded-xl bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 text-[11px] font-bold shadow-2xs transition-all text-center"
            >
              Contact Support
            </a>
          </div>
        </div>

      </aside>
    </>
  );
}
