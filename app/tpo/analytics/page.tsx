import React from 'react';
import type { Metadata } from 'next';
import { TpoAnalyticsClient } from './_components/TpoAnalyticsClient';

export const metadata: Metadata = {
  title: 'Placement Analytics & Insights | CampusHire TPO Portal',
  description: 'Executive placement governance dashboard, institutional recruitment statistics, salary distributions, highest package spotlights, and branch-wise placement telemetry.',
};

export default function TpoAnalyticsPage() {
  return <TpoAnalyticsClient />;
}
