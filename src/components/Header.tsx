import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { FaSun, FaMoon, FaSearch, FaHeart, FaHome } from "react-icons/fa";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="movie-header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <h1>MovieDB</h1>
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
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search movies..."
                className="search-input"
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
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
