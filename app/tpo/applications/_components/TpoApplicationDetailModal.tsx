'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { 
  X, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  Award, 
  DollarSign, 
  Calendar, 
  ShieldCheck,
  Loader2,
  Save
} from 'lucide-react';
import { TpoApplicationItem } from '../_types/tpo-applications.types';

interface TpoApplicationDetailModalProps {
  application: TpoApplicationItem | null;
  onClose: () => void;
  onStatusUpdated?: (updatedApp: TpoApplicationItem) => void;
}

export function TpoApplicationDetailModal({
  application,
  onClose,
  onStatusUpdated,
}: TpoApplicationDetailModalProps) {
  if (!application) return null;

  const [currentStatus, setCurrentStatus] = useState(application.status);
  const [notes, setNotes] = useState(application.notes || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    setSuccessMsg(false);
    try {
      const res = await axios.patch(`/api/tpo/applications/${application.id}`, {
        status: currentStatus,
        notes: notes.trim(),
      });
      if (res.data.success) {
        setSuccessMsg(true);
        if (onStatusUpdated) {
          onStatusUpdated({
            ...application,
            status: currentStatus,
            notes: notes.trim(),
          });
        }
        setTimeout(() => setSuccessMsg(false), 3000);
      }
    } catch (err) {
      console.error('Failed to update application status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const stages = [
    { id: 'APPLIED', label: 'Applied' },
    { id: 'UNDER_REVIEW', label: 'Under Review' },
    { id: 'SHORTLISTED', label: 'Shortlisted' },
    { id: 'INTERVIEW_SCHEDULED', label: 'Interview' },
    { id: 'OFFERED', label: 'Offered' },
  ];

  const getStageIndex = (status: string) => {
    const idx = stages.findIndex((s) => s.id === status);
    return idx >= 0 ? idx : 0;
  };

  const currentStageIdx = getStageIndex(currentStatus);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 my-auto flex flex-col max-h-[90vh]">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-xs font-bold text-slate-800">
              Application Dossier #{application.id.slice(-6).toUpperCase()}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* 1. Pipeline Timeline Visual */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
              Application Pipeline Progress
            </p>
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 z-0" />
              {stages.map((stage, idx) => {
                const isPassed = idx <= currentStageIdx;
                const isCurrent = idx === currentStageIdx;

                return (
                  <div key={stage.id} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                        isCurrent
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-[10.5px] font-bold text-slate-700 mt-1.5 text-center">
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Student & Job Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student Snapshot Card */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">Applicant Student</span>
                <Link
                  href={`/tpo/students/${application.student.id}`}
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Full Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                  {application.student.avatarUrl ? (
                    <img
                      src={application.student.avatarUrl}
                      alt={application.student.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold text-slate-700">
                      {application.student.name?.[0] || 'S'}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-slate-900 truncate">
                    {application.student.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold">
                    {application.student.branch} &bull; Batch {application.student.batchYear}
                  </p>
                  <p className="text-xs font-bold text-emerald-600 mt-0.5">
                    CGPA: {application.student.cgpa} / 10
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600 font-medium pt-1">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{application.student.email}</span>
                </p>
                {application.student.phone && (
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{application.student.phone}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Job Opportunity Snapshot */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">Recruitment Drive</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                  {application.job.type || 'Full Time'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 p-1 shrink-0 flex items-center justify-center">
                  {application.job.company?.logoUrl ? (
                    <img
                      src={application.job.company.logoUrl}
                      alt={application.job.company.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Building2 className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-slate-900 truncate">
                    {application.job.title}
                  </h4>
                  <p className="text-xs font-bold text-slate-600">
                    {application.job.company?.name}
                  </p>
                  <p className="text-xs font-bold text-blue-600 mt-0.5">
                    {application.job.salaryPackage}
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600 font-medium pt-1">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{application.job.location}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Applied on {formatDate(application.createdAt)}</span>
                </p>
              </div>
            </div>
          </div>

          {/* 3. Resume Link */}
          {application.resumeUrl && (
            <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Submitted Candidate Resume</p>
                  <p className="text-[11px] text-slate-500">Official verified PDF resume snapshot</p>
                </div>
              </div>
              <a
                href={application.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View PDF</span>
              </a>
            </div>
          )}

          {/* 4. TPO Stage & Notes Management */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800">TPO Status Management</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Update Stage</label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="APPLIED">Applied</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="SHORTLISTED">Shortlisted</option>
                  <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
                  <option value="OFFERED">Offered</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Internal Evaluation Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Cleared OA round..."
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {successMsg && (
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Application updated successfully!</span>
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleUpdateStatus}
            disabled={isUpdating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Status</span>
          </button>
        </div>
      </div>
    </div>
  );
}
