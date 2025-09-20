// API Configuration Constants
export const API_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_IMAGE_SIZE: 'w500',
  PLACEHOLDER_IMAGE: '/placeholder-movie.jpg',
  YOUTUBE_BASE_URL: 'https://www.youtube.com/watch?v=',
} as const;

// Movie Sort Options
export const SORT_OPTIONS = {
  POPULARITY_DESC: 'popularity.desc',
  POPULARITY_ASC: 'popularity.asc',
  RATING_DESC: 'vote_average.desc',
  RATING_ASC: 'vote_average.asc',
  RELEASE_DATE_DESC: 'release_date.desc',
  RELEASE_DATE_ASC: 'release_date.asc',
  TITLE_ASC: 'title.asc',
  TITLE_DESC: 'title.desc',
} as const;

// Image Size Options
export const IMAGE_SIZES = {
  POSTER: {
    SMALL: 'w154',
    MEDIUM: 'w342',
    LARGE: 'w500',
    XLARGE: 'w780',
    ORIGINAL: 'original',
  },
  BACKDROP: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280',
    ORIGINAL: 'original',
  },
  PROFILE: {
    SMALL: 'w45',
    MEDIUM: 'w185',
    LARGE: 'h632',
    ORIGINAL: 'original',
  },
} as const;

// Filter Rating Options
export const RATING_FILTERS = {
  ANY: '',
  EXCELLENT: '8',
  VERY_GOOD: '7',
  GOOD: '6',
  AVERAGE: '5',
  BELOW_AVERAGE: '4',
} as const;

// Search Parameters
export const SEARCH_PARAMS = {
  DEFAULT_PAGE: 1,
  MIN_YEAR: 1900,
  MAX_YEAR: new Date().getFullYear(),
} as const;
