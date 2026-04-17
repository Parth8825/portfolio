import { createContext, useReducer, useEffect } from "react";

export const ThemeContext = createContext();

// Detect browser's theme preference
const getSystemTheme = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

const INITIAL_STATE = { darkMode: getSystemTheme() };

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { darkMode: !state.darkMode };
    case "SET_THEME":
      return { darkMode: action.payload };
    default:
      return state;
  }
};

export const ThemeProvider = (props) => {
  const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleThemeChange = (e) => {
      dispatch({ type: "SET_THEME", payload: e.matches });
    };

    // Modern API - addEventListener
    mediaQuery.addEventListener("change", handleThemeChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
};