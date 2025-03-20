// src/components/ThemeProvider.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define constants
const COLOR_THEMES = {
  WHITE: "theme-white",
  BLUE: "theme-blue",
  BLACK: "theme-black",
  RED: "theme-red",
  GREEN: "theme-green",
  COLORLESS: "theme-colorless",
} as const;

type ColorThemeType = (typeof COLOR_THEMES)[keyof typeof COLOR_THEMES];

type ModeType = "light" | "dark";

// Define context shape
interface ThemeContextType {
  colorTheme: ColorThemeType;
  mode: ModeType;
  changeColorTheme: (newTheme: ColorThemeType) => void;
  toggleMode: () => void;
  COLOR_THEMES: typeof COLOR_THEMES;
}

// Create context with default value
const ThemeContext = createContext<ThemeContextType>({
  colorTheme: COLOR_THEMES.GREEN,
  mode: "light",
  changeColorTheme: () => {},
  toggleMode: () => {},
  COLOR_THEMES: COLOR_THEMES,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Initialize colorTheme from localStorage or default
  const [colorTheme, setColorTheme] = useState<ColorThemeType>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(
        "colorTheme"
      ) as ColorThemeType | null;
      return savedTheme || COLOR_THEMES.GREEN;
    }
    return COLOR_THEMES.GREEN;
  });

  // Initialize mode from localStorage or system preference
  const [mode, setMode] = useState<ModeType>(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("mode") as ModeType | null;
      if (savedMode) {
        return savedMode;
      }
      // Check system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  // Apply theme classes to document
  useEffect(() => {
    // Handle mode
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save mode preference
    if (typeof window !== "undefined") {
      localStorage.setItem("mode", mode);
    }
  }, [mode]);

  // Apply color theme classes
  useEffect(() => {
    // Remove all color theme classes
    document.documentElement.classList.remove(...Object.values(COLOR_THEMES));

    // Add current color theme class
    document.documentElement.classList.add(colorTheme);

    // Save theme preference
    if (typeof window !== "undefined") {
      localStorage.setItem("colorTheme", colorTheme);
    }
  }, [colorTheme]);

  // Function to change color theme
  const changeColorTheme = (newTheme: ColorThemeType) => {
    if (Object.values(COLOR_THEMES).includes(newTheme)) {
      setColorTheme(newTheme);
    } else {
      console.warn(`Theme "${newTheme}" is not available.`);
    }
  };

  // Function to toggle between light and dark mode
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        mode,
        changeColorTheme,
        toggleMode,
        COLOR_THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
