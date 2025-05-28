import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Api/apiConfig';

const initialState = {
  categories: [],
  status: 'idle',
  error: null
};

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await api.get('/store/categories/');
    return response.data;
  }
);

// Add new category (only mutation allowed)
export const addNewCategory = createAsyncThunk(
  'categories/addNewCategory',
  async (categoryTitle) => {
    const response = await api.post('/store/categories/', { title: categoryTitle });
    return response.data;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories.push(action.payload);
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const selectAllCategories = (state) => state.categories.categories;
export const selectCategoriesStatus = (state) => state.categories.status;
export const selectCategoriesError = (state) => state.categories.error;

export default categorySlice.reducer;