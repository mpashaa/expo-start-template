import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTheme } from "@/contexts";
import { setLanguage, selectLanguage } from "@/store/slices/settingsSlice";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectLanguage);

  const changeLanguage = (language: "en" | "ru") => {
    i18n.changeLanguage(language);
    dispatch(setLanguage(language));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t("settings.language.title")}
      </Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {t("settings.language.description")}
      </Text>

      <View style={styles.languageOptions}>
        <TouchableOpacity
          style={[
            styles.languageButton,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: colors.border,
            },
            currentLanguage === "en" && [
              styles.activeButton,
              {
                borderColor: colors.primary,
                backgroundColor: colors.surfaceSecondary,
              },
            ],
          ]}
          onPress={() => changeLanguage("en")}
        >
          <View style={styles.languageContent}>
            <Text style={styles.flag}>🇺🇸</Text>
            <Text
              style={[
                styles.languageText,
                { color: colors.text },
                currentLanguage === "en" && [
                  styles.activeText,
                  { color: colors.primary },
                ],
              ]}
            >
              {t("settings.language.english")}
            </Text>
            {currentLanguage === "en" && (
              <Ionicons name="checkmark" size={20} color={colors.primary} />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.languageButton,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: colors.border,
            },
            currentLanguage === "ru" && [
              styles.activeButton,
              {
                borderColor: colors.primary,
                backgroundColor: colors.surfaceSecondary,
              },
            ],
          ]}
          onPress={() => changeLanguage("ru")}
        >
          <View style={styles.languageContent}>
            <Text style={styles.flag}>🇷🇺</Text>
            <Text
              style={[
                styles.languageText,
                { color: colors.text },
                currentLanguage === "ru" && [
                  styles.activeText,
                  { color: colors.primary },
                ],
              ]}
            >
              {t("settings.language.russian")}
            </Text>
            {currentLanguage === "ru" && (
              <Ionicons name="checkmark" size={20} color={colors.primary} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    marginBottom: 20,
  },
  languageOptions: {
    gap: 12,
  },
  languageButton: {
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
  languageContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flag: {
    fontSize: 24,
  },
  languageText: {
    fontSize: 16,
    flex: 1,
  },
  activeText: {
    fontWeight: "600",
  },
});
