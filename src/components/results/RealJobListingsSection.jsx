"use client";

// ── Match badge ───────────────────────────────────────────────────────────────
function MatchBadge({ score }) {
  const cls =
    score >= 70 ? "bg-emerald-100 text-emerald-700" :
    score >= 40 ? "bg-amber-100 text-amber-700"     :
                  "bg-gray-100 text-gray-500";
  return (
    <span className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-full ${cls}`}>
      {score}% match
    </span>
  );
}

// ── Source badge ──────────────────────────────────────────────────────────────
function SourceBadge({ source }) {
  if (!source) return null;
  const isRemotive = source === "Remotive";
  return (
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border
                      ${isRemotive
                        ? "bg-violet-50 text-violet-500 border-violet-100"
                        : "bg-sky-50 text-sky-500 border-sky-100"}`}>
      via {source}
    </span>
  );
}

// ── Job card ──────────────────────────────────────────────────────────────────
function JobCard({ job, index }) {
  return (
    <div
      className="animate-slide-right flex flex-col gap-2 p-4 rounded-xl
                 border border-[#E4E7ED] bg-white
                 hover:border-teal-200 hover:bg-teal-50/30
                 transition-all duration-150"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Row 1: title + match score */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#0F1117] leading-snug">
            {job.title}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
            <p className="text-xs text-gray-500">{job.company}</p>
            <SourceBadge source={job.source} />
          </div>
        </div>
        <MatchBadge score={job.matchScore} />
      </div>

      {/* Row 2: location / type pills */}
      <div className="flex flex-wrap gap-1.5">
        {job.location && (
          <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            📍 {job.location}
          </span>
        )}
        {job.remote ? (
          <span className="text-[11px] bg-teal-100 text-teal-700 font-medium
                           px-2 py-0.5 rounded-full">
            Remote
          </span>
        ) : (
          <span className="text-[11px] bg-orange-50 text-orange-600 font-medium
                           border border-orange-100 px-2 py-0.5 rounded-full">
            Onsite
          </span>
        )}
        {job.type && (
          <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            {job.type}
          </span>
        )}
      </div>

      {/* Row 3: matched skill chips */}
      {job.matchedSkills?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {job.matchedSkills.slice(0, 6).map((skill) => (
            <span
              key={skill}
              className="text-[10px] font-medium bg-teal-50 text-teal-700
                         border border-teal-100 px-2 py-0.5 rounded-full"
            >
              ✓ {skill}
            </span>
          ))}
          {job.matchedSkills.length > 6 && (
            <span className="text-[10px] text-gray-400 self-center">
              +{job.matchedSkills.length - 6} more
            </span>
          )}
        </div>
      )}

      {/* Row 4: apply link */}
      {job.applyUrl && (
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-end flex items-center gap-1 text-xs font-semibold
                     text-teal-700 hover:text-teal-900 transition-colors mt-0.5"
        >
          Apply
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6h7M6 2.5l3.5 3.5L6 9.5"
                  stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
    </div>
  );
}

// ── Source footer ─────────────────────────────────────────────────────────────
function SourceFooter({ listings }) {
  const sources = [...new Set(listings.map((j) => j.source).filter(Boolean))];
  if (!sources.length) return null;
  return (
    <p className="text-[11px] text-gray-400 text-center pt-1">
      Results from {sources.join(" · ")}
    </p>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="bg-white rounded-[20px] border border-[#E4E7ED] overflow-hidden animate-pulse">
      <div className="h-14 bg-teal-50 border-b border-teal-100" />
      <div className="p-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-[#E4E7ED] p-4 space-y-2">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-100 rounded w-16" />
            </div>
            <div className="h-3 bg-gray-100 rounded w-1/3" />
            <div className="flex gap-1.5">
              <div className="h-5 bg-teal-50 rounded-full w-16" />
              <div className="h-5 bg-teal-50 rounded-full w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function RealJobListingsSection({ listings, loading }) {
  if (loading) return <Skeleton />;
  if (!listings) return null;

  return (
    <div className="bg-white rounded-[20px] border border-[#E4E7ED] overflow-hidden
                    shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5
                      bg-teal-50 border-b border-teal-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center
                          justify-center shrink-0">
            <svg className="w-3.5 h-3.5 text-teal-600" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="4" width="12" height="9" rx="1.5"
                    stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2 8h12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-teal-800 leading-none">
              Live Job Listings
            </p>
            <p className="text-[11px] text-teal-500 mt-0.5 leading-none">
              Matched to your skills · sorted by relevance
            </p>
          </div>
        </div>
        {listings.length > 0 && (
          <span className="text-xs font-semibold bg-teal-100 text-teal-700
                           px-2.5 py-1 rounded-full shrink-0">
            {listings.length} found
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        {listings.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <span className="text-3xl">🔍</span>
            <p className="text-sm font-medium text-gray-500">No matching listings found</p>
            <p className="text-xs text-gray-400 max-w-[270px] leading-relaxed">
              No jobs matched your skill set from the current search.
              Add{" "}
              <code className="bg-gray-100 px-1 rounded text-[11px]">RAPIDAPI_KEY</code>
              {" "}to your backend{" "}
              <code className="bg-gray-100 px-1 rounded text-[11px]">.env</code>
              {" "}to search LinkedIn & Indeed.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {listings.map((job, i) => (
              <JobCard key={job.id ?? i} job={job} index={i} />
            ))}
            <SourceFooter listings={listings} />
          </div>
        )}
      </div>
    </div>
  );
}
