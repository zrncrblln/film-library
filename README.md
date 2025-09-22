# Film Library - Movie Discovery App

A modern React + TypeScript application for discovering and exploring movies using The Movie Database (TMDB) API.

## Features

- 🎬 **Movie Discovery**: Browse popular, top-rated, and upcoming movies
- 🔍 **Search Functionality**: Search for movies by title
- ⭐ **Favorites System**: Save and manage your favorite movies
- 🌓 **Dark/Light Theme**: Toggle between themes with system preference detection
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎭 **Movie Details**: View detailed information about movies
- 🏷️ **Genre Filtering**: Filter movies by genre, year, and rating

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Bootstrap 5 + Custom CSS
- **API**: The Movie Database (TMDB) API
- **Routing**: React Router DOM
- **State Management**: React Context API
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd film-library
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with your TMDB API key:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

   Get your free API key from [TMDB API Settings](https://www.themoviedb.org/settings/api)

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header with search
│   ├── MovieCard.tsx   # Individual movie card
│   ├── MovieList.tsx   # List of movies
│   └── ...
├── contexts/           # React Context providers
│   ├── ThemeContext.tsx # Theme management
│   └── ThemeContext.ts  # Theme context definition
├── hooks/              # Custom React hooks
│   └── useTheme.ts     # Theme hook
├── pages/              # Page components
│   ├── Home.tsx        # Main homepage
│   ├── Favorites.tsx   # Favorites page
│   └── MovieDetailsComponent.tsx # Movie details page
├── services/           # API services
│   └── movieApi.ts     # TMDB API integration
├── constants/          # Application constants
│   ├── api.ts          # API configuration
│   └── theme.ts        # Theme constants
└── types/              # TypeScript type definitions
    └── index.ts        # All type definitions
```

## API Integration

This app uses The Movie Database (TMDB) API to fetch movie data. The API provides:

- Movie search and discovery
- Movie details and credits
- Genre information
- Image assets

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the movie data API
- [React](https://reactjs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool
