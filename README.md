# 🎬 Moviez - Netflix-Inspired Streaming Platform

A modern, sleek streaming platform interface inspired by Netflix, built with React, TypeScript, and Vite. Features a cinematic dark theme, horizontal scrolling carousels, and a premium user experience.

![Netflix-Inspired UI](https://img.shields.io/badge/UI-Netflix--Inspired-E50914?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.6-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

### 🎨 **Netflix-Inspired Design**

- **Pure Black Theme** - Authentic Netflix dark mode (#000000)
- **Cinematic Hero Banner** - 80vh featured movie section with backdrop
- **Netflix Red Accents** - Signature #E50914 color throughout
- **Premium Typography** - Roboto & Poppins fonts for a polished look

### 📺 **Content Categories**

- **Trending Now** - Most popular current movies
- **Popular** - All-time favorites
- **Top Rated** - Highest-rated films
- **Upcoming Releases** - Coming soon
- **Action & Adventure** - Genre-specific content
- **Drama** - Dramatic films
- **Comedy** - Comedy movies

### 🎯 **User Experience**

- **Horizontal Scrolling Carousels** - Smooth navigation with arrow controls
- **Dynamic Featured Content** - Auto-selected from trending movies
- **Search Functionality** - Find movies instantly
- **Favorites System** - Save your favorite movies (localStorage)
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Theme Toggle** - Switch between light and dark modes

### 🎬 **Interactive Elements**

- **Play & More Info Buttons** - Netflix-style CTAs on hero banner
- **Rating Badges** - Star ratings with Netflix red background
- **Hover Effects** - Smooth transitions on movie cards
- **Navigation Arrows** - Circular buttons for carousel scrolling

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd film-library
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up TMDB API Key**

   - Get your free API key from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)
   - Create a `.env` file in the root directory:
     ```env
     VITE_TMDB_API_KEY=your_api_key_here
     ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 7.1.6** - Build tool & dev server
- **React Router 7.9.1** - Client-side routing
- **React Icons 5.5.0** - Icon library

### Styling

- **CSS3** - Custom styling with CSS variables
- **Google Fonts** - Roboto & Poppins
- **Responsive Design** - Mobile-first approach

### API

- **TMDB API** - Movie data and images
- **Axios 1.12.2** - HTTP client

## 📁 Project Structure

```
film-library/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and icons
│   ├── components/     # Reusable components
│   │   ├── Header.tsx
│   │   ├── MovieCard.tsx
│   │   ├── MovieList.tsx
│   │   ├── FilterPanel.tsx
│   │   └── icons/
│   ├── constants/      # API constants and theme
│   │   ├── api.ts
│   │   └── theme.ts
│   ├── contexts/       # React contexts
│   │   └── ThemeContext.tsx
│   ├── hooks/          # Custom hooks
│   │   └── useTheme.ts
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── Favorites.tsx
│   │   └── MovieDetailsComponent.tsx
│   ├── services/       # API services
│   │   └── movieApi.ts
│   ├── types/          # TypeScript types
│   │   └── index.ts
│   ├── App.tsx         # Main app component
│   ├── App.css         # Global styles
│   └── main.tsx        # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Design System

### Color Palette

#### Dark Theme (Primary)

```css
--bg-color: #000000           /* Pure Black */
--card-bg: #181818            /* Deep Gray */
--primary-color: #E50914      /* Netflix Red */
--text-color: #FFFFFF         /* White */
--secondary-color: #808080    /* Gray */
```

#### Light Theme

```css
--bg-color: #FFFFFF           /* White */
--card-bg: #F8F9FA            /* Light Gray */
--primary-color: #E50914      /* Netflix Red */
--text-color: #141414         /* Dark Gray */
```

### Typography

- **Headings**: Poppins (Bold, 800 weight)
- **Body**: Roboto (Regular, 400 weight)
- **Buttons**: Poppins (Bold, 700 weight)

### Spacing

- Container padding: 4rem (desktop), 2rem (tablet), 1rem (mobile)
- Section gaps: 3rem
- Card gaps: 1rem

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 480px) /* Tablet */ @media (max-width: 768px) /* Desktop */ @media (min-width: 769px);
```

## 🎯 Key Features Explained

### Hero Banner

- Displays featured movie with large backdrop image
- Auto-selects from trending movies with backdrop images
- Shows movie title, rating, year, and description
- Netflix-style "Play" and "More Info" buttons

### Movie Carousels

- Horizontal scrolling with smooth animations
- Navigation arrows (left/right)
- Disabled state when at boundaries
- 20 movies per category
- Genre-specific filtering (Action: 28, Drama: 18, Comedy: 35)

### Search & Filters

- Real-time search functionality
- Filter by genre, year, rating
- Sort by popularity, rating, release date

### Favorites System

- Add/remove movies from favorites
- Persistent storage using localStorage
- Dedicated favorites page
- Heart icon indicator on cards

## 🌐 API Integration

### TMDB API Endpoints Used

- `/discover/movie` - Discover movies with filters
- `/search/movie` - Search movies by query
- `/movie/{id}` - Get movie details
- `/genre/movie/list` - Get genre list

### Image Sizes

- **Poster**: w342 (medium), w500 (large)
- **Backdrop**: w780 (medium), w1280 (large)

## 🎨 Customization

### Change Theme Colors

Edit `src/App.css`:

```css
.dark-theme {
  --primary-color: #YOUR_COLOR;
  --bg-color: #YOUR_BG_COLOR;
}
```

### Add New Categories

Edit `src/pages/Home.tsx`:

```typescript
// Add new state
const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);

// Fetch in fetchMovieCategories
discoverMovies({ sortBy: "popularity.desc", genre: "27" }); // Horror

// Add carousel in JSX
```

### Modify Hero Banner Height

Edit `src/App.css`:

```css
.hero-section {
  height: 80vh; /* Change this value */
}
```

## 🐛 Troubleshooting

### Movies not loading?

- Check your TMDB API key in `.env`
- Verify internet connection
- Check browser console for errors

### Styles not applying?

- Clear browser cache
- Restart dev server
- Check CSS variable names

### Build errors?

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check TypeScript errors with `npm run build`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **TMDB** - For providing the movie database API
- **Netflix** - Design inspiration
- **React Team** - For the amazing framework
- **Vite Team** - For the blazing fast build tool

## 📞 Contact & Support

For questions, issues, or contributions:

- Open an issue on GitHub
- Submit a pull request
- Contact the maintainers

## 🚀 Future Enhancements

- [ ] User authentication
- [ ] Personalized recommendations
- [ ] Video player integration
- [ ] Social sharing features
- [ ] Advanced filtering options
- [ ] Movie trailers
- [ ] User reviews and ratings
- [ ] Watchlist functionality
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)

---

**Made with ❤️ and inspired by Netflix**

_Enjoy your cinematic streaming experience!_ 🎬🍿
