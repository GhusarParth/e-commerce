import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productImages: [],
  isLoading: false,
  isFileUploadLoading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
    },
    storeProductImages: (state, action) => {
      state.productImages = [...state.productImages, ...action.payload];
    },
    clearProductImages: (state) => {
      state.productImages = [];
    },
    deleteProductImage: (state, action) => {
      state.productImages = state.productImages.filter(
        (item) => item.url !== action.payload
      );
    },
    fetchLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    fileUploadLoading: (state, action) => {
      state.isFileUploadLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAllProducts,
  fetchLoading,
  fileUploadLoading,
  storeProductImages,
  clearProductImages,
  deleteProductImage,
} = productSlice.actions;

export default productSlice.reducer;
