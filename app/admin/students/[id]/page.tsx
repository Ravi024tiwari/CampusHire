import React from 'react';
import type { Metadata } from 'next';
import { StudentProfileClient } from './_components/StudentProfileClient';

export const metadata: Metadata = {
  title: 'Student Details | CampusHire Super Admin',
  description: 'View 360-degree student placement dossier, academic records, resumes, and recruitment history.',
};

export default async function AdminStudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StudentProfileClient studentId={id} />;
}
