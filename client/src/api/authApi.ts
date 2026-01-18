
// import { createApi } from "@reduxjs/toolkit/query/react";
// import { axiosBaseQuery } from "./axiosBaseQuery";
// import { type User } from "./types/authTypes";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: axiosBaseQuery(),
//   tagTypes: ["Auth", "User"],
//   endpoints: (builder) => ({
//     // REGISTER
//     registerUser: builder.mutation<any, FormData>({
//       query: (formData) => ({
//         url: "/auth/register",
//         method: "POST",
//         data: formData,
//       }),
//       invalidatesTags: ["User"],
//     }),

//     // VERIFY OTP
//     verifyOtp: builder.mutation<any, { email: string; otp: string }>({
//       query: (body) => ({
//         url: "/auth/login-with-otp",
//         method: "POST",
//         data: body,
//       }),
//     }),

//     // LOGIN
//     loginUser: builder.mutation<any, { email: string; password: string }>({
//       query: (body) => ({
//         url: "/auth/login",
//         method: "POST",
//         data: body,
//       }),
//     }),

//     // FORGOT PASSWORD
//     forgotPassword: builder.mutation<any, { email: string }>({
//       query: (body) => ({
//         url: "/auth/forgot-password",
//         method: "POST",
//         data: body,
//       }),
//     }),

//     // RESEND OTP
//     resendOtp: builder.mutation<any, { email: string }>({
//       query: (body) => ({
//         url: "/auth/resend-otp",
//         method: "POST",
//         data: body,
//       }),
//     }),

//     // RESET PASSWORD
//     resetPassword: builder.mutation<
//       any,
//       { email: string; otp: string; newPassword: string }
//     >({
//       query: (body) => ({
//         url: "/auth/reset-password",
//         method: "POST",
//         data: body,
//       }),
//     }),

//     // GET ALL USERS
//     getUsers: builder.query<User[], void>({
//       query: () => ({
//         url: "/auth/users",
//         method: "GET",
//       }),
//       providesTags: ["User"],
//     }),

//     // UPDATE USER (role, category, subCategory, permissions)
//     updateUser: builder.mutation<any, { id: string; data: Partial<User> }>({
//       query: ({ id, data }) => ({
//         url: `/auth/users/${id}`,
//         method: "PATCH",
//         data,
//       }),
//       invalidatesTags: ["User"],
//     }),

//     // DELETE USER
//     deleteUser: builder.mutation<any, string>({
//       query: (id) => ({
//         url: `/auth/users/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["User"],
//     }),

//     // ADMIN CREATE USER
//     adminCreateUser: builder.mutation<any, FormData>({
//       query: (formData) => ({
//         url: "/auth/admin-create-user",
//         method: "POST",
//         data: formData,
//       }),
//       invalidatesTags: ["User"],
//     }),
//   }),
// });

// export const {
//   useRegisterUserMutation,
//   useVerifyOtpMutation,
//   useLoginUserMutation,
//   useForgotPasswordMutation,
//   useResendOtpMutation,
//   useResetPasswordMutation,
//   useGetUsersQuery,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
//   useAdminCreateUserMutation,
// } = authApi;



//===================UPDATED AUTHAPI ================================



// import { createApi } from "@reduxjs/toolkit/query/react";
// import { axiosBaseQuery } from "./axiosBaseQuery";
// import { type User } from "./types/authTypes";
// import { clearAccessToken, clearCurrentUser, setAccessToken, setCurrentUser } from "./AxiosInstace";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: axiosBaseQuery(),
//   tagTypes: ["User", "Auth"],

//   endpoints: (builder) => ({
//     // loginUser: builder.mutation<any, { email: string; password: string }>({

//     //   query: (body) => ({
//     //     url: "/auth/login",
//     //     method: "POST",
//     //     data: body,
//     //   }),
//     //   transformResponse: (res) => {
//     //     setAccessToken(res.token);
//     //     return res;
//     //   },
//     // }),
//     loginUser: builder.mutation<any, { email: string; password: string }>({
//       query: (body) => ({
//         url: "/auth/login",
//         method: "POST",
//         data: body,
//       }),
//       transformResponse: (res) => {
//         setAccessToken(res.token);
//         setCurrentUser(res.user); 
//         return res;
//       },
//     }),
//     // logoutUser: builder.mutation<any, void>({
//     //   query: () => ({
//     //     url: "/auth/logout",
//     //     method: "POST",
//     //     withCredentials: true, // important if you use cookies
//     //   }),
//     // }),

//     logoutUser: builder.mutation<any, void>({
//       query: () => ({
//         url: "/auth/logout",
//         method: "POST",
//         withCredentials: true,
//       }),
//       transformResponse: () => {
//         clearAccessToken();
//         clearCurrentUser(); 
//       }
//     }),
//     registerUser: builder.mutation<any, FormData>({
//       query: (formData) => ({
//         url: "/auth/register",
//         method: "POST",
//         data: formData,
//       }),
//     }),

//     verifyOtp: builder.mutation<any, { email: string; otp: string }>({
//       query: (body) => ({
//         url: "/auth/login-with-otp",
//         method: "POST",
//         data: body,
//       }),
//     }),

//     forgotPassword: builder.mutation<any, { email: string }>({
//       query: (body) => ({
//         url: "/auth/forgot-password",
//         method: "POST",
//         data: body,
//       }),
//     }),

//     resetPassword: builder.mutation<any, { email: string; otp: string; newPassword: string }>({
//       query: (body) => ({
//         url: "/auth/reset-password",
//         method: "POST",
//         data: body,
//       }),
//     }),

//     resendOtp: builder.mutation<any, { email: string }>({
//       query: (body) => ({
//         url: "/auth/resend-otp",
//         method: "POST",
//         data: body,
//       }),
//     }),

//     refreshToken: builder.query<{ accessToken: string }, void>({
//       query: () => ({
//         url: "/auth/refresh-token",
//         method: "GET",
//       }),
//       transformResponse: (res) => {
//         setAccessToken(res.accessToken);
//         return res;
//       },
//     }),

//     getUsers: builder.query<User[], void>({
//       query: () => ({
//         url: "/auth/users",
//         method: "GET",
//       }),
//       providesTags: ["User"],
//     }),

//     updateUser: builder.mutation<any, { id: string; data: Partial<User> }>({
//       query: ({ id, data }) => ({
//         url: `/auth/users/${id}`,
//         method: "PATCH",
//         data,
//       }),
//       invalidatesTags: ["User"],
//     }),

//     deleteUser: builder.mutation<any, string>({
//       query: (id) => ({
//         url: `/auth/users/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["User"],
//     }),

//     adminCreateUser: builder.mutation<any, FormData>({
//       query: (formData) => ({
//         url: "/auth/admin-create-user",
//         method: "POST",
//         data: formData,
//       }),
//       invalidatesTags: ["User"],
//     }),
//   }),
// });

// export const {
//   useLoginUserMutation,
//   useRegisterUserMutation,
//   useVerifyOtpMutation,
//   useForgotPasswordMutation,
//   useResetPasswordMutation,
//   useResendOtpMutation,
//   useRefreshTokenQuery,
//   useGetUsersQuery,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
//   useAdminCreateUserMutation,
//   useLogoutUserMutation
// } = authApi;


// src/api/authApi.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { type User } from "./types/authTypes";

import {
  setAccessToken,
  setCurrentUser,
  clearAccessToken,
  clearCurrentUser,
} from "@/api/AxiosInstace";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User", "Auth"],

  endpoints: (builder) => ({
    // ================================
    // LOGIN
    // ================================
    loginUser: builder.mutation<
      { token: string; user: User },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        data: body,
      }),

      transformResponse: (res: any) => {
        setAccessToken(res.token); // ⬅ memory token
        setCurrentUser(res.user); // ⬅ store user in localStorage
        return res;
      },
    }),

    // ================================
    // LOGOUT
    // ================================
    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        withCredentials: true,
      }),

      transformResponse: () => {
        clearAccessToken();
        clearCurrentUser();
      },
    }),

    // ================================
    // REGISTER
    // ================================
    registerUser: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/auth/register",
        method: "POST",
        data: formData,
      }),
    }),

    // ================================
    // OTP LOGIN
    // ================================
    verifyOtp: builder.mutation<any, { email: string; otp: string }>({
      query: (body) => ({
        url: "/auth/login-with-otp",
        method: "POST",
        data: body,
      }),

      transformResponse: (res: any) => {
        if (res.token) setAccessToken(res.token);
        if (res.user) setCurrentUser(res.user);
        return res;
      },
    }),

    // ================================
    // FORGOT / RESET
    // ================================
    forgotPassword: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: body,
      }),
    }),

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

    resendOtp: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        data: body,
      }),
    }),

    // ================================
    // REFRESH TOKEN
    // ================================
    refreshToken: builder.query<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "GET",
      }),

      transformResponse: (res) => {
        setAccessToken(res.accessToken);
        return res;
      },
    }),

    // ================================
    // ADMIN — GET USERS
    // ================================
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation<any, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/auth/users/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    adminCreateUser: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/auth/admin-create-user",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
  useRefreshTokenQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAdminCreateUserMutation,
} = authApi;




