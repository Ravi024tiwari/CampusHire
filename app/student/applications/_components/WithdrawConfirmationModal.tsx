'use client';

import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useStudentApplicationsStore } from '@/store/useStudentApplicationsStore';

export function WithdrawConfirmationModal() {
  const { 
    applicationToWithdraw, 
    isWithdrawModalOpen, 
    closeWithdrawModal, 
    withdrawApplication 
  } = useStudentApplicationsStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isWithdrawModalOpen || !applicationToWithdraw) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await withdrawApplication(applicationToWithdraw.id);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-5 sm:p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 text-amber-600">
          <div className="h-10 w-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#0A2540] font-heading">
              Withdraw Application?
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Are you sure you want to withdraw your application for{' '}
          <strong className="text-[#0A2540]">{applicationToWithdraw.title}</strong> at{' '}
          <strong className="text-[#0A2540]">{applicationToWithdraw.company.name}</strong>?
        </p>

        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={closeWithdrawModal}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm shadow-rose-600/25"
          >
            {isSubmitting ? 'Withdrawing...' : 'Yes, Withdraw'}
          </button>
        </div>
      </div>
    </div>
  );
}
