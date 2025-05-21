import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Api/apiConfig';

// Fetch all orders received by the vendor
export const fetchVendorOrders = createAsyncThunk(
  'orders/fetchVendorOrders',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('authToken');
    // console.log('Token:', token);
    try {
      const response = await api.get('/store/orders/?as=seller', {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      console.log('Response:', response);
      return response.data;
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || error.message
      );
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/orders/${orderId}/update_status/`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || error.message
      );
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrdersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch vendor orders
      .addCase(fetchVendorOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchVendorOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(order => order.id === updatedOrder.id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrdersError } = ordersSlice.actions;
export default ordersSlice.reducer;
