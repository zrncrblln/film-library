import { Star, Plus, Check, Heart } from "lucide-react";
import { Movie } from "../lib/movie-data";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  isInWatchlist?: boolean;
  isInFavorites?: boolean;
  onToggleWatchlist?: (movie: Movie) => void;
  onToggleFavorites?: (movie: Movie) => void;
}

export function MovieCard({
  movie,
  onSelect,
  isInWatchlist,
  isInFavorites,
  onToggleWatchlist,
  onToggleFavorites,
}: MovieCardProps) {
  return (
    <div
      className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:scale-105"
      onClick={() => onSelect(movie)}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-secondary">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {onToggleFavorites && (
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-accent"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorites?.(movie);
              }}
            >
              <Heart
                className={`h-4 w-4 ${
                  isInFavorites ? "fill-accent text-accent" : ""
                }`}
              />
            </Button>
          )}
          {onToggleWatchlist && (
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-primary"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWatchlist?.(movie);
              }}
            >
              {isInWatchlist ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="font-medium">{movie.rating}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {movie.genre.slice(0, 2).map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="bg-primary/20 text-primary border-0 px-2 py-0"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="line-clamp-1">{movie.title}</h3>
        <p className="text-muted-foreground">{movie.year}</p>
      </div>
    </div>
  );
}
