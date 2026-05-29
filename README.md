# Resume AI — AI-Powered Resume Analyzer

Upload your resume and get instant feedback. The app scores your resume for ATS
compatibility, finds skill gaps, suggests real job listings, and can even write
a cover letter for you — all powered by AI.

---

## Features

- **ATS Score** — rates your resume from 0 to 100 based on how well it would
  pass automated screening systems
- **Strengths & Weaknesses** — specific feedback about what's working and what's not
- **Missing Skills** — skills that are common in your target roles but absent from your resume
- **Job Recommendations** — AI-suggested job titles that match your background
- **Real Job Listings** — live job listings matched to your skills (via Arbeitnow or JSearch)
- **Improvement Suggestions** — if your score is below 70, you get a prioritized
  action list to fix it
- **Learning Roadmap** — a week-by-week plan to learn the skills you're missing
- **Cover Letter Generator** — writes a personalized cover letter based on your resume
- **History** — your past analyses are saved in the browser, no account needed

---

## Tech Stack

**Frontend**
- Next.js 15 (App Router)
- Tailwind CSS v4
- React

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Groq AI — `llama-3.3-70b-versatile` model

**Job Search APIs**
- [Arbeitnow](https://www.arbeitnow.com/api) — free, no key needed
- [JSearch via RapidAPI](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) — optional, unlocks LinkedIn & Indeed

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer

