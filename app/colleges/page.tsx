'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';
import { 
  GraduationCap, 
  Search, 
  MapPin, 
  Award, 
  TrendingUp, 
  Users, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface College {
  id: string;
  name: string;
  location: string;
  type: string;
  nirfRank: string;
  avgPackage: string;
  highestPackage: string;
  placementRate: string;
  verified: boolean;
  accent: string;
}

const COLLEGES_DATA: College[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology (IIT) Delhi Ecosystem',
    location: 'New Delhi, Delhi',
    type: 'Institute of National Importance',
    nirfRank: 'NIRF Rank #2',
    avgPackage: '₹25.8 LPA',
    highestPackage: '₹1.25 CPA',
    placementRate: '98.5%',
    verified: true,
    accent: 'border-l-blue-600'
  },
  {
    id: '2',
    name: 'BITS Pilani (Pilani, Goa & Hyderabad Campuses)',
    location: 'Pilani, Rajasthan',
    type: 'Deemed Tech University',
    nirfRank: 'NIRF Top 20',
    avgPackage: '₹20.4 LPA',
    highestPackage: '₹60.0 LPA',
    placementRate: '97.2%',
    verified: true,
    accent: 'border-l-amber-500'
  },
  {
    id: '3',
    name: 'National Institute of Technology (NIT) Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    type: 'Institute of National Importance',
    nirfRank: 'NIRF Rank #9',
    avgPackage: '₹17.5 LPA',
    highestPackage: '₹52.0 LPA',
    placementRate: '96.8%',
    verified: true,
    accent: 'border-l-purple-600'
  },
  {
    id: '4',
    name: 'Delhi Technological University (DTU)',
    location: 'Bawana Road, Delhi',
    type: 'State Technical University',
    nirfRank: 'NIRF Top 30',
    avgPackage: '₹16.2 LPA',
    highestPackage: '₹48.0 LPA',
    placementRate: '95.4%',
    verified: true,
    accent: 'border-l-emerald-500'
  },
  {
    id: '5',
    name: 'Vellore Institute of Technology (VIT)',
    location: 'Vellore, Tamil Nadu',
    type: 'Deemed University (NAAC A++)',
    nirfRank: 'NIRF Rank #11',
    avgPackage: '₹12.8 LPA',
    highestPackage: '₹1.02 CPA',
    placementRate: '94.6%',
    verified: true,
    accent: 'border-l-sky-500'
  },
  {
    id: '6',
    name: 'Thapar Institute of Engineering and Technology',
    location: 'Patiala, Punjab',
    type: 'Deemed University (NAAC A+)',
    nirfRank: 'NIRF Top 25',
    avgPackage: '₹13.5 LPA',
    highestPackage: '₹45.0 LPA',
    placementRate: '93.8%',
    verified: true,
    accent: 'border-l-teal-500'
  },
  {
    id: '7',
    name: 'Manipal Institute of Technology (MAHE)',
    location: 'Manipal, Karnataka',
    type: 'Deemed University of Eminence',
    nirfRank: 'NIRF Top 40',
    avgPackage: '₹12.5 LPA',
    highestPackage: '₹54.0 LPA',
    placementRate: '92.5%',
    verified: true,
    accent: 'border-l-indigo-500'
  },
  {
    id: '8',
    name: 'RV College of Engineering (RVCE)',
    location: 'Bengaluru, Karnataka',
    type: 'Autonomous Institute',
    nirfRank: 'NIRF Top 100',
    avgPackage: '₹14.8 LPA',
    highestPackage: '₹62.0 LPA',
    placementRate: '96.2%',
    verified: true,
    accent: 'border-l-rose-500'
  }
];

export default function CollegesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredColleges = COLLEGES_DATA.filter((college) => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          college.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'ALL' || college.type.includes(selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-blue-950 via-[#0A2540] to-[#0A2540] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FBAB23] text-xs font-semibold mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>120+ Partner Campuses Across India</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight mb-4">
            Affiliated Universities & Institutes
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Explore verified institutional partners conducting coordinated on-campus placement drives with transparent CTC statistics and NIRF audit reporting.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search university name, state, or location..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md"
            />
          </div>
        </div>
      </section>

      {/* Main Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 w-full">
        
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-[#0A2540] font-heading">
              Showing {filteredColleges.length} Verified Institutions
            </h2>
            <p className="text-xs text-[#64748B]">All campuses enforce Single-Offer ethical placement policies.</p>
          </div>

          <Link
            href="/register?role=TPO_ADMIN"
            className="btn-primary text-xs sm:text-sm py-2.5 px-5 flex items-center gap-1.5 shadow-sm"
          >
            <span>Register Your Campus</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              className={`p-6 rounded-2xl bg-white border border-slate-200/90 border-l-4 ${college.accent} shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    {college.nirfRank}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0A2540] font-heading leading-snug mb-1">
                  {college.name}
                </h3>

                <div className="flex items-center gap-1 text-xs text-[#64748B] mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{college.location}</span>
                </div>

                {/* Placement Stats Strip */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center mb-4">
                  <div>
                    <span className="text-[10px] text-[#64748B] font-semibold block uppercase">Avg CTC</span>
                    <span className="text-xs font-bold text-[#0A2540]">{college.avgPackage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] font-semibold block uppercase">Top CTC</span>
                    <span className="text-xs font-bold text-emerald-600">{college.highestPackage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] font-semibold block uppercase">Placed</span>
                    <span className="text-xs font-bold text-blue-600">{college.placementRate}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified TPO Cell
                </span>
                <Link
                  href="/register?role=STUDENT"
                  className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                >
                  View Drives →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>

      <SiteFooter />
    </div>
  );
}
