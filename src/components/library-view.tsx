import { Movie } from "../lib/movie-data";
import { MovieCard } from "./movie-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Bookmark, Heart, CheckCircle, Film } from "lucide-react";

interface LibraryViewProps {
  watchlist: Movie[];
  favorites: Movie[];
  watched: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onToggleWatchlist: (movie: Movie) => void;
  onToggleFavorites: (movie: Movie) => void;
  onToggleWatched: (movie: Movie) => void;
  watchlistIds: number[];
  favoritesIds: number[];
  watchedIds: number[];
}

export function LibraryView({
  watchlist,
  favorites,
  watched,
  onSelectMovie,
  onToggleWatchlist,
  onToggleFavorites,
  onToggleWatched,
  watchlistIds,
  favoritesIds,
  watchedIds,
}: LibraryViewProps) {
  const renderMovieGrid = (movies: Movie[]) => {
    if (movies.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Film className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="mb-2">No movies yet</h3>
          <p className="text-muted-foreground">
            Start adding movies to your collection
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSelect={onSelectMovie}
            isInWatchlist={watchlistIds.includes(movie.id)}
            isInFavorites={favoritesIds.includes(movie.id)}
            onToggleWatchlist={onToggleWatchlist}
            onToggleFavorites={onToggleFavorites}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="mb-8">
        <h1 className="mb-2">My Library</h1>
        <p className="text-muted-foreground">
          Your personal collection of movies
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Bookmark className="h-6 w-6 text-primary" />
            <h3>Watchlist</h3>
          </div>
          <p className="text-3xl">{watchlist.length}</p>
          <p className="text-muted-foreground">movies to watch</p>
        </div>

        <div className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="h-6 w-6 text-accent" />
            <h3>Favorites</h3>
          </div>
          <p className="text-3xl">{favorites.length}</p>
          <p className="text-muted-foreground">loved movies</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h3>Watched</h3>
          </div>
          <p className="text-3xl">{watched.length}</p>
          <p className="text-muted-foreground">movies watched</p>
        </div>
      </div>

      <Tabs defaultValue="watchlist" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="watchlist" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Watchlist
          </TabsTrigger>
          <TabsTrigger value="favorites" className="gap-2">
            <Heart className="h-4 w-4" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="watched" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Watched
          </TabsTrigger>
        </TabsList>

        <TabsContent value="watchlist">
          {renderMovieGrid(watchlist)}
        </TabsContent>

        <TabsContent value="favorites">
          {renderMovieGrid(favorites)}
        </TabsContent>

        <TabsContent value="watched">
          {renderMovieGrid(watched)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
