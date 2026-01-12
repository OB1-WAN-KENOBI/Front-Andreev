import { SearchIcon } from "../Icons/SearchIcon";
import "./SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

function SearchBar({ value, onChange, onClose }: SearchBarProps) {
  return (
    <div className="search-bar-overlay" onClick={onClose}>
      <div
        className="search-bar-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-bar-wrapper">
          <SearchIcon className="search-bar-icon" />
          <input
            type="text"
            className="search-bar-input"
            placeholder="Поиск по заголовкам и описаниям..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
          />
          <button
            className="search-bar-close"
            onClick={onClose}
            aria-label="Close search"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="15" y1="5" x2="5" y2="15" />
              <line x1="5" y1="5" x2="15" y2="15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
