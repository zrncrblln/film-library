import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

// Types
import type { Movie, MovieFilters } from "../types";

// Services
import { searchMovies, discoverMovies } from "../services/movieApi";

// Components
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import FilterPanel from "../components/FilterPanel";
import MovieCard from "../components/MovieCard";

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Refs for movie sliders
  const popularSliderRef = useRef<HTMLDivElement>(null);
  const topRatedSliderRef = useRef<HTMLDivElement>(null);
  const upcomingSliderRef = useRef<HTMLDivElement>(null);

  // Get initial search query from URL params
  const initialSearchQuery = searchParams.get("search") || "";

  // Quick action handlers
  const handleBrowsePopular = () => {
    // Scroll to popular movies section
    popularSliderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMovies = async (
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
        const discoverParams: {
          sortBy?: string;
          genre?: string;
          year?: number;
          minRating?: number;
        } = {
          sortBy: filters.sortBy,
        };

        if (filters.genre) discoverParams.genre = filters.genre;
        if (filters.year) discoverParams.year = parseInt(filters.year);
        if (filters.minRating)
          discoverParams.minRating = parseInt(filters.minRating);

        response = await discoverMovies(discoverParams);
      }

      if (!response?.results) {
        throw new Error("No movies found");
      }

      setMovies(response.results);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : searchQuery
          ? "Failed to search movies. Please check your connection and try again."
          : "Failed to load movies. Please check your connection and try again.";

      setError(errorMessage);
      setMovies([]); // Clear movies on error
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieCategories = useCallback(async (retryCount = 0) => {
    try {
      setLoading(true);

      // Fetch different movie categories
      const [popularResponse, topRatedResponse, upcomingResponse] =
        await Promise.all([
          discoverMovies({ sortBy: "popularity.desc" }),
          discoverMovies({ sortBy: "vote_average.desc" }),
          discoverMovies({ sortBy: "release_date.desc" }),
        ]);

      if (
        !popularResponse?.results ||
        !topRatedResponse?.results ||
        !upcomingResponse?.results
      ) {
        throw new Error("Invalid response from movie API");
      }

      setPopularMovies(popularResponse.results.slice(0, 20));
      setTopRatedMovies(topRatedResponse.results.slice(0, 20));
      setUpcomingMovies(upcomingResponse.results.slice(0, 20));
      setError(null); // Clear any previous errors
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to load movie categories. Please check your connection.";

      // Retry up to 2 times for network errors
      if (
        retryCount < 2 &&
        (!errorMessage || !errorMessage.includes("Invalid response"))
      ) {
        setTimeout(
          () => fetchMovieCategories(retryCount + 1),
          1000 * (retryCount + 1)
        );
        return;
      }

      setError(errorMessage);
      // Set empty arrays as fallback
      setPopularMovies([]);
      setTopRatedMovies([]);
      setUpcomingMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("movieFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Initial load of movie categories
  useEffect(() => {
    fetchMovieCategories();
  }, [fetchMovieCategories]);

  // Handle search
  const handleSearch = (query: string) => {
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
    fetchMovies(query);
  };

  // Handle filters
  const handleFiltersChange = (filters: MovieFilters) => {
    fetchMovies(initialSearchQuery, filters);
  };

  // Handle favorite toggle
  const handleToggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(movie.id)
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id];

      localStorage.setItem("movieFavorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Handle movie row scrolling
  const scrollLeft = (sliderRef: React.RefObject<HTMLDivElement | null>) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8; // Scroll 80% of container width
      sliderRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (sliderRef: React.RefObject<HTMLDivElement | null>) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8; // Scroll 80% of container width
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="home-page">
      <Header onSearch={handleSearch} />

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1>Welcome to Moviez</h1>
              <p>
                Discover your next favorite movie from our extensive collection
              </p>
              <div className="hero-actions">
                <button
                  className="hero-btn hero-btn-primary"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Browse Movies
                </button>
                <button
                  className="hero-btn hero-btn-secondary"
                  onClick={handleBrowsePopular}
                >
                  Popular Movies
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Panel */}
        {showFilters && (
          <section className="filters-section">
            <div className="container">
              <FilterPanel
                onFiltersChange={handleFiltersChange}
                isOpen={showFilters}
                onToggle={() => setShowFilters(false)}
              />
            </div>
          </section>
        )}

        {/* Netflix-Style Movie Rows */}
        <div className="movie-rows">
          <div className="container">
            {/* Popular Movies Row */}
            <div className="movie-row" ref={popularSliderRef}>
              <div className="row-header">
                <h2 className="row-title">Popular</h2>
                <div className="row-navigation">
                  <button
                    className="row-nav-btn"
                    aria-label="Scroll left"
                    onClick={() => scrollLeft(popularSliderRef)}
                  >
                    &#8249;
                  </button>
                  <button
                    className="row-nav-btn"
                    aria-label="Scroll right"
                    onClick={() => scrollRight(popularSliderRef)}
                  >
                    &#8250;
                  </button>
                </div>
              </div>
              <div className="movie-row-container">
                <div className="movie-slider">
                  {popularMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      isFavorite={favorites.includes(movie.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Top Rated Movies Row */}
            <div className="movie-row" ref={topRatedSliderRef}>
              <div className="row-header">
                <h2 className="row-title">Top Rated</h2>
                <div className="row-navigation">
                  <button
                    className="row-nav-btn"
                    aria-label="Scroll left"
                    onClick={() => scrollLeft(topRatedSliderRef)}
                  >
                    &#8249;
                  </button>
                  <button
                    className="row-nav-btn"
                    aria-label="Scroll right"
                    onClick={() => scrollRight(topRatedSliderRef)}
                  >
                    &#8250;
                  </button>
                </div>
              </div>
              <div className="movie-row-container">
                <div className="movie-slider">
                  {topRatedMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      isFavorite={favorites.includes(movie.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Movies Row */}
            <div className="movie-row" ref={upcomingSliderRef}>
              <div className="row-header">
                <h2 className="row-title">Upcoming Releases</h2>
                <div className="row-navigation">
                  <button
                    className="row-nav-btn"
                    aria-label="Scroll left"
                    onClick={() => scrollLeft(upcomingSliderRef)}
                  >
                    &#8249;
                  </button>
                  <button
                    className="row-nav-btn"
                    aria-label="Scroll right"
                    onClick={() => scrollRight(upcomingSliderRef)}
                  >
                    &#8250;
                  </button>
                </div>
              </div>
              <div className="movie-row-container">
                <div className="movie-slider">
                  {upcomingMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      isFavorite={favorites.includes(movie.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Search Results Section */}
            {initialSearchQuery && (
              <section className="movies-section">
                <div className="section-header">
                  <h2>Search Results for "{initialSearchQuery}"</h2>
                  <div className="results-count">
                    {movies.length} {movies.length === 1 ? "result" : "results"}{" "}
                    found
                  </div>
                </div>

                <MovieList
                  movies={movies}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  loading={loading}
                  error={error}
                  onRetry={() => fetchMovies(initialSearchQuery)}
                />
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
