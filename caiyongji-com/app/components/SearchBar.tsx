'use client'

import { useState, useEffect, useRef, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const removeMdxExtension = (slug: string) => {
  return slug.replace(/\.(mdx?|markdown)$/, '');
};

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const pathname = usePathname();
  const searchResultsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const posts = await response.json();
      setAllPosts(posts);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedIndex(-1);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        document.getElementById('searchInput')?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const search = () => {
      if (searchQuery.trim()) {
        const filteredPosts = allPosts.filter(post => 
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredPosts);
      } else {
        setSearchResults([]);
      }
    };

    search();
    setSelectedIndex(-1);
  }, [searchQuery, allPosts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getOS = () => {
    if (typeof window !== 'undefined') {
      return navigator.platform.toLowerCase().includes('mac') ? 'mac' : 'windows';
    }
    return 'windows';
  };

  const shortcutKey = getOS() === 'mac' ? '⌘K' : 'Ctrl+K';

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800">{part}</span> : part
    );
  };

  const getContentPreview = (content: string, query: string, maxLength: number = 200) => {
    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerContent.indexOf(lowerQuery);
    if (index === -1) return content.slice(0, maxLength);

    const start = Math.max(0, index - maxLength / 2);
    const end = Math.min(content.length, start + maxLength);
    let preview = content.slice(start, end);

    if (start > 0) preview = '...' + preview;
    if (end < content.length) preview = preview + '...';

    return preview;
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && selectedIndex !== -1) {
      e.preventDefault();
      const selectedPost = searchResults[selectedIndex];
      router.push(`/blog/${removeMdxExtension(selectedPost.slug)}`);
    }
  };

  useEffect(() => {
    if (searchResultsRef.current && selectedIndex !== -1) {
      const selectedElement = searchResultsRef.current.children[selectedIndex] as HTMLElement;
      selectedElement.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="relative w-full md:w-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          id="searchInput"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="py-1 px-3 pr-8 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48 text-sm"
        />
        {searchQuery ? (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 px-1 text-gray-400 hover:text-gray-600 rounded flex items-center justify-center"
          >
            <X size={14} />
          </button>
        ) : (
          <span
            className="absolute right-1 top-1/2 transform -translate-y-1/2 px-1 text-gray-400 rounded flex items-center justify-center text-xs"
            aria-hidden="true"
          >
            {shortcutKey}
          </span>
        )}
      </form>
      {searchResults.length > 0 && (
        <ul ref={searchResultsRef} className="absolute z-50 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg w-full md:w-64 mt-1 max-h-96 overflow-y-auto text-sm">
          {searchResults.map((post, index) => (
            <li 
              key={post.slug} 
              className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${index === selectedIndex ? 'bg-blue-100 dark:bg-blue-700' : ''}`}
            >
              <Link href={`/blog/${removeMdxExtension(post.slug)}`} className="block">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {highlightText(post.title, searchQuery)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {highlightText(getContentPreview(post.content, searchQuery), searchQuery)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}