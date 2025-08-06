// src/appstore.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";
import { saveState, loadState } from "./localStorage";
import authReducer from './authSlice'

const preloadedState = loadState(); // 👈 Load from localStorage

const appstore = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer,
    auth:authReducer
  },
  preloadedState,
});

appstore.subscribe(() => {
  const state = appstore.getState();
  saveState({
    auth:state.auth,
    cart: state.cart,
    checkout: state.checkout,
  });
});

export default appstore;
