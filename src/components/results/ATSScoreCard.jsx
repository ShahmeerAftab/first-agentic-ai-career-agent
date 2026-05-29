"use client";

import { useEffect, useRef, useState } from "react";

const RADIUS        = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const DURATION_MS   = 1400;

function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function scoreTheme(score) {
  if (score >= 80) return {
    grade: "A", label: "Excellent",
    description: "Outstanding! Your resume is highly optimised and should sail through most ATS filters.",
    ring: "#10B981", track: "#D1FAE5", glow: "#10B98118",
    badge: "bg-emerald-500 text-white",
    bar: "from-emerald-400 to-emerald-500",
    accent: "text-emerald-600", accentBg: "bg-emerald-50", accentBorder: "border-emerald-200",
    headerBg: "from-emerald-500 to-green-600",
  };
  if (score >= 70) return {
    grade: "B", label: "Good",
    description: "Solid resume. A few small improvements will push you into the top tier.",
    ring: "#3B82F6", track: "#DBEAFE", glow: "#3B82F618",
    badge: "bg-blue-500 text-white",
    bar: "from-blue-400 to-blue-600",
    accent: "text-blue-600", accentBg: "bg-blue-50", accentBorder: "border-blue-200",
    headerBg: "from-blue-500 to-blue-600",
  };
  if (score >= 50) return {
    grade: "C", label: "Needs Work",
    description: "Moderate ATS compatibility. Targeted improvements could significantly boost your pass rate.",
    ring: "#F59E0B", track: "#FDE68A", glow: "#F59E0B18",
    badge: "bg-amber-500 text-white",
    bar: "from-amber-400 to-amber-500",
    accent: "text-amber-600", accentBg: "bg-amber-50", accentBorder: "border-amber-200",
    headerBg: "from-amber-500 to-orange-500",
  };
  if (score >= 30) return {
    grade: "D", label: "Poor",
    description: "Your resume is struggling against ATS filters. Key sections and keywords need attention.",
    ring: "#F97316", track: "#FED7AA", glow: "#F9731618",
    badge: "bg-orange-500 text-white",
    bar: "from-orange-400 to-orange-500",
    accent: "text-orange-600", accentBg: "bg-orange-50", accentBorder: "border-orange-200",
    headerBg: "from-orange-500 to-red-500",
  };
  return {
    grade: "F", label: "Critical",
    description: "Major restructuring needed. This resume is unlikely to pass automated screening.",
    ring: "#EF4444", track: "#FECACA", glow: "#EF444418",
    badge: "bg-red-500 text-white",
    bar: "from-red-400 to-red-500",
    accent: "text-red-600", accentBg: "bg-red-50", accentBorder: "border-red-200",
    headerBg: "from-red-500 to-red-600",
  };
}

function ScoreRing({ score, theme }) {
  const [display, setDisplay] = useState(0);
  const [offset,  setOffset]  = useState(CIRCUMFERENCE);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / DURATION_MS, 1);
      const e = easeOut(t);
      setDisplay(Math.round(e * score));
      setOffset(CIRCUMFERENCE * (1 - (e * score) / 100));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [score]);

  return (
    <div className="relative flex items-center justify-center w-36 h-36 shrink-0">
      <div className="absolute inset-3 rounded-full blur-xl opacity-30" style={{ backgroundColor: theme.ring }} />
      <svg width="144" height="144" viewBox="0 0 128 128" className="-rotate-90 relative z-10">
        <circle cx="64" cy="64" r={RADIUS} fill="none" stroke={theme.track} strokeWidth="9" />
        <circle cx="64" cy="64" r={RADIUS} fill="none" stroke={theme.ring} strokeWidth="9"
          strokeLinecap="round" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 5px ${theme.ring}60)` }} />
      </svg>
      <div className="absolute z-10 flex flex-col items-center leading-none select-none">
        <span className="text-4xl font-black text-[#0F1117] tabular-nums">{display}</span>
        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-1">/ 100</span>
      </div>
    </div>
  );
}

function ScoreBar({ score, theme }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setWidth(score));
    return () => cancelAnimationFrame(id);
  }, [score]);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-gray-400">ATS Compatibility</span>
        <span className="text-sm font-bold tabular-nums" style={{ color: theme.ring }}>{score}%</span>
      </div>
      <div className="relative w-full h-2 bg-[#E4E7ED] rounded-full overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="h-full bg-red-200/70"    style={{ width: "30%" }} />
          <div className="h-full bg-orange-200/70" style={{ width: "20%" }} />
          <div className="h-full bg-amber-200/70"  style={{ width: "20%" }} />
          <div className="h-full bg-blue-200/70"   style={{ width: "10%" }} />
          <div className="h-full bg-green-200/70"  style={{ width: "20%" }} />
        </div>
        <div
          className={`absolute left-0 top-0 h-full rounded-full bg-linear-to-r ${theme.bar} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-300 font-medium">
        {["0", "30", "50", "70", "100"].map((l) => <span key={l}>{l}</span>)}
      </div>
    </div>
  );
}

function StatPill({ icon, value, label, accentBg, accentBorder, accent }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 rounded-[10px] border ${accentBorder} ${accentBg} py-4 px-3`}>
      <span className="text-lg">{icon}</span>
      <span className={`text-2xl font-black tabular-nums ${accent}`}>{value}</span>
      <span className="text-[11px] text-gray-400 font-medium text-center leading-tight">{label}</span>
    </div>
  );
}

export default function ATSScoreCard({ result }) {
  const { atsScore, strengths = [], weaknesses = [], missingSkills = [], filename, fileSize, status } = result;
  const theme = scoreTheme(atsScore);

  return (
    <div
      className="animate-scale-in w-full rounded-[20px] border border-[#E4E7ED] overflow-hidden"
      style={{ boxShadow: `0 8px 32px ${theme.glow}, 0 2px 8px rgba(0,0,0,0.06)` }}
    >
      {/* Gradient header */}
      <div className={`bg-linear-to-br ${theme.headerBg} px-5 pt-6 pb-8 sm:px-8 sm:pt-7 sm:pb-10`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">ATS Analysis</p>
            <h2 className="text-white text-xl sm:text-2xl font-black mt-1 leading-tight">Resume Score</h2>
          </div>
          <div className="flex flex-col items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-[14px] px-3 py-2 min-w-13">
            <span className="text-2xl font-black text-white leading-none">{theme.grade}</span>
            <span className="text-[10px] text-white/70 font-semibold uppercase tracking-wide mt-0.5">Grade</span>
          </div>
        </div>
      </div>

      {/* White body */}
      <div className="bg-white -mt-4 rounded-t-[20px] px-5 pb-5 sm:px-8 sm:pb-7">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8 pt-6 sm:pt-7">
          <ScoreRing score={atsScore} theme={theme} />

          <div className="flex-1 w-full space-y-4 text-center sm:text-left">
            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${theme.badge}`}>
                  {theme.label}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {atsScore >= 70 ? "Ready to apply" : atsScore >= 40 ? "Needs improvement" : "Major revision needed"}
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{theme.description}</p>
            </div>
            <ScoreBar score={atsScore} theme={theme} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-5">
          <StatPill icon="✅" value={strengths.length} label="Strengths"
            accent={theme.accent} accentBg={theme.accentBg} accentBorder={theme.accentBorder} />
          <StatPill icon="⚡" value={weaknesses.length} label="Weaknesses"
            accent={theme.accent} accentBg={theme.accentBg} accentBorder={theme.accentBorder} />
          <StatPill icon="🎯" value={Array.isArray(missingSkills) ? missingSkills.length : 0} label="Missing Skills"
            accent={theme.accent} accentBg={theme.accentBg} accentBorder={theme.accentBorder} />
        </div>
      </div>

      {/* File footer */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1
                      px-5 py-3 sm:px-8
                      bg-[#F8F9FB] border-t border-[#E4E7ED]
                      text-xs text-gray-400">
        <span className="flex items-center gap-1.5 flex-1 min-w-0">
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
          <span className="truncate font-medium text-gray-600">{filename}</span>
        </span>
        <span>{(fileSize / 1024).toFixed(1)} KB</span>
        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full font-semibold capitalize">
          {status}
        </span>
      </div>
    </div>
  );
}
