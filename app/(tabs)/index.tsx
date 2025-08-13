import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import Counter from "@/components/Counter";
import { useAppSelector } from "@/store/hooks";
import { useTheme } from "@/contexts";
import { selectCurrentUser } from "@/store/slices/userSlice";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t("screens.home.title")}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t("screens.home.subtitle")}
        </Text>
        <Text style={[styles.description, { color: colors.textTertiary }]}>
          {t("screens.home.description")}
        </Text>

        {currentUser && (
          <Text style={[styles.welcomeText, { color: colors.primary }]}>
            Привет, {currentUser.name}! 👋
          </Text>
        )}

        <Counter />

        <StatusBar style={isDark ? "light" : "dark"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
});
