import axios from 'axios';
import type {
  Movie,
  MovieDetails,
  MovieResponse,
  Genre,
  Credits,
  VideosResponse,
  ReviewsResponse
} from '../types';

// Get API configuration from environment variables
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

// Validate required environment variables
if (!API_KEY) {
  throw new Error(
    'Missing TMDB API key. Please set VITE_TMDB_API_KEY in your .env file. ' +
    'You can get an API key from: https://www.themoviedb.org/settings/api'
  );
}

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Get popular movies
export const getPopularMovies = async (page: number = 1): Promise<MovieResponse> => {
  const response = await api.get('/movie/popular', {
    params: { page }
  });
  return response.data;
};

// Get top rated movies
export const getTopRatedMovies = async (page: number = 1): Promise<MovieResponse> => {
  const response = await api.get('/movie/top_rated', {
    params: { page }
  });
  return response.data;
};

// Get now playing movies
export const getNowPlayingMovies = async (page: number = 1): Promise<MovieResponse> => {
  const response = await api.get('/movie/now_playing', {
    params: { page }
  });
  return response.data;
};

// Search movies
export const searchMovies = async (query: string, page: number = 1): Promise<MovieResponse> => {
  const response = await api.get('/search/movie', {
    params: { query, page }
  });
  return response.data;
};

// Get movie details
export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

// Get movie credits
export const getMovieCredits = async (movieId: number): Promise<Credits> => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data;
};

// Get movie videos/trailers
export const getMovieVideos = async (movieId: number): Promise<VideosResponse> => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data;
};

// Get movie reviews
export const getMovieReviews = async (movieId: number, page: number = 1): Promise<ReviewsResponse> => {
  const response = await api.get(`/movie/${movieId}/reviews`, {
    params: { page }
  });
  return response.data;
};

// Get genres
export const getGenres = async (): Promise<{ genres: Genre[] }> => {
  const response = await api.get('/genre/movie/list');
  return response.data;
};

// Discover movies with filters
export const discoverMovies = async (
  params: {
    page?: number;
    genre?: string;
    year?: number;
    sortBy?: string;
    minRating?: number;
  } = {}
): Promise<MovieResponse> => {
  const { page = 1, genre, year, sortBy = 'popularity.desc', minRating } = params;

  const searchParams: any = {
    page,
    sort_by: sortBy,
  };

  if (genre) searchParams.with_genres = genre;
  if (year) searchParams.primary_release_year = year;
  if (minRating) searchParams['vote_average.gte'] = minRating;

  const response = await api.get('/discover/movie', {
    params: searchParams
  });
  return response.data;
};

// Helper function to get full image URL
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Helper function to get YouTube trailer URL
export const getYouTubeTrailerUrl = (key: string): string => {
  return `https://www.youtube.com/watch?v=${key}`;
};
