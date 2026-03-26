import { useEffect, useState, useRef } from "react";
import { MenuItem } from "../../types";
import ArrowIcon from "../Icons/ArrowIcon";
import "./Navigation.css";

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

function Navigation() {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const lastScrollYRef = useRef<number>(0);

  useEffect(() => {
    // Измеряем реальную высоту header
    const measureHeader = () => {
      const header = document.querySelector(".header");
      if (header) {
        setHeaderHeight(header.clientHeight);
      }
    };

    measureHeader();

    // Пересчитываем при изменении размеров окна
    window.addEventListener("resize", measureHeader);
    return () => window.removeEventListener("resize", measureHeader);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      // Определяем, стал ли sticky
      if (currentScrollY > headerHeight) {
        setIsSticky(true);

        // Логика скрытия после 200px
        if (
          currentScrollY > lastScrollY &&
          currentScrollY > headerHeight + 200
        ) {
          // Скроллим вниз и прошли порог 200px
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY) {
          // Скроллим вверх
          setIsHidden(false);
        }
      } else {
        setIsSticky(false);
        setIsHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHeight]);

  return (
    <nav
      className={`navigation ${isSticky ? "sticky" : ""} ${
        isHidden ? "hidden" : ""
      }`}
    >
      <div className="navigation-container">
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <a href="#" className="menu-link">
                {item.label}
                {item.label !== "Buy Now" && (
                  <ArrowIcon className="dropdown-arrow" />
                )}
              </a>
              {item.submenu && (
                <ul className="submenu">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex} className="submenu-item">
                      <a href="#" className="submenu-link">
                        {subItem}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
