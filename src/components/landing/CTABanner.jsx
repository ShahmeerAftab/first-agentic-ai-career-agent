import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="animate-fade-up py-10 sm:py-14 border-t border-gray-100">
      <div className="bg-blue-600 rounded-3xl px-6 py-10 sm:px-12 sm:py-14 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Ready to get more interviews?
        </h2>
        <p className="text-blue-100 text-sm sm:text-base max-w-md mx-auto">
          Analyse your resume for free in under 30 seconds. No sign-up required.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 h-12 px-8
                     bg-white hover:bg-blue-50 active:bg-blue-100
                     text-blue-700 font-bold rounded-xl transition-colors
                     text-sm sm:text-base"
        >
          Start Analyzing Free
          <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
