import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import authReducer from "../auth/auth.reducer";
import categorySlice from "../category/category.reducer";
import subCategorySlice from "../subCategory/subCategory.reducer";
import productSlice from "../product/product.reducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  auth: authReducer,
  category: categorySlice,
  subCategory: subCategorySlice,
  product: productSlice,
});

export default reducer;
