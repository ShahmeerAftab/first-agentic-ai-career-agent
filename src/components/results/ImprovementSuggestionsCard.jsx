"use client";

// ── Priority config ───────────────────────────────────────────────────────────
const PRIORITY = {
  high: {
    label:  "Urgent",
    dot:    "bg-red-500",
    border: "border-l-red-500",
    card:   "bg-red-50/40",
    badge:  "bg-red-100 text-red-700 border-red-200",
    quote:  "bg-red-50 border-red-100 text-red-600",
  },
  medium: {
    label:  "Medium",
    dot:    "bg-amber-400",
    border: "border-l-amber-400",
    card:   "bg-amber-50/30",
    badge:  "bg-amber-100 text-amber-700 border-amber-200",
    quote:  "bg-amber-50 border-amber-100 text-amber-700",
  },
  low: {
    label:  "Optional",
    dot:    "bg-sky-400",
    border: "border-l-sky-400",
    card:   "bg-sky-50/20",
    badge:  "bg-sky-100 text-sky-700 border-sky-200",
    quote:  "bg-sky-50 border-sky-100 text-sky-700",
  },
};

// ── Area icon map ─────────────────────────────────────────────────────────────
function AreaIcon({ area = "" }) {
  const a = area.toLowerCase();

  if (a.includes("quantif") || a.includes("metric") || a.includes("achiev") || a.includes("number"))
    return (
      <svg viewBox="0 0 14 14" fill="none" className="w-[14px] h-[14px]">
        <path d="M1 10.5l3.5-4 2.5 2.5L12 3" stroke="currentColor"
              strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

  if (a.includes("keyword") || a.includes("density") || a.includes("search"))
    return (
      <svg viewBox="0 0 14 14" fill="none" className="w-[14px] h-[14px]">
        <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9.5 9.5l3 3" stroke="currentColor" strokeWidth="1.4"
              strokeLinecap="round" />
      </svg>
    );

  if (a.includes("contact") || a.includes("email") || a.includes("phone"))
    return (
      <svg viewBox="0 0 14 14" fill="none" className="w-[14px] h-[14px]">
        <rect x="1" y="2.5" width="12" height="9" rx="1.2"
              stroke="currentColor" strokeWidth="1.4" />
        <path d="M1 5.5h12M4 8.5h3M4 10.5h2" stroke="currentColor"
              strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );

  if (a.includes("experience") || a.includes("work") || a.includes("job"))
    return (
      <svg viewBox="0 0 14 14" fill="none" className="w-[14px] h-[14px]">
        <rect x="1" y="4.5" width="12" height="8" rx="1.2"
              stroke="currentColor" strokeWidth="1.4" />
        <path d="M4.5 4.5V3.5a1 1 0 011-1h3a1 1 0 011 1v1"
              stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M1 8h12" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );

  if (a.includes("educat") || a.includes("certif") || a.includes("degree"))
    return (
      <svg viewBox="0 0 14 14" fill="none" className="w-[14px] h-[14px]">
        <path d="M7 1.5L1 4.5l6 3 6-3-6-3z" stroke="currentColor"
              strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M3.5 6.5v3.5c0 1 1.6 2 3.5 2s3.5-1 3.5-2V6.5"
              stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );

  if (a.includes("format") || a.includes("heading") || a.includes("structure") || a.includes("section"))
    return (
      <svg viewBox="0 0 14 14" fill="none" className="w-[14px] h-[14px]">
        <path d="M1 3.5h12M1 7h8M1 10.5h5" stroke="currentColor"
              strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );

  if (a.includes("skill") || a.includes("techno") || a.includes("language"))
    return (
      <svg viewBox="0 0 14 14" fill="none" className="w-[14px] h-[14px]">
        <polyline points="4,5 1,7 4,9" stroke="currentColor"
                  strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="10,5 13,7 10,9" stroke="currentColor"
                  strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 2.5l-3 9" stroke="currentColor" strokeWidth="1.4"
              strokeLinecap="round" />
      </svg>
    );

  // default: pencil
  return (
    <svg viewBox="0 0 14 14" fill="none" className="w-[14px] h-[14px]">
      <path d="M9.5 2l2.5 2.5-7.5 7.5H2V9.5L9.5 2z" stroke="currentColor"
            strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

// ── Priority dot strip ────────────────────────────────────────────────────────
function PriorityStrip({ suggestions }) {
  const counts = suggestions.reduce(
    (acc, s) => { acc[s.priority] = (acc[s.priority] || 0) + 1; return acc; },
    {}
  );

  return (
    <div className="flex items-center gap-4 text-[11px] font-semibold">
      {counts.high && (
        <span className="flex items-center gap-1.5 text-red-600">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          {counts.high} urgent
        </span>
      )}
      {counts.medium && (
        <span className="flex items-center gap-1.5 text-amber-600">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          {counts.medium} medium
        </span>
      )}
      {counts.low && (
        <span className="flex items-center gap-1.5 text-sky-600">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          {counts.low} optional
        </span>
      )}
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="bg-white rounded-[20px] border border-[#E4E7ED] overflow-hidden
                    shadow-[0_1px_3px_rgba(0,0,0,0.06)] animate-pulse">
      {/* header */}
      <div className="px-5 py-4 bg-rose-50 border-b border-rose-100 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-rose-100" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 bg-rose-200/60 rounded w-40" />
            <div className="h-2.5 bg-rose-100 rounded w-64" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="h-2.5 bg-rose-100 rounded w-16" />
          <div className="h-2.5 bg-rose-100 rounded w-16" />
        </div>
      </div>
      {/* cards */}
      <div className="p-4 space-y-2.5">
        {[1, 2, 3].map((i) => (
          <div key={i}
               className="h-[72px] rounded-xl border border-[#E4E7ED]
                          border-l-4 border-l-gray-200 bg-gray-50" />
        ))}
      </div>
    </div>
  );
}

// ── Suggestion card ───────────────────────────────────────────────────────────
function SuggestionCard({ s, index }) {
  const p = PRIORITY[s.priority] ?? PRIORITY.medium;

  return (
    <div
      className={`animate-slide-right border border-[#E4E7ED] border-l-[3px]
                  ${p.border} ${p.card}
                  rounded-xl overflow-hidden`}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className="px-4 py-3 space-y-1.5">

        {/* Row 1: icon + area + priority badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 text-gray-400">
              <AreaIcon area={s.area} />
            </span>
            <span className="text-sm font-semibold text-[#0F1117] truncate">
              {s.area}
            </span>
          </div>
          <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5
                            rounded-full border ${p.badge}`}>
            {p.label}
          </span>
        </div>

        {/* Row 2: action */}
        <p className="text-[13px] text-gray-600 leading-snug pl-[22px]">
          {s.action}
        </p>

        {/* Row 3: example (optional) */}
        {s.example && (
          <div className={`ml-[22px] mt-1 flex items-start gap-2 px-3 py-2
                           rounded-lg border text-[12px] leading-snug ${p.quote}`}>
            <svg viewBox="0 0 12 9" fill="currentColor" className="w-3 h-3 mt-px shrink-0 opacity-50">
              <path d="M0 9V6C0 2.686 1.79.9 5.37.9v2c-1.56 0-2.34.78-2.34 2.1H4.8V9H0zm7.2 0V6c0-3.314 1.79-5.1 5.37-5.1v2c-1.56 0-2.34.78-2.34 2.1H12V9H7.2z"/>
            </svg>
            <span className="italic">{s.example}</span>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function ImprovementSuggestionsCard({ data, loading }) {
  if (loading) return <Skeleton />;
  if (!data?.suggestions?.length) return null;

  const { summary, suggestions } = data;

  return (
    <div className="bg-white rounded-[20px] border border-[#E4E7ED] overflow-hidden
                    shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

      {/* ── Header ── */}
      <div className="px-5 py-4 bg-gradient-to-r from-rose-50 to-white
                      border-b border-rose-100">
        <div className="flex items-start justify-between gap-3">

          <div className="flex items-start gap-3 min-w-0">
            {/* Icon bubble */}
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600
                            flex items-center justify-center shrink-0">
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M8 2L2 13h12L8 2z" stroke="currentColor"
                      strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M8 6.5v3" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="8" cy="11.5" r="0.7" fill="currentColor" />
              </svg>
            </div>

            {/* Title + summary */}
            <div className="min-w-0">
              <p className="text-sm font-bold text-rose-900 leading-none">
                Resume Improvements
              </p>
              {summary && (
                <p className="text-[11px] text-rose-400 mt-1 leading-snug">
                  {summary}
                </p>
              )}
            </div>
          </div>

          {/* Count badge */}
          <span className="shrink-0 text-xs font-bold bg-rose-100 text-rose-700
                           border border-rose-200 px-2.5 py-1 rounded-full">
            {suggestions.length} {suggestions.length === 1 ? "fix" : "fixes"}
          </span>
        </div>

        {/* Priority distribution */}
        <div className="mt-3 pl-11">
          <PriorityStrip suggestions={suggestions} />
        </div>
      </div>

      {/* ── Suggestion list ── */}
      <div className="p-4 space-y-2.5">
        {suggestions.map((s, i) => (
          <SuggestionCard key={i} s={s} index={i} />
        ))}
      </div>

    </div>
  );
}
