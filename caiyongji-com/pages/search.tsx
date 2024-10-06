import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getBlogPosts } from '../lib/getBlogPosts';
import Link from 'next/link';

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (q) {
        const posts = await getBlogPosts();
        const filteredPosts = posts.filter(post => 
          post.title.toLowerCase().includes(q.toLowerCase()) ||
          post.content.toLowerCase().includes(q.toLowerCase())
        );
        setSearchResults(filteredPosts);
      }
    };

    fetchSearchResults();
  }, [q]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Search Results for "{q}"</h1>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map(post => (
            <li key={post.slug} className="mb-4">
              <Link href={`/blog/${post.slug}`} className="text-xl font-semibold text-blue-600 hover:underline">
                {post.title}
              </Link>
              <p className="text-gray-600">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </Layout>
  );
};

export default SearchPage;