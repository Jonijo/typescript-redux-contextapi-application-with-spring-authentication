import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../services/apiCalls';

const initialState = {
  usersList: [],
  loading: false,
  error: null
};

export const fetchData = createAsyncThunk(
  'users/fetchData',
  async () => {

        return getUsers();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetState: (state) => {
      state.usersList = [];
      state.loading = false;
      state.error = null;
    },
    setData: (state, action) => {
      state.usersList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { resetState, setData } = usersSlice.actions;
export default usersSlice.reducer;