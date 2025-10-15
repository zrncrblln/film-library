# TODO: Implement TMDB API Integration

## Tasks

- [x] Add fetchSearchMovies function to tmdb-api.ts
- [x] Update useMovies.ts to handle search query and return searched movies
- [x] Modify App.tsx to use useMovies hook for all data, including search
- [x] Update FilterBar to use dynamic genres from API
- [x] Test API integration and verify UI remains unchanged
- [x] Fix loading states and null checks for better UX

## Progress

- [x] Add fallback poster image in tmdb-api.ts for movies without poster_path
- [x] Update search view in App.tsx to use fixed-width containers for movie cards to maintain consistent aspect ratios
