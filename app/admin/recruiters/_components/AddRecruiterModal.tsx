'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  UserPlus, 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Briefcase, 
  Sparkles, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CompanyOption, CreateRecruiterPayload } from '../_types/recruiter.types';

interface AddRecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  companies: CompanyOption[];
  preSelectedCompanyId?: string;
  onSuccess: () => void;
}

export function AddRecruiterModal({
  isOpen,
  onClose,
  companies,
  preSelectedCompanyId = '',
  onSuccess,
}: AddRecruiterModalProps) {
  const [companyId, setCompanyId] = useState(preSelectedCompanyId);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [designation, setDesignation] = useState('Campus Recruiter');
  const [avatarUrl, setAvatarUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [justGenerated, setJustGenerated] = useState(false);

  // Sync pre-selected company
  useEffect(() => {
    if (preSelectedCompanyId) {
      setCompanyId(preSelectedCompanyId);
    } else if (companies.length > 0 && !companyId) {
      setCompanyId(companies[0].id);
    }
  }, [preSelectedCompanyId, companies, companyId]);

  if (!isOpen) return null;

  const handleGeneratePassword = (e: React.MouseEvent) => {
    e.preventDefault();
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*';
    let generated = '';
    for (let i = 0; i < 10; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
    setShowPassword(true);
    setJustGenerated(true);
    setTimeout(() => setJustGenerated(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!companyId) {
      setError('Please select a verified corporate partner.');
      return;
    }

    if (!name.trim()) {
      setError('Recruiter full name is required.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('A valid corporate work email is required.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const payload: CreateRecruiterPayload = {
        companyId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        designation: designation.trim() || 'Campus Recruiter',
        avatarUrl: avatarUrl.trim() || undefined,
      };

      const res = await fetch('/api/admin/recruiters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to provision recruiter');
      }

      setSuccessMessage(`Recruiter "${name}" successfully provisioned! Credentials are live.`);
      
      setTimeout(() => {
        onSuccess();
        onClose();
        setName('');
        setEmail('');
        setPassword('');
        setDesignation('Campus Recruiter');
        setAvatarUrl('');
        setSuccessMessage(null);
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to add recruiter. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  const selectedCompany = companies.find((c) => c.id === companyId);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 p-0 sm:p-4 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Click outside to close backdrop */}
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />

      {/* Modal Dialog Card (Bottom-sheet on mobile, centered modal on tablet/desktop) */}
      <div 
        className="relative w-full sm:max-w-lg max-h-[92vh] sm:max-h-[88vh] bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl z-10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Mobile Pull Bar Indicator */}
        <div className="flex sm:hidden items-center justify-center pt-2.5 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>

        {/* 1. Sticky Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-purple-50/90 via-white to-indigo-50/90 px-4 sm:px-6 py-3.5 sm:py-4">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-600/25 shrink-0">
              <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-[#0A2540] font-heading leading-tight truncate">
                Provision Corporate Recruiter
              </h2>
              <p className="text-[10.5px] sm:text-[11px] text-slate-500 font-medium truncate">
                Issue role-based credentials for authorized campus talent teams
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 2. Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3.5 sm:space-y-4 [-ms-overflow-style:none] [scrollbar-width:thin]">
          
          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-2.5 sm:p-3 text-xs text-red-800 animate-in fade-in">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 sm:p-3 text-xs text-emerald-800 animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <div className="flex-1 font-bold">{successMessage}</div>
            </div>
          )}

          {/* 1. Corporate Partner Selector */}
          <div className="space-y-1 sm:space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-[11px] sm:text-xs font-bold text-slate-700">
                Corporate Partner Organization *
              </Label>
              {selectedCompany && (
                <span className="text-[9.5px] sm:text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 font-mono font-bold truncate max-w-[130px]">
                  {selectedCompany.industry || 'Verified'}
                </span>
              )}
            </div>

            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600 pointer-events-none" />
              <select
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                disabled={companies.length === 0 || loading}
                className="w-full h-9.5 sm:h-10 pl-9 pr-8 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 text-xs font-bold text-[#0A2540] appearance-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] cursor-pointer transition-all shadow-inner"
              >
                {companies.length === 0 ? (
                  <option value="">No verified companies available</option>
                ) : (
                  companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c._count?.recruiters !== undefined ? `(${c._count.recruiters} team)` : ''}
                    </option>
                  ))
                )}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                ▼
              </div>
            </div>
          </div>

          {/* 2. Recruiter Full Name & Designation (Responsive 1-col on mobile, 2-col on sm+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            
            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-bold text-slate-700">
                Recruiter Full Name *
              </Label>
              <Input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-9.5 sm:h-10 text-xs font-medium rounded-xl border-slate-200 shadow-inner"
              />
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <Label className="text-[11px] sm:text-xs font-bold text-slate-700">
                Designation / Role *
              </Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="e.g. University Relations Lead"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="h-9.5 sm:h-10 pl-9 text-xs font-medium rounded-xl border-slate-200 shadow-inner"
                />
              </div>
            </div>

          </div>

          {/* 3. Work Email */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label className="text-[11px] sm:text-xs font-bold text-slate-700">
              Corporate Work Email *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
              <Input
                type="email"
                placeholder="e.g. priya.sharma@microsoft.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-9.5 sm:h-10 pl-9 text-xs font-medium rounded-xl border-slate-200 shadow-inner"
              />
            </div>
          </div>

          {/* 4. Secure Password with Visibility Toggle & Instant Generator */}
          <div className="space-y-1 sm:space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-[11px] sm:text-xs font-bold text-slate-700">
                Initial Account Password *
              </Label>
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-md transition-colors cursor-pointer border border-indigo-200/60"
              >
                {justGenerated ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span className="text-emerald-700">Generated!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3 w-3 text-indigo-500" />
                    <span>Generate Secure Password</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-9.5 sm:h-10 pl-9 pr-9 text-xs font-mono font-medium rounded-xl border-slate-200 shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* 5. Optional Avatar URL */}
          <div className="space-y-1 sm:space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-[11px] sm:text-xs font-bold text-slate-700">
                Avatar / Photo URL (Optional)
              </Label>
              <span className="text-[9.5px] sm:text-[10px] text-slate-400">HTTPS link</span>
            </div>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
              <Input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="h-9.5 sm:h-10 pl-9 text-xs font-medium rounded-xl border-slate-200 shadow-inner"
              />
            </div>
          </div>

          {/* 3. Sticky Footer Actions (Sticks cleanly on mobile & desktop) */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-md pt-3 pb-1 border-t border-slate-100 flex items-center justify-end gap-2 sm:gap-2.5 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="h-9 sm:h-10 rounded-xl text-xs font-bold border-slate-200 hover:bg-slate-50 cursor-pointer flex-1 sm:flex-initial"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || companies.length === 0}
              className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-600/20 cursor-pointer disabled:opacity-50 flex-1 sm:flex-initial"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                  <span>Provisioning...</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                  <span>Provision Recruiter</span>
                </>
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}

