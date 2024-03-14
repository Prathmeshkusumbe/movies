const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  isAuth: false,
  user: {}
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    setIsAuth : (state, action) => {
      state.isAuth = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
})

export const {
  setIsAuth,
  setUser
} = authSlice.actions;

export default authSlice.reducer;