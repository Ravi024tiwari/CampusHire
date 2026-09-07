'use client';

import React from 'react';
import Image from 'next/image';
import { Briefcase, ExternalLink, Download, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import type { StudentDossierData } from './StudentProfileHeader';

interface StudentOffersTabProps {
  offers: StudentDossierData['offers'];
}

export function StudentOffersTab({ offers }: StudentOffersTabProps) {
  if (!offers || offers.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <Briefcase className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No Placement Offers Issued</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          No formal offer letters have been extended to this candidate yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {offers.map((offer) => {
        const statusBadge = {
          ACCEPTED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
          DECLINED: 'bg-rose-50 text-rose-700 border-rose-200',
          REVOKED: 'bg-slate-100 text-slate-700 border-slate-200',
        }[offer.status] || 'bg-slate-100 text-slate-700 border-slate-200';

        return (
          <div
            key={offer.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:shadow-md transition-all"
          >
            {/* Left Offer Details */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-lg text-slate-700 shrink-0 border border-slate-200 overflow-hidden">
                {offer.company.logoUrl ? (
                  <Image
                    src={offer.company.logoUrl}
                    alt={offer.company.name}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                ) : (
                  offer.company.name.charAt(0)
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <h4 className="text-base font-black text-[#0A2540] font-heading">
                    {offer.designation}
                  </h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusBadge}`}>
                    {offer.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                  <span className="font-extrabold text-slate-900">{offer.company.name}</span>
                  <span>&bull;</span>
                  <span className="font-black text-emerald-700 font-heading">{offer.salaryPackage}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {offer.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Trigger */}
            <div className="flex items-center gap-3 self-start sm:self-auto">
              {offer.letterUrl && (
                <a
                  href={offer.letterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0D8B8A] font-bold text-xs border border-teal-200 shadow-2xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Offer Letter</span>
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
