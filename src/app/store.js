import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import covidSlice from '../features/auth/covidSlice';
import langSlice from '../features/auth/langSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    covid: covidSlice,
    lang: langSlice,
  },
});
