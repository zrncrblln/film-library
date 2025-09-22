import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { createContext } from "react";
import {
  THEME_STORAGE_KEY,
  THEMES,
  THEME_CLASSES,
  type Theme,
} from "../constants/theme";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      return savedTheme;
    }

    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return THEMES.DARK;
    }

    return THEMES.LIGHT;
  });

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Apply theme to document
    const root = document.documentElement;
    if (theme === THEMES.DARK) {
      root.classList.add(THEME_CLASSES.DARK);
      root.classList.remove(THEME_CLASSES.LIGHT);
    } else {
      root.classList.add(THEME_CLASSES.LIGHT);
      root.classList.remove(THEME_CLASSES.DARK);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
