'use client';

import React, { useEffect } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { AdminHeroBanner } from './AdminHeroBanner';
import { KpiMetricsRow } from './KpiMetricsRow';
import { PendingApprovalsQueue } from './PendingApprovalsQueue';
import { PlacementVelocityMatrix } from './PlacementVelocityMatrix';
import { VerifiedInstitutionsTable } from './VerifiedInstitutionsTable';
import { CollegeDossierModal } from './CollegeDossierModal';
import { AuditLogFeed } from './AuditLogFeed';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X, 
  LayoutDashboard, 
  Briefcase, 
  ScrollText,
  GraduationCap
} from 'lucide-react';

export function AdminDashboardClient() {
  const { 
    activeTab, 
    setActiveTab, 
    fetchDashboardData, 
    toast, 
    dismissToast,
    pendingColleges,
    verifiedColleges
  } = useAdminStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Auto-dismiss toast notification
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, dismissToast]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 xl:space-y-8 transition-all duration-300 ease-in-out">
      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 sm:px-4.5 sm:py-3.5 shadow-xl animate-in slide-in-from-bottom-5 max-w-[90vw]">
          {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />}
          {toast.type === 'info' && <Info className="h-5 w-5 text-[#2563EB] shrink-0" />}
          <span className="text-xs sm:text-sm font-bold text-[#0A2540]">{toast.message}</span>
          <button 
            onClick={() => dismissToast()}
            className="ml-auto text-slate-400 hover:text-[#0A2540] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Mobile Quick Tab Navigation (Horizontal Scrollable) */}
      <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[
          { id: 'overview' as const, label: 'Pulse', icon: LayoutDashboard },
          { id: 'pending' as const, label: `Pending (${pendingColleges.length})`, icon: GraduationCap },
          { id: 'colleges' as const, label: `Verified (${verifiedColleges.length})`, icon: CheckCircle2 },
          { id: 'drives' as const, label: 'Drives', icon: Briefcase },
          { id: 'audit' as const, label: 'Audit', icon: ScrollText },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === t.id
                ? 'bg-[#2563EB] text-white shadow-xs font-extrabold'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Heroic Executive Placement Nexus Banner */}
      <AdminHeroBanner />

      {/* Tab 1: Overview Pulse */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <KpiMetricsRow />
          <PendingApprovalsQueue />
          <PlacementVelocityMatrix />
          <VerifiedInstitutionsTable />
          <AuditLogFeed />
        </div>
      )}

      {/* Tab 2: Pending Accreditation */}
      {activeTab === 'pending' && (
        <div className="space-y-6">
          <PendingApprovalsQueue />
        </div>
      )}

      {/* Tab 3: Verified Colleges */}
      {activeTab === 'colleges' && (
        <div className="space-y-6">
          <VerifiedInstitutionsTable />
        </div>
      )}

      {/* Tab 4: Placement Drives */}
      {activeTab === 'drives' && (
        <div className="space-y-6">
          <PlacementVelocityMatrix />
        </div>
      )}

      {/* Tab 5: Audit Log */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <AuditLogFeed />
        </div>
      )}

      {/* College Inspection Dossier Modal */}
      <CollegeDossierModal />
    </div>
  );
}
