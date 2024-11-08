"use client";

import $axios from "@/app/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCategories = createAsyncThunk(
  "getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $axios.get<any>("/getAllCategories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getCategoriesWithCity = createAsyncThunk(
  "getCategoriesWithCity",
  async ({ city }: { city: number }, { rejectWithValue }) => {
    try {
      const response = await $axios.get<any>(
        `/getCategoriesWithCity?city=${city}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllCategories.pending, (state) => {})
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
      .addCase(getAllCategories.rejected, (state, action) => {})
      .addCase(getCategoriesWithCity.pending, (state) => {})
      .addCase(getCategoriesWithCity.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
      .addCase(getCategoriesWithCity.rejected, (state, action) => {}),
});
