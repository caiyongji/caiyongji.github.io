import DynamicTitle from './components/DynamicTitle';
import ProjectShowcase from './components/ProjectShowcase';
import Roadmap from './components/Roadmap';
import Timeline from './components/Timeline';

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
