import './LoadingSkeleton.css';

function LoadingSkeleton() {
  return (
    <div className="loading-skeleton-container">
      <div className="skeleton-grid">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-image" />
            <div className="skeleton-content">
              <div className="skeleton-tag" />
              <div className="skeleton-title" />
              <div className="skeleton-title short" />
              <div className="skeleton-meta" />
              <div className="skeleton-text" />
              <div className="skeleton-text" />
              <div className="skeleton-text short" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingSkeleton;
