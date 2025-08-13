import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as Localization from "expo-localization";
import {
  setSecureItemAsync,
  getSecureItemAsync,
  SECURE_STORE_KEYS,
} from "@/hooks/useSecureStore";

type Theme = "light" | "dark" | "system";
type Language = "en" | "ru";

interface SettingsState {
  theme: Theme;
  language: Language;
  notifications: {
    push: boolean;
    email: boolean;
    sound: boolean;
  };
  preferences: {
    autoSave: boolean;
    showTutorial: boolean;
    compactMode: boolean;
  };
}

const getDeviceLanguage = (): Language => {
  const deviceLanguage = Localization.getLocales()[0]?.languageCode;
  return deviceLanguage === "ru" ? "ru" : "en";
};

const initialState: SettingsState = {
  theme: "system",
  language: getDeviceLanguage(),
  notifications: {
    push: true,
    email: false,
    sound: true,
  },
  preferences: {
    autoSave: true,
    showTutorial: true,
    compactMode: false,
  },
};

// Асинхронный экшен для загрузки настроек из SecureStore
export const loadSettingsFromStorage = createAsyncThunk(
  "settings/loadFromStorage",
  async () => {
    try {
      const [storedTheme, storedLanguage] = await Promise.all([
        getSecureItemAsync(SECURE_STORE_KEYS.THEME),
        getSecureItemAsync(SECURE_STORE_KEYS.LANGUAGE),
      ]);

      return {
        theme: (storedTheme as Theme) || "system",
        language: (storedLanguage as Language) || getDeviceLanguage(),
      };
    } catch (error) {
      console.error("Error loading settings from storage:", error);
      return {
        theme: "system" as Theme,
        language: getDeviceLanguage(),
      };
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      // Сохраняем в SecureStore
      setSecureItemAsync(SECURE_STORE_KEYS.THEME, action.payload);
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      // Сохраняем в SecureStore
      setSecureItemAsync(SECURE_STORE_KEYS.LANGUAGE, action.payload);
    },
    toggleNotification: (
      state,
      action: PayloadAction<keyof SettingsState["notifications"]>
    ) => {
      const key = action.payload;
      state.notifications[key] = !state.notifications[key];
    },
    updateNotifications: (
      state,
      action: PayloadAction<Partial<SettingsState["notifications"]>>
    ) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    togglePreference: (
      state,
      action: PayloadAction<keyof SettingsState["preferences"]>
    ) => {
      const key = action.payload;
      state.preferences[key] = !state.preferences[key];
    },
    updatePreferences: (
      state,
      action: PayloadAction<Partial<SettingsState["preferences"]>>
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    resetSettings: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loadSettingsFromStorage.fulfilled, (state, action) => {
      state.theme = action.payload.theme;
      state.language = action.payload.language;
    });
  },
});

export const {
  setTheme,
  setLanguage,
  toggleNotification,
  updateNotifications,
  togglePreference,
  updatePreferences,
  resetSettings,
} = settingsSlice.actions;

export const selectTheme = (state: { settings: SettingsState }) =>
  state.settings.theme;
export const selectLanguage = (state: { settings: SettingsState }) =>
  state.settings.language;
export const selectNotifications = (state: { settings: SettingsState }) =>
  state.settings.notifications;
export const selectPreferences = (state: { settings: SettingsState }) =>
  state.settings.preferences;
export const selectSettings = (state: { settings: SettingsState }) =>
  state.settings;

export default settingsSlice.reducer;
