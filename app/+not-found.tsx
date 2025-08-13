import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t("screens.notFound.title") }} />
      <View style={styles.container}>
        <Text style={styles.title}>{t("screens.notFound.title")}</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>{t("screens.notFound.goHome")}</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
