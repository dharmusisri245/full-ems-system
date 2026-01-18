

import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { type Product } from "./types/product";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation<any, FormData>({
      query: (formData) => ({ url: "/products", method: "POST", data: formData }),
      invalidatesTags: ["Product"],
    }),
    getProducts: builder.query<Product[], { categoryId?: string; subCategoryId?: string } | void>({
      query: (params) => ({ url: "/products", method: "GET", params }),
      providesTags: ["Product"],
    }),
    // updateProduct: builder.mutation<any, { id: string; data: FormData }>({
    //   query: ({ id, data }) => ({ url: `/products/${id}`, method: "PUT", data }),
    //   invalidatesTags: ["Product"],
    // }),
    updateProduct: builder.mutation<any, { id: string; data: FormData }>({
      query: ({ id, data }) => ({ url: `/products/${id}`, method: "PUT", data }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
