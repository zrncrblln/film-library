const API_KEY = "c138886a68189d4f50a36bd5fe53e588";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genre_ids: number[];
  overview: string;
  poster_path: string;
  backdrop_path: string;
  cast: string[];
  director: string;
  original_language: string;
  adult: boolean;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export const fetchPopularMovies = async (): Promise<TMDBMovie[]> => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  if (!response.ok) throw new Error("Failed to fetch popular movies");
  const data = await response.json();
  return data.results.map(transformMovie);
};

export const fetchTrendingMovies = async (): Promise<TMDBMovie[]> => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) throw new Error("Failed to fetch trending movies");
  const data = await response.json();
  return data.results.map(transformMovie);
};

export const fetchTopRatedMovies = async (): Promise<TMDBMovie[]> => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  );
  if (!response.ok) throw new Error("Failed to fetch top rated movies");
  const data = await response.json();
  return data.results.map(transformMovie);
};

export const fetchMovieDetails = async (
  movieId: number
): Promise<TMDBMovie> => {
  const [movieResponse, creditsResponse] = await Promise.all([
    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`),
    fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    ),
  ]);

  if (!movieResponse.ok || !creditsResponse.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const movieData = await movieResponse.json();
  const creditsData = await creditsResponse.json();

  const cast = creditsData.cast.slice(0, 3).map((actor: any) => actor.name);
  const director =
    creditsData.crew.find((person: any) => person.job === "Director")?.name ||
    "Unknown";

  return transformMovie({ ...movieData, cast, director });
};

export const fetchGenres = async (): Promise<TMDBGenre[]> => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) throw new Error("Failed to fetch genres");
  const data = await response.json();
  return data.genres;
};

const transformMovie = (movie: any): TMDBMovie => ({
  id: movie.id,
  title: movie.title,
  release_date: movie.release_date,
  runtime: movie.runtime || 0,
  vote_average: movie.vote_average,
  genre_ids: movie.genre_ids || movie.genres?.map((g: any) => g.id) || [],
  overview: movie.overview,
  poster_path: movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750/333333/ffffff?text=No+Poster",
  backdrop_path: movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : "",
  cast: movie.cast || [],
  director: movie.director || "Unknown",
  original_language: movie.original_language,
  adult: movie.adult || false,
});

export const fetchSearchMovies = async (
  query: string,
  page: number = 1
): Promise<TMDBMovie[]> => {
  if (!query.trim()) return [];
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&language=en-US&page=${page}`
  );
  if (!response.ok) throw new Error("Failed to search movies");
  const data = await response.json();
  return data.results.map(transformMovie);
};

export const getGenreNames = (
  genreIds: number[],
  genres: TMDBGenre[]
): string[] => {
  return genreIds
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean) as string[];
};

export const fetchMovieTrailer = async (
  movieId: number
): Promise<string | null> => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) return null;

  const data = await response.json();
  const trailer = data.results.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
  );

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};
