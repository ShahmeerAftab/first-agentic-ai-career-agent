"use client";

function formatBytes(bytes) {
  if (bytes < 1024)        return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function SelectedFile({ file, onClear }) {
  if (!file) return null;

  return (
    <div className="flex items-center gap-3 w-full
                    bg-brand-50 border border-brand-200
                    rounded-[10px] px-4 py-3">

      <div className="shrink-0 w-9 h-9 bg-white border border-brand-200 rounded-lg
                      flex items-center justify-center text-base shadow-sm">
        📄
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-brand-700 truncate" title={file.name}>
          {file.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-brand-400">{formatBytes(file.size)}</span>
          <span className="w-1 h-1 rounded-full bg-brand-300" />
          <span className="text-[11px] font-semibold text-brand-600 bg-brand-100 px-1.5 py-0.5 rounded">
            PDF
          </span>
          <span className="text-xs text-emerald-600 font-medium hidden sm:inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            Ready
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        aria-label="Remove selected file"
        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full
                   text-brand-300 hover:bg-brand-100 hover:text-brand-600
                   transition-colors duration-150 cursor-pointer text-sm"
      >
        ✕
      </button>
    </div>
  );
}
