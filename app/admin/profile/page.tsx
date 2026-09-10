import React from 'react';
import type { Metadata } from 'next';
import { AdminProfileClient } from './_components/AdminProfileClient';

export const metadata: Metadata = {
  title: 'Super Admin Profile & Executive Settings | CampusHire Command',
  description: 'Manage Super Administrator identity credentials, security settings, avatar image, and nationwide platform preferences.',
};

export default function AdminProfilePage() {
  return <AdminProfileClient />;
}
