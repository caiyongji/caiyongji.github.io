import React from 'react';
import roadmapData from '../../content/roadmap.json';

type RoadmapItem = {
  title: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  date: string;
};

const Roadmap: React.FC = () => {
  const roadmapItems: RoadmapItem[] = roadmapData;

  return (
    <section className="py-12 w-full max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Roadmap</h2>
      <div className="space-y-4">
        {roadmapItems.map((item, index) => (
          <div key={index} className=" shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600">Status: {item.status}</p>
            <p className="text-gray-600">Date: {item.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Roadmap;