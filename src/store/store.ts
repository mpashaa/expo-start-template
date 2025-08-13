import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "@/store/slices/counterSlice";
import userSlice from "@/store/slices/userSlice";
import settingsSlice from "@/store/slices/settingsSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    settings: settingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: __DEV__,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
