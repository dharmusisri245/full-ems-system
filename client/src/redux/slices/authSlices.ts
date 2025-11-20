// src/redux/slices/authSlice.ts
import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import {  type User } from "../../api/types/authTypes";

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: sessionStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      sessionStorage.setItem("token", action.payload.token);
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem("token");
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setUser } = authSlice.actions;
export default authSlice.reducer;
