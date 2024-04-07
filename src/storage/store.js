import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
