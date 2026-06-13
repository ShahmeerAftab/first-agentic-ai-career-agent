// The AI sometimes returns arrays of plain strings, sometimes arrays of objects.
// This function handles both cases and always returns a clean array of strings.
//
// Examples:
//   ["Good formatting"]              → ["Good formatting"]
//   [{ text: "Good formatting" }]   → ["Good formatting"]
//   [{ strength: "Good formatting" }] → ["Good formatting"]

export function normalise(items = [], fallbackKeys = []) {
  const keysToCheck = ["text", "value", "strength", "weakness", "recommendation", ...fallbackKeys];

  return items
    .map((item) => {
      // already a plain string — just trim whitespace
      if (typeof item === "string") return item.trim();

      // it's an object — look for a known key that has a string value
      if (item && typeof item === "object") {
        for (const key of keysToCheck) {
          if (typeof item[key] === "string" && item[key].trim()) {
            return item[key].trim();
          }
        }
      }

      return ""; // unknown shape — return empty string, filtered out below
    })
    .filter(Boolean); // remove empty strings from the result
}
