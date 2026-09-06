'use client';

import React, { useEffect, useState } from 'react';
import { useRecruiterAnalyticsStore } from '@/store/useRecruiterAnalyticsStore';
import { RecruiterAnalyticsHeader } from './_components/RecruiterAnalyticsHeader';
import { RecruiterAnalyticsNavTabs } from './_components/RecruiterAnalyticsNavTabs';
import { RecruiterAnalyticsKpiCards } from './_components/RecruiterAnalyticsKpiCards';
import { RecruiterPlacementTrendChart } from './_components/RecruiterPlacementTrendChart';
import { RecruiterJobTypeDonutChart } from './_components/RecruiterJobTypeDonutChart';
import { RecruiterTopCollegesCard } from './_components/RecruiterTopCollegesCard';
import { RecruiterTopRolesCard } from './_components/RecruiterTopRolesCard';
import { RecruiterPlacementGrowthCard } from './_components/RecruiterPlacementGrowthCard';
import { RecruiterBatchBreakdownCard } from './_components/RecruiterBatchBreakdownCard';
import { RecruiterLocationCard } from './_components/RecruiterLocationCard';
import { RecruiterKeyInsightsCard } from './_components/RecruiterKeyInsightsCard';
import { RecruiterAnalyticsBottomBanner } from './_components/RecruiterAnalyticsBottomBanner';
import { CheckCircle2, AlertCircle, X, Loader2, RefreshCw } from 'lucide-react';

export default function RecruiterAnalyticsPage() {
  const {
    data,
    isLoading,
    error,
    fetchAnalytics,
  } = useRecruiterAnalyticsStore();

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleExportCSV = () => {
    if (!data) return;
    setIsExporting(true);

    try {
      const headers = ['Category', 'Metric / Entity', 'Offers / Value', 'Placement Rate / Share'];
      const rows = [
        ['KPI Summary', 'Total Offers', data.kpis.totalOffers, `+${data.kpis.totalOffersYoY}% YoY`],
        ['KPI Summary', 'Students Placed', data.kpis.studentsPlaced, `+${data.kpis.studentsPlacedYoY}% YoY`],
        ['KPI Summary', 'Placement Rate', `${data.kpis.placementRate}%`, `+${data.kpis.placementRateYoY}% YoY`],
        ['KPI Summary', 'Partner Colleges', data.kpis.partnerColleges, `+${data.kpis.partnerCollegesYoY}% YoY`],
        ...data.yearlyTrends.map((t) => ['5-Year Trend', `Batch ${t.year}`, t.offersMade, `${t.placementRate}% Placed`]),
        ...data.jobTypeDistribution.map((j) => ['Job Type', j.label, j.count, `${j.percentage}%`]),
        ...data.topColleges.map((c) => ['Top College', c.name, c.offers, `${c.placementRate}% Placed`]),
        ...data.topRoles.map((r) => ['Top Role', r.role, r.offers, `${r.placementRate}% Placed`]),
        ...data.locationBreakdown.map((l) => ['Location', l.location, l.offers, `${l.percentage}%`]),
      ];

      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [headers.join(','), ...rows.map((e) => e.map((cell) => `"${cell}"`).join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `CampusHire_Placement_Analytics_Report_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Analytics summary report generated & downloaded successfully');
    } catch (err) {
      showToast('Failed to generate export file', 'info');
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading && !data) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-pulse max-w-[1700px] mx-auto">
        <div className="h-20 rounded-3xl bg-slate-200/80" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-3xl bg-slate-200/80" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 h-80 rounded-3xl bg-slate-200/80" />
          <div className="lg:col-span-5 h-80 rounded-3xl bg-slate-200/80" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 sm:p-12 max-w-xl mx-auto text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-extrabold text-[#0A2540]">Unable to Load Placement Analytics</h2>
        <p className="text-sm text-slate-500">{error || 'An unexpected error occurred while fetching company analytics.'}</p>
        <button
          type="button"
          onClick={() => fetchAnalytics()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 pb-28 font-sans transition-all duration-300">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-[#0A2540] text-white px-4 py-3 shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. Header: Title, Date Filter & Export Button */}
      <RecruiterAnalyticsHeader
        onExportReport={handleExportCSV}
        isExporting={isExporting}
      />

      {/* 2. Top Segmented Navigation Tabs */}
      <RecruiterAnalyticsNavTabs />

      {/* 3. Top 4 KPI Metric Cards (Swipeable Carousel on Mobile, 4-col Grid on Desktop) */}
      <RecruiterAnalyticsKpiCards kpis={data.kpis} />

      {/* 4. Middle Visualizations Row (Placement Trend 5-Years + Offers by Job Type Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-7 xl:col-span-8">
          <RecruiterPlacementTrendChart trends={data.yearlyTrends} />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <RecruiterJobTypeDonutChart
            distribution={data.jobTypeDistribution}
            totalOffers={data.kpis.totalOffers}
          />
        </div>
      </div>

      {/* 5. 3-Column Analytics Grid (Zero vertical gap on large screens, responsive on all devices) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 items-start">
        
        {/* Column 1: Top Recruiting Colleges & Batch Year Breakdown */}
        <div className="flex flex-col gap-4 sm:gap-5">
          <RecruiterTopCollegesCard colleges={data.topColleges} />
          <RecruiterBatchBreakdownCard batchYears={data.batchYearBreakdown} />
        </div>

        {/* Column 2: Top Roles Offered & Offers by Location */}
        <div className="flex flex-col gap-4 sm:gap-5">
          <RecruiterTopRolesCard roles={data.topRoles} />
          <RecruiterLocationCard locations={data.locationBreakdown} />
        </div>

        {/* Column 3: Placement Growth & Key Insights */}
        <div className="flex flex-col gap-4 sm:gap-5">
          <RecruiterPlacementGrowthCard growth={data.placementGrowth} />
          <RecruiterKeyInsightsCard insights={data.keyInsights} />
        </div>

      </div>

      {/* 7. Bottom Motivational CTA Banner */}
      <RecruiterAnalyticsBottomBanner
        onDownloadReport={handleExportCSV}
        isDownloading={isExporting}
      />

    </div>
  );
}
