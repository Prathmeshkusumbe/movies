import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loginUserInfo: []
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateLoginUser: (state, action) => {
      state.loginUserInfo = action.payload;
    }
  }
})

export const {
  updateLoginUser,
} = mainSlice.actions;

export default mainSlice.reducer;