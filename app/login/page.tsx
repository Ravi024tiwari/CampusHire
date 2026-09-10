'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/BrandLogo';
import { useAuthStore } from '@/store';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  FileText
} from 'lucide-react';

const LIVE_PLACEMENTS = [
  { name: 'Aarav S.', role: 'Google SWE', package: '₹42.5 LPA', bg: 'bg-blue-500/20 text-blue-300 border-blue-400/30' },
  { name: 'Priya I.', role: 'Microsoft Azure AI', package: '₹38.0 LPA', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' },
  { name: 'Rohan D.', role: 'Stripe Payments', package: '₹45.0 LPA', bg: 'bg-purple-500/20 text-purple-300 border-purple-400/30' },
  { name: 'Ananya V.', role: 'Deloitte Analyst', package: '₹14.2 LPA', bg: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
];

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await apiClient.post<ApiResponse<{ user: any }>>('/api/auth/login', {
        email: email.trim().toLowerCase(),
        password,
      });

      const result = response.data;
      const userData = result.data?.user;
      const role = userData?.role;

      // Hydrate user in Zustand AuthStore
      if (userData) {
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          avatarUrl: userData.avatarUrl,
          isActive: userData.isActive,
        });
      }

      // Smart redirection based on authenticated user's role
      if (role === 'SUPER_ADMIN') {
        router.push('/admin/dashboard');
      } else if (role === 'STUDENT') {
        router.push('/student/dashboard');
      } else if (role === 'RECRUITER') {
        router.push('/recruiter/dashboard');
      } else if (role === 'TPO_ADMIN') {
        router.push('/tpo/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0A2540]">
      
      {/* 1. Left Showcase & Trust Pane (Visible on lg: 1024px+) */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-[46%] bg-gradient-to-br from-[#071D32] via-[#0A2540] to-[#0E3459] text-white p-8 xl:p-12 flex-col justify-between relative overflow-hidden select-none border-r border-slate-700/50">
        
        {/* Ambient Radial Mesh Lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Brand Bar */}
        <div className="relative z-10">
          <BrandLogo size="md" variant="dark" />
        </div>

        {/* Middle Hero Story & 3D Glassmorphic Showcase */}
        <div className="relative z-10 space-y-5 my-auto max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>2024–25 Verified Placement Season</span>
          </div>

          <h1 className="text-2xl xl:text-3xl font-extrabold font-heading tracking-tight leading-tight text-white">
            India’s Premier Campus Placement Ecosystem.
          </h1>

          {/* 3D Glassmorphic Placement Dashboard Visual */}
          <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:scale-[1.02] transition-transform duration-500">
            <div className="aspect-[4/3] relative w-full bg-slate-950">
              <Image
                src="/images/auth/auth_3d_showcase.jpg"
                alt="Campus Placement 3D Analytics Dashboard"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center"
              />
            </div>
            
            {/* Overlay Glass Badge */}
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-slate-200 text-[11px]">Real-Time Placement Stream</span>
              </div>
              <span className="font-mono font-bold text-[#FBAB23] text-[11px]">₹45.0 LPA Top CTC</span>
            </div>
          </div>

          {/* Value Highlights */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center gap-2 text-[11px] text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Multi-Resume Cloud Vault</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Sub-15ms Batch Filtering</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Single-Offer Fair Guard</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>NIRF DCS 1-Click Export</span>
            </div>
          </div>
        </div>

        {/* Bottom Compliance Strip */}
        <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ISO 27001 & SOC-2 Certified</span>
          </div>
          <span className="text-[11px]">© {new Date().getFullYear()} CampusHire</span>
        </div>

      </div>

      {/* 2. Right Form Pane (Clean, High-Contrast & Responsive) */}
      <div className="flex-1 bg-[#F8FAFC] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 overflow-y-auto">
        
        {/* Top Mobile Brand Bar (Visible on < 1024px) */}
        <div className="flex lg:hidden items-center justify-between mb-6">
          <BrandLogo size="sm" />
          <Link href="/" className="text-xs font-bold text-blue-600 hover:text-blue-800">
            ← Home
          </Link>
        </div>

        {/* Center Login Container */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>Secure Authentication</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
              Sign In to Your Portal
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1.5">
              Enter your registered credentials to access your placement dashboard.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
              <span className="text-sm flex-shrink-0">⚠️</span>
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {/* Main Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                Registered Email Address
              </label>
              <div className="relative group">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu or name@company.com"
                  className="input-placecom has-icon-left !pl-11 sm:!pl-12 !pr-4 py-2.5 sm:py-3 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Password Field with Eye Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative group">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-placecom has-icon-left has-icon-right !pl-11 sm:!pl-12 !pr-11 sm:!pr-12 py-2.5 sm:py-3 text-xs sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> : <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all duration-200 transform active:scale-[0.98] cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Registration Redirect */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-[#64748B]">
            <span>Don't have an account yet? </span>
            <Link href="/register" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Create an Account →
            </Link>
          </div>

        </div>

        {/* Bottom Support Info */}
        <div className="pt-6 text-center text-xs text-[#94A3B8]">
          <span>Need institutional access support? Contact </span>
          <a href="mailto:support@campushire.io" className="font-semibold text-blue-600 hover:underline">
            support@campushire.io
          </a>
        </div>

      </div>

    </div>
  );
}
