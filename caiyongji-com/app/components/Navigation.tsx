'use client'

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const Navigation = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="w-full bg-white dark:bg-[rgb(20,20,20)] text-gray-800 dark:text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Cai Yongji
        </Link>
        <ul className="flex space-x-4 items-center">
          <li><Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link></li>
          <li><Link href="/blog" className="hover:text-gray-600 dark:hover:text-gray-300">Blog</Link></li>
          <li><Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300">About</Link></li>
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;