import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaStar, FaPlay, FaArrowLeft } from "react-icons/fa";

// Types
import type { MovieDetails, Credits, Video } from "../types";

// Services
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getImageUrl,
  getYouTubeTrailerUrl,
} from "../services/movieApi";

// Components
import Header from "../components/Header";

const MovieDetailsComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Helper function to format rating
  const formatRating = (rating: number | undefined) => {
    return rating && !isNaN(rating) ? rating.toFixed(1) : "0.0";
  };

  // Helper function to get favorites from localStorage
  const getFavorites = () => {
    return JSON.parse(localStorage.getItem("movieFavorites") || "[]");
  };

  // Helper function to save favorites to localStorage
  const saveFavorites = (favorites: number[]) => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const movieId = parseInt(id);

        // Fetch all data in parallel
        const [movieData, creditsData, videosData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getMovieVideos(movieId),
        ]);

        setMovie(movieData);
        setCredits(creditsData);

        // Filter for YouTube trailers only
        const trailers = videosData.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setVideos(trailers);

        // Check if movie is in favorites
        const favorites = getFavorites();
        setIsFavorite(favorites.includes(movieId));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch movie details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!movie) return;

    const favorites = getFavorites();
    const movieId = movie.id;

    // Toggle favorite status
    const newFavorites = isFavorite
      ? favorites.filter((id: number) => id !== movieId)
      : [...favorites, movieId];

    saveFavorites(newFavorites);
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="movie-details-page">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-details-page">
        <Header />
        <div className="error-container">
          <h2>Error</h2>
          <p>{error || "Movie not found"}</p>
          <Link to="/" className="back-btn">
            <FaArrowLeft /> Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  const director = credits?.crew.find((person) => person.job === "Director");
  const mainCast = credits?.cast.slice(0, 6) || [];
  const trailer = videos[0];

  return (
    <div className="movie-details-page">
      <Header />

      <main className="movie-details-content">
        <div className="container">
          {/* Back Button */}
          <Link to="/" className="back-btn">
            <FaArrowLeft /> Back to Movies
          </Link>

          <div className="movie-details-grid">
            {/* Movie Poster */}
            <div className="movie-poster-section">
              <img
                src={getImageUrl(movie.poster_path, "w500")}
                alt={movie.title}
                className="movie-poster-large"
              />
              <button
                onClick={handleToggleFavorite}
                className={`favorite-btn-large ${isFavorite ? "active" : ""}`}
              >
                <FaHeart />
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>

            {/* Movie Info */}
            <div className="movie-info-section">
              <h1 className="movie-title">{movie.title}</h1>

              {movie.tagline && (
                <p className="movie-tagline">"{movie.tagline}"</p>
              )}

              <div className="movie-meta">
                <div className="movie-rating">
                  <FaStar className="star-icon" />
                  <span>{formatRating(movie.vote_average)}</span>
                  <span className="rating-count">
                    ({movie.vote_count.toLocaleString()} votes)
                  </span>
                </div>
                <span className="movie-year">
                  {new Date(movie.release_date).getFullYear()}
                </span>
                <span className="movie-runtime">{movie.runtime} min</span>
              </div>

              <div className="movie-genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="movie-overview">{movie.overview}</p>

              {/* Director */}
              {director && (
                <div className="movie-crew">
                  <strong>Director:</strong> {director.name}
                </div>
              )}

              {/* Cast */}
              {mainCast.length > 0 && (
                <div className="movie-cast">
                  <strong>Cast:</strong>
                  <div className="cast-list">
                    {mainCast.map((actor) => (
                      <span key={actor.id} className="cast-member">
                        {actor.name} as {actor.character}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trailer */}
              {trailer && (
                <div className="movie-trailer">
                  <h3>Watch Trailer</h3>
                  <a
                    href={getYouTubeTrailerUrl(trailer.key)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="trailer-btn"
                  >
                    <FaPlay /> Play Trailer
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetailsComponent;
