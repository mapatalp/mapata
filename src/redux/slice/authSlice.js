import { createSlice } from "@reduxjs/toolkit";
import { setStatusBarBackgroundColor } from "expo-status-bar";

const initialState = {
  // States iniciales
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
