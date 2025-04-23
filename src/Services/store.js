import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import otpVerificationReducer from './Auth/otpSlice';
import ordersReducer from './Orders/ordersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    otpVerification: otpVerificationReducer,
    orders: ordersReducer,
    // other reducers...
  },
});