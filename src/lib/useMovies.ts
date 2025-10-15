import { useState, useEffect } from "react";
import {
  TMDBMovie,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchSearchMovies,
  fetchGenres,
  TMDBGenre,
} from "./tmdb-api";

export interface Movie {
  id: number;
  title: string;
  year: number;
  duration: number;
  rating: number;
  genre: string[];
  description: string;
  poster: string;
  backdrop: string;
  cast: string[];
  director: string;
  language: string;
  trending?: boolean;
  newRelease?: boolean;
  topRated?: boolean;
}

export const useMovies = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<TMDBGenre[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [popular, trending, topRated, genreList] = await Promise.all([
          fetchPopularMovies(),
          fetchTrendingMovies(),
          fetchTopRatedMovies(),
          fetchGenres(),
        ]);

        const transformToMovie = (
          movie: TMDBMovie,
          category?: "trending" | "topRated"
        ): Movie => ({
          id: movie.id,
          title: movie.title,
          year: new Date(movie.release_date).getFullYear(),
          duration: movie.runtime,
          rating: movie.vote_average,
          genre: movie.genre_ids
            .map((id) => genreList.find((g) => g.id === id)?.name || "")
            .filter(Boolean),
          description: movie.overview,
          poster: movie.poster_path,
          backdrop: movie.backdrop_path,
          cast: movie.cast,
          director: movie.director,
          language: movie.original_language.toUpperCase(),
          trending: category === "trending",
          topRated: category === "topRated",
          newRelease:
            new Date(movie.release_date).getFullYear() ===
            new Date().getFullYear(),
        });

        setPopularMovies(popular.map((m) => transformToMovie(m)));
        setTrendingMovies(trending.map((m) => transformToMovie(m, "trending")));
        setTopRatedMovies(topRated.map((m) => transformToMovie(m, "topRated")));
        setGenres(genreList);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const searchMoviesAsync = async (query: string) => {
    if (!query.trim()) {
      setSearchMovies([]);
      return;
    }
    try {
      setSearchLoading(true);
      const results = await fetchSearchMovies(query);
      const transformed = results.map((m) => ({
        id: m.id,
        title: m.title,
        year: new Date(m.release_date).getFullYear(),
        duration: m.runtime,
        rating: m.vote_average,
        genre: m.genre_ids
          .map((id) => genres.find((g) => g.id === id)?.name || "")
          .filter(Boolean),
        description: m.overview,
        poster: m.poster_path,
        backdrop: m.backdrop_path,
        cast: m.cast,
        director: m.director,
        language: m.original_language.toUpperCase(),
        trending: false,
        topRated: false,
        newRelease:
          new Date(m.release_date).getFullYear() === new Date().getFullYear(),
      }));
      setSearchMovies(transformed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search movies");
    } finally {
      setSearchLoading(false);
    }
  };

  return {
    popularMovies,
    trendingMovies,
    topRatedMovies,
    searchMovies,
    genres,
    loading,
    searchLoading,
    error,
    searchMoviesAsync,
    allMovies: [...popularMovies, ...trendingMovies, ...topRatedMovies],
  };
};
