import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import type { Movie } from "../types";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("movieFavorites");
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      setFavorites(favoriteIds);
    }
  }, []);

  // Fetch favorite movies details
  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (favorites.length === 0) {
        setFavoriteMovies([]);
        return;
      }

      try {
        setLoading(true);
        const moviePromises = favorites.map((id) =>
          fetch(
            `${
              import.meta.env.VITE_TMDB_BASE_URL ||
              "https://api.themoviedb.org/3"
            }/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
          ).then((res) => res.json())
        );

        const movies = await Promise.all(moviePromises);
        setFavoriteMovies(movies);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [favorites]);

  const handleToggleFavorite = (movie: Movie) => {
    const newFavorites = favorites.includes(movie.id)
      ? favorites.filter((id) => id !== movie.id)
      : [...favorites, movie.id];

    setFavorites(newFavorites);
    localStorage.setItem("movieFavorites", JSON.stringify(newFavorites));

    // Update favorite movies list
    if (newFavorites.includes(movie.id)) {
      setFavoriteMovies((prev) => [...prev, movie]);
    } else {
      setFavoriteMovies((prev) => prev.filter((m) => m.id !== movie.id));
    }
  };

  return (
    <div className="favorites-page">
      <Header />

      <main className="main-content">
        <div className="container">
          <section className="favorites-section">
            <div className="section-header">
              <h1>My Favorites</h1>
              <p>
                {favorites.length === 0
                  ? "You haven't added any favorites yet."
                  : `${favorites.length} favorite ${
                      favorites.length === 1 ? "movie" : "movies"
                    }`}
              </p>
            </div>

            {favorites.length > 0 && (
              <MovieList
                movies={favoriteMovies}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                loading={loading}
              />
            )}

            {favorites.length === 0 && !loading && (
              <div className="empty-favorites">
                <div className="empty-state">
                  <h3>No favorites yet</h3>
                  <p>Start exploring movies and add them to your favorites!</p>
                  <a href="/" className="browse-movies-btn">
                    Browse Movies
                  </a>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Favorites;
