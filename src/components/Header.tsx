import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaHeart, FaHome } from "react-icons/fa";

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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to home page with search parameter
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
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
};

export default Header;
