import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCategories: [],
};

export const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    getAllSubCategory: (state, action) => {
      state.subCategories = action.payload;
    },
    fetchLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllSubCategory, fetchLoading } = subCategorySlice.actions;

export default subCategorySlice.reducer;
