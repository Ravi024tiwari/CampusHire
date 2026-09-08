import React from 'react';
import type { Metadata } from 'next';
import { TpoDashboardClient } from './_components/TpoDashboardClient';

export const metadata: Metadata = {
  title: 'College Placement Dashboard | CampusHire',
  description: 'Real-time university placement dashboard with batch analytics, campus drives, and candidate progress tracking.',
};

export default function TpoDashboardPage() {
  return <TpoDashboardClient />;
}
