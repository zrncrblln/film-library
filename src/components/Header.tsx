import React, { useState, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { FaSun, FaMoon, FaHeart, FaHome } from "react-icons/fa";
import { SearchIcon, ClearIcon } from "./icons";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = React.memo(({ onSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        // Navigate to home page with search parameter
        navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
      }
    },
    [searchQuery, navigate]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);

      // Auto-search for immediate results (like the hero section)
      if (value.trim()) {
        if (onSearch) {
          onSearch(value.trim());
        }
      } else {
        if (onSearch) {
          onSearch("");
        }
      }
    },
    [onSearch]
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  }, [onSearch]);

  // Memoize theme toggle label
  const themeToggleLabel = useMemo(() => {
    return `Switch to ${theme === "light" ? "dark" : "light"} mode`;
  }, [theme]);

  return (
    <header className="movie-header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <h1>MoviesZC</h1>
          </Link>

          {/* Navigation */}
          <nav className="nav-links">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              <FaHome className="nav-icon" />
              <span>Home</span>
            </Link>
            <Link
              to="/favorites"
              className={`nav-link ${isActive("/favorites") ? "active" : ""}`}
            >
              <FaHeart className="nav-icon" />
              <span>Favorites</span>
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="header-actions">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-container">
                <SearchIcon className="search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search movies..."
                  className="search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="clear-search-btn"
                    aria-label="Clear search"
                  >
                    <ClearIcon />
                  </button>
                )}
              </div>
            </form>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={themeToggleLabel}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
