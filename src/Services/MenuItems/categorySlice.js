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

// Add new category
export const addNewCategory = createAsyncThunk(
  'categories/addNewCategory',
  async (categoryData) => {
    const response = await api.post('/store/categories/', categoryData);
    return response.data;
  }
);

// Update category
export const updateExistingCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, ...categoryData }) => {
    const response = await api.patch(`/store/categories/${id}/`, categoryData);
    return response.data;
  }
);

// Delete category
export const deleteExistingCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId) => {
    await api.delete(`/store/categories/${categoryId}/`);
    return categoryId;
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
      .addCase(updateExistingCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          cat => cat.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteExistingCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          cat => cat.id !== action.payload
        );
      });
  }
});

export const selectAllCategories = (state) => state.categories.categories;
export const selectCategoryById = (state, categoryId) => 
  state.categories.categories.find(cat => cat.id === categoryId);
export const selectCategoriesStatus = (state) => state.categories.status;
export const selectCategoriesError = (state) => state.categories.error;

export default categorySlice.reducer;