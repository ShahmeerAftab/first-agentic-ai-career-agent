"use client";

import { useState } from "react";
import { uploadResume } from "../services/resumeService";

export function useUpload() {

  // useState stores values that cause the UI to re-render when they change
  const [file,     setFile]     = useState(null);   // the PDF file the user picked
  const [loading,  setLoading]  = useState(false);  // true while the API call is in progress
  const [progress, setProgress] = useState(0);      // upload percentage 0–100
  const [error,    setError]    = useState(null);   // error message string or null
  const [result,   setResult]   = useState(null);   // the analysis result from the backend

  // called when the user picks or drops a file
  const selectFile = (picked) => {
    setFile(picked);
    setError(null);  // clear any previous error
    setResult(null); // clear any previous result
  };

  // called when the user clicks the Analyze button
  const submit = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      const data = await uploadResume(file, setProgress); // setProgress updates the progress bar
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      // finally runs whether the call succeeded or failed
      setLoading(false);
      setProgress(0);
    }
  };

  // resets everything back to the initial empty state
  const reset = () => {
    setFile(null);
    setError(null);
    setResult(null);
    setProgress(0);
  };

  // return everything so components can use them
  return { file, loading, progress, error, result, selectFile, submit, reset };
}
