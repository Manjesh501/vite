import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  countryCode: '+1',
  phoneNumber: '',
  otp: '',
  countries: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.countryCode = '+1';
      state.phoneNumber = '';
      state.otp = '';
    },
  },
});

export const {
  setAuthenticated,
  setUser,
  setCountryCode,
  setPhoneNumber,
  setOtp,
  setCountries,
  logout,
} = authSlice.actions;

export default authSlice.reducer;