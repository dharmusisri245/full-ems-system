// import { createApi } from "@reduxjs/toolkit/query/react";
// import { axiosBaseQuery } from "./axiosBaseQuery";
// import {
//   CreateProductDto,
//   Product,
//   UpdateProductDto,
// } from "./types/product";

// export const productApi = createApi({
//   reducerPath: "productApi",
//   baseQuery: axiosBaseQuery(),
//   tagTypes: ["Product"],

//   endpoints: (builder) => ({
//     // GET ALL PRODUCTS
//     getProducts: builder.query<Product[], void>({
//       query: () => ({ url: "/product", method: "GET" }),
//       providesTags: ["Product"],
//     }),

//     // CREATE PRODUCT
//     createProduct: builder.mutation<Product, FormData>({
//       query: (formData) => ({
//         url: "/product",
//         method: "POST",
//         data: formData,
//       }),
//       invalidatesTags: ["Product"],
//     }),

//     // UPDATE PRODUCT
//     updateProduct: builder.mutation<Product, FormData>({
//       query: (formData) => ({
//         url: "/product/update",
//         method: "PUT",
//         data: formData,
//       }),
//       invalidatesTags: ["Product"],
//     }),

//     // DELETE PRODUCT
//     deleteProduct: builder.mutation<{ message: string }, string>({
//       query: (id) => ({
//         url: `/product/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Product"],
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useDeleteProductMutation,
//   useCreateProductMutation,
//   useUpdateProductMutation,
// } = productApi;



import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { type Product } from "./types/product";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation<any, FormData>({
      query: (formData) => ({ url: "/product", method: "POST", data: formData }),
      invalidatesTags: ["Product"],
    }),
    getProducts: builder.query<Product[], { categoryId?: string; subCategoryId?: string } | void>({
      query: (params) => ({ url: "/product", method: "GET", params }),
      providesTags: ["Product"],
    }),
    updateProduct: builder.mutation<any, { id: string; data: FormData }>({
      query: ({ id, data }) => ({ url: `/product/${id}`, method: "PUT", data }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({ url: `/product/${id}`, method: "DELETE" }),
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
