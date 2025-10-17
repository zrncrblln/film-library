import { Play, Plus, Check, Heart, Star, Clock, Calendar } from "lucide-react";
import { Movie } from "../lib/movie-data";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface MovieDetailDialogProps {
  movie: Movie | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isInWatchlist: boolean;
  isInFavorites: boolean;
  onToggleWatchlist: () => void;
  onToggleFavorites: () => void;
  onPlayTrailer: () => void;
  loadingTrailer: boolean;
}

export function MovieDetailDialog({
  movie,
  open,
  onOpenChange,
  isInWatchlist,
  isInFavorites,
  onToggleWatchlist,
  onToggleFavorites,
  onPlayTrailer,
  loadingTrailer,
}: MovieDetailDialogProps) {
  if (!movie) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 bg-card border-border overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <div className="relative">
            <div className="relative h-[40vh] w-full">
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>

            <div className="px-6 pb-6 -mt-20 relative z-10">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 flex-shrink-0">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full rounded-lg shadow-2xl"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="mb-3 text-3xl">{movie.title}</h2>

                  <div className="flex flex-wrap items-center gap-4 mb-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span>{movie.rating}/10</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{movie.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {Math.floor(movie.duration / 60)}h {movie.duration % 60}
                        m
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
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

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={onPlayTrailer}
                      disabled={loadingTrailer}
                    >
                      <Play className="mr-2 h-5 w-5 fill-current" />
                      {loadingTrailer ? "Loading..." : "Play Trailer"}
                    </Button>
                    <Button variant="secondary" onClick={onToggleWatchlist}>
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
                    <Button variant="secondary" onClick={onToggleFavorites}>
                      <Heart
                        className={`mr-2 h-5 w-5 ${
                          isInFavorites ? "fill-accent text-accent" : ""
                        }`}
                      />
                      {isInFavorites ? "Favorited" : "Favorite"}
                    </Button>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-2">Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {movie.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="mb-2">Director</h4>
                      <p className="text-muted-foreground">{movie.director}</p>
                    </div>
                    <div>
                      <h4 className="mb-2">Language</h4>
                      <p className="text-muted-foreground">{movie.language}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2">Cast</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.cast.map((actor, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-border"
                        >
                          {actor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
