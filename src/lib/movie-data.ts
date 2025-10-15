export interface Movie {
  id: number;
  title: string;
  year: number;
  duration: number;
  rating: number;
  genre: string[];
  description: string;
  poster: string;
  backdrop: string;
  cast: string[];
  director: string;
  language: string;
  trending?: boolean;
  newRelease?: boolean;
  topRated?: boolean;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Quantum Nexus",
    year: 2024,
    duration: 148,
    rating: 8.7,
    genre: ["Action", "Sci-Fi", "Thriller"],
    description:
      "When a brilliant physicist discovers a way to manipulate quantum realities, she must race against time to prevent a catastrophic timeline collapse that threatens all of existence.",
    poster:
      "https://images.unsplash.com/photo-1739891251370-05b62a54697b?w=300&h=450&fit=crop&crop=center",
    backdrop:
      "https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=300&h=450&fit=crop&crop=center",
    cast: ["Sarah Chen", "Marcus Wright", "Elena Rodriguez"],
    director: "Christopher Kane",
    language: "English",
    trending: true,
    topRated: true,
  },
  {
    id: 2,
    title: "The Last Symphony",
    year: 2024,
    duration: 132,
    rating: 9.1,
    genre: ["Drama", "Music"],
    description:
      "A deaf composer discovers a revolutionary way to experience music through vibrations, leading to a profound journey of self-discovery and artistic breakthrough.",
    poster:
      "https://images.unsplash.com/photo-1611889466485-4d8a6d3bd2a1?w=300&h=450&fit=crop&crop=center",
    backdrop:
      "https://images.unsplash.com/photo-1611889466485-4d8a6d3bd2a1?w=300&h=450&fit=crop&crop=center",
    cast: ["David Morrison", "Lily Zhang", "Thomas Beck"],
    director: "Sofia Marquez",
    language: "English",
    trending: true,
    newRelease: true,
    topRated: true,
  },
  {
    id: 3,
    title: "Shadows of Tomorrow",
    year: 2023,
    duration: 125,
    rating: 8.3,
    genre: ["Horror", "Mystery"],
    description:
      "In a small town where people's shadows begin acting independently, a detective must uncover the dark secret before the shadows take over completely.",
    poster:
      "https://images.unsplash.com/photo-1630338679229-99fb150fbf88?w=300&h=450&fit=crop&crop=center",
    backdrop:
      "https://images.unsplash.com/photo-1630338679229-99fb150fbf88?w=300&h=450&fit=crop&crop=center",
    cast: ["Anna Blackwood", "James Cole", "Maya Patel"],
    director: "Robert Chen",
    language: "English",
    topRated: true,
  },
  {
    id: 4,
    title: "Laugh Lines",
    year: 2024,
    duration: 98,
    rating: 7.8,
    genre: ["Comedy", "Romance"],
    description:
      "Two rival comedians forced to co-host a late-night show discover that their on-screen chemistry might be more than just good ratings.",
    poster:
      "https://images.unsplash.com/photo-1580188928585-0ef5c1a5c4dd?w=300&h=450&fit=crop&crop=center",
    backdrop:
      "https://images.unsplash.com/photo-1580188928585-0ef5c1a5c4dd?w=300&h=450&fit=crop&crop=center",
    cast: ["Jamie Foster", "Alex Rivera", "Rachel Kim"],
    director: "Nina Hart",
    language: "English",
    newRelease: true,
    trending: true,
  },
  {
    id: 5,
    title: "Eternal Hearts",
    year: 2024,
    duration: 115,
    rating: 8.5,
    genre: ["Romance", "Fantasy"],
    description:
      "A time-traveling love story where two souls meet across different centuries, fighting against fate to find each other again and again.",
    poster:
      "https://images.unsplash.com/photo-1658851866325-49fb8b7fbcb2?w=300&h=450&fit=crop&crop=center",
    backdrop:
      "https://images.unsplash.com/photo-1658851866325-49fb8b7fbcb2?w=300&h=450&fit=crop&crop=center",
    cast: ["Emma Stone", "Lucas Grant", "Victoria Chen"],
    director: "Michael Zhang",
    language: "English",
    newRelease: true,
    topRated: true,
  },
  {
    id: 6,
    title: "Steel Fury",
    year: 2023,
    duration: 142,
    rating: 8.0,
    genre: ["Action", "Adventure"],
    description:
      "An elite special forces team must infiltrate a rogue nation's stronghold to prevent a global catastrophe, facing impossible odds and betrayal from within.",
    poster:
      "https://images.unsplash.com/photo-1739891251370-05b62a54697b?w=300&h=450&fit=crop&crop=center",
    backdrop:
      "https://images.unsplash.com/photo-1739891251370-05b62a54697b?w=300&h=450&fit=crop&crop=center",
    cast: ["Ryan Cooper", "Jessica Martinez", "Omar Hassan"],
    director: "James Cameron",
    language: "English",
    trending: true,
  },
  {
    id: 7,
    title: "Neon Dreams",
    year: 2024,
    duration: 128,
    rating: 8.9,
    genre: ["Sci-Fi", "Drama"],
    description:
      "In a cyberpunk future where dreams can be recorded and sold, a memory thief discovers a dream that could change everything we know about reality.",
    poster:
      "https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=300&h=450&fit=crop&crop=center",
    backdrop:
      "https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=300&h=450&fit=crop&crop=center",
    cast: ["Kai Tanaka", "Nova Lee", "Drake Wilson"],
    director: "Denis Villeneuve",
    language: "English",
    trending: true,
    topRated: true,
  },
  {
    id: 8,
    title: "The Whispering Woods",
    year: 2023,
    duration: 105,
    rating: 7.6,
    genre: ["Horror", "Thriller"],
    description:
      "A group of friends on a camping trip discover that the forest they're in has been hiding a sinister secret for centuries, and now it won't let them leave.",
    poster:
      "https://images.unsplash.com/photo-1630338679229-99fb150fbf88?w=300&h=450&fit=crop&crop=center",
    backdrop:
      "https://images.unsplash.com/photo-1630338679229-99fb150fbf88?w=300&h=450&fit=crop&crop=center",
    cast: ["Sophie Turner", "Ben Hardy", "Claire Danes"],
    director: "Ari Aster",
    language: "English",
  },
];

export const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Music",
];
