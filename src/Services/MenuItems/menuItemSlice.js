import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../Api/apiConfig';

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

// Helper function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error.response?.data || error.message);
  throw error;
};

export const fetchMenuItems = createAsyncThunk(
  'menuItems/fetchMenuItems',
  async () => {
    try {
      const response = await api.get('store/products/seller-products/');
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
);

// In your menuItemSlice.js

export const addMenuItem = createAsyncThunk(
  'menuItems/addMenuItem',
  async (formData) => { 
    //  console.log('FormData:', formData); // Log the FormData object
     for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

    try {
      const response = await api.post('store/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
);

export const updateMenuItem = createAsyncThunk(
  'menuItems/updateMenuItem',
  async ({ id, formData }) => {  // Accept FormData directly
    try {
      const response = await api.put(`store/products/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
);

export const deleteMenuItem = createAsyncThunk(
  'menuItems/deleteMenuItem',
  async (itemId) => {
    try {
      await api.delete(`store/products/${itemId}/`);
      return itemId;
    } catch (error) {
      return handleApiError(error);
    }
  }
);

const menuItemSlice = createSlice({
  name: 'menuItems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMenuItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addMenuItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateMenuItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateMenuItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteMenuItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const selectAllMenuItems = (state) => state.menuItems.items;
export const selectMenuItemById = (state, itemId) => 
  state.menuItems.items.find(item => item.id === itemId);
export const selectMenuItemsStatus = (state) => state.menuItems.status;
export const selectMenuItemsError = (state) => state.menuItems.error;

export default menuItemSlice.reducer;