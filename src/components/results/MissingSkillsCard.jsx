"use client";

const LEVELS = [
  {
    key:   "high",
    label: "High Priority",
    chip:  "bg-red-50 text-red-700 border border-red-200",
    dot:   "bg-red-400",
    head:  "text-red-600",
  },
  {
    key:   "medium",
    label: "Medium Priority",
    chip:  "bg-amber-50 text-amber-700 border border-amber-200",
    dot:   "bg-amber-400",
    head:  "text-amber-600",
  },
  {
    key:   "low",
    label: "Low Priority",
    chip:  "bg-gray-50 text-gray-600 border border-gray-200",
    dot:   "bg-gray-300",
    head:  "text-gray-400",
  },
];

function SkillChip({ skill, level }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium
                      px-3 py-1.5 rounded-full ${level.chip}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${level.dot}`} />
      {skill}
    </span>
  );
}

export default function MissingSkillsCard({ skills = [] }) {
  if (skills.length === 0) return null;

  const getSkill = (s) => (typeof s === "string" ? s : s.skill);
  const getLevel = (s) => (typeof s === "string" ? "medium" : (s.importance ?? "medium"));

  const grouped = LEVELS.map((lvl) => ({
    ...lvl,
    items: skills.filter((s) => getLevel(s) === lvl.key).map(getSkill),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="w-full rounded-[20px] border border-[#E4E7ED] overflow-hidden bg-white
                    shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 sm:px-6 bg-amber-50 border-b border-amber-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#0F1117]">Missing Skills</h3>
            <p className="text-[11px] text-amber-600 font-medium mt-0.5">Keywords not found in your resume</p>
          </div>
        </div>
        <span className="text-xs font-bold text-amber-700 bg-amber-100 border border-amber-200
                         px-2.5 py-1 rounded-full tabular-nums">
          {skills.length}
        </span>
      </div>

      {/* Grouped chips */}
      <div className="divide-y divide-[#F1F3F7]">
        {grouped.map((group) => (
          <div key={group.key} className="px-5 py-4 sm:px-6">
            <p className={`text-[11px] font-semibold uppercase tracking-wide mb-3 ${group.head}`}>
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill, i) => (
                <SkillChip key={`${group.key}-${i}`} skill={skill} level={group} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
