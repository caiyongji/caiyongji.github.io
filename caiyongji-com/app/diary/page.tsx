import DiaryPageContent from './DiaryPageContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cai Yongji - Cai's Build in Public Journal",
  description:
    "Follow Cai's journey in AI-powered entrepreneurship through his personal journal. Discover insights on AI, self-improvement, startups, and personal growth.",
};

export default function DiaryPage() {
  return <DiaryPageContent />;
}
