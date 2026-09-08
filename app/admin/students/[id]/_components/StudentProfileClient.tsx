'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { useAdminStore } from '@/store/useAdminStore';
import { 
  StudentProfileHeader, 
  type StudentDossierData 
} from './StudentProfileHeader';
import { StudentProfileStats } from './StudentProfileStats';
import { 
  StudentProfileNavTabs, 
  type StudentProfileTabType 
} from './StudentProfileNavTabs';
import { StudentOverviewTab } from './StudentOverviewTab';
import { StudentApplicationsTab } from './StudentApplicationsTab';
import { StudentOffersTab } from './StudentOffersTab';
import { AlertCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface StudentProfileClientProps {
  studentId: string;
}

export function StudentProfileClient({ studentId }: StudentProfileClientProps) {
  const router = useRouter();
  const { setToast } = useAdminStore();

  const [student, setStudent] = useState<StudentDossierData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<StudentProfileTabType>('overview');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Fetch Student Dossier
  const fetchStudentData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<ApiResponse<StudentDossierData>>(
        `/api/admin/students/${studentId}`
      );

      if (response.data.success && response.data.data) {
        setStudent(response.data.data);
      } else {
        setError(response.data.message || 'Failed to load candidate dossier');
      }
    } catch (err: any) {
      console.error('Error fetching student dossier:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch student details');
    } finally {
      setIsLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  // Handle Account Status Toggle
  const handleToggleStatus = async () => {
    if (!student) return;
    const nextStatus = !student.isActive;

    setIsUpdatingStatus(true);
    try {
      const response = await apiClient.patch<ApiResponse<{ updated: boolean }>>(
        `/api/admin/students/${student.id}`,
        { isActive: nextStatus }
      );

      if (response.data.success) {
        setStudent((prev) => (prev ? { ...prev, isActive: nextStatus } : prev));
        setToast({
          type: 'success',
          message: `Candidate account ${nextStatus ? 'activated' : 'deactivated'} successfully!`,
        });
      }
    } catch (err: any) {
      console.error('Status update failed:', err);
      setToast({
        type: 'error',
        message: err.response?.data?.message || 'Failed to update candidate status',
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSendMessage = () => {
    if (!student) return;
    setToast({
      type: 'info',
      message: `Direct messaging channel opened for ${student.name} (${student.email})`,
    });
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 animate-pulse">
        <div className="h-6 w-36 bg-slate-200 rounded-md" />
        <div className="h-44 bg-slate-200 rounded-3xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-slate-200 rounded-2xl" />
          ))}
        </div>
        <div className="h-96 bg-slate-200 rounded-3xl" />
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
        <div className="bg-white rounded-3xl border border-rose-200 p-12 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-black text-[#0A2540] font-heading">
            {error || 'Student Profile Not Found'}
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            The candidate record may have been archived or does not exist in the database.
          </p>
          <Link
            href="/admin/students"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D8B8A] text-white font-bold text-xs shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Students Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      
      {/* 1. Profile Header & Contact Card */}
      <StudentProfileHeader
        student={student}
        onToggleStatus={handleToggleStatus}
        onSendMessage={handleSendMessage}
        isUpdatingStatus={isUpdatingStatus}
      />

      {/* 2. Top 4 Placement KPI Badges */}
      <StudentProfileStats stats={student.stats} />

      {/* 3. Navigation Tabs */}
      <StudentProfileNavTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        applicationsCount={student.applications?.length || 0}
        interviewsCount={student.stats?.totalInterviews || 0}
        offersCount={student.offers?.length || 0}
      />

      {/* 4. Tab Content Body */}
      {activeTab === 'overview' && (
        <StudentOverviewTab
          student={student}
          onSendMessage={handleSendMessage}
          onToggleStatus={handleToggleStatus}
          isUpdatingStatus={isUpdatingStatus}
        />
      )}

      {activeTab === 'academic' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 space-y-5">
            <h3 className="text-base font-black text-[#0A2540] font-heading pb-3 border-b border-slate-100">
              Complete Academic Transcript & Enrollment Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Institution</span>
                <p className="text-sm font-bold text-slate-800">{student.college.name}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Degree / Branch</span>
                <p className="text-sm font-bold text-slate-800">{student.branch}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Batch Year</span>
                <p className="text-sm font-bold text-slate-800">{student.batchYear}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Cumulative GPA</span>
                <p className="text-base font-black text-[#0D8B8A] font-heading">{student.cgpa} / 10</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Secondary (10th)</span>
                <p className="text-sm font-bold text-slate-800">{student.tenthPercentage || 96}%</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Higher Secondary (12th)</span>
                <p className="text-sm font-bold text-slate-800">{student.twelfthPercentage || 93}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'skills_projects' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 space-y-4">
            <h3 className="text-base font-black text-[#0A2540] font-heading">
              Technical Competencies & Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-800 font-bold text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 space-y-4">
            <h3 className="text-base font-black text-[#0A2540] font-heading">
              Featured Portfolio Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(student.projects || []).map((p) => (
                <div key={p.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <h4 className="text-sm font-black text-[#0A2540] font-heading">{p.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(p.techStack || []).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-semibold text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <StudentApplicationsTab applications={student.applications} />
      )}

      {activeTab === 'interviews' && (
        <StudentApplicationsTab
          applications={student.applications.filter((a) =>
            ['INTERVIEW_SCHEDULED', 'SHORTLISTED', 'OFFERED', 'ACCEPTED'].includes(a.status)
          )}
        />
      )}

      {activeTab === 'offers' && (
        <StudentOffersTab offers={student.offers} />
      )}

      {activeTab === 'placement' && (
        <StudentOffersTab
          offers={student.offers.filter((o) => o.status === 'ACCEPTED')}
        />
      )}

      {activeTab === 'activity_logs' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 space-y-4">
          <h3 className="text-base font-black text-[#0A2540] font-heading pb-3 border-b border-slate-100">
            Chronological Platform Audit Trail
          </h3>
          <div className="space-y-4">
            {student.activityStream.map((act) => (
              <div key={act.id} className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0D8B8A] mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-800">{act.title}</p>
                  <span className="text-[11px] text-slate-400 font-medium">{act.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
