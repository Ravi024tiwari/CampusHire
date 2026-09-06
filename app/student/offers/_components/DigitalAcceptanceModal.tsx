'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Building2,
  UserCheck,
  Check,
  Award,
  Sparkles,
  PartyPopper,
  FileCheck,
  HeartHandshake,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DigitalAcceptanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
  student: {
    name: string;
    email: string;
    enrollmentNumber?: string | null;
  };
  onSuccess: (message: string) => void;
}

export function DigitalAcceptanceModal({
  isOpen,
  onClose,
  offer,
  student,
  onSuccess,
}: DigitalAcceptanceModalProps) {
  const [typedName, setTypedName] = useState('');
  const [typedEmail, setTypedEmail] = useState('');
  const [hasAgreedTerms, setHasAgreedTerms] = useState(false);
  const [candidateNotes, setCandidateNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccessState, setIsSuccessState] = useState(false);

  if (!isOpen || !offer) return null;

  const applicationId = offer.applicationId || offer.application?.id;

  // Verification matching (case-insensitive trim)
  const isNameMatched = typedName.trim().toLowerCase() === student.name.trim().toLowerCase();
  const isEmailMatched = typedEmail.trim().toLowerCase() === student.email.trim().toLowerCase();
  const canSubmit = isNameMatched && isEmailMatched && hasAgreedTerms && !isSubmitting;

  const triggerConfettiExplosion = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#2563eb', '#10b981', '#f59e0b', '#ec4899'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#3b82f6', '#14b8a6', '#6366f1'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleConfirmAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await apiClient.patch<ApiResponse<any>>(
        `/api/student/applications/${applicationId}/decision`,
        {
          decision: 'ACCEPTED',
          notes: candidateNotes.trim() || undefined,
        }
      );

      if (res.data?.success) {
        setIsSuccessState(true);
        triggerConfettiExplosion();
        setTimeout(() => {
          onSuccess(
            `🎉 Congratulations! You have formally accepted the placement offer from ${offer.company?.name}. Welcome aboard!`
          );
        }, 800);
      } else {
        setError(res.data?.message || 'Failed to submit acceptance.');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || 'An error occurred while accepting the offer.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col p-5 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto [scrollbar-width:thin]"
      >
        {isSuccessState ? (
          /* Celebratory Success State */
          <div className="py-8 text-center space-y-6 animate-in zoom-in-90 duration-300">
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-75" />
              <div className="relative h-20 w-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30">
                <PartyPopper className="w-10 h-10" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                OFFICIALLY PLACED
              </span>
              <h3 className="text-2xl font-black text-[#0A2540] tracking-tight">
                Offer Acceptance Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto font-medium leading-relaxed">
                Congratulations, <strong>{student.name}</strong>! Your digital signature has been recorded. You are now officially placed at <strong>{offer.company?.name}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 text-left space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600">Company</span>
                <span className="font-extrabold text-slate-900">{offer.company?.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600">Designation</span>
                <span className="font-extrabold text-slate-900">{offer.designation}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600">Offered CTC</span>
                <span className="font-extrabold text-emerald-700 text-sm">{offer.salaryPackage}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-lg hover:from-emerald-700 hover:to-teal-700 transition cursor-pointer"
            >
              Continue to Student Dashboard
            </button>
          </div>
        ) : (
          /* Normal Form State */
          <>
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0A2540] tracking-tight">
                    Digital Offer Acceptance
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Formal Verification & Placement Contract
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Offer Summary Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-blue-50/80 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  {offer.company?.name}
                </span>
                <span className="font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {offer.salaryPackage}
                </span>
              </div>
              <p className="text-xs font-black text-slate-900">{offer.designation}</p>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-medium">
                <span>📍 {offer.location}</span>
                {offer.joiningDate && (
                  <>
                    <span>•</span>
                    <span>🗓️ Joining: {new Date(offer.joiningDate).toLocaleDateString()}</span>
                  </>
                )}
              </div>
            </div>

            {/* University Placement Policy Note */}
            <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-[11.5px] text-amber-950 leading-relaxed font-medium">
              <span className="font-extrabold block text-amber-900 mb-0.5">⚠️ University Placement Policy Notice:</span>
              Once you digitally accept this offer, your profile will be officially locked as <strong>Placed</strong>. Any other pending applications will be automatically withdrawn.
            </div>

            {/* Verification Form */}
            <form onSubmit={handleConfirmAccept} className="space-y-4 text-xs">
              
              {/* Step 1: Name Verification */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  1. Type your Full Legal Name to verify signature:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    placeholder={`Type "${student.name}"`}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-hidden transition ${
                      typedName.trim()
                        ? isNameMatched
                          ? 'border-emerald-500 bg-emerald-50/30 text-emerald-950 focus:ring-2 focus:ring-emerald-100'
                          : 'border-rose-400 bg-rose-50/30 text-rose-950 focus:ring-2 focus:ring-rose-100'
                        : 'border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {isNameMatched && (
                    <Check className="absolute right-3 top-2.5 w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <p className="text-[10.5px] text-slate-400 mt-1">Must match registered name: <strong>{student.name}</strong></p>
              </div>

              {/* Step 2: Email Verification */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  2. Type your Registered Email Address:
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={typedEmail}
                    onChange={(e) => setTypedEmail(e.target.value)}
                    placeholder={`Type "${student.email}"`}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-hidden transition ${
                      typedEmail.trim()
                        ? isEmailMatched
                          ? 'border-emerald-500 bg-emerald-50/30 text-emerald-950 focus:ring-2 focus:ring-emerald-100'
                          : 'border-rose-400 bg-rose-50/30 text-rose-950 focus:ring-2 focus:ring-rose-100'
                        : 'border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {isEmailMatched && (
                    <Check className="absolute right-3 top-2.5 w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <p className="text-[10.5px] text-slate-400 mt-1">Must match registered email: <strong>{student.email}</strong></p>
              </div>

              {/* Step 3: Candidate Remarks */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  3. Note / Thank-you message to Recruiter (Optional):
                </label>
                <textarea
                  rows={2}
                  value={candidateNotes}
                  onChange={(e) => setCandidateNotes(e.target.value)}
                  placeholder="e.g. Thank you for this opportunity! I look forward to joining the team."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Step 4: Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 p-3 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={hasAgreedTerms}
                    onChange={(e) => setHasAgreedTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-[11.5px] font-medium text-slate-700 leading-snug">
                    I confirm that I have reviewed the official Offer Letter PDF and agree to all employment terms, joining schedule, and placement cell guidelines.
                  </span>
                </label>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing & Locking Acceptance...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Sign Acceptance</span>
                </>
              )}
            </button>
          </div>

        </form>
          </>
        )}
      </div>
    </div>
  );
}
