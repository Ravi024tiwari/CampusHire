'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TpoAnalyticsHeader } from './TpoAnalyticsHeader';
import { TpoAnalyticsKpis, AnalyticsKpisData } from './TpoAnalyticsKpis';
import { TpoHighestPlacedSpotlight, HighestPlacedCandidate } from './TpoHighestPlacedSpotlight';
import { TpoPlacementTrendChart } from './TpoPlacementTrendChart';
import { TpoPlacementStatusDonut } from './TpoPlacementStatusDonut';
import { TpoBranchPlacementsChart } from './TpoBranchPlacementsChart';
import { TpoTopRecruitersCard } from './TpoTopRecruitersCard';
import { TpoSalaryDistributionChart } from './TpoSalaryDistributionChart';
import { TpoSalaryStatsCard } from './TpoSalaryStatsCard';
import { TpoAnalyticsQuickActions } from './TpoAnalyticsQuickActions';
import { 
  BarChart2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Loader2 
} from 'lucide-react';

export function TpoAnalyticsClient() {
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const fetchAnalyticsData = useCallback(
    async (isManual = false) => {
      try {
        if (isManual) setIsRefreshing(true);
        else setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (selectedYear && selectedYear !== 'ALL') {
          params.set('academicYear', selectedYear);
        }

        const res = await fetch(`/api/tpo/analytics?${params.toString()}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || 'Failed to load placement analytics');
        }

        setData(json.data);
        if (isManual) {
          showToast('Placement telemetry and analytics refreshed');
        }
      } catch (err: any) {
        console.error('[TPO_ANALYTICS_FETCH_ERROR]', err);
        setError(err.message || 'Error loading placement analytics');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [selectedYear]
  );

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  // Export Comprehensive Placement Analytics Report as CSV
  const handleDownloadReport = () => {
    try {
      setIsDownloading(true);

      const kpis = data?.kpis;
      const salaryStats = data?.salaryStats;
      const status = data?.placementStatus;

      const reportRows = [
        ['Campus Placement Executive Analytics Dossier'],
        [`Generated On: ${new Date().toLocaleString()}`],
        [`Academic Year Filter: ${selectedYear}`],
        [''],
        ['--- 1. KEY PLACEMENT PERFORMANCE INDICATORS ---'],
        ['Metric', 'Value', 'Growth Trend'],
        ['Total Registered Students', kpis?.totalStudents?.value ?? '0', kpis?.totalStudents?.growth || ''],
        ['Placement Eligible Students', kpis?.placementEligible?.value ?? '0', kpis?.placementEligible?.growth || ''],
        ['Total Placed Students', kpis?.placedStudents?.value ?? '0', kpis?.placedStudents?.growth || ''],
        ['Overall Placement Rate', kpis?.placementRate?.value || '0%', kpis?.placementRate?.growth || ''],
        ['Total Recruiting Companies', kpis?.recruitingCompanies?.value ?? '0', kpis?.recruitingCompanies?.growth || ''],
        [''],
        ['--- 2. COMPENSATION & SALARY BENCHMARKS ---'],
        ['Benchmark', 'Package (LPA)'],
        ['Average CTC', salaryStats?.average || 'N/A'],
        ['Highest Record CTC', salaryStats?.highest || 'N/A'],
        ['Median CTC', salaryStats?.median || 'N/A'],
        [''],
        ['--- 3. CANDIDATE FUNNEL BREAKDOWN ---'],
        ['Funnel Stage', 'Student Count', 'Percentage'],
        ['Placed Successfully', status?.placed?.count ?? 0, `${status?.placed?.percentage ?? 0}%`],
        ['In Interview Process', status?.inProcess?.count ?? 0, `${status?.inProcess?.percentage ?? 0}%`],
        ['Not Placed (Seeking)', status?.notPlaced?.count ?? 0, `${status?.notPlaced?.percentage ?? 0}%`],
        ['Not Eligible (CGPA/Criteria)', status?.notEligible?.count ?? 0, `${status?.notEligible?.percentage ?? 0}%`],
      ];

      const csvContent = reportRows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `CampusHire_Placement_Report_${selectedYear}_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Placement analytics report downloaded successfully');
    } catch (err: any) {
      showToast('Failed to download placement report', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast('Placement analytics link copied to clipboard!');
    }
  };

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-7 transition-all duration-300 ease-in-out pb-20 md:pb-14">
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md text-xs sm:text-sm font-semibold ${
              toastMessage.type === 'success'
                ? 'bg-emerald-900/90 text-white border-emerald-500/30'
                : toastMessage.type === 'error'
                ? 'bg-rose-900/90 text-white border-rose-500/30'
                : 'bg-slate-900/90 text-white border-slate-700'
            }`}
          >
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
            {toastMessage.type === 'info' && <AlertCircle className="w-4 h-4 text-blue-400" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* 1. Header Section */}
      <TpoAnalyticsHeader
        selectedYear={selectedYear}
        onYearChange={(yr) => setSelectedYear(yr)}
        availableYears={data?.availableAcademicYears}
        onDownloadReport={handleDownloadReport}
        isDownloading={isDownloading}
        onRefresh={() => fetchAnalyticsData(true)}
        isLoading={isRefreshing}
      />

      {/* 2. Top 5 Summary KPI Cards */}
      <TpoAnalyticsKpis
        kpis={data?.kpis}
        isLoading={isLoading}
      />

      {/* 3. Highest Placed Student Spotlight Card (Real DB Record) */}
      <TpoHighestPlacedSpotlight
        candidate={data?.highestPlacedSpotlight}
        isLoading={isLoading}
      />

      {/* 4. Row 1: Placement Trend Chart (Left 7 cols) & Placement Status Donut (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
        <div className="lg:col-span-7">
          <TpoPlacementTrendChart data={data?.placementTrends} />
        </div>
        <div className="lg:col-span-5">
          <TpoPlacementStatusDonut
            statusData={data?.placementStatus}
            selectedYear={selectedYear}
          />
        </div>
      </div>

      {/* 5. Row 2: Placements by Branch (Left 7 cols) & Top Recruiting Companies (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
        <div className="lg:col-span-7">
          <TpoBranchPlacementsChart branchData={data?.branchPlacements} />
        </div>
        <div className="lg:col-span-5">
          <TpoTopRecruitersCard companies={data?.topRecruitingCompanies} />
        </div>
      </div>

      {/* 6. Row 3: Placement Offers Salary Distribution (Left 6 cols) & Placement Stats/Engagement (Right 6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
        <div className="lg:col-span-6">
          <TpoSalaryDistributionChart distribution={data?.salaryDistribution} />
        </div>
        <div className="lg:col-span-6">
          <TpoSalaryStatsCard
            salaryStats={data?.salaryStats}
            recruiterEngagement={data?.recruiterEngagement}
          />
        </div>
      </div>

      {/* 7. Bottom Quick Action Links */}
      <TpoAnalyticsQuickActions
        onDownloadReport={handleDownloadReport}
        onShare={handleShare}
      />
    </div>
  );
}
