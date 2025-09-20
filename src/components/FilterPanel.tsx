import React, { useState, useEffect } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import type { Genre, MovieFilters } from "../types";
import { getGenres } from "../services/movieApi";
import { SORT_OPTIONS, RATING_FILTERS, SEARCH_PARAMS } from "../constants/api";

interface FilterPanelProps {
  onFiltersChange: (filters: MovieFilters) => void;
  isOpen: boolean;
  onToggle: () => void;
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
        aria-expanded="false"
        aria-controls="filter-panel"
      >
        <FaFilter />
        {hasActiveFilters && (
          <span className="filter-indicator" aria-hidden="true"></span>
        )}
      </button>
    );
  }

  return (
    <div
      className="filter-panel"
      id="filter-panel"
      role="region"
      aria-labelledby="filter-heading"
    >
      <div className="filter-header">
        <h3 id="filter-heading">Filters</h3>
        <div className="filter-actions">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="clear-filters-btn"
              aria-describedby="clear-filters-desc"
            >
              Clear All
            </button>
          )}
          <button
            onClick={onToggle}
            className="close-filters-btn"
            aria-label="Close filters"
            aria-expanded="true"
            aria-controls="filter-panel"
          >
            <FaTimes aria-hidden="true" />
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
            aria-describedby="sortBy-desc"
          >
            <option value={SORT_OPTIONS.POPULARITY_DESC}>Most Popular</option>
            <option value={SORT_OPTIONS.POPULARITY_ASC}>Least Popular</option>
            <option value={SORT_OPTIONS.RATING_DESC}>Highest Rated</option>
            <option value={SORT_OPTIONS.RATING_ASC}>Lowest Rated</option>
            <option value={SORT_OPTIONS.RELEASE_DATE_DESC}>Newest First</option>
            <option value={SORT_OPTIONS.RELEASE_DATE_ASC}>Oldest First</option>
            <option value={SORT_OPTIONS.TITLE_ASC}>Title A-Z</option>
            <option value={SORT_OPTIONS.TITLE_DESC}>Title Z-A</option>
          </select>
          <span id="sortBy-desc" className="sr-only">
            Choose how to sort the movie results
          </span>
        </div>

        {/* Genre Filter */}
        <div className="filter-group">
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            value={filters.genre}
            onChange={(e) => handleFilterChange("genre", e.target.value)}
            disabled={loading}
            aria-describedby="genre-desc"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </option>
            ))}
          </select>
          <span id="genre-desc" className="sr-only">
            Filter movies by genre
          </span>
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
            min={SEARCH_PARAMS.MIN_YEAR}
            max={SEARCH_PARAMS.MAX_YEAR}
            aria-describedby="year-desc"
          />
          <span id="year-desc" className="sr-only">
            Filter movies by release year
          </span>
        </div>

        {/* Minimum Rating Filter */}
        <div className="filter-group">
          <label htmlFor="minRating">Minimum Rating:</label>
          <select
            id="minRating"
            value={filters.minRating}
            onChange={(e) => handleFilterChange("minRating", e.target.value)}
            aria-describedby="rating-desc"
          >
            <option value={RATING_FILTERS.ANY}>Any Rating</option>
            <option value={RATING_FILTERS.EXCELLENT}>8+ Stars</option>
            <option value={RATING_FILTERS.VERY_GOOD}>7+ Stars</option>
            <option value={RATING_FILTERS.GOOD}>6+ Stars</option>
            <option value={RATING_FILTERS.AVERAGE}>5+ Stars</option>
            <option value={RATING_FILTERS.BELOW_AVERAGE}>4+ Stars</option>
          </select>
          <span id="rating-desc" className="sr-only">
            Filter movies by minimum rating
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
