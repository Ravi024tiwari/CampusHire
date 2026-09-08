import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Loader2 } from 'lucide-react';
import { TpoApplicationsClient } from './_components/TpoApplicationsClient';

export const metadata: Metadata = {
  title: 'Applications Management | CampusHire College TPO Portal',
  description: 'Track, review, and manage all campus job applications submitted by enrolled students across recruitment drives.',
};

export default function TpoApplicationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-3">
            <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Loading Applications Portal...</h3>
          <p className="text-xs text-slate-400 mt-1">Retrieving campus applicant pipeline data</p>
        </div>
      }
    >
      <TpoApplicationsClient />
    </Suspense>
  );
}
