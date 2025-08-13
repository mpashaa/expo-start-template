export const lightColors = {
  primary: "#007AFF",
  secondary: "#5856D6",

  background: "#FFFFFF",
  backgroundSecondary: "#F2F2F7",

  surface: "#FFFFFF",
  surfaceSecondary: "#F2F2F7",

  text: "#000000",
  textSecondary: "#3C3C43",
  textTertiary: "#8E8E93",

  border: "#C6C6C8",
  separator: "#E5E5EA",

  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",

  shadow: "rgba(0, 0, 0, 0.1)",
} as const;

export const darkColors = {
  primary: "#0A84FF",
  secondary: "#5E5CE6",

  background: "#000000",
  backgroundSecondary: "#1C1C1E",

  surface: "#1C1C1E",
  surfaceSecondary: "#2C2C2E",

  text: "#FFFFFF",
  textSecondary: "#EBEBF5",
  textTertiary: "#8E8E93",

  border: "#38383A",
  separator: "#48484A",

  success: "#30D158",
  warning: "#FF9F0A",
  error: "#FF453A",

  shadow: "rgba(0, 0, 0, 0.3)",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export type LightColors = typeof lightColors;
export type DarkColors = typeof darkColors;
export type Spacing = typeof spacing;
export type Colors = LightColors | DarkColors;
