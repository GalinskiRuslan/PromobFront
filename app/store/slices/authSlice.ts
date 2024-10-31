"use client";

import $axios from "@/app/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IGetSmsResponse {
  message: string;
  code_id: string;
}
interface IRegistrationWithCodeResponse {
  message: string;
  token: string;
}

export const getSmsCode = createAsyncThunk(
  "getSmsCode",
  async ({ phone }: { phone: string }, { rejectWithValue }) => {
    try {
      const response = await $axios.get<IGetSmsResponse>(
        `/getSms?tel=${phone}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const registrWithCode = createAsyncThunk(
  "registrWithCode",
  async (
    {
      code_id,
      code,
      password,
    }: { code_id: string; code: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await $axios.post<IRegistrationWithCodeResponse>(
        "/registrationWithCode",
        {
          code_id,
          code,
          password,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const login = createAsyncThunk(
  "login",
  async (
    { phone, password }: { phone: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await $axios.post<string>(`/login`, {
        tel: phone,
        password: password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const loginWithEmail = createAsyncThunk(
  "loginWithEmail",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await $axios.post<string>(`/loginWithEmail`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $axios.post<string>(`/logout`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteAccount = createAsyncThunk(
  "deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $axios.post<string>(`/deleteAccount`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
