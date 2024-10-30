"use client";

import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { citySlice } from "./slices/citySlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    city: citySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
