'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  BrainCircuit, 
  Code2, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  BarChart3, 
  Layers, 
  Cpu, 
  Clock, 
  Check, 
  Flame, 
  Laptop,
  Compass,
  FileCheck,
  FileText,
  TrendingUp,
  MessageSquare,
  BookOpen,
  CheckCircle,
  Play,
  X,
  RotateCcw,
  Zap
} from 'lucide-react';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

interface AssessmentTrack {
  id: string;
  title: string;
  category: 'technical' | 'aptitude' | 'core_cs';
  description: string;
  questionsCount: number;
  durationMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  passingScore: number;
}

const assessmentTracks: AssessmentTrack[] = [
  {
    id: 'tech-dsa-1',
    title: 'Data Structures & Algorithms Benchmark',
    category: 'technical',
    description: 'Arrays, Two-Pointers, Trees, Dynamic Programming, and Time Complexity.',
    questionsCount: 15,
    durationMinutes: 30,
    difficulty: 'Medium',
    topics: ['Arrays', 'Binary Search', 'Trees', 'DP'],
    passingScore: 70,
  },
  {
    id: 'tech-fullstack-2',
    title: 'Full Stack Web Engineering (React & Node)',
    category: 'technical',
    description: 'Component lifecycles, REST APIs, TypeScript, state management & databases.',
    questionsCount: 20,
    durationMinutes: 25,
    difficulty: 'Medium',
    topics: ['React', 'TypeScript', 'Node.js', 'SQL'],
    passingScore: 75,
  },
  {
    id: 'aptitude-quant-1',
    title: 'Quantitative & Logical Reasoning',
    category: 'aptitude',
    description: 'Percentages, Permutations, Syllogisms, Series, and Data Interpretation.',
    questionsCount: 20,
    durationMinutes: 20,
    difficulty: 'Easy',
    topics: ['Arithmetic', 'Logic', 'DI', 'Puzzles'],
    passingScore: 65,
  },
  {
    id: 'core-cs-1',
    title: 'Core Computer Science Fundamentals',
    category: 'core_cs',
    description: 'Operating Systems (Memory/Threads), DBMS (ACID/Indexing), and Computer Networks.',
    questionsCount: 25,
    durationMinutes: 30,
    difficulty: 'Hard',
    topics: ['OS', 'DBMS', 'CN', 'OOP'],
    passingScore: 80,
  },
];

const sampleQuizQuestions = [
  {
    question: 'What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
    correctIndex: 2,
    explanation: 'A balanced BST divides the search space in half at each node, resulting in O(log n) time complexity.',
  },
  {
    question: 'In React, which hook is primarily used for handling side-effects like data fetching and subscriptions?',
    options: ['useState', 'useEffect', 'useMemo', 'useRef'],
    correctIndex: 1,
    explanation: 'useEffect is designed to execute side effects after render cycles.',
  },
  {
    question: 'Which ACID property ensures that all operations in a database transaction complete successfully or none do?',
    options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
    correctIndex: 0,
    explanation: 'Atomicity guarantees that all transactions are treated as single all-or-nothing units of work.',
  },
];

export default function StudentSkillAssessmentsPage() {
  const [profileSkills, setProfileSkills] = useState<string[]>([]);
  const [cgpa, setCgpa] = useState<number>(0);
  const [branch, setBranch] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'technical' | 'aptitude' | 'core_cs'>('all');

  // Interactive Quiz Modal State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  useEffect(() => {
    async function fetchStudentProfile() {
      try {
        setIsLoading(true);
        const res = await apiClient.get<ApiResponse<any>>('/api/student/profile');
        if (res.data.success && res.data.data?.student) {
          const s = res.data.data.student;
          setProfileSkills(s.skills || []);
          setCgpa(s.cgpa || 0);
          setBranch(s.branch || '');
        }
      } catch (err) {
        console.error('[FETCH_STUDENT_PROFILE_ASSESSMENT_ERROR]', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudentProfile();
  }, []);

  const handleStartQuiz = () => {
    setIsQuizOpen(true);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsQuizSubmitted(false);
  };

  const handleNextQuestion = () => {
    if (selectedOption === sampleQuizQuestions[currentQuestionIndex].correctIndex) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex + 1 < sampleQuizQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsQuizSubmitted(true);
    }
  };

  const filteredTracks = activeCategory === 'all'
    ? assessmentTracks
    : assessmentTracks.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <div className="max-w-[1500px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
        
        {/* =========================================================================
            1. HERO SHOWCASE BANNER (Interactive, Responsive & High-Fidelity)
           ========================================================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#EEF6FF] via-[#F3F8FF] to-[#FAF5FF] border border-blue-100/90 p-5 sm:p-7 md:p-9 lg:p-10 shadow-xs">
          
          {/* Subtle Ambient Background Watermarks & Gradient Flares */}
          <div className="absolute top-3 right-1/4 opacity-10 pointer-events-none hidden md:block">
            <GraduationCap className="w-36 h-36 text-blue-900" />
          </div>
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Floating Slogans & Doodles for Desktop/Tablet */}
          <div className="hidden lg:flex items-center justify-between pointer-events-none mb-3 px-2">
            <div />
            <div className="flex items-center gap-1.5 text-slate-500 font-serif italic font-bold text-xs -ml-28">
              <span>Practice Today</span>
              <svg className="w-5 h-5 text-slate-400 transform rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div className="text-right">
              <p className="font-serif italic font-black text-blue-950 text-xs sm:text-sm leading-tight">
                Stronger You<br />
                <span className="text-blue-700">Brighter Tomorrow</span>
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Heading, Subtitle, Feature Badges & CTA */}
            <div className="lg:col-span-6 xl:col-span-7 space-y-5 sm:space-y-6">
              
              {/* Top Badge: Skill Assessment */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-100/90 text-blue-700 text-xs font-black border border-blue-200 shadow-2xs">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>Skill Assessment</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black tracking-tight font-heading text-[#0A2540] leading-tight">
                  Assess Your Skills,
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black tracking-tight font-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 leading-tight">
                  Unlock New Opportunities
                </h2>
              </div>

              {/* Subheadline */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium max-w-xl">
                Take tests, track your progress, and showcase your skills to get placement ready. Practice. Improve. Grow.
              </p>

              {/* 4 Feature Badges in Responsive Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {/* 1. Real-world Questions */}
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-purple-50/90 border border-purple-200/80 shadow-2xs hover:bg-purple-100/70 transition-colors">
                  <div className="p-1.5 rounded-xl bg-purple-200/90 text-purple-700 shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-extrabold text-purple-900 leading-tight">
                    Real-world Questions
                  </span>
                </div>

                {/* 2. Instant Feedback */}
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 shadow-2xs hover:bg-emerald-100/70 transition-colors">
                  <div className="p-1.5 rounded-xl bg-emerald-200/90 text-emerald-700 shrink-0">
                    <BarChart3 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-extrabold text-emerald-900 leading-tight">
                    Instant Feedback
                  </span>
                </div>

                {/* 3. Track Progress */}
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 shadow-2xs hover:bg-amber-100/70 transition-colors">
                  <div className="p-1.5 rounded-xl bg-amber-200/90 text-amber-700 shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-extrabold text-amber-900 leading-tight">
                    Track Your Progress
                  </span>
                </div>

                {/* 4. Boost Chances */}
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-blue-50/90 border border-blue-200/80 shadow-2xs hover:bg-blue-100/70 transition-colors">
                  <div className="p-1.5 rounded-xl bg-blue-200/90 text-blue-700 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-extrabold text-blue-900 leading-tight">
                    Boost Placement Chances
                  </span>
                </div>
              </div>

              {/* CTA Button & Handwritten Note */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleStartQuiz}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center gap-2 transition-all active:scale-95 cursor-pointer hover:shadow-lg"
                >
                  <span>Start Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Cursive handwritten underline accent */}
                <div className="flex flex-col">
                  <span className="font-serif italic font-bold text-blue-700 text-xs sm:text-sm tracking-wide">
                    — A step closer to your dream career!
                  </span>
                  <svg className="w-36 h-2 text-blue-500/70" viewBox="0 0 150 10" fill="none">
                    <path d="M2 7C40 2 110 3 148 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Right Column: Native Interactive Progress Deck & Competency Hub */}
            <div className="lg:col-span-6 xl:col-span-5 grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-4 items-center">
              
              {/* Left Sub-column: 3 Floating Interactive Skill Cards */}
              <div className="sm:col-span-6 space-y-3">
                
                {/* 1. Aptitude Card */}
                <div 
                  onClick={() => {
                    setActiveCategory('aptitude');
                    handleStartQuiz();
                  }}
                  className="group p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer space-y-2 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 group-hover:text-emerald-700 transition-colors">
                        Aptitude
                      </h4>
                      <p className="text-[10px] font-semibold text-slate-400">Quantitative & Logic</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[92%] transition-all duration-700" />
                  </div>
                </div>

                {/* 2. Technical Skills Card */}
                <div 
                  onClick={() => {
                    setActiveCategory('technical');
                    handleStartQuiz();
                  }}
                  className="group p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer space-y-2 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 group-hover:text-blue-700 transition-colors">
                        Technical Skills
                      </h4>
                      <p className="text-[10px] font-semibold text-slate-400">DSA & Full Stack</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full w-[85%] transition-all duration-700" />
                  </div>
                </div>

                {/* 3. Communication Card */}
                <div 
                  onClick={handleStartQuiz}
                  className="group p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-300 transition-all cursor-pointer space-y-2 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 group-hover:text-purple-700 transition-colors">
                        Communication
                      </h4>
                      <p className="text-[10px] font-semibold text-slate-400">Interview Fluency</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full w-[88%] transition-all duration-700" />
                  </div>
                </div>

              </div>

              {/* Right Sub-column: Interactive Progress Gauge & Checklist */}
              <div className="sm:col-span-6 p-4 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-xs space-y-3.5 flex flex-col justify-between">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <h4 className="text-xs font-black text-[#0A2540] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Your Progress</span>
                  </h4>
                  <span className="text-[10.5px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    On Track
                  </span>
                </div>

                {/* Donut Progress Visual */}
                <div className="flex items-center justify-center py-1">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-teal-500 transition-all duration-1000 ease-out"
                        strokeDasharray="75, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-base font-black text-[#0A2540] font-heading">75%</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Completed</span>
                    </div>
                  </div>
                </div>

                {/* Verified Competencies Checklist */}
                <div className="space-y-1.5 text-[11px] font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Aptitude</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Technical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Communication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Domain Knowledge</span>
                  </div>
                </div>

                {/* Mini Footer Pill */}
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-[10px] font-serif italic text-slate-500 font-bold">
                    &quot;Better Skills, Brighter Future&quot;
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* =========================================================================
            2. ACTIVE SKILLS FROM DATABASE & ATS FIT MATRIX
           ========================================================================= */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg sm:text-xl font-black text-[#0A2540] font-heading">
                  Your Verified Competencies & ATS Match Matrix
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Live skills pulled from your verified student profile and evaluated across institutional job drives.
              </p>
            </div>

            <Link
              href="/student/profile"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors"
            >
              <span>Update Profile Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Skill Tag Cloud */}
          {profileSkills.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Verified Skills Profile ({profileSkills.length})
                </p>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Ready for AI ATS Evaluation
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {profileSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/60 border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs hover:border-blue-300 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 space-y-2">
              <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>No Skills Added to Profile Yet</span>
              </p>
              <p className="text-xs text-amber-700 font-medium">
                Add your technical stack (e.g. React, Node.js, Python, SQL) to match with institutional placement criteria.
              </p>
              <Link
                href="/student/profile"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                <span>Add Skills Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* 3 Core Placement Guard Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3 border-t border-slate-100 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>AI ATS Semantic Matching</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Resume keywords and skill competencies are scored automatically against recruiter criteria during application submission.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Academic Credentials</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Branch ({branch || 'B.Tech CSE'}) and CGPA ({cgpa || '8.0+'}) eligibility filters are locked to prevent ineligible applications.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <Award className="w-4 h-4 text-purple-600" />
                <span>Fast-Track Placement</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Students with verified high ATS match scores appear prioritized in recruiter candidate review pipelines.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. TECHNICAL BENCHMARK TRACKS
           ========================================================================= */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#0A2540] font-heading">
                Placement Readiness Assessment Tracks
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Standardized problem sets tailored to company interview patterns.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#0A2540] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Tracks
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('technical')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'technical'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Technical & Coding
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('aptitude')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'aptitude'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Aptitude
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('core_cs')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'core_cs'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Core CS
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredTracks.map((track) => (
              <div
                key={track.id}
                className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                      {track.category === 'technical' ? (
                        <Code2 className="w-5 h-5" />
                      ) : track.category === 'aptitude' ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <Cpu className="w-5 h-5" />
                      )}
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold border ${
                        track.difficulty === 'Easy'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : track.difficulty === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {track.difficulty}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-extrabold text-[#0A2540] group-hover:text-blue-600 transition-colors">
                      {track.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  {/* Topic Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {track.topics.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10.5px] font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{track.questionsCount} Qs</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{track.durationMinutes} mins</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartQuiz}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Practice Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            4. QUICK BOTTOM ACTION BAR
           ========================================================================= */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-extrabold text-[#0A2540]">
              Ready to apply your verified skills to live placement drives?
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Browse eligible companies and schedule interview rounds tailored to your profile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/student/resume"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Resume Manager
            </Link>
            <Link
              href="/student/jobs"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>Browse Active Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* =========================================================================
          5. INTERACTIVE LIVE QUIZ MODAL
         ========================================================================= */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-7 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0A2540]">
                    Placement Readiness Quick Assessment
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400">
                    Question {currentQuestionIndex + 1} of {sampleQuizQuestions.length}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsQuizOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isQuizSubmitted ? (
              <div className="space-y-4">
                <p className="text-sm sm:text-base font-extrabold text-[#0A2540] leading-snug">
                  {sampleQuizQuestions[currentQuestionIndex].question}
                </p>

                <div className="space-y-2">
                  {sampleQuizQuestions[currentQuestionIndex].options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/60 text-blue-900 ring-2 ring-blue-600/15 font-bold'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        <span>{option}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'}`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsQuizOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    disabled={selectedOption === null}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
                      selectedOption !== null
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 active:scale-95 cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    <span>{currentQuestionIndex + 1 === sampleQuizQuestions.length ? 'Submit Assessment' : 'Next Question'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Quiz Completion Report */
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <Award className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-[#0A2540] font-heading">
                    Assessment Completed!
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    You scored <strong className="text-emerald-600 font-extrabold">{score}</strong> out of <strong className="text-slate-700 font-extrabold">{sampleQuizQuestions.length}</strong> ({Math.round((score / sampleQuizQuestions.length) * 100)}% Proficiency).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1">
                  <p className="font-bold text-slate-800">Recruiter Feedback Summary:</p>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    Great performance on core computer science foundations. Your profile competencies are synchronized with active placement drives.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleStartQuiz}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsQuizOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                  >
                    Done & View Drives
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
