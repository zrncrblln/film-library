// Theme Configuration Constants
export const THEME_STORAGE_KEY = "movieAppTheme";

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type Theme = typeof THEMES[keyof typeof THEMES];

// Theme CSS Classes
export const THEME_CLASSES = {
  LIGHT: "light-theme",
  DARK: "dark-theme",
} as const;
