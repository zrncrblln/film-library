# TODO: Fix Search Functionality

- [x] Add debouncing logic to search input in `src/App.tsx` (500ms delay to prevent excessive API calls)
- [x] Modify `searchMoviesAsync` in `src/lib/useMovies.ts` to skip empty queries and improve error handling
- [x] Update search view in `src/App.tsx` for better feedback (e.g., "No results" message if searchMovies is empty after search)
- [x] Test the search functionality by running the app and verifying debounced API calls and correct display of results
- [x] Fix screen blinking and scrolling issues by making searchMoviesAsync stable with useCallback

# TODO: Fix Duplicate Movies Issue

- [x] Create a helper function in `src/App.tsx` to deduplicate movies by ID using a Map
- [x] Update `allMovies` in `src/App.tsx` to use the deduplicated combined list
- [x] Update `getFilteredAndSortedMovies` in `src/App.tsx` to use deduplicated lists for non-search cases
- [ ] Test the app to verify no duplicates appear in the UI
- [x] Update TODO.md with the completed task
