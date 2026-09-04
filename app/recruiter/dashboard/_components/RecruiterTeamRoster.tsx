'use client';

import React from 'react';
import Image from 'next/image';
import { TeamMember } from '../_types/recruiter-dashboard.types';
import { Users, Mail, Shield, CheckCircle2 } from 'lucide-react';

interface RecruiterTeamRosterProps {
  teamMembers: TeamMember[];
  companyName: string;
}

export function RecruiterTeamRoster({ teamMembers, companyName }: RecruiterTeamRosterProps) {
  return (
    <div id="team" className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-6 lg:p-7 shadow-xs space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Users className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg lg:text-xl font-extrabold font-heading text-[#0A2540] tracking-tight">
              Corporate Talent Acquisition Team
            </h2>
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] sm:text-xs font-black text-indigo-700 border border-indigo-200">
              {teamMembers.length} Officers
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Registered campus recruiters and placement coordinators collaborating for {companyName}.
          </p>
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {teamMembers.map((member) => {
          const initials = member.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();

          return (
            <div
              key={member.id}
              className="p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 bg-slate-50/40 hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex items-start gap-3.5 group"
            >
              {/* Avatar */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                {member.avatarUrl ? (
                  <Image
                    src={member.avatarUrl}
                    alt={member.name}
                    width={48}
                    height={48}
                    className="rounded-2xl object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white ${
                    member.isActive ? 'bg-emerald-500' : 'bg-slate-400'
                  }`}
                />
              </div>

              {/* Text Meta */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0A2540] truncate group-hover:text-indigo-600 transition-colors">
                    {member.name}
                  </h4>
                  <span className="px-1.5 py-0.2 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-black shrink-0">
                    Active
                  </span>
                </div>
                <p className="text-[11.5px] font-semibold text-indigo-600 truncate">{member.designation}</p>
                <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 truncate pt-0.5">
                  <Mail className="w-3 h-3 shrink-0 text-slate-400" />
                  <span className="truncate">{member.email}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
