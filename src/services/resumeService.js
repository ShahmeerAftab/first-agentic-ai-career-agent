import axios from "axios";

// shared axios instance — all API calls use this base URL and timeout
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  timeout: 60_000, // 60 seconds — AI analysis can take a while
});

// uploads a PDF and returns the analysis result from the backend
export async function uploadResume(file, onProgress) {
  if (!file) throw new Error("No file provided");
  if (file.type !== "application/pdf") throw new Error("Only PDF files are allowed");
  if (file.size > 5 * 1024 * 1024) throw new Error("File exceeds the 5 MB limit");

  // FormData is how you send a file to a backend (like an HTML form submission)
  const formData = new FormData();
  formData.append("resume", file); // "resume" matches the field name in uploadMiddleware

  try {
    const { data } = await api.post("/api/resume/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      // onUploadProgress fires as bytes are sent — we use it to show a progress bar
      onUploadProgress: onProgress
        ? (e) => {
            const percent = e.total ? Math.round((e.loaded * 100) / e.total) : 0;
            onProgress(percent);
          }
        : undefined,
    });

    return data.data; // backend returns { success, data: { ... } } — we only need data.data
  } catch (err) {
    // err.response exists for HTTP errors (4xx, 5xx) — prefer the API's own message
    const message =
      err.response?.data?.message ||
      (err.code === "ECONNABORTED" ? "Request timed out. Please try again." : null) ||
      err.message ||
      "Upload failed. Please try again.";

    throw new Error(message);
  }
}

// fetches the list of past agent workflow runs from the backend
export async function fetchWorkflowHistory() {
  try {
    const { data } = await api.get("/api/agent/history");
    return data.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to fetch workflow history.";
    throw new Error(message);
  }
}

// sends resume ID + job info to backend and gets back a cover letter string
export async function requestCoverLetter({ resumeId, companyName, jobRole }) {
  try {
    const { data } = await api.post("/api/resume/cover-letter", { resumeId, companyName, jobRole });
    return data.data.coverLetter;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to generate cover letter. Please try again.";
    throw new Error(message);
  }
}
