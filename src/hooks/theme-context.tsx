import React from "react";

interface ThemeContext {
  dark: boolean;
  toggle: () => void;
}

const defaultContextData: ThemeContext = {
  dark: false,
  toggle: () => {},
};

const themeContext = React.createContext(defaultContextData);
const useTheme = () => React.useContext(themeContext);

interface ThemeState {
  dark: boolean;
}
const useEffectDarkMode = (): [ThemeState, React.Dispatch<React.SetStateAction<ThemeState>>] => {
  const [themeState, setThemeState] = React.useState<ThemeState>({
    dark: false,
  });

  React.useEffect(() => {
    const dark = localStorage.getItem("dark") === "true";
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
    setThemeState({ ...themeState, dark });
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
    setThemeState({ dark });
  };

  return (
    <themeContext.Provider
      value={{
        dark: themeState.dark,
        toggle,
      }}
    >
      {children}
    </themeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
