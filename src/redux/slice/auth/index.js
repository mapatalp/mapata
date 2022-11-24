import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (loggedIn) => {
      state.loggedIn = loggedIn;
    },
  },
});

const { actions, reducer } = authSlice;

export const { setLoggedIn } = actions;
export default reducer;
