import { LogotypeIcon } from "../Icons/LogotypeIcon";
import { SearchIcon } from "../Icons/SearchIcon";
import "./Header.css";

interface HeaderProps {
  onSearchClick: () => void;
  onMenuClick: () => void;
}

function Header({ onSearchClick, onMenuClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <button
          className="mobile-menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <LogotypeIcon className="logo" />
        <button
          className="search-btn"
          onClick={onSearchClick}
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      </div>
    </header>
  );
}

export default Header;
