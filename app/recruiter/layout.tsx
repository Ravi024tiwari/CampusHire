import React from 'react';
import type { Metadata } from 'next';
import { RecruiterHeader } from './_components/RecruiterHeader';
import { RecruiterSidebar } from './_components/RecruiterSidebar';
import { RecruiterBottomNav } from './_components/RecruiterBottomNav';

export const metadata: Metadata = {
  title: 'Corporate Recruiter Command | CampusHire',
  description: 'Enterprise corporate talent acquisition portal for university placements, campus drives, and candidate evaluation.',
};

export default function RecruiterRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A2540] antialiased selection:bg-[#2563EB]/20 selection:text-[#2563EB] font-sans flex flex-col relative">
      
      {/* Dynamic Ambient Light Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/7 blur-[120px]" />
        <div className="absolute top-10 -right-20 w-80 h-80 rounded-full bg-indigo-500/6 blur-[100px]" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-sky-400/4 blur-[140px]" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full bg-emerald-500/4 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-35 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
      </div>

      {/* 1. Left Sidebar Navigation (Desktop Fixed & Mobile Drawer) */}
      <RecruiterSidebar />

      {/* 2. Main Viewport Container (Offset by lg:pl-64 on desktop) */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative z-10">
        
        {/* Top Sticky Header */}
        <RecruiterHeader />

        {/* Scrollable Page Content with mobile bottom clearance */}
        <main className="flex-1 w-full pb-24 sm:pb-28 lg:pb-12">
          {children}
        </main>

        {/* Mobile & Tablet Bottom Tab Navigator */}
        <RecruiterBottomNav />
      </div>

    </div>
  );
}
