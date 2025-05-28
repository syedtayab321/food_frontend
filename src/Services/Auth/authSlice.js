import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Api/apiConfig';

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/jwt/create/', { email, password });
      localStorage.setItem('authToken', response.data.access);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  'auth/signup',
  async ({ email, password, re_password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register/', { email, password, re_password });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      const response = await api.get('/auth/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      // Clear token if request fails (likely invalid/expired token)
      localStorage.removeItem('authToken');
      
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async thunk to check seller status
export const checkSellerStatus = createAsyncThunk(
  'auth/checkSeller',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      const response = await api.get('/auth/profile/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const token = localStorage.getItem('authToken');

const initialState = {
  user: null,
  loading: false,
  authLoading: true, // Add this for initial auth check
  error: null,
  isAuthenticated: !!token,
  isSeller:false,
  sellerProfile: null,
  userDataLoaded: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.isAuthenticated = false;
      state.isSeller = false;
      state.sellerProfile = null;
      state.error = null;
      state.userDataLoaded = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setAuthLoading: (state, action) => {
    state.authLoading = action.payload;
  }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        // Note: We don't set user here, we'll fetch it separately
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch user data cases
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userDataLoaded = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        state.userDataLoaded = false;
      })
      
      // Check seller status cases
      .addCase(checkSellerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkSellerStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isSeller = action.payload.isSeller;
        state.sellerProfile = action.payload.sellerProfile || null;
      })
      .addCase(checkSellerStatus.rejected, (state, action) => {
        state.loading = false;
        state.isSeller = false;
        state.sellerProfile = null;
        state.error = action.payload;
      });
  },
});

// Helper function to initialize auth state (can be used in your root component)
export const initializeAuth = () => async (dispatch) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      await dispatch(fetchUserData()).unwrap();
      await dispatch(checkSellerStatus()).unwrap();
    } catch (error) {
      dispatch(logout());
    } finally {
      dispatch(setAuthLoading(false));
    }
  } else {
    dispatch(setAuthLoading(false));
  }
};

// At the end of your authSlice file, update the exports to include setAuthLoading
export const { logout, clearError, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;