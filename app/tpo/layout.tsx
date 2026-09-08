import React from 'react';
import type { Metadata } from 'next';
import { TpoHeader } from './_components/TpoHeader';
import { TpoSidebar } from './_components/TpoSidebar';
import { TpoBottomNav } from './_components/TpoBottomNav';

export const metadata: Metadata = {
  title: 'College & TPO Placement Portal | CampusHire',
  description: 'Enterprise institutional training & placement governance dashboard for university drives, batch analytics, and student career recruitment.',
};

export default function TpoRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-[#F8FAFC] text-[#0A2540] antialiased selection:bg-[#2563EB]/20 selection:text-[#2563EB] font-sans flex flex-col relative">
      
      {/* Dynamic Ambient Background Lights */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/7 blur-[120px]" />
        <div className="absolute top-10 -right-20 w-80 h-80 rounded-full bg-amber-500/6 blur-[100px]" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-indigo-500/4 blur-[140px]" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full bg-emerald-500/4 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-35 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
      </div>

      {/* Persistent College Portal Header */}
      <TpoHeader />

      {/* Main Body with Sidebar & Scrollable Main Content Viewport */}
      <div className="flex flex-1 overflow-hidden relative z-10 min-h-0">
        <TpoSidebar />

        <main className="flex-1 h-full min-w-0 overflow-y-auto overflow-x-hidden relative pb-20 md:pb-12 transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <TpoBottomNav />

    </div>
  );
}
