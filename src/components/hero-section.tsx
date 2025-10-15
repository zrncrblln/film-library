import { Play, Plus, Check, Info } from "lucide-react";
import { Movie } from "../lib/movie-data";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface HeroSectionProps {
  movie: Movie;
  isInWatchlist: boolean;
  onToggleWatchlist: () => void;
  onViewDetails: () => void;
}

export function HeroSection({
  movie,
  isInWatchlist,
  onToggleWatchlist,
  onViewDetails,
}: HeroSectionProps) {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>
      
      <div className="relative z-10 flex h-full items-end pb-16 md:pb-20">
        <div className="px-4 md:px-8 max-w-2xl">
          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genre.map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="bg-primary/20 text-primary border-0"
              >
                {genre}
              </Badge>
            ))}
          </div>
          
          <h1 className="mb-4 text-4xl md:text-6xl">{movie.title}</h1>
          
          <div className="mb-4 flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              ★ {movie.rating}
            </span>
            <span>{movie.year}</span>
            <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
          </div>
          
          <p className="mb-6 max-w-xl text-foreground/90 line-clamp-3">
            {movie.description}
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Play className="mr-2 h-5 w-5 fill-current" />
              Play Trailer
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
              onClick={onToggleWatchlist}
            >
              {isInWatchlist ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  In Watchlist
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-5 w-5" />
                  Add to Watchlist
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
              onClick={onViewDetails}
            >
              <Info className="mr-2 h-5 w-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
