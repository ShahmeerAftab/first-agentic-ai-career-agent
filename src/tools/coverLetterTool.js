import { requestCoverLetter } from "../services/resumeService";

/**
 * Frontend wrapper for the backend coverLetterTool.
 * Mirrors the backend tool's interface so callers use the same shape.
 */
export const coverLetterTool = {
  name: "cover_letter_writer",
  description:
    "Generates a tailored cover letter from a stored resume, a company name, and a job role.",

  async execute({ resumeId, companyName, jobRole }) {
    if (!resumeId)         throw new Error("[coverLetterTool] resumeId is required");
    if (!companyName?.trim()) throw new Error("[coverLetterTool] companyName is required");
    if (!jobRole?.trim())     throw new Error("[coverLetterTool] jobRole is required");

    const coverLetter = await requestCoverLetter({ resumeId, companyName, jobRole });
    return { coverLetter };
  },
};
