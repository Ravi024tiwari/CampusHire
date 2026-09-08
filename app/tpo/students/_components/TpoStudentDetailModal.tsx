'use strict';
'use client';

import React from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  FileText,
  ExternalLink,
  Award,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { StudentRowData } from './TpoStudentsTable';

interface TpoStudentDetailModalProps {
  student: StudentRowData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TpoStudentDetailModal({
  student,
  isOpen,
  onClose,
}: TpoStudentDetailModalProps) {
  if (!isOpen || !student) return null;

  const initials = student.name
    ? student.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'ST';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            {student.avatarUrl ? (
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm text-white font-bold text-xl flex items-center justify-center border-2 border-white/40 shadow-md">
                {initials}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold tracking-tight">{student.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-xs">
                  {student.placementStatus}
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-0.5">{student.email}</p>
              <p className="text-xs text-blue-200 font-mono mt-1">
                Enrollment: {student.enrollmentNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          {/* Academic Profile */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Academic Details</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div>
                <p className="text-xs text-slate-400">Branch</p>
                <p className="text-sm font-bold text-slate-800">{student.branch}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Batch Year</p>
                <p className="text-sm font-bold text-slate-800">{student.batchYear}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">CGPA</p>
                <p className="text-sm font-bold text-blue-600">{student.cgpa?.toFixed(2) || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Account Status</p>
                <p className="text-sm font-bold text-emerald-600">
                  {student.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-600" />
              <span>Contact & Links</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${student.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                <span>{student.email}</span>
              </a>

              {student.phone && (
                <a
                  href={`tel:${student.phone}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{student.phone}</span>
                </a>
              )}

              {student.resumeUrl && (
                <a
                  href={student.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-semibold text-blue-700 transition-colors"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>View Official Resume</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                </a>
              )}
            </div>
          </div>

          {/* Skills Badges */}
          {student.skills && student.skills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Skills & Tech Stack</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {student.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Placement Offer Information if Placed */}
          {student.offerDetails && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Building className="w-4 h-4 text-emerald-600" />
                <span>Accepted Placement Offer</span>
              </h4>
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">
                    {student.offerDetails.companyName}
                  </h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {student.offerDetails.designation} • {student.offerDetails.location}
                  </p>
                  <p className="text-xs font-bold text-emerald-700 mt-1">
                    Package: {student.offerDetails.salaryPackage}
                  </p>
                </div>
                {student.offerDetails.letterUrl && (
                  <a
                    href={student.offerDetails.letterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 hover:bg-emerald-700 shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Offer Letter</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Recent Applications Pipeline */}
          {student.recentApplications && student.recentApplications.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Recent Applications ({student.applicationsCount})</span>
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {student.recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-3 bg-white flex items-center justify-between hover:bg-slate-50 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">{app.jobTitle}</p>
                      <p className="text-slate-400 text-[11px]">{app.companyName}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
