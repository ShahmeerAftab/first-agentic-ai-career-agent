"use client";

function JobChip({ title, index }) {
  return (
    <div
      className="animate-slide-right flex items-center gap-3 pl-4 pr-3 py-3
                 bg-white border border-[#E4E7ED] border-l-2 border-l-violet-400
                 rounded-xl hover:border-violet-200 hover:bg-violet-50/40
                 transition-colors duration-150 cursor-default"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <span className="shrink-0 w-7 h-7 rounded-lg bg-violet-100
                       flex items-center justify-center">
        <svg className="w-3.5 h-3.5 text-violet-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z" clipRule="evenodd" />
          <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.1.644 4.313.987 6.61.987 2.297 0 4.51-.343 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" />
        </svg>
      </span>
      <span className="flex-1 text-sm font-medium text-[#0F1117] leading-tight">{title}</span>
      <svg className="shrink-0 w-4 h-4 text-violet-300" viewBox="0 0 16 16" fill="none">
        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function JobRecommendationsSection({ jobs = [] }) {
  if (!Array.isArray(jobs) || jobs.length === 0) return null;

  return (
    <div className="w-full rounded-[20px] border border-[#E4E7ED] overflow-hidden bg-white
                    shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between px-5 py-4 sm:px-6 bg-violet-50 border-b border-violet-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-violet-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z" clipRule="evenodd" />
              <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.1.644 4.313.987 6.61.987 2.297 0 4.51-.343 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#0F1117]">Job Recommendations</h3>
            <p className="text-[11px] text-violet-500 font-medium mt-0.5">Roles that match your profile</p>
          </div>
        </div>
        <span className="text-xs font-bold text-violet-700 bg-violet-100 border border-violet-200
                         px-2.5 py-1 rounded-full tabular-nums">
          {jobs.length}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {jobs.map((title, i) => (
            <JobChip key={`${i}-${title}`} title={title} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
