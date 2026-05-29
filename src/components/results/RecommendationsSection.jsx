"use client";

import { normalise } from "../../utils/normalise";

function RecommendationItem({ text, index }) {
  return (
    <li
      className="animate-slide-right flex items-start gap-3.5 px-5 py-4 sm:px-6
                 border-b border-[#F1F3F7] last:border-b-0"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <span className="shrink-0 w-5 h-5 rounded-full bg-orange-500 text-white
                       text-[10px] font-bold flex items-center justify-center mt-0.5 leading-none">
        {index + 1}
      </span>
      <p className="flex-1 text-sm text-gray-600 leading-relaxed">{text}</p>
    </li>
  );
}

export default function RecommendationsSection({ recommendations = [] }) {
  const items = normalise(recommendations);

  return (
    <div className="w-full rounded-[20px] border border-[#E4E7ED] overflow-hidden bg-white
                    shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between px-5 py-4 sm:px-6 bg-orange-50 border-b border-orange-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#0F1117]">Recommendations</h3>
            <p className="text-[11px] text-orange-500 font-medium mt-0.5">Actionable steps to improve</p>
          </div>
        </div>
        <span className="text-xs font-bold text-orange-600 bg-orange-100 border border-orange-200
                         px-2.5 py-1 rounded-full tabular-nums">
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <p className="text-sm font-medium text-gray-400">No recommendations available</p>
          <p className="text-xs text-gray-300">Your resume may already be well-optimised.</p>
        </div>
      ) : (
        <ul>
          {items.map((text, i) => (
            <RecommendationItem key={`${i}-${text.slice(0, 20)}`} text={text} index={i} />
          ))}
        </ul>
      )}
    </div>
  );
}
