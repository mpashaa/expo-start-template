export interface CounterState {
  value: number;
  isLoading: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type Theme = "light" | "dark" | "system";
export type Language = "en" | "ru";

export interface NotificationSettings {
  push: boolean;
  email: boolean;
  sound: boolean;
}

export interface UserPreferences {
  autoSave: boolean;
  showTutorial: boolean;
  compactMode: boolean;
}

export interface SettingsState {
  theme: Theme;
  language: Language;
  notifications: NotificationSettings;
  preferences: UserPreferences;
}

export interface SetUserAction {
  type: "user/setUser";
  payload: User;
}

export interface IncrementAction {
  type: "counter/increment";
}

export interface SetThemeAction {
  type: "settings/setTheme";
  payload: Theme;
}

export type AsyncThunkConfig = {
  state: {
    counter: CounterState;
    user: UserState;
    settings: SettingsState;
  };
  dispatch: any;
  rejectValue: string;
};
