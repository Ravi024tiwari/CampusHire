'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  Square,
  Building2,
  MapPin,
  FileText,
  ExternalLink,
  MoreHorizontal,
  Download,
  Eye,
  Calendar,
  Sparkles,
  User,
  GraduationCap
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RecruiterOfferItem, useRecruiterOffersStore } from '@/store/useRecruiterOffersStore';

interface RecruiterOffersTableProps {
  offers: RecruiterOfferItem[];
  onViewOfferPdf: (offer: RecruiterOfferItem) => void;
}

export function RecruiterOffersTable({ offers, onViewOfferPdf }: RecruiterOffersTableProps) {
  const {
    selectedOfferIds,
    toggleSelectOffer,
    selectAllOffers,
    clearSelection,
  } = useRecruiterOffersStore();

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const allSelected = offers.length > 0 && selectedOfferIds.length === offers.length;
  const isIndeterminate = selectedOfferIds.length > 0 && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAllOffers(offers.map((o) => o.id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return {
          label: 'Accepted',
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dot: 'bg-emerald-500',
        };
      case 'PENDING':
        return {
          label: 'Pending',
          color: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dot: 'bg-amber-500',
        };
      case 'DECLINED':
      case 'EXPIRED':
        return {
          label: 'Declined',
          color: 'bg-rose-50 text-rose-700 border-rose-200/80',
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

  if (offers.length === 0) {
    return (
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
          No Offers Found
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          No placement offers match your selected filter criteria. Try adjusting your status, college, or role filters.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all">
      <div className="overflow-x-auto [scrollbar-width:thin]">
        <table className="w-full text-left border-collapse min-w-[1050px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-black uppercase tracking-wider text-slate-500 font-heading">
              {/* Checkbox Column */}
              <th className="py-3.5 pl-4 sm:pl-5 pr-2 w-10">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="flex items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {allSelected ? (
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                  ) : isIndeterminate ? (
                    <div className="w-4 h-4 rounded-md border-2 border-blue-600 bg-blue-50 flex items-center justify-center">
                      <div className="w-2 h-0.5 bg-blue-600 rounded-sm" />
                    </div>
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>

              <th className="py-3.5 px-3">Student</th>
              <th className="py-3.5 px-3">Role</th>
              <th className="py-3.5 px-3">College</th>
              <th className="py-3.5 px-3">Batch</th>
              <th className="py-3.5 px-3">Offer Details</th>
              <th className="py-3.5 px-3">Status</th>
              <th className="py-3.5 px-3">Offer Date</th>
              <th className="py-3.5 pr-4 sm:pr-5 pl-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px]">
            {offers.map((offer) => {
              const isSelected = selectedOfferIds.includes(offer.id);
              const statusBadge = getStatusBadge(offer.status);

              return (
                <tr
                  key={offer.id}
                  className={`group transition-colors duration-150 hover:bg-slate-50/80 ${
                    isSelected ? 'bg-blue-50/40' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-3.5 pl-4 sm:pl-5 pr-2">
                    <button
                      type="button"
                      onClick={() => toggleSelectOffer(offer.id)}
                      className="flex items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </td>

                  {/* Student Info */}
                  <td className="py-3.5 px-3">
                    <Link
                      href={`/recruiter/applications/${offer.applicationId}`}
                      className="flex items-center gap-3 cursor-pointer group/name"
                    >
                      <Avatar className="h-9 w-9 rounded-xl border border-slate-200/90 shrink-0 group-hover/name:scale-105 transition-transform shadow-2xs">
                        {offer.student.avatarUrl && (
                          <AvatarImage src={offer.student.avatarUrl} alt={offer.student.name} />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-[#0A2540] to-blue-600 text-white font-bold text-xs rounded-xl">
                          {offer.student.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#0A2540] group-hover/name:text-blue-600 transition-colors truncate">
                            {offer.student.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium truncate">
                          {offer.student.email}
                        </p>
                        <span className="inline-block mt-0.5 text-[10px] font-bold text-slate-500">
                          CGPA: {offer.student.cgpa ? offer.student.cgpa.toFixed(1) : '8.6'}
                        </span>
                      </div>
                    </Link>
                  </td>

                  {/* Role & Type */}
                  <td className="py-3.5 px-3">
                    <div className="space-y-1 max-w-[180px]">
                      <span className="font-bold text-slate-800 block truncate">
                        {offer.designation}
                      </span>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        offer.job?.type === 'INTERNSHIP'
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {offer.job?.type === 'INTERNSHIP' ? 'Internship' : 'Full Time'}
                      </span>
                    </div>
                  </td>

                  {/* College */}
                  <td className="py-3.5 px-3">
                    <div className="font-medium text-slate-700 truncate max-w-[160px]">
                      {offer.college.name}
                    </div>
                  </td>

                  {/* Batch Year */}
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-600">
                      {offer.student.batchYear || '2026'}
                    </span>
                  </td>

                  {/* Offer Details: Package & Location */}
                  <td className="py-3.5 px-3">
                    <div className="space-y-0.5">
                      <span className="font-black text-[#0A2540] block">
                        {offer.salaryPackage}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {offer.location}
                      </span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-black ${statusBadge.color}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${statusBadge.dot}`} />
                      <span>{statusBadge.label}</span>
                    </span>
                  </td>

                  {/* Offer Date */}
                  <td className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                    {new Date(offer.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>

                  {/* Actions Kebab Menu */}
                  <td className="py-3.5 pr-4 sm:pr-5 pl-2 text-right relative">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === offer.id ? null : offer.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {activeMenuId === offer.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in-50 zoom-in-95 duration-150 text-xs font-bold"
                        >
                          <Link
                            href={`/recruiter/applications/${offer.applicationId}`}
                            className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            <span>View Application</span>
                          </Link>

                          <Link
                            href={`/recruiter/applications/${offer.applicationId}/offer`}
                            className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <FileText className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Manage / Edit Offer</span>
                          </Link>

                          {offer.letterUrl && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onViewOfferPdf(offer);
                              }}
                              className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5 text-emerald-600" />
                              <span>View Offer PDF</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
