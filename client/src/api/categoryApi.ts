


// import { createApi } from "@reduxjs/toolkit/query/react";
// import { axiosBaseQuery } from "./axiosBaseQuery";
// import { type Category } from "./types/category";

// export const categoryApi = createApi({
//     reducerPath: "categoryApi",
//     baseQuery: axiosBaseQuery(),
//     tagTypes: ["Category"],
//     endpoints: (builder) => ({
//         createCategory: builder.mutation({
//             query: (body) => ({ url: "/categories", method: "POST", data: body }),
//             invalidatesTags: ["Category"],
//         }),
//         getCategories: builder.query<Category[], void>({
//             query: () => ({ url: "/categories", method: "GET" }),
//             providesTags: ["Category"],
//         }),

//         // getCategories: builder.query<Category[], void>({
//         //     query: () => ({ url: "/categories", method: "GET" }),
//         //     transformResponse: (response: any) => response.categories || [],
//         //     providesTags: ["Category"],
//         // }),

//         updateCategory: builder.mutation<any, { id: string; name: string; image?: string }>({
//             query: ({ id, ...body }) => ({ url: `/categories/${id}`, method: "PUT", data: body }),
//             invalidatesTags: ["Category"],
//         }),
//         deleteCategory: builder.mutation<any, string>({
//             query: (id) => ({ url: `/categories/${id}`, method: "DELETE" }),
//             invalidatesTags: ["Category"],
//         }),

//     }),
// });

// export const {
//     useCreateCategoryMutation,
//     useGetCategoriesQuery,
//     useUpdateCategoryMutation,
//     useDeleteCategoryMutation,
// } = categoryApi;



// src/api/categoryApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { type Category } from "./types/category";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (body) => ({ url: "/categories", method: "POST", data: body }),
      invalidatesTags: ["Category"],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => ({ url: "/categories", method: "GET" }),
      transformResponse: (response: any) => response.categories || [],
      providesTags: ["Category"],
    }),
    updateCategory: builder.mutation<any, { id: string; name: string; image?: string }>({
      query: ({ id, ...body }) => ({ url: `/categories/${id}`, method: "PUT", data: body }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<any, string>({
      query: (id) => ({ url: `/categories/${id}`, method: "DELETE" }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
