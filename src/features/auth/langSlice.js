import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  lang: Cookies.get('lang'),
};

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
      Cookies.set('lang', action.payload);
    },
  },
});

export const { setLanguage } = langSlice.actions;

export default langSlice.reducer;
