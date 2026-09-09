'use client';

import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Clock, 
  Bookmark, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  ChevronDown,
  CheckCircle2,
  FileCode2,
  HelpCircle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { ResourceItem } from '../_data/resourcesData';

interface ResourceReaderModalProps {
  resource: ResourceItem | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export function ResourceReaderModal({
  resource,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
}: ResourceReaderModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedQna, setExpandedQna] = useState<Record<string, boolean>>({
    '0-0': true, // Expand first question by default
  });

  if (!isOpen || !resource) return null;

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleQna = (key: string) => {
    setExpandedQna((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-5 sm:p-7 space-y-6 max-h-[92vh] overflow-y-auto [scrollbar-width:thin]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Strip */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-black uppercase tracking-wider border ${resource.badgeColor}`}>
                {resource.categoryLabel}
              </span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {resource.readTime}
              </span>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                {resource.difficulty}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#0A2540] font-heading leading-tight">
              {resource.title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => onToggleSave(resource.id)}
              className="p-2 rounded-xl border border-slate-200 hover:bg-amber-50 text-slate-500 hover:text-amber-600 transition-colors cursor-pointer"
              title={isSaved ? 'Remove from saved' : 'Save for later'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Overview Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-slate-50 to-indigo-50/40 border border-blue-100/90 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {resource.content.overview}
        </div>

        {/* Main Content Sections */}
        <div className="space-y-6">
          {resource.content.sections.map((section, sIdx) => (
            <div key={section.heading} className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading flex items-center gap-2">
                <span className="flex h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] items-center justify-center shrink-0">
                  {sIdx + 1}
                </span>
                <span>{section.heading}</span>
              </h3>

              {section.description && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {section.description}
                </p>
              )}

              {/* Bullet Points */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2 pl-1">
                  {section.bulletPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <div className="h-4.5 w-4.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Code Snippet Box with 1-Click Copy */}
              {section.codeSnippet && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0A192F] text-slate-100 shadow-md">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                    <span className="uppercase font-bold text-blue-400 flex items-center gap-1.5">
                      <FileCode2 className="w-3.5 h-3.5" />
                      {section.codeSnippet.language}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(section.codeSnippet!.code, sIdx)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedIndex === sIdx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-blue-100/95 [scrollbar-width:thin]">
                    <code>{section.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Q&A Accordion */}
              {section.qnaList && section.qnaList.length > 0 && (
                <div className="space-y-2 pt-1">
                  {section.qnaList.map((qna, qIdx) => {
                    const qKey = `${sIdx}-${qIdx}`;
                    const isExpanded = Boolean(expandedQna[qKey]);

                    return (
                      <div
                        key={qna.question}
                        className="rounded-2xl border border-slate-200/90 bg-slate-50/60 overflow-hidden transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => toggleQna(qKey)}
                          className="w-full flex items-center justify-between gap-3 p-3.5 text-left font-extrabold text-xs sm:text-sm text-[#0A2540] hover:bg-slate-100/60 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>{qna.question}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        {isExpanded && (
                          <div className="p-3.5 pt-0 border-t border-slate-200/60 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium bg-white">
                            {qna.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Key Takeaways Box */}
        {resource.content.keyTakeaways && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/40 to-emerald-50/40 border-2 border-orange-200/80 space-y-2">
            <div className="flex items-center gap-2 text-orange-800 font-extrabold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-orange-600" />
              <span>Key Placement Takeaways</span>
            </div>
            <ul className="space-y-1.5 pl-1">
              {resource.content.keyTakeaways.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                  <span className="text-orange-500 font-black">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {resource.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                #{tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-blue-500/20 active:scale-95"
          >
            Finished Reading
          </button>
        </div>

      </div>
    </div>
  );
}
