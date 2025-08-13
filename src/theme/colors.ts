import { lightColors, darkColors } from "@/theme/tokens";

export { lightColors, darkColors };

export type ThemeColors = typeof lightColors;

export type ColorScheme = "light" | "dark";
export type ThemeMode = "light" | "dark" | "system";
