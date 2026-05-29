export default function Footer() {
  return (
    <footer className="border-t border-[#E4E7ED] mt-auto">
      <div className="max-w-[680px] mx-auto px-4 py-6
                      flex flex-col sm:flex-row items-center justify-between
                      gap-2 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-brand-600 rounded-md flex items-center justify-center text-white shrink-0">
            <span className="font-[family-name:var(--font-dm-serif)] italic text-xs leading-none">R</span>
          </div>
          <span>
            <span className="font-[family-name:var(--font-dm-serif)] italic text-gray-500">Resume</span><span className="font-bold text-brand-600">AI</span>
            <span className="text-gray-400"> · © 2025 · PDF only · Max 5 MB</span>
          </span>
        </div>
        <span>Built with Next.js &amp; Claude</span>
      </div>
    </footer>
  );
}
