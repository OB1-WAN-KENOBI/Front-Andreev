import { useEffect } from "react";
import { MenuItem } from "../../types";
import ArrowIcon from "../Icons/ArrowIcon";
import { LogotypeIcon } from "../Icons/LogotypeIcon";
import "./MobileMenu.css";

const menuItems: MenuItem[] = [
  {
    label: "Demos",
  },
  {
    label: "Post",
    submenu: [
      "Post Header",
      "Post Layout",
      "Share Buttons",
      "Gallery Post",
      "Video Post",
    ],
  },
  { label: "Features" },
  { label: "Categories" },
  { label: "Shop" },
  { label: "Buy Now" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => onClose();

  return (
    <>
      <div
        className={`mobile-menu-overlay ${isOpen ? "open" : ""}`}
        onClick={handleClose}
      />
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <LogotypeIcon className="mobile-menu-logo" />
          <button
            className="mobile-menu-close"
            onClick={handleClose}
            aria-label="Close menu"
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
        </div>
        <nav className="mobile-menu-nav">
          <ul className="mobile-menu-list">
            {menuItems.map((item, index) => (
              <li key={index} className="mobile-menu-item">
                {item.submenu ? (
                  <>
                    <button
                      type="button"
                      className="mobile-menu-link mobile-menu-link--toggle"
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ArrowIcon className="dropdown-arrow" />
                    </button>

                    <ul className="mobile-submenu">
                      {item.submenu.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="mobile-submenu-item"
                        >
                          <a
                            href="#"
                            className="mobile-submenu-link"
                            onClick={(e) => {
                              e.preventDefault();
                              handleClose();
                            }}
                          >
                            {subItem}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a
                    href="#"
                    className="mobile-menu-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default MobileMenu;
