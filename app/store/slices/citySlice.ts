"use client";

import $axios from "@/app/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface City {
  id: number;
  city: string;
  alias: string;
  title_seo: string;
  description_seo: string;
  keywords_seo: string;
  created_at: string;
  updated_at: string;
}

export const getAllCities = createAsyncThunk(
  "getCities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $axios.get<any>("/cities");
      return response.data.cities;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const citySlice = createSlice({
  name: "city",
  initialState: {
    cities: null,
  },
  reducers: {
    setCities: (state, action) => {
      state.cities = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllCities.pending, (state) => {})
      .addCase(getAllCities.fulfilled, (state, action) => {})
      .addCase(getAllCities.rejected, (state, action) => {}),
});
