import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import otpVerificationReducer from './Auth/otpSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    otpVerification: otpVerificationReducer,
    // other reducers...
  },
});