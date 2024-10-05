import Link from 'next/link';
import { getBlogPosts, BlogPost } from '../../../lib/getBlogPosts';

const POSTS_PER_PAGE = 5;
const MAX_VISIBLE_PAGES = 5;

export default function BlogPage({ params }: { params: { page: string } }) {
  const currentPage = parseInt(params.page) || 1;
  const posts = getBlogPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // 生成显示的页码数组
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <ul className="space-y-4">
        {paginatedPosts.map((post: BlogPost) => (
          <li key={post.slug} className=" pb-4">
            <Link href={`/blog/${post.slug}`} className="text-2xl font-semibold hover:text-blue-600">
              {post.title}
            </Link>
            <p className="text-gray-400 mt-2">{post.description}</p>
            <p className="text-sm text-gray-500 mt-1">{post.date}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center space-x-2">
        {currentPage > 1 && (
          <Link href={`/blog/page/${currentPage - 1}`} className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
            &lt;
          </Link>
        )}
        {pageNumbers.map((number, index) => (
          number === '...' ? (
            <span key={index} className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <Link
              key={index}
              href={`/blog/page/${number}`}
              className={`px-3 py-2 rounded transition-colors ${
                currentPage === number
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {number}
            </Link>
          )
        ))}
        {currentPage < totalPages && (
          <Link href={`/blog/page/${currentPage + 1}`} className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
            &gt;
          </Link>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}