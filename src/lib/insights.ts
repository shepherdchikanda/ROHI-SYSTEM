/**
 * ROHI SYSTEMS — Insights articles.
 * Content reflects ROHI's documented philosophy (understand first, practical
 * AI, complexity → clarity). No invented clients, metrics, dates or history.
 */

export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Insight = {
  slug: string;
  title: string;
  tag: "Systems" | "AI" | "Automation" | "Data" | "Strategy" | "Efficiency";
  summary: string;
  date: string; // ISO
  readingTime: string;
  published: boolean;
  content: InsightBlock[];
};

export const INSIGHTS: Insight[] = [
  {
    slug: "when-standard-software-stops-fitting",
    title: "When standard software stops fitting the business",
    tag: "Systems",
    summary:
      "How to recognize the moment custom systems become the better investment — and how to scope them without overbuilding.",
    date: "2025-01-15",
    readingTime: "4 min",
    published: true,
    content: [
      {
        type: "p",
        text: "Most organizations don't start with a software problem. They start with a process that grew faster than the tools supporting it. Spreadsheets multiply. A second tool gets bought to patch the first. Someone builds a workaround that becomes load-bearing. Eventually the work happens despite the software, not because of it.",
      },
      {
        type: "p",
        text: "The question isn't whether standard software is bad — it's whether it still fits the way the organization actually operates. There's a moment where the answer is clearly no, and recognising that moment early saves a lot of friction later.",
      },
      { type: "h2", text: "Signs that standard software has stopped fitting" },
      {
        type: "ul",
        items: [
          "Skilled people spend significant time on work the system should handle.",
          "The same data lives in five places, none of them the right one.",
          "Workarounds have become part of the official process.",
          "Decisions wait for numbers that arrive too late.",
          "New staff need weeks to learn a process that should take an afternoon.",
        ],
      },
      {
        type: "p",
        text: "Any one of these is a warning. Three or more is a signal that the gap between how the organization works and how the software assumes it works has become structural.",
      },
      { type: "h2", text: "What custom systems are — and aren't" },
      {
        type: "p",
        text: "A custom system is not a rebuild of everything. It's technology designed around a specific operational reality — the workflows, the roles, the data and the decisions that actually define the work. The goal isn't more software; it's less friction.",
      },
      {
        type: "p",
        text: "The right approach is almost always partial: keep the tools that work, replace the ones that don't, and build the connective tissue that turns them into one coherent system. A custom system built around a real process tends to do less than the standard product it replaces — but it does the right things, reliably.",
      },
      { type: "h2", text: "How to scope without overbuilding" },
      {
        type: "p",
        text: "The trap is building for every possible future requirement. The organisation ends up with a system that does everything poorly. The discipline is to understand the actual problem first, design for the work that happens today, and leave room to evolve — not to predict every edge case.",
      },
      {
        type: "quote",
        text: "Technology should make organizations more capable, not more complicated.",
      },
      {
        type: "p",
        text: "A practical test: if you can't explain what the system does in one sentence a non-technical decision-maker can repeat, it's probably been over-scoped. Clarity is the signal that the scope is right.",
      },
    ],
  },
  {
    slug: "where-ai-actually-improves-the-work",
    title: "Where AI actually improves the work",
    tag: "AI",
    summary:
      "A practical framework for deciding where intelligence belongs in a system — and where it only adds noise.",
    date: "2025-02-10",
    readingTime: "5 min",
    published: true,
    content: [
      {
        type: "p",
        text: "AI is the most over-applied technology of the moment. It gets added to systems because it can be, not because the work benefits from it. The result is software that's impressive in a demo and exhausting in daily use. The question worth asking is narrower: where does intelligence actually make the work better?",
      },
      { type: "h2", text: "Understand first. Add intelligence where it creates value." },
      {
        type: "p",
        text: "This is the principle. It implies a sequence: understand the business problem, identify where a person's time is genuinely consumed by something a model could do reasonably well, and only then introduce AI — at that point, in that place, for that work.",
      },
      { type: "h2", text: "Where AI tends to create real value" },
      {
        type: "ul",
        items: [
          "Document understanding — reading, extracting and structuring information from documents that arrive in volume.",
          "Intelligent search — finding answers across the organization's own information.",
          "Classification — sorting requests, records or content into the right place.",
          "Decision support — surfacing relevant context at the moment a decision is made.",
          "Forecasting — estimating demand, capacity or risk from operational data.",
        ],
      },
      {
        type: "p",
        text: "What these share is that they take information that exists but is hard to use, and make it usable. The intelligence sits between the raw information and the person who needs to act on it. That's the valuable place for AI — not at the front, performing for the user.",
      },
      { type: "h2", text: "Where AI tends to add noise" },
      {
        type: "ul",
        items: [
          "Processes that are already deterministic and should be automated, not 'intelligently' decided.",
          "Work where a person's judgment is the actual value being delivered.",
          "Decisions where the cost of being wrong is high and the confidence is uncertain.",
          "Features that exist because AI is fashionable, not because the work needs them.",
        ],
      },
      {
        type: "p",
        text: "If a step is predictable, automate it. If a step needs judgment, support the person making it. AI fits the gap in between — where the information is too much for a person to process quickly, but not so predictable that a simple rule would do.",
      },
      { type: "h2", text: "What no responsible partner should promise" },
      {
        type: "p",
        text: "AI accuracy, ROI, and feasibility all depend on the data, the process and the systems involved. A serious technology partner doesn't guarantee these before understanding the work. The honest answer is: AI can probably help in specific places, and we'll find out which by understanding the problem first.",
      },
      {
        type: "quote",
        text: "Technology should make organizations more capable, not more complicated. AI is no exception.",
      },
    ],
  },
  {
    slug: "the-cost-of-fragmented-information",
    title: "The cost of fragmented information",
    tag: "Efficiency",
    summary:
      "What disconnected tools actually cost an organization — beyond the obvious time lost.",
    date: "2025-03-05",
    readingTime: "4 min",
    published: true,
    content: [
      {
        type: "p",
        text: "When information is fragmented, the cost is rarely just the time spent moving it between systems. The deeper cost is that the organization stops being able to see itself clearly. Decisions get made on partial pictures. Work gets duplicated. Trust in the numbers erodes, and people start keeping their own versions — which makes the fragmentation worse.",
      },
      { type: "h2", text: "The visible cost" },
      {
        type: "ul",
        items: [
          "Hours of skilled people's time spent consolidating, reformatting and reconciling.",
          "Reports that arrive late because someone had to assemble them by hand.",
          "The same task performed across teams, slightly differently, with slightly different results.",
        ],
      },
      {
        type: "p",
        text: "These are the costs that show up in a timesheet. They're real, and they add up — but they're the smaller half of the problem.",
      },
      { type: "h2", text: "The hidden cost" },
      {
        type: "p",
        text: "The hidden cost is slower, less confident decisions. When the person responsible can't trust that the numbers are complete or current, they hedge. They wait. They ask for another report. They make the decision on instinct because the data isn't usable anyway. Over time, the organization learns to work around its own information rather than through it.",
      },
      {
        type: "p",
        text: "There's a second hidden cost too: dependency on individuals. When the only person who knows where the real data lives, how the spreadsheet is structured, or which version is correct is one person — the organization has a structural risk that doesn't appear on any balance sheet until that person is unavailable.",
      },
      { type: "h2", text: "What fixing it actually means" },
      {
        type: "p",
        text: "Consolidation isn't a single act — it's a design decision. The aim is one source of truth, with the right information visible to the right people at the right moment. That usually means a business system that holds the operational record, with reporting and analytics built on top of it rather than maintained alongside it.",
      },
      {
        type: "p",
        text: "The work is rarely 'migrate everything into one tool'. It's more often: identify the information that actually drives decisions, design the system around that, and let the rest settle into supporting roles. Fragmentation is rarely solved by adding another tool. It's solved by structure.",
      },
      {
        type: "quote",
        text: "From Complexity to Clarity.",
      },
      {
        type: "p",
        text: "When the information is structured, the organization can see itself. That visibility is what makes better decisions possible — not more data, but the same data, organised.",
      },
    ],
  },
];

/** Published insights, most recent first. */
export const PUBLISHED_INSIGHTS: Insight[] = INSIGHTS.filter(
  (i) => i.published,
).sort((a, b) => (a.date < b.date ? 1 : -1));

export function getInsight(slug: string): Insight | undefined {
  return INSIGHTS.find((i) => i.slug === slug);
}
