import React from 'react';
import ProjectCard from './ProjectCard';
import projectsData from '../../content/projects.json';

// This type definition should match the structure in your JSON file
type Project = {
  name: string;
  description: string;
  link: string;
};

const ProjectShowcase: React.FC = () => {
  const projects: Project[] = projectsData;

  return (
    <section className="py-12 w-full max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;