import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setTheme as setReduxTheme,
  selectTheme,
} from "@/store/slices/settingsSlice";
import {
  lightColors,
  darkColors,
  ThemeColors,
  ThemeMode,
  ColorScheme,
} from "@/theme/colors";
import type { Colors } from "@/theme/tokens";

interface ThemeContextType {
  colors: Colors;
  colorScheme: ColorScheme;
  themeMode: ThemeMode;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectTheme);
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  const getActiveColorScheme = (): ColorScheme => {
    if (themeMode === "system") {
      return systemColorScheme === "dark" ? "dark" : "light";
    }
    return themeMode as ColorScheme;
  };

  const colorScheme = getActiveColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? darkColors : lightColors;

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  useEffect(() => {}, [colors.background, isDark]);

  const setTheme = (theme: ThemeMode) => {
    dispatch(setReduxTheme(theme));
  };

  const toggleTheme = () => {
    if (themeMode === "light") {
      setTheme("dark");
    } else if (themeMode === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const value: ThemeContextType = {
    colors,
    colorScheme,
    themeMode,
    isDark,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
