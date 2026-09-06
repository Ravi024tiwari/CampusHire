'use client';

import React from 'react';
import { Users, Mail, ShieldCheck, UserCheck, Plus, Building2 } from 'lucide-react';
import { CompanyRecruiter } from '@/store/useRecruiterCompanyStore';

interface CompanyTeamSectionProps {
  recruiters: CompanyRecruiter[];
  companyName: string;
}

export function CompanyTeamSection({ recruiters, companyName }: CompanyTeamSectionProps) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4.5 sm:p-6 space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
            Talent Acquisition & Hiring Team ({recruiters.length})
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Authorized recruiters and campus relations partners representing {companyName}.
          </p>
        </div>
      </div>

      {/* Team Grid */}
      {recruiters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recruiters.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-all space-y-3"
            >
              <div className="flex items-center gap-3">
                {member.user.avatarUrl ? (
                  <img
                    src={member.user.avatarUrl}
                    alt={member.user.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-2xs">
                    {member.user.name.slice(0, 2).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-black text-[#0A2540] font-heading truncate">
                    {member.user.name}
                  </h4>
                  <p className="text-xs text-blue-600 font-bold truncate">
                    {member.designation || 'Lead Campus Recruiter'}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 space-y-1 text-xs text-slate-600">
                <a
                  href={`mailto:${member.user.email}`}
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{member.user.email}</span>
                </a>
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Verified Recruiter</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
          <Users className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-700">No Team Members Listed</h4>
          <p className="text-xs text-slate-500">Your profile is currently the primary recruiter for this company.</p>
        </div>
      )}

    </div>
  );
}
