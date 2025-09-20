import React, { useState, useCallback, useMemo } from "react";
import { SearchIcon, ClearIcon } from "./icons";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({
    onSearch,
    placeholder = "Search movies...",
    initialValue = "",
    disabled = false,
  }) => {
    const [query, setQuery] = useState(initialValue);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
          onSearch(query.trim());
        }
      },
      [query, onSearch]
    );

    const handleClear = useCallback(() => {
      setQuery("");
      onSearch("");
    }, [onSearch]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Auto-search for immediate results
        if (value.trim()) {
          onSearch(value.trim());
        } else {
          onSearch("");
        }
      },
      [onSearch]
    );

    // Memoize the clear button visibility
    const showClearButton = useMemo(() => {
      return query.length > 0;
    }, [query]);

    return (
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            className="search-input"
            aria-label="Search movies"
          />
          {showClearButton && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-search-btn"
              aria-label="Clear search"
            >
              <ClearIcon />
            </button>
          )}
        </div>
      </form>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
