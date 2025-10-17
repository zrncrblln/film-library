import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { HeroSection } from "./components/hero-section";
import { MovieRow } from "./components/movie-row";
import { MovieDetailDialog } from "./components/movie-detail-dialog";
import { SearchBar } from "./components/search-bar";
import { FilterBar } from "./components/filter-bar";
import { LibraryView } from "./components/library-view";
import { ProfileView } from "./components/profile-view";
import { useMovies } from "./lib/useMovies";
import { Movie } from "./lib/movie-data";

export default function App() {
  const [activeView, setActiveView] = useState("home");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [darkMode, setDarkMode] = useState(true);

  const {
    popularMovies,
    trendingMovies,
    topRatedMovies,
    searchMovies,
    genres,
    loading,
    searchLoading,
    error,
    searchMoviesAsync,
  } = useMovies();

  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [watched, setWatched] = useState<number[]>([]);
  const [movieStore, setMovieStore] = useState<{ [key: number]: Movie }>({});

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("moviez-watchlist");
    const savedFavorites = localStorage.getItem("moviez-favorites");
    const savedWatched = localStorage.getItem("moviez-watched");
    const savedMovieStore = localStorage.getItem("moviez-movie-store");

    if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedWatched) setWatched(JSON.parse(savedWatched));
    if (savedMovieStore) setMovieStore(JSON.parse(savedMovieStore));
  }, []);

  useEffect(() => {
    localStorage.setItem("moviez-watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("moviez-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("moviez-watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    localStorage.setItem("moviez-movie-store", JSON.stringify(movieStore));
  }, [movieStore]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchMoviesAsync(searchQuery);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, searchMoviesAsync]);

  const toggleWatchlist = (movie: Movie) => {
    setMovieStore((prev) => ({ ...prev, [movie.id]: movie }));
    setWatchlist((prev) =>
      prev.includes(movie.id)
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id]
    );
  };

  const toggleFavorites = (movie: Movie) => {
    setMovieStore((prev) => ({ ...prev, [movie.id]: movie }));
    setFavorites((prev) =>
      prev.includes(movie.id)
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id]
    );
  };

  const toggleWatched = (movie: Movie) => {
    setMovieStore((prev) => ({ ...prev, [movie.id]: movie }));
    setWatched((prev) =>
      prev.includes(movie.id)
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id]
    );
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setDialogOpen(true);
  };

  const featuredMovie =
    trendingMovies[0] || popularMovies[0] || topRatedMovies[0] || null;
  const newReleases = [
    ...popularMovies,
    ...trendingMovies,
    ...topRatedMovies,
  ].filter((m) => m.newRelease);

  const getFilteredAndSortedMovies = () => {
    let filtered = searchQuery
      ? searchMovies
      : deduplicateMovies([
          ...popularMovies,
          ...trendingMovies,
          ...topRatedMovies,
        ]);

    if (selectedGenres.length > 0) {
      filtered = filtered.filter((movie) =>
        movie.genre.some((g) => selectedGenres.includes(g))
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.year - a.year;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

    return filtered;
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Helper function to deduplicate movies by ID
  const deduplicateMovies = (movies: Movie[]): Movie[] => {
    const movieMap = new Map<number, Movie>();
    movies.forEach((movie) => {
      movieMap.set(movie.id, movie);
    });
    return Array.from(movieMap.values());
  };

  const allMovies = deduplicateMovies([
    ...popularMovies,
    ...trendingMovies,
    ...topRatedMovies,
  ]);
  const watchlistMovies = watchlist.map((id) => movieStore[id]).filter(Boolean);
  const favoritesMovies = favorites.map((id) => movieStore[id]).filter(Boolean);
  const watchedMovies = watched.map((id) => movieStore[id]).filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation activeView={activeView} onViewChange={setActiveView} />

      <main className="pt-16 pb-20 md:pb-8">
        {activeView === "home" && (
          <>
            {featuredMovie && (
              <HeroSection
                movie={featuredMovie}
                isInWatchlist={watchlist.includes(featuredMovie.id)}
                onToggleWatchlist={() => toggleWatchlist(featuredMovie)}
                onViewDetails={() => handleSelectMovie(featuredMovie)}
              />
            )}

            <FilterBar
              selectedGenres={selectedGenres}
              onGenreToggle={handleGenreToggle}
              sortBy={sortBy}
              onSortChange={setSortBy}
              genres={genres.map((g) => ({ id: g.id, name: g.name }))}
            />

            <div className="mt-8">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Loading movies...</p>
                  </div>
                </div>
              ) : (
                <>
                  <MovieRow
                    title="Trending Now"
                    movies={getFilteredAndSortedMovies()
                      .filter((m) => trendingMovies.some((t) => t.id === m.id))
                      .slice(0, 10)}
                    onSelectMovie={handleSelectMovie}
                    watchlist={watchlist}
                    favorites={favorites}
                    onToggleWatchlist={toggleWatchlist}
                    onToggleFavorites={toggleFavorites}
                  />

                  <MovieRow
                    title="New Releases"
                    movies={getFilteredAndSortedMovies()
                      .filter((m) => newReleases.some((n) => n.id === m.id))
                      .slice(0, 10)}
                    onSelectMovie={handleSelectMovie}
                    watchlist={watchlist}
                    favorites={favorites}
                    onToggleWatchlist={toggleWatchlist}
                    onToggleFavorites={toggleFavorites}
                  />

                  <MovieRow
                    title="Top Rated"
                    movies={getFilteredAndSortedMovies()
                      .filter((m) => topRatedMovies.some((t) => t.id === m.id))
                      .slice(0, 10)}
                    onSelectMovie={handleSelectMovie}
                    watchlist={watchlist}
                    favorites={favorites}
                    onToggleWatchlist={toggleWatchlist}
                    onToggleFavorites={toggleFavorites}
                  />

                  <MovieRow
                    title="All Movies"
                    movies={getFilteredAndSortedMovies().slice(0, 20)}
                    onSelectMovie={handleSelectMovie}
                    watchlist={watchlist}
                    favorites={favorites}
                    onToggleWatchlist={toggleWatchlist}
                    onToggleFavorites={toggleFavorites}
                  />
                </>
              )}
            </div>
          </>
        )}

        {activeView === "search" && (
          <div className="px-4 md:px-8 py-6">
            <div className="mb-6">
              <h1 className="mb-4">Search Movies</h1>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            <FilterBar
              selectedGenres={selectedGenres}
              onGenreToggle={handleGenreToggle}
              sortBy={sortBy}
              onSortChange={setSortBy}
              genres={genres.map((g) => ({ id: g.id, name: g.name }))}
            />

            {searchLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Searching movies...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {getFilteredAndSortedMovies().map((movie) => (
                    <div key={movie.id}>
                      <div
                        className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:scale-105"
                        onClick={() => handleSelectMovie(movie)}
                      >
                        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-secondary">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="mt-2">
                          <h3 className="line-clamp-1">{movie.title}</h3>
                          <p className="text-muted-foreground">{movie.year}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {getFilteredAndSortedMovies().length === 0 &&
                  !searchLoading && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <h3 className="mb-2">
                        {searchQuery
                          ? "No movies found"
                          : "Start searching for movies"}
                      </h3>
                      <p className="text-muted-foreground">
                        {searchQuery
                          ? "Try adjusting your search or filters"
                          : "Enter a movie title to begin searching"}
                      </p>
                    </div>
                  )}
              </>
            )}
          </div>
        )}

        {activeView === "library" && (
          <LibraryView
            watchlist={watchlistMovies}
            favorites={favoritesMovies}
            watched={watchedMovies}
            onSelectMovie={handleSelectMovie}
            onToggleWatchlist={toggleWatchlist}
            onToggleFavorites={toggleFavorites}
            onToggleWatched={toggleWatched}
            watchlistIds={watchlist}
            favoritesIds={favorites}
            watchedIds={watched}
          />
        )}

        {activeView === "profile" && (
          <ProfileView
            watchlistCount={watchlist.length}
            favoritesCount={favorites.length}
            watchedCount={watched.length}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
          />
        )}
      </main>

      <MovieDetailDialog
        movie={selectedMovie}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        isInWatchlist={
          selectedMovie ? watchlist.includes(selectedMovie.id) : false
        }
        isInFavorites={
          selectedMovie ? favorites.includes(selectedMovie.id) : false
        }
        onToggleWatchlist={() =>
          selectedMovie && toggleWatchlist(selectedMovie)
        }
        onToggleFavorites={() =>
          selectedMovie && toggleFavorites(selectedMovie)
        }
      />
    </div>
  );
}
