import React from 'react';
import Timeline from '../components/Timeline';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      <p className="mb-4">
        Hi, I&apos;m Cai. I&apos;m an indie developer passionate about AI-powered entrepreneurship.
      </p>
      <p className="mb-4">
        My journey began with a fascination for AI tools and their potential to revolutionize how we work and create. This led me to explore various AI technologies and eventually develop my own prototypes.
      </p>
      <p className="mb-4">
        Today, I&apos;m focused on building AI-powered tools that can help entrepreneurs and creators boost their productivity and achieve their goals.
      </p>
      <p className="mb-8">
        Through this website, I aim to share my experiences, insights, and the lessons I&apos;ve learned along the way. Join me on this exciting journey of AI-powered entrepreneurship!
      </p>
      
      <Timeline />
    </div>
  );
};

export default AboutPage;