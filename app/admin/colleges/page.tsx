import React from 'react';
import type { Metadata } from 'next';
import { AdminCollegesClient } from './_components/AdminCollegesClient';

export const metadata: Metadata = {
  title: 'Colleges Directory | CampusHire Super Admin',
  description: 'Manage and verify all partner colleges and institutions on the CampusHire platform.',
};

export default function AdminCollegesPage() {
  return <AdminCollegesClient />;
}
