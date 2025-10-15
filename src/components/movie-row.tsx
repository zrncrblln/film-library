import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "../lib/movie-data";
import { MovieCard } from "./movie-card";
import { Button } from "./ui/button";
import { useRef } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="mb-4 px-4 md:px-8">{title}</h2>
      <div className="group/row relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 z-10 hidden h-full -translate-y-1/2 rounded-none bg-black/50 px-2 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover/row:block md:block"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide md:px-8"
          style={{ scrollbarWidth: "none" }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="w-[150px] md:w-[200px]">
              <MovieCard
                movie={movie}
                onSelect={onSelectMovie}
                isInWatchlist={watchlist.includes(movie.id)}
                isInFavorites={favorites.includes(movie.id)}
                onToggleWatchlist={onToggleWatchlist}
                onToggleFavorites={onToggleFavorites}
              />
            </div>
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 z-10 hidden h-full -translate-y-1/2 rounded-none bg-black/50 px-2 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover/row:block md:block"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
