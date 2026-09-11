'use client';

import React from 'react';
import Link from 'next/link';
import { useAdminStore } from '@/store/useAdminStore';
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Globe, 
  Loader2,
  ShieldAlert
} from 'lucide-react';

export function AdminDashboardPendingCollegesCard() {
  const { pendingColleges, verifyCollege, isVerifyingId } = useAdminStore();

  const previewColleges = pendingColleges.slice(0, 3);

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all hover:border-amber-300/80">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 shadow-2xs shrink-0">
              <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading tracking-tight">
                Pending Universities
              </h3>
              <p className="text-xs text-slate-500">
                Campuses awaiting NIRF & domain accreditation
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 sm:px-3 py-1 text-xs font-black text-amber-800 border border-amber-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>{pendingColleges.length} Pending</span>
          </span>
        </div>

        {/* List Body */}
        <div className="pt-4 space-y-3">
          {previewColleges.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 mb-2">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#0A2540]">All Universities Accredited</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">No colleges currently awaiting verification.</p>
            </div>
          ) : (
            previewColleges.map((college) => {
              const isVerifying = isVerifyingId === college.id;
              return (
                <div
                  key={college.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200 hover:shadow-2xs transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-amber-700 shrink-0 overflow-hidden shadow-2xs">
                      {college.logoUrl ? (
                        <img 
                          src={college.logoUrl} 
                          alt={college.name} 
                          className="h-full w-full object-cover"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      ) : (
                        <span>{college.code || college.name.slice(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#0A2540] truncate">
                        {college.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-500">
                        {(college.city || college.state) && (
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{[college.city, college.state].filter(Boolean).join(', ')}</span>
                          </span>
                        )}
                        {college.domain && (
                          <span className="text-amber-700 font-mono hidden xs:inline">
                            @{college.domain}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => verifyCollege(college.id, true)}
                    disabled={isVerifying}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-xs transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                  >
                    {isVerifying ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accredit</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer / View All Link */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-medium">
          {pendingColleges.length > 3 ? `+${pendingColleges.length - 3} more awaiting review` : 'Real-time sync'}
        </span>
        <Link
          href="/admin/verification-queue"
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700 hover:text-amber-800 transition-colors group cursor-pointer"
        >
          <span>View All Universities ({pendingColleges.length})</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
