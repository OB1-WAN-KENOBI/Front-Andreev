import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Post } from "../types";

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getPosts();
        setPosts(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Слушатель для восстановления соединения
    const handleOnline = () => {
      fetchPosts();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  return { posts, loading, error };
}

export default usePosts;
