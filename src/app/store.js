import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

// Store Redux
export const store = configureStore({
  reducer: {
    auth: authReducer, // Tambahkan slice auth ke store
  },
});
