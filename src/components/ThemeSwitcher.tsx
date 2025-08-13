import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts";
import { ThemeMode } from "@/theme/colors";

export default function ThemeSwitcher() {
  const { t } = useTranslation();
  const { colors, themeMode, setTheme, isDark } = useTheme();

  const changeTheme = (theme: ThemeMode) => {
    setTheme(theme);
  };

  const getThemeIcon = (theme: ThemeMode) => {
    switch (theme) {
      case "light":
        return "sunny";
      case "dark":
        return "moon";
      case "system":
        return "phone-portrait";
      default:
        return "sunny";
    }
  };

  const getThemeEmoji = (theme: ThemeMode) => {
    switch (theme) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "system":
        return "📱";
      default:
        return "☀️";
    }
  };

  const themes: { key: ThemeMode; label: string }[] = [
    { key: "light", label: t("settings.theme.light") },
    { key: "dark", label: t("settings.theme.dark") },
    { key: "system", label: t("settings.theme.system") },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t("settings.theme.title")}
      </Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Текущая тема: {themeMode} {isDark ? "🌙" : "☀️"}
      </Text>

      <View style={styles.themeOptions}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme.key}
            style={[
              styles.themeButton,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: colors.border,
              },
              themeMode === theme.key && [
                styles.activeButton,
                {
                  borderColor: colors.primary,
                  backgroundColor: colors.surfaceSecondary,
                },
              ],
            ]}
            onPress={() => changeTheme(theme.key)}
          >
            <View style={styles.themeContent}>
              <Text style={styles.themeEmoji}>{getThemeEmoji(theme.key)}</Text>
              <Ionicons
                name={getThemeIcon(theme.key)}
                size={24}
                color={
                  themeMode === theme.key ? colors.primary : colors.textTertiary
                }
              />
              <Text
                style={[
                  styles.themeText,
                  { color: colors.text },
                  themeMode === theme.key && [
                    styles.activeText,
                    { color: colors.primary },
                  ],
                ]}
              >
                {theme.label}
              </Text>
              {themeMode === theme.key && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  themeOptions: {
    gap: 12,
  },
  themeButton: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeButton: {
    borderWidth: 2,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  themeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  themeEmoji: {
    fontSize: 20,
  },
  themeText: {
    fontSize: 16,
    flex: 1,
  },
  activeText: {
    fontWeight: "600",
  },
});
