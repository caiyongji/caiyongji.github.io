import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getBlogPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.(md|mdx)$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...(data as { title: string; date: string; description: string }),
      content,
    };
  });

  return allPostsData.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
}