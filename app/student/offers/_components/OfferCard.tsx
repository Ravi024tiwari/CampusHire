'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Calendar,
  DollarSign,
  Download,
  Eye,
  FileText,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Gift,
  Award,
  Zap
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { OfferLetterViewerModal } from './OfferLetterViewerModal';

interface OfferCardProps {
  offer: any;
  isHighlighted?: boolean;
  onAccept: (offer: any) => void;
  onDecline: (offer: any) => void;
}

export function OfferCard({ offer, isHighlighted, onAccept, onDecline }: OfferCardProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  const isPending = offer.status === 'PENDING';
  const isAccepted = offer.status === 'ACCEPTED';
  const isDeclined = offer.status === 'DECLINED';

  // Live countdown timer
  useEffect(() => {
    if (!offer.expiresAt || !isPending) return;

    const calculateTimeLeft = () => {
      const diff = new Date(offer.expiresAt).getTime() - new Date().getTime();
      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [offer.expiresAt, isPending]);

  return (
    <>
      <div
        id={`offer-card-${offer.id}`}
        className={`relative rounded-3xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl ${
          isHighlighted ? 'ring-3 ring-blue-500 shadow-2xl shadow-blue-500/20' : ''
        } ${
          isAccepted
            ? 'bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 border-emerald-300 ring-2 ring-emerald-500/20'
            : isDeclined
            ? 'bg-slate-50/80 border-slate-200 opacity-75'
            : 'bg-white border-slate-200 hover:border-blue-300'
        }`}
      >
        {/* Top Status & Urgency Banner */}
        <div
          className={`px-4 sm:px-6 py-3 border-b flex flex-wrap items-center justify-between gap-2 text-xs font-black ${
            isAccepted
              ? 'bg-emerald-500/10 border-emerald-200 text-emerald-800'
              : isDeclined
              ? 'bg-slate-100 border-slate-200 text-slate-600'
              : 'bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-blue-50/90 border-blue-100 text-blue-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {isAccepted ? (
              <>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>OFFICIALLY PLACED & ACCEPTED</span>
              </>
            ) : isDeclined ? (
              <>
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>OFFER DECLINED</span>
              </>
            ) : (
              <>
                <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span>OFFICIAL ON-CAMPUS PLACEMENT OFFER</span>
              </>
            )}
          </div>

          {/* Live Countdown Timer */}
          {isPending && timeLeft && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300 text-[11px] font-black shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-amber-700 animate-spin" />
              <span>Response Window: </span>
              <span className="font-mono font-black text-amber-950">
                {timeLeft.days > 0 && `${timeLeft.days}d `}
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          )}

          {isPending && isExpired && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-100 text-rose-700 border border-rose-200">
              Offer Expired
            </span>
          )}

          {isAccepted && offer.acceptedAt && (
            <span className="text-[11px] font-bold text-emerald-700">
              Accepted on {new Date(offer.acceptedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>

        {/* Main Content Body */}
        <div className="p-4 sm:p-6 lg:p-7 space-y-6">
          
          {/* Header Row: Company Avatar, Title, Package */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl border-2 border-slate-100 shadow-md shrink-0">
                {offer.company?.logoUrl && (
                  <AvatarImage src={offer.company.logoUrl} alt={offer.company.name} className="object-contain" />
                )}
                <AvatarFallback className="bg-gradient-to-br from-[#0A2540] to-blue-600 text-white font-black text-xl rounded-2xl">
                  {offer.company?.name?.charAt(0) || 'C'}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-xl font-black text-[#0A2540] tracking-tight font-heading truncate">
                    {offer.designation}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-semibold mt-1">
                  <span className="text-blue-600 font-bold">{offer.company?.name}</span>
                  <span>•</span>
                  <span>{offer.company?.industry || 'Technology & Engineering'}</span>
                  <span>•</span>
                  <span>{offer.college?.name || 'On-Campus Placement'}</span>
                </div>
              </div>
            </div>

            {/* Compensation Card */}
            <div className="sm:text-right bg-gradient-to-br from-slate-50 to-blue-50/30 px-5 py-3 rounded-2xl border border-slate-200/90 shrink-0 self-start sm:self-auto shadow-2xs">
              <span className="text-[10px] text-slate-400 font-extrabold block uppercase tracking-wider">Annual Package (CTC)</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">{offer.salaryPackage}</span>
            </div>
          </div>

          {/* Key Offer Attributes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 text-xs">
            
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 text-[10.5px] font-bold block">Job Location</span>
                <span className="font-extrabold text-slate-800">{offer.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 text-[10.5px] font-bold block">Joining Schedule</span>
                <span className="font-extrabold text-slate-800">
                  {offer.joiningDate
                    ? new Date(offer.joiningDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                    : 'To be scheduled'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 text-[10.5px] font-bold block">Placement Authority</span>
                <span className="font-extrabold text-slate-800 truncate">{offer.college?.name || 'TPO Placement Cell'}</span>
              </div>
            </div>

          </div>

          {/* Recruiter Notes / Remarks */}
          {offer.notes && (
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 text-xs space-y-1">
              <span className="font-extrabold text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Recruiter Remarks & Terms:
              </span>
              <p className="font-medium text-slate-700 leading-relaxed">{offer.notes}</p>
            </div>
          )}

          {/* Action Buttons Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
            
            {/* PDF View / Download Trigger */}
            <div className="flex items-center gap-2">
              {offer.letterUrl ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsViewerOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition shadow-2xs hover:border-blue-400 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>View Offer Letter</span>
                  </button>

                  <a
                    href={offer.letterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition shadow-2xs"
                    title="Download Official PDF"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </>
              ) : (
                <span className="text-xs text-slate-400 italic">Official PDF details recorded electronically</span>
              )}
            </div>

            {/* Status Actions */}
            {isPending && (
              <div className="flex items-center gap-2.5 self-end sm:self-auto w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onDecline(offer)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 border border-rose-200 transition cursor-pointer"
                >
                  Decline Offer
                </button>

                <button
                  type="button"
                  onClick={() => onAccept(offer)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Review & Accept Offer</span>
                </button>
              </div>
            )}

            {isAccepted && (
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-800 bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Placed Candidate • Acceptance Contract Verified</span>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Embedded Offer Letter Document Viewer Modal */}
      {isViewerOpen && (
        <OfferLetterViewerModal
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          offer={offer}
        />
      )}
    </>
  );
}
