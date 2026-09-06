'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  Square,
  MapPin,
  ChevronRight,
  ShieldCheck,
  FileText,
  DollarSign,
  Building2,
  Calendar,
  Eye,
  Download,
  GraduationCap,
  Award,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RecruiterOfferItem, useRecruiterOffersStore } from '@/store/useRecruiterOffersStore';

interface RecruiterOffersCardsProps {
  offers: RecruiterOfferItem[];
  onViewOfferPdf?: (offer: RecruiterOfferItem) => void;
}

export function RecruiterOffersCards({ offers, onViewOfferPdf }: RecruiterOffersCardsProps) {
  const {
    filters,
    setFilter,
    stats,
    selectedOfferIds,
    toggleSelectOffer,
  } = useRecruiterOffersStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return {
          label: 'Accepted',
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
          dot: 'bg-emerald-500',
        };
      case 'PENDING':
        return {
          label: 'Pending Response',
          color: 'bg-amber-50 text-amber-700 border-amber-200/90',
          dot: 'bg-amber-500 animate-pulse',
        };
      case 'DECLINED':
      case 'EXPIRED':
        return {
          label: 'Declined',
          color: 'bg-rose-50 text-rose-700 border-rose-200/90',
          dot: 'bg-rose-500',
        };
      default:
        return {
          label: status,
          color: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
        };
    }
  };

  const tabs = [
    { id: 'ALL', label: 'All Offers', count: stats.total },
    { id: 'ACCEPTED', label: 'Accepted', count: stats.accepted },
    { id: 'PENDING', label: 'Pending', count: stats.pending },
    { id: 'DECLINED', label: 'Declined', count: stats.declined },
  ] as const;

  return (
    <div className="space-y-4">
      
      {/* 1. Top Segmented Filter Tabs matching Mobile Mockup */}
      <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter('status', tab.id)}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
              filters.status === tab.id
                ? 'bg-white text-[#0A2540] shadow-xs ring-1 ring-slate-200 font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-black ${
              filters.status === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-200/70 text-slate-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 2. Responsive 1 / 2 / 3 Column Card Grid */}
      {offers.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs font-medium space-y-2.5 shadow-2xs">
          <Award className="w-9 h-9 text-slate-300 mx-auto" />
          <p className="font-extrabold text-slate-700 text-sm">No placement offers found in this view.</p>
          <p className="text-slate-400 text-xs max-w-sm mx-auto">
            Try adjusting your search criteria, clearing active filters, or issuing new candidate offers.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5">
          {offers.map((offer) => {
            const isSelected = selectedOfferIds.includes(offer.id);
            const statusBadge = getStatusBadge(offer.status);

            return (
              <div
                key={offer.id}
                className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border bg-white p-4.5 sm:p-5 shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-600/15 bg-blue-50/15'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                {/* Top Section: Checkbox, Avatar, Name & Status */}
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-2.5 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={() => toggleSelectOffer(offer.id)}
                        className="flex items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer shrink-0"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>

                      <Avatar className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl border border-slate-200/90 shrink-0 shadow-2xs">
                        {offer.student.avatarUrl && (
                          <AvatarImage src={offer.student.avatarUrl} alt={offer.student.name} />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-[#0A2540] to-blue-600 text-white font-black text-xs rounded-2xl">
                          {offer.student.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/recruiter/applications/${offer.applicationId}`}
                            className="font-black text-sm text-[#0A2540] hover:text-blue-600 transition-colors truncate block"
                          >
                            {offer.student.name}
                          </Link>
                          {offer.student.isVerified && (
                            <span title="Verified Candidate" className="shrink-0">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium truncate">
                          {offer.student.email}
                        </p>
                      </div>
                    </div>

                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-black border shrink-0 ${statusBadge.color}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${statusBadge.dot}`} />
                      <span>{statusBadge.label}</span>
                    </span>
                  </div>

                  {/* Middle Details: Role, College, Academics & Package */}
                  <div className="space-y-2.5 text-xs">
                    
                    {/* Role & Job Type */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-[#0A2540] text-[13.5px] truncate">
                        {offer.designation}
                      </span>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                        offer.job?.type === 'INTERNSHIP'
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {offer.job?.type === 'INTERNSHIP' ? 'Internship' : 'Full Time'}
                      </span>
                    </div>

                    {/* College & Batch Year */}
                    <div className="flex items-center justify-between text-slate-500 font-medium text-[11.5px] gap-2">
                      <span className="flex items-center gap-1 truncate">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{offer.college.name}</span>
                      </span>
                      <span className="font-bold text-slate-700 shrink-0 text-[11px]">
                        {offer.student.branch || 'B.Tech'} ({offer.student.batchYear || '2026'})
                      </span>
                    </div>

                    {/* Compensation & Work Location Banner */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div>
                        <span className="text-[9.5px] text-slate-400 font-extrabold uppercase tracking-wider block">Package</span>
                        <span className="font-black text-emerald-700 text-sm tracking-tight">{offer.salaryPackage}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9.5px] text-slate-400 font-extrabold uppercase tracking-wider block">Location</span>
                        <span className="inline-flex items-center gap-1 font-bold text-slate-800 text-[11.5px]">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {offer.location}
                        </span>
                      </div>
                    </div>

                    {/* Status Highlights */}
                    {offer.acceptedAt && (
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold bg-emerald-50/70 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Accepted on {new Date(offer.acceptedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    )}

                  </div>
                </div>

                {/* Bottom Footer Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <span className="text-[11px] text-slate-400 font-medium truncate">
                    Issued: {new Date(offer.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {offer.letterUrl && onViewOfferPdf && (
                      <button
                        type="button"
                        onClick={() => onViewOfferPdf(offer)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition cursor-pointer font-bold text-[11px]"
                        title="View Official Offer Letter PDF"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span className="hidden xs:inline">PDF</span>
                      </button>
                    )}

                    <Link
                      href={`/recruiter/applications/${offer.applicationId}/offer`}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition"
                    >
                      Manage
                    </Link>

                    <Link
                      href={`/recruiter/applications/${offer.applicationId}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition shadow-2xs"
                    >
                      <span>View</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

