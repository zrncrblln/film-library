# 🎬 Film Library App

A modern, responsive movie library application built with React and TypeScript. Browse, search, and manage your favorite movies with an intuitive interface powered by The Movie Database (TMDB) API.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Deployed_on_GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://zrncrblln.github.io/film-library/)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.3.5-yellow?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-blue?style=flat-square&logo=tailwind-css)

## ✨ Features

- **🎯 Movie Discovery**: Browse popular, trending, and top-rated movies
- **🔍 Advanced Search**: Real-time movie search with debounced input
- **🎭 Smart Filtering**: Filter movies by genre, rating, and release year
- **📊 Sorting Options**: Sort by rating, year, or title
- **📚 Personal Library**: Create and manage watchlists and favorites
- **🎞️ Movie Details**: Detailed movie information with cast, director, and synopsis
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🌙 Dark Theme**: Modern dark theme with customizable UI
- **💾 Local Storage**: Persistent watchlist and favorites across sessions

## 🛠️ Tech Stack

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
- **Local Storage** - Client-side data persistence

### API Integration

- **TMDB API** - The Movie Database API for movie data
- **Fetch API** - Modern browser API for HTTP requests

### Build & Deployment

- **Vite** - Fast build tool with optimized production builds
- **GitHub Actions** - Automated deployment to GitHub Pages
- **GitHub Pages** - Free hosting for static sites

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/zrncrblln/film-library.git
cd film-library
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Open in Browser

Navigate to `http://localhost:3000/film-library/` - the app will automatically open!

## 📖 Usage Guide

### Navigation

- **🏠 Home**: Browse featured movies, trending content, and new releases
- **🔍 Search**: Find specific movies with real-time search
- **📚 Library**: Manage your personal watchlist and favorites

### Movie Management

- **📝 Add to Watchlist**: Click the bookmark icon on any movie
- **❤️ Add to Favorites**: Click the heart icon on any movie
- **ℹ️ View Details**: Click on any movie poster to see detailed information

### Filtering & Sorting

- **🏷️ Genre Filter**: Select multiple genres to narrow down results
- **📈 Sort Options**: Sort by rating, release year, or title
- **🔎 Search**: Type movie titles for instant results

## 🏗️ Project Structure

```
film-library/
├── 📁 public/
│   └── index.html                 # Main HTML template
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 ui/                 # Reusable UI components (Radix UI)
│   │   ├── filter-bar.tsx         # Movie filtering interface
│   │   ├── hero-section.tsx       # Featured movie display
│   │   ├── library-view.tsx       # Personal library management
│   │   ├── movie-card.tsx         # Individual movie card
│   │   ├── movie-detail-dialog.tsx # Movie details modal
│   │   ├── movie-row.tsx          # Horizontal movie list
│   │   ├── navigation.tsx         # App navigation
│   │   ├── profile-view.tsx       # User profile section
│   │   ├── search-bar.tsx         # Search functionality
│   │   └── 📁 figma/              # Figma design components
│   ├── 📁 lib/
│   │   ├── movie-data.ts          # Movie data types
│   │   ├── tmdb-api.ts            # TMDB API integration
│   │   └── useMovies.ts           # Custom hook for movie data
│   ├── 📁 styles/
│   │   └── globals.css            # Global styles and Tailwind
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Tailwind CSS imports
├── 📁 build/                      # Production build output
├── 📁 .github/
│   └── 📁 workflows/              # GitHub Actions deployment
├── package.json                   # Dependencies and scripts
├── vite.config.ts                 # Vite configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # Project documentation
```

## 🔌 API Integration

This app integrates with **The Movie Database (TMDB) API** to fetch movie data:

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
const API_KEY = "c138886a68189d4f50a36bd5fe53e588";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
```

## 🎨 Design System

### Color Palette

- **🔵 Primary**: Cyan (#00d4ff)
- **🔴 Accent**: Red (#e94560)
- **⚫ Background**: Dark (#0a0a0a)
- **⚫ Surface**: Dark gray (#141414)
- **⚪ Text**: Light gray (#e0e0e0)

### Typography

- **Font Family**: System fonts (sans-serif)
- **Weights**: Normal (400), Medium (500), Bold (700)

### Components

Built with **Radix UI** primitives for accessibility and customization, styled with **Tailwind CSS** utilities.

## 📱 Responsive Design

The app is fully responsive with breakpoints:

- **📱 Mobile**: < 768px (2 columns)
- **📱 Tablet**: 768px - 1024px (4 columns)
- **💻 Desktop**: > 1024px (6 columns)

## 🚀 Deployment

This project is automatically deployed to **GitHub Pages** using **GitHub Actions**.

### Live Demo

🌐 **https://zrncrblln.github.io/film-library/**

### Deployment Configuration

- **Base Path**: `/film-library/` (configured in `vite.config.ts`)
- **Build Command**: `npm run build`
- **Output Directory**: `build/`
- **SPA Support**: 404.html redirects for client-side routing

### GitHub Actions Workflow

The deployment is handled by `.github/workflows/deploy.yml` which:

1. Triggers on pushes to `main` branch
2. Installs dependencies and builds the project
3. Uploads the `build/` directory as an artifact
4. Deploys to GitHub Pages

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **🎬 TMDB** - The Movie Database API
- **🎨 Radix UI** - Accessible component primitives
- **💨 Tailwind CSS** - Utility-first CSS framework
- **🎯 Lucide** - Beautiful icons
- **📐 Figma Community** - Original design inspiration

---

**📝 Note**: This project is based on a Figma design available at: [Movie Library App Design](https://www.figma.com/design/8XGgbgjZ91HkTxstXl9m7V/Movie-Library-App-Design)

**⭐ Star this repo if you found it helpful!**
