import React from 'react';
import type { Metadata } from 'next';
import { AdminJobsClient } from './_components/AdminJobsClient';

export const metadata: Metadata = {
  title: 'Job Postings Directory | CampusHire Super Admin',
  description: 'Manage and monitor all job postings created by companies across campus placement drives.',
};

export default function AdminJobsPage() {
  return <AdminJobsClient />;
}
