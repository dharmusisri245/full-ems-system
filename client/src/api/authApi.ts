// src/api/auth.api.ts
import axiosInstance from "./AxiosInstace";
import { LoginPayload, RegisterPayload, ResetPasswordPayload } from "./types/authTypes";

export const loginAPI = async (data: LoginPayload) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const registerAPI = async (data: RegisterPayload) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const forgotPasswordAPI = async (email: string) => {
  const res = await axiosInstance.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPasswordAPI = async (data: ResetPasswordPayload) => {
  const res = await axiosInstance.post("/auth/reset-password", data);
  return res.data;
};
