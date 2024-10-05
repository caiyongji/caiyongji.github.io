'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function TableOfContents() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-xl font-semibold mb-4">On this page</h2>
      {/* 目录内容... */}
    </div>
  );
}