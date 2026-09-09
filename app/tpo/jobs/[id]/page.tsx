import React from 'react';
import type { Metadata } from 'next';
import { TpoJobDetailView } from './_components/TpoJobDetailView';

export const metadata: Metadata = {
  title: 'Placement Drive Dossier | CampusHire TPO Portal',
  description: 'Comprehensive campus placement drive dossier, institutional eligibility rules, compensation details, and candidate applicant tracking.',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TpoJobDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <TpoJobDetailView jobId={id} />;
}
