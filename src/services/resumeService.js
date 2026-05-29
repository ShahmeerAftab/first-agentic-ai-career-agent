import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  timeout: 60_000, // AI analysis can take a few seconds
});

/**
 * Upload a PDF resume file and return the analysis result.
 *
 * @param {File}     file         - The PDF File object from the input/drop zone
 * @param {Function} onProgress   - Optional callback(percent: number) for upload progress
 * @returns {Promise<Object>}       The `data` payload from the API response
 * @throws  {Error}                 With a user-friendly message on failure
 */
export async function uploadResume(file, onProgress) {
  if (!file) throw new Error("No file provided");
  if (file.type !== "application/pdf") throw new Error("Only PDF files are allowed");
  if (file.size > 5 * 1024 * 1024) throw new Error("File exceeds the 5 MB limit");

  const formData = new FormData();
  formData.append("resume", file);

  try {
    const { data } = await api.post("/api/resume/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: onProgress
        ? (e) => {
            const percent = e.total ? Math.round((e.loaded * 100) / e.total) : 0;
            onProgress(percent);
          }
        : undefined,
    });

    console.log("[resumeService] Raw API response:", data);
    console.log("[resumeService] Parsed result:", data.data);

    return data.data;
  } catch (err) {
    // Axios wraps HTTP errors in err.response; surface the API message if present
    const message =
      err.response?.data?.message ||
      (err.code === "ECONNABORTED" ? "Request timed out. Please try again." : null) ||
      err.message ||
      "Upload failed. Please try again.";

    console.error("[resumeService] Upload error:", {
      status:  err.response?.status,
      message,
      raw:     err.response?.data ?? err.message,
    });

    throw new Error(message);
  }
}

export async function fetchWorkflowHistory() {
  try {
    const { data } = await api.get("/api/agent/history");
    return data.data;
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch workflow history.";
    throw new Error(message);
  }
}

export async function requestCoverLetter({ resumeId, companyName, jobRole }) {
  try {
    const { data } = await api.post("/api/resume/cover-letter", { resumeId, companyName, jobRole });
    return data.data.coverLetter;
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.message ||
      "Failed to generate cover letter. Please try again.";
    throw new Error(message);
  }
}
