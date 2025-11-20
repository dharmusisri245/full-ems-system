

import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({

    // REGISTER
    registerUser: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/auth/register",
        method: "POST",
        data: formData,
      }),
    }),

    // VERIFY OTP (MISSING IN YOUR CODE)
    verifyOtp: builder.mutation<any, { email: string; otp: string }>({
      query: (body) => ({
        url: "/auth/login-with-otp",
        method: "POST",
        data: body,
      }),
    }),

    // LOGIN
    loginUser: builder.mutation<any, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        data: body,
      }),
    }),

    // FORGOT PASSWORD
    forgotPassword: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: body,
      }),
    }),

    // RESEND OTP
    resendOtp: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        data: body,
      }),
    }),

    // RESET PASSWORD
    resetPassword: builder.mutation<
      any,
      { email: string; otp: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyOtpMutation,      // <-- NEW
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
} = authApi;
