"use client";

import { useEffect } from "react";
import { useUpload } from "../../hooks/useUpload";
import DropZone      from "./DropZone";
import SelectedFile  from "./SelectedFile";
import UploadActions from "./UploadActions";
import { LoadingState, ErrorMessage } from "./UploadStatus";

export default function UploadSection({ onResult }) {
  const { file, loading, progress, error, result, selectFile, submit, reset } = useUpload();

  useEffect(() => { onResult(result); }, [result]);

  return (
    <section
      className="w-full bg-white rounded-[20px] border border-[#E4E7ED] p-6 sm:p-8
                 shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_1px_2px_rgba(0,0,0,0.04)]"
    >
      <div className="mb-6">
        <h2 className="text-base font-semibold text-[#0F1117]">Upload Your Resume</h2>
        <p className="text-sm text-gray-400 mt-1">
          We'll scan it for ATS compatibility and give you actionable feedback.
        </p>
      </div>

      {loading ? (
        <LoadingState progress={progress} />
      ) : (
        <div className="flex flex-col gap-4">
          <DropZone file={file} onChange={selectFile} />
          <SelectedFile file={file} onClear={reset} />
          <UploadActions file={file} loading={loading} onUpload={submit} onReset={reset} />
          {error && <ErrorMessage message={error} />}
        </div>
      )}

      <p className="mt-5 text-center text-[11px] text-gray-300 border-t border-[#F1F3F7] pt-4">
        PDF only · Max 5 MB · Your data is never stored permanently
      </p>
    </section>
  );
}
