import Link from 'next/link';
import { getBlogPosts } from '../../lib/getBlogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '../../components/CodeBlock';
import TableOfContents from '../../components/TableOfContents';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const posts = getBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  return {
    title: post?.title,
    description: post?.description,
  };
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const posts = getBlogPosts();
  const currentIndex = posts.findIndex((p) => p.slug === params.slug);
  const post = posts[currentIndex];
  const prevPost = posts[currentIndex + 1] || null;
  const nextPost = posts[currentIndex - 1] || null;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <nav className="text-sm mb-4">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/" className="text-blue-500 hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link href="/blog" className="text-blue-500 hover:text-blue-600">Blog</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-500">{post.title}</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 pr-0 md:pr-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-6">{post.date}</p>
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
            <ReactMarkdown
              children={post.content}
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <CodeBlock 
                      language={match[1]} 
                      value={String(children).replace(/\n$/, '')} 
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                h1: ({ node, ...props }) => <h1 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-3xl font-bold mt-8 mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-2xl font-semibold mt-6 mb-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-4 mb-2" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-lg font-medium mt-3 mb-2" {...props} />,
              }}
            />
          </div>

          {/* Previous and Next post navigation */}
          <div className="mt-8 flex justify-between">
            {prevPost && (
              <div>
                <span className="block text-sm text-gray-500 uppercase">Previous</span>
                <Link href={`/blog/${prevPost.slug}`} className="block font-semibold text-blue-500 hover:text-blue-600">
                  {prevPost.title}
                </Link>
              </div>
            )}
            {nextPost && (
              <div className={`${!prevPost ? 'ml-auto' : ''} text-right`}>
                <span className="block text-sm text-gray-500 uppercase">Next</span>
                <Link href={`/blog/${nextPost.slug}`} className="block font-semibold text-blue-500 hover:text-blue-600">
                  {nextPost.title}
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/4 mt-8 md:mt-0">
          <TableOfContents />
        </div>
      </div>
    </div>
  );
}