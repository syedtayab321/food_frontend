import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../Api/apiConfig';
// Initial state
const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// Async Thunks
export const fetchMenuItems = createAsyncThunk(
  'menuItems/fetchMenuItems',
  async () => {
    const response = await api.get('/store/products/');
    return response.data;
  }
);

export const addMenuItem = createAsyncThunk(
  'menuItems/addMenuItem',
  async (newItem) => {
    const response = await api.post('/store/products/', newItem);
    return response.data;
  }
);

export const updateMenuItem = createAsyncThunk(
  'menuItems/updateMenuItem',
  async ({ id, ...updatedItem }) => {
    const response = await api.put(`/store/products/${id}`, updatedItem);
    return response.data;
  }
);

export const deleteMenuItem = createAsyncThunk(
  'menuItems/deleteMenuItem',
  async (itemId) => {
    await api.delete(`/store/products/${itemId}`);
    return itemId;
  }
);

const menuItemSlice = createSlice({
  name: 'menuItems',
  initialState,
  reducers: {
    // Sync reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch Menu Items
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
      
      // Add Menu Item
      .addCase(addMenuItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      
      // Update Menu Item
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      
      // Delete Menu Item
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

// Selectors
export const selectAllMenuItems = (state) => state.menuItems.items;
export const selectMenuItemById = (state, itemId) => 
  state.menuItems.items.find(item => item.id === itemId);
export const selectMenuItemsStatus = (state) => state.menuItems.status;
export const selectMenuItemsError = (state) => state.menuItems.error;

export default menuItemSlice.reducer;