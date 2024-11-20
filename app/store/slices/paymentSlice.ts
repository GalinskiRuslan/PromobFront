"use client";

import $axios from "@/app/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPaymentLink = createAsyncThunk(
  "getPaymentLink",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $axios.get<any>("/testPay");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: null,
  },
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getPaymentLink.pending, (state) => {})
      .addCase(getPaymentLink.fulfilled, (state, action) => {
        state.payments = action.payload;
      })
      .addCase(getPaymentLink.rejected, (state, action) => {}),
});
