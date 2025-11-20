// // src/redux/rootReducer.ts
// import { combineReducers } from "redux";
// import authReducer from "../redux/slices/authSlices";
// import { authApi } from "../api/authApi";
// import subCategoryReducer from "../redux/slices/subCategory";
// export const rootReducer = combineReducers({
//   auth: authReducer,
//   subCategory:subCategoryReducer,
//   [authApi.reducerPath]: authApi.reducer,
// });

// export type RootState = ReturnType<typeof rootReducer>;




// import categoryReducer from "./slices/categorySlice";
// import subCategoryReducer from "./slices/subCategory";
// import productReducer from "./slices/productSlice";

// import { categoryApi } from "../api/categoryApi";
// import { subCategoryApi } from "../api/subCategoryApi";
// import { productApi } from "../api/productApi";
// import authReducer from "./slices/authSlices";
// import { authApi } from "../api/authApi";
// import { combineReducers } from "redux";
// export const rootReducer = combineReducers({
//   auth: authReducer,

//   category: categoryReducer,
//   subCategory: subCategoryReducer,
//   product: productReducer,

//   [authApi.reducerPath]: authApi.reducer,
//   [categoryApi.reducerPath]: categoryApi.reducer,
//   [subCategoryApi.reducerPath]: subCategoryApi.reducer,
//   [productApi.reducerPath]: productApi.reducer,
// });




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
