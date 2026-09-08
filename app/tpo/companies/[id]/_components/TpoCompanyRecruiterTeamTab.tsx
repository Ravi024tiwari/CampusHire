'use client';

import React from 'react';
import { Mail, Phone, ExternalLink, UserCheck, Globe, User } from 'lucide-react';

interface RecruiterContactItem {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  designation?: string;
  phone?: string;
  linkedinUrl?: string;
}

interface TpoCompanyRecruiterTeamTabProps {
  recruiters: RecruiterContactItem[];
  companyName: string;
  onContactHR: (recruiter: RecruiterContactItem) => void;
}

export function TpoCompanyRecruiterTeamTab({
  recruiters,
  companyName,
  onContactHR,
}: TpoCompanyRecruiterTeamTabProps) {
  if (recruiters.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center shadow-sm space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <UserCheck className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">No Recruiter Contacts Assigned</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          No talent acquisition members or HR contacts have been linked to {companyName} yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recruiters.map((rec) => (
        <div
          key={rec.id}
          className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-blue-200 transition-all flex flex-col justify-between gap-4"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
              {rec.avatarUrl ? (
                <img
                  src={rec.avatarUrl}
                  alt={rec.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-blue-600" />
              )}
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <h4 className="font-extrabold text-[#0A2540] text-sm truncate">
                {rec.name}
              </h4>
              <p className="text-xs text-slate-500 font-medium truncate">
                {rec.designation || 'Campus Talent Acquisition Lead'}
              </p>
              <p className="text-[11px] font-semibold text-blue-600">
                {companyName}
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <a
                href={`mailto:${rec.email}`}
                className="hover:text-blue-600 hover:underline truncate"
              >
                {rec.email}
              </a>
            </div>

            {rec.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <a
                  href={`tel:${rec.phone}`}
                  className="hover:text-emerald-600 hover:underline truncate"
                >
                  {rec.phone}
                </a>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => onContactHR(rec)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 rounded-xl shadow-xs transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>

            {rec.linkedinUrl && (
              <a
                href={rec.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-all"
                title="LinkedIn Profile"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
