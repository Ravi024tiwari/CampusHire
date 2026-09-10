'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { CollegeItem, CollegeDetail } from '../_types/recruiter-colleges.types';
import { 
  Building2, 
  CheckCircle2, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Users, 
  Briefcase, 
  X, 
  ExternalLink, 
  Loader2, 
  ShieldCheck, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  UserCheck,
  Award,
  TrendingUp,
  Maximize2
} from 'lucide-react';

interface RecruiterCollegeDossierModalProps {
  collegeId: string | null;
  onClose: () => void;
  initialCollege?: CollegeItem | null;
}

export function RecruiterCollegeDossierModal({
  collegeId,
  onClose,
  initialCollege,
}: RecruiterCollegeDossierModalProps) {
  const [detail, setDetail] = useState<CollegeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collegeId) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    async function fetchDetails() {
      try {
        const response = await apiClient.get<ApiResponse<CollegeDetail>>(`/api/colleges/${collegeId}`);
        if (isMounted && response.data.success && response.data.data) {
          setDetail(response.data.data);
        } else if (isMounted && initialCollege) {
          setDetail({
            ...initialCollege,
            placementStats: {
              enrolledStudents: initialCollege._count?.students || 0,
              placedStudents: 0,
              totalOffers: initialCollege._count?.offers || 0,
              totalApplications: 0,
              placementRate: 0,
              activeDrives: initialCollege._count?.jobs || 0,
            },
          });
        }
      } catch (err: any) {
        if (isMounted) {
          if (initialCollege) {
            setDetail({
              ...initialCollege,
              placementStats: {
                enrolledStudents: initialCollege._count?.students || 0,
                placedStudents: 0,
                totalOffers: initialCollege._count?.offers || 0,
                totalApplications: 0,
                placementRate: 0,
                activeDrives: initialCollege._count?.jobs || 0,
              },
            });
          } else {
            setError(err.message || 'Failed to load college details');
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchDetails();
    return () => {
      isMounted = false;
    };
  }, [collegeId]);

  if (!collegeId) return null;

  const displayCollege = detail || initialCollege;
  const collegeName = displayCollege?.name || 'Partner University';
  const collegeCode = displayCollege?.code || 'INST';
  const logoUrl = displayCollege?.logoUrl;
  const tpos = detail?.tpos || [];
  const jobs = detail?.jobs || [];
  const stats = detail?.placementStats || {
    enrolledStudents: displayCollege?._count?.students || 0,
    placedStudents: 0,
    totalOffers: 0,
    totalApplications: 0,
    placementRate: 0,
    activeDrives: displayCollege?._count?.jobs || 0,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Darkened Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top Header Hero Banner */}
        <div className="relative bg-gradient-to-r from-slate-950 via-[#0A2540] to-slate-950 text-white p-5 sm:p-6 pb-6 overflow-hidden shrink-0 border-b border-white/10">
          {/* Animated Ambient Glow Orbs */}
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-500/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-10 left-1/3 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

          {/* Action Buttons (Open Full Page & Close) */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
            <Link
              href={`/recruiter/colleges/${collegeId}`}
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold"
              title="Open full dedicated page"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full Page</span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative z-10 flex items-start gap-4">
            {/* University Crest */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1.5 shadow-lg border border-white/20 shrink-0 overflow-hidden flex items-center justify-center">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={collegeName}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              ) : (
                <GraduationCap className="w-8 h-8 text-[#2563EB]" />
              )}
            </div>

            {/* University Identity */}
            <div className="min-w-0 flex-1 space-y-1 pr-16 sm:pr-24">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold font-heading text-white truncate drop-shadow-xs">
                  {collegeName}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 text-[10.5px] font-bold backdrop-blur-md">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Verified Campus
                </span>
              </div>

              <p className="text-xs text-slate-300 font-mono font-semibold flex items-center gap-1.5">
                <span>Code: {collegeCode}</span>
                {displayCollege?.city && (
                  <>
                    <span>•</span>
                    <span>{displayCollege.city}, {displayCollege.state}</span>
                  </>
                )}
              </p>

              {displayCollege?.domain && (
                <div className="pt-0.5">
                  <a
                    href={`https://${displayCollege.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11.5px] text-cyan-300 hover:text-white font-medium transition-colors"
                  >
                    <Globe className="w-3 h-3" />
                    <span>{displayCollege.domain}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-75" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 [scrollbar-width:thin]">
          
          {/* Quick Metrics Bar with Placed Students & Placement Rate */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Student Pool
              </span>
              <span className="text-base sm:text-lg font-extrabold font-heading text-[#0A2540]">
                {stats.enrolledStudents}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Placed Students
              </span>
              <span className="text-base sm:text-lg font-extrabold font-heading text-emerald-600">
                {stats.placedStudents}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Placement Drives
              </span>
              <span className="text-base sm:text-lg font-extrabold font-heading text-[#2563EB]">
                {stats.activeDrives}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                TPO Officers
              </span>
              <span className="text-base sm:text-lg font-extrabold font-heading text-purple-600">
                {tpos.length || displayCollege?._count?.tpos || 1}
              </span>
            </div>
          </div>

          {/* Section 1: Departmental TPO Placement Team */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#2563EB]" />
              University Placement Cell Officers
            </h3>

            {isLoading && !detail ? (
              <div className="py-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
                <span>Loading placement officer credentials...</span>
              </div>
            ) : tpos.length === 0 ? (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
                Institutional placement cell contact registered at central administrative office.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tpos.map((tpo) => (
                  <div
                    key={tpo.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all flex items-start gap-3 shadow-2xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {tpo.user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-[#0A2540] truncate">{tpo.user.name}</span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[8.5px] font-bold shrink-0">
                          Active TPO
                        </span>
                      </div>
                      <p className="text-[10.5px] text-[#2563EB] font-medium truncate">
                        {tpo.designation || 'Training & Placement Officer'}
                      </p>
                      <a
                        href={`mailto:${tpo.user.email}`}
                        className="inline-flex items-center gap-1 text-[10.5px] text-slate-500 hover:text-[#2563EB] truncate pt-0.5"
                      >
                        <Mail className="w-3 h-3 shrink-0 text-slate-400" />
                        <span className="truncate">{tpo.user.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Recent Campus Drives */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-purple-600" />
              Active / Scheduled Campus Placement Campaigns
            </h3>

            {isLoading && !detail ? (
              <div className="py-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                <span>Loading recent campus drives...</span>
              </div>
            ) : jobs.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-1">
                <p className="text-xs font-bold text-slate-700">No live campaigns active currently</p>
                <p className="text-[11px] text-slate-500">
                  Your corporate recruitment team can schedule a new exclusive hiring drive with this university.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                        {job.company?.logoUrl ? (
                          <img src={job.company.logoUrl} alt="" className="w-5 h-5 object-contain" />
                        ) : (
                          <Building2 className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-[#0A2540] block">{job.title}</span>
                        <span className="text-[10px] text-slate-500">{job.company?.name || 'Company Partner'}</span>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold text-xs">
                      {job.salaryPackage}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <Link
            href={`/recruiter/colleges/${collegeId}`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline"
          >
            <span>View Full Institutional Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer transition-colors"
            >
              Close
            </button>
            <a
              href={`mailto:${displayCollege?.contactEmail || tpos[0]?.user.email || 'placement@university.edu'}?subject=Campus Hiring Partnership - Placement Drive Inquiry`}
              className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-bold text-white shadow-md shadow-blue-600/20 inline-flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Placement Office</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
