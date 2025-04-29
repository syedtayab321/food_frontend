import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import otpVerificationReducer from './Auth/otpSlice';
import categoryReducer from './MenuItems/categorySlice';
import menuItemReducer from './MenuItems/menuItemSlice';
import ordersReducer from './Orders/ordersSlice';
import reviewsReducer from './Reviews/vendorReviewsSlice';
import sellerReducer from './Auth/sellerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    otpVerification: otpVerificationReducer,
    categories: categoryReducer,
    menuItems : menuItemReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
    sellerRegistration: sellerReducer,
    // other reducers...
  },
});