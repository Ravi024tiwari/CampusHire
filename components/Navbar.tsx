'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/BrandLogo';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

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
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      dispatch(logout());
      window.location.href = '/login';
    }
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

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex-shrink-0">
          <BrandLogo size="md" />
        </div>

        {/* Desktop / Large Screen Navigation Links (Visible on 1024px+ / iPad Landscape+) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[14px] xl:text-[15px] font-medium text-[#334155]">
          <Link
            href="/#features"
            className="hover:text-[#2563EB] transition-colors py-2 px-1 hover:border-b-2 hover:border-[#2563EB]"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="hover:text-[#2563EB] transition-colors py-2 px-1 hover:border-b-2 hover:border-[#2563EB]"
          >
            How It Works
          </Link>
          <Link
            href="/#stakeholders"
            className="hover:text-[#2563EB] transition-colors py-2 px-1 hover:border-b-2 hover:border-[#2563EB]"
          >
            Institutions & Recruiters
          </Link>
          <Link
            href="/colleges"
            className="hover:text-[#2563EB] transition-colors py-2 px-1 hover:border-b-2 hover:border-[#2563EB]"
          >
            Affiliated Colleges
          </Link>
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
                className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors px-2 py-1"
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
                className="btn-primary text-xs sm:text-sm px-4 sm:px-5 py-2.5"
              >
                <span>Get Started</span>
                <span className="hidden md:inline"> Free</span> →
              </Link>
            </>
          )}
        </div>

        {/* Mobile & Tablet Hamburger Toggle (< 1024px / iPad Portrait) */}
        <div className="flex items-center gap-2 lg:hidden">
          {isAuthenticated && user ? (
            <Link
              href={getDashboardLink()}
              className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-200"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="sm:hidden text-xs font-bold text-[#0A2540] px-2.5 py-1.5 rounded-lg border border-slate-200"
            >
              Sign In
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-[#334155] hover:bg-[#F1F5F9] focus:outline-none transition-colors border border-transparent hover:border-[#E2E8F0]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile & iPad Drawer (Animated Modal Overlay) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 sm:top-20 z-40 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-b border-[#E2E8F0] px-4 sm:px-8 pt-4 pb-8 space-y-4 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto">
            
            <div className="space-y-1">
              <Link
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl text-base font-semibold text-[#1E293B] hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-colors"
              >
                <span>Features</span>
                <span className="text-slate-400">→</span>
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl text-base font-semibold text-[#1E293B] hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-colors"
              >
                <span>How It Works</span>
                <span className="text-slate-400">→</span>
              </Link>
              <Link
                href="/#stakeholders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl text-base font-semibold text-[#1E293B] hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-colors"
              >
                <span>Universities & Recruiters</span>
                <span className="text-slate-400">→</span>
              </Link>
              <Link
                href="/colleges"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl text-base font-semibold text-[#1E293B] hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-colors"
              >
                <span>Affiliated Colleges</span>
                <span className="text-slate-400">→</span>
              </Link>
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
