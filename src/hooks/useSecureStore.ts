import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setSecureItemAsync(key: string, value: string | null) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(`app_${key}`);
      } else {
        localStorage.setItem(`app_${key}`, value);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export async function getSecureItemAsync(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    try {
      if (typeof localStorage !== "undefined") {
        return localStorage.getItem(`app_${key}`);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
    return null;
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

export async function deleteSecureItemAsync(key: string): Promise<void> {
  if (Platform.OS === "web") {
    try {
      localStorage.removeItem(`app_${key}`);
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

export function useSecureStore(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  useEffect(() => {
    const loadValue = async () => {
      try {
        const value = await getSecureItemAsync(key);
        setState(value);
      } catch (error) {
        console.error(`Error loading secure item ${key}:`, error);
        setState(null);
      }
    };

    loadValue();
  }, [key]);

  const setValue = useCallback(
    async (value: string | null) => {
      try {
        setState(value);
        await setSecureItemAsync(key, value);
      } catch (error) {
        console.error(`Error setting secure item ${key}:`, error);
      }
    },
    [key]
  );

  return [state, setValue];
}

export const SECURE_STORE_KEYS = {
  THEME: "theme",
  LANGUAGE: "language",
} as const;

export default useSecureStore;
