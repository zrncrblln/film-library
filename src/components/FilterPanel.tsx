import React, { useState, useEffect } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import type { Genre } from "../types";
import { getGenres } from "../services/movieApi";

interface FilterPanelProps {
  onFiltersChange: (filters: MovieFilters) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export interface MovieFilters {
  genre: string;
  year: string;
  minRating: string;
  sortBy: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  onFiltersChange,
  isOpen,
  onToggle,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<MovieFilters>({
    genre: "",
    year: "",
    minRating: "",
    sortBy: "popularity.desc",
  });

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const response = await getGenres();
        setGenres(response.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleFilterChange = (key: keyof MovieFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: MovieFilters = {
      genre: "",
      year: "",
      minRating: "",
      sortBy: "popularity.desc",
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = filters.genre || filters.year || filters.minRating;

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="filter-toggle-btn"
        aria-label="Open filters"
      >
        <FaFilter />
        {hasActiveFilters && <span className="filter-indicator"></span>}
      </button>
    );
  }

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <div className="filter-actions">
          {hasActiveFilters && (
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear All
            </button>
          )}
          <button onClick={onToggle} className="close-filters-btn">
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="filter-content">
        {/* Sort By */}
        <div className="filter-group">
          <label htmlFor="sortBy">Sort By:</label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          >
            <option value="popularity.desc">Most Popular</option>
            <option value="popularity.asc">Least Popular</option>
            <option value="vote_average.desc">Highest Rated</option>
            <option value="vote_average.asc">Lowest Rated</option>
            <option value="release_date.desc">Newest First</option>
            <option value="release_date.asc">Oldest First</option>
            <option value="title.asc">Title A-Z</option>
            <option value="title.desc">Title Z-A</option>
          </select>
        </div>

        {/* Genre Filter */}
        <div className="filter-group">
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            value={filters.genre}
            onChange={(e) => handleFilterChange("genre", e.target.value)}
            disabled={loading}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div className="filter-group">
          <label htmlFor="year">Release Year:</label>
          <input
            type="number"
            id="year"
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
            placeholder="e.g., 2023"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        {/* Minimum Rating Filter */}
        <div className="filter-group">
          <label htmlFor="minRating">Minimum Rating:</label>
          <select
            id="minRating"
            value={filters.minRating}
            onChange={(e) => handleFilterChange("minRating", e.target.value)}
          >
            <option value="">Any Rating</option>
            <option value="8">8+ Stars</option>
            <option value="7">7+ Stars</option>
            <option value="6">6+ Stars</option>
            <option value="5">5+ Stars</option>
            <option value="4">4+ Stars</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
