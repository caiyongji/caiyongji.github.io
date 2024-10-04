"use client";

import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

interface Project {
  name: string;
  description: string;
  link: string;
}

export default function ProjectShowcase() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch('/content/projects.json');
      const data = await response.json();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Project Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}