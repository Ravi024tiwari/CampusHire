'use client';

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  Building 
} from 'lucide-react';

interface CollegePlacementStatsProps {
  stats: {
    enrolledStudents: number;
    placedStudents: number;
    totalOffers: number;
    totalApplications: number;
    placementRate: number;
    activeDrives: number;
  };
  tpos?: Array<{
    id: string;
    designation: string;
    department: string;
    user: {
      id: string;
      name: string;
      email: string;
      avatarUrl?: string | null;
    };
  }>;
}

export function CollegePlacementStatsCard({ stats, tpos = [] }: CollegePlacementStatsProps) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-black text-[#0A2540] tracking-tight">
            Institutional Intelligence
          </h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Live Backend
        </span>
      </div>

      {/* 4 Stat Cells */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-0.5">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="text-[11px] font-semibold">Enrolled</span>
            <Users className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <p className="text-base sm:text-lg font-black text-slate-900">
            {stats.enrolledStudents.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-400 font-medium">Eligible students</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-0.5">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="text-[11px] font-semibold">Placed Rate</span>
            <Award className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <p className="text-base sm:text-lg font-black text-emerald-600">
            {stats.placementRate}%
          </p>
          <p className="text-[10px] text-slate-400 font-medium">{stats.placedStudents} Placed</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-0.5">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="text-[11px] font-semibold">Total Offers</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <p className="text-base sm:text-lg font-black text-slate-900">
            {stats.totalOffers.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-400 font-medium">Offers released</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-0.5">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="text-[11px] font-semibold">Active Drives</span>
            <Briefcase className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <p className="text-base sm:text-lg font-black text-slate-900">
            {stats.activeDrives.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-400 font-medium">Recruitment posts</p>
        </div>
      </div>

      {/* TPO Officers on Record */}
      {tpos.length > 0 && (
        <div className="pt-2 space-y-2 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-700">TPO Officers on Record ({tpos.length})</p>
          <div className="space-y-1.5">
            {tpos.slice(0, 3).map((tpo) => (
              <div 
                key={tpo.id} 
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 border border-slate-100"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                    {tpo.user.name ? tpo.user.name[0].toUpperCase() : 'T'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{tpo.user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{tpo.designation || 'Training & Placement Officer'}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  Authorized
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
