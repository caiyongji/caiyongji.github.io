import React from 'react';
import Link from 'next/link';

type ProjectCardProps = {
  name: string;
  description: string;
  link: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, link }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link href={link} className="text-blue-500 hover:text-blue-600 font-medium">
          Learn more →
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;