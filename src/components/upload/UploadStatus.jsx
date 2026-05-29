"use client";

export function LoadingState({ progress }) {
  const isUploading = progress > 0 && progress < 100;

  return (
    <div className="w-full flex flex-col items-center gap-5 py-6">

      {isUploading ? (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-brand-50 border border-brand-100 rounded-[14px]
                          flex items-center justify-center text-2xl">
            📤
          </div>
          <div className="text-center space-y-0.5">
            <p className="font-semibold text-[#0F1117] text-sm">Uploading your resume…</p>
            <p className="text-xs text-gray-400">Sending file to server</p>
          </div>
          <div className="w-full max-w-xs space-y-1.5">
            <div className="w-full h-1.5 bg-[#E4E7ED] rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Uploading</span>
              <span className="font-semibold text-brand-600 tabular-nums">{progress}%</span>
            </div>
          </div>
        </div>

      ) : (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 bg-brand-100 rounded-[14px] animate-pulse" />
            <div className="relative w-12 h-12 bg-brand-50 border border-brand-200 rounded-[14px]
                            flex items-center justify-center text-2xl">
              🤖
            </div>
          </div>

          <div className="text-center space-y-0.5">
            <p className="font-semibold text-[#0F1117] text-sm">Analyzing your resume…</p>
            <p className="text-xs text-gray-400">Checking ATS score, skills, and recommendations</p>
          </div>

          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>

          <div className="flex flex-col gap-1.5 w-full max-w-xs">
            {[
              { icon: "📋", label: "Extracting resume text" },
              { icon: "🎯", label: "Scoring ATS compatibility" },
              { icon: "💡", label: "Generating recommendations" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-gray-400">
                <span>{icon}</span>
                <span>{label}</span>
                <span className="ml-auto w-3 h-3 border-2 border-[#E4E7ED] border-t-brand-500 rounded-full animate-spin" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ErrorMessage({ message }) {
  return (
    <div className="w-full flex items-start gap-3 bg-red-50 border border-red-200 rounded-[10px] px-4 py-3">
      <span className="text-red-400 text-base leading-none mt-0.5">⚠</span>
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
}
