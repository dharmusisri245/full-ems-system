import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AdminUIState {
  activeTab: "products" | "category" | "dashboard";
}

const initialState: AdminUIState = {
  activeTab: "dashboard",
};

const adminUISlice = createSlice({
  name: "adminUI",
  initialState,
  reducers: {
    setActiveTab: (
      state,
      action: PayloadAction<"products" | "category" | "dashboard">
    ) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = adminUISlice.actions;
export default adminUISlice.reducer;
