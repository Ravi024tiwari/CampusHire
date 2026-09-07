'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Heart, 
  MessageCircle, 
  Repeat2, 
  CheckCircle2, 
  Building2, 
  GraduationCap, 
  Briefcase,
  Star,
  Quote,
  Share2,
  ExternalLink
} from 'lucide-react';

interface TestimonialTweet {
  id: string;
  type: 'STUDENT' | 'RECRUITER' | 'TPO';
  name: string;
  handle: string;
  avatarText: string;
  avatarBg: string;
  role: string;
  placedCompany: string;
  companyTag: string;
  companyColor: string;
  packageCTC?: string;
  content: string;
  highlightPhrase: string;
  likes: string;
  replies: string;
  reposts: string;
  timeAgo: string;
  beamGradient: string;
}

const TESTIMONIALS: TestimonialTweet[] = [
  {
    id: '1',
    type: 'STUDENT',
    name: 'Aarav Sharma',
    handle: '@aarav_codes',
    avatarText: 'AS',
    avatarBg: 'bg-gradient-to-br from-blue-600 to-indigo-600',
    role: 'B.Tech CSE, Batch of 2025',
    placedCompany: 'Google',
    companyTag: 'Google SWE',
    companyColor: 'bg-blue-50 text-blue-700 border-blue-200',
    packageCTC: '₹42.5 LPA',
    content: 'Uploaded my specialized AI & Backend resume on CampusHire in the morning, got shortlisted by the Google campus panel by afternoon! The live interview scorecard feedback was insane.',
    highlightPhrase: 'Got placed in Google with ₹42.5 LPA!',
    likes: '1,420',
    replies: '84',
    reposts: '126',
    timeAgo: '2h ago',
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #2563EB 330deg, #60A5FA 360deg)'
  },
  {
    id: '2',
    type: 'STUDENT',
    name: 'Priya Iyer',
    handle: '@priya_ml',
    avatarText: 'PI',
    avatarBg: 'bg-gradient-to-br from-emerald-600 to-teal-600',
    role: 'B.Tech AI & Data Science',
    placedCompany: 'Microsoft',
    companyTag: 'Microsoft Azure AI',
    companyColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    packageCTC: '₹38.0 LPA',
    content: 'The Multi-Resume Vault is a gamechanger. I maintained two different resumes for ML Engineering & Full-Stack. Both got filtered accurately with zero spreadsheet mess.',
    highlightPhrase: 'Accepted Microsoft offer in 1-click via Resend.',
    likes: '980',
    replies: '52',
    reposts: '89',
    timeAgo: '5h ago',
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #059669 330deg, #34D399 360deg)'
  },
  {
    id: '3',
    type: 'RECRUITER',
    name: 'Vikramaditya Roy',
    handle: '@vikram_talent_lead',
    avatarText: 'VR',
    avatarBg: 'bg-gradient-to-br from-amber-600 to-orange-600',
    role: 'Campus Hiring Lead @ Amazon APAC',
    placedCompany: 'Amazon',
    companyTag: 'Amazon Recruiter',
    companyColor: 'bg-amber-50 text-amber-800 border-amber-200',
    content: 'Screening 1,200+ applicants used to take our team 4 days. With CampusHire’s atomic batch progression, we filtered by 8.5 CGPA and shortlisted 60 students in under 15 seconds.',
    highlightPhrase: 'Shortlisted 60 engineers in under 15 seconds.',
    likes: '2,150',
    replies: '140',
    reposts: '310',
    timeAgo: '1d ago',
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #D97706 330deg, #FBAB23 360deg)'
  },
  {
    id: '4',
    type: 'STUDENT',
    name: 'Rohan Deshmukh',
    handle: '@rohan_dev',
    avatarText: 'RD',
    avatarBg: 'bg-gradient-to-br from-purple-600 to-pink-600',
    role: 'B.Tech IT, Tier-1 Institute',
    placedCompany: 'Stripe',
    companyTag: 'Stripe Payments',
    companyColor: 'bg-purple-50 text-purple-700 border-purple-200',
    packageCTC: '₹45.0 LPA',
    content: 'Single-Offer Protection really works! Once my friend accepted Deloitte, his slot freed up in the Stripe Day-1 drive and I was next on the shortlist. Ethical placement at its best.',
    highlightPhrase: 'Dream offer secured with fair anti-hoarding lock!',
    likes: '1,890',
    replies: '95',
    reposts: '174',
    timeAgo: '1d ago',
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #7C3AED 330deg, #C084FC 360deg)'
  },
  {
    id: '5',
    type: 'TPO',
    name: 'Dr. Neha Kulkarni',
    handle: '@tpo_head_dtu',
    avatarText: 'NK',
    avatarBg: 'bg-gradient-to-br from-sky-600 to-blue-700',
    role: 'Head of Placement Cell (TPO)',
    placedCompany: 'University TPO',
    companyTag: 'NIRF Top 20 Institute',
    companyColor: 'bg-sky-50 text-sky-700 border-sky-200',
    content: 'Our NIRF DCS reports used to take 3 weeks of manual spreadsheet calculations. On CampusHire, I exported the branch-wise median CTC tables with 1 click. Zero data mismatches.',
    highlightPhrase: '1-Click NIRF DCS export saved 3 weeks of work.',
    likes: '3,410',
    replies: '210',
    reposts: '460',
    timeAgo: '2d ago',
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #0284C7 330deg, #38BDF8 360deg)'
  },
  {
    id: '6',
    type: 'STUDENT',
    name: 'Ananya Verma',
    handle: '@ananya_tech',
    avatarText: 'AV',
    avatarBg: 'bg-gradient-to-br from-teal-600 to-emerald-700',
    role: 'B.Tech ECE, Batch 2025',
    placedCompany: 'Deloitte',
    companyTag: 'Deloitte Consulting',
    companyColor: 'bg-teal-50 text-teal-700 border-teal-200',
    packageCTC: '₹14.2 LPA',
    content: 'Got my official digital offer letter PDF delivered via email right during the convocation drive! The salary component breakdown was crystal clear with official digital seal.',
    highlightPhrase: 'Official sealed offer letter delivered instantly.',
    likes: '1,120',
    replies: '43',
    reposts: '67',
    timeAgo: '3d ago',
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #0D9488 330deg, #2DD4BF 360deg)'
  }
];

export function PlacementWallOfLove() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'STUDENT' | 'RECRUITER' | 'TPO'>('ALL');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const filteredTweets = activeFilter === 'ALL'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.type === activeFilter);

  const toggleLike = (id: string) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#EDF5FD] border-b border-blue-200/80 relative overflow-hidden select-none">
      
      {/* Background Ambient Orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-sky-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-xs backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FBAB23]" />
              <span>Verified Success Stories & Live Feed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold text-[#0A2540] font-heading tracking-tight leading-tight">
              Real Placements. Real Offers. Real Career Impact.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#475569] mt-2 leading-relaxed">
              Read how placed students, campus recruiters, and university placement directors experience transparent hiring on CampusHire.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-white border border-blue-200/70 shadow-[0_4px_16px_rgba(10,37,64,0.06)] self-start md:self-end">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'ALL'
                  ? 'bg-[#0A2540] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0A2540] hover:bg-blue-50/60'
              }`}
            >
              All Stories
            </button>
            <button
              onClick={() => setActiveFilter('STUDENT')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'STUDENT'
                  ? 'bg-[#0A2540] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0A2540] hover:bg-blue-50/60'
              }`}
            >
              🎓 Placed Students
            </button>
            <button
              onClick={() => setActiveFilter('RECRUITER')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'RECRUITER'
                  ? 'bg-[#0A2540] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0A2540] hover:bg-blue-50/60'
              }`}
            >
              🏢 Recruiters
            </button>
            <button
              onClick={() => setActiveFilter('TPO')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'TPO'
                  ? 'bg-[#0A2540] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0A2540] hover:bg-blue-50/60'
              }`}
            >
              🏛️ TPOs
            </button>
          </div>
        </div>

        {/* 6-Grid Social Post & Tweet Cards with Moving Border Beams */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {filteredTweets.map((tweet) => {
            const isLiked = !!likedPosts[tweet.id];

            return (
              <div
                key={tweet.id}
                className="group relative p-[2px] rounded-2xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(10,37,64,0.08),0_4px_10px_-2px_rgba(10,37,64,0.04)] hover:shadow-[0_20px_35px_-5px_rgba(10,37,64,0.16)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between isolate transform-gpu"
              >
                {/* 1. Base Static Border Background */}
                <div className="absolute inset-0 bg-slate-200/90 rounded-2xl pointer-events-none" />

                {/* 2. Animated Rotating Glowing Color Beam Moving Around Edges */}
                <div
                  className="absolute -inset-[150%] m-auto w-[400%] h-[400%] animate-spin-border opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none will-change-transform"
                  style={{ background: tweet.beamGradient }}
                />

                {/* 3. Pure White Foreground Card Container */}
                <div className="relative z-10 w-full h-full bg-white rounded-[14px] p-5 sm:p-6 flex flex-col justify-between space-y-4">
                  
                  <div>
                    {/* Author Row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-11 h-11 rounded-full ${tweet.avatarBg} text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md`}>
                          {tweet.avatarText}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-[#0A2540] font-heading truncate">
                              {tweet.name}
                            </span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                          </div>
                          <span className="text-xs text-[#64748B] block truncate font-mono">
                            {tweet.handle}
                          </span>
                        </div>
                      </div>

                      {/* Placed Company Badge */}
                      <span className={`inline-flex items-center text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border shadow-2xs flex-shrink-0 ${tweet.companyColor}`}>
                        {tweet.companyTag}
                      </span>
                    </div>

                    {/* Sub Role & Package CTC */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 text-xs">
                      <span className="text-[#64748B] font-medium truncate">
                        {tweet.role}
                      </span>
                      {tweet.packageCTC && (
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px] flex-shrink-0">
                          {tweet.packageCTC}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <p className="text-xs sm:text-[13px] text-[#334155] leading-relaxed mb-3">
                      &ldquo;{tweet.content}&rdquo;
                    </p>

                    {/* Standout Highlight Phrase */}
                    <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs font-semibold text-blue-900 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#FBAB23] flex-shrink-0" />
                      <span>{tweet.highlightPhrase}</span>
                    </div>
                  </div>

                  {/* Social Action Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(tweet.id);
                        }}
                        className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-rose-500' : ''}`} />
                        <span className="text-[11px]">{isLiked ? 'Liked' : tweet.likes}</span>
                      </button>

                      <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-[11px]">{tweet.replies}</span>
                      </div>

                      <div className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors">
                        <Repeat2 className="w-4 h-4" />
                        <span className="text-[11px]">{tweet.reposts}</span>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400">
                      {tweet.timeAgo}
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Community Trust Callout */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-blue-200/80 shadow-[0_10px_30px_-5px_rgba(10,37,64,0.06)] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-[#0A2540] font-heading flex items-center justify-center sm:justify-start gap-2">
              <Star className="w-4 h-4 text-[#FBAB23] fill-[#FBAB23]" />
              <span>Rated 4.9/5 by 15,000+ Placed Students & Placement Cells</span>
            </h4>
            <p className="text-xs text-[#64748B]">
              Every review and placed package is backed by cryptographic single-offer acceptance logs.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="/register?role=STUDENT"
              className="btn-primary text-xs sm:text-sm py-2.5 px-5 shadow-sm"
            >
              Start Your Placement Journey
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
