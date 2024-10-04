import { Post } from '@/types/post';

export async function getAllPosts(): Promise<Post[]> {
  // Implement the logic to fetch all posts
  // For now, we'll return an empty array
  return [];
}

export async function getPostBySlug(slug: string): Promise<Post> {
  // Implement the logic to fetch a single post by slug
  // For now, we'll return a dummy post
  return {
    slug,
    title: 'Dummy Post',
    description: 'This is a dummy post',
    category: 'Uncategorized',
    tags: ['dummy'],
    content: 'This is the content of the dummy post.',
    date: new Date().toISOString(),
  };
}