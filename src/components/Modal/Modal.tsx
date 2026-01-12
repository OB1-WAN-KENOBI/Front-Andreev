import { useEffect } from "react";
import FocusTrap from "focus-trap-react";
import DOMPurify from "dompurify";
import { Post } from "../../types";
import "./Modal.css";

interface ModalProps {
  post: Post | null;
  onClose: () => void;
}

function Modal({ post, onClose }: ModalProps) {
  useEffect(() => {
    if (post) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [post]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (post) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [post, onClose]);

  if (!post) return null;

  const sanitizedTitle = DOMPurify.sanitize(post.title);
  const sanitizedText = DOMPurify.sanitize(post.text || '');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <FocusTrap>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="modal-content">
            <div className="modal-image-wrapper">
              <img
                src={post.img_2x || post.img}
                alt={sanitizedTitle}
                className="modal-image"
              />
            </div>

            <div className="modal-body">
              <span className="modal-tag">{post.tags}</span>
              <h2
                className="modal-title"
                dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
              />

              <div className="modal-meta">
                <span className="modal-author">{post.autor}</span>
                <span className="modal-separator">•</span>
                <span className="modal-date">{post.date}</span>
                <span className="modal-separator">•</span>
                <span className="modal-views">{post.views}</span>
              </div>

              <p
                className="modal-text"
                dangerouslySetInnerHTML={{ __html: sanitizedText }}
              />
            </div>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}

export default Modal;
