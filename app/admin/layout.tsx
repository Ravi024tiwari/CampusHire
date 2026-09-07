import React from 'react';
import type { Metadata } from 'next';
import { AdminHeader } from './dashboard/_components/AdminHeader';
import { AdminSidebar } from './dashboard/_components/AdminSidebar';
import { AdminBottomTabBar } from './_components/AdminBottomTabBar';

export const metadata: Metadata = {
  title: 'CampusHire Admin Portal | National Placement Command',
  description: 'Production-grade enterprise admin governance platform for university placements, accreditations, and corporate hiring drives.',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-[#F8FAFC] text-[#0A2540] antialiased selection:bg-[#2563EB]/20 selection:text-[#2563EB] font-sans flex flex-col relative">
      
      {/* 1. Dynamic Ambient Light Glow Orbs (Subtle atmospheric depth) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Left Royal Blue Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#2563EB]/7 blur-[120px]" />
        
        {/* Top-Right Marigold Amber Glow */}
        <div className="absolute top-10 -right-20 w-80 h-80 rounded-full bg-[#FBAB23]/6 blur-[100px]" />
        
        {/* Mid-Screen Indigo Ambient Flow */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-indigo-500/4 blur-[140px]" />
        
        {/* Bottom-Right Emerald Governance Light */}
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full bg-emerald-500/4 blur-[130px]" />

        {/* 2. Architectural Blueprint Micro-Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-35 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
      </div>

      {/* Global Persistent Admin Navbar (AdminHeader) */}
      <AdminHeader />

      {/* Main Layout Body with Persistent Fixed Sidebar & Independent Fluid Scrollable Content */}
      <div className="flex flex-1 overflow-hidden relative z-10 min-h-0">
        {/* Global Persistent Admin Sidebar */}
        <AdminSidebar />

        {/* Dynamic Page Content (Fluidly expands/contracts and scrolls independently) */}
        <main className="flex-1 h-full min-w-0 overflow-y-auto overflow-x-hidden relative pb-16 md:pb-0 transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>

      {/* Mobile Sticky Bottom Tab Bar */}
      <AdminBottomTabBar />

    </div>
  );
}
