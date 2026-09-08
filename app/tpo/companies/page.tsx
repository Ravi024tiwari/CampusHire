import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Loader2 } from 'lucide-react';
import { TpoCompaniesClient } from './_components/TpoCompaniesClient';

export const metadata: Metadata = {
  title: 'Companies & Recruiters | CampusHire College TPO Portal',
  description: 'View and manage all recruiting companies and placement partners that visit your campus.',
};

export default function TpoCompaniesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-3">
            <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Loading Companies...</h3>
          <p className="text-xs text-slate-400 mt-1">Retrieving campus recruiter directory</p>
        </div>
      }
    >
      <TpoCompaniesClient />
    </Suspense>
  );
}
