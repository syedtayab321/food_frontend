import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../Api/apiConfig';

// Async thunk for seller registration
export const registerSeller = createAsyncThunk(
  'sellerRegistration/register',
  async (sellerData, { rejectWithValue }) => {
    try {
      console.log(sellerData)
      const response = await api.post('/auth/upgrade-seller/', sellerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const sellerRegistrationSlice = createSlice({
  name: 'sellerRegistration',
  initialState,
  reducers: {
    resetRegistrationStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerSeller.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerSeller.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetRegistrationStatus } = sellerRegistrationSlice.actions;

// Selectors
export const selectRegistrationStatus = (state) => state.sellerRegistration.status;
export const selectRegistrationError = (state) => state.sellerRegistration.error;

export default sellerRegistrationSlice.reducer;