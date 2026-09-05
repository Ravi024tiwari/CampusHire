import React from 'react';
import { Metadata } from 'next';
import { StudentSidebar } from './_components/StudentSidebar';
import { StudentHeader } from './_components/StudentHeader';
import { StudentBottomNav } from './_components/StudentBottomNav';

export const metadata: Metadata = {
  title: 'Student Portal | CampusHire',
  description: 'Empowering India’s next generation with smart placement opportunities and campus hiring tools.',
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col antialiased">
      {/* 1. Desktop & Mobile Drawer Sidebar */}
      <StudentSidebar />

      {/* 2. Main Viewport Area (offset by 64 (16rem) on desktop) */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Sticky Header */}
        <StudentHeader />

        {/* Dynamic Page Content with bottom clearance for mobile navigation */}
        <main className="flex-1 w-full pb-28 sm:pb-32 lg:pb-12">
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <StudentBottomNav />
      </div>
    </div>
  );
}
