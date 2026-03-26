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
    // Флаг для отмены запросов при размонтировании
    let isCancelled = false;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getPosts();

        // Проверяем, что компонент еще смонтирован (после асинхронной операции)
        if (isCancelled) return;

        setPosts(data);
        setLoading(false);
      } catch (err) {
        if (isCancelled) return;

        const errorMessage =
          err instanceof Error ? err.message : "Неизвестная ошибка";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchPosts();

    // Слушатель для восстановления соединения
    const handleOnline = () => {
      if (!isCancelled) {
        fetchPosts();
      }
    };

    window.addEventListener("online", handleOnline);

    return () => {
      isCancelled = true;
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return { posts, loading, error };
}

export default usePosts;
