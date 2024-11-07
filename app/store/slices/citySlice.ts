"use client";

import $axios from "@/app/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCities = createAsyncThunk(
  "getCities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $axios.get<any>("/getAllCities");
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
      .addCase(getAllCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(getAllCities.rejected, (state, action) => {}),
});
