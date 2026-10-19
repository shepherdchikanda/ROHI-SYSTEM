/**
 * RAG-lite retrieval — finds the most relevant KB sections for a question.
 * No embeddings, no vector DB — just keyword matching (fast, simple, free).
 * Works with any model, scales as the KB grows.
 */
import { ROHI_KNOWLEDGE_BASE } from "./rohi-knowledge-base";

// Split the KB into sections by "## " headers
type Section = { title: string; content: string; keywords: string[] };

function parseSections(): Section[] {
  const sections: Section[] = [];
  const parts = ROHI_KNOWLEDGE_BASE.split(/^## /m);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const newlineIdx = trimmed.indexOf("\n");
    const title = trimmed.slice(0, newlineIdx).trim().toLowerCase();
    const content = trimmed.slice(newlineIdx + 1).trim();
    // Extract keywords from the title + content
    const words = (title + " " + content)
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
    const keywords = [...new Set(words)];
    sections.push({ title, content: `## ${title}\n${content}`, keywords });
  }
  return sections;
}

const STOP_WORDS = new Set([
  "the", "and", "for", "are", "not", "you", "your", "our", "this", "that",
  "with", "from", "they", "have", "will", "can", "all", "but", "was",
  "what", "how", "why", "when", "who", "where", "which", "does", "do",
  "did", "isnt", "dont", "cant", "wont", "should", "would", "could",
  "about", "into", "than", "then", "them", "their", "there", "these",
  "those", "been", "more", "most", "some", "any", "each", "other",
]);

let cachedSections: Section[] | null = null;

/**
 * Find the most relevant KB sections for a question.
 * Returns the top N sections (by keyword overlap score) as a combined string.
 */
export function retrieveRelevantKB(
  question: string,
  maxSections = 3,
): string {
  if (!cachedSections) cachedSections = parseSections();
  const sections = cachedSections;

  // Extract question keywords
  const questionWords = question
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

  if (questionWords.length === 0) {
    // No keywords — return the identity section as fallback
    return sections[0]?.content || "";
  }

  // Score each section by keyword overlap
  const scored = sections.map((section) => {
    let score = 0;
    for (const word of questionWords) {
      if (section.keywords.includes(word)) score += 2;
      // Partial match (e.g., "contact" matches "contacting")
      if (section.keywords.some((kw) => kw.includes(word) || word.includes(kw))) {
        score += 1;
      }
    }
    // Boost sections whose title matches a question word
    for (const word of questionWords) {
      if (section.title.includes(word)) score += 3;
    }
    return { section, score };
  });

  // Sort by score, take top N (only if score > 0)
  const relevant = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSections)
    .map((s) => s.section.content);

  // If nothing matched, return identity + contact as fallback
  if (relevant.length === 0) {
    const identity = sections.find((s) => s.title.includes("identity"));
    const contact = sections.find((s) => s.title.includes("contact"));
    return [identity?.content, contact?.content].filter(Boolean).join("\n\n");
  }

  return relevant.join("\n\n");
}
