"use client";

import { useState } from "react";
import CoverLetterForm   from "./CoverLetterForm";
import CoverLetterOutput from "./CoverLetterOutput";
import { requestCoverLetter } from "../../services/resumeService";

export default function CoverLetterSection({ resumeId }) {
  const [companyName,  setCompanyName]  = useState("");
  const [jobRole,      setJobRole]      = useState("");
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState(null);
  const [coverLetter,  setCoverLetter]  = useState(null);

  const handleGenerate = async () => {
    if (!companyName.trim() || !jobRole.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const letter = await requestCoverLetter({ resumeId, companyName, jobRole });
      setCoverLetter(letter);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    setCoverLetter(null);
    setError(null);
  };

  return (
    <div className="mt-3 bg-white rounded-[20px] border border-[#E4E7ED]
                    shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_1px_2px_rgba(0,0,0,0.04)]
                    p-6 sm:p-8">

      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="shrink-0 w-9 h-9 bg-brand-50 border border-brand-100 rounded-[10px]
                        flex items-center justify-center text-lg">
          ✉️
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#0F1117]">AI Cover Letter</h3>
          <p className="text-sm text-gray-400 mt-0.5">
            Generate a tailored cover letter from your resume in seconds.
          </p>
        </div>
      </div>

      {/* Body */}
      {coverLetter ? (
        <CoverLetterOutput
          coverLetter={coverLetter}
          companyName={companyName}
          jobRole={jobRole}
          onRegenerate={handleRegenerate}
        />
      ) : (
        <CoverLetterForm
          companyName={companyName}
          jobRole={jobRole}
          onCompanyChange={setCompanyName}
          onJobRoleChange={setJobRole}
          onGenerate={handleGenerate}
          loading={loading}
          disabled={!resumeId}
        />
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 flex items-start gap-3 bg-red-50 border border-red-200
                        rounded-[10px] px-4 py-3">
          <span className="text-red-400 text-base leading-none mt-0.5">⚠</span>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Loading hint */}
      {loading && (
        <p className="mt-4 text-xs text-gray-400 text-center animate-pulse">
          Writing your cover letter — this takes about 10 seconds…
        </p>
      )}
    </div>
  );
}
