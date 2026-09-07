'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRecruiterAnalyticsStore, AnalyticsNavTab } from '@/store/useRecruiterAnalyticsStore';
import { RecruiterAnalyticsHeader } from './_components/RecruiterAnalyticsHeader';
import { RecruiterAnalyticsNavTabs, ANALYTICS_INDEXED_TABS } from './_components/RecruiterAnalyticsNavTabs';
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
import { CheckCircle2, AlertCircle, X, RefreshCw, ArrowUp, Sparkles } from 'lucide-react';

export default function RecruiterAnalyticsPage() {
  const {
    data,
    isLoading,
    error,
    activeTab,
    setActiveTab,
    fetchAnalytics,
  } = useRecruiterAnalyticsStore();

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const isUserClickScrolling = useRef(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Intersection Observer for scrollspy synchronization
  useEffect(() => {
    if (isLoading || !data) return;

    const sectionIds = ANALYTICS_INDEXED_TABS.map((t) => t.targetId);
    
    // Disconnect any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      // Don't override active tab while automated click scrolling is animating
      if (isUserClickScrolling.current) return;

      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Pick the entry with the highest intersection ratio
        const mostVisible = visibleEntries.reduce((prev, current) =>
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        );
        const matchingTab = ANALYTICS_INDEXED_TABS.find((t) => t.targetId === mostVisible.target.id);
        if (matchingTab) {
          setActiveTab(matchingTab.id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-10% 0px -40% 0px',
      threshold: [0.1, 0.3, 0.6],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el && observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, data, setActiveTab]);

  // Handle showing/hiding "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setShowScrollTop(scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also listen on main scrollable container if nested
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (mainEl) {
        mainEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleNavigateToSection = (targetId: string, tabId: AnalyticsNavTab) => {
    setActiveTab(tabId);
    setHighlightedSection(targetId);
    isUserClickScrolling.current = true;

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Reset lock and highlight after smooth scroll finishes
    setTimeout(() => {
      isUserClickScrolling.current = false;
    }, 900);

    setTimeout(() => {
      setHighlightedSection(null);
    }, 2200);
  };

  const handleScrollToTop = () => {
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveTab('overview');
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
    <div className="p-3 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-8 pb-32 font-sans transition-all duration-300">
      
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

      {/* 1. Header: Title, Live Status, Date Filter & Export Button */}
      <RecruiterAnalyticsHeader
        onExportReport={handleExportCSV}
        isExporting={isExporting}
      />

      {/* 2. Sticky Glassmorphic Indexed Navigation Tabs Bar */}
      <div className="sticky top-0 z-30 -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8 py-2 bg-[#F8FAFC]/90 backdrop-blur-md border-y border-slate-200/60 shadow-2xs transition-all duration-200">
        <RecruiterAnalyticsNavTabs onNavigateToSection={handleNavigateToSection} />
      </div>

      {/* =========================================================================
          SECTION 01: OVERVIEW METRICS (KPIs)
          ========================================================================= */}
      <section
        id="section-01-overview"
        className={`scroll-mt-24 sm:scroll-mt-28 space-y-3 transition-all duration-500 rounded-3xl p-1 ${
          highlightedSection === 'section-01-overview'
            ? 'ring-3 ring-blue-500/40 shadow-xl bg-blue-50/20'
            : ''
        }`}
      >
        <div className="flex items-center gap-2 px-1">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[11px] font-black tracking-wider">
            INDEX 01
          </span>
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            Key Performance Indicators
          </h2>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">• High-level placement health</span>
        </div>
        <RecruiterAnalyticsKpiCards kpis={data.kpis} />
      </section>

      {/* =========================================================================
          SECTION 02: HIRING TRENDS (5-Year Placement Trend Line Chart)
          ========================================================================= */}
      <section
        id="section-02-trends"
        className={`scroll-mt-24 sm:scroll-mt-28 space-y-3 transition-all duration-500 rounded-3xl p-1 ${
          highlightedSection === 'section-02-trends'
            ? 'ring-3 ring-blue-500/40 shadow-xl bg-blue-50/20'
            : ''
        }`}
      >
        <div className="flex items-center gap-2 px-1">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[11px] font-black tracking-wider">
            INDEX 02
          </span>
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            Multi-Year Hiring Trajectory
          </h2>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">• 5-Year historical placement growth</span>
        </div>
        <RecruiterPlacementTrendChart trends={data.yearlyTrends} />
      </section>

      {/* =========================================================================
          SECTION 03: ROLE & JOB TYPES (Offers by Job Type Donut + Top Roles)
          ========================================================================= */}
      <section
        id="section-03-roles"
        className={`scroll-mt-24 sm:scroll-mt-28 space-y-3 transition-all duration-500 rounded-3xl p-1 ${
          highlightedSection === 'section-03-roles'
            ? 'ring-3 ring-blue-500/40 shadow-xl bg-blue-50/20'
            : ''
        }`}
      >
        <div className="flex items-center gap-2 px-1">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[11px] font-black tracking-wider">
            INDEX 03
          </span>
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            Role & Job Type Distribution
          </h2>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">• Full-Time, Internship & Role specifics</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
            <RecruiterJobTypeDonutChart
              distribution={data.jobTypeDistribution}
              totalOffers={data.kpis.totalOffers}
            />
          </div>
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
            <RecruiterTopRolesCard roles={data.topRoles} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04: COLLEGE WISE ANALYTICS
          ========================================================================= */}
      <section
        id="section-04-colleges"
        className={`scroll-mt-24 sm:scroll-mt-28 space-y-3 transition-all duration-500 rounded-3xl p-1 ${
          highlightedSection === 'section-04-colleges'
            ? 'ring-3 ring-blue-500/40 shadow-xl bg-blue-50/20'
            : ''
        }`}
      >
        <div className="flex items-center gap-2 px-1">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[11px] font-black tracking-wider">
            INDEX 04
          </span>
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            Top Recruiting Partner Colleges
          </h2>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">• Campus recruitment & conversion rates</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
          <RecruiterTopCollegesCard colleges={data.topColleges} />
          <RecruiterBatchBreakdownCard batchYears={data.batchYearBreakdown} />
        </div>
      </section>

      {/* =========================================================================
          SECTION 05: LOCATION & BATCH WISE BREAKDOWN
          ========================================================================= */}
      <section
        id="section-05-locations"
        className={`scroll-mt-24 sm:scroll-mt-28 space-y-3 transition-all duration-500 rounded-3xl p-1 ${
          highlightedSection === 'section-05-locations'
            ? 'ring-3 ring-blue-500/40 shadow-xl bg-blue-50/20'
            : ''
        }`}
      >
        <div className="flex items-center gap-2 px-1">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[11px] font-black tracking-wider">
            INDEX 05
          </span>
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            Geographic & Hub Distribution
          </h2>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">• Regional offer distribution across India</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
          <RecruiterLocationCard locations={data.locationBreakdown} />
          <RecruiterPlacementGrowthCard growth={data.placementGrowth} />
        </div>
      </section>

      {/* =========================================================================
          SECTION 06: GROWTH & AI KEY INSIGHTS
          ========================================================================= */}
      <section
        id="section-06-insights"
        className={`scroll-mt-24 sm:scroll-mt-28 space-y-3 transition-all duration-500 rounded-3xl p-1 ${
          highlightedSection === 'section-06-insights'
            ? 'ring-3 ring-blue-500/40 shadow-xl bg-blue-50/20'
            : ''
        }`}
      >
        <div className="flex items-center gap-2 px-1">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[11px] font-black tracking-wider">
            INDEX 06
          </span>
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            AI-Driven Telemetry & Strategic Insights
          </h2>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">• Machine-generated recruitment recommendations</span>
        </div>
        <RecruiterKeyInsightsCard insights={data.keyInsights} />

        {/* Bottom CTA Banner */}
        <div className="pt-2">
          <RecruiterAnalyticsBottomBanner
            onDownloadReport={handleExportCSV}
            isDownloading={isExporting}
          />
        </div>
      </section>

      {/* Floating Action Button: Scroll to Top */}
      <button
        type="button"
        onClick={handleScrollToTop}
        className="fixed bottom-20 sm:bottom-8 right-6 z-40 p-3 rounded-2xl bg-[#0A2540] text-white shadow-xl hover:bg-blue-600 active:scale-95 transition-all duration-300 cursor-pointer border border-slate-700/80 flex items-center gap-2 group"
        title="Scroll to Top"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        <span className="text-xs font-black hidden sm:inline">Top</span>
      </button>

    </div>
  );
}
