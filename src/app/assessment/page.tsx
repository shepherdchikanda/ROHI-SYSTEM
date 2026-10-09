import type { Metadata } from "next";
import { AssessmentQuiz } from "@/components/rohi/assessment/assessment-quiz";

export const metadata: Metadata = {
  title: "Operations Maturity Assessment",
  description: "A 90-second self-assessment: how ready is your organization for intelligent systems? Seven honest questions, instant result, no signup required.",
  alternates: { canonical: "/assessment" },
};

export default function AssessmentPage() {
  return <AssessmentQuiz />;
}
