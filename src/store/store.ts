import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import { productsApi } from "./products.api";
import { productsSlice } from "./productsSlice";
import { createWrapper } from "next-redux-wrapper";

export const store = () =>
  configureStore({
    reducer: {
      [productsSlice.name]: productsSlice.reducer,
      [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: getDefaultMiddleware => 
     getDefaultMiddleware().concat(productsApi.middleware),
    devTools: true,
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThink<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export const wrapper = createWrapper<AppStore>(store);

