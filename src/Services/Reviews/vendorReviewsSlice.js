import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../Api/apiConfig";

// Fetch reviews for the logged-in vendor
export const fetchVendorReviews = createAsyncThunk(
  "reviews/fetchVendorReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/store/reviews/vendor/${1}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a response to a review
export const respondToReview = createAsyncThunk(
  "reviews/respondToReview",
  async ({ reviewId, responseText }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/store/reviews/${reviewId}/respond/`, {
        response: responseText,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a review response
export const updateReviewResponse = createAsyncThunk(
  "reviews/updateReviewResponse",
  async ({ reviewId, responseText }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/store/reviews/${reviewId}/respond/`, {
        response: responseText,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a review response
export const deleteReviewResponse = createAsyncThunk(
  "reviews/deleteReviewResponse",
  async (reviewId, { rejectWithValue }) => {
    try {
      await api.delete(`/store/reviews/${reviewId}/respond/`);
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  responseLoading: false,
  responseError: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviewError: (state) => {
      state.error = null;
      state.responseError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch reviews cases
      .addCase(fetchVendorReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // In your fetchVendorReviews.fulfilled case
      .addCase(fetchVendorReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.map((review) => ({
          id: review.id,
          customer: review.user.name,
          rating: review.rating,
          comment: review.comment,
          date: new Date(review.created_at).toLocaleDateString(),
          response: review.response_text,
          photo:
            review.user.profile_image ||
            "https://randomuser.me/api/portraits/men/1.jpg",
        }));
      })
      .addCase(fetchVendorReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Respond to review cases
      .addCase(respondToReview.pending, (state) => {
        state.responseLoading = true;
        state.responseError = null;
      })
      .addCase(respondToReview.fulfilled, (state, action) => {
        state.responseLoading = false;
        const updatedReview = action.payload;
        const index = state.reviews.findIndex((r) => r.id === updatedReview.id);
        if (index !== -1) {
          state.reviews[index] = updatedReview;
        }
      })
      .addCase(respondToReview.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseError = action.payload;
      })

      // Update response cases
      .addCase(updateReviewResponse.pending, (state) => {
        state.responseLoading = true;
        state.responseError = null;
      })
      .addCase(updateReviewResponse.fulfilled, (state, action) => {
        state.responseLoading = false;
        const updatedReview = action.payload;
        const index = state.reviews.findIndex((r) => r.id === updatedReview.id);
        if (index !== -1) {
          state.reviews[index] = updatedReview;
        }
      })
      .addCase(updateReviewResponse.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseError = action.payload;
      })

      // Delete response cases
      .addCase(deleteReviewResponse.pending, (state) => {
        state.responseLoading = true;
        state.responseError = null;
      })
      .addCase(deleteReviewResponse.fulfilled, (state, action) => {
        state.responseLoading = false;
        const reviewId = action.payload;
        const index = state.reviews.findIndex((r) => r.id === reviewId);
        if (index !== -1) {
          state.reviews[index].response = null;
        }
      })
      .addCase(deleteReviewResponse.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseError = action.payload;
      });
  },
});

export const { clearReviewError } = reviewsSlice.actions;
export default reviewsSlice.reducer;
