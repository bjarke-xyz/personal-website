import React from "react";

interface IThemeContext {
  dark: boolean;
  toggle: () => void;
}
const defaultContextData: IThemeContext = {
  dark: false,
  toggle: () => {},
};

const ThemeContext = React.createContext(defaultContextData);
const useTheme = () => React.useContext(ThemeContext);

interface ThemeState {
  dark: boolean;
  hasThemeMounted: boolean;
}
const useEffectDarkMode = (): [ThemeState, React.Dispatch<React.SetStateAction<ThemeState>>] => {
  const [themeState, setThemeState] = React.useState<ThemeState>({
    dark: false,
    hasThemeMounted: false,
  });
  React.useEffect(() => {
    const dark = localStorage.getItem("dark") === "true";
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
    setThemeState({ ...themeState, dark, hasThemeMounted: true });
  }, []);

  return [themeState, setThemeState];
};

const ThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useEffectDarkMode();

  const toggle = () => {
    const dark = !themeState.dark;
    localStorage.setItem("dark", JSON.stringify(dark));
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
    setThemeState({ ...themeState, dark });
  };

  return (
    <ThemeContext.Provider
      value={{
        dark: themeState.dark,
        toggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
