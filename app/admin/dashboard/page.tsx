import React from 'react';
import type { Metadata } from 'next';
import { AdminDashboardClient } from './_components/AdminDashboardClient';

export const metadata: Metadata = {
  title: 'Super Admin Command Center | CampusHire Enterprise',
  description: 'Centralized institutional accreditation, placement velocity telemetry, and platform governance for Super Administrators.',
};

export default function SuperAdminDashboardPage() {
  return <AdminDashboardClient />;
}
