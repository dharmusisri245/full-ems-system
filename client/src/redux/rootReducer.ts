




import { combineReducers } from "redux";
import authReducer from "./slices/authSlices";
import categoryReducer from "./slices/categorySlice";
import subCategoryReducer from "./slices/subCategory";
import productReducer from "./slices/productSlice";

import { authApi } from "@/api/authApi";
import { categoryApi } from "@/api/categoryApi";
import { subCategoryApi } from "@/api/subCategoryApi";
import { productApi } from "@/api/productApi";

export const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  subCategory: subCategoryReducer,
  product: productReducer,

  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [subCategoryApi.reducerPath]: subCategoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
