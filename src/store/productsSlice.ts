import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Buy } from "@/types/Buy";
import { AppState } from "./store";

export interface ProductsState {
  productsList: Buy[];
}

const initialState: ProductsState = {
  productsList: [],
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsList(state, action) {
      state.productsList = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.products,
      };
    },
  },
});

export const { setProductsList } = productsSlice.actions;
export const selectProductsState = (state: AppState) => state.products;
export default productsSlice.reducer;
