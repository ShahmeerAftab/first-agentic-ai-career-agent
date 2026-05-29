"use client";

import { useState } from "react";

export default function CoverLetterOutput({ coverLetter, companyName, jobRole, onRegenerate }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-100
                           px-2.5 py-1 rounded-full">
            {jobRole}
          </span>
          <span className="text-xs text-gray-400">at</span>
          <span className="text-xs font-semibold text-[#0F1117]">{companyName}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="h-8 px-3 flex items-center gap-1.5 rounded-[8px] border border-[#E4E7ED]
                       bg-white hover:bg-[#F1F3F7] text-xs font-medium text-gray-500
                       hover:text-gray-700 transition-colors duration-150 cursor-pointer"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                  <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Copy
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onRegenerate}
            className="h-8 px-3 flex items-center gap-1.5 rounded-[8px] border border-[#E4E7ED]
                       bg-white hover:bg-[#F1F3F7] text-xs font-medium text-gray-500
                       hover:text-gray-700 transition-colors duration-150 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M2 8a6 6 0 1112 0M2 8l2.5-2.5M2 8l2.5 2.5" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Regenerate
          </button>
        </div>
      </div>

      <div className="rounded-[12px] border border-[#E4E7ED] bg-[#F8F9FB] p-5 sm:p-6">
        <p className="text-sm text-[#0F1117] leading-[1.85] whitespace-pre-wrap font-[family-name:var(--font-inter)]">
          {coverLetter}
        </p>
      </div>
    </div>
  );
}
