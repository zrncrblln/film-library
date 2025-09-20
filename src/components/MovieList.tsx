import React from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "../types";

interface MovieListProps {
  movies: Movie[];
  favorites?: number[];
  onToggleFavorite?: (movie: Movie) => void;
  loading?: boolean;
  error?: string | null;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  favorites = [],
  onToggleFavorite,
  loading = false,
  error = null,
}) => {
  if (loading) {
    return (
      <div className="movie-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-list-error">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="movie-list-empty">
        <p>No movies found. Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.includes(movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
