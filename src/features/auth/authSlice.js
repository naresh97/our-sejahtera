import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isAuthenticated: Cookies.get('authorized'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state, action) => {
      state.isAuthenticated = true;
    },
    authLogout: state => {
      state.isAuthenticated = false;
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;

export default authSlice.reducer;
