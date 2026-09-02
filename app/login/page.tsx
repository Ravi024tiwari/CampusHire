'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { BrandLogo } from '@/components/BrandLogo';

import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || result.message || 'Invalid credentials');
      }

      const userData = result.data?.user;
      const role = userData?.role;

      // Hydrate and persist user state in Redux store
      if (userData) {
        dispatch(
          setCredentials({
            user: {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              avatarUrl: userData.avatarUrl,
              isActive: userData.isActive,
            },
            studentProfile: userData.student || null,
            recruiterProfile: userData.recruiter
              ? {
                  id: userData.recruiter.id,
                  companyId: userData.recruiter.companyId,
                  companyName: userData.recruiter.company?.name,
                  companyLogoUrl: userData.recruiter.company?.logoUrl,
                  designation: userData.recruiter.designation,
                  isCompanyVerified: userData.recruiter.company?.isVerified,
                }
              : null,
            tpoProfile: userData.tpo
              ? {
                  id: userData.tpo.id,
                  collegeId: userData.tpo.collegeId,
                  collegeName: userData.tpo.college?.name,
                  collegeCode: userData.tpo.college?.code,
                  designation: userData.tpo.designation,
                  isCollegeVerified: userData.tpo.college?.isVerified,
                }
              : null,
          })
        );
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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 md:p-10 rounded-2xl border border-[#E2E8F0] shadow-xl shadow-slate-200/50">
          
          {/* Header with BrandLogo */}
          <div className="text-center mb-6 sm:mb-8 flex flex-col items-center">
            <div className="mb-3 sm:mb-4">
              <BrandLogo size="md" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A2540] font-heading mt-1 sm:mt-2">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Sign in to access your placement portal.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
              <span className="text-sm flex-shrink-0">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                Registered Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu or name@company.com"
                className="input-placecom"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider">
                  Password
                </label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                className="input-placecom"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In to Portal →</span>
                )}
              </button>
            </div>
          </form>

          {/* Registration Redirect */}
          <div className="mt-8 pt-6 border-t border-[#F1F5F9] text-center text-xs text-[#64748B]">
            <span>Don't have an account yet? </span>
            <Link href="/register" className="font-bold text-blue-600 hover:text-blue-800">
              Create an Account
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
