'use client';

import React, { useState } from 'react';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Building2,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface OfferLetterViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
}

export function OfferLetterViewerModal({
  isOpen,
  onClose,
  offer,
}: OfferLetterViewerModalProps) {
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!isOpen || !offer) return null;

  const letterUrl = offer.letterUrl;

  const handleDownload = () => {
    if (!letterUrl) return;
    const link = document.createElement('a');
    link.href = letterUrl;
    link.target = '_blank';
    link.download = `${offer.company?.name || 'Company'}_Offer_Letter.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[92vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-slate-50/90 backdrop-blur-xs">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-10 w-10 rounded-xl border border-slate-200 shadow-2xs shrink-0">
              {offer.company?.logoUrl && <AvatarImage src={offer.company.logoUrl} alt={offer.company.name} />}
              <AvatarFallback className="bg-gradient-to-br from-[#0A2540] to-blue-600 text-white font-extrabold text-sm rounded-xl">
                {offer.company?.name?.charAt(0) || 'C'}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-[#0A2540] truncate">
                  Official Offer Letter • {offer.designation}
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Placement Document
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold truncate">
                {offer.company?.name} • Issued for {offer.salaryPackage}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Download Button */}
            {letterUrl && (
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Document Preview Canvas / Embed Container */}
        <div className="flex-1 bg-slate-100/80 p-2 sm:p-4 overflow-hidden relative flex flex-col items-center justify-center">
          {letterUrl ? (
            <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-lg border border-slate-200/80">
              <iframe
                src={`${letterUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                className="w-full h-full border-0"
                title="Official Offer Letter Document"
              />
            </div>
          ) : (
            <div className="text-center p-8 space-y-3 max-w-sm">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800">No PDF Attached</h4>
              <p className="text-xs text-slate-500 font-medium">
                The recruiter has extended this offer without attaching an external PDF. All employment terms are detailed on the offer card.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Footer Info */}
        <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>CampusHire Digital Document Security & Institutional Watermark</span>
          </div>
          <div className="flex items-center gap-3">
            {letterUrl && (
              <a
                href={letterUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline font-bold flex items-center gap-1"
              >
                <span>Open in Full Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
