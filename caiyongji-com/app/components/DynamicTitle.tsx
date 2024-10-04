'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import { XIcon, LinkedInIcon, MediumIcon, YouTubeIcon } from './SocialIcons'

const keywords = [
  { text: 'AI', color: '#007bff' },
  { text: 'Self Improvement', color: '#28a745' },
  { text: 'Startup', color: '#fd7e14' },
  { text: 'Personal Growth', color: '#ffc107' }
]

const DynamicTitle: React.FC = () => {
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeywordIndex((prevIndex) => (prevIndex + 1) % keywords.length);
    }, 3000); // Change keyword every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:flex-1 mb-8 lg:mb-0 lg:pr-8 flex flex-col justify-between h-full">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">Hi, I&apos;m Cai</h1>
            <p className="text-xl lg:text-2xl mb-6">I&apos;m an indie developer exploring AI-powered entrepreneurship.</p>
            <div className="text-lg lg:text-xl flex flex-col sm:flex-row items-start sm:items-center mb-6">
              <span className="mr-2 mb-2 sm:mb-0">I&apos;m taking a <strong>Build in Public</strong> approach, focusing on</span>
              <div className="h-[40px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={keywords[currentKeywordIndex].text}
                    initial={{ y: 40 }}
                    animate={{ y: 0 }}
                    exit={{ y: -40 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block font-semibold text-2xl lg:text-3xl whitespace-nowrap"
                    style={{ color: keywords[currentKeywordIndex].color }}
                  >
                    {keywords[currentKeywordIndex].text}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
          {/* 社交媒体链接部分 - 增加了上边距 */}
          <div className="mt-auto pt-16">
            <p className="text-lg mb-2">Find me on:</p>
            <div className="flex space-x-4">
              <SocialLink href="https://twitter.com/caiyongji" icon={<XIcon />} name="X (Twitter)" hoverColor="#1DA1F2" />
              <SocialLink href="https://www.linkedin.com/in/caiyongji/" icon={<LinkedInIcon />} name="LinkedIn" hoverColor="#0A66C2" />
              <SocialLink href="https://medium.com/@caiyongji" icon={<MediumIcon />} name="Medium" hoverColor="#00AB6C" />
              <SocialLink href="https://www.youtube.com/@caiyongji" icon={<YouTubeIcon />} name="YouTube" hoverColor="#FF0000" />
            </div>
          </div>
        </div>
        <div className="lg:flex-shrink-0">
          <Avatar className="w-40 h-40 lg:w-64 lg:h-64">
            <AvatarImage src="/avatars/avatar.png" alt="Cai" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default DynamicTitle;

// SocialLink 组件保持不变
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  name: string;
  hoverColor: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, name, hoverColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group">
      <Link 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="social-icon" style={{ color: isHovered ? hoverColor : 'currentColor' }}>
          {icon}
        </div>
      </Link>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {name}
      </div>
    </div>
  );
};