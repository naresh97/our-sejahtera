import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import covidSlice from '../features/auth/covidSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    covid: covidSlice,
  },
});
