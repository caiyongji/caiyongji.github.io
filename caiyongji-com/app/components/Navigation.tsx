'use client'

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

const Navigation = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-white dark:bg-[rgb(20,20,20)] text-gray-800 dark:text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-xl font-bold">
          Cai Yongji
        </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className={`md:flex md:items-center md:space-x-4 ${isMenuOpen ? 'flex' : 'hidden'} flex-col md:flex-row absolute md:static top-16 right-0 left-0 bg-white dark:bg-[rgb(20,20,20)] md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none w-full md:w-auto`}>
          <SearchBar />
          <Link href="/" className="block py-2 md:py-0 hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
          <Link href="/blog" className="block py-2 md:py-0 hover:text-gray-600 dark:hover:text-gray-300">Blog</Link>
          <Link href="/diary" className="block py-2 md:py-0 hover:text-gray-600 dark:hover:text-gray-300">Diary</Link>
          <Link href="/about" className="block py-2 md:py-0 hover:text-gray-600 dark:hover:text-gray-300">About</Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mt-2 md:mt-0"
            aria-label="Toggle theme"
          >
            {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;