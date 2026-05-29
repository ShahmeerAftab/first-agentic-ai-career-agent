"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/landing/Navbar";
import { loadRuns, clearRuns } from "../../utils/historyStorage";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function formatDuration(ms) {
  if (!ms) return null;
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ScorePill({ score }) {
  const cls =
    score >= 80 ? "bg-emerald-100 text-emerald-700" :
    score >= 70 ? "bg-blue-100   text-blue-700"     :
    score >= 50 ? "bg-amber-100  text-amber-700"     :
                  "bg-red-100    text-red-600";
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full tabular-nums ${cls}`}>
      {score}
    </span>
  );
}

function Tag({ children, color = "gray" }) {
  const cls = {
    gray:   "bg-gray-100 text-gray-500",
    teal:   "bg-teal-50  text-teal-700 border border-teal-100",
    rose:   "bg-rose-50  text-rose-700 border border-rose-100",
  }[color] ?? "bg-gray-100 text-gray-500";
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cls}`}>
      {children}
    </span>
  );
}

function RunCard({ run, index }) {
  const duration = formatDuration(run.durationMs);

  return (
    <div
      className="animate-fade-up bg-white rounded-2xl border border-[#E4E7ED]
                 px-4 py-3.5 hover:border-[#D0D4DC] transition-colors duration-150"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <div className="flex items-start gap-3">

        {/* File icon */}
        <div className="w-9 h-9 rounded-xl bg-[#F1F3F7] flex items-center
                        justify-center shrink-0 text-base mt-0.5">
          📄
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0 space-y-1.5">

          {/* Row 1: filename + score */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[#0F1117] truncate"
               title={run.filename}>
              {run.filename}
            </p>
            <ScorePill score={run.atsScore} />
          </div>

          {/* Row 2: date + duration */}
          <p className="text-xs text-gray-400">
            {formatDate(run.savedAt)}
            {duration && (
              <span className="ml-2 font-mono">{duration}</span>
            )}
          </p>

          {/* Row 3: feature tags */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {run.jobCount > 0 && (
              <Tag color="teal">
                {run.jobCount} jobs found
              </Tag>
            )}
            {run.hasImprovement && (
              <Tag color="rose">Improvements</Tag>
            )}
            {run.hasRoadmap && (
              <Tag color="teal">Roadmap</Tag>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <span className="text-4xl">📭</span>
      <div>
        <p className="text-sm font-semibold text-gray-600">No history on this device</p>
        <p className="text-xs text-gray-400 mt-1 max-w-xs">
          Run an analysis and the results will appear here automatically.
        </p>
      </div>
      <Link
        href="/"
        className="mt-1 h-9 px-5 bg-brand-600 hover:bg-brand-700 text-white
                   text-sm font-semibold rounded-[10px] flex items-center
                   transition-colors duration-150"
      >
        Analyze a Resume
      </Link>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HistoryPage() {
  const [runs,    setRuns]    = useState([]);
  const [mounted, setMounted] = useState(false);

  // localStorage is only available client-side
  useEffect(() => {
    setRuns(loadRuns());
    setMounted(true);
  }, []);

  function handleClear() {
    clearRuns();
    setRuns([]);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
      <Navbar />

      <main className="flex-1 px-4 pb-20 pt-8 sm:pt-10">
        <div className="max-w-170 mx-auto">

          {/* Page header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-[#0F1117] tracking-tight">
                History
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Saved on this device · no account needed
              </p>
            </div>

            <div className="flex items-center gap-2">
              {runs.length > 0 && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1.5 h-8 px-3
                             text-xs font-medium text-gray-400 hover:text-red-500
                             border border-[#E4E7ED] hover:border-red-200
                             rounded-[10px] bg-white transition-colors duration-150"
                >
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M1.5 3h9M4.5 3V2a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1
                             M3 3l.5 7h5l.5-7"
                          stroke="currentColor" strokeWidth="1.2"
                          strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Clear
                </button>
              )}

              <Link
                href="/"
                className="flex items-center gap-1.5 h-8 px-3
                           border border-[#E4E7ED] bg-white hover:bg-[#F1F3F7]
                           text-xs font-medium text-gray-500 hover:text-gray-700
                           rounded-[10px] transition-colors duration-150"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back
              </Link>
            </div>
          </div>

          {/* Content */}
          {!mounted ? (
            // Prevent hydration mismatch — render skeletons on server
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i}
                     className="h-22.5 bg-white rounded-2xl border
                                border-[#E4E7ED] animate-pulse" />
              ))}
            </div>
          ) : runs.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <p className="text-xs text-gray-400 mb-3">
                {runs.length} {runs.length === 1 ? "run" : "runs"} — most recent first
              </p>
              <div className="space-y-2.5">
                {runs.map((run, i) => (
                  <RunCard key={`${run.resumeId}-${run.savedAt}`} run={run} index={i} />
                ))}
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
