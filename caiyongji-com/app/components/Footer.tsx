import React from 'react';
import Link from 'next/link';
import { XIcon, LinkedInIcon, MediumIcon, YouTubeIcon } from './SocialIcons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-6 bg-white dark:bg-[rgb(20,20,20)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex space-x-4 mb-4">
            <SocialLink href="https://twitter.com/caiyongji" icon={<XIcon />} alt="X (formerly Twitter)" />
            <SocialLink href="https://www.linkedin.com/in/caiyongji/" icon={<LinkedInIcon />} alt="LinkedIn" />
            <SocialLink href="https://medium.com/@caiyongji" icon={<MediumIcon />} alt="Medium" />
            <SocialLink href="https://www.youtube.com/@caiyongji" icon={<YouTubeIcon />} alt="YouTube" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} CAIYONGJI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  alt: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, alt }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
    {icon}
    <span className="sr-only">{alt}</span>
  </Link>
);

export default Footer;