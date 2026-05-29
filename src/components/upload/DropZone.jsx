"use client";

import { useRef, useState } from "react";

function isPdf(item) {
  return item?.type === "application/pdf";
}

function draggedFileType(e) {
  const items = Array.from(e.dataTransfer?.items ?? []);
  if (items.length === 0) return "unknown";
  return items.some(isPdf) ? "valid" : "invalid";
}

const STYLES = {
  idle: {
    zone:  "border-[#C9CDD8] bg-[#F1F3F7] hover:border-brand-400 hover:bg-brand-50/40",
    icon:  "bg-white border border-[#E4E7ED]",
    emoji: "📂",
  },
  file: {
    zone:  "border-brand-400 bg-brand-50/50",
    icon:  "bg-brand-50",
    emoji: "📄",
  },
  valid: {
    zone:  "border-brand-500 bg-brand-50/70 scale-[1.01]",
    icon:  "bg-brand-100",
    emoji: "⬇️",
  },
  invalid: {
    zone:  "border-red-400 bg-red-50 scale-[1.01]",
    icon:  "bg-red-50",
    emoji: "🚫",
  },
};

export default function DropZone({ file, onChange }) {
  const inputRef  = useRef(null);
  const dragCount = useRef(0);
  const [drag, setDrag] = useState("idle");

  const onDragEnter = (e) => {
    e.preventDefault();
    dragCount.current += 1;
    if (dragCount.current === 1) setDrag(draggedFileType(e));
  };
  const onDragOver  = (e) => { e.preventDefault(); };
  const onDragLeave = (e) => {
    e.preventDefault();
    dragCount.current -= 1;
    if (dragCount.current === 0) setDrag("idle");
  };
  const onDrop = (e) => {
    e.preventDefault();
    dragCount.current = 0;
    setDrag("idle");
    const dropped = e.dataTransfer.files[0];
    if (dropped && isPdf(dropped)) onChange(dropped);
  };
  const onFileChange = (e) => {
    const picked = e.target.files[0];
    if (picked) onChange(picked);
    e.target.value = "";
  };

  const displayState = drag !== "idle" ? drag : file ? "file" : "idle";
  const s = STYLES[displayState];
  const isDragging = drag !== "idle";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload PDF resume — drag & drop or click to browse"
      className={`relative w-full flex flex-col items-center justify-center gap-4
                  border-2 border-dashed rounded-2xl
                  px-6 py-10 sm:py-12
                  cursor-pointer select-none
                  transition-all duration-200
                  ${s.zone}`}
      onClick={() => !isDragging && inputRef.current?.click()}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 rounded-[14px] flex flex-col items-center justify-center gap-3 pointer-events-none">
          <div className={`w-14 h-14 rounded-[14px] flex items-center justify-center text-3xl ${s.icon}`}>
            {s.emoji}
          </div>
          <p className={`font-semibold text-sm ${drag === "invalid" ? "text-red-500" : "text-brand-600"}`}>
            {drag === "valid" ? "Drop to upload your resume" : "PDF files only — not supported"}
          </p>
        </div>
      )}

      <div className={`flex flex-col items-center gap-3.5 transition-opacity duration-150 ${isDragging ? "opacity-0" : "opacity-100"}`}>
        <div className={`w-14 h-14 rounded-[14px] flex items-center justify-center text-2xl transition-all duration-200 ${s.icon}`}>
          {s.emoji}
        </div>

        {file ? (
          <div className="text-center space-y-1">
            <p className="font-semibold text-brand-600 text-sm break-all max-w-65 sm:max-w-sm">
              {file.name}
            </p>
            <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB · PDF ready</p>
            <span className="inline-block text-[11px] text-brand-500 bg-brand-50 border border-brand-100 px-2 py-0.5 rounded-full">
              Click or drop to replace
            </span>
          </div>
        ) : (
          <div className="text-center space-y-1">
            <p className="font-medium text-[#0F1117] text-sm">
              Drag &amp; drop or <span className="text-brand-600 underline underline-offset-2">click to upload</span>
            </p>
            <p className="text-xs text-gray-400">PDF only · Max 5 MB</p>
          </div>
        )}
      </div>

      <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={onFileChange} />
    </div>
  );
}
