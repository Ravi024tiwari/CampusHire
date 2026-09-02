import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { BrandLogo } from "@/components/BrandLogo";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#FBAB23] animate-pulse"></span>
                <span>AI-Assisted University Recruitment & Placement ERP</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A2540] leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6 font-heading">
                From Campus Application to{" "}
                <span className="bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#FBAB23] bg-clip-text text-transparent">
                  Achievement.
                </span>
                <br className="hidden sm:inline" />
                <span className="sm:inline"> Your Recruitment Path Starts Here.</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-[#475569] leading-relaxed max-w-2xl mb-6 sm:mb-8 font-normal">
                Streamline on-campus drives, multi-resume management, candidate pipelines, and automated offer letter dispatch. Built for modern universities, high-growth recruiters, and ambitious students.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <Link href="/register" className="btn-primary text-sm sm:text-base py-3 sm:py-3.5 px-6 sm:px-7 text-center shadow-lg shadow-blue-600/20">
                  Get Started Free →
                </Link>
                <Link href="/login" className="btn-secondary text-sm sm:text-base py-3 sm:py-3.5 px-5 sm:px-6 text-center">
                  Access Portal
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 sm:mt-10 pt-6 border-t border-[#E2E8F0] w-full flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#64748B] font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Single-Offer Placement Guard</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>NIRF Accreditation Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Instant Resend Offer Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Column: Placecom-Style Mockup Window (Fluid on Mobile, iPad, and Desktop) */}
            <div className="lg:col-span-5 w-full max-w-lg lg:max-w-none mx-auto">
              <div className="mock-window shadow-2xl transition-all duration-300 hover:shadow-blue-500/10">
                {/* Window Header */}
                <div className="mock-window-bar">
                  <div className="window-dots">
                    <span className="dot-red"></span>
                    <span className="dot-yellow"></span>
                    <span className="dot-green"></span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#64748B] font-mono truncate">
                    CampusHire — Recruiter Drive Hub
                  </span>
                  <span className="badge-pill badge-verified text-[9px] sm:text-[10px] flex-shrink-0">
                    Active Drive
                  </span>
                </div>

                {/* Window Content */}
                <div className="p-4 sm:p-5 space-y-4">
                  {/* Drive Card */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                          S
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0A2540]">Stripe India</h4>
                          <p className="text-xs text-[#64748B]">Associate Software Engineer</p>
                        </div>
                      </div>
                      <span className="badge-pill badge-blue font-mono font-bold text-xs">
                        18 LPA
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#E2E8F0]/60 text-xs">
                      <div>
                        <span className="text-[#94A3B8] block text-[10px] sm:text-xs">Cutoff:</span>
                        <span className="font-semibold text-[#1E293B]">Min 8.0 CGPA</span>
                      </div>
                      <div>
                        <span className="text-[#94A3B8] block text-[10px] sm:text-xs">Branches:</span>
                        <span className="font-semibold text-[#1E293B]">CSE, IT, ECE</span>
                      </div>
                    </div>
                  </div>

                  {/* Candidate Pipeline Progress */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-[#334155]">Applicant Pipeline Review</span>
                      <span className="text-blue-600 font-bold">42 Shortlisted</span>
                    </div>
                    
                    {/* Pipeline Mini Row 1 */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-white border border-[#E2E8F0] shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          RS
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0F172A]">Rohan Sharma</p>
                          <p className="text-[10px] text-[#64748B]">CSE · 8.9 CGPA</p>
                        </div>
                      </div>
                      <span className="badge-pill badge-verified text-[9px] sm:text-[10px]">
                        Offer Released
                      </span>
                    </div>

                    {/* Pipeline Mini Row 2 */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-white border border-[#E2E8F0] shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          PS
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0F172A]">Priya Sen</p>
                          <p className="text-[10px] text-[#64748B]">IT · 8.5 CGPA</p>
                        </div>
                      </div>
                      <span className="badge-pill badge-purple text-[9px] sm:text-[10px]">
                        Interview Round 2
                      </span>
                    </div>
                  </div>

                  {/* 1-Click Action Bar */}
                  <div className="pt-2">
                    <Link href="/register?role=RECRUITER" className="btn-accent w-full text-xs py-2.5 flex items-center justify-center">
                      ⚡ Post Your Campus Placement Drive →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Metrics Bar (Responsive on Mobile & iPad) */}
      <section className="bg-[#0A2540] text-white py-10 sm:py-12 border-y border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="p-2">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FBAB23] font-heading">100%</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Automated Verification</p>
            </div>
            <div className="p-2">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#38BDF8] font-heading">500+</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Placement Drives</p>
            </div>
            <div className="p-2">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#34D399] font-heading">15,000+</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Offers Dispatched</p>
            </div>
            <div className="p-2">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FBAB23] font-heading">&lt; 15ms</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Atomic Bulk Updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Feature Pillars (Responsive iPad 3-column / 1-column) */}
      <section id="features" className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="badge-pill badge-blue mb-3">Enterprise Capabilities</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A2540] font-heading">
              Engineered for Every Stage of Campus Hiring
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#64748B] mt-3 sm:mt-4">
              Everything universities and recruiting partners need to run flawless placement seasons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="card-placecom flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold mb-5">
                📄
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0A2540] mb-2.5 font-heading">
                Multi-Resume Vault
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Students can upload and store tailored resumes (Full Stack, Data Science, Core) on Cloudinary with automatic fallback and default selection.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-placecom flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold mb-5">
                ⚡
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0A2540] mb-2.5 font-heading">
                Atomic Bulk Progression
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Recruiters can filter candidates by branch & CGPA and promote batches of 50+ students to Shortlisted or Interview Scheduled in a single fast query.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-placecom flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold mb-5">
                🎉
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0A2540] mb-2.5 font-heading">
                Offer Dispatch via Resend
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Issue formal offers with custom CTC and PDF links. Candidates receive instant branded email notifications and can Accept with Single-Offer protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholders Section (Fluid on iPad Portrait 2x2 & Desktop 1x4) */}
      <section id="stakeholders" className="py-14 sm:py-20 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="badge-pill badge-purple mb-3">Unified Ecosystem</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A2540] font-heading">
              Built for All Four Stakeholders
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Student Card */}
            <div className="card-placecom flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-3">🎓</div>
                <h4 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">For Students</h4>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  Smart job feeds, instant eligibility matching, multi-resume management, and live offer tracking.
                </p>
              </div>
              <Link href="/register?role=STUDENT" className="text-xs font-bold text-blue-600 hover:text-blue-800 mt-6 block">
                Join as Student →
              </Link>
            </div>

            {/* Recruiter Card */}
            <div className="card-placecom flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-3">🏢</div>
                <h4 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">For Recruiters</h4>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  Multi-college drives, applicant filtering, bulk shortlisting, and formal offer dispatch.
                </p>
              </div>
              <Link href="/register?role=RECRUITER" className="text-xs font-bold text-blue-600 hover:text-blue-800 mt-6 block">
                Post Campus Drives →
              </Link>
            </div>

            {/* TPO Card */}
            <div className="card-placecom flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-3">🏛️</div>
                <h4 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">For College TPOs</h4>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  Campus student roster, drive approvals, company invites, and NIRF accreditation statistics.
                </p>
              </div>
              <Link href="/register?role=TPO_ADMIN" className="text-xs font-bold text-blue-600 hover:text-blue-800 mt-6 block">
                Register Your College →
              </Link>
            </div>

            {/* Super Admin Card */}
            <div className="card-placecom flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-3">👑</div>
                <h4 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">Super Admin</h4>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  Verification queues, global KPI analytics, company & college approvals, and platform governance.
                </p>
              </div>
              <Link href="/login" className="text-xs font-bold text-blue-600 hover:text-blue-800 mt-6 block">
                Admin Console →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2540] text-slate-400 py-10 sm:py-12 text-sm border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <BrandLogo size="md" variant="dark" />
            <span className="text-xs text-slate-400">© {new Date().getFullYear()} CampusHire. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300">
            <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/colleges" className="hover:text-white transition-colors">Colleges</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link href="/register" className="hover:text-white transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
