"use client";

import { normalise } from "../../utils/normalise";

const PRIORITY = [
  { dot: "bg-red-400",    badge: "bg-red-50 text-red-600 border-red-200",          label: "High" },
  { dot: "bg-orange-400", badge: "bg-orange-50 text-orange-600 border-orange-200", label: "Med"  },
  { dot: "bg-amber-400",  badge: "bg-amber-50 text-amber-600 border-amber-200",    label: "Low"  },
];

function WeaknessItem({ text, index }) {
  const p = PRIORITY[index % PRIORITY.length];
  return (
    <li
      className="animate-slide-right flex items-start gap-3.5 px-5 py-4 sm:px-6
                 border-b border-[#F1F3F7] last:border-b-0"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <span className={`shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${p.dot}`} />
      <p className="flex-1 text-sm text-gray-600 leading-relaxed">{text}</p>
      <span className={`shrink-0 self-start text-[10px] font-semibold px-2 py-0.5 rounded-full border ${p.badge}`}>
        {p.label}
      </span>
    </li>
  );
}

export default function WeaknessesSection({ weaknesses = [] }) {
  const items = normalise(weaknesses);

  return (
    <div className="w-full rounded-[20px] border border-[#E4E7ED] overflow-hidden bg-white
                    shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between px-5 py-4 sm:px-6 bg-red-50 border-b border-red-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[8px] bg-red-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#0F1117]">Weaknesses</h3>
            <p className="text-[11px] text-red-500 font-medium mt-0.5">Areas that may hurt your ranking</p>
          </div>
        </div>
        <span className="text-xs font-bold text-red-600 bg-red-100 border border-red-200
                         px-2.5 py-1 rounded-full tabular-nums">
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <p className="text-sm font-medium text-gray-400">No weaknesses found</p>
          <p className="text-xs text-gray-300">Great — your resume looks clean!</p>
        </div>
      ) : (
        <ul>
          {items.map((text, i) => (
            <WeaknessItem key={`${i}-${text.slice(0, 20)}`} text={text} index={i} />
          ))}
        </ul>
      )}
    </div>
  );
}
