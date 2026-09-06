'use client';

import React, { useState } from 'react';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import {
  XCircle,
  AlertCircle,
  X,
  Loader2,
  Building2,
  Send
} from 'lucide-react';

interface DeclineOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
  onSuccess: (message: string) => void;
}

export function DeclineOfferModal({
  isOpen,
  onClose,
  offer,
  onSuccess,
}: DeclineOfferModalProps) {
  const [reason, setReason] = useState('Location Constraints');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !offer) return null;

  const applicationId = offer.applicationId || offer.application?.id;

  const handleDeclineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const fullNotes = `Reason: ${reason}. ${notes.trim()}`;

    try {
      const res = await apiClient.patch<ApiResponse<any>>(
        `/api/student/applications/${applicationId}/decision`,
        {
          decision: 'DECLINED',
          notes: fullNotes,
        }
      );

      if (res.data?.success) {
        onSuccess(`You have declined the offer from ${offer.company?.name}.`);
        onClose();
      } else {
        setError(res.data?.message || 'Failed to submit decision.');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || 'An error occurred while declining the offer.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-6 space-y-4 animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0A2540]">
                Decline Placement Offer
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {offer.company?.name} • {offer.designation}
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

        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Are you sure you want to decline this offer? The recruitment team and TPO will be notified.
        </p>

        <form onSubmit={handleDeclineSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Primary Reason for Declining:
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
            >
              <option value="Location Constraints">Location Constraints / Relocation Issue</option>
              <option value="Pursuing Higher Studies">Pursuing Higher Studies (GATE / CAT / MS / MBA)</option>
              <option value="Better Compensation Expectation">Compensation Expectation</option>
              <option value="Role Mismatch">Role Mismatch / Different Career Domain</option>
              <option value="Personal / Family Reasons">Personal / Family Reasons</option>
              <option value="Other">Other Reasons</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Additional Feedback / Message to Recruiter (Optional):
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Thank you for your consideration, but I have decided to pursue higher education."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

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
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-md transition cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Confirm Decline</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
