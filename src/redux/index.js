import { configureStore } from "@reduxjs/toolkit";

// slices
import authSlice from "./slice/auth";
import userSlice from "./slice/user";
import publicationSlice from "./slice/publication";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    publication: publicationSlice,
  },
});

export { store };
