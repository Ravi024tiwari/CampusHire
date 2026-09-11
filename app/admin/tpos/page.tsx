'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  UserPlus,
  Building2,
  Mail,
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Sparkles,
  RefreshCw,
  Phone,
  Briefcase,
  ChevronRight,
  ExternalLink,
  Layers,
  Filter,
  Compass,
  ArrowUpRight,
  Award,
} from 'lucide-react';

interface TpoRecord {
  id: string;
  designation: string | null;
  department: string | null;
  isActive: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    role: string;
    isActive: boolean;
    createdAt: string;
  };
  college: {
    id: string;
    name: string;
    code: string | null;
    city: string | null;
    state: string | null;
    logoUrl: string | null;
    isVerified: boolean;
    _count?: {
      students: number;
      jobs: number;
    };
  } | null;
}

interface StatsData {
  total: number;
  active: number;
  inactive: number;
  verifiedCollegesCount: number;
}

export default function AdminTpoDirectoryPage() {
  const [tpos, setTpos] = useState<TpoRecord[]>([]);
  const [stats, setStats] = useState<StatsData>({
    total: 0,
    active: 0,
    inactive: 0,
    verifiedCollegesCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');

  const fetchTpos = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/tpos');
      const json = await res.json();
      if (json.success && json.data) {
        setTpos(json.data.tpos || []);
        if (json.data.stats) {
          setStats(json.data.stats);
        }
      }
    } catch (err) {
      console.error('Failed to load TPOs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTpos();
  }, []);

  const filteredTpos = useMemo(() => {
    return tpos.filter((tpo) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        tpo.user?.name?.toLowerCase().includes(q) ||
        tpo.user?.email?.toLowerCase().includes(q) ||
        tpo.college?.name?.toLowerCase().includes(q) ||
        (tpo.college?.code && tpo.college.code.toLowerCase().includes(q)) ||
        (tpo.designation && tpo.designation.toLowerCase().includes(q)) ||
        (tpo.department && tpo.department.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === 'ALL'
          ? true
          : statusFilter === 'ACTIVE'
          ? tpo.isActive && tpo.user?.isActive
          : !tpo.isActive || !tpo.user?.isActive;

      return matchesSearch && matchesStatus;
    });
  }, [tpos, searchQuery, statusFilter]);

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1600px] mx-auto space-y-6 sm:space-y-8 transition-all">
      
      {/* 1. Header with Appoint CTA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-200">
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-slate-900 text-[#FBAB23] border border-slate-800 shadow-md shrink-0">
            <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                Training & Placement Officers (TPO)
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-extrabold text-amber-900 border border-amber-200">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Super Admin Hub</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-3xl">
              Directory of all appointed institutional TPO officers managing campus recruitment drives, student verifications, and corporate relations.
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 self-start lg:self-auto shrink-0">
          <button
            type="button"
            onClick={fetchTpos}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-2xs transition-all cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <Link
            href="/admin/tpos/register"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-slate-900 hover:bg-black shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-[#FBAB23]" />
            <span>Appoint New TPO</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1.5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Total TPO Officers</span>
            <Users className="w-4 h-4 text-slate-800" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            {stats.total}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Across all accredited institutions
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1.5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Active Accounts</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-heading">
            {stats.active}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold">
            Active Placement Consoles
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1.5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Accredited Colleges</span>
            <Building2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            {stats.verifiedCollegesCount}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Verified Partner Campuses
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1.5 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Inactive / Suspended</span>
            <XCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 font-heading">
            {stats.inactive}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            Requires Super Admin review
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by officer name, email, college, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-800 font-medium transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 self-stretch sm:self-auto overflow-x-auto">
          {(['ALL', 'ACTIVE', 'INACTIVE'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                statusFilter === filter
                  ? 'bg-slate-900 text-[#FBAB23] shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
              }`}
            >
              {filter === 'ALL' ? 'All Status' : filter === 'ACTIVE' ? 'Active' : 'Inactive'}
            </button>
          ))}
        </div>
      </div>

      {/* 4. TPO Officers Roster Grid */}
      {loading ? (
        <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
          <div className="text-sm font-bold text-slate-600">Loading TPO officers directory...</div>
        </div>
      ) : filteredTpos.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-800 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
              No TPO Officers Found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery
                ? `No officers match your query "${searchQuery}".`
                : 'No TPO officers have been appointed yet. Appoint the first TPO officer for a verified institution.'}
            </p>
          </div>
          <div>
            <Link
              href="/admin/tpos/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-slate-900 hover:bg-black transition-all shadow-sm cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-[#FBAB23]" />
              <span>Appoint TPO Now</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredTpos.map((tpo) => {
            const isTpoActive = tpo.isActive && tpo.user?.isActive;
            return (
              <div
                key={tpo.id}
                className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all space-y-4 flex flex-col justify-between group"
              >
                {/* Top Officer Info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      {tpo.user?.avatarUrl ? (
                        <img
                          src={tpo.user.avatarUrl}
                          alt={tpo.user.name}
                          className="w-13 h-13 rounded-2xl object-cover border-2 border-slate-100 shadow-xs shrink-0"
                        />
                      ) : (
                        <div className="w-13 h-13 rounded-2xl bg-slate-900 text-[#FBAB23] font-black text-base flex items-center justify-center shrink-0 shadow-xs font-heading">
                          {tpo.user?.name ? tpo.user.name.substring(0, 2).toUpperCase() : 'TP'}
                        </div>
                      )}
                      <div>
                        <h4 className="text-base font-extrabold text-slate-900 font-heading group-hover:text-amber-600 transition-colors">
                          {tpo.user?.name}
                        </h4>
                        <div className="text-xs text-slate-500 font-medium">
                          {tpo.designation || 'Head, Training & Placement'}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {tpo.department || 'Central Placement Cell'}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 border ${
                        isTpoActive
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {isTpoActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Affiliated College Banner */}
                  {tpo.college ? (
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        {tpo.college.logoUrl ? (
                          <img
                            src={tpo.college.logoUrl}
                            alt={tpo.college.name}
                            className="w-8 h-8 rounded-xl object-contain bg-white p-0.5 border border-slate-200 shrink-0"
                          />
                        ) : (
                          <Building2 className="w-5 h-5 text-slate-700 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                            {tpo.college.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {tpo.college.city ? `${tpo.college.city}, ` : ''}{tpo.college.state || 'India'}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/admin/colleges/${tpo.college.id}`}
                        className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
                        title="View College Profile"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 font-semibold">
                      Unassigned Institution
                    </div>
                  )}

                  {/* Contact Email */}
                  <div className="space-y-1 pt-1 text-xs text-slate-600 font-mono">
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{tpo.user?.email}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>Appointed {new Date(tpo.createdAt).toLocaleDateString()}</span>
                  <span className="font-mono text-[10px] text-slate-900 font-extrabold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    TPO_ADMIN
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
