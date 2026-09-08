import React from 'react';
import type { Metadata } from 'next';
import { TpoStudentsClient } from './_components/TpoStudentsClient';

export const metadata: Metadata = {
  title: 'Students Directory | College Placement Portal',
  description: 'View and manage all registered campus students, placement eligibility, job applications, and recruitment offers.',
};

export default function TpoStudentsPage() {
  return <TpoStudentsClient />;
}
