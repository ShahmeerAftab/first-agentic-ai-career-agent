const KEY      = "resume_ai_runs";
const MAX_RUNS = 20;

/**
 * @typedef {Object} HistoryEntry
 * @property {string}  resumeId
 * @property {string}  filename
 * @property {number}  atsScore
 * @property {number}  jobCount
 * @property {boolean} hasRoadmap
 * @property {boolean} hasImprovement
 * @property {number|null} durationMs
 * @property {string}  savedAt   ISO timestamp
 */

/** Save a completed agent run to localStorage. */
export function saveRun(entry) {
  const list    = loadRuns();
  const updated = [{ ...entry, savedAt: new Date().toISOString() }, ...list]
    .slice(0, MAX_RUNS);
  try {
    localStorage.setItem(KEY, JSON.stringify(updated));
  } catch {
    // Storage quota exceeded — silently ignore
  }
}

/** Load all saved runs, newest first. */
export function loadRuns() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Wipe the entire local history. */
export function clearRuns() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
