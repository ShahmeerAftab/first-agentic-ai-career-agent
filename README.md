<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
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

>>>>>>> 0770596a26eeac70a6308b33efa22226bbc505d4
