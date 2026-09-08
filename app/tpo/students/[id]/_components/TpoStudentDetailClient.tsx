'use strict';
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  StudentProfileHeader, 
  type StudentDossierData 
} from '@/app/admin/students/[id]/_components/StudentProfileHeader';
import { StudentProfileStats } from '@/app/admin/students/[id]/_components/StudentProfileStats';
import { 
  StudentProfileNavTabs, 
  type StudentProfileTabType 
} from '@/app/admin/students/[id]/_components/StudentProfileNavTabs';
import { StudentOverviewTab } from '@/app/admin/students/[id]/_components/StudentOverviewTab';
import { StudentApplicationsTab } from '@/app/admin/students/[id]/_components/StudentApplicationsTab';
import { StudentOffersTab } from '@/app/admin/students/[id]/_components/StudentOffersTab';
import { AlertCircle, ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface TpoStudentDetailClientProps {
  studentId: string;
}

export function TpoStudentDetailClient({ studentId }: TpoStudentDetailClientProps) {
  const router = useRouter();

  const [student, setStudent] = useState<StudentDossierData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<StudentProfileTabType>('overview');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Fetch Student Dossier from TPO Endpoint
  const fetchStudentData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/tpo/students/${studentId}`);

      if (response.data.success && response.data.data) {
        setStudent(response.data.data);
      } else {
        setError(response.data.message || 'Failed to load student candidate dossier');
      }
    } catch (err: any) {
      console.error('Error fetching student dossier:', err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Failed to fetch student details. Candidate might not belong to your college.'
      );
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
      const response = await axios.patch(`/api/tpo/students/${studentId}`, {
        isActive: nextStatus,
      });

      if (response.data.success) {
        setStudent((prev) => (prev ? { ...prev, isActive: nextStatus } : null));
      }
    } catch (err: any) {
      console.error('Error updating status:', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSendMessage = () => {
    if (student?.email) {
      window.location.href = `mailto:${student.email}?subject=Message from TPO Placement Cell`;
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4 shadow-xs">
          <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Loading Student Candidate Dossier...
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          Fetching academic background, applications pipeline, placement offers, and resume profiles.
        </p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-4xl mx-auto space-y-4">
        <Link
          href="/tpo/students"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Students Roster</span>
        </Link>

        <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6 sm:p-10 text-center space-y-3 shadow-xs">
          <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
          <h3 className="text-lg font-bold text-rose-900">Student Profile Not Found</h3>
          <p className="text-xs text-rose-700 max-w-md mx-auto">{error}</p>
          <button
            onClick={() => fetchStudentData()}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors shadow-xs cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-7 transition-all duration-300 ease-in-out pb-20 md:pb-14">
      {/* 1. Header with Breadcrumbs & Action Buttons */}
      <StudentProfileHeader
        student={student}
        onToggleStatus={handleToggleStatus}
        onSendMessage={handleSendMessage}
        isUpdatingStatus={isUpdatingStatus}
        backUrl="/tpo/students"
        backLabel="Students"
      />

      {/* 2. Top Stats & KPI Metrics */}
      <StudentProfileStats stats={student.metrics} />

      {/* 3. Navigation Tabs */}
      <StudentProfileNavTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        applicationsCount={student.applications?.length || 0}
        offersCount={student.offers?.length || 0}
      />

      {/* 4. Tab Content Panels */}
      <div className="transition-all duration-200">
        {activeTab === 'overview' && (
          <StudentOverviewTab student={student} />
        )}

        {activeTab === 'applications' && (
          <StudentApplicationsTab applications={student.applications} />
        )}

        {activeTab === 'offers' && (
          <StudentOffersTab offers={student.offers} />
        )}
      </div>
    </div>
  );
}
