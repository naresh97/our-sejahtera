import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isCovidPositive: Cookies.get('covidPositive') === 'true' ? true : false,
};

export const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {
    setCovidPositive: state => {
      state.isCovidPositive = true;
      Cookies.set('covidPositive', true);
    },
    setCovidNegative: state => {
      state.isCovidPositive = false;
      Cookies.set('covidPositive', false);
    },
  },
});

export const { setCovidPositive, setCovidNegative } = covidSlice.actions;

export default covidSlice.reducer;
