import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isAuthenticated: Cookies.get('authorized') == "true" ? true : false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: state => {
      state.isAuthenticated = true;
      Cookies.set('authorized', true);
    },
    authLogout: state => {
      state.isAuthenticated = false;
      Cookies.set('authorized', false);
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;

export default authSlice.reducer;
