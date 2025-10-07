import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaHome, FaSearch } from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";

// Context
import { useTheme } from "../hooks/useTheme";

// Components
import { SearchIcon, ClearIcon } from "./icons";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to home page with search parameter
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
      if (onSearch) {
        onSearch("");
      }
    }
  };

  const themeToggleLabel = `Switch to ${
    theme === "light" ? "dark" : "light"
  } mode`;

  return (
    <header className="movie-header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo" style={{ textDecoration: "none" }}>
            <h1>Moviez</h1>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="nav-links desktop-nav">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              <FaHome className="nav-icon" />
              <span className="nav-text">Home</span>
            </Link>
            <Link
              to="/favorites"
              className={`nav-link ${isActive("/favorites") ? "active" : ""}`}
            >
              <FaHeart className="nav-icon" />
              <span className="nav-text">Favorites</span>
            </Link>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Search - Desktop */}
            <form
              onSubmit={handleSearchSubmit}
              className="search-form desktop-search"
            >
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

            {/* Search Toggle - Mobile */}
            <button
              onClick={toggleSearch}
              className="search-toggle-btn mobile-only"
              aria-label="Toggle search"
            >
              <FaSearch />
            </button>

            {/* Theme Toggle - Redesigned */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label={themeToggleLabel}
              title={themeToggleLabel}
            >
              <div className="theme-toggle-track">
                <div className={`theme-toggle-thumb ${theme}`}>
                  {theme === "light" ? (
                    <MdLightMode className="theme-icon" />
                  ) : (
                    <MdDarkMode className="theme-icon" />
                  )}
                </div>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="nav-links mobile-nav">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              <FaHome className="nav-icon" />
              <span className="nav-text">Home</span>
            </Link>
            <Link
              to="/favorites"
              className={`nav-link ${isActive("/favorites") ? "active" : ""}`}
            >
              <FaHeart className="nav-icon" />
              <span className="nav-text">Favorites</span>
            </Link>
          </nav>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="mobile-search-container">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-container">
                <SearchIcon className="search-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search movies..."
                  className="search-input"
                  autoFocus
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
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
