import Link from 'next/link';
import { getBlogPosts, BlogPost } from '../lib/getBlogPosts';

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post: BlogPost) => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={`/blog/${post.slug}`} className="text-xl font-semibold hover:text-blue-600">
              {post.title}
            </Link>
            <p className="text-gray-600 mt-2">{post.description}</p>
            <p className="text-sm text-gray-500 mt-1">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}