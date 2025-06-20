import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

export interface AuthState {
  user : {
    username : string,
    email : string
  } | null
} 

const initialState : AuthState = {
  user: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<{username : string, email : string}>) => {
      state.user = action.payload;

      console.log("set user as " + JSON.stringify(state.user))
    }
  }
});

export const { resetUser, setUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer;