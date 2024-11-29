"use client";

import $axios from "@/app/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface initialState {
  users: any;
  filters: {
    isRatingOrder: boolean;
    isCommentsOrder: boolean;
  };
}
const initialState: initialState = {
  users: null,
  filters: {
    isRatingOrder: false,
    isCommentsOrder: false,
  },
};

export const getAllUsers = createAsyncThunk(
  "userComments",
  async (
    {
      perPage,
      page,
      isRatingOrder,
    }: { perPage: number; page: number; isRatingOrder?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await $axios.get<any>(
        `/getUsersWithPagination?per_page=${perPage}&page=${page}${
          isRatingOrder ? "&sortByRating=" + isRatingOrder : ""
        }`
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
export const getUsersWithCityAndCategory = createAsyncThunk(
  "getUsersWithCityAndCategory",
  async (
    {
      city_id,
      category_id,
      perPage,
      page,
    }: { city_id: number; category_id: number; perPage: number; page: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await $axios.get<any>(
        `/getUsersWithCityAndCategory?city=${city_id}&category=${category_id}&per_page=${perPage}&page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getUsersWithCity = createAsyncThunk(
  "getUsersWithCity",
  async (
    {
      city_id,
      perPage,
      page,
    }: { city_id: number; perPage: number; page: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await $axios.get<any>(
        `/getUsersWithCity?city=${city_id}&per_page=${perPage}&page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setRatingFilter: (state, action) => {
      state.filters.isRatingOrder = action.payload;
    },
  },
});
export const {
  setRatingFilter,
}: {
  setRatingFilter: any;
} = usersSlice.actions;
