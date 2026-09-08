import React from 'react';
import type { Metadata } from 'next';
import { TpoStudentDetailClient } from './_components/TpoStudentDetailClient';

export const metadata: Metadata = {
  title: 'Student Profile Dossier | College Placement Portal',
  description: 'Comprehensive 360-degree student academic dossier, recruitment applications, offer letters, and resume profiles.',
};

export default async function TpoStudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TpoStudentDetailClient studentId={id} />;
}
