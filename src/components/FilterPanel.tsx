import React, { useState, useEffect } from "react";
import { FaFilter, FaTimes, FaCheck } from "react-icons/fa";
import type { Genre, MovieFilters } from "../types";
import { getGenres } from "../services/movieApi";
import { SORT_OPTIONS, RATING_FILTERS, SEARCH_PARAMS } from "../constants/api";

// Common languages in movies
const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "hi", name: "Hindi" },
  { code: "ru", name: "Russian" },
];

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
    genres: [],
    year: "",
    minRating: "",
    sortBy: "popularity.desc",
    language: "",
    runtime: {
      min: "",
      max: "",
    },
    includeAdult: false,
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

  const handleFilterChange = (
    key: keyof MovieFilters,
    value: string | string[] | boolean | { min: string; max: string }
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleGenreToggle = (genreId: string) => {
    const newGenres = filters.genres.includes(genreId)
      ? filters.genres.filter((id) => id !== genreId)
      : [...filters.genres, genreId];
    handleFilterChange("genres", newGenres);
  };

  const handleRuntimeChange = (type: "min" | "max", value: string) => {
    handleFilterChange("runtime", {
      ...filters.runtime,
      [type]: value,
    });
  };

  const clearFilters = () => {
    const clearedFilters: MovieFilters = {
      genres: [],
      year: "",
      minRating: "",
      sortBy: "popularity.desc",
      language: "",
      runtime: {
        min: "",
        max: "",
      },
      includeAdult: false,
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters =
    filters.genres.length > 0 ||
    filters.year ||
    filters.minRating ||
    filters.language ||
    filters.runtime.min ||
    filters.runtime.max ||
    filters.includeAdult;

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
        {/* Genre Multi-select */}
        <div className="filter-group filter-group-genres">
          <label>Genres:</label>
          <div
            className="genre-tags"
            role="group"
            aria-label="Select movie genres"
          >
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreToggle(genre.id.toString())}
                className={`genre-tag ${
                  filters.genres.includes(genre.id.toString()) ? "active" : ""
                }`}
                aria-pressed={filters.genres.includes(genre.id.toString())}
              >
                {genre.name}
                {filters.genres.includes(genre.id.toString()) && (
                  <FaCheck className="check-icon" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div className="filter-group">
          <label htmlFor="sortBy">Sort By:</label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="netflix-select"
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
        </div>

        {/* Language Filter */}
        <div className="filter-group">
          <label htmlFor="language">Language:</label>
          <select
            id="language"
            value={filters.language}
            onChange={(e) => handleFilterChange("language", e.target.value)}
            className="netflix-select"
          >
            <option value="">Any Language</option>
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Runtime Range */}
        <div className="filter-group filter-group-runtime">
          <label>Runtime (minutes):</label>
          <div className="runtime-inputs">
            <input
              type="number"
              value={filters.runtime.min}
              onChange={(e) => handleRuntimeChange("min", e.target.value)}
              placeholder="Min"
              min="0"
              max="400"
              className="netflix-input"
            />
            <span className="runtime-separator">to</span>
            <input
              type="number"
              value={filters.runtime.max}
              onChange={(e) => handleRuntimeChange("max", e.target.value)}
              placeholder="Max"
              min="0"
              max="400"
              className="netflix-input"
            />
          </div>
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
            className="netflix-input"
          />
        </div>

        {/* Rating Filter */}
        <div className="filter-group">
          <label htmlFor="minRating">Minimum Rating:</label>
          <select
            id="minRating"
            value={filters.minRating}
            onChange={(e) => handleFilterChange("minRating", e.target.value)}
            className="netflix-select"
          >
            <option value={RATING_FILTERS.ANY}>Any Rating</option>
            <option value={RATING_FILTERS.EXCELLENT}>8+ Stars</option>
            <option value={RATING_FILTERS.VERY_GOOD}>7+ Stars</option>
            <option value={RATING_FILTERS.GOOD}>6+ Stars</option>
            <option value={RATING_FILTERS.AVERAGE}>5+ Stars</option>
            <option value={RATING_FILTERS.BELOW_AVERAGE}>4+ Stars</option>
          </select>
        </div>

        {/* Include Adult Content */}
        <div className="filter-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.includeAdult}
              onChange={(e) =>
                handleFilterChange("includeAdult", e.target.checked)
              }
              className="netflix-checkbox"
            />
            <span>Include Adult Content</span>
          </label>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="active-filters">
            <h4>Active Filters:</h4>
            <div className="filter-tags">
              {filters.genres.map((genreId) => {
                const genre = genres.find((g) => g.id.toString() === genreId);
                return genre ? (
                  <span key={genreId} className="filter-tag">
                    {genre.name}
                    <button
                      onClick={() => handleGenreToggle(genreId)}
                      aria-label={`Remove ${genre.name} filter`}
                    >
                      <FaTimes />
                    </button>
                  </span>
                ) : null;
              })}
              {filters.year && (
                <span className="filter-tag">
                  Year: {filters.year}
                  <button
                    onClick={() => handleFilterChange("year", "")}
                    aria-label="Remove year filter"
                  >
                    <FaTimes />
                  </button>
                </span>
              )}
              {/* Add more active filter tags as needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
