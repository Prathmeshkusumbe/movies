const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  watchList: [],
  fav:[],
}

export const authSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    updateWatchList: (state, action) => {
      state.watchList.push(action.payload);
    },
    removeFromWatchList: (state, action) => {
      const wToRemove = action.payload;
      state.watchList = state.watchList.filter(w => w.id !== wToRemove);
    },
    addToFavList: (state, action) => {
      state.fav.push(action.payload);
    },
    removeFromFav: (state, action) => {
      const mToRemove = action.payload;
      state.fav = state.fav.filter(w => w.id !== mToRemove);
    },
  }
})

export const {
  updateWatchList,
  removeFromWatchList,
  addToFavList,
  removeFromFav
} = authSlice.actions;

export default authSlice.reducer;