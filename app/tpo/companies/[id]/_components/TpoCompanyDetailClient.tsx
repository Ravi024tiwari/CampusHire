'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Loader2, AlertCircle } from 'lucide-react';
import { TpoCompanyDetailHero } from './TpoCompanyDetailHero';
import { TpoCompanyDetailKpis } from './TpoCompanyDetailKpis';
import { TpoCompanyDetailTabs, CompanyDetailTabType } from './TpoCompanyDetailTabs';
import { TpoCompanyOverviewTab } from './TpoCompanyOverviewTab';
import { TpoCompanyJobsTab } from './TpoCompanyJobsTab';
import { TpoCompanyPlacedStudentsTab } from './TpoCompanyPlacedStudentsTab';
import { TpoCompanyRecruiterTeamTab } from './TpoCompanyRecruiterTeamTab';
import { TpoScheduleDriveModal } from './TpoScheduleDriveModal';

interface TpoCompanyDetailClientProps {
  companyId: string;
}

export function TpoCompanyDetailClient({ companyId }: TpoCompanyDetailClientProps) {
  const [activeTab, setActiveTab] = useState<CompanyDetailTabType>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [company, setCompany] = useState<any>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const fetchCompanyDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      const res = await axios.get(`/api/tpo/companies/${companyId}`);
      if (res.data?.success && res.data?.data) {
        setCompany(res.data.data);
      }
    } catch (err: any) {
      console.error('Failed to load company dossier:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to load company details.');
    } finally {
      setIsLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchCompanyDetails();
  }, [fetchCompanyDetails]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shadow-xs animate-pulse">
          <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Loading Company Dossier...</h3>
        <p className="text-xs text-slate-500">Retrieving institutional drive history and recruiter profiles</p>
      </div>
    );
  }

  if (errorMsg || !company) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-3">
          <AlertCircle className="w-6 h-6 shrink-0 text-rose-600" />
          <div>
            <h4 className="font-bold text-sm">Error Loading Company</h4>
            <p className="text-xs text-rose-600 mt-0.5">{errorMsg || 'Company not found'}</p>
          </div>
          <button
            onClick={() => fetchCompanyDetails()}
            className="ml-auto bg-rose-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-rose-700 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-8 animate-in fade-in duration-200">
      {/* 1. Header Hero Card */}
      <TpoCompanyDetailHero
        company={company}
        onScheduleDrive={() => setIsScheduleModalOpen(true)}
        onContactRecruiter={() => setActiveTab('team')}
      />

      {/* 2. Top Metric KPI Cards */}
      <TpoCompanyDetailKpis kpis={company.kpis} isLoading={isLoading} />

      {/* 3. Section Tabs */}
      <TpoCompanyDetailTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={{
          jobs: company.jobs?.length || 0,
          hires: company.placedStudents?.length || 0,
          team: company.recruiters?.length || 0,
        }}
      />

      {/* 4. Tab Views */}
      {activeTab === 'overview' && (
        <TpoCompanyOverviewTab
          description={company.description}
          images={company.images || []}
          industry={company.industry}
          location={company.location}
          companyType={company.companyType}
        />
      )}

      {activeTab === 'jobs' && (
        <TpoCompanyJobsTab
          jobs={company.jobs || []}
          companyName={company.name}
          onScheduleDrive={() => setIsScheduleModalOpen(true)}
        />
      )}

      {activeTab === 'hires' && (
        <TpoCompanyPlacedStudentsTab
          students={company.placedStudents || []}
          companyName={company.name}
        />
      )}

      {activeTab === 'team' && (
        <TpoCompanyRecruiterTeamTab
          recruiters={company.recruiters || []}
          companyName={company.name}
          onContactHR={(rec) => {
            window.location.href = `mailto:${rec.email}?subject=${encodeURIComponent(`Campus Recruitment Inquiry - ${company.name}`)}`;
          }}
        />
      )}

      {/* Schedule Drive Modal */}
      <TpoScheduleDriveModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        companyName={company.name}
      />
    </div>
  );
}
