// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { SubCategoryResponse } from "@/api/types/categoryType/types";

// interface SubCategoryState {
//   subCategories: SubCategoryResponse[];
//   selectedSubCategory: string | null;
// }

// const initialState: SubCategoryState = {
//   subCategories: [],
//   selectedSubCategory: null,
// };

// const subCategorySlice = createSlice({
//   name: "subCategory",
//   initialState,
//   reducers: {
//     setSubCategories: (
//       state,
//       action: PayloadAction<SubCategoryResponse[]>
//     ) => {
//       state.subCategories = action.payload;
//     },
//     setSelectedSubCategory: (state, action: PayloadAction<string | null>) => {
//       state.selectedSubCategory = action.payload;
//     },
//   },
// });

// export const { setSubCategories, setSelectedSubCategory } =
//   subCategorySlice.actions;

// export default subCategorySlice.reducer;



import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {  type SubCategory } from "../../api/types/subCategory";

interface SubCategoryState {
  subCategories: SubCategory[];
  selectedSubCategory: string | null;
}

const initialState: SubCategoryState = {
  subCategories: [],
  selectedSubCategory: null,
};

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    setSubCategories: (state, action: PayloadAction<SubCategory[]>) => {
      state.subCategories = action.payload;
    },
    setSelectedSubCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedSubCategory = action.payload;
    },
  },
});

export const { setSubCategories, setSelectedSubCategory } = subCategorySlice.actions;
export default subCategorySlice.reducer;
