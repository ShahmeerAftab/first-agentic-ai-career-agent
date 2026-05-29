import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  timeout: 120_000, // multiple sequential AI calls — allow up to 2 min
});

/**
 * Run the full career agent pipeline for an already-uploaded resume.
 *
 * @param {object}  params
 * @param {string}  params.resumeId     MongoDB _id from the upload response
 * @param {string} [params.companyName] Triggers cover letter generation
 * @param {string} [params.jobRole]     Required alongside companyName
 * @param {string} [params.location]    Optional location hint for real job search
 */
export async function runCareerAgent({ resumeId, companyName, jobRole, location } = {}) {
  if (!resumeId) throw new Error("resumeId is required to run the career agent");

  try {
    const { data } = await api.post("/api/agent/analyze", {
      resumeId,
      companyName: companyName || undefined,
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
