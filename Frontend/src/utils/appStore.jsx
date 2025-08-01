// src/appstore.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";
import { saveState, loadState } from "./localStorage";

const preloadedState = loadState(); // 👈 Load from localStorage

const appstore = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer,
  },
  preloadedState,
});

appstore.subscribe(() => {
  const state = appstore.getState();
  saveState({
    cart: state.cart,
    checkout: state.checkout,
  });
});

export default appstore;
