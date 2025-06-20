import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../services/apiCalls';
import type { RootState } from '../app/store'

export interface User {
  id: number,
  email: string,
  username: string;
  avatar : string;
} 

export interface UsersState {
  usersList: User[],
  loading: boolean,
  error: string | null ;
} 

const initialState : UsersState = {
  usersList: [],
  loading: false,
  error: null 
};

export const fetchUsersList = createAsyncThunk(
  'users/fetchUsersList',
  async () => {

        return getUsers();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsersList: (state) => {
      state.usersList = [];
      state.loading = false;
      state.error = null;
    },
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload;
      })
      .addCase(fetchUsersList.rejected, (state, action) => 
        {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const { resetUsersList, setUsersList } = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUsersList = (state: RootState) => state.users.usersList

export default usersSlice.reducer;