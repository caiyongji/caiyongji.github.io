import Link from 'next/link';

interface ProjectCardProps {
  name: string;
  description: string;
  link: string;
}

export default function ProjectCard({ name, description, link }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <Link href={link} className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
        Learn more &rarr;
      </Link>
    </div>
  );
}