// import { createSlice,  type PayloadAction } from "@reduxjs/toolkit";
// import { Category } from "@/api/types/category";

// interface CategoryState {
//   categories: Category[];
//   selectedCategory: string | null;
// }

// const initialState: CategoryState = {
//   categories: [],
//   selectedCategory: null,
// };

// const categorySlice = createSlice({
//   name: "category",
//   initialState,
//   reducers: {
//     setCategories: (state, action: PayloadAction<Category[]>) => {
//       state.categories = action.payload;
//     },
//     setSelectedCategory: (state, action: PayloadAction<string | null>) => {
//       state.selectedCategory = action.payload;
//     },
//   },
// });

// export const { setCategories, setSelectedCategory } = categorySlice.actions;
// export default categorySlice.reducer;



import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {  type Category } from "../../api/types/category";

interface CategoryState {
  categories: Category[];
  selectedCategory: string | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategories, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
