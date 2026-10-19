/**
 * RAG-lite retrieval — finds the most relevant KB sections for a question.
 * Keyword matching with synonym awareness. No embeddings, no vector DB.
 */
import { ROHI_KNOWLEDGE_BASE } from "./rohi-knowledge-base";

type Section = { title: string; content: string; keywords: string[] };

// Synonym map: question word → KB keyword(s) to also match
const SYNONYMS: Record<string, string[]> = {
  cost: ["pricing", "price", "charge"],
  charges: ["pricing", "price", "cost"],
  expensive: ["pricing", "price"],
  money: ["pricing", "price"],
  budget: ["pricing", "price"],
  hire: ["pricing", "contact"],
  reach: ["contact", "email", "phone"],
  touch: ["contact", "email", "phone"],
  call: ["contact", "phone"],
  email: ["contact"],
  whatsapp: ["contact", "phone"],
  build: ["systems", "capabilities", "solutions"],
  create: ["systems", "build"],
  make: ["systems", "build"],
  crm: ["systems", "customer", "platform"],
  website: ["digital", "foundations", "systems"],
  portal: ["systems", "customer"],
  approach: ["methodology", "understand", "design", "build"],
  process: ["methodology", "automation", "workflow"],
  steps: ["methodology", "approach"],
  how: ["methodology", "approach"],
  ai: ["intelligence", "artificial"],
  smart: ["intelligence", "ai"],
  intelligent: ["intelligence", "ai"],
  product: ["products", "fims"],
  fims: ["products"],
  client: ["contact", "case"],
  customer: ["contact", "systems", "customer"],
  m: ["mozambique"],  // for "M-Pesa"
  pesa: ["mozambique"],
  local: ["mozambique"],
  certified: ["honesty", "compliance"],
  certification: ["honesty", "compliance"],
  secure: ["security", "honesty"],
};

function parseSections(): Section[] {
  const sections: Section[] = [];
  const parts = ROHI_KNOWLEDGE_BASE.split(/^## /m);
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const newlineIdx = trimmed.indexOf("\n");
    const title = trimmed.slice(0, newlineIdx).trim().toLowerCase();
    const content = trimmed.slice(newlineIdx + 1).trim();
    const words = (title + " " + content)
      .toLowerCase().split(/\W+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
    sections.push({ title, content: `## ${title}\n${content}`, keywords: [...new Set(words)] });
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
 * Retrieve the most relevant KB sections for a question.
 * @param question The user's latest message
 * @param maxSections Maximum sections to return (default 5)
 * @param minScore Minimum relevance score to include a section (default 2)
 */
export function retrieveRelevantKB(
  question: string,
  maxSections = 5,
  minScore = 2,
): string {
  if (!cachedSections) cachedSections = parseSections();
  const sections = cachedSections;

  const questionWords = question
    .toLowerCase().split(/\W+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

  if (questionWords.length === 0) {
    return sections[0]?.content || "";
  }

  // Expand question words with synonyms
  const expandedWords = new Set<string>(questionWords);
  for (const word of questionWords) {
    const syns = SYNONYMS[word];
    if (syns) syns.forEach((s) => expandedWords.add(s));
  }

  const scored = sections.map((section) => {
    let score = 0;
    for (const word of expandedWords) {
      if (section.keywords.includes(word)) score += 2;
      if (section.keywords.some((kw) => kw.includes(word) || word.includes(kw))) score += 1;
    }
    for (const word of questionWords) {
      if (section.title.includes(word)) score += 3;
    }
    return { section, score };
  });

  const relevant = scored
    .filter((s) => s.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSections)
    .map((s) => s.section.content);

  if (relevant.length === 0) {
    const identity = sections.find((s) => s.title.includes("identity"));
    const contact = sections.find((s) => s.title.includes("contact"));
    return [identity?.content, contact?.content].filter(Boolean).join("\n\n");
  }

  return relevant.join("\n\n");
}
