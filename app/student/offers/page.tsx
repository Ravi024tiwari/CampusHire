'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import {
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Loader2,
  ArrowRight,
  RefreshCw,
  Search,
  Trophy,
  Zap,
  TrendingUp,
  Download,
  Share2,
} from 'lucide-react';
import { OfferCard } from './_components/OfferCard';
import { DigitalAcceptanceModal } from './_components/DigitalAcceptanceModal';
import { DeclineOfferModal } from './_components/DeclineOfferModal';
import { StudentOfferKpiStats } from './_components/StudentOfferKpiStats';

function StudentOffersPageContent() {
  const searchParams = useSearchParams();
  const queryOfferId = searchParams.get('offerId');
  const queryAction = searchParams.get('action'); // 'accept' | 'decline' | 'review'

  const [offers, setOffers] = useState<any[]>([]);
  const [student, setStudent] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOfferForAccept, setSelectedOfferForAccept] = useState<any | null>(null);
  const [selectedOfferForDecline, setSelectedOfferForDecline] = useState<any | null>(null);
  const [highlightedOfferId, setHighlightedOfferId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'ACCEPTED' | 'DECLINED'>('ALL');

  const hasHandledQueryRef = useRef(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 6000);
  };

  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get<ApiResponse<{ student: any; offers: any[] }>>('/api/student/offers');
      if (res.data?.success && res.data.data) {
        setOffers(res.data.data.offers || []);
        setStudent(res.data.data.student || null);
      } else {
        showToast(res.data?.message || 'Failed to load offers', 'error');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || err.message || 'Error fetching placement offers', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Deep-link handling when coming from an email action click
  useEffect(() => {
    if (offers.length > 0 && queryOfferId && !hasHandledQueryRef.current) {
      hasHandledQueryRef.current = true;
      const targetOffer = offers.find(
        (o) =>
          o.id === queryOfferId ||
          o.applicationId === queryOfferId ||
          o.application?.id === queryOfferId
      );

      if (targetOffer) {
        setHighlightedOfferId(targetOffer.id);

        if (queryAction === 'accept') {
          if (targetOffer.status === 'PENDING') {
            setActiveTab('PENDING');
            setSelectedOfferForAccept(targetOffer);
          } else if (targetOffer.status === 'ACCEPTED') {
            setActiveTab('ACCEPTED');
            showToast(`You have already accepted the offer from ${targetOffer.company?.name || 'the company'}.`, 'success');
          } else if (targetOffer.status === 'DECLINED') {
            setActiveTab('DECLINED');
            showToast(`This offer from ${targetOffer.company?.name || 'the company'} was previously declined.`, 'error');
          }
        } else if (queryAction === 'decline') {
          if (targetOffer.status === 'PENDING') {
            setActiveTab('PENDING');
            setSelectedOfferForDecline(targetOffer);
          } else if (targetOffer.status === 'DECLINED') {
            setActiveTab('DECLINED');
            showToast(`You have already declined this offer.`, 'error');
          } else if (targetOffer.status === 'ACCEPTED') {
            setActiveTab('ACCEPTED');
            showToast(`Cannot decline: this offer is already accepted and locked.`, 'error');
          }
        } else if (queryAction === 'review') {
          if (targetOffer.status === 'ACCEPTED') setActiveTab('ACCEPTED');
          else if (targetOffer.status === 'DECLINED') setActiveTab('DECLINED');
          else setActiveTab('PENDING');
        }

        // Smooth scroll into focus
        setTimeout(() => {
          const el = document.getElementById(`offer-card-${targetOffer.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }
    }
  }, [offers, queryOfferId, queryAction]);

  const pendingOffers = offers.filter((o) => o.status === 'PENDING');
  const acceptedOffer = offers.find((o) => o.status === 'ACCEPTED');
  const declinedOffers = offers.filter((o) => o.status === 'DECLINED' || o.status === 'EXPIRED');

  const filteredOffers = offers.filter((o) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'PENDING') return o.status === 'PENDING';
    if (activeTab === 'ACCEPTED') return o.status === 'ACCEPTED';
    if (activeTab === 'DECLINED') return o.status === 'DECLINED' || o.status === 'EXPIRED';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-3.5 sm:p-6 lg:p-8 font-sans max-w-[1500px] mx-auto space-y-6">
      
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-xs font-bold transition-all animate-in fade-in slide-in-from-top-4 ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200">
              Campus Placement Cell
            </span>
            <span className="text-xs text-slate-400 font-medium">•</span>
            <span className="text-xs text-slate-500 font-bold">{student?.college?.name || 'Institutional Drive'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight font-heading mt-1 flex items-center gap-3">
            <Award className="w-7 h-7 text-blue-600" />
            My Placement Offers & Contracts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Review official placement offers, download signed letters, and complete your digital acceptance.
          </p>
        </div>

        <button
          onClick={fetchOffers}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition shadow-2xs cursor-pointer self-start md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
          <span>Refresh Offers</span>
        </button>
      </div>

      {/* Live Placement KPI Metrics Bar with Smooth Scrolling Controls */}
      <StudentOfferKpiStats
        offers={offers}
        pendingOffers={pendingOffers}
        acceptedOffer={acceptedOffer}
      />

      {/* Celebratory Hero Banner (If Candidate is Placed) */}
      {acceptedOffer && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 p-6 sm:p-8 text-white shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black text-white border border-white/30 shadow-xs">
                <PartyPopper className="w-4 h-4 text-amber-300" />
                <span>CAMPUS PLACEMENT CONFIRMED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Heartiest Congratulations, {student?.name}! 🎓
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl font-medium leading-relaxed">
                You have officially accepted the placement offer for <strong>{acceptedOffer.designation}</strong> at{' '}
                <strong>{acceptedOffer.company?.name}</strong> ({acceptedOffer.salaryPackage}, {acceptedOffer.location}). Your placement contract is locked and recorded with the institutional TPO cell.
              </p>
            </div>

            {acceptedOffer.letterUrl && (
              <a
                href={acceptedOffer.letterUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-black shadow-lg transition shrink-0 self-start md:self-center cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Download Accepted Offer PDF</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Filter Tabs & Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-2xl bg-slate-200/60 border border-slate-200">
          {(
            [
              { label: 'All Offers', value: 'ALL', count: offers.length },
              { label: 'Pending Action', value: 'PENDING', count: pendingOffers.length },
              { label: 'Accepted', value: 'ACCEPTED', count: acceptedOffer ? 1 : 0 },
              { label: 'Declined', value: 'DECLINED', count: declinedOffers.length },
            ] as const
          ).map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.value
                  ? 'bg-white text-[#0A2540] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-md text-[10.5px] font-black ${
                  activeTab === tab.value ? 'bg-blue-50 text-blue-700' : 'bg-slate-300/60 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {pendingOffers.length > 0 && (
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 px-3.5 py-2 rounded-2xl border border-amber-200">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Action Required: {pendingOffers.length} pending offer awaiting your decision</span>
          </div>
        )}
      </div>

      {/* Offers List Feed */}
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-48 bg-slate-200 rounded-3xl" />
          <div className="h-48 bg-slate-200 rounded-3xl" />
        </div>
      ) : filteredOffers.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-4 max-w-lg mx-auto">
          <div className="h-16 w-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#0A2540]">No Offers in this Category</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {activeTab === 'PENDING'
                ? 'You have no pending offers awaiting action right now.'
                : 'Keep applying to on-campus placement drives to unlock job offers.'}
            </p>
          </div>
          <Link
            href="/student/jobs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
          >
            <span>Browse Active Drives</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              isHighlighted={highlightedOfferId === offer.id}
              onAccept={(off) => setSelectedOfferForAccept(off)}
              onDecline={(off) => setSelectedOfferForDecline(off)}
            />
          ))}
        </div>
      )}

      {/* Digital Acceptance Modal */}
      {selectedOfferForAccept && student && (
        <DigitalAcceptanceModal
          isOpen={!!selectedOfferForAccept}
          onClose={() => setSelectedOfferForAccept(null)}
          offer={selectedOfferForAccept}
          student={{
            name: student.name,
            email: student.email,
            enrollmentNumber: student.enrollmentNumber,
          }}
          onSuccess={(msg) => {
            showToast(msg, 'success');
            fetchOffers();
          }}
        />
      )}

      {/* Decline Offer Modal */}
      {selectedOfferForDecline && (
        <DeclineOfferModal
          isOpen={!!selectedOfferForDecline}
          onClose={() => setSelectedOfferForDecline(null)}
          offer={selectedOfferForDecline}
          onSuccess={(msg) => {
            showToast(msg, 'success');
            fetchOffers();
          }}
        />
      )}

    </div>
  );
}

export default function StudentOffersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50/50 p-6 max-w-[1500px] mx-auto flex items-center justify-center">
          <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <span>Loading Placement Offers...</span>
          </div>
        </div>
      }
    >
      <StudentOffersPageContent />
    </Suspense>
  );
}
