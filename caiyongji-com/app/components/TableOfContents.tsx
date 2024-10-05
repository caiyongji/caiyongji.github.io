'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC = () => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const { theme } = useTheme();

  useEffect(() => {
    const headings = document.querySelectorAll('h1, h2');
    const tocItems: TOCItem[] = Array.from(headings).map((heading) => ({
      id: heading.id || '',
      text: heading.textContent || '',
      level: parseInt(heading.tagName[1]),
    })).filter(item => item.id !== ''); // Filter out items with empty ids
    setToc(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -40% 0px' }
    );

    headings.forEach((heading) => {
      if (heading.id) { // Only observe headings with ids
        observer.observe(heading);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`sticky top-24 ml-4 p-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
      <h2 className="text-lg font-semibold mb-2">On this page</h2>
      <ul>
        {toc.map((item) => (
          <li
            key={item.id}
            className={`${
              item.level === 1 ? 'ml-0' : 'ml-4'
            } my-2 hover:underline`}
          >
            <a
              href={`#${item.id}`}
              className={`${
                activeId === item.id ? 'font-bold' : ''
              } transition-colors duration-200`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({
                    behavior: 'smooth',
                  });
                }
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;