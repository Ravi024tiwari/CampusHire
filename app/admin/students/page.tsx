import React from 'react';
import type { Metadata } from 'next';
import { AdminStudentsClient } from './_components/AdminStudentsClient';

export const metadata: Metadata = {
  title: 'Students Directory | CampusHire Super Admin',
  description: 'Manage and monitor all registered students across institutions on the CampusHire platform.',
};

export default function AdminStudentsPage() {
  return <AdminStudentsClient />;
}
