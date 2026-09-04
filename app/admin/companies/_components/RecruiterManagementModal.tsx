'use client';

import React from 'react';
import { 
  Users, 
  X, 
  UserPlus, 
  Check, 
  Loader2, 
  Copy 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import type { CompanyItem, RecruiterMember } from '../_types/company.types';

interface RecruiterManagementModalProps {
  selectedCompany: CompanyItem | null;
  onClose: () => void;
  recruiters: RecruiterMember[];
  loadingRecruiters: boolean;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  newRecruiterName: string;
  setNewRecruiterName: (name: string) => void;
  newRecruiterEmail: string;
  setNewRecruiterEmail: (email: string) => void;
  newRecruiterPassword: string;
  setNewRecruiterPassword: (password: string) => void;
  newRecruiterDesignation: string;
  setNewRecruiterDesignation: (designation: string) => void;
  isSubmittingRecruiter: boolean;
  recruiterFormError: string | null;
  recruiterFormSuccess: string | null;
  onAddRecruiter: (e: React.FormEvent) => void;
  copiedEmail: string | null;
  onCopyEmail: (email: string) => void;
}

export function RecruiterManagementModal({
  selectedCompany,
  onClose,
  recruiters,
  loadingRecruiters,
  showAddForm,
  setShowAddForm,
  newRecruiterName,
  setNewRecruiterName,
  newRecruiterEmail,
  setNewRecruiterEmail,
  newRecruiterPassword,
  setNewRecruiterPassword,
  newRecruiterDesignation,
  setNewRecruiterDesignation,
  isSubmittingRecruiter,
  recruiterFormError,
  recruiterFormSuccess,
  onAddRecruiter,
  copiedEmail,
  onCopyEmail,
}: RecruiterManagementModalProps) {
  if (!selectedCompany) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      
      {/* Click outside to close backdrop */}
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-h-[92vh] sm:max-h-[88vh] overflow-y-auto z-10 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-250">
        
        {/* Mobile Pull Bar */}
        <div className="flex sm:hidden items-center justify-center -mt-1 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center font-bold text-lg shadow-2xs">
              {selectedCompany.logoUrl ? (
                <img 
                  src={selectedCompany.logoUrl} 
                  alt={selectedCompany.name} 
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                selectedCompany.name.slice(0, 2).toUpperCase()
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-[#0A2540] font-heading">
                  {selectedCompany.name}
                </h3>
                <Badge
                  variant={selectedCompany.isVerified ? "outline" : "secondary"}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                    selectedCompany.isVerified
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  {selectedCompany.isVerified ? 'Accredited' : 'Pending'}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Corporate Talent Acquisition & Campus Recruiting Roster
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Modal Action Row */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Assigned Recruiters ({recruiters.length})
          </span>

          {selectedCompany.isVerified && (
            <Button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3.5 py-1.5 h-auto rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Cancel Form' : 'Add New Recruiter'}</span>
            </Button>
          )}
        </div>

        {/* Recruiter Success Feedback */}
        {recruiterFormSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-bold animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{recruiterFormSuccess}</span>
          </div>
        )}

        {/* Add Recruiter Inline Form using shadcn Label, Input, and Button */}
        {showAddForm && selectedCompany.isVerified && (
          <form onSubmit={onAddRecruiter} className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-4 animate-in fade-in">
            <span className="text-xs font-bold text-purple-900 block border-b border-purple-200/80 pb-1.5">
              Provision New Recruiter Account for {selectedCompany.name}
            </span>

            {recruiterFormError && (
              <p className="text-xs text-red-600 font-semibold">⚠️ {recruiterFormError}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider">
                  Recruiter Full Name *
                </Label>
                <Input
                  type="text"
                  required
                  value={newRecruiterName}
                  onChange={(e) => setNewRecruiterName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="bg-white rounded-xl border-slate-200 py-2 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider">
                  Work Email Address *
                </Label>
                <Input
                  type="email"
                  required
                  value={newRecruiterEmail}
                  onChange={(e) => setNewRecruiterEmail(e.target.value)}
                  placeholder="sarah@company.com"
                  className="bg-white rounded-xl border-slate-200 py-2 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <Label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider">
                  Temporary Password *
                </Label>
                <Input
                  type="password"
                  required
                  minLength={6}
                  value={newRecruiterPassword}
                  onChange={(e) => setNewRecruiterPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="bg-white rounded-xl border-slate-200 py-2 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider">
                  Corporate Designation *
                </Label>
                <Input
                  type="text"
                  required
                  value={newRecruiterDesignation}
                  onChange={(e) => setNewRecruiterDesignation(e.target.value)}
                  placeholder="e.g. Talent Acquisition Lead"
                  className="bg-white rounded-xl border-slate-200 py-2 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 h-auto rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer border-slate-200"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmittingRecruiter}
                className="px-5 py-2 h-auto rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isSubmittingRecruiter ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Provisioning...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Save & Activate Recruiter</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Recruiters List */}
        {loadingRecruiters ? (
          <div className="py-10 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-7 h-7 animate-spin text-purple-600 mb-2" />
            <span className="text-xs font-semibold">Loading recruiter roster...</span>
          </div>
        ) : recruiters.length === 0 ? (
          <div className="py-10 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl p-6">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700">No Recruiters Assigned Yet</p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
              {selectedCompany.isVerified
                ? 'Use the "Add New Recruiter" button to provision the first talent acquisition officer.'
                : 'Company must be accredited by Super Admin before recruiters can be added.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recruiters.map((recruiter) => (
              <div
                key={recruiter.id}
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between gap-3 hover:bg-white hover:shadow-2xs transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    {recruiter.user.avatarUrl ? (
                      <img
                        src={recruiter.user.avatarUrl}
                        alt={recruiter.user.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      recruiter.user.name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#0A2540] block truncate">
                      {recruiter.user.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => onCopyEmail(recruiter.user.email)}
                      className="flex items-center gap-1 text-[11px] text-slate-500 font-mono hover:text-[#2563EB] transition-colors cursor-pointer group/copy"
                    >
                      <span className="truncate">{recruiter.user.email}</span>
                      <Copy className="w-3 h-3 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                      {copiedEmail === recruiter.user.email && (
                        <span className="text-[10px] text-emerald-600 font-bold ml-1">Copied!</span>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] font-bold text-purple-700 block">
                    {recruiter.designation || 'Recruiter'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Added {new Date(recruiter.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Footer using shadcn Button */}
        <div className="flex justify-end pt-3 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-5 py-2.5 h-auto rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A2540] text-xs font-bold transition-all cursor-pointer border-slate-200"
          >
            Done
          </Button>
        </div>

      </div>
    </div>
  );
}
