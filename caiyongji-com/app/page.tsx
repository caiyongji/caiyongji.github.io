import DynamicTitle from './components/DynamicTitle';
import ProjectShowcase from './components/ProjectShowcase';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cai Yongji - All about AI, Self Improvement, Startup, Personal Growth",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <DynamicTitle />
      <ProjectShowcase />
      {/* Other components */}
    </main>
  );
}
