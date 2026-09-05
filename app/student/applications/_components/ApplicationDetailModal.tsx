'use client';

import React from 'react';
import { 
  X, 
  MapPin, 
  Briefcase, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { useStudentApplicationsStore } from '@/store/useStudentApplicationsStore';

export function ApplicationDetailModal() {
  const { selectedApplication, isDetailModalOpen, closeDetailModal } = useStudentApplicationsStore();

  if (!isDetailModalOpen || !selectedApplication) return null;

  const app = selectedApplication;

  const timelineSteps = [
    { label: 'Application Submitted', date: app.appliedDate, done: true },
    { 
      label: 'Under Review', 
      date: 'Recruiter Screening', 
      done: ['UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'ACCEPTED'].includes(app.status) 
    },
    { 
      label: 'Shortlisted for Next Round', 
      date: 'Profile Qualified', 
      done: ['SHORTLISTED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'ACCEPTED'].includes(app.status) 
    },
    { 
      label: 'Technical Interview', 
      date: app.status === 'INTERVIEW_SCHEDULED' ? 'Scheduled' : 'Completed', 
      done: ['INTERVIEW_SCHEDULED', 'OFFERED', 'ACCEPTED'].includes(app.status) 
    },
    { 
      label: 'Final Placement Offer', 
      date: app.offerDetails ? app.offerDetails.salaryPackage : 'Final Stage', 
      done: ['OFFERED', 'ACCEPTED'].includes(app.status) 
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto [scrollbar-width:thin]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10.5px] font-extrabold border border-blue-200/60">
                {app.mode}
              </span>
              <span className="text-xs font-bold text-slate-400">
                Applied on {app.appliedDate}
              </span>
            </div>

            <h2 className="text-xl font-black text-[#0A2540] font-heading mt-1.5 leading-tight">
              {app.title}
            </h2>
            <p className="text-sm font-semibold text-slate-500 mt-0.5">
              {app.company.name}
            </p>
          </div>

          <button
            type="button"
            onClick={closeDetailModal}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 font-semibold block text-[10.5px]">Package</span>
            <span className="font-extrabold text-[#0A2540]">{app.salaryPackage}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[10.5px]">Location</span>
            <span className="font-extrabold text-[#0A2540]">{app.location}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[10.5px]">Job Type</span>
            <span className="font-extrabold text-[#0A2540]">{app.type === 'FULL_TIME' ? 'Full Time' : 'Internship'}</span>
          </div>
        </div>

        {/* Application Pipeline Timeline */}
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
            Application Pipeline
          </h4>

          <div className="space-y-3 p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100">
            {timelineSteps.map((step, idx) => (
              <div key={step.label} className="flex items-center gap-3">
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    step.done
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                </div>
                <div className="min-w-0 flex-1 flex items-center justify-between">
                  <p className={`text-xs font-bold truncate ${step.done ? 'text-[#0A2540]' : 'text-slate-400'}`}>
                    {step.label}
                  </p>
                  <span className="text-[10.5px] font-medium text-slate-400">
                    {step.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Required */}
        {app.skills.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <h4 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
              Evaluated Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {app.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-blue-50/80 text-blue-700 text-xs font-bold border border-blue-200/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Offer Details Box (If Offered) */}
        {app.offerDetails && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-50/50 border border-teal-200 space-y-2">
            <div className="flex items-center gap-2 text-teal-800">
              <Award className="w-4 h-4" />
              <span className="text-xs font-extrabold">Official Placement Offer Issued</span>
            </div>
            <p className="text-xs text-teal-900 font-medium">
              Role: <strong className="font-extrabold">{app.offerDetails.designation}</strong> ({app.offerDetails.salaryPackage})
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={closeDetailModal}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
