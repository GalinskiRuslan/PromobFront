"use client";

import $axios from "@/app/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk(
  "userComments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $axios.get<any>(`/getAllUsers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getAllUsersWihtCategory = createAsyncThunk(
  "userComments",
  async ({ category_id }: { category_id: number }, { rejectWithValue }) => {
    try {
      const response = await $axios.get<any>(
        `/getUsersWithCategory?category=${category_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.user = action.payload;
    },
  },
});