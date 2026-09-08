import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Loader2 } from 'lucide-react';
import { TpoCompanyDetailClient } from './_components/TpoCompanyDetailClient';

export const metadata: Metadata = {
  title: 'Company Dossier & Recruitment Profile | CampusHire TPO Portal',
  description: 'Detailed company profile, past recruitment drive history, student placement stats, and talent acquisition contact roster.',
};

export default async function TpoCompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shadow-xs animate-pulse">
            <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Loading Company Dossier...</h3>
          <p className="text-xs text-slate-500">Retrieving institutional drive history and recruiter profiles</p>
        </div>
      }
    >
      <TpoCompanyDetailClient companyId={id} />
    </Suspense>
  );
}
