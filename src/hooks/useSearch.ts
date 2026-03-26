import { useState, useMemo } from 'react';
import { Post } from '../types';

interface UseSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredPosts: Post[];
}

function useSearch(posts: Post[]): UseSearchReturn {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts;
    }

    const query = searchQuery.toLowerCase();
    return posts.filter(post => {
      const titleMatch = post.title?.toLowerCase().includes(query);
      const textMatch = post.text?.toLowerCase().includes(query);
      return titleMatch || textMatch;
    });
  }, [posts, searchQuery]);

  return { searchQuery, setSearchQuery, filteredPosts };
}

export default useSearch;
