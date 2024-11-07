"use client";

import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { citySlice } from "./slices/citySlice";
import { authSlice } from "./slices/authSlice";
import { appSlice } from "./slices/appSlice";
import { categoriesSlice } from "./slices/categories";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    city: citySlice.reducer,
    categories: categoriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
