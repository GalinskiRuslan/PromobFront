"use client";

import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { citySlice } from "./slices/citySlice";
import { authSlice } from "./slices/authSlice";
import { appSlice } from "./slices/appSlice";
import { categoriesSlice } from "./slices/categories";
import { usersSlice } from "./slices/usersSlice";
import { paymentSlice } from "./slices/paymentSlice";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    users: usersSlice.reducer,
    city: citySlice.reducer,
    categories: categoriesSlice.reducer,
    payment: paymentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
