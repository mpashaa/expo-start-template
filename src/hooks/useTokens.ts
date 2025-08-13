import { useTheme } from "@/contexts";
import { spacing } from "@/theme/tokens";

export function useTokens() {
  const { colors, isDark } = useTheme();

  return {
    colors,
    spacing,
    isDark,
  };
}

export default useTokens;
