"use client";

import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { citySlice } from "./slices/citySlice";
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    city: citySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
