import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { FaPlay, FaInfoCircle, FaStar } from "react-icons/fa";

// Types
import type { Movie, MovieFilters } from "../types";

// Services
import {
  searchMovies,
  discoverMovies,
  getImageUrl,
} from "../services/movieApi";
import { IMAGE_SIZES } from "../constants/api";

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
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Refs for movie sliders
  const trendingSliderRef = useRef<HTMLDivElement>(null);
  const popularSliderRef = useRef<HTMLDivElement>(null);
  const topRatedSliderRef = useRef<HTMLDivElement>(null);
  const upcomingSliderRef = useRef<HTMLDivElement>(null);
  const actionSliderRef = useRef<HTMLDivElement>(null);
  const dramaSliderRef = useRef<HTMLDivElement>(null);
  const comedySliderRef = useRef<HTMLDivElement>(null);

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
      const [
        trendingResponse,
        popularResponse,
        topRatedResponse,
        upcomingResponse,
        actionResponse,
        dramaResponse,
        comedyResponse,
      ] = await Promise.all([
        discoverMovies({ sortBy: "popularity.desc" }),
        discoverMovies({ sortBy: "popularity.desc" }),
        discoverMovies({ sortBy: "vote_average.desc" }),
        discoverMovies({ sortBy: "release_date.desc" }),
        discoverMovies({ sortBy: "popularity.desc", genre: "28" }), // Action
        discoverMovies({ sortBy: "popularity.desc", genre: "18" }), // Drama
        discoverMovies({ sortBy: "popularity.desc", genre: "35" }), // Comedy
      ]);

      if (
        !trendingResponse?.results ||
        !popularResponse?.results ||
        !topRatedResponse?.results ||
        !upcomingResponse?.results ||
        !actionResponse?.results ||
        !dramaResponse?.results ||
        !comedyResponse?.results
      ) {
        throw new Error("Invalid response from movie API");
      }

      const trending = trendingResponse.results.slice(0, 20);
      setTrendingMovies(trending);
      setPopularMovies(popularResponse.results.slice(0, 20));
      setTopRatedMovies(topRatedResponse.results.slice(0, 20));
      setUpcomingMovies(upcomingResponse.results.slice(0, 20));
      setActionMovies(actionResponse.results.slice(0, 20));
      setDramaMovies(dramaResponse.results.slice(0, 20));
      setComedyMovies(comedyResponse.results.slice(0, 20));

      // Set featured movie (first trending movie with backdrop)
      const movieWithBackdrop = trending.find((m) => m.backdrop_path);
      if (movieWithBackdrop) {
        setFeaturedMovie(movieWithBackdrop);
      }

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
      setTrendingMovies([]);
      setPopularMovies([]);
      setTopRatedMovies([]);
      setUpcomingMovies([]);
      setActionMovies([]);
      setDramaMovies([]);
      setComedyMovies([]);
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
      fetchMovies(query);
    } else {
      setSearchParams({});
      fetchMovies("");
    }
  };

  // Watch for URL parameter changes and trigger search
  useEffect(() => {
    if (initialSearchQuery) {
      fetchMovies(initialSearchQuery);
    }
  }, [initialSearchQuery]);

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

  // Handle movie row scrolling with improved logic
  const scrollLeft = (sliderRef: React.RefObject<HTMLDivElement | null>) => {
    if (sliderRef.current) {
      const slider = sliderRef.current.querySelector(
        ".movie-slider"
      ) as HTMLDivElement;
      if (slider) {
        const scrollAmount = slider.clientWidth * 0.8;
        slider.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollRight = (sliderRef: React.RefObject<HTMLDivElement | null>) => {
    if (sliderRef.current) {
      const slider = sliderRef.current.querySelector(
        ".movie-slider"
      ) as HTMLDivElement;
      if (slider) {
        const scrollAmount = slider.clientWidth * 0.8;
        slider.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  // Check if scrolling is possible
  const canScrollLeft = (sliderRef: React.RefObject<HTMLDivElement | null>) => {
    if (sliderRef.current) {
      const slider = sliderRef.current.querySelector(
        ".movie-slider"
      ) as HTMLDivElement;
      return slider ? slider.scrollLeft > 0 : false;
    }
    return false;
  };

  const canScrollRight = (
    sliderRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (sliderRef.current) {
      const slider = sliderRef.current.querySelector(
        ".movie-slider"
      ) as HTMLDivElement;
      return slider
        ? slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 1
        : false;
    }
    return false;
  };

  return (
    <div className="home-page">
      <Header onSearch={handleSearch} />

      <main className="main-content">
        {/* Enhanced Netflix-Style Hero Section */}
        <section className="hero-section">
          {featuredMovie && featuredMovie.backdrop_path && (
            <img
              src={getImageUrl(
                featuredMovie.backdrop_path,
                IMAGE_SIZES.BACKDROP.LARGE
              )}
              alt={featuredMovie.title}
              className="hero-backdrop"
            />
          )}
          <div className="container">
            <div className="hero-content">
              {featuredMovie ? (
                <>
                  <h1>{featuredMovie.title}</h1>
                  <div className="hero-rating">
                    <div className="rating-badge">
                      <FaStar />
                      <span>{featuredMovie.vote_average.toFixed(1)}</span>
                    </div>
                    <span className="year">
                      {new Date(featuredMovie.release_date).getFullYear()}
                    </span>
                  </div>
                  <p>
                    {featuredMovie.overview.length > 200
                      ? featuredMovie.overview.substring(0, 200) + "..."
                      : featuredMovie.overview}
                  </p>
                  <div className="hero-actions">
                    <button
                      className="hero-btn hero-btn-primary"
                      onClick={() =>
                        (window.location.href = `/movie/${featuredMovie.id}`)
                      }
                    >
                      <FaPlay className="hero-btn-icon" />
                      Play
                    </button>
                    <button
                      className="hero-btn hero-btn-secondary"
                      onClick={() =>
                        (window.location.href = `/movie/${featuredMovie.id}`)
                      }
                    >
                      <FaInfoCircle className="hero-btn-icon" />
                      More Info
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1>Welcome to Moviez</h1>
                  <p>
                    Discover your next favorite movie from our extensive
                    collection
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
                </>
              )}
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
            {/* Trending Now Row */}
            {trendingMovies.length > 0 && (
              <div className="movie-row" ref={trendingSliderRef}>
                <div className="row-header">
                  <h2 className="row-title">Trending Now</h2>
                  <div className="row-navigation">
                    <button
                      className="row-nav-btn"
                      aria-label="Scroll left"
                      onClick={() => scrollLeft(trendingSliderRef)}
                      disabled={!canScrollLeft(trendingSliderRef)}
                    >
                      &#8249;
                    </button>
                    <button
                      className="row-nav-btn"
                      aria-label="Scroll right"
                      onClick={() => scrollRight(trendingSliderRef)}
                      disabled={!canScrollRight(trendingSliderRef)}
                    >
                      &#8250;
                    </button>
                  </div>
                </div>
                <div className="movie-row-container">
                  <div className="movie-slider">
                    {trendingMovies.map((movie) => (
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
            )}

            {/* Popular Movies Row */}
            <div className="movie-row" ref={popularSliderRef}>
              <div className="row-header">
                <h2 className="row-title">Popular</h2>
                <div className="row-navigation">
                  <button
                    className="row-nav-btn"
                    aria-label="Scroll left"
                    onClick={() => scrollLeft(popularSliderRef)}
                    disabled={!canScrollLeft(popularSliderRef)}
                  >
                    &#8249;
                  </button>
                  <button
                    className="row-nav-btn"
                    aria-label="Scroll right"
                    onClick={() => scrollRight(popularSliderRef)}
                    disabled={!canScrollRight(popularSliderRef)}
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
                    disabled={!canScrollLeft(topRatedSliderRef)}
                  >
                    &#8249;
                  </button>
                  <button
                    className="row-nav-btn"
                    aria-label="Scroll right"
                    onClick={() => scrollRight(topRatedSliderRef)}
                    disabled={!canScrollRight(topRatedSliderRef)}
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
                    disabled={!canScrollLeft(upcomingSliderRef)}
                  >
                    &#8249;
                  </button>
                  <button
                    className="row-nav-btn"
                    aria-label="Scroll right"
                    onClick={() => scrollRight(upcomingSliderRef)}
                    disabled={!canScrollRight(upcomingSliderRef)}
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

            {/* Action Movies Row */}
            {actionMovies.length > 0 && (
              <div className="movie-row" ref={actionSliderRef}>
                <div className="row-header">
                  <h2 className="row-title">Action & Adventure</h2>
                  <div className="row-navigation">
                    <button
                      className="row-nav-btn"
                      aria-label="Scroll left"
                      onClick={() => scrollLeft(actionSliderRef)}
                      disabled={!canScrollLeft(actionSliderRef)}
                    >
                      &#8249;
                    </button>
                    <button
                      className="row-nav-btn"
                      aria-label="Scroll right"
                      onClick={() => scrollRight(actionSliderRef)}
                      disabled={!canScrollRight(actionSliderRef)}
                    >
                      &#8250;
                    </button>
                  </div>
                </div>
                <div className="movie-row-container">
                  <div className="movie-slider">
                    {actionMovies.map((movie) => (
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
            )}

            {/* Drama Movies Row */}
            {dramaMovies.length > 0 && (
              <div className="movie-row" ref={dramaSliderRef}>
                <div className="row-header">
                  <h2 className="row-title">Drama</h2>
                  <div className="row-navigation">
                    <button
                      className="row-nav-btn"
                      aria-label="Scroll left"
                      onClick={() => scrollLeft(dramaSliderRef)}
                      disabled={!canScrollLeft(dramaSliderRef)}
                    >
                      &#8249;
                    </button>
                    <button
                      className="row-nav-btn"
                      aria-label="Scroll right"
                      onClick={() => scrollRight(dramaSliderRef)}
                      disabled={!canScrollRight(dramaSliderRef)}
                    >
                      &#8250;
                    </button>
                  </div>
                </div>
                <div className="movie-row-container">
                  <div className="movie-slider">
                    {dramaMovies.map((movie) => (
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
            )}

            {/* Comedy Movies Row */}
            {comedyMovies.length > 0 && (
              <div className="movie-row" ref={comedySliderRef}>
                <div className="row-header">
                  <h2 className="row-title">Comedy</h2>
                  <div className="row-navigation">
                    <button
                      className="row-nav-btn"
                      aria-label="Scroll left"
                      onClick={() => scrollLeft(comedySliderRef)}
                      disabled={!canScrollLeft(comedySliderRef)}
                    >
                      &#8249;
                    </button>
                    <button
                      className="row-nav-btn"
                      aria-label="Scroll right"
                      onClick={() => scrollRight(comedySliderRef)}
                      disabled={!canScrollRight(comedySliderRef)}
                    >
                      &#8250;
                    </button>
                  </div>
                </div>
                <div className="movie-row-container">
                  <div className="movie-slider">
                    {comedyMovies.map((movie) => (
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
            )}

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
