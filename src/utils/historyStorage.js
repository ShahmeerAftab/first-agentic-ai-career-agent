// saves and loads resume analysis history in the browser's localStorage
// localStorage persists between page refreshes — no backend or account needed

const STORAGE_KEY = "resume_ai_runs";
const MAX_RUNS    = 20; // keep only the 20 most recent runs

// adds a new run to the top of the history list
export function saveRun(entry) {
  const existingRuns = loadRuns();

  // put the new entry first, add a timestamp, then keep only the latest 20
  const updated = [{ ...entry, savedAt: new Date().toISOString() }, ...existingRuns]
    .slice(0, MAX_RUNS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // silently ignore if localStorage is full or unavailable
  }
}

// returns all saved runs (newest first), or [] if nothing is saved yet
export function loadRuns() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return []; // return empty array if data is corrupt
  }
}

// deletes all saved history from localStorage
export function clearRuns() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
