import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Api/apiConfig'; // Your API service

// Initial state with default categories
const initialState = {
  categories: [
    { id: 'all', name: 'All Items', icon: 'FaHamburger' },
    { id: 'appetizer', name: 'Appetizers', icon: 'FaUtensils' },
    { id: 'main', name: 'Main Courses', icon: 'FaPizzaSlice' },
    { id: 'dessert', name: 'Desserts', icon: 'FaIceCream' },
    { id: 'drinks', name: 'Drinks', icon: 'FaWineGlassAlt' },
  ],
  status: 'idle',
  error: null
};

// Async Thunks for API operations
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await api.get('/store/categories');
    return response.data;
  }
);

export const addNewCategory = createAsyncThunk(
  'categories/addNewCategory',
  async (categoryName) => {
    const response = await api.post('/store/categories', categoryName);
    return response.data;
  }
);

export const updateExistingCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, ...categoryData }) => {
    const response = await api.put(`/store/categories/${id}`, categoryData);
    return response.data;
  }
);

export const deleteExistingCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId) => {
    await api.delete(`/store/categories/${categoryId}`);
    return categoryId;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Sync reducers can remain for local state management
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Keep the default categories and merge with fetched ones
        const defaultCategories = initialState.categories;
        const fetchedCategories = action.payload.filter(
          cat => !defaultCategories.some(dc => dc.id === cat.id)
        );
        state.categories = [...defaultCategories, ...fetchedCategories];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Add Category
      .addCase(addNewCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Don't add if it's one of our default categories
        if (!initialState.categories.some(cat => cat.id === action.payload.id)) {
          state.categories.push(action.payload);
        }
      })
      
      // Update Category
      .addCase(updateExistingCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          cat => cat.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      
      // Delete Category
      .addCase(deleteExistingCategory.fulfilled, (state, action) => {
        // Don't allow deletion of default categories
        if (!initialState.categories.some(cat => cat.id === action.payload)) {
          state.categories = state.categories.filter(
            cat => cat.id !== action.payload
          );
        }
      });
  }
});

// Selectors
export const selectAllCategories = (state) => state.categories.categories;
export const selectCategoryById = (state, categoryId) => 
  state.categories.categories.find(cat => cat.id === categoryId);
export const selectCategoriesStatus = (state) => state.categories.status;
export const selectCategoriesError = (state) => state.categories.error;

export default categorySlice.reducer;