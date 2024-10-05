import DynamicTitle from './components/DynamicTitle';
import ProjectShowcase from './components/ProjectShowcase';
import Roadmap from './components/Roadmap';
import Timeline from './components/Timeline';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cai Yongji - All about AI, Self Improvement, Startup, and Personal Growth.",
  description: "Hi, I'm Cai, an indie developer exploring AI-powered entrepreneurship. I'm taking a Build in Public approach, focusing on AI, Self Improvement, Startup, and Personal Growth.",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start">
      <section className="w-full">
        <DynamicTitle />
      </section>
      <section className="w-full">
        <ProjectShowcase />
        {/* <Roadmap /> */}
        <Timeline />
        {/* Other components */}
      </section>
    </main>
  );
}
