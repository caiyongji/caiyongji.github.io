import { getBlogPosts } from '../../lib/getBlogPosts';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const posts = getBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">{post.date}</p>
      <div className="prose lg:prose-xl">
        <MDXRemote source={post.content} />
      </div>
    </div>
  );
}