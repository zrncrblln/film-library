import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";

// Types
import type { Movie } from "../types";

// Constants
import { IMAGE_SIZES } from "../constants/api";

// Services
import { getImageUrl } from "../services/movieApi";

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
  onToggleFavorite?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(movie);
    }
  };

  // Simple calculations without memoization
  const releaseYear = new Date(movie.release_date).getFullYear();

  const truncatedOverview = movie.overview
    ? movie.overview.length > 120
      ? movie.overview.substring(0, 120) + "..."
      : movie.overview
    : "No description available.";

  const formattedRating =
    movie.vote_average && !isNaN(movie.vote_average)
      ? movie.vote_average.toFixed(1)
      : "0.0";

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-poster">
          <img
            src={getImageUrl(movie.poster_path, IMAGE_SIZES.POSTER.MEDIUM)}
            alt={movie.title}
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-movie.jpg";
            }}
          />
          <div className="movie-overlay">
            <button
              className={`favorite-btn ${isFavorite ? "active" : ""}`}
              onClick={handleFavoriteClick}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <FaHeart />
            </button>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <div className="movie-meta">
                <div className="movie-rating">
                  <FaStar className="star-icon" />
                  <span>{formattedRating}</span>
                </div>
                <span className="movie-year">{releaseYear}</span>
              </div>
              <p className="movie-overview">{truncatedOverview}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
