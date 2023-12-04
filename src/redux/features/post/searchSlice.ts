import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Posts: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchPosts: (state, action) => {
      state.Posts = action.payload;
    },
  },
});

export const { setSearchPosts } = searchSlice.actions;
export default searchSlice.reducer;
