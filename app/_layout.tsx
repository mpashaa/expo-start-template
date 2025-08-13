import { useEffect } from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { useTranslation } from "react-i18next";
import { store } from "@/store/store";
import { ThemeProvider } from "@/contexts";
import { useAppSelector } from "@/store/hooks";
import {
  loadSettingsFromStorage,
  selectLanguage,
} from "@/store/slices/settingsSlice";
import "@/i18n/i18n";

function AppContent() {
  const { i18n } = useTranslation();
  const currentLanguage = useAppSelector(selectLanguage);

  useEffect(() => {
    store.dispatch(loadSettingsFromStorage());
  }, []);

  useEffect(() => {
    if (currentLanguage && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
