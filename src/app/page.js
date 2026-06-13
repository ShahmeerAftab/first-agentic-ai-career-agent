"use client";

import { useState, useEffect, useRef } from "react";

import Navbar                     from "../components/landing/Navbar";
import Features                   from "../components/landing/Features";
import HowItWorks                 from "../components/landing/HowItWorks";
import Footer                     from "../components/landing/Footer";
import UploadSection              from "../components/upload/UploadSection";
import ATSScoreCard               from "../components/results/ATSScoreCard";
import StrengthsSection           from "../components/results/StrengthsSection";
import WeaknessesSection          from "../components/results/WeaknessesSection";
import MissingSkillsCard          from "../components/results/MissingSkillsCard";
import RecommendationsSection     from "../components/results/RecommendationsSection";
import JobRecommendationsSection  from "../components/results/JobRecommendationsSection";
import ImprovementSuggestionsCard from "../components/results/ImprovementSuggestionsCard";
import RealJobListingsSection     from "../components/results/RealJobListingsSection";
import CoverLetterSection         from "../components/cover-letter/CoverLetterSection";
import { runCareerAgent }         from "../agents/careerAgent";
import { saveRun }               from "../utils/historyStorage";

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="text-center pt-14 pb-10 sm:pt-20 sm:pb-12 space-y-6">
      <div className="animate-fade-up inline-flex items-center gap-2
                      bg-brand-50 text-brand-600 border border-brand-200
                      text-xs font-semibold px-3 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-float" />
        AI-Powered · Instant Results · Free
      </div>

      <h1
        className="animate-fade-up text-[2.25rem] sm:text-[2.75rem] font-bold
                   text-[#0F1117] tracking-tight leading-[1.15]"
        style={{ animationDelay: "80ms" }}
      >
        Get Your Resume<br />
        <span className="font-[family-name:var(--font-dm-serif)] italic
                         font-normal text-brand-600">
          ATS-Ready in Seconds
        </span>
      </h1>

      <p
        className="animate-fade-up text-gray-500 text-sm sm:text-[0.9375rem]
                   max-w-md mx-auto leading-relaxed"
        style={{ animationDelay: "160ms" }}
      >
        Upload your PDF resume — our AI scores it, finds skill gaps,
        and gives you an action plan to land more interviews.
      </p>

      <div className="animate-fade-up flex justify-center" style={{ animationDelay: "240ms" }}>
        <a
          href="#analyze"
          className="flex flex-col items-center gap-1 text-xs text-gray-400
                     hover:text-brand-500 transition-colors group"
        >
          <span className="font-medium">Upload your resume</span>
          <svg className="w-4 h-4 animate-bounce" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}

// ── Location input ────────────────────────────────────────────────────────────
function LocationInput({ value, onChange }) {
  return (
    <div className="animate-fade-up mt-3 bg-white rounded-[16px] border border-[#E4E7ED]
                    px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <label className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.485-2.015-4.5-4.5-4.5z"
                  stroke="currentColor" strokeWidth="1.4" />
            <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span className="text-sm font-medium text-[#0F1117]">Job location</span>
          <span className="text-xs text-gray-400 font-normal">(optional)</span>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. New York, Remote, London…"
          className="flex-1 h-9 px-3 text-sm bg-[#F8F9FB] border border-[#E4E7ED]
                     rounded-[10px] text-[#0F1117] placeholder-gray-300
                     focus:outline-none focus:border-brand-400 focus:ring-1
                     focus:ring-brand-200 transition-all duration-150"
        />
      </label>
      <p className="text-[11px] text-gray-400 mt-2">
        Used to surface location-specific real job listings after analysis.
      </p>
    </div>
  );
}

// ── Results header ────────────────────────────────────────────────────────────
function ResultsHeader({ onReset }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-[#0F1117]">
          Analysis Results
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
          Here&apos;s how your resume performed.
        </p>
      </div>
      <button
        onClick={onReset}
        className="flex items-center gap-1.5 h-9 px-4 border border-[#E4E7ED]
                   bg-white hover:bg-[#F1F3F7] text-gray-500 hover:text-gray-700
                   text-sm font-medium rounded-[10px] transition-colors duration-150
                   cursor-pointer shrink-0"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
          <path d="M2 8a6 6 0 1112 0M2 8l2.5-2.5M2 8l2.5 2.5"
                stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        New Analysis
      </button>
    </div>
  );
}

// ── Agent status banner ───────────────────────────────────────────────────────
function AgentBanner({ loading, error }) {
  if (!loading && !error) return null;

  if (loading) return (
    <div className="flex items-center gap-2.5 bg-brand-50 border border-brand-200
                    rounded-[14px] px-4 py-3 text-xs text-brand-700 font-medium">
      <svg className="w-4 h-4 text-brand-500 animate-spin shrink-0" viewBox="0 0 24 24"
           fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"
                strokeDasharray="15 45" />
      </svg>
      Finding real job listings and generating deeper insights…
    </div>
  );

  return (
    <div className="flex items-center gap-2 bg-amber-50 border border-amber-200
                    rounded-[14px] px-4 py-3 text-xs text-amber-700">
      <span>⚠️</span>
      <span>Deep analysis unavailable: {error}</span>
    </div>
  );
}

// ── All result sections ───────────────────────────────────────────────────────
function ResultsSections({ uploadResult, agentResult, agentLoading }) {
  // Prefer the agent's more accurate job titles when available
  const jobs = agentResult?.jobSuggestions ?? uploadResult.recommendedJobs ?? [];

  const sections = [
    <ATSScoreCard key="score" result={uploadResult} />,

    // Improvement suggestions — only shown when ATS < 70
    (agentLoading || agentResult?.improvementSuggestions) && (
      <ImprovementSuggestionsCard
        key="improvements"
        data={agentResult?.improvementSuggestions}
        loading={agentLoading}
      />
    ),

    <StrengthsSection       key="strengths"  strengths={uploadResult.strengths} />,
    <WeaknessesSection      key="weaknesses" weaknesses={uploadResult.weaknesses} />,
    <MissingSkillsCard      key="skills"     skills={uploadResult.missingSkills} />,
    <RecommendationsSection key="recs"       recommendations={uploadResult.recommendations} />,
    <JobRecommendationsSection key="jobs"    jobs={jobs} />,

    // Live job listings from real API
    <RealJobListingsSection
      key="real-jobs"
      listings={agentResult?.realJobListings ?? null}
      loading={agentLoading}
    />,
  ].filter(Boolean);

  return (
    <div className="space-y-4">
      {sections.map((section, i) => (
        <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
          {section}
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [uploadResult,  setUploadResult]  = useState(null);
  const [agentResult,   setAgentResult]   = useState(null);
  const [agentLoading,  setAgentLoading]  = useState(false);
  const [agentError,    setAgentError]    = useState(null);
  const [location,      setLocation]      = useState("");
  const resultsRef = useRef(null);

  // scroll to results section when upload finishes
  useEffect(() => {
    if (uploadResult && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [uploadResult]);

  // runs the deeper AI agent automatically after upload completes
  useEffect(() => {
    if (!uploadResult?.id) return; // do nothing if no upload yet

    setAgentLoading(true);
    setAgentResult(null);
    setAgentError(null);

    const startedAt = Date.now(); // track how long the agent takes

    runCareerAgent({ resumeId: uploadResult.id, location })
      .then((result) => {
        setAgentResult(result);
        // save a small summary to localStorage so it shows up on the History page
        saveRun({
          resumeId:       uploadResult.id,
          filename:       uploadResult.filename            ?? "resume.pdf",
          atsScore:       result.resumeAnalysis?.atsScore  ?? 0,
          jobCount:       result.jobSuggestions?.length    ?? 0,
          hasRoadmap:     !!result.learningRoadmap,      // !! converts any value to true/false
          hasImprovement: !!result.improvementSuggestions,
          durationMs:     Date.now() - startedAt,
        });
      })
      .catch((err) => setAgentError(err.message))
      .finally(() => setAgentLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadResult?.id]); // only re-run when a new resume is uploaded

  function handleReset() {
    setUploadResult(null);
    setAgentResult(null);
    setAgentLoading(false);
    setAgentError(null);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
      <Navbar />

      <main className="flex-1 px-4 pb-20">
        <div className="max-w-[680px] mx-auto">

          {!uploadResult && <Hero />}

          <section id="analyze" className={uploadResult ? "pt-8 sm:pt-10" : "pb-6"}>
            {!uploadResult && (
              <div className="text-center mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium
                                 text-gray-400 bg-white border border-[#E4E7ED]
                                 px-3 py-1 rounded-full">
                  <svg className="w-3 h-3 text-amber-400" viewBox="0 0 12 12"
                       fill="currentColor">
                    <path d="M6 0a6 6 0 100 12A6 6 0 006 0zm.75 8.25a.75.75 0
                             01-1.5 0v-3a.75.75 0 011.5 0v3zM6 4a1 1 0 110-2
                             1 1 0 010 2z" />
                  </svg>
                  PDF only · Max 5 MB
                </span>
              </div>
            )}

            <UploadSection onResult={setUploadResult} />

            {/* Location input — shown only before upload */}
            {!uploadResult && (
              <LocationInput value={location} onChange={setLocation} />
            )}
          </section>

          {uploadResult && (
            <section ref={resultsRef} className="mt-8 sm:mt-10 space-y-4">
              <ResultsHeader onReset={handleReset} />
              <AgentBanner loading={agentLoading} error={agentError} />
              <ResultsSections
                uploadResult={uploadResult}
                agentResult={agentResult}
                agentLoading={agentLoading}
              />
              <CoverLetterSection resumeId={uploadResult.id} />
            </section>
          )}

          <div className="mt-20 sm:mt-24">
            <Features />
            <div id="how-it-works">
              <HowItWorks />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
