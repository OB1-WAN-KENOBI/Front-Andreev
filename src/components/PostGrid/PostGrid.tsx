import { Post } from '../../types';
import PostCard from "./PostCard";
import "./PostGrid.css";

interface PostGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

function PostGrid({ posts, onPostClick }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="post-grid-empty">
        <p>Посты не найдены</p>
      </div>
    );
  }

  return (
    <div className="post-grid">
      {posts.map((post, index) => (
        <PostCard key={post.id || index} post={post} onClick={onPostClick} />
      ))}
    </div>
  );
}

export default PostGrid;
