

import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import {  type SubCategory } from "./types/subCategory";

export const subCategoryApi = createApi({
  reducerPath: "subCategoryApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["SubCategory"],
  endpoints: (builder) => ({
    createSubCategory: builder.mutation<any, { name: string; categoryId: string }>({
      query: (body) => ({ url: "/subcategories", method: "POST", data: body }),
      invalidatesTags: ["SubCategory"],
    }),
    getSubCategories: builder.query<SubCategory[], { categoryId?: string } | void>({
      query: (params) => ({ url: "/subcategories", method: "GET", params }),
      providesTags: ["SubCategory"],
    }),
    updateSubCategory: builder.mutation<any, { id: string; name: string; categoryId: string }>({
      query: ({ id, ...body }) => ({ url: `/subcategories/${id}`, method: "PUT", data: body }),
      invalidatesTags: ["SubCategory"],
    }),
    deleteSubCategory: builder.mutation<any, string>({
      query: (id) => ({ url: `/subcategories/${id}`, method: "DELETE" }),
      invalidatesTags: ["SubCategory"],
    }),
  }),
});

export const {
  useCreateSubCategoryMutation,
  useGetSubCategoriesQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
