import { Movie } from "../lib/movie-data";
import { MovieCard } from "./movie-card";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  watchlist?: number[];
  favorites?: number[];
  onToggleWatchlist?: (movie: Movie) => void;
  onToggleFavorites?: (movie: Movie) => void;
}

export function MovieRow({
  title,
  movies,
  onSelectMovie,
  watchlist = [],
  favorites = [],
  onToggleWatchlist,
  onToggleFavorites,
}: MovieRowProps) {
  if (movies.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="mb-4 px-4 md:px-8">{title}</h2>
      <div className="px-4 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              isInWatchlist={watchlist.includes(movie.id)}
              isInFavorites={favorites.includes(movie.id)}
              onToggleWatchlist={onToggleWatchlist}
              onToggleFavorites={onToggleFavorites}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
