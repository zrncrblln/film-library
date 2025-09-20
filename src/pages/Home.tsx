import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import FilterPanel, { type MovieFilters } from "../components/FilterPanel";
import type { Movie } from "../types";
import { searchMovies, discoverMovies } from "../services/movieApi";

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get initial search query from URL params
  const initialSearchQuery = searchParams.get("search") || "";

  const fetchMovies = useCallback(
    async (
      searchQuery: string = "",
      filters: MovieFilters = {
        genre: "",
        year: "",
        minRating: "",
        sortBy: "popularity.desc",
      }
    ) => {
      try {
        setLoading(true);
        setError(null);

        let response;

        if (searchQuery) {
          response = await searchMovies(searchQuery);
        } else {
          // Use discover endpoint with filters
          const discoverParams: any = {
            sortBy: filters.sortBy,
          };

          if (filters.genre) discoverParams.genre = filters.genre;
          if (filters.year) discoverParams.year = parseInt(filters.year);
          if (filters.minRating)
            discoverParams.minRating = parseInt(filters.minRating);

          response = await discoverMovies(discoverParams);
        }

        setMovies(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("movieFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Initial load of popular movies
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Handle search
  const handleSearch = useCallback(
    (query: string) => {
      if (query) {
        setSearchParams({ search: query });
      } else {
        setSearchParams({});
      }
      fetchMovies(query);
    },
    [fetchMovies, setSearchParams]
  );

  // Handle filters
  const handleFiltersChange = useCallback(
    (filters: MovieFilters) => {
      fetchMovies(initialSearchQuery, filters);
    },
    [fetchMovies, initialSearchQuery]
  );

  // Handle favorite toggle
  const handleToggleFavorite = useCallback((movie: Movie) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(movie.id)
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id];

      localStorage.setItem("movieFavorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  return (
    <div className="home-page">
      <Header />

      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content">
              <h1>Discover Amazing Movies</h1>
              <p>Find your next favorite movie from our extensive collection</p>

              <div className="search-section">
                <SearchBar
                  onSearch={handleSearch}
                  initialValue={initialSearchQuery}
                  placeholder="Search for movies, actors, directors..."
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="filter-toggle-btn-main"
                >
                  Filters
                </button>
              </div>
            </div>
          </section>

          {/* Filters Panel */}
          {showFilters && (
            <section className="filters-section">
              <FilterPanel
                onFiltersChange={handleFiltersChange}
                isOpen={showFilters}
                onToggle={() => setShowFilters(false)}
              />
            </section>
          )}

          {/* Movies Section */}
          <section className="movies-section">
            <div className="section-header">
              <h2>
                {initialSearchQuery
                  ? `Search Results for "${initialSearchQuery}"`
                  : "Popular Movies"}
              </h2>
              <div className="results-count">
                {movies.length} {movies.length === 1 ? "movie" : "movies"} found
              </div>
            </div>

            <MovieList
              movies={movies}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              loading={loading}
              error={error}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
