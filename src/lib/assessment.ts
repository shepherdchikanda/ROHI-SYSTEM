export type Option = { label: string; score: number };
export type Question = { id: string; dimension: string; prompt: string; help?: string; options: Option[] };
export type Stage = { id: number; name: string; range: [number, number]; summary: string; description: string; opportunity: string; direction: string };

export const QUESTIONS: Question[] = [
  {
    id: "process", dimension: "Understand",
    prompt: "How is your core business process managed today?",
    options: [
      { label: "Mostly spreadsheets and manual work", score: 0 },
      { label: "Some software, but fragmented across tools", score: 1 },
      { label: "One central system, but it doesn't quite fit", score: 2 },
      { label: "A connected system built around how we work", score: 3 },
    ],
  },
  {
    id: "manual", dimension: "Automate",
    prompt: "How much of your team's time goes to repetitive, manual work?",
    options: [
      { label: "A lot — it's a constant frustration", score: 0 },
      { label: "Some, but we've accepted it as normal", score: 1 },
      { label: "A little — we've automated the obvious parts", score: 2 },
      { label: "Almost none — automation handles the routine", score: 3 },
    ],
  },
  {
    id: "data", dimension: "Data",
    prompt: "How connected are your tools and information?",
    options: [
      { label: "Not connected — information lives in silos", score: 0 },
      { label: "Loosely — manual sync, copy-paste", score: 1 },
      { label: "Partially — some integrations, some exports", score: 2 },
      { label: "Well — one source of truth across systems", score: 3 },
    ],
  },
  {
    id: "visibility", dimension: "Intelligence",
    prompt: "Can you see what's happening across the operation right now?",
    options: [
      { label: "No — we find out after the fact", score: 0 },
      { label: "Partially — some reports, often late", score: 1 },
      { label: "Mostly — dashboards exist but don't drive decisions", score: 2 },
      { label: "Yes — live visibility drives decisions", score: 3 },
    ],
  },
  {
    id: "ai", dimension: "Intelligence",
    prompt: "Where does AI fit in your work today?",
    help: "Using AI everywhere isn't the goal. Using it where it creates value is.",
    options: [
      { label: "It doesn't — we don't use it yet", score: 0 },
      { label: "We've tried tools, but nothing is integrated", score: 1 },
      { label: "We use it broadly, though not always strategically", score: 2 },
      { label: "In specific places, where it clearly helps", score: 3 },
    ],
  },
  {
    id: "dependency", dimension: "Systems",
    prompt: "If a key person left tomorrow, what happens to the process?",
    options: [
      { label: "It would break — knowledge is in their head", score: 0 },
      { label: "It would slow down — others know pieces", score: 1 },
      { label: "It would continue — things are documented", score: 2 },
      { label: "It would continue — the system holds the knowledge", score: 3 },
    ],
  },
  {
    id: "evolution", dimension: "Improve",
    prompt: "When something in the operation needs to change, how does it happen?",
    options: [
      { label: "Slowly — through individuals and workarounds", score: 0 },
      { label: "Through a defined process, but manual", score: 1 },
      { label: "Through the system — it's designed to adapt", score: 3 },
      { label: "We're not sure where to start", score: 0 },
    ],
  },
];

export const STAGES: Stage[] = [
  { id: 1, name: "Fragmented", range: [0, 6], summary: "Information is scattered. Work depends on people and manual effort. Decisions wait for numbers that arrive late.", description: "Your operation runs on spreadsheets, individual knowledge and manual handoffs. The friction is real — and it's probably costing you more than you think.", opportunity: "The biggest opportunity is structure: a business system that consolidates your information and turns the core process into one connected flow.", direction: "Business system + data consolidation" },
  { id: 2, name: "Structured", range: [7, 11], summary: "You have systems, but they don't fit well and don't talk to each other. Manual work fills the gaps.", description: "You've outgrown pure manual work — there are systems in place — but they're disconnected and force the organization to adapt to them.", opportunity: "The biggest opportunity is fit: custom systems and automation designed around your actual process, replacing the workarounds.", direction: "Custom systems + automation" },
  { id: 3, name: "Connected", range: [12, 15], summary: "Your tools are integrated and you have visibility. The foundation is there — now it can get intelligent.", description: "You've done the hard structural work. Information flows, the process lives in a system, and you can see what's happening.", opportunity: "The biggest opportunity is intelligence: AI and automation applied where they create real value — not everywhere, but precisely where the work benefits.", direction: "Intelligence + automation where it creates value" },
  { id: 4, name: "Intelligent", range: [16, 21], summary: "Your operation runs on a connected, visible system. AI and automation handle the routine. The system evolves with you.", description: "You're operating at a high level of maturity. The question is no longer 'can we see it' — it's 'what's next, and how do we keep improving.'", opportunity: "The biggest opportunity is evolution: new capabilities, deeper intelligence, and continuous improvement — without losing the clarity you've built.", direction: "Continuous improvement + new capabilities" },
];

export function getStage(score: number): Stage {
  return STAGES.find((s) => score >= s.range[0] && score <= s.range[1]) ?? STAGES[0];
}

export const MAX_SCORE = QUESTIONS.length * 3;
