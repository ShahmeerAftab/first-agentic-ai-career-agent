const STEPS = [
  {
    icon: "📄",
    step: "1",
    title: "Upload PDF",
    desc: "Drop your resume in PDF format, up to 5 MB.",
  },
  {
    icon: "🤖",
    step: "2",
    title: "AI Analysis",
    desc: "Our AI reads and scores your resume against ATS rules.",
  },
  {
    icon: "📊",
    step: "3",
    title: "Get Feedback",
    desc: "Receive strengths, gaps, and actionable recommendations.",
  },
];

function StepCard({ icon, step, title, desc, delay }) {
  return (
    <div
      className="animate-fade-up flex flex-col items-center text-center gap-3 p-6
                  bg-white rounded-[14px] border border-[#E4E7ED]
                  shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_1px_2px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),_0_2px_4px_rgba(0,0,0,0.04)]
                  hover:-translate-y-0.5 transition-all duration-200"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-11 h-11 bg-brand-50 rounded-full flex items-center justify-center text-2xl">
        {icon}
      </div>
      <span className="text-[11px] font-semibold text-brand-600 uppercase tracking-widest">
        Step {step}
      </span>
      <h3 className="font-semibold text-[#0F1117] text-sm sm:text-[0.9375rem]">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 border-t border-[#E4E7ED]">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1117]">
          How it works
        </h2>
        <p className="text-gray-500 mt-3 text-sm sm:text-[0.9375rem]">
          Three steps to a better resume.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {STEPS.map(({ icon, step, title, desc }, i) => (
          <StepCard key={step} icon={icon} step={step} title={title} desc={desc} delay={i * 90} />
        ))}
      </div>
    </section>
  );
}
