"use client";

export default function UploadActions({ file, loading, onUpload, onReset }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2.5 w-full">
      <button
        type="button"
        onClick={onUpload}
        disabled={!file || loading}
        className="flex-1 h-11 bg-brand-600 hover:bg-brand-700 active:bg-brand-800
                   disabled:bg-[#E4E7ED] disabled:text-gray-400 disabled:cursor-not-allowed
                   text-white font-semibold rounded-[10px] transition-colors duration-150
                   text-sm cursor-pointer
                   shadow-[0_1px_3px_color-mix(in_srgb,var(--color-brand-600)_30%,transparent)]
                   hover:shadow-[0_4px_12px_color-mix(in_srgb,var(--color-brand-600)_25%,transparent)]"
      >
        Analyze Resume
      </button>

      {file && (
        <button
          type="button"
          onClick={onReset}
          className="h-11 px-5 border border-[#E4E7ED] bg-white
                     hover:bg-[#F1F3F7] active:bg-[#E4E7ED]
                     text-gray-500 hover:text-gray-700 font-medium
                     rounded-[10px] transition-colors duration-150
                     text-sm cursor-pointer"
        >
          Reset
        </button>
      )}
    </div>
  );
}
