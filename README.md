# Movie Library App

A modern, responsive movie library application built with React and TypeScript. Browse, search, and manage your favorite movies with an intuitive interface powered by The Movie Database (TMDB) API.

![Movie Library App](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) ![Vite](https://img.shields.io/badge/Vite-6.3.5-yellow) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-blue)

## ✨ Features

- **Movie Discovery**: Browse popular, trending, and top-rated movies
- **Advanced Search**: Real-time movie search with debounced input
- **Smart Filtering**: Filter movies by genre, rating, and release year
- **Sorting Options**: Sort by rating, year, or title
- **Personal Library**: Create and manage watchlists and favorites
- **Movie Details**: Detailed movie information with cast, director, and synopsis
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark theme with customizable UI
- **Local Storage**: Persistent watchlist and favorites across sessions

## 🛠️ Technologies Used

### Frontend Framework

- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite 6.3.5** - Fast build tool and development server

### UI & Styling

- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI components
  - Accordion, Alert Dialog, Avatar, Badge, Button, Calendar, Card, Carousel, Checkbox, Collapsible, Context Menu, Dialog, Drawer, Dropdown Menu, Form, Hover Card, Input, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toggle, Toggle Group, Tooltip
- **Lucide React** - Beautiful icon library
- **Next Themes** - Theme management for React apps

### State Management & Data

- **React Hook Form** - Performant forms with easy validation
- **React Hook Form** integration with validation
- **Local Storage** - Client-side data persistence

### API Integration

- **TMDB API** - The Movie Database API for movie data
- **Fetch API** - Modern browser API for HTTP requests

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Build & Deployment

- **Vite** - Fast build tool with optimized production builds
- **SWC** - Fast TypeScript/JavaScript compiler

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **TMDB API Key** (free from [The Movie Database](https://www.themoviedb.org/settings/api))

## 🚀 Installation

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

   - Get your API key from [TMDB](https://www.themoviedb.org/settings/api)
   - The API key is already configured in `src/lib/tmdb-api.ts`

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically open in your default browser

## 📖 Usage

### Navigation

- **Home**: Browse featured movies, trending content, and new releases
- **Search**: Find specific movies with real-time search
- **Library**: Manage your personal watchlist and favorites

### Movie Management

- **Add to Watchlist**: Click the bookmark icon on any movie
- **Add to Favorites**: Click the heart icon on any movie
- **View Details**: Click on any movie poster to see detailed information

### Filtering & Sorting

- **Genre Filter**: Select multiple genres to narrow down results
- **Sort Options**: Sort by rating, release year, or title
- **Search**: Type movie titles for instant results

## 🏗️ Project Structure

```
film-library/
├── public/
│   └── index.html                 # Main HTML template
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components (Radix UI)
│   │   ├── filter-bar.tsx         # Movie filtering interface
│   │   ├── hero-section.tsx       # Featured movie display
│   │   ├── library-view.tsx       # Personal library management
│   │   ├── movie-card.tsx         # Individual movie card
│   │   ├── movie-detail-dialog.tsx # Movie details modal
│   │   ├── movie-row.tsx          # Horizontal movie list
│   │   ├── navigation.tsx         # App navigation
│   │   ├── profile-view.tsx       # User profile section
│   │   ├── search-bar.tsx         # Search functionality
│   │   └── figma/                 # Figma design components
│   ├── lib/
│   │   ├── movie-data.ts          # Movie data types
│   │   ├── tmdb-api.ts            # TMDB API integration
│   │   └── useMovies.ts           # Custom hook for movie data
│   ├── styles/
│   │   └── globals.css            # Global styles and Tailwind
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Tailwind CSS imports
├── build/                         # Production build output
├── package.json                   # Dependencies and scripts
├── vite.config.ts                 # Vite configuration
└── README.md                      # Project documentation
```

## 🔌 API Integration

This app integrates with The Movie Database (TMDB) API to fetch movie data:

### Endpoints Used

- `/movie/popular` - Popular movies
- `/trending/movie/week` - Trending movies
- `/movie/top_rated` - Top-rated movies
- `/movie/{id}` - Movie details
- `/movie/{id}/credits` - Movie cast and crew
- `/genre/movie/list` - Available genres
- `/search/movie` - Movie search

### API Configuration

The TMDB API key is configured in `src/lib/tmdb-api.ts`:

```typescript
const API_KEY = "your-api-key-here";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
```

## 🎨 Design System

### Color Palette

- **Primary**: Cyan (#00d4ff)
- **Accent**: Red (#e94560)
- **Background**: Dark (#0a0a0a)
- **Surface**: Dark gray (#141414)
- **Text**: Light gray (#e0e0e0)

### Typography

- **Font Family**: System fonts (sans-serif)
- **Weights**: Normal (400), Medium (500), Bold (700)

### Components

Built with Radix UI primitives for accessibility and customization, styled with Tailwind CSS utilities.

## 📱 Responsive Design

The app is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Grid layouts adapt from 2 columns on mobile to 6 columns on large screens.

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Consistent code formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TMDB** for providing the movie database API
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful icons
- Original design inspiration from Figma community

---

**Note**: This project is based on a Figma design available at: https://www.figma.com/design/8XGgbgjZ91HkTxstXl9m7V/Movie-Library-App-Design
