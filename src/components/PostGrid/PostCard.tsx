import { Post } from '../../types';
import './PostCard.css';

interface PostCardProps {
  post: Post;
  onClick: (post: Post) => void;
}

function PostCard({ post, onClick }: PostCardProps) {
  return (
    <article 
      className="post-card" 
      onClick={() => onClick(post)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(post);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Открыть статью: ${post.title}`}
    >
      <div className="post-card-image-wrapper">
        <img
          src={post.img}
          srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
          alt={post.title}
          className="post-card-image"
          loading="lazy"
        />
      </div>
      <div className="post-card-content">
        <span className="post-card-tag">{post.tags}</span>
        <h2 className="post-card-title">{post.title}</h2>
        <div className="post-card-meta">
          <span className="post-card-author">{post.autor}</span>
          <span className="post-card-separator">•</span>
          <span className="post-card-date">{post.date}</span>
          <span className="post-card-separator">•</span>
          <span className="post-card-views">{post.views}</span>
        </div>
        <p className="post-card-excerpt">{post.text}</p>
      </div>
    </article>
  );
}

export default PostCard;
