import { createContext, useReducer, useEffect } from "react";

export const ThemeContext = createContext();

// Safe localStorage helpers that gracefully handle privacy restrictions and quota errors
const safeGetStorage = (key) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch {
    // Storage access blocked or restricted in private mode
  }
  return null;
};

const safeSetStorage = (key, value) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Storage write blocked or quota exceeded
  }
};

// Check system color scheme preference
const getSystemTheme = () => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return true; // Default fallback to dark
};

const getInitialTheme = () => {
  const savedTheme = safeGetStorage("portfolio_theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme === "dark";
  }
  return getSystemTheme();
};

const INITIAL_STATE = {
  darkMode: getInitialTheme(),
  userOverride: safeGetStorage("portfolio_theme") !== null,
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE": {
      const nextMode = !state.darkMode;
      safeSetStorage("portfolio_theme", nextMode ? "dark" : "light");
      return { darkMode: nextMode, userOverride: true };
    }
    case "SET_THEME": {
      return { darkMode: action.payload, userOverride: state.userOverride };
    }
    case "SYSTEM_THEME_CHANGE": {
      // Only auto-update if the user hasn't manually overridden theme preference
      if (!state.userOverride) {
        return { ...state, darkMode: action.payload };
      }
      return state;
    }
    default:
      return state;
  }
};

export const ThemeProvider = (props) => {
  const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

  // Sync class on document root
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.darkMode]);

  // Listen for system theme changes dynamically
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (e) => {
      dispatch({ type: "SYSTEM_THEME_CHANGE", payload: e.matches });
    };

    // Modern event listener with fallback
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleSystemChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleSystemChange);
      }
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
