import axios from "axios";

// separate axios instance with a longer timeout — this call chains multiple AI steps
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  timeout: 120_000, // 2 minutes — multiple sequential AI calls happen on the backend
});

// kicks off the full career agent on the backend and returns all results
export async function runCareerAgent({ resumeId, companyName, jobRole, location } = {}) {
  if (!resumeId) throw new Error("resumeId is required to run the career agent");

  try {
    const { data } = await api.post("/api/agent/analyze", {
      resumeId,
      companyName: companyName || undefined, // undefined fields are excluded from the request body
      jobRole:     jobRole     || undefined,
      location:    location    || undefined,
    });

    return data.data;
  } catch (err) {
    const message =
      err.response?.data?.message ||
      (err.code === "ECONNABORTED" ? "Request timed out. The analysis took too long." : null) ||
      err.message ||
      "Career analysis failed. Please try again.";

    throw new Error(message);
  }
}
