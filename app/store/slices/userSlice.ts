"use client";

import $axios from "@/app/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateUserContact = createAsyncThunk(
  "updateUserContact",
  async (
    {
      name,
      surname,
      surname_2,
      nickname,
      nickname_true,
      instagram,
      whatsapp,
      site,
    }: {
      name: string;
      surname: string;
      surname_2: string;
      nickname: string;
      nickname_true: boolean;
      instagram: string;
      whatsapp: string;
      site: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await $axios.post<any>(`/updateContacts`, {
        name,
        surname,
        surname_2,
        nickname,
        nickname_true,
        instagram,
        whatsapp,
        site,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateInfoUser = createAsyncThunk(
  "updateUserInfo",
  async (
    {
      cost_from,
      cost_up,
      details,
      about_yourself,
      cities_id,
      language,
      categories_id,
    }: {
      cost_from: number;
      cost_up: number;
      details: string;
      about_yourself: string;
      cities_id: number;
      language: any;
      categories_id: Array<string>;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await $axios.post<any>(`/updateInfoAboutUser`, {
        cost_from,
        cost_up,
        details,
        about_yourself,
        cities_id,
        language,
        categories_id,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const uploadProfilePhoto = createAsyncThunk(
  "uploadProfilePhoto",
  async (data: any, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", data);
    try {
      const response = await $axios.post<any>(`/uploadAvatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const uploadPortfolioPhoto = createAsyncThunk(
  "uploadPortfolioPhoto",
  async (data: any, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", data);
    try {
      const response = await $axios.post<any>(`/savePortfolioItem`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deletePortfolioPhoto = createAsyncThunk(
  "uploadPortfolioPhoto",
  async (fileName: string, { rejectWithValue }) => {
    try {
      const response = await $axios.post<any>(`/deletePortfolioItem`, {
        fileName,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const userStatistic = createAsyncThunk(
  "userStatistic",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $axios.get<any>(`/getStatistic`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const userComments = createAsyncThunk(
  "userComments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $axios.get<any>(`/getComments`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContactsViewCount = createAsyncThunk(
  "addContactsViewCount",
  async ({ user_id }: { user_id: number }, { rejectWithValue }) => {
    try {
      const response = await $axios.get<any>(
        `/clickContacts?user_id=${user_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const changeRating = createAsyncThunk(
  "changeRating",
  async (
    { user_id, rating }: { user_id: number; rating: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await $axios.post<any>(`/ratingUpdate`, {
        rated_user_id: user_id,
        rating,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
