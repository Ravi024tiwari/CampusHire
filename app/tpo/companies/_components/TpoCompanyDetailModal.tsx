'use client';

import React from 'react';
import { X, Building2, Globe, MapPin, Briefcase, Users, Calendar, Mail, Phone, ExternalLink, CheckCircle2 } from 'lucide-react';
import { TpoCompanyItem } from '../_types/tpo-companies.types';

interface TpoCompanyDetailModalProps {
  company: TpoCompanyItem | null;
  onClose: () => void;
}

export function TpoCompanyDetailModal({
  company,
  onClose,
}: TpoCompanyDetailModalProps) {
  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-white/80 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 p-2 flex items-center justify-center shadow-xs shrink-0">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <Building2 className="w-7 h-7 text-blue-600" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-[#0A2540]">
                  {company.name}
                </h3>
                {company.status === 'VISITED' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Visited
                  </span>
                )}
                {company.status === 'UPCOMING' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    Upcoming
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {company.industry} • {company.companyType}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Briefcase className="w-4 h-4 text-purple-600" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Job Openings</span>
              </div>
              <span className="text-xl font-extrabold text-slate-900">
                {company.jobOpportunities} Drives
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Users className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Students Placed</span>
              </div>
              <span className="text-xl font-extrabold text-slate-900">
                {company.studentsPlaced} Offers
              </span>
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-slate-700">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-900">Location:</span>
              <span className="text-slate-600">{company.location}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-700">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-900">Visit Date:</span>
              <span className="text-slate-600">{company.visitDate}</span>
            </div>

            {company.website && (
              <div className="flex items-center gap-3 text-slate-700">
                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-semibold text-slate-900">Website:</span>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1 font-medium truncate"
                >
                  {company.website}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Recruiter Details */}
          {company.contactPerson && (
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <h4 className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                Recruiter Point of Contact
              </h4>
              <div className="space-y-1 text-slate-700">
                <p className="font-bold text-slate-900">
                  {company.contactPerson.name}{' '}
                  <span className="text-slate-500 font-normal">
                    ({company.contactPerson.designation || 'Talent Acquisition'})
                  </span>
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  <span>{company.contactPerson.email}</span>
                </div>
                {company.contactPerson.phone && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{company.contactPerson.phone}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-end">
            <button
              onClick={onClose}
              className="w-full bg-[#0A2540] hover:bg-[#12365c] text-white font-bold text-xs py-2.5 rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
