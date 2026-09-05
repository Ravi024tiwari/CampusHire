'use client';

import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Briefcase, 
  Award, 
  ChevronRight,
  Sparkles,
  Building2,
  AlertCircle
} from 'lucide-react';
import { AppliedJobItem, useStudentApplicationsStore } from '@/store/useStudentApplicationsStore';
import { Card } from '@/components/ui/card';

interface AppliedJobsCardProps {
  application: AppliedJobItem;
}

export function AppliedJobsCard({ application }: AppliedJobsCardProps) {
  const { openDetailModal, openWithdrawModal } = useStudentApplicationsStore();

  // Status Badge Styling
  const getStatusBadge = () => {
    switch (application.displayStatus) {
      case 'Under Review':
        return {
          bg: 'bg-amber-50/90 text-amber-700 border-amber-200/80',
          dot: 'bg-amber-500',
        };
      case 'Shortlisted':
        return {
          bg: 'bg-purple-50/90 text-purple-700 border-purple-200/80',
          dot: 'bg-purple-500',
        };
      case 'Interviewing':
        return {
          bg: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80',
          dot: 'bg-emerald-500',
        };
      case 'Offer':
      case 'Accepted':
        return {
          bg: 'bg-teal-50/90 text-teal-700 border-teal-200/80',
          dot: 'bg-teal-500',
        };
      case 'Rejected':
      case 'Declined':
        return {
          bg: 'bg-rose-50/90 text-rose-700 border-rose-200/80',
          dot: 'bg-rose-500',
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
        };
    }
  };

  // Company Brand Logo or Stylized Emblem
  const renderCompanyLogo = () => {
    const name = application.company.name.toLowerCase();

    if (name.includes('google')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200/80 p-2 flex items-center justify-center shrink-0 shadow-2xs">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
        </div>
      );
    }

    if (name.includes('microsoft')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200/80 p-2 flex items-center justify-center shrink-0 shadow-2xs">
          <div className="grid grid-cols-2 gap-1 w-6 h-6">
            <div className="bg-[#F25022] rounded-xs" />
            <div className="bg-[#7FBA00] rounded-xs" />
            <div className="bg-[#00A4EF] rounded-xs" />
            <div className="bg-[#FFB900] rounded-xs" />
          </div>
        </div>
      );
    }

    if (name.includes('tcs') || name.includes('tata')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-purple-800 to-indigo-900 border border-slate-200/80 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-2xs tracking-tighter">
          TCS
        </div>
      );
    }

    if (name.includes('swiggy')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-[#FC8019] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
          <span className="font-heading">S</span>
        </div>
      );
    }

    if (name.includes('zoho')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200/80 p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
          <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
            <div className="bg-red-500 rounded-xs" />
            <div className="bg-green-500 rounded-xs" />
            <div className="bg-blue-500 rounded-xs" />
            <div className="bg-amber-400 rounded-xs" />
          </div>
        </div>
      );
    }

    if (name.includes('phonepe')) {
      return (
        <div className="h-11 w-11 rounded-2xl bg-[#5f259f] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
          <span className="font-heading font-black">पे</span>
        </div>
      );
    }

    // Default stylized gradient fallback
    return (
      <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-[#0A2540] to-blue-600 text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-2xs">
        {application.company.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  const statusStyle = getStatusBadge();
  const isWithdrawable = ['APPLIED', 'UNDER_REVIEW', 'SHORTLISTED'].includes(application.status);
  const isInterviewing = application.status === 'INTERVIEW_SCHEDULED';
  const isOffered = application.status === 'OFFERED' || application.status === 'ACCEPTED';

  return (
    <Card className="flex flex-col justify-between p-4 sm:p-5 rounded-3xl border border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
      
      {/* Top Header Row: Company Logo + Badges */}
      <div>
        <div className="flex items-start justify-between gap-2.5">
          {renderCompanyLogo()}

          {/* Badges Stack: Mode + Status */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5">
            {/* Campus Mode Badge */}
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                application.mode === 'On-campus'
                  ? 'bg-blue-50/80 text-blue-700 border-blue-200/60'
                  : 'bg-purple-50/80 text-purple-700 border-purple-200/60'
              }`}
            >
              {application.mode}
            </span>

            {/* Application Status Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold border shadow-2xs ${statusStyle.bg}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
              <span>{application.displayStatus}</span>
            </span>
          </div>
        </div>

        {/* Middle Section: Job Title, Company, Location, Date */}
        <div className="mt-3.5 space-y-1">
          <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading leading-tight group-hover:text-blue-600 transition-colors">
            {application.title}
          </h3>

          <p className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-1">
            <span>{application.company.name}</span>
          </p>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 pt-1.5 flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{application.location}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>{application.type === 'FULL_TIME' ? 'Full Time' : application.type === 'INTERNSHIP' ? 'Internship' : 'Intern + FTE'}</span>
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 pt-1">
            <span>Applied on {application.appliedDate}</span>
            <span className="font-bold text-slate-700">{application.salaryPackage}</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions Row */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* View Details Button (Permanent vibrant blue on mobile, hover on desktop) */}
        <button
          type="button"
          onClick={() => openDetailModal(application)}
          className="flex-1 py-2.5 px-3 rounded-xl border bg-[#2563EB] text-white border-[#2563EB] shadow-xs sm:bg-slate-50/80 sm:text-[#0A2540] sm:border-slate-200/90 sm:hover:bg-[#2563EB] sm:hover:text-white sm:hover:border-[#2563EB] sm:hover:shadow-md sm:hover:shadow-blue-500/25 text-xs font-extrabold transition-all duration-200 cursor-pointer text-center active:scale-95"
        >
          View Details
        </button>

        {/* Contextual Second Action */}
        {isOffered ? (
          <button
            type="button"
            onClick={() => openDetailModal(application)}
            className="flex-1 py-2.5 px-3 rounded-xl border bg-teal-600 text-white border-teal-600 shadow-xs sm:bg-teal-50/90 sm:text-teal-700 sm:border-teal-200/80 sm:hover:bg-teal-600 sm:hover:text-white sm:hover:border-teal-600 sm:hover:shadow-md sm:hover:shadow-teal-500/20 text-xs font-extrabold transition-all duration-200 cursor-pointer text-center active:scale-95"
          >
            View Offer
          </button>
        ) : isInterviewing ? (
          <button
            type="button"
            onClick={() => openDetailModal(application)}
            className="flex-1 py-2.5 px-3 rounded-xl border bg-emerald-600 text-white border-emerald-600 shadow-xs sm:bg-emerald-50/90 sm:text-emerald-700 sm:border-emerald-200/80 sm:hover:bg-emerald-600 sm:hover:text-white sm:hover:border-emerald-600 sm:hover:shadow-md sm:hover:shadow-emerald-500/20 text-xs font-extrabold transition-all duration-200 cursor-pointer text-center active:scale-95"
          >
            View Interview
          </button>
        ) : isWithdrawable ? (
          <button
            type="button"
            onClick={() => openWithdrawModal(application)}
            className="py-2.5 px-3.5 rounded-xl border bg-rose-600 text-white border-rose-600 shadow-xs sm:bg-rose-50/90 sm:text-rose-700 sm:border-rose-200/80 sm:hover:bg-rose-600 sm:hover:text-white sm:hover:border-rose-600 sm:hover:shadow-md sm:hover:shadow-rose-500/20 text-xs font-extrabold transition-all duration-200 cursor-pointer text-center active:scale-95"
          >
            Withdraw
          </button>
        ) : null}
      </div>

    </Card>
  );
}
