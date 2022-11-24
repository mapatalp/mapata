import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth";
import userSlice from "./slice/user";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});

export { store };
