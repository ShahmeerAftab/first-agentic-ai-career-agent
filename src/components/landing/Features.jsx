const FEATURES = [
  {
    icon: "🎯",
    title: "ATS Score",
    desc: "Get a 0–100 compatibility score showing how well your resume passes Applicant Tracking Systems.",
  },
  {
    icon: "💪",
    title: "Strengths Analysis",
    desc: "Discover what's already working well and what recruiters will notice first.",
  },
  {
    icon: "🔍",
    title: "Gap Detection",
    desc: "Identify missing keywords, skills, and sections that could be costing you interviews.",
  },
  {
    icon: "💡",
    title: "Recommendations",
    desc: "Receive a prioritised action list so you know exactly what to fix to boost your score.",
  },
];

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <div
      className="animate-fade-up bg-white rounded-[14px] border border-[#E4E7ED] p-5 sm:p-6
                  flex flex-col gap-3
                  shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_1px_2px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),_0_2px_4px_rgba(0,0,0,0.04)]
                  hover:-translate-y-0.5 transition-all duration-200"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 rounded-[10px] bg-brand-50 flex items-center justify-center text-xl shrink-0">
        {icon}
      </div>
      <h3 className="font-semibold text-sm sm:text-[0.9375rem] text-[#0F1117]">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-12 sm:py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1117]">
          Everything you need to land more interviews
        </h2>
        <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm sm:text-[0.9375rem]">
          Our AI reads your resume the same way ATS software does — then tells you how to beat it.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {FEATURES.map(({ icon, title, desc }, i) => (
          <FeatureCard key={title} icon={icon} title={title} desc={desc} delay={i * 70} />
        ))}
      </div>
    </section>
  );
}
