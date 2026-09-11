'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/BrandLogo';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Placements', href: '#placement-insights', id: 'placement-insights' },
  { label: 'Colleges', href: '#colleges-kpis', id: 'colleges-kpis' },
  { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
  { label: 'Capabilities', href: '#features', id: 'features' },
  { label: 'Wall of Love', href: '#reviews', id: 'reviews' },
  { label: 'Portals', href: '#stakeholders', id: 'stakeholders' }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  // Active section scroll spy
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      setIsScrolled(window.scrollY > 20);

      const sectionElements = NAV_ITEMS.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(item => item.element !== null);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.element) {
          const top = item.element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            return;
          }
        }
      }

      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await logout();
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'SUPER_ADMIN':
        return '/admin/dashboard';
      case 'STUDENT':
        return '/student/dashboard';
      case 'RECRUITER':
        return '/recruiter/dashboard';
      case 'TPO_ADMIN':
        return '/tpo/dashboard';
      default:
        return '/';
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/' && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setActiveSection(targetId);
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(10,37,64,0.06)] border-b border-slate-200/90' 
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/60'
      }`}
    >
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo (Positioned neatly on the left) */}
        <div className="flex-shrink-0 flex items-center">
          <BrandLogo size="md" />
        </div>

        {/* Desktop Navigation Links with Live Dynamic Blue Scroll Spy Highlight */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`/${item.href}`}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/90 shadow-2xs font-bold'
                    : 'text-[#475569] hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-blue-600" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link
                href={getDashboardLink()}
                className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 transition-colors border border-slate-200"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0A2540] to-[#2563EB] text-white text-xs font-bold flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-[#0A2540] leading-tight max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <span className="text-[9px] font-semibold font-mono text-blue-600 uppercase">
                    {user.role === 'STUDENT'
                      ? 'Student'
                      : user.role === 'RECRUITER'
                      ? 'Recruiter'
                      : user.role === 'TPO_ADMIN'
                      ? 'College TPO'
                      : 'Super Admin'}
                  </span>
                </div>
              </Link>
              <Link
                href={getDashboardLink()}
                className="btn-primary text-xs sm:text-sm px-4 py-2 shadow-sm"
              >
                Dashboard →
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors px-2 py-1 cursor-pointer"
                title="Sign Out"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="btn-secondary text-xs sm:text-sm px-3.5 sm:px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="btn-primary text-xs sm:text-sm px-4 sm:px-5 py-2.5 shadow-md shadow-blue-500/20"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile & Tablet Right Actions & Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
          {isAuthenticated && user ? (
            <Link
              href={getDashboardLink()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-500/30"
            >
              <div className="w-4 h-4 rounded-full bg-white/20 text-[10px] font-extrabold flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span>Dashboard</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 active:scale-95 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="hidden xs:inline-flex items-center justify-center px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-sm shadow-blue-500/25"
              >
                Register
              </Link>
            </div>
          )}
          
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 sm:p-2.5 rounded-xl text-slate-700 bg-slate-100/80 hover:bg-slate-200 border border-slate-200 focus:outline-none transition-all active:scale-95 cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile & iPad Drawer (With Synchronized ScrollSpy Active Blue Links) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 sm:top-20 z-40 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-b border-[#E2E8F0] px-4 sm:px-8 pt-4 pb-8 space-y-4 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto">
            
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`/${item.href}`}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'text-blue-600 bg-blue-50/90 font-bold border border-blue-200/80 shadow-2xs'
                        : 'text-[#1E293B] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={isActive ? 'text-blue-600 font-bold' : 'text-slate-400'}>→</span>
                  </a>
                );
              })}
            </div>

            {/* Role Quick Links on iPad/Mobile */}
            <div className="pt-3 border-t border-[#F1F5F9]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] px-3 mb-2">
                Portals & Access
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/register?role=STUDENT"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-left hover:border-blue-300 transition-colors"
                >
                  <span className="text-lg block mb-1">🎓</span>
                  <span className="text-xs font-bold text-[#0A2540] block">Student Portal</span>
                  <span className="text-[10px] text-[#64748B]">Jobs & Resume</span>
                </Link>
                <Link
                  href="/register?role=RECRUITER"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-left hover:border-blue-300 transition-colors"
                >
                  <span className="text-lg block mb-1">🏢</span>
                  <span className="text-xs font-bold text-[#0A2540] block">Recruiter Studio</span>
                  <span className="text-[10px] text-[#64748B]">Campus Drives</span>
                </Link>
              </div>
            </div>

            {/* Auth Actions in Drawer */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-secondary w-full text-center py-3"
              >
                Sign In to Account
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center py-3 shadow-md shadow-blue-500/20"
              >
                Get Started Free →
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
