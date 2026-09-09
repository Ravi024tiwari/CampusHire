'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  RotateCcw, 
  TrendingUp, 
  Award, 
  Zap, 
  ArrowRight,
  Database,
  Cpu,
  BrainCircuit,
  FileCheck2,
  ChevronRight,
  ListFilter,
  Check,
  Flame,
  ShieldAlert,
  Copy,
  Sliders,
  ExternalLink,
  Search,
  Target,
  BarChart3,
  Layers,
  Compass
} from 'lucide-react';
import { AtsAnalysisResult } from '@/lib/ai/ats-pipeline';

export interface AtsScoreCardProps {
  scoreData: AtsAnalysisResult | null;
  isLoading: boolean;
  isCached?: boolean;
  onAnalyze: (forceRefresh?: boolean) => void;
  error?: string | null;
}

export const AtsScoreCard: React.FC<AtsScoreCardProps> = ({
  scoreData,
  isLoading,
  isCached = false,
  onAnalyze,
  error,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'matched' | 'missing' | 'partial'>('all');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    { title: 'Parsing Resume Structure', desc: 'Extracting skills, projects, and work history...' },
    { title: 'Analyzing Job Description', desc: 'Identifying required tech stack & campus criteria...' },
    { title: 'Semantic Keyword Matching', desc: 'Evaluating contextual fit & weighted keyword matches...' },
    { title: 'Synthesizing ATS Scorecard', desc: 'Generating detailed score breakdown & tailoring roadmap...' },
  ];

  // Step-by-step progress simulation for interactive feedback
  useEffect(() => {
    if (!isLoading) {
      setLoadingStep(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 700);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleCopySummary = () => {
    if (!scoreData?.summary) return;
    navigator.clipboard.writeText(
      `ATS Match Score: ${scoreData.overallScore}%\n\nVerdict: ${scoreData.summary}\n\nTop Recommendations:\n${scoreData.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}`
    );
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // 1. Loading State (Vibrant, Light, Warm Indian Tricolor Glow)
  if (isLoading) {
    return (
      <div className="relative overflow-hidden p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-orange-50/90 via-white to-emerald-50/80 text-slate-800 border-2 border-orange-200/90 shadow-xl shadow-orange-500/10">
        {/* Warm saffron & emerald ambient backdrops */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-orange-400/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Top Ticker Header */}
          <div className="flex items-center justify-between pb-4 border-b border-orange-200/60">
            <div className="flex items-center gap-3">
              <div className="relative p-2.5 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20">
                <BrainCircuit className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
                </span>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black tracking-tight text-slate-900 font-heading flex items-center gap-2">
                  <span>AI ATS Engine Processing</span>
                </h4>
                <p className="text-xs text-orange-700 font-semibold">Groq Fast Neural Inference</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-300 text-orange-800 text-xs font-bold">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
              <span>Step {loadingStep + 1} of {loadingSteps.length}</span>
            </div>
          </div>

          {/* Active Step Progress */}
          <div className="space-y-3 py-1">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full border-2 border-orange-600 border-t-transparent animate-spin shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 transition-all duration-300">
                  {loadingSteps[loadingStep].title}
                </p>
                <p className="text-[11.5px] text-slate-600 font-medium">
                  {loadingSteps[loadingStep].desc}
                </p>
              </div>
            </div>

            {/* Indian Tricolor Gradient Progress Bar */}
            <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden p-0.5 border border-orange-200/50">
              <div 
                className="bg-gradient-to-r from-orange-500 via-blue-600 to-emerald-500 h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="p-5 sm:p-6 rounded-3xl bg-rose-50/90 border-2 border-rose-200 text-rose-950 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-rose-100 text-rose-600 border border-rose-200">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-rose-900">
                ATS Analysis Could Not Be Completed
              </h4>
              <p className="text-[11px] text-rose-700">Please verify your uploaded resume or try again.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onAnalyze(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-xs hover:bg-rose-700 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Analysis</span>
          </button>
        </div>
        <p className="text-xs text-rose-800 bg-white/80 p-3.5 rounded-2xl border border-rose-200/60 leading-relaxed font-medium">
          {error}
        </p>
      </div>
    );
  }

  // 3. Initial Call-to-Action Banner (Warm Saffron, Cream & Emerald Accents)
  if (!scoreData) {
    return (
      <div className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-emerald-50/40 border-2 border-orange-200/80 shadow-lg shadow-orange-500/5">
        {/* Soft decorative background glows */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500 text-white text-[10.5px] font-black uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-200" /> AI Resume Intelligence
              </span>
              <span className="text-[11px] text-orange-900/80 font-bold">• Instant Fit Scoring</span>
            </div>
            
            <h4 className="text-base sm:text-lg font-black tracking-tight text-slate-900 font-heading">
              Check Your ATS Match & Skill Alignment
            </h4>
            
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Analyze your uploaded resume against this job's tech stack, keyword requirements, and placement criteria before applying.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onAnalyze(false)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer shrink-0 border border-orange-400/40"
          >
            <Zap className="w-4 h-4 text-amber-200 fill-amber-200" />
            <span>Calculate ATS Fit Score</span>
          </button>
        </div>
      </div>
    );
  }

  // 4. Production-Grade Analysis Results View (Vibrant Indian Palette)
  const isStrong = scoreData.overallScore >= 80;
  const isModerate = scoreData.overallScore >= 60 && scoreData.overallScore < 80;

  // Indian Palette styling: Emerald (High fit), Saffron/Amber (Moderate fit), Rose/Ruby (Low fit)
  const scoreTextColor = isStrong ? 'text-emerald-700' : isModerate ? 'text-orange-600' : 'text-rose-600';
  const scoreStrokeColor = isStrong ? 'stroke-emerald-600' : isModerate ? 'stroke-orange-500' : 'stroke-rose-500';
  const badgeTheme = isStrong
    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-500/20'
    : isModerate
    ? 'bg-orange-50 text-orange-800 border-orange-300 ring-1 ring-orange-500/20'
    : 'bg-rose-50 text-rose-800 border-rose-300 ring-1 ring-rose-500/20';

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scoreData.overallScore / 100) * circumference;

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-white border-2 border-orange-100 shadow-md shadow-orange-500/5 space-y-6">
      
      {/* Top Header Card */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-orange-100">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading tracking-tight">
                ATS Resume Match Scorecard
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-black uppercase tracking-wider ${badgeTheme}`}>
                {isStrong ? '🌟 High Fit Match' : isModerate ? '⚡ Moderate Match' : '⚠️ Skill Gap Detected'}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-orange-800 font-bold">
                AI Evaluator Engine
              </span>
              <span className="text-slate-300">•</span>
              {isCached ? (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200" title="Retrieved instantly from database cache">
                  <Database className="w-3 h-3 text-slate-500" /> Database Cache
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                  <Sparkles className="w-3 h-3 text-orange-500" /> Live AI Inference
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {scoreData.summary && (
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 transition-all cursor-pointer shadow-2xs"
              title="Copy analysis summary to clipboard"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-orange-600" />}
              <span>{copiedSummary ? 'Copied' : 'Copy Summary'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onAnalyze(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-all cursor-pointer shadow-2xs"
            title="Recalculate fresh score bypassing cache"
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-600" />
            <span>Re-analyze</span>
          </button>
        </div>
      </div>

      {/* Hero Performance Benchmark: Radial Gauge + 4-Pillar Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 border border-orange-200/70 shadow-xs">
        
        {/* Left: Animated Radial Progress Gauge */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-3 text-center border-b md:border-b-0 md:border-r border-orange-200/60">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-orange-100"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className={`transition-all duration-1000 ease-out ${scoreStrokeColor}`}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-3xl sm:text-4xl font-black tracking-tight ${scoreTextColor}`}>
                {scoreData.overallScore}%
              </span>
              <span className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider -mt-1">
                ATS Fit
              </span>
            </div>
          </div>

          <div className="mt-2 text-center space-y-0.5">
            <p className="text-xs font-black text-slate-900">
              {isStrong ? 'High Shortlist Probability' : isModerate ? 'Competitive Match' : 'Optimization Advised'}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              Weighted against recruiter JD
            </p>
          </div>
        </div>

        {/* Right: 4-Core Pillars Breakdown (Vibrant Indian Accents) */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-3.5 pl-0 md:pl-2">
          
          {/* Pillar 1: Skills (Saffron Orange) */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                <span>Technical & Core Skills (45% weight)</span>
              </span>
              <span className="text-orange-600 font-black">{scoreData.categoryScores.skillsMatch}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-orange-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${scoreData.categoryScores.skillsMatch}%` }}
              />
            </div>
          </div>

          {/* Pillar 2: Projects (Ashoka Blue / Indigo) */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                <span>Projects & Domain Impact (25% weight)</span>
              </span>
              <span className="text-blue-700 font-black">{scoreData.categoryScores.experienceAndProjects}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-blue-100 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-700"
                style={{ width: `${scoreData.categoryScores.experienceAndProjects}%` }}
              />
            </div>
          </div>

          {/* Pillar 3: Keyword Density (Indian Emerald) */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                <span>ATS Keyword Presence (20% weight)</span>
              </span>
              <span className="text-emerald-700 font-black">{scoreData.categoryScores.keywordDensity}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-emerald-100 overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                style={{ width: `${scoreData.categoryScores.keywordDensity}%` }}
              />
            </div>
          </div>

          {/* Pillar 4: Eligibility (Golden Amber) */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-600" />
                <span>Academic & Eligibility Alignment (10% weight)</span>
              </span>
              <span className="text-amber-700 font-black">{scoreData.categoryScores.educationAndEligibility}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-amber-100 overflow-hidden">
              <div
                className="h-full bg-amber-600 rounded-full transition-all duration-700"
                style={{ width: `${scoreData.categoryScores.educationAndEligibility}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* AI Executive Summary Verdict (Warm Saffron & Ivory Box) */}
      {scoreData.summary && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-orange-50/90 via-amber-50/50 to-emerald-50/40 border-2 border-orange-200/80 text-slate-800 flex items-start gap-3.5 shadow-2xs">
          <div className="p-2 rounded-xl bg-orange-500 text-white shrink-0 mt-0.5 shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs sm:text-sm space-y-1 leading-relaxed">
            <span className="font-black uppercase tracking-wider text-[11px] text-orange-800 block">
              AI Hiring Verdict
            </span>
            <p className="font-semibold text-slate-700">{scoreData.summary}</p>
          </div>
        </div>
      )}

      {/* Interactive Skill Intelligence Matrix */}
      <div className="space-y-3.5 pt-1">
        
        {/* Tabs for quick filtering */}
        <div className="flex items-center justify-between border-b border-orange-100 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-orange-600" />
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Skill & Keyword Alignment
            </h4>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-orange-50 text-orange-800 hover:bg-orange-100 border border-orange-200/60'
              }`}
            >
              All ({scoreData.matchedSkills.length + scoreData.missingSkills.length + scoreData.partialSkills.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('matched')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'matched'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80'
              }`}
            >
              <Check className="w-3.5 h-3.5" /> Matched ({scoreData.matchedSkills.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('missing')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'missing'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200/80'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" /> Missing ({scoreData.missingSkills.length})
            </button>
            {scoreData.partialSkills.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('partial')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  activeTab === 'partial'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/80'
                }`}
              >
                Related ({scoreData.partialSkills.length})
              </button>
            )}
          </div>
        </div>

        {/* Skill Badges Container */}
        <div className="flex flex-wrap gap-2 min-h-[44px]">
          {/* Matched Skills (Indian Emerald) */}
          {(activeTab === 'all' || activeTab === 'matched') &&
            scoreData.matchedSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs hover:bg-emerald-100 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{skill}</span>
              </span>
            ))}

          {/* Missing Skills (Warm Ruby) */}
          {(activeTab === 'all' || activeTab === 'missing') &&
            scoreData.missingSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200 shadow-2xs hover:bg-rose-100 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                <span>+ {skill}</span>
                <span className="text-[10px] text-rose-600 font-bold">(Missing)</span>
              </span>
            ))}

          {/* Partial Skills (Warm Amber / Saffron) */}
          {(activeTab === 'all' || activeTab === 'partial') &&
            scoreData.partialSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs hover:bg-amber-100 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>~ {skill}</span>
                <span className="text-[10px] text-amber-700 font-bold">(Related)</span>
              </span>
            ))}
        </div>
      </div>

      {/* Actionable Tailoring Recommendations (Warm Saffron Accents) */}
      {scoreData.recommendations.length > 0 && (
        <div className="pt-4 border-t border-orange-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-600" /> Actionable Resume Tailoring Plan
            </span>
            <span className="text-[10.5px] font-black text-orange-800 bg-orange-100 border border-orange-200 px-2.5 py-0.5 rounded-full">
              {scoreData.recommendations.length} Steps to Boost Match
            </span>
          </div>

          <div className="space-y-2.5">
            {scoreData.recommendations.map((rec, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-orange-50/40 hover:bg-orange-50/80 border border-orange-200/70 hover:border-orange-300 transition-all flex items-start gap-3 text-xs sm:text-sm text-slate-700 shadow-2xs"
              >
                <span className="flex h-5 w-5 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white font-black text-[11px] items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  {i + 1}
                </span>
                <p className="leading-relaxed font-semibold">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
