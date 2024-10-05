import Link from 'next/link';
import { getBlogPosts, BlogPost } from '../../../lib/getBlogPosts';

const POSTS_PER_PAGE = 8;
const MAX_VISIBLE_PAGES = 5;

export default function BlogPage({ params }: { params: { page: string } }) {
  const currentPage = parseInt(params.page) || 1;
  const posts = getBlogPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginatedPosts = posts.slice(
      (currentPage - 1) * POSTS_PER_PAGE,
      currentPage * POSTS_PER_PAGE
  );

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
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-gray-100">Blog Posts</h1>
        <ul className="space-y-8">
          {paginatedPosts.map((post: BlogPost) => (
              <li key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-500 mt-2 line-clamp-2">{post.description}</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{post.date}</p>
                </Link>
              </li>
          ))}
        </ul>
        <nav className="mt-12 flex justify-center" aria-label="Pagination">
          <ul className="inline-flex items-center -space-x-px">
            {currentPage > 1 && (
                <li>
                  <Link href={`/blog/page/${currentPage - 1}`} className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200">
                    <span className="sr-only">Previous</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  </Link>
                </li>
            )}
            {pageNumbers.map((number, index) => (
                <li key={index}>
                  {number === '...' ? (
                      <span className="px-3 py-2 leading-tight text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">...</span>
                  ) : (
                      <Link
                          href={`/blog/page/${number}`}
                          className={`px-3 py-2 leading-tight border ${
                              currentPage === number
                                  ? 'text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-500 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-700 dark:hover:text-blue-300'
                                  : 'text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                          }`}
                      >
                        {number}
                      </Link>
                  )}
                </li>
            ))}
            {currentPage < totalPages && (
                <li>
                  <Link href={`/blog/page/${currentPage + 1}`} className="block px-3 py-2 leading-tight text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-r-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200">
                    <span className="sr-only">Next</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  </Link>
                </li>
            )}
          </ul>
        </nav>
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