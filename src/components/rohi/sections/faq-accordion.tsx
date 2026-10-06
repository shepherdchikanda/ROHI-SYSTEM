"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ accordion — client wrapper around shadcn/Radix accordion.
 * Renders grouped Q&A items, grouped by a small monospace category label.
 *
 * Visual language matches ROHI primitives: monospace category numerals,
 * border-navy/10 cards, ink trigger / ink-soft content.
 */

export type FaqItem = {
  q: string;
  a: string;
};

export type FaqGroup = {
  category: string;
  items: FaqItem[];
};

export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      {groups.map((group, gi) => (
        <div key={group.category} className="flex flex-col gap-4">
          {/* Category label — monospace, architectural */}
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-teal">
              {String(gi + 1).padStart(2, "0")}
            </span>
            <span
              className="h-px w-6 bg-navy/15"
              aria-hidden="true"
            />
            <span className="font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
              {group.category}
            </span>
            <span
              className="font-mono-tech text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft/40"
              aria-hidden="true"
            >
              · {String(group.items.length).padStart(2, "0")} questions
            </span>
          </div>

          <Accordion
            type="single"
            collapsible
            className="flex flex-col divide-y divide-navy/10 overflow-hidden rounded-xl border border-navy/10"
          >
            {group.items.map((item, ii) => (
              <AccordionItem
                key={item.q}
                value={`g${gi}-q${ii}`}
                className="border-none last:border-b-0"
              >
                <AccordionTrigger className="px-5 py-5 text-[15px] font-medium leading-snug text-ink hover:no-underline sm:px-6 sm:text-[17px]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 text-[15px] leading-relaxed text-ink-soft sm:px-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
