import  {
  createContext,
  useReducer,
  useEffect,

  type ReactNode,
} from "react";

// Types
type Theme = "light" | "dark" | string;

type ThemeAction =
  | { type: "TOGGLE" }
  | { type: "SET_LIGHT" }
  | { type: "SET_DARK" }
  | { type: "SET_CUSTOM"; payload: string };

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setLight: () => void;
  setDark: () => void;
  setCustomTheme: (color: string) => void;
}

// Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Reducer
const themeReducer = (state: Theme, action: ThemeAction): Theme => {
  switch (action.type) {
    case "TOGGLE":
      return state === "light" ? "dark" : "light";
    case "SET_LIGHT":
      return "light";
    case "SET_DARK":
      return "dark";
    case "SET_CUSTOM":
      return action.payload;
    default:
      return state;
  }
};

// Initial theme
const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem("app-theme") as Theme | null;
  return stored === "dark" ? "dark" : "light";
};

// React component export only
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, dispatch] = useReducer(themeReducer, getInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => dispatch({ type: "TOGGLE" });
  const setLight = () => dispatch({ type: "SET_LIGHT" });
  const setDark = () => dispatch({ type: "SET_DARK" });
  const setCustomTheme = (color: string) =>
    dispatch({ type: "SET_CUSTOM", payload: color });

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setLight, setDark, setCustomTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Export only the context, not the hook here
export { ThemeContext };