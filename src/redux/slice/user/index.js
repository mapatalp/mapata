import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  ownPublications: [],
  favorites: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.data = payload;
    },
    addPublication: (state, { payload }) => {
      state.ownPublications.unshift(payload);
    },
    addFavorite: (state, { payload }) => {
      state.favorites.unshift(payload);
    },
    clear: (state) => {
      state.data = {};
      state.ownPublications = [];
      state.favorites = [];
    },
  },
});

const { actions, reducer } = userSlice;

export const { setUser, clear, addFavorite, addPublication } = actions;
export default reducer;
