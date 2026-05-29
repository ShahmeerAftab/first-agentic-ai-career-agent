"use client";

import { normalise } from "../../utils/normalise";

function StrengthItem({ text, index }) {
  return (
    <li
      className="animate-slide-right flex items-start gap-3.5 px-5 py-4 sm:px-6
                 border-b border-[#F1F3F7] last:border-b-0"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-100
                       flex items-center justify-center mt-0.5">
        <svg className="w-2.5 h-2.5 text-emerald-600" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5.5L4 8 8.5 2.5" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="flex-1 text-sm text-gray-600 leading-relaxed">{text}</p>
    </li>
  );
}

export default function StrengthsSection({ strengths = [] }) {
  const items = normalise(strengths);

  return (
    <div className="w-full rounded-[20px] border border-[#E4E7ED] overflow-hidden bg-white
                    shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between px-5 py-4 sm:px-6 bg-emerald-50 border-b border-emerald-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[8px] bg-emerald-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#0F1117]">Strengths</h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">What's working well</p>
          </div>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 border border-emerald-200
                         px-2.5 py-1 rounded-full tabular-nums">
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <p className="text-sm font-medium text-gray-400">No strengths detected</p>
          <p className="text-xs text-gray-300">Try uploading a more detailed resume.</p>
        </div>
      ) : (
        <ul>
          {items.map((text, i) => (
            <StrengthItem key={`${i}-${text.slice(0, 20)}`} text={text} index={i} />
          ))}
        </ul>
      )}
    </div>
  );
}
