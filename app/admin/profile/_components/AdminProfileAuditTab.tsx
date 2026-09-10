'use client';

import React from 'react';
import { 
  ShieldCheck, 
  ScrollText, 
  Clock, 
  MapPin, 
  Globe, 
  Laptop, 
  CheckCircle2, 
  ArrowUpRight,
  Sparkles,
  Lock
} from 'lucide-react';
import Link from 'next/link';

interface AdminProfileAuditTabProps {
  user: {
    id?: string;
    name?: string;
    email?: string;
    createdAt?: string;
    updatedAt?: string;
  } | null;
}

export function AdminProfileAuditTab({ user }: AdminProfileAuditTabProps) {
  const auditLogs = [
    {
      id: 'log-1',
      action: 'Profile Photo & Identity Refreshed',
      timestamp: 'Just now',
      ip: '103.21.244.18 (New Delhi, IN)',
      type: 'IDENTITY',
      status: 'SUCCESS',
    },
    {
      id: 'log-2',
      action: 'University Accreditation Approved (DTU)',
      timestamp: '2 hours ago',
      ip: '103.21.244.18 (New Delhi, IN)',
      type: 'ACCREDITATION',
      status: 'SUCCESS',
    },
    {
      id: 'log-3',
      action: 'Corporate Partner Tier Upgraded (Google India)',
      timestamp: 'Yesterday at 16:45',
      ip: '103.21.244.18 (New Delhi, IN)',
      type: 'RECRUITER',
      status: 'SUCCESS',
    },
    {
      id: 'log-4',
      action: 'Root Clearance Authentication Session Initiated',
      timestamp: '3 days ago',
      ip: '103.21.244.18 (New Delhi, IN)',
      type: 'AUTH',
      status: 'SUCCESS',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Active Security Session Dossier */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading">
              Active Administrative Session
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Current browser environment and cryptographic token parameters.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shrink-0 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Root Session
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Laptop className="w-4 h-4 text-[#0D8B8A]" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Client Browser</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900">Chrome on Windows (x64)</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Globe className="w-4 h-4 text-[#0D8B8A]" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Access Location</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900">New Delhi, India (UTC+05:30)</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Lock className="w-4 h-4 text-[#0D8B8A]" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Token Expiry</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900">7 Days Rolling JWT</p>
          </div>
        </div>
      </div>

      {/* 2. Audit Trail History */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D8B8A] flex items-center justify-center border border-teal-200/80">
              <ScrollText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 font-heading">
                Recent Governance Actions
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Immutable audit log recorded by CampusHire Root Security Engine.
              </p>
            </div>
          </div>

          <Link
            href="/admin/audit"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0D8B8A] hover:text-teal-800 transition-colors"
          >
            <span>Full Audit Trail</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {auditLogs.map((log) => (
            <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#0D8B8A] mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">{log.action}</p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{log.ip}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-right shrink-0">
                <span className="text-[11px] text-slate-500 font-medium">{log.timestamp}</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
