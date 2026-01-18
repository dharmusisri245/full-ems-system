


// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { rootReducer } from "./rootReducer";

// import { authApi } from "@/api/authApi";
// import { categoryApi } from "@/api/categoryApi";
// import { subCategoryApi } from "@/api/subCategoryApi";
// import { productApi } from "@/api/productApi";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefault) =>
//     getDefault({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     })
//       .concat(authApi.middleware)
//       .concat(categoryApi.middleware)
//       .concat(subCategoryApi.middleware)
//       .concat(productApi.middleware),
// });

// export const persistor = persistStore(store);

// export type AppDispatch = typeof store.dispatch;
// export type RootStateType = ReturnType<typeof store.getState>;













//========================upadted leatest code =======================================================
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { rootReducer } from "./rootReducer";
import { authApi } from "@/api/authApi";
import { categoryApi } from "@/api/categoryApi";
import { subCategoryApi } from "@/api/subCategoryApi";
import { productApi } from "@/api/productApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only user persists
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware)
      .concat(categoryApi.middleware)
      .concat(subCategoryApi.middleware)
      .concat(productApi.middleware),

});

export const persistor = persistStore(store);

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
