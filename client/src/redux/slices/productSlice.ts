// import { createSlice,  type PayloadAction } from "@reduxjs/toolkit";
// import { Product } from "@/api/types/product";

// interface ProductState {
//   products: Product[];
//   selectedProduct: Product | null;
// }

// const initialState: ProductState = {
//   products: [],
//   selectedProduct: null,
// };

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     setProducts: (state, action: PayloadAction<Product[]>) => {
//       state.products = action.payload;
//     },
//     setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
//       state.selectedProduct = action.payload;
//     },
//   },
// });

// export const { setProducts, setSelectedProduct } = productSlice.actions;
// export default productSlice.reducer;




import { createSlice,  type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "@/api/types/product";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProducts, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
