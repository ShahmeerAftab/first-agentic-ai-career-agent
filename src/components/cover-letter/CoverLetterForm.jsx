"use client";

export default function CoverLetterForm({
  companyName, jobRole,
  onCompanyChange, onJobRoleChange,
  onGenerate, loading, disabled,
}) {
  const canSubmit = companyName.trim() && jobRole.trim() && !loading && !disabled;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#0F1117]">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => onCompanyChange(e.target.value)}
            placeholder="e.g. Google, Microsoft…"
            disabled={loading}
            className="h-11 px-4 rounded-[10px] border border-[#E4E7ED] bg-[#F8F9FB]
                       text-sm text-[#0F1117] placeholder:text-gray-400
                       focus:outline-none focus:border-brand-400 focus:bg-white
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-150"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#0F1117]">Job Role</label>
          <input
            type="text"
            value={jobRole}
            onChange={(e) => onJobRoleChange(e.target.value)}
            placeholder="e.g. Frontend Developer…"
            disabled={loading}
            className="h-11 px-4 rounded-[10px] border border-[#E4E7ED] bg-[#F8F9FB]
                       text-sm text-[#0F1117] placeholder:text-gray-400
                       focus:outline-none focus:border-brand-400 focus:bg-white
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-150"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={!canSubmit}
        className="self-start h-11 px-6 bg-brand-600 hover:bg-brand-700 active:bg-brand-800
                   disabled:bg-[#E4E7ED] disabled:text-gray-400 disabled:cursor-not-allowed
                   text-white font-semibold rounded-[10px] transition-colors duration-150
                   text-sm cursor-pointer flex items-center gap-2
                   shadow-[0_1px_3px_color-mix(in_srgb,var(--color-brand-600)_30%,transparent)]
                   hover:shadow-[0_4px_12px_color-mix(in_srgb,var(--color-brand-600)_25%,transparent)]"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Generate Cover Letter
          </>
        )}
      </button>
    </div>
  );
}
