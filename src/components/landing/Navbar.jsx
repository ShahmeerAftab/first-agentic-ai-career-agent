import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-[#E4E7ED]">
      <div className="max-w-170 mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand-600 rounded-[10px] flex items-center justify-center
                          text-white shadow-sm shadow-brand-200 shrink-0">
            <span className="font-[family-name:var(--font-dm-serif)] italic text-base leading-none">
              R
            </span>
          </div>
          <span className="text-[1.05rem] leading-none tracking-tight select-none">
            <span className="font-[family-name:var(--font-dm-serif)] italic font-normal text-[#0F1117]">
              Resume
            </span>
            <span className="font-bold text-brand-600 ml-[1px]">AI</span>
          </span>
        </Link>

        {/* History pill */}
        <Link
          href="/history"
          className="flex items-center gap-1.5 h-8 px-3 text-sm font-medium
                     text-gray-500 border border-[#E4E7ED] rounded-[10px] bg-white
                     hover:text-[#0F1117] hover:border-[#D0D4DC] hover:bg-[#F8F9FB]
                     transition-all duration-150"
        >
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          History
        </Link>

      </div>
    </header>
  );
}
