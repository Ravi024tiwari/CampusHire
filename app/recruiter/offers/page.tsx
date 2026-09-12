'use client';

import React, { useEffect, useState } from 'react';
import { useRecruiterOffersStore, RecruiterOfferItem } from '@/store/useRecruiterOffersStore';
import { useRecruiterOffersQuery } from '@/hooks/queries/useRecruiterQueries';
import { RecruiterOffersHeader } from './_components/RecruiterOffersHeader';
import { RecruiterOffersKpiStats } from './_components/RecruiterOffersKpiStats';
import { RecruiterOffersFilters } from './_components/RecruiterOffersFilters';
import { RecruiterOffersTable } from './_components/RecruiterOffersTable';
import { RecruiterOffersCards } from './_components/RecruiterOffersCards';
import { RecruiterOffersPagination } from './_components/RecruiterOffersPagination';
import { OfferLetterViewerModal } from '@/app/student/offers/_components/OfferLetterViewerModal';
import { CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react';

export default function RecruiterOffersPage() {
  const {
    offers,
    stats,
    filters,
  } = useRecruiterOffersStore();

  const queryParams = React.useMemo(() => ({
    status: filters.status,
    collegeId: filters.collegeId,
    search: filters.search || undefined,
  }), [filters]);

  const {
    data: queryData,
    isLoading: isQueryLoading,
    refetch: refetchOffers,
  } = useRecruiterOffersQuery(queryParams);

  const [selectedOfferPdf, setSelectedOfferPdf] = useState<RecruiterOfferItem | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Sync TanStack query data into offers store
  useEffect(() => {
    if (queryData?.offers) {
      useRecruiterOffersStore.setState({
        offers: queryData.offers,
        stats: queryData.stats || undefined,
        isLoading: false,
      });
    }
  }, [queryData]);

  const isLoading = isQueryLoading && !queryData && offers.length === 0;

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // CSV Report Generator
  const handleExportReport = () => {
    if (offers.length === 0) {
      showToast('No offers available to export', 'info');
      return;
    }

    setIsExporting(true);
    try {
      const headers = [
        'Student Name',
        'Student Email',
        'Enrollment Number',
        'College',
        'Branch',
        'Batch Year',
        'CGPA',
        'Designation',
        'Salary Package',
        'Location',
        'Status',
        'Offer Date',
        'Accepted Date',
        'Offer Letter URL',
      ];

      const rows = offers.map((offer) => [
        `"${offer.student.name}"`,
        `"${offer.student.email}"`,
        `"${offer.student.enrollmentNumber}"`,
        `"${offer.college.name}"`,
        `"${offer.student.branch}"`,
        offer.student.batchYear,
        offer.student.cgpa,
        `"${offer.designation}"`,
        `"${offer.salaryPackage}"`,
        `"${offer.location}"`,
        `"${offer.status}"`,
        `"${new Date(offer.createdAt).toLocaleDateString()}"`,
        `"${offer.acceptedAt ? new Date(offer.acceptedAt).toLocaleDateString() : 'N/A'}"`,
        `"${offer.letterUrl || ''}"`,
      ]);

      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `CampusHire_Company_Offers_Report_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Placement offers report generated & downloaded successfully');
    } catch (err) {
      showToast('Failed to generate report', 'info');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-3 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 pb-28 font-sans">
      
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

      {/* 1. Header Section */}
      <RecruiterOffersHeader
        onExportReport={handleExportReport}
        isExporting={isExporting}
      />

      {/* 2. Top KPI Cards matching Mockup */}
      <RecruiterOffersKpiStats stats={stats} />

      {/* 3. Search & Comprehensive Filter Controls */}
      <RecruiterOffersFilters />

      {/* 4. Main Data Feed: Table View on Desktop / Grid or Mobile Cards */}
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-64 bg-slate-200/80 rounded-3xl" />
        </div>
      ) : (
        <>
          {/* Candidate Offers List (Responsive: Always Cards on Mobile/Tablet, Switchable on Desktop) */}
          <div className="block lg:hidden">
            <RecruiterOffersCards
              offers={offers}
              onViewOfferPdf={(off) => setSelectedOfferPdf(off)}
            />
          </div>

          <div className="hidden lg:block">
            {filters.viewMode === 'table' ? (
              <RecruiterOffersTable
                offers={offers}
                onViewOfferPdf={(off) => setSelectedOfferPdf(off)}
              />
            ) : (
              <RecruiterOffersCards
                offers={offers}
                onViewOfferPdf={(off) => setSelectedOfferPdf(off)}
              />
            )}
          </div>

          {/* 5. Pagination Footer */}
          <RecruiterOffersPagination />
        </>
      )}

      {/* Offer Letter Document Viewer Modal */}
      {selectedOfferPdf && (
        <OfferLetterViewerModal
          isOpen={!!selectedOfferPdf}
          onClose={() => setSelectedOfferPdf(null)}
          offer={selectedOfferPdf}
        />
      )}

    </div>
  );
}
