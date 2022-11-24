import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const publicationSlice = createSlice({
  name: "publication",
  initialState,
  reducers: {
    setAllPublications: (state, { payload }) => {
      state.data = payload;
    },
  },
});

const { actions, reducer } = publicationSlice;

export const { setAllPublications } = actions;
export default reducer;
