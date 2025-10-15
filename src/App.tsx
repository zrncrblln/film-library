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
    searchMoviesAsync,
  } = useMovies();

  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [watched, setWatched] = useState<number[]>([]);

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("moviez-watchlist");
    const savedFavorites = localStorage.getItem("moviez-favorites");
    const savedWatched = localStorage.getItem("moviez-watched");

    if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedWatched) setWatched(JSON.parse(savedWatched));
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
    if (searchQuery) {
      searchMoviesAsync(searchQuery);
    }
  }, [searchQuery, searchMoviesAsync]);

  const toggleWatchlist = (movie: Movie) => {
    setWatchlist((prev) =>
      prev.includes(movie.id)
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id]
    );
  };

  const toggleFavorites = (movie: Movie) => {
    setFavorites((prev) =>
      prev.includes(movie.id)
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id]
    );
  };

  const toggleWatched = (movie: Movie) => {
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

  const featuredMovie = trendingMovies[0] || popularMovies[0] || null;
  const newReleases = [
    ...popularMovies,
    ...trendingMovies,
    ...topRatedMovies,
  ].filter((m) => m.newRelease);

  const getFilteredAndSortedMovies = () => {
    let filtered = searchQuery
      ? searchMovies
      : [...popularMovies, ...trendingMovies, ...topRatedMovies];

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

  const allMovies = [...popularMovies, ...trendingMovies, ...topRatedMovies];
  const watchlistMovies = allMovies.filter((m) => watchlist.includes(m.id));
  const favoritesMovies = allMovies.filter((m) => favorites.includes(m.id));
  const watchedMovies = allMovies.filter((m) => watched.includes(m.id));

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
                    movies={trendingMovies}
                    onSelectMovie={handleSelectMovie}
                    watchlist={watchlist}
                    favorites={favorites}
                    onToggleWatchlist={toggleWatchlist}
                    onToggleFavorites={toggleFavorites}
                  />

                  <MovieRow
                    title="New Releases"
                    movies={newReleases}
                    onSelectMovie={handleSelectMovie}
                    watchlist={watchlist}
                    favorites={favorites}
                    onToggleWatchlist={toggleWatchlist}
                    onToggleFavorites={toggleFavorites}
                  />

                  <MovieRow
                    title="Top Rated"
                    movies={topRatedMovies}
                    onSelectMovie={handleSelectMovie}
                    watchlist={watchlist}
                    favorites={favorites}
                    onToggleWatchlist={toggleWatchlist}
                    onToggleFavorites={toggleFavorites}
                  />

                  <MovieRow
                    title="All Movies"
                    movies={allMovies}
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
              genres={genres}
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

                {getFilteredAndSortedMovies().length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h3 className="mb-2">No movies found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filters
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
