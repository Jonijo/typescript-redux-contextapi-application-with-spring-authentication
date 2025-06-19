import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;

      console.log("set user as " + JSON.stringify(state.user))
    }
  }
});

export const { resetUser, setUser } = authSlice.actions;
export default authSlice.reducer;