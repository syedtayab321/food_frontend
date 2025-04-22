import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../Api/apiConfig';

// Verify OTP after signup
export const verifySignupOtp = createAsyncThunk(
  'otp/verifySignupOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/verify-otp/', { email, otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Resend OTP for signup verification
export const resendSignupOtp = createAsyncThunk(
  'otp/resendSignupOtp',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/resend-otp/', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  email: '',
  otp: '',
  loading: false,
  verifyLoading: false,
  resendLoading: false,
  error: null,
  resendError: null,
  success: false,
  resendSuccess: false,
  resendCooldown: 0, // in seconds
  isVerified: false,
  token: null,
};

const otpVerificationSlice = createSlice({
  name: 'otpVerification',
  initialState,
  reducers: {
    setVerificationEmail: (state, action) => {
      state.email = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    clearOtpState: (state) => {
      state.otp = '';
      state.error = null;
      state.resendError = null;
      state.success = false;
      state.resendSuccess = false;
    },
    updateResendCooldown: (state, action) => {
      state.resendCooldown = action.payload;
    },
    resetVerification: (state) => {
      return { ...initialState, email: state.email };
    },
  },
  extraReducers: (builder) => {
    builder
      // Verify OTP cases
      .addCase(verifySignupOtp.pending, (state) => {
        state.verifyLoading = true;
        state.error = null;
      })
      .addCase(verifySignupOtp.fulfilled, (state, action) => {
        state.verifyLoading = false;
        state.isVerified = true;
        state.token = action.payload.token;
        state.success = true;
      })
      .addCase(verifySignupOtp.rejected, (state, action) => {
        state.verifyLoading = false;
        state.error = action.payload;
      })

      // Resend OTP cases
      .addCase(resendSignupOtp.pending, (state) => {
        state.resendLoading = true;
        state.resendError = null;
      })
      .addCase(resendSignupOtp.fulfilled, (state) => {
        state.resendLoading = false;
        state.resendSuccess = true;
        state.resendCooldown = 60; // Reset cooldown to 60 seconds
      })
      .addCase(resendSignupOtp.rejected, (state, action) => {
        state.resendLoading = false;
        state.resendError = action.payload;
      });
  },
});

export const {
  setVerificationEmail,
  setOtp,
  clearOtpState,
  updateResendCooldown,
  resetVerification,
} = otpVerificationSlice.actions;

export default otpVerificationSlice.reducer;