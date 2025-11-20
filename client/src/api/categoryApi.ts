// import { createApi } from "@reduxjs/toolkit/query/react";
// import { axiosBaseQuery } from "./axiosBaseQuery";
// import {
//   Category,
//   CreateCategoryDto,
//   UpdateCategoryDto,
// } from "./types/category";

// export const categoryApi = createApi({
//   reducerPath: "categoryApi",
//   baseQuery: axiosBaseQuery(),
//   tagTypes: ["Category"],

//   endpoints: (builder) => ({
//     // GET ALL
//     getCategories: builder.query<Category[], void>({
//       query: () => ({ url: "/category", method: "GET" }),
//       providesTags: ["Category"],
//     }),

//     // CREATE
//     createCategory: builder.mutation<Category, CreateCategoryDto>({
//       query: (data) => ({
//         url: "/category",
//         method: "POST",
//         data,
//       }),
//       invalidatesTags: ["Category"],
//     }),

//     // UPDATE
//     updateCategory: builder.mutation<Category, UpdateCategoryDto>({
//       query: ({ id, ...rest }) => ({
//         url: `/category/${id}`,
//         method: "PUT",
//         data: rest,
//       }),
//       invalidatesTags: ["Category"],
//     }),

//     // DELETE
//     deleteCategory: builder.mutation<{ message: string }, string>({
//       query: (id) => ({
//         url: `/category/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Category"],
//     }),
//   }),
// });

// export const {
//   useGetCategoriesQuery,
//   useCreateCategoryMutation,
//   useUpdateCategoryMutation,
//   useDeleteCategoryMutation,
// } = categoryApi;



import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { type Category } from "./types/category";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        createCategory: builder.mutation<any, { name: string; image?: string }>({
            query: (body) => ({ url: "/category", method: "POST", data: body }),
            invalidatesTags: ["Category"],
        }),
        getCategories: builder.query<Category[], void>({
            query: () => ({ url: "/category", method: "GET" }),
            providesTags: ["Category"],
        }),
        updateCategory: builder.mutation<any, { id: string; name: string; image?: string }>({
            query: ({ id, ...body }) => ({ url: `/category/${id}`, method: "PUT", data: body }),
            invalidatesTags: ["Category"],
        }),
        deleteCategory: builder.mutation<any, string>({
            query: (id) => ({ url: `/category/${id}`, method: "DELETE" }),
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
