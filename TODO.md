# TODO: Fix Search Functionality

- [x] Add debouncing logic to search input in `src/App.tsx` (500ms delay to prevent excessive API calls)
- [x] Modify `searchMoviesAsync` in `src/lib/useMovies.ts` to skip empty queries and improve error handling
- [x] Update search view in `src/App.tsx` for better feedback (e.g., "No results" message if searchMovies is empty after search)
- [x] Test the search functionality by running the app and verifying debounced API calls and correct display of results
- [x] Fix screen blinking and scrolling issues by making searchMoviesAsync stable with useCallback
