import React from 'react';
import type { Metadata } from 'next';
import { TpoJobsClient } from './_components/TpoJobsClient';

export const metadata: Metadata = {
  title: 'Job Opportunities | College & TPO Placement Portal',
  description: 'Explore, manage, and monitor all placement drives, campus job opportunities, recruiting partners, and candidate applications for university students.',
};

export default function TpoJobsPage() {
  return <TpoJobsClient />;
}
