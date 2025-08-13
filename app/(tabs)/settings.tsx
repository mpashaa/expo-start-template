import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useAppSelector } from "@/store/hooks";
import { useTheme } from "@/contexts";
import { selectSettings } from "@/store/slices/settingsSlice";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { colors, themeMode, isDark } = useTheme();
  const settings = useAppSelector(selectSettings);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          {t("settings.title")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Активная тема: {themeMode} {isDark ? "🌙" : "☀️"} | Язык:{" "}
          {settings.language}
        </Text>
      </View>

      <LanguageSwitcher />
      <ThemeSwitcher />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
});
