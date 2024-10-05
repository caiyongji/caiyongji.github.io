import Link from 'next/link';
import { getBlogPosts } from '../../lib/getBlogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '../../components/CodeBlock';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

// 动态导入 TableOfContents 组件，禁用 SSR
const TableOfContents = dynamic(() => import('../../components/TableOfContents'), { ssr: false });

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
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb navigation */}
      <nav className="text-sm mb-6" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">Home</Link>
            <svg className="w-3 h-3 mx-3 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </li>
          <li className="flex items-center">
            <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">Blog</Link>
            <svg className="w-3 h-3 mx-3 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </li>
          <li className="text-gray-500 dark:text-gray-400" aria-current="page">{post.title}</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row">
        <article className="w-full lg:w-4/5 lg:pr-12">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">{post.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{post.date}</p>
          </header>
          <div className="prose prose-lg lg:prose-xl max-w-none dark:prose-invert">
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
                h1: ({ node, ...props }) => <h1 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-3xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100" {...props} />,
                h2: ({ node, ...props }) => <h2 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-4 mb-2 text-gray-800 dark:text-gray-100" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-lg font-medium mt-3 mb-2 text-gray-800 dark:text-gray-100" {...props} />,
                p: ({ node, ...props }) => <p className="text-gray-700 dark:text-gray-300" {...props} />,
                a: ({ node, ...props }) => <a className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-4" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-4" {...props} />,
                li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4 text-gray-600 dark:text-gray-400" {...props} />,
              }}
            />
          </div>

          {/* Previous and Next post navigation */}
          <nav className="mt-12 flex flex-col sm:flex-row justify-between border-t border-gray-200 dark:border-gray-700 pt-8">
            {prevPost && (
              <div className="mb-4 sm:mb-0">
                <span className="block text-sm text-gray-500 dark:text-gray-400 uppercase mb-1">Previous</span>
                <Link href={`/blog/${prevPost.slug}`} className="block font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                  {prevPost.title}
                </Link>
              </div>
            )}
            {nextPost && (
              <div className={`${!prevPost ? 'sm:ml-auto' : ''} text-left sm:text-right`}>
                <span className="block text-sm text-gray-500 dark:text-gray-400 uppercase mb-1">Next</span>
                <Link href={`/blog/${nextPost.slug}`} className="block font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                  {nextPost.title}
                </Link>
              </div>
            )}
          </nav>
        </article>
        <aside className="w-full lg:w-1/5 mt-8 lg:mt-0">
          <div className="sticky top-8">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
  );
}