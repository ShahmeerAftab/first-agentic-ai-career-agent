/**
 * Normalises an AI-returned array into plain strings.
 * Handles: string, { text }, { value }, { strength }, { weakness },
 *          { recommendation }, and strips empty entries.
 */
export function normalise(items = [], fallbackKeys = []) {
  const keys = ["text", "value", "strength", "weakness", "recommendation", ...fallbackKeys];
  return items
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (item && typeof item === "object") {
        for (const key of keys) {
          if (typeof item[key] === "string" && item[key].trim()) return item[key].trim();
        }
      }
      return "";
    })
    .filter(Boolean);
}
