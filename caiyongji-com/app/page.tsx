import DynamicTitle from './components/DynamicTitle';
import ProjectShowcase from './components/ProjectShowcase';
import Roadmap from './components/Roadmap';
import Timeline from './components/Timeline';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cai Yongji - All about AI, Self Improvement, Startup, Personal Growth",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start">
      <section className="h-screen w-full flex items-center justify-center">
        <DynamicTitle />
      </section>
      <section className="w-full">
        <ProjectShowcase />
        <Roadmap />
        <Timeline />
        {/* Other components */}
      </section>
    </main>
  );
}
