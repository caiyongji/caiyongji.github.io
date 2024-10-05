import React from 'react';
import timelineData from '../../content/timeline.json';
import { Rocket, Wrench, Building2 } from 'lucide-react';

type TimelineItem = {
  date: string;
  description: string;
  icon: 'Rocket' | 'Wrench' | 'Building2';
};

const iconComponents = {
  Rocket,
  Wrench,
  Building2,
};

const Timeline: React.FC = () => {
  const timelineItems: TimelineItem[] = timelineData.map(item => ({
    ...item,
    icon: item.icon as 'Rocket' | 'Wrench' | 'Building2'
  }));

  return (
    <section className="py-12 w-full max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Journey</h2>
      <div className="relative border-l-2 border-gray-200 ml-3">
        {timelineItems.map((item, index) => {
          const IconComponent = iconComponents[item.icon];
          return (
            <div key={index} className="mb-8 flex">
              <div className="absolute w-6 h-6 bg-blue-500 rounded-full mt-1.5 -left-3 border-4 border-white" />
              <div className="ml-6">
                <span className="flex items-center mb-1">
                  <span className="text-lg font-semibold mr-2">{item.date}</span>
                  <IconComponent className="w-6 h-6 text-blue-500" />
                </span>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Timeline;