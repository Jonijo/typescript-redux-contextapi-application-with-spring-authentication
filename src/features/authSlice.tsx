import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { isTokenExpired , getUsernameFromToken} from '../utils/tokenUtils';
import axios from 'axios';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  username : string | null;
  loading: boolean;
  error: string | null;
} 

const token = localStorage.getItem('authToken');
const validToken = token && !isTokenExpired(token);
const username = validToken && token ? getUsernameFromToken(token) : null;

const initialState : AuthState = {
  token: validToken ? token : null,
  isAuthenticated: Boolean(validToken),
  username,
  loading : false,
  error : null
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    { username, password }: { username: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { username, password });
      const token = response.data.token;
      dispatch(loginSuccess(token));
      return token;
    } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || 'Invalid credentials';
        return rejectWithValue(message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;
      state.username = getUsernameFromToken(token);
      localStorage.setItem('authToken', token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.username = null;
      state.error = null;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        // token and isAuthenticated are already set by loginSuccess
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Login failed, invalid credentials..';
        toast.error(state.error); // 👈 works but less flexible

      });
  },
});


export const { loginSuccess, logout } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.username
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthToken = (state: RootState) => state.auth.token;


export default authSlice.reducer;