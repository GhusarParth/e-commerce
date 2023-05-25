import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getAllCategory: (state, action) => {
      state.categories = action.payload;
    },
    fetchLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllCategory, fetchLoading } = categorySlice.actions;

export default categorySlice.reducer;
