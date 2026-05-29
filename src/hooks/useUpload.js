"use client";

import { useState } from "react";
import { uploadResume } from "../services/resumeService";

export function useUpload() {
  const [file,     setFile]     = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [progress, setProgress] = useState(0);
  const [error,    setError]    = useState(null);
  const [result,   setResult]   = useState(null);

  const selectFile = (picked) => {
    console.log("[useUpload] File selected:", { name: picked.name, size: picked.size, type: picked.type });
    setFile(picked);
    setError(null);
    setResult(null);
  };

  const submit = async () => {
    if (!file) return;

    console.log("[useUpload] Submitting:", file.name);
    setLoading(true);
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      const data = await uploadResume(file, setProgress);
      console.log("[useUpload] API response stored in state:", data);
      setResult(data);
    } catch (err) {
      console.error("[useUpload] Upload failed:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const reset = () => {
    setFile(null);
    setError(null);
    setResult(null);
    setProgress(0);
  };

  return { file, loading, progress, error, result, selectFile, submit, reset };
}
