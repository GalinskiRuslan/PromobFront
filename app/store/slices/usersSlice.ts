"use client";

import $axios from "@/app/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk(
  "userComments",
  async (
    { perPage, page }: { perPage: number; page: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await $axios.get<any>(
        `/getUsersWithPagination?per_page=${perPage}&page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getAllUsersWihtCategory = createAsyncThunk(
  "userComments",
  async (
    {
      category_id,
      perPage,
      page,
    }: { category_id: number; perPage: number; page: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await $axios.get<any>(
        `/getUsersWithCategory?category=${category_id}&per_page=${perPage}&page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getUserInfoById = createAsyncThunk(
  "getUserInfoById",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const response = await $axios.get<any>(`/getUserById?id=${id}`);
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
