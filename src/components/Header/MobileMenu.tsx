import { useEffect, useState, type MouseEvent } from "react";
import { MenuItem } from "../../types";
import ArrowIcon from "../Icons/ArrowIcon";
import { LogotypeIcon } from "../Icons/LogotypeIcon";
import "./MobileMenu.css";

const menuItems: MenuItem[] = [
  {
    label: "Demos",
    submenu: [
      "Post Header",
      "Post Layout",
      "Share Buttons",
      "Gallery Post",
      "Video Post",
    ],
  },
  { label: "Post" },
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
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

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

  const handleMenuItemClick = (
    e: MouseEvent<HTMLAnchorElement>,
    item: MenuItem,
    index: number
  ) => {
    if (item.submenu) {
      e.preventDefault();
      setOpenSubmenu(openSubmenu === index ? null : index);
    } else {
      setOpenSubmenu(null);
      onClose();
    }
  };

  // Сброс подменю при закрытии меню
  const handleClose = () => {
    setOpenSubmenu(null);
    onClose();
  };

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
                <a
                  href="#"
                  className="mobile-menu-link"
                  onClick={(e) => handleMenuItemClick(e, item, index)}
                  aria-expanded={item.submenu ? openSubmenu === index : undefined}
                >
                  {item.label}
                  {item.label !== "Buy Now" && (
                    <ArrowIcon
                      className={`dropdown-arrow ${
                        openSubmenu === index ? "open" : ""
                      }`}
                    />
                  )}
                </a>
                {item.submenu && openSubmenu === index && (
                  <ul className="mobile-submenu">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex} className="mobile-submenu-item">
                        <a
                          href="#"
                          className="mobile-submenu-link"
                          onClick={handleClose}
                        >
                          {subItem}
                        </a>
                      </li>
                    ))}
                  </ul>
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
