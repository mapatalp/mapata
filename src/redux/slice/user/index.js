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
    setPublications: (state, { payload }) => {
      state.ownPublications = payload;
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

export const { setUser, clear, addFavorite, addPublication, setPublications } =
  actions;
export default reducer;
