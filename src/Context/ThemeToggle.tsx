import { createContext, useContext, useState } from "react";

interface Theme {
  isLightMode: boolean;
  light: { bg: string; text: string };
  dark: { bg: string; text: string };
  toggleTheme?: () => void;
}

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<Theme | null>(null);

const initialState: Theme = {
  isLightMode: false,
  light: { bg: "white", text: "black" },
  dark: { bg: "black", text: "white" },
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("You can't use the themecontext outside of the provider");
  }
  return context;
};

const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(initialState);

  const toggleTheme = () => {
    setTheme((state) => {
      return {
        ...state,
        isLightMode: !state.isLightMode,
      };
    });
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
